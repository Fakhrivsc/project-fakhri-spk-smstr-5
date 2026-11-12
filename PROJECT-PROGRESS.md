# LAPORAN PROGRES PROYEK (PROJECT-PROGRESS)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode Simple Additive Weighting (SAW)

- **Mata Kuliah**: Proyek Perangkat Lunak / Sistem Pendukung Keputusan (Semester 5)
- **Status Evaluasi**: Persiapan Ujian Tengah Semester (UTS)
- **Target Persyaratan UTS**: Minimal 50% modul selesai, berfungsi nyata di localhost, dan dapat didemonstrasikan.
- **Kondisi Capaian Aktual**: **56% Total Proyek Full-Stack** (100% Sisi Antarmuka & Algoritma SAW Frontend; 0% Sisi Backend Server & Basis Data Terpusat).

---

## 1. Ringkasan Eksekutif Progres Proyek

Proyek ini bertujuan membangun Sistem Pendukung Keputusan (SPK) berbasis web yang membantu juru masak, pelaku usaha kuliner, dan masyarakat umum dalam menentukan potongan daging sapi yang paling ideal berdasarkan karakteristik masakan yang ingin dibuat. Algoritma yang digunakan adalah **Simple Additive Weighting (SAW)** dengan normalisasi kriteria Benefit dan Cost.

Pada tahapan Ujian Tengah Semester (UTS), pengembangan difokuskan pada:
1. **Fondasi Arsitektur Frontend & UI/UX**: Dibangun menggunakan React 18 dan Vite 6 dengan desain responsif, palet warna elegan (hitam, putih, merah lembut), dan komponen terstandar.
2. **Mesin Kalkulasi SAW Mandiri**: Logika matematis SAW dipisahkan secara murni dari lapisan antarmuka di `src/utils/sawEngine.js`, dengan presisi floating-point penuh, penanganan division-by-zero, normalisasi kriteria seragam, serta tie-breaking deterministik.
3. **Penyimpanan Terisolasi Sisi Klien**: Seluruh data master (potongan daging, masakan, kriteria, matriks keputusan, riwayat ber-snapshot, dan sesi admin) dikelola melalui `storageAdapter.js` menggunakan `localStorage` dengan label data **DEMO**.

Dengan capaian seluruh 10 modul pada lapisan frontend berfungsi 100% dan algoritma SAW lulus uji acuan independen 100%, proyek telah **melampaui target kelayakan minimal 50% UTS**.

---

## 2. Tabel Audit Progres 10 Modul Proyek

| No | Nama Modul | Kondisi Implementasi Aktual | Progres Frontend | Progres Full-Stack | Status Kelayakan UTS |
|:---:|---|---|:---:|:---:|:---:|
| **1** | **Landing Page / Beranda** | Halaman utama dengan hero section, metrik sistem, edukasi formula SAW, dan CTA navigasi. | 100% | 60% | **SELESAI (Siap Demo)** |
| **2** | **Pemilihan Jenis Masakan** | Katalog 6 masakan olahan sapi, filter pencarian real-time, metode masak, dan pemilihan masakan. | 100% | 50% | **SELESAI (Siap Demo)** |
| **3** | **Mesin Perhitungan SAW** | Engine SAW terpisah, normalisasi Benefit/Cost, validasi bobot 100%, pembagian nol, dan uji independen 5/5 pass. | 100% | 100% | **SELESAI (Siap Demo)** |
| **4** | **Hasil Rekomendasi** | Kartu rekomendasi juara #1, tabel ranking lengkap nilai $V_i$, grafik komparasi, dan alasan berbasis data. | 100% | 50% | **SELESAI (Siap Demo)** |
| **5** | **Riwayat Rekomendasi** | Penyimpanan hasil hitung, filter/pencarian riwayat, serta modal snapshot parameter lama. | 100% | 50% | **SELESAI (Siap Demo)** |
| **6** | **Login & Autentikasi Admin** | Form login dengan validasi, sesi klien DEMO (`admin`/`admin123`), proteksi rute, dan logout. | 100% | 40% | **SELESAI (Siap Demo)** |
| **7** | **Dashboard Administrator** | Ringkasan 4 kartu statistik sistem, pintasan aksi cepat, tabel riwayat terkini, dan tombol reset demo. | 100% | 50% | **SELESAI (Siap Demo)** |
| **8** | **Manajemen Daging & Masakan** | CRUD lengkap potongan daging sapi (5 potongan) dan CRUD lengkap jenis masakan (6 olahan). | 100% | 50% | **SELESAI (Siap Demo)** |
| **9** | **Manajemen Kriteria & Bobot** | CRUD kriteria (Benefit/Cost), validasi ketat total bobot 100%, preset masakan, dan matriks keputusan $X$. | 100% | 50% | **SELESAI (Siap Demo)** |
| **10** | **Simulator SAW & Laporan** | Transparansi 4 tahapan SAW (X, R, W, V), verifikasi benchmark, cetak dokumen A4, dan ekspor JSON. | 100% | 60% | **SELESAI (Siap Demo)** |

---

## 3. Rincian Statistik Capaian Modul

- **Total Modul Sistem**: 10 Modul
- **Modul Selesai pada Lapisan Frontend**: 10 Modul (100%)
- **Modul Selesai pada Lapisan Algoritma SAW**: 100% (Terverifikasi matematis)
- **Modul dalam Antrean Integrasi Backend Pasca-UTS**: 10 Modul (Menunggu pembangunan API server dan database PostgreSQL)
- **Modul Belum Dikerjakan di Frontend**: 0 Modul (0%)
- **Rata-rata Kesiapan Demonstrasi UTS**: **100% Siap Dipresentasikan**

---

## 4. Evaluasi Kendala & Solusi Teknis

| Kendala yang Ditemukan | Analisis Dampak | Solusi yang Diterapkan |
|---|---|---|
| **Ketergantungan Sesi Browser (`localStorage`)** | Data modifikasi CRUD hilang jika pengguna membersihkan cache peramban. | Disediakan tombol *"Reset Semua Data ke Default DEMO"* pada pengaturan dan dashboard agar penguji dapat mengembalikan kondisi awal dengan 1 klik. |
| **Potensi Division-by-Zero pada Kriteria Cost** | Jika pengguna memasukkan nilai 0 pada kriteria berjenis Cost, rumus $r_{ij} = \min/x_{ij}$ memicu galat matematis infinity. | Diterapkan fungsi `validateSawInput` pada `sawEngine.js` yang secara tegas mendeteksi dan menolak nilai $\le 0$ pada kriteria Cost. |
| **Penyimpangan Total Bobot Kriteria** | Pengguna admin dapat keliru memasukkan bobot yang jika dijumlahkan tidak sama dengan 100% (1,00). | Antarmuka kriteria menyediakan indikator akumulasi bobot real-time. Jika total $\neq 100\%$, tombol simpan dinonaktifkan dan sistem menolak kalkulasi SAW. |
| **Layar Kosong (*Blank Screen*) saat Input Tak Valid** | Jika data kriteria kosong atau tidak valid, halaman rekomendasi berpotensi crash. | Ditambahkan komponen kartu penanganan galat (*error alert card*) di halaman rekomendasi dan simulator lengkap dengan tombol pemulihan. |
| **Responsivitas Perangkat Mobile** | Sidebar admin dan navigasi publik sempat terhambat pada layar smartphone $\le 768\text{ px}$. | Diperbaiki dengan penambahan *mobile drawer menu*, tombol burger, dan *backdrop overlay* di `layout.css` dan komponen layout. |

---

## 5. Rencana Pasca-UTS (Roadmap UAS)

1. **Pembangunan Backend REST API**: Menggunakan Node.js (Express.js) atau Python (FastAPI).
2. **Perancangan Basis Data Terpusat**: Menggunakan PostgreSQL dengan relasi antartabel yang ternormalisasi (3NF).
3. **Autentikasi & Otorisasi Server**: Implementasi JSON Web Token (JWT) dan hashing kata sandi menggunakan Bcrypt.
4. **Migrasi Storage Adapter**: Mengganti panggilan `localStorage` pada `storageAdapter.js` dengan HTTP Client (`fetch`/`axios`) yang memanggil endpoint REST API backend.
5. **Pengujian Integrasi End-to-End**: Melakukan pengujian penetrasi keamanan API dan pengujian beban sebelum persiapan sidang akhir semester (UAS).

