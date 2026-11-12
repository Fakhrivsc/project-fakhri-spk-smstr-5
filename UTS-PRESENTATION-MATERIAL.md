# MATERI PRESENTASI UJIAN TENGAH SEMESTER (UTS)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode Simple Additive Weighting (SAW)

Materi presentasi ini disusun sebagai panduan berbicara (*speech guide*) dan bahan tayang slide presentasi mahasiswa di hadapan dosen penguji Ujian Tengah Semester (UTS) Proyek Semester 5.

---

## SLIDE 1: JUDUL & IDENTITAS PROYEK

- **Judul Proyek**:  
  **Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode Simple Additive Weighting (SAW)**
- **Nama Mahasiswa**: [Nama Mahasiswa]
- **NIM**: [Nomor Induk Mahasiswa]
- **Program Studi / Kelas**: Teknik Informatika / Sistem Informasi (Semester 5)
- **Dosen Pengampu**: [Nama Dosen Pengampu / Penguji]

---

## SLIDE 2: LATAR BELAKANG MASALAH

1. **Variasi Karakteristik Daging Sapi**:
   - Daging sapi memiliki banyak bagian potongan (karkas) seperti has dalam, has luar, sengkel, sandung lamur, dan paha belakang.
   - Setiap potongan memiliki perbedaan signifikan pada kepadatan serat, kandungan lemak (*marbling*), jaringan ikat kolagen, dan daya tahan terhadap panas.
2. **Kesesuaian dengan Metode Memasak**:
   - Kesalahan pemilihan potongan daging sering kali membuat masakan menjadi keras/liat (misal: paha belakang untuk steak) atau sebaliknya hancur dan terlalu berminyak (misal: sandung lamur untuk rendang ungkep lama).
3. **Kebutuhan Pengambilan Keputusan yang Objektif**:
   - Sebagian besar masyarakat dan juru masak pemula hanya mengandalkan intuisi atau kebiasaan tanpa analisis kriteria terukur.
   - Diperlukan sebuah **Sistem Pendukung Keputusan (SPK)** yang mampu mengkalkulasi kecocokan karakteristik daging terhadap jenis masakan secara terukur, konsisten, dan transparan.

---

## SLIDE 3: RUMUSAN MASALAH & TUJUAN PROYEK

### Rumusan Masalah:
1. Bagaimana merancang dan membangun sistem pendukung keputusan yang dapat merekomendasikan potongan daging sapi yang tepat sesuai jenis masakan?
2. Bagaimana mengimplementasikan algoritma **Simple Additive Weighting (SAW)** untuk memproses kriteria Benefit dan Cost secara objektif?
3. Bagaimana menyajikan transparansi perhitungan dan alasan rekomendasi agar hasil keputusan dapat dipertanggungjawabkan secara ilmiah?

### Tujuan Proyek:
1. Menghasilkan aplikasi SPK berbasis web yang mudah diakses dan responsif.
2. Menerapkan metode SAW dengan presisi matematis penuh serta validasi total bobot 100%.
3. Menyediakan panel administrasi untuk mengelola data alternatif potongan daging, resep masakan, kriteria, dan pembobotan.

---

## SLIDE 4: BATASAN MASALAH (RUANG LINGKUP UTS)

Untuk menjaga fokus dan kualitas implementasi pada evaluasi UTS, ditetapkan batasan ruang lingkup:
1. **Platform**: Aplikasi Web Frontend (*Single Page Application*) dibangun menggunakan React 18 dan Vite 6.
2. **Metode SPK**: Menggunakan algoritma **Simple Additive Weighting (SAW)** dengan kriteria Benefit dan Cost.
3. **Dataset Awal (DEMO)**:
   - 5 Alternatif Potongan Daging: Has Dalam ($A_1$), Has Luar ($A_2$), Sandung Lamur ($A_3$), Sengkel ($A_4$), Paha Belakang ($A_5$).
   - 6 Olahan Masakan: Rendang, Steak, Sate, Sop, Semur, dan Tumisan.
   - 4 Kriteria Penilaian: Keempukan ($C_1$), Lemak ($C_2$), Ketahanan Rebusan ($C_3$), Daya Serap Bumbu ($C_4$).
4. **Penyimpanan Data Saat Ini**: Menggunakan `localStorage` terisolasi dengan kemampuan reset default.
5. **Backend & Database**: Backend API dan integrasi basis data terpusat (PostgreSQL) dijadwalkan pada tahap pasca-UTS (tahap UAS).

---

## SLIDE 5: METODOLOGI & ALGORITMA SAW

Metode **Simple Additive Weighting (SAW)** dipilih karena konsepnya yang mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif di semua kriteria.

### Tahapan Matematis SAW:
1. **Pembentukan Matriks Keputusan ($X$)**: Ukuran $m \times n$, merepresentasikan nilai alternatif terhadap kriteria.
2. **Normalisasi Matriks ($R$)**:
   - **Kriteria Benefit (Keuntungan)**: Nilai lebih besar lebih disukai.
     $$r_{ij} = \frac{x_{ij}}{\max_i(x_{ij})}$$
   - **Kriteria Cost (Biaya)**: Nilai lebih kecil lebih disukai (misal: lemak pada masakan tertentu).
     $$r_{ij} = \frac{\min_i(x_{ij})}{x_{ij}}$$
3. **Perhitungan Nilai Preferensi ($V_i$)**:
   $$V_i = \sum_{j=1}^n w_j \cdot r_{ij}$$
   Di mana $\sum w_j = 1{,}00$ (100%). Alternatif dengan nilai $V_i$ terbesar menjadi rekomendasi utama (Peringkat #1).

---

## SLIDE 6: CAPAIAN PROGRES PROYEK (10 MODUL)

Sesuai ketentuan UTS (minimal 50% modul selesai dan berfungsi nyata):

| Modul | Nama Modul | Capaian Frontend | Status Implementasi |
|:---:|---|:---:|---|
| **1** | Landing Page / Beranda | 100% | Hero section, metrik sistem, edukasi formula SAW. |
| **2** | Pemilihan Jenis Masakan | 100% | Katalog 6 masakan, pencarian real-time, metode masak. |
| **3** | Mesin Perhitungan SAW | 100% | Engine terpisah, normalisasi Benefit/Cost, 5/5 unit test lolos. |
| **4** | Hasil Rekomendasi | 100% | Juara #1, ranking lengkap nilai $V_i$, alasan berbasis data. |
| **5** | Riwayat Rekomendasi | 100% | Simpan riwayat, filter masakan, peninjauan snapshot parameter. |
| **6** | Login & Autentikasi Admin | 100% | Form login, validasi, sesi klien DEMO, proteksi rute admin. |
| **7** | Dashboard Administrator | 100% | 4 kartu statistik, pintasan aksi cepat, reset dataset demo. |
| **8** | Manajemen Daging & Masakan | 100% | CRUD lengkap potongan daging & CRUD lengkap jenis masakan. |
| **9** | Manajemen Kriteria & Bobot | 100% | Pengaturan bobot, validasi total 100%, preset masakan dinamis. |
| **10** | Simulator SAW & Laporan | 100% | Transparansi 4 tahap SAW, cetak format A4, ekspor JSON. |

- **Progres Frontend (10 Modul)**: **100% Selesai & Berfungsi Penuh**
- **Progres Keseluruhan (Full-Stack)**: **56%** (Memenuhi kriteria kelayakan UTS).

---

## SLIDE 7: PEMBUKTIAN & VERIFIKASI AKURASI ALGORITMA

Pengujian akurasi dilakukan dengan membandingkan kalkulasi sistem terhadap perhitungan manual independen pada masakan Rendang:

- **Bobot Kriteria**: Keempukan ($30\%$), Lemak ($20\%$), Tahan Rebusan ($25\%$), Serap Bumbu ($25\%$).
- **Hasil Perbandingan**:
  1. **A5 (Paha Belakang)**: Skor Manual = $0{,}7800$ | Skor Sistem = $0{,}7800$ $\rightarrow$ **Cocok 100% (Rank 1)**
  2. **A1 (Has Dalam)**: Skor Manual = $0{,}7000$ | Skor Sistem = $0{,}7000$ $\rightarrow$ **Cocok 100% (Rank 2)**
  3. **A4 (Sengkel)**: Skor Manual = $0{,}6700$ | Skor Sistem = $0{,}6700$ $\rightarrow$ **Cocok 100% (Rank 3)**
  4. **A2 (Has Luar)**: Skor Manual = $0{,}6567$ | Skor Sistem = $0{,}6567$ $\rightarrow$ **Cocok 100% (Rank 4)**
  5. **A3 (Sandung Lamur)**: Skor Manual = $0{,}6100$ | Skor Sistem = $0{,}6100$ $\rightarrow$ **Cocok 100% (Rank 5)**

✅ **Hasil Pengujian Unit (`sawEngine.test.mjs`)**: 5 dari 5 uji unit lulus (**PASS 100%**).

---

## SLIDE 8: KEUNGGULAN & INOVASI SISTEM

1. **Transparansi Matematis Penuh**: Melalui modul Simulator SAW, pengguna dan akademisi dapat menginspeksi matriks $X$, matriks normalisasi $R$, matriks terbobot $W$, hingga nilai preferensi $V_i$.
2. **Justifikasi Keputusan Berbasis Data**: Sistem tidak hanya menampilkan pemenang, tetapi menjelaskan alasan ilmiah mengapa potongan tersebut dipilih (misal: keunggulan pada kriteria ketahanan rebusan).
3. **Penyimpanan Berkonsep Snapshot**: Riwayat lama tetap utuh dan konsisten meskipun master data kriteria di masa depan diperbarui oleh admin.
4. **Resiliensi & Penanganan Galat**: Mencegah *division by zero* pada kriteria Cost dan memblokir akumulasi bobot yang tidak berjumlah 100%.
5. **Kesiapan Cetak Standar Industri**: Halaman laporan otomatis terformat bersih pada ukuran A4 saat dicetak ke PDF tanpa elemen tombol yang mengganggu.

---

## SLIDE 9: RENCANA PENGEMBANGAN PASCA-UTS (ROADMAP UAS)

1. **Pembangunan REST API Server**: Menggunakan Node.js (Express.js) dengan arsitektur Controller-Service-Repository.
2. **Integrasi Basis Data PostgreSQL**: Merancang tabel ternormalisasi (3NF) dan migrasi data menggunakan Prisma ORM.
3. **Autentikasi Server-Side**: Mengganti sesi klien dengan JSON Web Token (JWT) yang aman dalam HTTP-Only cookie.
4. **Migrasi Tanpa Merusak Frontend**: Memanfaatkan *Storage Adapter Pattern* yang sudah ada pada `storageAdapter.js` untuk transisi mulus dari `localStorage` ke pemanggilan API.

---

## SLIDE 10: SESI DEMO LANGSUNG & TANYA JAWAB

*Beralih ke peramban untuk mendemonstrasikan aplikasi di `http://localhost:5173/` mengikuti skenario pada `DEMO-GUIDE.md`.*

**Terima Kasih.**  
*Waktu dan tempat kami persilakan kepada Bapak/Ibu Dosen Penguji untuk sesi tanya jawab.*

