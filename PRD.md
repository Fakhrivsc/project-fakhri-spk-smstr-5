# PRD.md
## SPK Pemilihan Bagian Daging Sapi Menggunakan Metode SAW
- Versi: 1.0
- Status: Disetujui
- Front-end: React + Vite

## 1. Ringkasan Produk
Website untuk membantu pengguna memilih bagian daging sapi yang sesuai dengan jenis masakan menggunakan Simple Additive Weighting (SAW). Sistem menampilkan peringkat, nilai preferensi, dan alasan yang dapat ditelusuri ke kriteria yang digunakan.

## 2. Tujuan
- Mempermudah pemilihan potongan daging sesuai kebutuhan memasak.
- Menyediakan proses keputusan yang konsisten dan dapat diverifikasi.
- Memungkinkan admin mengelola alternatif, jenis masakan, kriteria, bobot, dan nilai penilaian.
- Menyimpan riwayat perhitungan serta menyediakan laporan.

## 3. Aktor dan Hak Akses
| Aktor | Hak akses |
|---|---|
| Pengguna | Memilih masakan dan melihat rekomendasi/peringkat. Riwayat milik pengguna berlaku jika akun pengguna diterapkan. |
| Admin | Login/logout, mengelola data daging, masakan, kriteria, bobot, perhitungan, riwayat, dan laporan. |

Akun pengguna selain admin bersifat opsional. Proteksi admin harus ditegakkan di backend/server, bukan hanya dengan menyembunyikan elemen UI.

## 4. Ruang Lingkup Fitur
### 4.1 Autentikasi
- Login/logout admin.
- Perlindungan halaman pengelolaan data.
- Pembatasan berdasarkan peran jika akun pengguna turut diterapkan.

### 4.2 Manajemen bagian daging
- CRUD: tambah, lihat, ubah, hapus.
- Data nama, karakteristik, tekstur, tingkat lemak, dan kegunaan.
- Data awal: has dalam, has luar, sandung lamur, sengkel, paha belakang.

### 4.3 Jenis masakan
- Rendang, steak, sate, sop, semur, dan tumisan.
- Menampilkan rekomendasi potongan daging yang sesuai.
- Admin dapat mengelola daftar masakan.

### 4.4 Kriteria dan bobot
- CRUD kriteria, bobot, dan atribut benefit/cost.
- Total bobot harus 100% atau 1,00.
- Validasi nilai alternatif sebelum perhitungan.

### 4.5 Perhitungan SAW
- Membentuk matriks keputusan.
- Normalisasi berdasarkan atribut.
- Mengalikan nilai normalisasi dengan bobot.
- Menghitung nilai preferensi dan mengurutkan alternatif.

### 4.6 Rekomendasi
- Menampilkan alternatif dengan nilai tertinggi.
- Menampilkan peringkat, nilai SAW, karakteristik, dan alasan berbasis kriteria.
- Memungkinkan pemeriksaan dasar perhitungan.

### 4.7 Riwayat
- Menyimpan tanggal, masakan, parameter, dan hasil.
- Membuka kembali hasil terdahulu.
- Mempertahankan snapshot parameter agar riwayat lama tidak berubah saat konfigurasi baru diedit.

### 4.8 Dashboard dan laporan
- Ringkasan jumlah alternatif, kriteria, masakan, dan perhitungan.
- Ringkasan rekomendasi terbaru.
- Pratinjau, cetak, atau unduh laporan SAW.

## 5. Aturan Bisnis SAW
Benefit: `r_ij = x_ij / max_i(x_ij)`
Cost: `r_ij = min_i(x_ij) / x_ij`
Preferensi: `V_i = Σ(w_j × r_ij)`

Keterangan: `x_ij` adalah nilai alternatif i pada kriteria j; `r_ij` nilai normalisasi; `w_j` bobot; `V_i` nilai preferensi. Nilai tertinggi berada di peringkat pertama. Pengurutan memakai presisi internal penuh; pembulatan hanya untuk tampilan.

Validasi:
- Tolak nilai hilang, nonnumerik, atau tidak valid.
- Tangani pembagian dengan nol dan nilai nol secara eksplisit.
- Definisikan perilaku saat seluruh nilai pada kriteria sama.
- Pastikan total bobot valid.
- Terapkan aturan seri konsisten.
- Jangan menyatakan hasil valid jika input tidak valid.

## 6. Alur Utama
1. Pengguna membuka rekomendasi.
2. Memilih jenis masakan.
3. Sistem mengambil alternatif, kriteria, bobot, dan nilai penilaian.
4. Sistem memvalidasi data.
5. Sistem menghitung normalisasi, nilai terbobot, dan preferensi SAW.
6. Sistem menampilkan peringkat dan penjelasan.
7. Hasil disimpan dan tersedia untuk riwayat/laporan setelah penyimpanan terintegrasi.

## 7. Kebutuhan Nonfungsional
- Responsif untuk desktop, tablet, dan ponsel.
- Navigasi jelas dan status loading/kosong/sukses/gagal informatif.
- Validasi sisi klien dan server.
- Autentikasi/otorisasi yang sesuai.
- Perhitungan konsisten dan dapat diuji ulang.
- Data demonstrasi tidak boleh disajikan sebagai data aktual.

## 8. Kriteria Penerimaan
- Admin mengelola data sesuai hak akses.
- Bobot tidak valid/total yang salah ditolak.
- Normalisasi dan preferensi cocok dengan hasil acuan independen.
- Peringkat diurutkan dari tertinggi ke terendah.
- Riwayat dapat dibuka kembali jika penyimpanan persisten tersedia.
- Laporan konsisten dengan hasil yang dipilih.
- Halaman berfungsi pada ukuran layar yang ditetapkan.

## 9. Batasan dan Keputusan Terbuka
- React + Vite untuk front-end.
- Backend/database diputuskan setelah inspeksi repository.
- Nilai alternatif dan bobot harus ditetapkan serta didokumentasikan.
- Data demonstrasi diberi label DEMO.
- Rekomendasi adalah hasil model penilaian, bukan jaminan hasil masakan.

## 10. Di Luar Ruang Lingkup
E-commerce, pembayaran/pengiriman, AI/ML, aplikasi mobile native, dan integrasi eksternal yang tidak diperlukan fitur inti.
