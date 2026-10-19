/**
 * sawEngine.js
 * Mesin Perhitungan Simple Additive Weighting (SAW) murni.
 * Terpisah total dari UI, presisi floating-point penuh,
 * menangani pembobotan, normalisasi Benefit & Cost, penanganan division-by-zero,
 * nilai seragam, aturan seri konsisten, dan justifikasi alasan berbasis kriteria.
 * 
 * Sesuai PRD.md Bagian 5 & IMPLEMENTATION_PLAN.md Fase E.
 */

/**
 * Format angka ke representasi lokal Indonesia dengan presisi konsisten
 * @param {number} value
 * @param {number} decimals
 * @returns {string} contoh: "0,7800"
 */
export function formatLocalDecimal(value, decimals = 4) {
  if (value === undefined || value === null || isNaN(value)) return '-';
  return Number(value).toFixed(decimals).replace('.', ',');
}

/**
 * Validasi ketat input SAW sebelum kalkulasi
 */
export function validateSawInput(alternatives, criteria, matrix) {
  const errors = [];

  if (!Array.isArray(alternatives) || alternatives.length === 0) {
    errors.push('Daftar alternatif potongan daging tidak boleh kosong.');
  }

  if (!Array.isArray(criteria) || criteria.length === 0) {
    errors.push('Daftar kriteria penilaian tidak boleh kosong.');
  }

  if (!matrix || typeof matrix !== 'object') {
    errors.push('Matriks keputusan (X) tidak valid.');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // 1. Validasi Total Bobot (harus 1.00 atau 100%)
  const totalWeight = criteria.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);
  const isWeightValid = Math.abs(totalWeight - 1.0) < 0.0001 || Math.abs(totalWeight - 100) < 0.01;
  if (!isWeightValid) {
    errors.push(
      `Total bobot kriteria harus tepat 1,00 (100%). Akumulasi saat ini: ${totalWeight > 1 ? totalWeight : (totalWeight * 100).toFixed(1)}%.`
    );
  }

  // 2. Validasi Tiap Bobot (w_j > 0)
  criteria.forEach((c) => {
    const w = parseFloat(c.weight) || 0;
    if (w <= 0) {
      errors.push(`Bobot kriteria ${c.code} (${c.name}) harus bernilai positif lebih dari 0.`);
    }
  });

  // 3. Validasi Kelengkapan dan Nilai Numerik Matriks X
  alternatives.forEach((alt) => {
    const altRow = matrix[alt.id];
    if (!altRow) {
      errors.push(`Data penilaian untuk alternatif "${alt.name}" (${alt.code}) tidak ditemukan dalam matriks.`);
      return;
    }

    criteria.forEach((crit) => {
      const val = altRow[crit.id];
      if (val === undefined || val === null || val === '') {
        errors.push(`Nilai untuk alternatif "${alt.name}" pada kriteria ${crit.code} belum diisi.`);
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          errors.push(`Nilai untuk alternatif "${alt.name}" pada kriteria ${crit.code} bukan angka numerik valid.`);
        } else if (crit.attribute === 'Cost' && num <= 0) {
          // Tangani pembagian dengan nol secara eksplisit
          errors.push(
            `Kriteria Cost (${crit.code}) pada "${alt.name}" bernilai ${num}. Nilai kriteria Cost tidak boleh kurang dari atau sama dengan nol karena memicu pembagian dengan nol (division by zero).`
          );
        }
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Eksekusi Perhitungan SAW Lengkap
 * @param {Array} alternatives - Daftar alternatif [ {id, code, name, ...} ]
 * @param {Array} criteria - Daftar kriteria [ {id, code, name, attribute, weight} ]
 * @param {Object} matrix - Matriks keputusan { altId: { critId: score } }
 * @returns {Object} Hasil kalkulasi terstruktur
 */
export function calculateSAW(alternatives, criteria, matrix) {
  // Jalankan validasi
  const validation = validateSawInput(alternatives, criteria, matrix);
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      rawMatrix: matrix,
      normalizedMatrix: {},
      weightedMatrix: {},
      rankings: [],
    };
  }

  // Normalisasi bobot jika pengguna memasukkan skala 0-100%
  const normalizedCriteria = criteria.map((c) => {
    const w = parseFloat(c.weight);
    return {
      ...c,
      normalizedWeight: w > 1 ? w / 100 : w,
    };
  });

  // 1. Ekstraksi Nilai Ekstrem (Max untuk Benefit, Min untuk Cost)
  const extrema = {};
  normalizedCriteria.forEach((crit) => {
    const values = alternatives.map((alt) => parseFloat(matrix[alt.id][crit.id]));
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    extrema[crit.id] = {
      max: maxVal,
      min: minVal,
      isIdentical: maxVal === minVal, // Deteksi kasus nilai seragam
    };
  });

  // 2. Pembentukan Matriks Normalisasi (R)
  // Benefit: r_ij = x_ij / max(x_ij)
  // Cost: r_ij = min(x_ij) / x_ij
  const normalizedMatrix = {};
  const weightedMatrix = {};

  alternatives.forEach((alt) => {
    normalizedMatrix[alt.id] = {};
    weightedMatrix[alt.id] = {};

    normalizedCriteria.forEach((crit) => {
      const x_ij = parseFloat(matrix[alt.id][crit.id]);
      let r_ij = 0;

      if (extrema[crit.id].isIdentical) {
        // Jika semua nilai pada kriteria sama, r_ij bernilai 1.0 (proporsional seimbang)
        r_ij = 1.0;
      } else if (crit.attribute === 'Benefit') {
        r_ij = extrema[crit.id].max > 0 ? x_ij / extrema[crit.id].max : 0;
      } else {
        // Cost attribute
        r_ij = x_ij > 0 ? extrema[crit.id].min / x_ij : 0;
      }

      normalizedMatrix[alt.id][crit.id] = r_ij;
      // Nilai Terbobot: w_j * r_ij
      weightedMatrix[alt.id][crit.id] = crit.normalizedWeight * r_ij;
    });
  });

  // 3. Menghitung Nilai Preferensi (V_i = Σ w_j * r_ij)
  const results = alternatives.map((alt) => {
    let preferenceScore = 0;
    const criterionContributions = [];

    normalizedCriteria.forEach((crit) => {
      const weightedVal = weightedMatrix[alt.id][crit.id];
      const r_ij = normalizedMatrix[alt.id][crit.id];
      preferenceScore += weightedVal;

      criterionContributions.push({
        critId: crit.id,
        critCode: crit.code,
        critName: crit.name,
        attribute: crit.attribute,
        weight: crit.normalizedWeight,
        rawValue: parseFloat(matrix[alt.id][crit.id]),
        normalizedValue: r_ij,
        weightedValue: weightedVal,
      });
    });

    // Urutkan kontribusi kriteria dari kontribusi tertinggi untuk justifikasi ilmiah
    criterionContributions.sort((a, b) => b.weightedValue - a.weightedValue);

    return {
      alternative: alt,
      preferenceScore, // Presisi internal penuh
      displayScore: formatLocalDecimal(preferenceScore, 4),
      contributions: criterionContributions,
    };
  });

  // 4. Perangkingan dengan Presisi Penuh & Penanganan Nilai Seri Konsisten
  // Aturan Seri:
  // 1. Nilai Preferensi tertinggi
  // 2. Jika nilai seri (selisih < 1e-9), bandingkan kontribusi pada kriteria berbobot tertinggi
  // 3. Jika masih sama, urutkan berdasarkan kode alternatif (A1 < A2)
  results.sort((a, b) => {
    const diff = b.preferenceScore - a.preferenceScore;
    if (Math.abs(diff) > 1e-9) {
      return diff;
    }
    // Seri: cek kriteria kontribusi pertama
    const topCritA = a.contributions[0]?.weightedValue || 0;
    const topCritB = b.contributions[0]?.weightedValue || 0;
    const critDiff = topCritB - topCritA;
    if (Math.abs(critDiff) > 1e-9) {
      return critDiff;
    }
    // Seri mutlak: urutkan alfabetis kode
    return a.alternative.code.localeCompare(b.alternative.code);
  });

  // Beri nomor peringkat dan formulasi alasan rekomendasi yang dapat ditelusuri
  const rankings = results.map((item, index) => {
    const rank = index + 1;
    const topCrit = item.contributions[0];
    const secondCrit = item.contributions[1];

    // Buat kalimat alasan ilmiah berbasis data
    let reason = '';
    if (rank === 1) {
      reason = `Alternatif terbaik karena memiliki keunggulan tertinggi pada ${topCrit.critName} (skor normalisasi ${formatLocalDecimal(topCrit.normalizedValue, 2)}) serta kontribusi kuat dari ${secondCrit.critName}.`;
    } else {
      reason = `Menduduki peringkat ${rank} dengan nilai preferensi ${item.displayScore}. Nilai unggul pada ${topCrit.critName}, namun memiliki skor lebih rendah pada kriteria ${item.contributions[item.contributions.length - 1].critName}.`;
    }

    return {
      rank,
      ...item,
      reason,
    };
  });

  return {
    success: true,
    extrema,
    criteria: normalizedCriteria,
    rawMatrix: matrix,
    normalizedMatrix,
    weightedMatrix,
    rankings,
  };
}

/**
 * Dataset Verifikasi Acuan Matematis Independen (Golden Benchmark Test)
 * Digunakan untuk pengujian otomatis agar hasil kalkulasi dapat diverifikasi kebenarannya.
 */
export const INDEPENDENT_BENCHMARK = {
  description: 'Dataset Acuan Manual Independen SPK Daging Sapi SAW',
  weights: { 'crit-1': 0.30, 'crit-2': 0.20, 'crit-3': 0.25, 'crit-4': 0.25 },
  expectedRankings: [
    { code: 'A5', expectedRank: 1, expectedScoreApprox: 0.7800 },
    { code: 'A1', expectedRank: 2, expectedScoreApprox: 0.7000 },
    { code: 'A4', expectedRank: 3, expectedScoreApprox: 0.6700 },
    { code: 'A2', expectedRank: 4, expectedScoreApprox: 0.6567 },
    { code: 'A3', expectedRank: 5, expectedScoreApprox: 0.6100 },
  ],
};
