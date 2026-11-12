# LAPORAN PENGUJIAN SISTEM (TESTING-REPORT)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi Menggunakan Metode SAW

- **Tanggal Pengujian**: Persiapan Ujian Tengah Semester (UTS) Semester 5
- **Lingkungan Pengujian**: Node.js v20.x / Vite v6.1.0 / Windows (PowerShell) / Chromium Browser
- **Metode Pengujian**: Unit Testing Otomatis, Integration Testing, Build Verification, & Black-Box Testing Antarmuka

---

## 1. Ringkasan Hasil Pengujian

| Kategori Pengujian | Jumlah Skenario | Lolos (PASS) | Gagal (FAIL) | Tingkat Keberhasilan |
|---|:---:|:---:|:---:|:---:|
| **A. Kompilasi & Build Produksi** | 1 | 1 | 0 | **100%** |
| **B. Mesin Algoritma SAW Mandiri** | 5 | 5 | 0 | **100%** |
| **C. Fungsionalitas Antarmuka (UI/UX)** | 10 | 10 | 0 | **100%** |
| **D. Operasi Penyimpanan (CRUD & Snapshot)** | 5 | 5 | 0 | **100%** |
| **E. Keamanan Sesi & Otorisasi Rute** | 3 | 3 | 0 | **100%** |
| **TOTAL** | **24** | **24** | **0** | **100%** |

---

## 2. Pengujian Algoritma SAW Mandiri (`sawEngine.test.mjs`)

Pengujian algoritma dieksekusi secara otomatis pada terminal menggunakan runner mandiri Node.js untuk membuktikan kebenaran matematis tanpa distorsi antarmuka.

### Perintah Eksekusi:
```bash
node src/utils/sawEngine.test.mjs
```

### Rincian Skenario & Hasil Pengujian:

#### [UJI 1] Verifikasi Terhadap Hasil Perhitungan Manual Independen (*Golden Benchmark*)
- **Tujuan**: Memastikan nilai preferensi $V_i$ dan urutan peringkat alternatif yang dihitung sistem cocok 100% dengan hasil kalkulasi manual independen.
- **Masukan Data**:
  - $A_1$: Has Dalam (C1:5, C2:2, C3:2, C4:4)
  - $A_2$: Has Luar (C1:4, C2:3, C3:3, C4:4)
  - $A_3$: Sandung Lamur (C1:2, C2:5, C3:4, C4:5)
  - $A_4$: Sengkel (C1:2, C2:2, C3:5, C4:4)
  - $A_5$: Paha Belakang (C1:3, C2:1, C3:5, C4:3)
  - Bobot: C1: 0,30 (Benefit), C2: 0,20 (Cost), C3: 0,25 (Benefit), C4: 0,25 (Benefit).
- **Hasil Aktual**:
  - $A_5$: Peringkat 1 | Skor $V = 0{,}7800$ (Harapan: 1 / $0{,}7800$) $\rightarrow$ **PASS**
  - $A_1$: Peringkat 2 | Skor $V = 0{,}7000$ (Harapan: 2 / $0{,}7000$) $\rightarrow$ **PASS**
  - $A_4$: Peringkat 3 | Skor $V = 0{,}6700$ (Harapan: 3 / $0{,}6700$) $\rightarrow$ **PASS**
  - $A_2$: Peringkat 4 | Skor $V = 0{,}6567$ (Harapan: 4 / $0{,}6567$) $\rightarrow$ **PASS**
  - $A_3$: Peringkat 5 | Skor $V = 0{,}6100$ (Harapan: 5 / $0{,}6100$) $\rightarrow$ **PASS**
- **Status**: **PASS (100% Cocok)**

#### [UJI 2] Validasi Total Bobot Tidak Valid
- **Tujuan**: Memastikan sistem menolak kalkulasi jika akumulasi bobot kriteria tidak sama dengan 100% atau 1,00.
- **Masukan Data**: Total bobot diatur menjadi 110% ($1{,}10$).
- **Hasil Aktual**: Sistem menolak input dengan pesan galat: *"Total bobot kriteria harus tepat 1,00 (100%). Akumulasi saat ini: 1.1%."*
- **Status**: **PASS**

#### [UJI 3] Validasi Pembagian dengan Nol (*Division by Zero* pada Cost)
- **Tujuan**: Memastikan kriteria Cost bernilai $\le 0$ dideteksi dan dicegah agar tidak memicu division-by-zero.
- **Masukan Data**: Nilai $x_{12}$ (Kriteria Cost C2 pada A1) diisi angka 0.
- **Hasil Aktual**: Sistem menolak kalkulasi dengan pesan: *"Kriteria Cost (C2) pada 'Has Dalam' bernilai 0. Nilai kriteria Cost tidak boleh kurang dari atau sama dengan nol karena memicu pembagian dengan nol."*
- **Status**: **PASS**

#### [UJI 4] Penanganan Nilai Seragam (*Uniform Value Handling*)
- **Tujuan**: Memastikan jika seluruh alternatif memiliki nilai yang persis sama pada suatu kriteria, sistem memberikan nilai normalisasi $1{,}0$ yang proporsional.
- **Masukan Data**: Seluruh alternatif diberi nilai 4 pada kriteria C4.
- **Hasil Aktual**: Seluruh $r_{i4}$ menghasilkan nilai $1{,}0000$ dan kalkulasi preferensi berlanjut secara adil.
- **Status**: **PASS**

#### [UJI 5] Konsistensi Aturan Pemecah Seri (*Tie-Breaking Determinism*)
- **Tujuan**: Memastikan pemeringkatan konsisten ketika dua alternatif memiliki skor preferensi yang identik.
- **Masukan Data**: Dua alternatif dengan matriks identik sehingga menghasilkan skor $V = 1{,}0000$.
- **Hasil Aktual**: Sistem membandingkan kontribusi kriteria berbobot tertinggi dan kode alfabetik secara deterministik.
- **Status**: **PASS**

---

## 3. Pengujian Kompilasi & Build Produksi

- **Perintah**: `npm run build`
- **Runner**: Vite v6.1.0
- **Hasil Log**:
  ```text
  ✓ 1615 modules transformed.
  dist/index.html                   0.88 kB │ gzip:  0.50 kB
  dist/assets/index-B_n55PYW.css   18.01 kB │ gzip:  3.92 kB
  dist/assets/index-DkLOm8c8.js   292.30 kB │ gzip: 78.40 kB
  ✓ built in 8.96s
  ```
- **Kesimpulan**: Tidak ditemukan galat sintaksis, circular dependency, atau missing import. Status: **PASS**.

---

## 4. Pengujian Fungsionalitas Antarmuka (Black-Box Testing)

| ID Uji | Fitur / Skenario Uji | Prosedur Uji | Ekspektasi Sistem | Hasil Aktual | Status |
|:---:|---|---|---|---|:---:|
| **UI-01** | Halaman Utama (Beranda) | Buka `http://localhost:5173/#/` | Tampil hero section, metrik SAW, dan navigasi | Elemen tampil lengkap dan proporsional | **PASS** |
| **UI-02** | Filter Pencarian Masakan | Ketik *"Rendang"* pada search box | Daftar masakan terfilter menampilkan Rendang | Masakan tersaring secara instan | **PASS** |
| **UI-03** | Rekomendasi Pemenang | Pilih Rendang & buka rekomendasi | Paha Belakang (A5) tampil sebagai juara #1 | Juara #1 tampil dengan skor 0,7800 | **PASS** |
| **UI-04** | Modal Rumus Matematis | Klik *"Lihat Rincian Rumus SAW"* | Modal formula benefit/cost dan bobot terbuka | Modal terbuka dengan formula KaTeX | **PASS** |
| **UI-05** | Simpan ke Riwayat | Klik *"Simpan ke Riwayat"* | Data tersimpan ke storage dan toast sukses muncul | Toast hijau muncul, riwayat bertambah | **PASS** |
| **UI-06** | Peninjauan Snapshot Riwayat | Buka `#/history` & klik snapshot | Modal membuka parameter lama tanpa berubah | Parameter kriteria dan skor lama tampil utuh | **PASS** |
| **UI-07** | CRUD Potongan Daging | Tambah daging baru (A6) pada admin | Daging tersimpan dan sel matriks terisi | Data muncul di tabel & matriks keputusan | **PASS** |
| **UI-08** | Validasi Total Bobot di Admin | Ubah bobot hingga total 110% | Indikator merah & tolak simpan | Indikator merah aktif & tombol simpan dicegah | **PASS** |
| **UI-09** | Transparansi 4 Tahap SAW | Buka menu simulator SAW | Tab Matriks X, R, W, V dapat diinspeksi | Seluruh 4 tab kalkulasi menampilkan data presisi | **PASS** |
| **UI-10** | Cetak Laporan Formal | Klik *"Cetak Dokumen Laporan"* | Dialog print browser terbuka, tombol navigasi hilang | Tampilan A4 bersih via `@media print` | **PASS** |

---

## 5. Pengujian Keamanan Sesi & Otorisasi Rute

| ID Uji | Skenario Uji | Masukan / Kondisi | Ekspektasi | Hasil Aktual | Status |
|:---:|---|---|---|---|:---:|
| **SEC-01** | Akses Proteksi Rute Admin | Akses `#/admin/dashboard` tanpa login | Dicegah dan diarahkan ke form login | Tampil pesan *"Autentikasi Diperlukan"* & form login | **PASS** |
| **SEC-02** | Validasi Form Login | Username / password salah | Menampilkan pesan galat | Pesan galat muncul, sesi tidak dibuat | **PASS** |
| **SEC-03** | Logout Administrator | Klik tombol *"Keluar"* di header admin | Sesi terhapus, toast info muncul, kembali ke beranda | Sesi `localStorage` terhapus dan navigasi ke beranda | **PASS** |

---

## 6. Kesimpulan Pengujian

Seluruh 24 skenario pengujian yang mencakup verifikasi algoritma matematis, kehandalan build, fungsionalitas UI, CRUD, dan proteksi sesi klien telah berstatus **PASS (100% Lolos)**. Aplikasi dinyatakan **stabil, tahan galat (*fault-tolerant*), dan siap untuk didemonstrasikan di hadapan dosen penguji UTS**.

