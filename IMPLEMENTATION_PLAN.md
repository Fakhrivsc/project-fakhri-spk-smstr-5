# IMPLEMENTATION_PLAN.md
## Rencana Implementasi SPK Daging Sapi SAW
- Versi: 1.0
- Status: Disetujui
- Front-end: React + Vite
- Backend/database: belum ditentukan; putuskan setelah inspeksi repository.

## 1. Tujuan dan Prinsip
Bangun aplikasi sesuai PRD/UI-GUIDELINE dengan perhitungan SAW yang dapat diverifikasi, antarmuka manajemen data, rekomendasi, riwayat, dan laporan. Kerjakan satu fase per satu waktu; SOT adalah sumber kebenaran; perubahan ruang lingkup perlu persetujuan; verifikasi hasil tiap fase; gunakan tugas kecil untuk hemat token.

## 2. Prasyarat
- Periksa repository dan kondisi awal.
- Periksa React + Vite, Node.js, package manager, lockfile, dan dependensi.
- Periksa apakah backend/database sudah ada.
- Tetapkan nilai alternatif dan bobot sebelum hasil dianggap final.
- Jangan menimpa file tanpa inspeksi.
Jika proyek telah berisi kode, gunakan struktur yang sesuai dan jangan membuat ulang secara membabi buta.

## 3. Struktur Target Front-end
Usulan awal; sesuaikan setelah inspeksi:
```text
src/
├── app/ (App.jsx, routes.jsx, providers.jsx)
├── assets/images/
├── components/ (ui, layout, forms, tables, feedback)
├── features/ (auth, dashboard, beef-cuts, recipes, criteria, saw, history, reports)
├── layouts/ (PublicLayout.jsx, AdminLayout.jsx)
├── services/ (api.js, endpoints.js)
├── utils/ (formatters.js, validators.js)
├── styles/ (tokens.css, global.css)
└── main.jsx
```
Pisahkan komponen generik dari fitur bisnis, logika SAW dari UI, dan API dari komponen. Hindari komponen besar dan dependensi tanpa kebutuhan jelas.

## 4. Fase Implementasi
### A — Inspeksi repository
Periksa struktur, package/lockfile, Vite, routing, styling, backend, database, environment contoh, dan autentikasi. Identifikasi komponen reusable serta risiko. Laporkan temuan/rekomendasi. Berhenti untuk persetujuan sebelum perubahan besar atau penetapan backend baru.
**Output:** laporan inspeksi; eksekusi awal tidak mengubah kode.

### B — Design system dan layout
Implementasikan token warna, tipografi, tombol, form, kartu, tabel, feedback, navigasi publik, dan layout admin sesuai UI-GUIDELINE.

### C — Halaman inti dan data DEMO
Implementasikan landing page, pemilihan masakan, login admin, dashboard, manajemen daging dan masakan. Data demonstrasi wajib diberi label DEMO dan dipisahkan dari data produksi. Sediakan loading/empty/success/error state.

### D — Kriteria dan bobot
Implementasikan kriteria, bobot, benefit/cost, nilai alternatif, dan validasi total 100% atau 1,00.

### E — Mesin SAW dan pengujian acuan
Pisahkan fungsi SAW dari UI. Siapkan dataset DEMO terdokumentasi dan hasil acuan independen. Uji benefit/cost, pembobotan, preferensi, peringkat, nilai kosong, pembagian nol, bobot invalid, dan nilai sama. Jangan mengubah hasil acuan untuk menutupi kesalahan algoritma.

### F — Rekomendasi dan riwayat
Tampilkan peringkat, nilai akhir, alasan berbasis kriteria, detail perhitungan, serta penyimpanan/pembukaan riwayat. Hasil harus dapat ditelusuri.

### G — Laporan
Buat pratinjau dan cetak/unduh; isi harus konsisten dengan hasil perhitungan yang dipilih.

### H — Integrasi dan pengujian akhir
Integrasikan dengan backend yang telah disetujui. Uji akses, validasi, penyimpanan, riwayat, laporan, responsivitas, dan build produksi.

## 5. Aturan SAW
Input: alternatif valid, kriteria berbobot positif dengan benefit/cost, matriks numerik valid, total bobot sesuai ketentuan.
Output: normalisasi, nilai terbobot, preferensi, peringkat/aturan seri, dan pesan validasi.
Tolak nilai hilang/non-numerik; hindari pembagian nol; definisikan perilaku jika nilai suatu kriteria seragam; gunakan presisi internal penuh; skor SAW bukan probabilitas atau jaminan hasil masakan.

## 6. Strategi Data dan Integrasi
Entitas rencana: bagian daging, jenis masakan, kriteria/bobot, nilai alternatif per konteks, hasil/peringkat, akun/peran jika diterapkan, dan riwayat. Jangan mengunci skema sebelum backend dipilih. Pisahkan DEMO dari produksi; jangan menyimpan secret di front-end; otorisasi harus ditegakkan server; simpan snapshot parameter agar riwayat lama tetap dapat ditinjau. Adapter data sementara harus terisolasi dan dapat diganti.

## 7. Pengujian
| Area | Pengujian |
|---|---|
| Build | Instalasi dan build produksi |
| UI | Navigasi, responsivitas, validasi, loading, empty, error |
| CRUD | Tambah, lihat, ubah, hapus, validasi |
| SAW | Benefit/cost, bobot, skor, peringkat, kasus khusus |
| Akses | Pengguna tanpa hak tidak dapat melakukan operasi admin |
| Riwayat | Parameter dan hasil lama dapat dibuka kembali |
| Laporan | Konsisten dengan hasil tersimpan |

Gunakan hasil acuan yang dihitung manual. Pilih test runner yang kompatibel setelah memeriksa dependensi.

## 8. Definition of Done
Kebutuhan fase terpenuhi; build/pemeriksaan relevan berhasil; error kritis ditangani atau dilaporkan; file dan pengujian dilaporkan; tidak ada fitur tak disetujui; fungsi lama tidak rusak; persetujuan diminta sebelum fase berikutnya.

## 9. Hemat Token
Baca hanya SOT relevan; jangan implementasikan semua fase dalam satu prompt; satu target/batasan/kriteria per eksekusi; periksa file sebelum edit; hindari inspeksi ulang tanpa alasan; jangan ulangi pekerjaan terverifikasi; laporkan ringkas perubahan, file, pengujian, kendala, keputusan; berhenti dan tunggu persetujuan.

## 10. Risiko dan Mitigasi
- Backend belum ditetapkan: tunda integrasi persisten sampai disetujui.
- Nilai/bobot belum tersedia: gunakan DEMO dengan hasil acuan, bukan klaim penelitian final.
- Perubahan data memengaruhi riwayat: simpan snapshot.
- Kebutuhan berubah: revisi PRD dan minta persetujuan.
- Token terbatas: tugas kecil.
- Kesalahan hitung: uji dengan hasil acuan independen.

## 11. Urutan Persetujuan
1. SOT lengkap.
2. Inspeksi dan fondasi.
3. Design system/layout.
4. Halaman inti.
5. Manajemen data/kriteria.
6. Mesin SAW/rekomendasi.
7. Riwayat/laporan.
8. Integrasi/pengujian akhir.
Persetujuan hanya berlaku untuk fase yang disebut.

## 12. Di Luar Rencana
Backend spesifik sebelum inspeksi/persetujuan; e-commerce/pembayaran/pengiriman; AI/ML di luar PRD; migrasi/penghapusan tanpa izin; deployment sebelum konfigurasi, keamanan, dan pengujian disetujui.
