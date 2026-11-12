# DOKUMENTASI TEKNIS 10 MODUL SISTEM (MODULE-DOCUMENTATION)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi Menggunakan Metode SAW

Dokumen ini berisi penjelasan terperinci mengenai arsitektur, fungsi, cara kerja, dan berkas implementasi dari 10 modul sistem yang dipersiapkan untuk Ujian Tengah Semester (UTS).

---

## Modul 1 — Landing Page / Beranda

### 1. Fungsi Modul
Menjadi pintu masuk utama bagi pengguna publik dan penguji sistem, menyajikan informasi esensial mengenai aplikasi SPK, mengedukasi pengunjung tentang cara kerja metode SAW, serta menyediakan navigasi cepat menuju proses rekomendasi.

### 2. Cara Kerja Fitur
- **Hero Section**: Menampilkan tajuk utama aplikasi, badge status DEMO, dan dua tombol aksi (Call-to-Action) untuk pengguna umum dan login administrator.
- **Bar Metrik Cepat**: Menampilkan ringkasan statistik sistem secara visual (jumlah potongan daging, jumlah kriteria, jumlah resep olahan, dan tingkat akurasi SAW 100%).
- **Section Edukasi Metode SAW**: Menguraikan 3 langkah inti algoritma SAW (Normalisasi Matriks, Pembobotan Kriteria, dan Perankingan Preferensi $V_i$) menggunakan formula matematis KaTeX.
- **Preview Katalog Daging & Resep**: Menampilkan kartu ringkasan contoh potongan daging dan jenis masakan yang didukung.

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/landing/LandingPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/landing/LandingPage.jsx)
- Layout: [`src/layouts/PublicLayout.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/layouts/PublicLayout.jsx)
- Data Adapter: [`src/services/storageAdapter.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/services/storageAdapter.js)

---

## Modul 2 — Pemilihan Jenis Masakan

### 1. Fungsi Modul
Menyediakan antarmuka interaktif bagi pengguna untuk memilih resep masakan sapi yang ingin dibuat. Karakteristik pengolahan masakan (suhu, durasi masak, media kuah) menjadi acuan dalam penentuan kriteria dan rekomendasi potongan daging.

### 2. Cara Kerja Fitur
- **Katalog 6 Resep Olahan Sapi**: Memuat resep Rendang Daging, Steak Sapi Panggang, Sate Daging Sapi, Sop Daging Berkuah, Semur Daging Manis Gurih, dan Tumis Daging Cepat (*Stir-fry*).
- **Pencarian Real-Time**: Input teks pencarian memfilter daftar masakan berdasarkan nama resep, deskripsi, atau metode masak secara instan tanpa memuat ulang halaman.
- **Konteks Pengolahan**: Setiap kartu masakan memuat informasi metode memasak (misal: *Slow Cooking 3-5 jam*) dan petunjuk karakter daging yang dicari (*hint*).
- **Pemilihan Masakan**: Saat pengguna mengklik *"Pilih Masakan Ini & Analisis SAW"*, objek masakan disimpan ke `localStorage` dengan kunci `beefchoice_selected_recipe` dan pengguna dialihkan ke rute `#/recommendation`.

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/recipes/RecipeSelectionPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/recipes/RecipeSelectionPage.jsx)
- Storage Service: [`src/services/storageAdapter.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/services/storageAdapter.js)

---

## Modul 3 — Mesin Perhitungan SAW (*Calculation Engine*)

### 1. Fungsi Modul
Pusat logika komputasi murni yang mengeksekusi tahapan algoritma Simple Additive Weighting. Dibuat independen tanpa ketergantungan pada UI (*loosely coupled*) sehingga siap dipindahkan ke backend service.

### 2. Cara Kerja Fitur
- **Validasi Masukan (`validateSawInput`)**:
  - Memverifikasi kelengkapan array alternatif, kriteria, dan matriks keputusan $X$.
  - Memastikan akumulasi total bobot tepat bernilai $1{,}00$ atau $100\%$ (toleransi desimal $0{,}0001$).
  - Memastikan seluruh bobot bernilai positif ($w_j > 0$).
  - Mendeteksi nilai pada kriteria bertipe Cost. Jika $x_{ij} \le 0$, proses ditolak untuk mencegah galat pembagian dengan nol (*division-by-zero*).
- **Normalisasi Matriks ($R$)**:
  - Benefit: $r_{ij} = \frac{x_{ij}}{\max_i(x_{ij})}$
  - Cost: $r_{ij} = \frac{\min_i(x_{ij})}{x_{ij}}$
  - Nilai Seragam: Jika seluruh nilai alternatif pada suatu kriteria bernilai sama ($\max = \min$), nilai normalisasi ditetapkan $1{,}0$ secara proporsional.
- **Perkalian Bobot Terbobot**: Menghitung $w_j \times r_{ij}$ untuk tiap sel.
- **Perhitungan Nilai Preferensi ($V_i$)**: Menjumlahkan seluruh nilai terbobot kriteria:
  $$V_i = \sum_{j=1}^n w_j \cdot r_{ij}$$
- **Perangkingan & Tie-Breaking Deterministik**: Mengurutkan alternatif berdasarkan nilai preferensi tertinggi dengan presisi floating-point penuh. Jika skor seri, pemeringkatan membandingkan kontribusi kriteria berbobot tertinggi lalu urutan kode alternatif.
- **Formulasi Alasan Ilmiah**: Merumuskan justifikasi otomatis berdasarkan dua kriteria yang memberikan kontribusi skor terbesar bagi alternatif bersangkutan.

### 3. Berkas Implementasi Terkait
- Engine Logika: [`src/utils/sawEngine.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/utils/sawEngine.js)
- Test Suite: [`src/utils/sawEngine.test.mjs`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/utils/sawEngine.test.mjs)

---

## Modul 4 — Hasil Rekomendasi

### 1. Fungsi Modul
Menampilkan hasil keputusan akhir sistem kepada pengguna umum secara informatif, transparan, dan mudah dipahami.

### 2. Cara Kerja Fitur
- **Kartu Sorotan Rekomendasi Utama (Juara #1)**: Menampilkan nama potongan terbaik, kode alternatif, nilai preferensi $V_1$, karakteristik tekstur, dan kandungan lemak.
- **Alasan Berbasis Kriteria**: Memaparkan kalimat justifikasi ilmiah mengapa potongan tersebut menempati peringkat pertama berdasarkan data kriteria SAW.
- **Grafik Batang Komparatif**: Visualisasi proporsional persentase nilai preferensi seluruh alternatif (skala $0{,}0000$ hingga $1{,}0000$).
- **Tabel Peringkat Lengkap**: Menampilkan urutan ranking alternatif dari peringkat 1 hingga 5 lengkap dengan rincian skor.
- **Tabel Matriks Kontribusi Kriteria**: Membandingkan kontribusi terbobot tiap kriteria untuk seluruh alternatif.
- **Modal Rincian Rumus**: Menampilkan rumus normalisasi dan bobot kriteria yang digunakan.
- **Aksi Simpan**: Tombol *"Simpan ke Riwayat"* membekukan seluruh parameter ke dalam snapshot riwayat.
- **Dropdown Pemilih Masakan Dinamis**: Memungkinkan pengguna beralih jenis masakan secara langsung untuk melihat perubahan peringkat potongan daging secara real-time.

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/recommendations/RecommendationResultPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/recommendations/RecommendationResultPage.jsx)
- Engine SAW: [`src/utils/sawEngine.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/utils/sawEngine.js)

---

## Modul 5 — Riwayat Rekomendasi

### 1. Fungsi Modul
Menyimpan dan mengelola arsip hasil perhitungan SAW sebelumnya baik untuk pengguna publik maupun administrator.

### 2. Cara Kerja Fitur
- **Penyimpanan Snapshot Permanen**: Saat rekomendasi disimpan, sistem tidak hanya mencatat nama masakan dan pemenang, melainkan menyimpan seluruh snapshot parameter: nama masakan, metode masak, kriteria, bobot, dan urutan ranking saat perhitungan dilakukan.
- **Integritas Arsip Masa Lalu**: Jika admin kelak mengubah data master potongan atau bobot kriteria, riwayat lama tidak akan terpengaruh karena merujuk pada data snapshot statis.
- **Pencarian & Filter**: Memfilter riwayat berdasarkan kata kunci teks atau kategori olahan masakan.
- **Modal Peninjauan Snapshot**: Menampilkan kembali rincian lengkap parameter perhitungan terdahulu.
- **Manajemen Arsip**: Menyediakan opsi penghapusan riwayat per baris dan pembersihan seluruh riwayat.

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/history/HistoryPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/history/HistoryPage.jsx)
- Storage Adapter: [`src/services/storageAdapter.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/services/storageAdapter.js)

---

## Modul 6 — Login dan Autentikasi Admin

### 1. Fungsi Modul
Mengamankan akses menuju modul-modul pengelolaan data sistem (panel administrator) agar tidak dapat diakses secara bebas oleh pihak luar.

### 2. Cara Kerja Fitur
- **Form Login**: Menyediakan field masukan username dan kata sandi dengan toggle intip sandi (*show/hide password*).
- **Validasi Input**: Memvalidasi kelengkapan form sebelum proses autentikasi.
- **Sesi Klien DEMO**: Memverifikasi kecocokan kredensial akun DEMO (`admin` / `admin123`). Jika cocok, status login (`isAuthenticated: true`) disimpan ke `localStorage`.
- **Proteksi Rute (*Route Guard*)**: Komponen `App.jsx` memeriksa seluruh rute berawalan `#/admin/*`. Jika pengguna belum terautentikasi, akses dialihkan ke form login dengan label otorisasi.
- **Mekanisme Keluar (*Logout*)**: Menghapus data sesi autentikasi dan mengembalikan status navigasi ke mode publik.

### 3. Berkas Implementasi Terkait
- Halaman Login: [`src/features/auth/LoginPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/auth/LoginPage.jsx)
- Penjaga Rute: [`src/app/App.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/app/App.jsx)
- Layout Admin: [`src/layouts/AdminLayout.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/layouts/AdminLayout.jsx)

---

## Modul 7 — Dashboard Admin

### 1. Fungsi Modul
Pusat kendali dan tinjauan ringkas metrik sistem bagi administrator.

### 2. Cara Kerja Fitur
- **Kartu Statistik Kunci**: Menampilkan 4 metrik agregat: Total Bagian Daging, Total Jenis Masakan, Total Kriteria, dan Total Riwayat Perhitungan.
- **Pintasan Aksi Administrasi**: Tombol navigasi cepat untuk menambah daging, mengatur bobot, menjalankan simulator SAW, atau mencetak laporan.
- **Tabel Riwayat Aktivitas Terkini**: Menampilkan tabel perhitungan terbaru yang dilakukan sistem lengkap dengan skor preferensi $V$ dan jenis masakan.
- **Tombol Pemulihan Data (*Reset DEMO*)**: Tombol untuk mengembalikan seluruh dataset ke kondisi awal jika administrator selesai bereksperimen mengubah data.

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/dashboard/DashboardPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/dashboard/DashboardPage.jsx)
- Storage Adapter: [`src/services/storageAdapter.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/services/storageAdapter.js)

---

## Modul 8 — Manajemen Data Potongan Daging dan Masakan

### 1. Fungsi Modul
Menyediakan operasi CRUD (*Create, Read, Update, Delete*) untuk mengelola entitas alternatif potongan daging sapi dan jenis masakan.

### 2. Cara Kerja Fitur
- **Subfitur 8.1: CRUD Potongan Daging Sapi (`BeefCutsPage.jsx`)**:
  - Menampilkan daftar potongan daging dengan atribut kode (A1-A5), nama, tekstur, tingkat lemak, karakteristik, dan kegunaan cocok.
  - Tambah Daging Baru: Memvalidasi seluruh masukan dan secara otomatis menginisialisasi sel nilai default (nilai 3) pada matriks keputusan $X$.
  - Ubah Daging: Mengedit atribut deskripsi atau karakteristik daging.
  - Hapus Daging: Menghapus potongan dari sistem dan secara otomatis membersihkan baris terkait pada matriks keputusan.
- **Subfitur 8.2: CRUD Jenis Masakan (`RecipeManagementPage.jsx`)**:
  - Menampilkan katalog olahan masakan sapi.
  - Tambah, Ubah, dan Hapus masakan dengan validasi field wajib.
  - Perubahan tersimpan secara persisten pada `localStorage`.

### 3. Berkas Implementasi Terkait
- Manajemen Daging: [`src/features/beef-cuts/BeefCutsPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/beef-cuts/BeefCutsPage.jsx)
- Manajemen Masakan: [`src/features/recipes/RecipeManagementPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/recipes/RecipeManagementPage.jsx)

---

## Modul 9 — Manajemen Kriteria dan Bobot

### 1. Fungsi Modul
Mengelola parameter kriteria penilaian, penentuan sifat Benefit/Cost, pembobotan preferensi, dan pengisian matriks keputusan alternatif.

### 2. Cara Kerja Fitur
- **CRUD Kriteria**: Mengelola kriteria penilaian (kode C1-C4, nama, sifat Benefit/Cost, skala penilaian, deskripsi).
- **Pengaturan Bobot Dinamis**: Administrator dapat menyesuaikan persentase bobot tiap kriteria.
- **Validasi Ketat Total Bobot 100%**: Indikator akumulasi bobot real-time memvalidasi bahwa total persentase harus tepat $100\%$ ($1{,}00$). Jika bobot kurang atau lebih, tombol simpan dinonaktifkan.
- **Preset Bobot Berdasarkan Masakan**: Disediakan tombol jalan pintas preset:
  - *Steak*: Memprioritaskan Keempukan ($45\%$).
  - *Rendang*: Memprioritaskan Ketahanan Rebusan ($40\%$) dan Bumbu ($30\%$).
  - *Sop*: Memprioritaskan Lemak Kaldu ($30\%$).
  - *Default Seimbang*: $30\%, 20\%, 25\%, 25\%$.
- **Pengaturan Matriks Keputusan ($X$)**: Tabel masukan interaktif untuk menentukan skor penilaian alternatif terhadap kriteria (skala 1 - 5).

### 3. Berkas Implementasi Terkait
- Komponen: [`src/features/criteria/CriteriaPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/criteria/CriteriaPage.jsx)

---

## Modul 10 — Simulator Perhitungan dan Laporan

### 1. Fungsi Modul
Menyediakan transparansi kalkulasi matematis langkah-demi-langkah bagi auditor/akademisi serta menghasilkan dokumen laporan resmi yang siap dicetak atau diekspor.

### 2. Cara Kerja Fitur
- **Subfitur 10.1: Simulator Perhitungan SAW (`SawCalculationPage.jsx`)**:
  - Membagi proses kalkulasi ke dalam 4 tab transparansi:
    - Tab 1: Matriks Keputusan Asal ($X$).
    - Tab 2: Matriks Normalisasi ($R$) beserta nilai maksimum/minimum tiap kriteria.
    - Tab 3: Matriks Terbobot ($W$) hasil perkalian bobot kriteria.
    - Tab 4: Hasil Perangkingan Akhir ($V_i$) beserta justifikasi ilmiah.
  - Tab Verifikasi Benchmark Independen: Membandingkan langsung hasil sistem dengan hasil hitungan manual independen untuk pembuktian akurasi 100%.
- **Subfitur 10.2: Laporan Resmi Keputusan (`ReportsPage.jsx`)**:
  - Pratinjau Dokumen Standar A4: Tata letak dokumen formal dengan kop surat, nomor dokumen unik, tanggal, parameter masakan, tabel kriteria, dan tabel ranking.
  - Pilihan Sumber Data: Dapat mencetak kalkulasi aktif saat ini atau mencetak arsip dari snapshot riwayat masa lalu.
  - Fitur Ekspor JSON: Mengunduh payload data laporan dalam format `.json`.
  - Fitur Salin Teks: Menyalin ringkasan eksekutif laporan ke clipboard.
  - Fitur Cetak / Simpan PDF: Memanfaatkan dialog `window.print()` yang dioptimalkan dengan aturan `@media print` sehingga seluruh tombol, navbar, dan sidebar otomatis tersembunyi.

### 3. Berkas Implementasi Terkait
- Simulator: [`src/features/saw/SawCalculationPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/saw/SawCalculationPage.jsx)
- Laporan: [`src/features/reports/ReportsPage.jsx`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/features/reports/ReportsPage.jsx)

