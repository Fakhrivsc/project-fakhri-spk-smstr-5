/**
 * storageAdapter.js
 * Modul adapter penyimpanan data terisolasi untuk SPK Daging Sapi SAW.
 * Mengelola master dataset berlabel DEMO menggunakan localStorage
 * dengan kemampuan reset ke nilai awal default.
 * Kompatibel untuk migrasi backend di masa mendatang.
 */

const STORAGE_KEYS = {
  BEEF_CUTS: 'beefchoice_demo_cuts_v1',
  RECIPES: 'beefchoice_demo_recipes_v1',
  CRITERIA: 'beefchoice_demo_criteria_v1',
  MATRIX: 'beefchoice_demo_matrix_v1',
  AUTH: 'beefchoice_demo_auth_v1',
  HISTORY: 'beefchoice_demo_history_v1',
};

// Initial DEMO dataset sesuai PRD.md Bagian 4.2 & 4.3
export const INITIAL_BEEF_CUTS_DEMO = [
  {
    id: 'cut-1',
    code: 'A1',
    name: 'Has Dalam (Tenderloin)',
    texture: 'Sangat Empuk',
    fatLevel: 'Rendah (3 - 5%)',
    characteristics: 'Serat halus, paling lunak, minim lemak, mudah matang dan cepat kering jika dimasak terlalu lama.',
    bestUses: 'Steak, tumisan cepat, sate premium',
    isDemo: true,
  },
  {
    id: 'cut-2',
    code: 'A2',
    name: 'Has Luar (Sirloin)',
    texture: 'Empuk & Gurih',
    fatLevel: 'Sedang (8 - 12%)',
    characteristics: 'Memiliki lapisan lemak di pinggir yang meleleh saat dipanggang, aroma gurih khas daging sapi.',
    bestUses: 'Steak panggang, sate, tumisan daging',
    isDemo: true,
  },
  {
    id: 'cut-3',
    code: 'A3',
    name: 'Sandung Lamur (Brisket)',
    texture: 'Berlemak & Kenyal Gurih',
    fatLevel: 'Tinggi (18 - 25%)',
    characteristics: 'Kaya kolagen dan lapisan lemak berlipat, sangat lezat untuk masakan berkuah setelah dimasak perlahan.',
    bestUses: 'Rawon, sop buntut/daging, soto, semur',
    isDemo: true,
  },
  {
    id: 'cut-4',
    code: 'A4',
    name: 'Sengkel (Shank)',
    texture: 'Kenyal & Penuh Urat',
    fatLevel: 'Rendah - Sedang (urat tinggi)',
    characteristics: 'Banyak otot dan urat kolagen, menghasilkan kaldu kental dan tekstur empuk legit bila dimasak lama (*slow cook*).',
    bestUses: 'Rendang, semur, sup urat, empal',
    isDemo: true,
  },
  {
    id: 'cut-5',
    code: 'A5',
    name: 'Paha Belakang (Round/Gandik)',
    texture: 'Padat & Serat Panjang',
    fatLevel: 'Sangat Rendah (2 - 4%)',
    characteristics: 'Daging padat tidak mudah hancur, serat memanjang, tahan pengadukan lama dalam bumbu rempah pekat.',
    bestUses: 'Rendang tradisional, empal gentong, dendeng balado',
    isDemo: true,
  },
];

export const INITIAL_RECIPES_DEMO = [
  {
    id: 'recipe-1',
    name: 'Rendang Daging',
    description: 'Masakan khas Minang yang dimasak perlahan dengan santan dan rempah berjam-jam hingga minyak terserap sempurna.',
    cookingMethod: 'Slow Cooking / Ungkep Lama (3-5 jam)',
    recommendedCutHint: 'Daging padat berserat kuat yang tidak mudah hancur (misal: Paha Belakang / Sengkel)',
    iconType: 'pot',
    isDemo: true,
  },
  {
    id: 'recipe-2',
    name: 'Steak Sapi Panggang',
    description: 'Potongan daging panggang dengan tingkat kematangan medium-rare hingga well-done dengan saus pelengkap.',
    cookingMethod: 'Grilling / Pan-Sear Cepat (5-10 menit)',
    recommendedCutHint: 'Potongan sangat empuk dan juicy (misal: Has Dalam / Has Luar)',
    iconType: 'flame',
    isDemo: true,
  },
  {
    id: 'recipe-3',
    name: 'Sate Daging Sapi',
    description: 'Daging ditusuk dan dibakar di atas bara arang dengan olesan bumbu kacang atau kecap rempah.',
    cookingMethod: 'Charcoal Grilling (10-15 menit)',
    recommendedCutHint: 'Empuk dengan sedikit lemak agar tidak kering saat dibakar (misal: Has Luar / Has Dalam)',
    iconType: 'utensils',
    isDemo: true,
  },
  {
    id: 'recipe-4',
    name: 'Sop Daging Berkuah',
    description: 'Sup kaldu bening dengan sayuran wortel, kentang, daun bawang dan kaldu gurih berempah pala.',
    cookingMethod: 'Boiling / Rebus Kaldu (1-2 jam)',
    recommendedCutHint: 'Potongan gurih berlemak atau berurat penghasil kaldu mantap (misal: Sandung Lamur / Sengkel)',
    iconType: 'soup',
    isDemo: true,
  },
  {
    id: 'recipe-5',
    name: 'Semur Daging Manis Gurih',
    description: 'Olahan daging kecap berkuah cokelat pekat dengan rempah pala, cengkih, dan bawang goreng harum.',
    cookingMethod: 'Simmering / Rebus Perlahan (1.5 jam)',
    recommendedCutHint: 'Daging yang mampu menyerap bumbu manis gurih dengan lembut (misal: Sengkel / Sandung Lamur)',
    iconType: 'pot',
    isDemo: true,
  },
  {
    id: 'recipe-6',
    name: 'Tumis Daging Cepat (Stir-fry)',
    description: 'Daging diiris tipis lalu ditumis cepat dengan api besar bersama paprika, bawang bombay, dan lada hitam.',
    cookingMethod: 'High Heat Stir-frying (5-7 menit)',
    recommendedCutHint: 'Potongan lunak serat halus yang matang seketika (misal: Has Dalam / Has Luar)',
    iconType: 'flame',
    isDemo: true,
  },
];

// Initial Kriteria & Bobot DEMO sesuai PRD 4.4 & 5
export const INITIAL_CRITERIA_DEMO = [
  {
    id: 'crit-1',
    code: 'C1',
    name: 'Tingkat Keempukan (Tenderness)',
    attribute: 'Benefit',
    weight: 0.30, // 30%
    scale: '1 - 5 (1: Sangat Liat/Keras, 5: Sangat Empuk/Lunak)',
    description: 'Kelembutan serat daging saat dikunyah; semakin empuk semakin disukai untuk olahan cepat atau steak.',
    isDemo: true,
  },
  {
    id: 'crit-2',
    code: 'C2',
    name: 'Kandungan Lemak (Fat Content)',
    attribute: 'Cost',
    weight: 0.20, // 20%
    scale: '1 - 5 (1: Minim Lemak, 5: Sangat Berlemak)',
    description: 'Proporsi marbling/lapisan lemak; bertipe Cost pada masakan di mana lemak berlebih dihindari.',
    isDemo: true,
  },
  {
    id: 'crit-3',
    code: 'C3',
    name: 'Ketahanan Rebusan / Pemanasan Lama',
    attribute: 'Benefit',
    weight: 0.25, // 25%
    scale: '1 - 5 (1: Cepat Hancur, 5: Sangat Tahan Ungkep Lama)',
    description: 'Ketahanan jaringan otot agar tidak hancur saat dimasak lama dalam kuah/bumbu rempah kental.',
    isDemo: true,
  },
  {
    id: 'crit-4',
    code: 'C4',
    name: 'Daya Serap Bumbu (Flavor Absorption)',
    attribute: 'Benefit',
    weight: 0.25, // 25%
    scale: '1 - 5 (1: Sukar Menyerap, 5: Sangat Meresap)',
    description: 'Kemampuan serat dan jaringan ikat mengikat bumbu rempah ke dalam inti daging.',
    isDemo: true,
  },
];

// Matriks Keputusan Awal (X) DEMO: Alternatif vs Kriteria (Skala 1 - 5)
export const INITIAL_MATRIX_DEMO = {
  'cut-1': { 'crit-1': 5, 'crit-2': 2, 'crit-3': 2, 'crit-4': 4 }, // A1 Has Dalam
  'cut-2': { 'crit-1': 4, 'crit-2': 3, 'crit-3': 3, 'crit-4': 4 }, // A2 Has Luar
  'cut-3': { 'crit-1': 2, 'crit-2': 5, 'crit-3': 4, 'crit-4': 5 }, // A3 Sandung Lamur
  'cut-4': { 'crit-1': 2, 'crit-2': 2, 'crit-3': 5, 'crit-4': 4 }, // A4 Sengkel
  'cut-5': { 'crit-1': 3, 'crit-2': 1, 'crit-3': 5, 'crit-4': 3 }, // A5 Paha Belakang
};

export const INITIAL_HISTORY_DEMO = [
  {
    id: 'hist-1',
    date: '12 Okt 2026, 14:30 WIB',
    recipeId: 'recipe-1',
    recipeName: 'Rendang Daging',
    cookingMethod: 'Slow Cooking (3-5 jam)',
    topCutName: 'Paha Belakang (Round)',
    topCutCode: 'A5',
    sawScore: '0,7800',
    criteriaCount: 4,
    alternativeCount: 5,
    isDemo: true,
    snapshot: {
      recipe: { name: 'Rendang Daging', cookingMethod: 'Slow Cooking (3-5 jam)', hint: 'Daging padat berserat kuat tidak mudah hancur' },
      criteria: [
        { code: 'C1', name: 'Tingkat Keempukan', attribute: 'Benefit', weight: 0.30 },
        { code: 'C2', name: 'Kandungan Lemak', attribute: 'Cost', weight: 0.20 },
        { code: 'C3', name: 'Ketahanan Rebusan Lama', attribute: 'Benefit', weight: 0.25 },
        { code: 'C4', name: 'Daya Serap Bumbu', attribute: 'Benefit', weight: 0.25 },
      ],
      rankings: [
        { rank: 1, code: 'A5', name: 'Paha Belakang (Round)', score: '0,7800', reason: 'Alternatif terbaik karena memiliki keunggulan tertinggi pada Ketahanan Rebusan Lama dan proporsi lemak cost optimal.' },
        { rank: 2, code: 'A1', name: 'Has Dalam (Tenderloin)', score: '0,7000', reason: 'Peringkat 2 dengan keunggulan keempukan tertinggi, namun kurang tahan pengadukan lama.' },
        { rank: 3, code: 'A4', name: 'Sengkel (Shank)', score: '0,6700', reason: 'Peringkat 3 dengan ketahanan rebusan tinggi namun keempukan awal rendah.' },
        { rank: 4, code: 'A2', name: 'Has Luar (Sirloin)', score: '0,6567', reason: 'Peringkat 4 dengan skor seimbang.' },
        { rank: 5, code: 'A3', name: 'Sandung Lamur (Brisket)', score: '0,6100', reason: 'Peringkat 5 karena kandungan lemak tinggi bertipe cost.' },
      ]
    }
  },
  {
    id: 'hist-2',
    date: '11 Okt 2026, 10:15 WIB',
    recipeId: 'recipe-2',
    recipeName: 'Steak Sapi Panggang',
    cookingMethod: 'Grilling / Pan-Sear (5-10 menit)',
    topCutName: 'Has Dalam (Tenderloin)',
    topCutCode: 'A1',
    sawScore: '0,7850',
    criteriaCount: 4,
    alternativeCount: 5,
    isDemo: true,
    snapshot: {
      recipe: { name: 'Steak Sapi Panggang', cookingMethod: 'Grilling / Pan-Sear (5-10 menit)', hint: 'Sangat empuk dan lunak serat halus' },
      criteria: [
        { code: 'C1', name: 'Tingkat Keempukan', attribute: 'Benefit', weight: 0.45 },
        { code: 'C2', name: 'Kandungan Lemak', attribute: 'Cost', weight: 0.15 },
        { code: 'C3', name: 'Ketahanan Rebusan Lama', attribute: 'Benefit', weight: 0.15 },
        { code: 'C4', name: 'Daya Serap Bumbu', attribute: 'Benefit', weight: 0.25 },
      ],
      rankings: [
        { rank: 1, code: 'A1', name: 'Has Dalam (Tenderloin)', score: '0,7850', reason: 'Alternatif terbaik untuk steak karena keempukan maksimal (nilai normalisasi 1,00) mendominasi bobot 45%.' },
        { rank: 2, code: 'A5', name: 'Paha Belakang (Round)', score: '0,7200', reason: 'Peringkat 2 dengan skor preferensi 0,7200.' },
        { rank: 3, code: 'A2', name: 'Has Luar (Sirloin)', score: '0,6850', reason: 'Peringkat 3 dengan rasa gurih lemak tepi.' },
        { rank: 4, code: 'A4', name: 'Sengkel (Shank)', score: '0,6100', reason: 'Peringkat 4 karena tekstur liat kurang cocok untuk steak.' },
        { rank: 5, code: 'A3', name: 'Sandung Lamur (Brisket)', score: '0,5800', reason: 'Peringkat 5 karena terlalu berlemak untuk steak cepat.' },
      ]
    }
  },
  {
    id: 'hist-3',
    date: '10 Okt 2026, 18:40 WIB',
    recipeId: 'recipe-4',
    recipeName: 'Sop Daging Berkuah',
    cookingMethod: 'Boiling / Rebus Kaldu (1-2 jam)',
    topCutName: 'Sandung Lamur (Brisket)',
    topCutCode: 'A3',
    sawScore: '0,7450',
    criteriaCount: 4,
    alternativeCount: 5,
    isDemo: true,
    snapshot: {
      recipe: { name: 'Sop Daging Berkuah', cookingMethod: 'Boiling / Rebus Kaldu (1-2 jam)', hint: 'Berlemak gurih dan berkaldu mantap' },
      criteria: [
        { code: 'C1', name: 'Tingkat Keempukan', attribute: 'Benefit', weight: 0.20 },
        { code: 'C2', name: 'Kandungan Lemak', attribute: 'Cost', weight: 0.20 },
        { code: 'C3', name: 'Ketahanan Rebusan Lama', attribute: 'Benefit', weight: 0.30 },
        { code: 'C4', name: 'Daya Serap Bumbu', attribute: 'Benefit', weight: 0.30 },
      ],
      rankings: [
        { rank: 1, code: 'A3', name: 'Sandung Lamur (Brisket)', score: '0,7450', reason: 'Alternatif terbaik untuk sop kaldu karena kaya kolagen dan lemak yang meleleh menjadi kuah gurih beraroma.' },
        { rank: 2, code: 'A4', name: 'Sengkel (Shank)', score: '0,7100', reason: 'Peringkat 2 dengan urat kenyal dan kaldu pekat.' },
        { rank: 3, code: 'A5', name: 'Paha Belakang (Round)', score: '0,6900', reason: 'Peringkat 3 daging padat tanpa lemak berlebih.' },
        { rank: 4, code: 'A2', name: 'Has Luar (Sirloin)', score: '0,6200', reason: 'Peringkat 4 cocok untuk sop tumis.' },
        { rank: 5, code: 'A1', name: 'Has Dalam (Tenderloin)', score: '0,5900', reason: 'Peringkat 5 cepat hancur jika direbus lama dalam sop.' },
      ]
    }
  },
];

// Helper functions for LocalStorage
const loadFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Gagal membaca ${key} dari localStorage, menggunakan fallback data DEMO`, e);
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Gagal menyimpan ${key} ke localStorage`, e);
  }
};

// Data Layer Service API
export const storageAdapter = {
  // === BEEF CUTS CRUD ===
  getBeefCuts: () => {
    return loadFromStorage(STORAGE_KEYS.BEEF_CUTS, INITIAL_BEEF_CUTS_DEMO);
  },

  addBeefCut: (cutData) => {
    const cuts = storageAdapter.getBeefCuts();
    const newCut = {
      ...cutData,
      id: `cut-${Date.now()}`,
      isDemo: true,
    };
    const updated = [...cuts, newCut];
    saveToStorage(STORAGE_KEYS.BEEF_CUTS, updated);

    // Otomatis beri nilai default di matriks jika belum ada
    const matrix = storageAdapter.getDecisionMatrix();
    const criteria = storageAdapter.getCriteria();
    const defaultRow = {};
    criteria.forEach((c) => {
      defaultRow[c.id] = 3; // Nilai default tengah (3)
    });
    matrix[newCut.id] = defaultRow;
    saveToStorage(STORAGE_KEYS.MATRIX, matrix);

    return newCut;
  },

  updateBeefCut: (id, updatedData) => {
    const cuts = storageAdapter.getBeefCuts();
    const index = cuts.findIndex((c) => c.id === id);
    if (index === -1) return null;
    cuts[index] = { ...cuts[index], ...updatedData };
    saveToStorage(STORAGE_KEYS.BEEF_CUTS, cuts);
    return cuts[index];
  },

  deleteBeefCut: (id) => {
    const cuts = storageAdapter.getBeefCuts();
    const updated = cuts.filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.BEEF_CUTS, updated);

    // Hapus dari matriks
    const matrix = storageAdapter.getDecisionMatrix();
    delete matrix[id];
    saveToStorage(STORAGE_KEYS.MATRIX, matrix);

    return true;
  },

  // === RECIPES CRUD ===
  getRecipes: () => {
    return loadFromStorage(STORAGE_KEYS.RECIPES, INITIAL_RECIPES_DEMO);
  },

  addRecipe: (recipeData) => {
    const recipes = storageAdapter.getRecipes();
    const newRecipe = {
      ...recipeData,
      id: `recipe-${Date.now()}`,
      isDemo: true,
    };
    const updated = [...recipes, newRecipe];
    saveToStorage(STORAGE_KEYS.RECIPES, updated);
    return newRecipe;
  },

  updateRecipe: (id, updatedData) => {
    const recipes = storageAdapter.getRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return null;
    recipes[index] = { ...recipes[index], ...updatedData };
    saveToStorage(STORAGE_KEYS.RECIPES, recipes);
    return recipes[index];
  },

  deleteRecipe: (id) => {
    const recipes = storageAdapter.getRecipes();
    const updated = recipes.filter((r) => r.id !== id);
    saveToStorage(STORAGE_KEYS.RECIPES, updated);
    return true;
  },

  // === CRITERIA & WEIGHTS CRUD ===
  getCriteria: () => {
    return loadFromStorage(STORAGE_KEYS.CRITERIA, INITIAL_CRITERIA_DEMO);
  },

  addCriteria: (criterionData) => {
    const criteria = storageAdapter.getCriteria();
    const newCrit = {
      ...criterionData,
      id: `crit-${Date.now()}`,
      isDemo: true,
    };
    const updated = [...criteria, newCrit];
    saveToStorage(STORAGE_KEYS.CRITERIA, updated);

    // Inisialisasi sel kriteria baru di matriks alternatif
    const matrix = storageAdapter.getDecisionMatrix();
    Object.keys(matrix).forEach((cutId) => {
      if (!matrix[cutId]) matrix[cutId] = {};
      matrix[cutId][newCrit.id] = 3;
    });
    saveToStorage(STORAGE_KEYS.MATRIX, matrix);

    return newCrit;
  },

  updateCriteria: (id, updatedData) => {
    const criteria = storageAdapter.getCriteria();
    const index = criteria.findIndex((c) => c.id === id);
    if (index === -1) return null;
    criteria[index] = { ...criteria[index], ...updatedData };
    saveToStorage(STORAGE_KEYS.CRITERIA, criteria);
    return criteria[index];
  },

  deleteCriteria: (id) => {
    const criteria = storageAdapter.getCriteria();
    const updated = criteria.filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.CRITERIA, updated);

    // Bersihkan dari matriks
    const matrix = storageAdapter.getDecisionMatrix();
    Object.keys(matrix).forEach((cutId) => {
      if (matrix[cutId]) {
        delete matrix[cutId][id];
      }
    });
    saveToStorage(STORAGE_KEYS.MATRIX, matrix);

    return true;
  },

  saveAllWeights: (weightMap) => {
    const criteria = storageAdapter.getCriteria();
    // Validasi total bobot (toleransi desimal 0.0001)
    let total = 0;
    Object.values(weightMap).forEach((w) => {
      total += parseFloat(w) || 0;
    });

    const isTotalValid = Math.abs(total - 1.0) < 0.0001 || Math.abs(total - 100) < 0.01;
    if (!isTotalValid) {
      return { success: false, total, message: `Total bobot harus tepat 100% atau 1,00. Total saat ini: ${(total * 100).toFixed(1)}%` };
    }

    const updated = criteria.map((c) => {
      const val = parseFloat(weightMap[c.id]) || c.weight;
      return {
        ...c,
        weight: val > 1 ? val / 100 : val, // Normalisasi ke pecahan 0.00 - 1.00
      };
    });

    saveToStorage(STORAGE_KEYS.CRITERIA, updated);
    return { success: true, total: 1.0, updated };
  },

  // === DECISION MATRIX (X) ===
  getDecisionMatrix: () => {
    return loadFromStorage(STORAGE_KEYS.MATRIX, INITIAL_MATRIX_DEMO);
  },

  updateMatrixCell: (cutId, critId, value) => {
    const matrix = storageAdapter.getDecisionMatrix();
    if (!matrix[cutId]) matrix[cutId] = {};
    matrix[cutId][critId] = parseFloat(value) || 0;
    saveToStorage(STORAGE_KEYS.MATRIX, matrix);
    return matrix;
  },

  saveFullMatrix: (newMatrix) => {
    saveToStorage(STORAGE_KEYS.MATRIX, newMatrix);
    return newMatrix;
  },

  // === HISTORY ===
  getHistory: () => {
    return loadFromStorage(STORAGE_KEYS.HISTORY, INITIAL_HISTORY_DEMO);
  },

  getHistoryItem: (id) => {
    const history = storageAdapter.getHistory();
    return history.find((h) => h.id === id) || null;
  },

  addHistory: (record) => {
    const history = storageAdapter.getHistory();
    const newRecord = {
      ...record,
      id: record.id || `hist-${Date.now()}`,
      date: record.date || new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
      isDemo: true,
    };
    const updated = [newRecord, ...history];
    saveToStorage(STORAGE_KEYS.HISTORY, updated);
    return newRecord;
  },

  deleteHistoryItem: (id) => {
    const history = storageAdapter.getHistory();
    const updated = history.filter((h) => h.id !== id);
    saveToStorage(STORAGE_KEYS.HISTORY, updated);
    return true;
  },

  clearAllHistory: () => {
    saveToStorage(STORAGE_KEYS.HISTORY, []);
    return true;
  },

  // === DASHBOARD STATS ===
  getDashboardStats: () => {
    const cuts = storageAdapter.getBeefCuts();
    const recipes = storageAdapter.getRecipes();
    const criteria = storageAdapter.getCriteria();
    const history = storageAdapter.getHistory();
    return {
      totalCuts: cuts.length,
      totalRecipes: recipes.length,
      totalCriteria: criteria.length,
      totalHistory: history.length,
    };
  },

  // === AUTHENTICATION DEMO ===
  getAuth: () => {
    return loadFromStorage(STORAGE_KEYS.AUTH, {
      isAuthenticated: false,
      user: null,
    });
  },

  login: (username, password) => {
    if (username.trim() === 'admin' && password === 'admin123') {
      const authState = {
        isAuthenticated: true,
        user: {
          username: 'admin',
          name: 'Administrator SPK',
          role: 'Admin',
        },
      };
      saveToStorage(STORAGE_KEYS.AUTH, authState);
      return { success: true, user: authState.user };
    }
    return { success: false, message: 'Username atau kata sandi tidak valid. Gunakan admin / admin123 untuk akun DEMO.' };
  },

  logout: () => {
    const authState = { isAuthenticated: false, user: null };
    saveToStorage(STORAGE_KEYS.AUTH, authState);
    return true;
  },

  // Reset entire store back to official initial DEMO state
  resetAllDemoData: () => {
    saveToStorage(STORAGE_KEYS.BEEF_CUTS, INITIAL_BEEF_CUTS_DEMO);
    saveToStorage(STORAGE_KEYS.RECIPES, INITIAL_RECIPES_DEMO);
    saveToStorage(STORAGE_KEYS.CRITERIA, INITIAL_CRITERIA_DEMO);
    saveToStorage(STORAGE_KEYS.MATRIX, INITIAL_MATRIX_DEMO);
    saveToStorage(STORAGE_KEYS.HISTORY, INITIAL_HISTORY_DEMO);
    return true;
  },
};
