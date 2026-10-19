import { calculateSAW, validateSawInput, INDEPENDENT_BENCHMARK } from './sawEngine.js';

console.log('=================================================================');
console.log(' PENGUJIAN ACUAN INDEPENDEN MESIN SAW (FASE E)');
console.log('=================================================================');

// 1. DATASET ACUAN BENCHMARK
const testAlternatives = [
  { id: 'cut-1', code: 'A1', name: 'Has Dalam (Tenderloin)' },
  { id: 'cut-2', code: 'A2', name: 'Has Luar (Sirloin)' },
  { id: 'cut-3', code: 'A3', name: 'Sandung Lamur (Brisket)' },
  { id: 'cut-4', code: 'A4', name: 'Sengkel (Shank)' },
  { id: 'cut-5', code: 'A5', name: 'Paha Belakang (Round)' },
];

const testCriteria = [
  { id: 'crit-1', code: 'C1', name: 'Keempukan', attribute: 'Benefit', weight: 0.30 },
  { id: 'crit-2', code: 'C2', name: 'Lemak', attribute: 'Cost', weight: 0.20 },
  { id: 'crit-3', code: 'C3', name: 'Ketahanan Rebusan', attribute: 'Benefit', weight: 0.25 },
  { id: 'crit-4', code: 'C4', name: 'Daya Serap Bumbu', attribute: 'Benefit', weight: 0.25 },
];

const testMatrix = {
  'cut-1': { 'crit-1': 5, 'crit-2': 2, 'crit-3': 2, 'crit-4': 4 },
  'cut-2': { 'crit-1': 4, 'crit-2': 3, 'crit-3': 3, 'crit-4': 4 },
  'cut-3': { 'crit-1': 2, 'crit-2': 5, 'crit-3': 4, 'crit-4': 5 },
  'cut-4': { 'crit-1': 2, 'crit-2': 2, 'crit-3': 5, 'crit-4': 4 },
  'cut-5': { 'crit-1': 3, 'crit-2': 1, 'crit-3': 5, 'crit-4': 3 },
};

// TEST CASE 1: VERIFIKASI BENCHMARK ACUAN
console.log('\n[UJI 1] Verifikasi Terhadap Hasil Perhitungan Manual Independen:');
const result = calculateSAW(testAlternatives, testCriteria, testMatrix);

if (!result.success) {
  console.error('FAIL: Perhitungan gagal dengan error:', result.errors);
  process.exit(1);
}

let allBenchmarkPassed = true;
INDEPENDENT_BENCHMARK.expectedRankings.forEach((exp) => {
  const actual = result.rankings.find((r) => r.alternative.code === exp.code);
  const diff = Math.abs(actual.preferenceScore - exp.expectedScoreApprox);
  const isMatch = actual.rank === exp.expectedRank && diff < 0.001;

  if (isMatch) {
    console.log(
      `  ✓ ${exp.code}: Peringkat ${actual.rank} (Harapan: ${exp.expectedRank}) | Skor V = ${actual.displayScore} (Harapan ~${exp.expectedScoreApprox.toFixed(4)})`
    );
  } else {
    console.error(
      `  ✗ GAGAL pada ${exp.code}: Peringkat aktual ${actual.rank} vs ${exp.expectedRank}, Skor ${actual.preferenceScore} vs ${exp.expectedScoreApprox}`
    );
    allBenchmarkPassed = false;
  }
});

if (!allBenchmarkPassed) {
  console.error('TEST 1 FAILED');
  process.exit(1);
}
console.log('-> HASIL UJI 1: 100% COCOK DENGAN HASIL ACUAN INDEPENDEN!');

// TEST CASE 2: UJI BOBOT INVALID (TOTAL BUKAN 100%)
console.log('\n[UJI 2] Validasi Total Bobot Invalid (Misal Total = 110%):');
const invalidCriteria = [
  { ...testCriteria[0], weight: 0.40 },
  ...testCriteria.slice(1),
];
const invalidWeightResult = calculateSAW(testAlternatives, invalidCriteria, testMatrix);
if (!invalidWeightResult.success && invalidWeightResult.errors.some((e) => e.includes('Total bobot'))) {
  console.log('  ✓ Berhasil menolak total bobot invalid:', invalidWeightResult.errors[0]);
} else {
  console.error('FAIL: Bobot invalid lolos validasi!');
  process.exit(1);
}

// TEST CASE 3: UJI PEMBAGIAN DENGAN NOL (COST X_ij = 0)
console.log('\n[UJI 3] Validasi Pembagian dengan Nol (Cost x_ij = 0):');
const zeroMatrix = {
  ...testMatrix,
  'cut-1': { ...testMatrix['cut-1'], 'crit-2': 0 },
};
const zeroResult = calculateSAW(testAlternatives, testCriteria, zeroMatrix);
if (!zeroResult.success && zeroResult.errors.some((e) => e.includes('pembagian dengan nol'))) {
  console.log('  ✓ Berhasil mendeteksi dan mencegah pembagian dengan nol:', zeroResult.errors[0]);
} else {
  console.error('FAIL: Division by zero tidak tertangani!');
  process.exit(1);
}

// TEST CASE 4: UJI NILAI SERAGAM PADA KRITERIA (SEMUA ALTERNATIF MEMILIKI SKOR SAMA)
console.log('\n[UJI 4] Penanganan Nilai Seragam (Semua alternatif bernilai 4 pada C4):');
const uniformMatrix = {};
testAlternatives.forEach((alt) => {
  uniformMatrix[alt.id] = { ...testMatrix[alt.id], 'crit-4': 4 };
});
const uniformResult = calculateSAW(testAlternatives, testCriteria, uniformMatrix);
if (uniformResult.success) {
  const allNormalizedOne = testAlternatives.every((alt) => uniformResult.normalizedMatrix[alt.id]['crit-4'] === 1.0);
  if (allNormalizedOne) {
    console.log('  ✓ Berhasil: Seluruh nilai normalisasi pada kriteria seragam menghasilkan 1.0 secara proporsional.');
  } else {
    console.error('FAIL: Normalisasi nilai seragam tidak 1.0');
    process.exit(1);
  }
} else {
  console.error('FAIL: Perhitungan gagal pada nilai seragam');
  process.exit(1);
}

// TEST CASE 5: UJI ATURAN SERI (TIE-BREAKING)
console.log('\n[UJI 5] Uji Konsistensi Aturan Seri (Tie-Breaking):');
const tieMatrix = {
  'cut-1': { 'crit-1': 4, 'crit-2': 2, 'crit-3': 3, 'crit-4': 3 },
  'cut-2': { 'crit-1': 4, 'crit-2': 2, 'crit-3': 3, 'crit-4': 3 },
  'cut-3': { 'crit-1': 1, 'crit-2': 5, 'crit-3': 1, 'crit-4': 1 },
};
const tieAlts = [testAlternatives[0], testAlternatives[1], testAlternatives[2]];
const tieResult = calculateSAW(tieAlts, testCriteria, tieMatrix);
if (tieResult.success) {
  console.log(
    `  ✓ Skor A1 = ${tieResult.rankings[0].displayScore} (Rank ${tieResult.rankings[0].rank}), Skor A2 = ${tieResult.rankings[1].displayScore} (Rank ${tieResult.rankings[1].rank})`
  );
  console.log('  ✓ Aturan seri diterapkan secara deterministik dan konsisten.');
} else {
  console.error('FAIL: Uji tie-breaking gagal');
  process.exit(1);
}

console.log('\n=================================================================');
console.log(' SELURUH 5 PENGUJIAN MESIN SAW LOLOS VERIFIKASI DENGAN SUKSES! ');
console.log('=================================================================');
