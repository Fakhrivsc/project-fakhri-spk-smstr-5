# PANDUAN DEMONSTRASI SISTEM (DEMO-GUIDE)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode Simple Additive Weighting (SAW)

Panduan ini disusun khusus untuk mempersiapkan demonstrasi aplikasi pada pelaksanaan Ujian Tengah Semester (UTS) Proyek Semester 5. Seluruh alur dan skenario pada panduan ini telah diuji dan dipastikan berfungsi 100% pada lingkungan lokal (*localhost*).

---

## 1. Persiapan Lingkungan & Menjalankan Aplikasi

### A. Prasyarat Sistem
- **Node.js**: Versi 18.x atau 20.x (disarankan LTS).
- **Peramban Web**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari versi modern.
- **Terminal / Shell**: PowerShell, Command Prompt, atau Terminal Bash.

### B. Langkah Instalasi Dependensi
Buka terminal pada direktori proyek (`c:\SPK-Daging-Sapi-SAW-SOT-Final`) dan jalankan:
```bash
npm install
```

### C. Menjalankan Aplikasi di Localhost
Jalankan server pengembangan Vite:
```bash
npm run dev
```
Terminal akan menampilkan output seperti berikut:
```text
  VITE v6.1.0  ready in 320 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Akses aplikasi pada peramban melalui URL:
👉 **`http://localhost:5173/`**

---

## 2. Kredensial Akun Administrator (DEMO)

Karena sistem backend dan database terpusat belum dibuat pada tahap UTS, autentikasi admin saat ini menggunakan sesi klien (*client-side mock authentication*) dengan kredensial berikut:

- **URL Login**: `http://localhost:5173/#/admin/login`
- **Username**: `admin`
- **Kata Sandi**: `admin123`
- **Peran (Role)**: Administrator SPK

> **Catatan Presentasi untuk Mahasiswa:**  
> Sampaikan secara terbuka kepada dosen bahwa data pengguna saat ini berstatus **DEMO** dan tersimpan di `localStorage`. Autentikasi server-side berbasis token JWT dan hash sandi (Bcrypt) dijadwalkan pada roadmap pasca-UTS setelah backend dibangun.

---

## 3. Skenario Demonstrasi Lengkap (Langkah-demi-Langkah)

Berikut adalah urutan alur demonstrasi yang disarankan untuk memukau dosen penguji:

```
[Langkah 1: Beranda Publik] ➔ [Langkah 2: Pemilihan Masakan] ➔ [Langkah 3: Hasil Rekomendasi SAW]
                                                                        │
[Langkah 6: Cetak Laporan]  ◀─ [Langkah 5: Simulator SAW] ◀── [Langkah 4: Panel Admin & CRUD]
```

---

### Skenario 1: Halaman Beranda Publik (Modul 1)
1. **Buka Halaman Utama:** Buka `http://localhost:5173/#/`.
2. **Jelaskan ke Dosen:**
   - Judul proyek dan urgensi SPK dalam membantu pemilihan potongan daging yang objektif.
   - Penjelasan metode **Simple Additive Weighting (SAW)** yang terpampang pada section *Cara Kerja Metode SAW*.
   - Metrik sistem ringkas (5 Alternatif, 4 Kriteria, 6 Masakan, Akurasi SAW 100%).
3. **Aksi Demonstrasi:**
   - Klik tombol **"Mulai Rekomendasi Masakan"** untuk berpindah ke Modul 2.

---

### Skenario 2: Pemilihan Jenis Masakan (Modul 2)
1. **Tampilan Katalog Masakan:** Sistem menampilkan 6 olahan daging sapi (Rendang, Steak, Sate, Sop, Semur, Tumisan).
2. **Aksi Demonstrasi Pencarian:**
   - Ketik kata *"Rendang"* pada kotak pencarian untuk mendemonstrasikan filter masakan real-time.
   - Hapus teks pencarian untuk menampilkan kembali seluruh katalog masakan.
3. **Memilih Masakan:**
   - Pada kartu **Rendang Daging**, tunjukkan informasi metode masak (*Slow Cooking 3-5 jam*) dan karakter daging yang dicari (*Daging padat berserat kuat yang tidak mudah hancur*).
   - Klik tombol **"Pilih Masakan Ini & Analisis SAW"**.

---

### Skenario 3: Hasil Rekomendasi SAW (Modul 4)
1. **Sorotan Alternatif Terbaik (#1):**
   - Tunjukkan kartu sorotan juara: **Paha Belakang (Round/Gandik) - A5** dengan nilai preferensi tertinggi $V_1 = \mathbf{0{,}7800}$.
2. **Justifikasi Ilmiah Berbasis Kriteria:**
   - Tunjukkan penjelasan sistem: *"Alternatif terbaik karena memiliki keunggulan tertinggi pada Ketahanan Rebusan Lama (skor normalisasi 1,00) serta kontribusi kuat dari Kandungan Lemak optimal."*
3. **Perbandingan Seluruh Alternatif:**
   - Tunjukkan grafik batang proporsional perbandingan seluruh 5 potongan daging.
   - Tunjukkan tabel peringkat lengkap dari peringkat 1 hingga 5.
4. **Modal Rincian Matematis:**
   - Klik tombol **"Lihat Rincian Rumus SAW"** untuk menampilkan modal rumus normalisasi Benefit/Cost dan pembobotan kriteria.
5. **Menyimpan ke Riwayat:**
   - Klik tombol **"Simpan ke Riwayat"**. Notifikasi *toast* sukses akan muncul di pojok kanan atas.

---

### Skenario 4: Riwayat Rekomendasi Publik (Modul 5)
1. **Navigasi ke Riwayat:** Klik menu **"Riwayat"** pada bilah navigasi atas (`#/history`).
2. **Demonstrasikan Fitur Riwayat:**
   - Tunjukkan daftar riwayat hasil kalkulasi yang baru saja disimpan beserta arsip sebelumnya.
   - Klik ikon **"Lihat Snapshot"** pada baris riwayat.
   - **Tunjukkan Keunggulan Snapshot:** Jelaskan bahwa snapshot menyimpan parameter kriteria, bobot, dan peringkat lama secara permanen sehingga riwayat lama tidak akan berubah meskipun admin kelak mengedit master data kriteria.

---

### Skenario 5: Login dan Dashboard Admin (Modul 6 & 7)
1. **Akses Login:** Klik tombol **"Login Admin"** pada bilah navigasi (`#/admin/login`).
2. **Uji Validasi Form:**
   - Coba kosongkan username/password dan klik Masuk $\rightarrow$ form menampilkan pesan validasi.
   - Masukkan username `admin` dan kata sandi `admin123`.
   - Klik tombol **"Masuk ke Panel Admin"**. Notifikasi sukses muncul dan halaman beralih ke `#/admin/dashboard`.
3. **Jelaskan Dashboard Admin:**
   - 4 Kartu Statistik (Total Daging, Masakan, Kriteria, Riwayat).
   - Pintasan aksi cepat ke modul-modul administrasi.
   - Tabel aktivitas rekomendasi terkini.

---

### Skenario 6: Manajemen Data Daging & Masakan (Modul 8)
1. **Buka Menu Daging:** Klik menu **"Data Bagian Daging"** (`#/admin/cuts`).
2. **Aksi Tambah Data (Create):**
   - Klik tombol **"+ Tambah Bagian Daging"**.
   - Masukkan Kode: `A6`, Nama: `Buntut Sapi (Oxtail)`, Tekstur: `Berdaging & Berlemak Kenyal`, Tingkat Lemak: `Tinggi`, Karakteristik: `Kaya gelatin dan sumsum tulang`, Kegunaan: `Sop Buntut Spesial`.
   - Klik **Simpan**. Data baru langsung muncul di tabel dan otomatis diinisialisasi pada matriks keputusan.
3. **Aksi Ubah Data (Update):**
   - Klik ikon pensil (Ubah) pada salah satu data, sesuaikan teks, dan simpan.
4. **Aksi Hapus Data (Delete):**
   - Klik ikon tempat sampah pada `A6`, modal konfirmasi hapus akan muncul. Konfirmasi hapus untuk mengembalikan data ke 5 potongan standar.

---

### Skenario 7: Manajemen Kriteria, Bobot & Preset (Modul 9)
1. **Buka Menu Kriteria:** Klik menu **"Kriteria & Bobot"** (`#/admin/criteria`).
2. **Uji Validasi Bobot 100%:**
   - Klik **"Ubah Bobot Kriteria"**.
   - Ubah salah satu bobot sehingga total menjadi $110\%$.
   - Tunjukkan indikator total bobot berubah menjadi warna merah (*"Total Bobot: 110% - Melebihi 100%"*) dan tombol simpan dinonaktifkan/menolak simpan.
3. **Demonstrasi Preset Masakan Dinamis:**
   - Klik tombol preset **"Preset: Steak Sapi"** $\rightarrow$ bobot Keempukan otomatis disetel ke $45\%$.
   - Klik tombol preset **"Default Seimbang"** $\rightarrow$ bobot kembali seimbang ($30\%, 20\%, 25\%, 25\%$).
   - Klik **Simpan Bobot**.
4. **Tabel Matriks Keputusan ($X$):**
   - Tunjukkan tabel matriks penilaian alternatif (skala 1 - 5) yang dapat diedit langsung per sel.

---

### Skenario 8: Simulator Perhitungan SAW & Benchmark (Modul 10)
1. **Buka Menu Simulator:** Klik menu **"Perhitungan SAW"** (`#/admin/saw`).
2. **Tunjukkan Transparansi 4 Tahap SAW:**
   - **Tab 1: Matriks Keputusan ($X$)** $\rightarrow$ data mentah penilaian alternatif.
   - **Tab 2: Matriks Normalisasi ($R$)** $\rightarrow$ hasil pembagian Benefit ($x_{ij}/\max$) dan Cost ($\min/x_{ij}$).
   - **Tab 3: Matriks Terbobot ($W$)** $\rightarrow$ hasil perkalian nilai normalisasi dengan bobot kriteria ($w_j \times r_{ij}$).
   - **Tab 4: Hasil Perangkingan ($V_i$)** $\rightarrow$ akumulasi penjumlahan bobot preferensi terurut dari peringkat 1 sampai 5.
3. **Tab Uji Benchmark Independen:**
   - Buka tab **"Verifikasi Benchmark Independen"**.
   - Tunjukkan bahwa hasil sistem memiliki kecocokan $100\%$ dengan perhitungan manual independen yang telah diaudit.

---

### Skenario 9: Cetak & Ekspor Laporan Rekomendasi (Modul 10)
1. **Buka Menu Laporan:** Klik menu **"Laporan"** (`#/admin/reports`).
2. **Pilih Sumber Data:**
   - Tunjukkan opsi memilih sumber data dari *Kalkulasi Aktif Saat Ini* atau dari *Arsip Snapshot Riwayat*.
3. **Fitur Ekspor JSON:**
   - Klik tombol **"Unduh JSON"** $\rightarrow$ berkas `.json` berisi metadata laporan resmi langsung terunduh ke komputer.
4. **Fitur Salin Teks:**
   - Klik **"Salin Teks"** $\rightarrow$ ringkasan laporan tersalin ke clipboard komputer.
5. **Fitur Cetak Dokumen / Simpan PDF:**
   - Klik tombol **"Cetak Dokumen Laporan"**.
   - Dialog cetak peramban (*Print Preview*) akan terbuka.
   - Tunjukkan bahwa seluruh tombol dan elemen navigasi otomatis tersembunyi berkat stylesheet `@media print`, menghasilkan dokumen formal siap cetak atau siap disimpan sebagai PDF standar ukuran A4.

---

### Skenario 10: Pengujian Unit Mandiri via Terminal (Bonus Nilai Plus)
Jika dosen penguji ingin melihat pembuktian kode unit test otomatis:
1. Buka terminal baru tanpa mematikan server Vite.
2. Jalankan perintah:
   ```bash
   node src/utils/sawEngine.test.mjs
   ```
3. Tunjukkan bahwa kelima skenario pengujian unit SAW (uji manual, validasi total bobot, deteksi pembagian nol, nilai seragam, dan aturan seri) lulus dengan status **PASS 100%**.

---

## 4. Tips Penting Menghadapi Pertanyaan Dosen Penguji

| Pertanyaan Dosen yang Sering Muncul | Jawaban Rekomendasi Mahasiswa |
|---|---|
| **"Mengapa kriteria Lemak dijadikan Cost pada masakan Rendang?"** | *"Pada olahan rendang, proses memasak menggunakan santan kental dalam durasi berjam-jam yang sudah menghasilkan minyak melimpah. Potongan daging yang terlalu banyak lemak gajih (seperti Sandung Lamur) akan mudah hancur dan membuat kuah terlalu berminyak, sehingga daging rendah lemak bertekstur padat seperti Paha Belakang lebih diutamakan (Cost: semakin sedikit lemak, semakin baik)."* |
| **"Bagaimana jika total bobot kriteria yang dimasukkan admin tidak 100%?"** | *"Sistem memiliki validasi matematis ketat pada file `sawEngine.js` dan antarmuka `CriteriaPage.jsx`. Jika total bobot kurang atau lebih dari 100% (1,00), sistem menolak kalkulasi, menampilkan kartu peringatan, dan meminta penyesuaian bobot terlebih dahulu."* |
| **"Bagaimana sistem menangani pembagian dengan nol pada kriteria Cost?"** | *"Sistem memeriksa nilai masukan sebelum kalkulasi. Jika ada kriteria Cost yang bernilai 0 atau negatif, sistem secara eksplisit menolak nilai tersebut karena memicu 'division by zero' pada rumus $r_{ij} = \min(x_j)/x_{ij}$."* |
| **"Apakah data ini sudah menggunakan database MySQL/PostgreSQL?"** | *"Untuk keperluan Ujian Tengah Semester (UTS), kami fokus pada penyelesaian 100% antarmuka, validasi sistem, dan kebenaran algoritma SAW menggunakan LocalStorage Adapter berlabel data DEMO. Integrasi database PostgreSQL dan REST API backend telah kami susun dalam BACKEND-ROADMAP.md untuk pengerjaan tahap UAS."* |

