/**
 * landingData.js
 * Data visual, tautan gambar berkualitas tinggi (Unsplash Photography),
 * dan konten edukasi pendukung untuk Redesign Halaman Beranda BeefChoice.
 */

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=85';

export const RECIPE_IMAGES = {
  'recipe-1': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80', // Rendang Daging
  'recipe-2': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', // Steak Sapi
  'recipe-3': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // Sate Daging Sapi
  'recipe-4': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', // Sop Daging
  'recipe-5': 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80', // Semur Daging
  'recipe-6': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80', // Tumis Daging Sapi
};

export const BEEF_CUT_IMAGES = {
  'cut-1': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80', // Has Dalam (Tenderloin)
  'cut-2': 'https://images.unsplash.com/photo-1607116176195-b81b1f41f536?auto=format&fit=crop&w=800&q=80', // Has Luar (Sirloin)
  'cut-3': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80', // Sandung Lamur (Brisket)
  'cut-4': 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80', // Sengkel (Shank)
  'cut-5': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', // Paha Belakang (Round)
};

export const SAW_CRITERIA_INFO = [
  {
    code: 'C1',
    name: 'Tingkat Keempukan',
    attribute: 'Benefit',
    tag: 'Kelembutan Serat',
    desc: 'Semakin empuk serat daging, semakin tinggi nilai preferensi untuk olahan masak cepat seperti steak atau sate.',
  },
  {
    code: 'C2',
    name: 'Kandungan Lemak',
    attribute: 'Cost',
    tag: 'Proporsi Marbling',
    desc: 'Tingkat lemak berlebih dinilai sebagai Cost pada masakan rendang agar hasil masakan tidak hancur dan tidak berminyak jenuh.',
  },
  {
    code: 'C3',
    name: 'Ketahanan Rebusan',
    attribute: 'Benefit',
    tag: 'Kepadatan Jaringan',
    desc: 'Kemampuan jaringan otot mempertahankan tekstur agar tidak hancur saat dimasak berjam-jam dalam kuah atau santan kental.',
  },
  {
    code: 'C4',
    name: 'Daya Serap Bumbu',
    attribute: 'Benefit',
    tag: 'Kekayaan Rempah',
    desc: 'Tingkat penetrasi bumbu dan kuah marinasi rempah ke dalam inti pori serat daging secara mendalam.',
  },
];

export const SYSTEM_WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Pilih Jenis Masakan',
    desc: 'Tentukan resep olahan yang ingin dibuat, seperti rendang tradisional, steak panggang, sop berkuah, atau tumisan cepat.',
    icon: 'UtensilsCrossed',
  },
  {
    step: '02',
    title: 'Penetapan Kriteria & Bobot',
    desc: 'Sistem memuat bobot ilmiah yang relevan untuk masakan terpilih, membedakan kriteria Benefit dan Cost secara objektif.',
    icon: 'Sliders',
  },
  {
    step: '03',
    title: 'Perhitungan Matriks SAW',
    desc: 'Matriks keputusan dinormalisasi dengan formula presisi matematis dan dikalikan dengan bobot preferensi kriteria.',
    icon: 'Calculator',
  },
  {
    step: '04',
    title: 'Hasil Peringkat & Justifikasi',
    desc: 'Sistem menampilkan potongan terbaik peringkat 1 dengan skor preferensi (Vi) lengkap dengan alasan ilmiah berbasis data.',
    icon: 'Award',
  },
];

export const SYSTEM_ADVANTAGES = [
  {
    title: 'Rekomendasi Berbasis Perhitungan Objektif',
    desc: 'Keputusan memasak bukan lagi sekadar perkiraan atau kebiasaan, melainkan hasil perhitungan matematis yang terstruktur.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Implementasi Murni Metode SAW',
    desc: 'Menggunakan algoritma Simple Additive Weighting yang telah tervalidasi 100% cocok dengan perhitungan acuan independen.',
    icon: 'Sparkles',
  },
  {
    title: 'Pemeringkatan Lengkap & Transparan',
    desc: 'Menampilkan ranking seluruh 5 alternatif potongan daging dari peringkat pertama hingga terakhir dengan perbandingan grafik.',
    icon: 'BarChart3',
  },
  {
    title: 'Informasi Karakteristik Fisik Lengkap',
    desc: 'Dilengkapi penjelasan tekstur, tingkat lemak, karakteristik jaringan ikat, dan kegunaan ideal setiap potongan daging.',
    icon: 'ShieldCheck',
  },
];

