# BeefChoice — SPK Pemilihan Bagian Daging Sapi Metode SAW

![BeefChoice Cover](https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80)

> **Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode Simple Additive Weighting (SAW)**  
> Tugas Ujian Tengah Semester (UTS) — Mata Kuliah Pemrograman Web 3  
> **STIKOM El Rahma Bogor**

---

## 📌 1. Gambaran Umum Proyek

**BeefChoice** adalah aplikasi Sistem Pendukung Keputusan (SPK) berbasis web yang dirancang untuk membantu juru masak, pelaku bisnis kuliner, dan masyarakat umum dalam menentukan potongan karkas daging sapi yang paling ideal berdasarkan jenis masakan yang ingin dibuat.

Setiap potongan daging sapi memiliki karakteristik fisik yang berbeda secara signifikan—mulai dari kelembutan serat otot, kandungan lemak (*marbling*), jaringan ikat kolagen, hingga ketahanan terhadap proses pemanasan. Kesalahan dalam memilih bagian daging dapat menyebabkan masakan menjadi keras/liat (misal: paha belakang untuk steak) atau sebaliknya hancur dan terlalu berlemak (misal: sandung lamur untuk rendang).

Dengan menerapkan algoritma **Simple Additive Weighting (SAW)**, BeefChoice memproses kriteria penilaian bertipe *Benefit* dan *Cost* secara matematis, objektif, dan transparan untuk menghasilkan perankingan potongan daging terbaik beserta justifikasi ilmiahnya.

---

## 🎯 2. Tujuan Aplikasi

1. **Memberikan Rekomendasi Objektif**: Menggantikan proses pemilihan daging yang sebelumnya hanya mengandalkan intuisi atau kebiasaan dengan perhitungan terukur.
2. **Transparansi Matematis**: Membuka seluruh tahapan perhitungan SAW (Matriks Keputusan $X$, Matriks Normalisasi $R$, Matriks Terbobot $W$, hingga Nilai Preferensi $V_i$) agar dapat diuji keabsahannya.
3. **Edukasi Kuliner**: Memberikan informasi karakteristik fisik (tekstur, lemak, otot) serta kesesuaian potongan daging sapi terhadap berbagai variasi olahan masakan Nusantara maupun internasional.
4. **Memenuhi Ketentuan Akademik UTS**: Mengimplementasikan arsitektur *frontend-only* interaktif dengan data *dummy* terisolasi berlabel DEMO.

---

## 🚀 3. Link Repositori & Hosting Production

- **Repositori GitHub**: [https://github.com/Fakhrivsc/project-fakhri-spk-smstr-5](https://github.com/Fakhrivsc/project-fakhri-spk-smstr-5)
- **Live Deployment Vercel**: [https://project-fakhri-spk-smstr-5.vercel.app](https://project-fakhri-spk-smstr-5.vercel.app)

---

## 🛠️ 4. Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur web modern yang ringan, cepat, dan responsif:

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework Frontend** | **React 18** (`^18.3.1`) | UI library berbasis komponen fungsional modern dan hooks |
| **Build Tool & Bundler** | **Vite 6** (`^6.1.0`) | Pengembangan super cepat dengan Hot Module Replacement (HMR) |
| **Bahasa Pemrograman** | **JavaScript (ES6+) / JSX** | Pemrograman modular dan deklaratif |
| **Icon Library** | **lucide-react** (`^0.475.0`) | Ikon vektor SVG modern, ringan, dan seragam |
| **Styling & Desain** | **Custom Modular CSS** | Design Tokens murni (CSS Variables) tanpa framework CSS besar, menghasilkan ukuran bundle sangat kecil (~81 KB JS gzipped, ~5 KB CSS) |
| **Routing** | **Hash-based Router** | Navigasi SPA via `window.location.hash`, bebas dari galat 404 saat deep link di-refresh |
| **Penyimpanan Data** | **Web Storage API (`localStorage`)** | Penyimpanan terisolasi dengan Adapter Pattern di sisi klien |
| **Hosting Platform** | **Vercel** | CI/CD deployment otomatis dengan konfigurasi `vercel.json` |

---

## 💡 5. Fitur Utama Aplikasi (10 Modul)

1. **Modul 1 — Beranda / Landing Page**:
   - Hero section modern dengan fotografi daging sapi resolusi tinggi dan dark-gradient overlay.
   - Kartu simulasi keputusan SAW interaktif (*Interactive Live Showcase Card*).
   - Penjelasan formula Benefit/Cost dan indikator metrik sistem.
2. **Modul 2 — Pemilihan Jenis Masakan**:
   - Katalog 6 jenis olahan sapi (Rendang, Steak, Sate, Sop, Semur, Tumisan).
   - Fitur pencarian instan (*real-time search filter*).
   - Petunjuk metode masak dan karakter daging yang dicari.
3. **Modul 3 — Mesin Perhitungan SAW (`sawEngine.js`)**:
   - Komputasi murni terpisah dari antarmuka (*loosely coupled*).
   - Presisi floating-point penuh dengan penanganan pembagian dengan nol (*division-by-zero*).
   - Lolos 5 dari 5 pengujian unit independen (*Golden Benchmark*).
4. **Modul 4 — Hasil Rekomendasi**:
   - Sorotan potongan juara peringkat 1 dengan kartu pemenang dan skor $V_i$.
   - Justifikasi ilmiah berbasis kriteria unggulan.
   - Grafik batang perbandingan nilai preferensi seluruh alternatif.
   - Modal formula rincian matematis SAW.
5. **Modul 5 — Riwayat Rekomendasi (Snapshot Mode)**:
   - Menyimpan hasil rekomendasi ke penyimpanan lokal.
   - Fitur arsip snapshot: parameter lama tidak terpengaruh jika data master kriteria diedit.
   - Filter dan pencarian riwayat.
6. **Modul 6 — Login & Autentikasi Admin (Client-Side)**:
   - Form login administrator dengan toggle intip kata sandi.
   - Proteksi rute admin (`#/admin/*`) dan sesi logout yang aman.
7. **Modul 7 — Dashboard Administrator**:
   - 4 Kartu statistik ringkas sistem.
   - Tabel riwayat rekomendasi terkini.
   - Tombol pemulihan (*Reset ke Default DEMO*).
8. **Modul 8 — Manajemen Potongan Daging & Masakan (CRUD)**:
   - Tambah, lihat, ubah, dan hapus potongan daging sapi (A1 - A5).
   - Tambah, lihat, ubah, dan hapus jenis masakan.
   - Sinkronisasi otomatis ke baris matriks keputusan $X$.
9. **Modul 9 — Manajemen Kriteria & Bobot**:
   - Pengaturan sifat atribut (*Benefit* vs *Cost*).
   - Validasi ketat total akumulasi bobot harus tepat 100% (1,00).
   - Preset bobot masakan dinamis (Steak, Rendang, Sop, Default).
   - Editor sel matriks keputusan $X$ (skala 1 - 5).
10. **Modul 10 — Simulator Perhitungan & Laporan Resmi**:
    - Transparansi 4 tahapan SAW (Matriks $X$, Normalisasi $R$, Terbobot $W$, Ranking $V_i$).
    - Tab verifikasi uji acuan independen.
    - Pratinjau dokumen resmi A4 dengan fitur Cetak PDF via browser (`@media print`).
    - Ekspor payload data laporan format JSON (`.json`) dan salin teks.

---

## 📐 6. Penjelasan Metode Simple Additive Weighting (SAW)

Metode SAW sering juga dikenal dengan istilah metode penjumlahan terbobot. Konsep dasar SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif di semua kriteria.

### A. Kriteria Penilaian
1. **$C_1$ — Tingkat Keempukan (*Tenderness*)** $\rightarrow$ **Benefit** (Bobot default: $30\%$)
2. **$C_2$ — Kandungan Lemak (*Fat Content*)** $\rightarrow$ **Cost** (Bobot default: $20\%$)
3. **$C_3$ — Ketahanan Rebusan Lama** $\rightarrow$ **Benefit** (Bobot default: $25\%$)
4. **$C_4$ — Daya Serap Bumbu** $\rightarrow$ **Benefit** (Bobot default: $25\%$)

### B. Alternatif Potongan Daging Sapi
- **$A_1$**: Has Dalam (*Tenderloin*)
- **$A_2$**: Has Luar (*Sirloin*)
- **$A_3$**: Sandung Lamur (*Brisket*)
- **$A_4$**: Sengkel (*Shank*)
- **$A_5$**: Paha Belakang (*Round/Gandik*)

### C. Tahapan Perhitungan Matematis
1. **Pembentukan Matriks Keputusan ($X$)**:
   Menyusun nilai rating kecocokan setiap alternatif $A_i$ pada kriteria $C_j$.
2. **Normalisasi Matriks ($R$)**:
   - **Kriteria Benefit (Keuntungan)**:
     $$r_{ij} = \frac{x_{ij}}{\max_i(x_{ij})}$$
   - **Kriteria Cost (Biaya)**:
     $$r_{ij} = \frac{\min_i(x_{ij})}{x_{ij}}$$
3. **Perhitungan Nilai Preferensi ($V_i$)**:
   $$V_i = \sum_{j=1}^n w_j \cdot r_{ij}$$
   Alternatif dengan nilai $V_i$ terbesar dipilih sebagai rekomendasi terbaik (Peringkat #1).

---

## 🔒 7. Batasan Sistem & Penggunaan Data Dummy (UTS Compliance)

Sesuai dengan ketentuan tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web 3:
- **Arsitektur**: Aplikasi beroperasi secara **Frontend Only (100% Client-Side)**.
- **Penyimpanan**: Menggunakan **Web Storage (`localStorage`)**, belum menggunakan database server terpusat.
- **Data**: Menggunakan **Data Dummy** berlabel eksplisit **DEMO**. Data ini bukan klaim hasil uji laboratorium peternakan aktual, melainkan model percontohan untuk mendemonstrasikan algoritma SAW.
- **Autentikasi**: Menggunakan *client-side mock session*. Kredensial akun administrator bawaan:
  - **Username**: `admin`
  - **Password**: `admin123`
- **Rencana Lanjutan (UAS)**: Integrasi backend REST API (Node.js/Express) dan basis data relasional PostgreSQL telah dirancang pada dokumen `BACKEND-ROADMAP.md`.

---

## 💻 8. Cara Menjalankan Aplikasi Secara Lokal (Localhost)

### Prasyarat
- Node.js versi 18.x atau 20.x (disarankan LTS)
- Git terpasang di komputer

### Langkah Instalasi & Menjalankan:
1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Fakhrivsc/project-fakhri-spk-smstr-5.git
   cd project-fakhri-spk-smstr-5
   ```
2. **Instal Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
4. **Buka di Peramban**:
   Akses URL lokal yang ditampilkan pada terminal:
   👉 **`http://localhost:5173/`** atau **`http://localhost:3000/`**

5. **Menjalankan Pengujian Unit SAW**:
   ```bash
   node src/utils/sawEngine.test.mjs
   ```

6. **Membangun Versi Produksi**:
   ```bash
   npm run build
   ```

---

## 👥 Pengembang

- **Nama**: Fakhri (`Fakhrivsc`)
- **Email**: `miftahulkhairifakhri@gmail.com`
- **Institusi**: STIKOM El Rahma Bogor
- **Mata Kuliah**: Pemrograman Web 3 (Semester 5)
