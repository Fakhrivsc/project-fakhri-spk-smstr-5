# UI-GUIDELINE.md
## Panduan Desain Antarmuka — BeefChoice
- Versi: 1.0
- Status: Disetujui
- Front-end: React + Vite

> BeefChoice adalah nama visual sementara; dapat diganti tanpa mengubah ruang lingkup fungsional.

## 1. Arah Visual
Modern, futuristik, profesional, minimalis, informatif, dan mudah digunakan. Dasar hitam-putih dengan aksen merah lembut; hindari efek berlebihan yang mengganggu pembacaan data.

## 2. Palet Warna
| Token | Hex | Penggunaan |
|---|---|---|
| Primary Red | `#E54852` | Tombol utama/aksi penting |
| Soft Red | `#FCE8E9` | Sorotan/latar aksen |
| Charcoal | `#151619` | Sidebar/header gelap |
| White | `#FFFFFF` | Kartu/permukaan |
| Page Gray | `#F5F6F8` | Latar halaman |
| Text Primary | `#202127` | Teks utama |
| Text Secondary | `#666B75` | Teks sekunder |
| Border | `#E1E4E8` | Garis pembatas |
| Success | `#168A5B` | Berhasil |
| Warning | `#D98A16` | Peringatan |
| Error | `#C93440` | Kesalahan |

Jangan menyampaikan status melalui warna saja; sertakan teks/ikon.

## 3. Tipografi
- Font utama Inter, fallback sans-serif.
- Heading halaman 28–32 px semibold.
- Heading bagian 20–24 px semibold.
- Subheading 16–18 px medium.
- Isi 14–16 px regular.
- Label/metadata 12–14 px.
- Skor SAW ditampilkan dengan presisi konsisten dan format lokal Indonesia.

## 4. Layout dan Spacing
- Lebar konten maksimal 1440 px.
- Sidebar desktop sekitar 248 px, dapat diciutkan.
- Header sekitar 64 px.
- Padding desktop 24–32 px.
- Spacing berbasis kelipatan 4/8 px.
- Radius kartu 12–16 px; tombol/input 8–10 px.
- Gunakan bayangan halus, garis netral, dan ruang kosong memadai.

## 5. Komponen
### Tombol
Variasi primary, secondary, danger; label spesifik; state hover/focus/disabled/loading; hapus memerlukan konfirmasi.

### Form
Label selalu terlihat; validasi dekat input; input angka memiliki batas/format; form bobot menunjukkan total berjalan dan persentase.

### Kartu
Kartu statistik dashboard, kartu masakan dengan gambar/nama/deskripsi, dan kartu rekomendasi dengan alternatif/peringkat/skor/alasan.

### Tabel
Header kontras, baris terstruktur, aksi di kolom terakhir; pencarian/filter/pagination/empty state bila relevan. Pada layar kecil gunakan scroll horizontal atau kartu.

### Feedback
Toast sukses/gagal, dialog konfirmasi, skeleton/loading, dan empty state dengan penjelasan serta aksi lanjutan.

## 6. Ikonografi dan Gambar
- Gunakan `lucide-react` jika tersedia atau telah disetujui.
- Ikon navigasi sekitar 18–20 px.
- Hindari emoji sebagai ikon utama.
- Gambar relevan dengan alt text.
- Jangan gunakan visual yang menyiratkan statistik palsu.

## 7. Navigasi
Pengguna: Beranda, Pilih Masakan, Rekomendasi, Riwayat (sesuai kebijakan akses).
Admin: Dashboard, Data Bagian Daging, Jenis Masakan, Kriteria & Bobot, Perhitungan SAW, Riwayat Perhitungan, Laporan, Pengaturan.

Navigasi UI tidak menggantikan otorisasi server.

## 8. Panduan Halaman
- **Beranda:** hero manfaat, CTA “Mulai Rekomendasi”, visual daging, penjelasan SAW tiga langkah, jenis masakan.
- **Login admin:** email/username, kata sandi, tampil/sembunyikan kata sandi, pesan aman dan informatif.
- **Dashboard:** jumlah alternatif/kriteria/masakan/perhitungan, rekomendasi terbaru, statistik hanya jika data tersedia.
- **Data daging:** tabel nama, tekstur, lemak, karakteristik, kegunaan; CRUD dan validasi.
- **Jenis masakan:** kartu rendang, steak, sate, sop, semur, tumisan.
- **Kriteria/bobot:** kode, nama, atribut, bobot, aksi; total terlihat dan simpan dinonaktifkan jika invalid.
- **Perhitungan SAW:** masakan/kriteria, matriks, normalisasi, nilai preferensi, pesan input invalid.
- **Hasil rekomendasi:** alternatif terbaik, nilai SAW, urutan, karakteristik, alasan berbasis kriteria, tabel lengkap.
- **Riwayat:** tanggal, masakan, hasil terbaik, skor, filter dan detail hasil lama.
- **Laporan:** pratinjau, parameter, bobot, ringkasan/matriks, peringkat, cetak/unduh.

## 9. Responsivitas
Desktop: sidebar dan dashboard multi-kolom. Tablet: sidebar diciutkan dan kartu dua kolom. Mobile: navigasi ringkas, kartu satu kolom, form vertikal, kontrol mudah disentuh. Breakpoint ditentukan saat implementasi; konten penting tidak boleh terpotong.

## 10. Aksesibilitas
Kontras memadai, kontrol keyboard, fokus terlihat, label form terhubung, status tidak hanya berdasarkan warna, hormati preferensi pengurangan animasi, dan gunakan transisi singkat.

## 11. Visualisasi SAW
- Skor memakai presisi tampilan konsisten.
- Peringkat memakai nilai internal penuh, bukan angka yang sudah dibulatkan.
- Aturan nilai seri konsisten.
- Bobot dan benefit/cost terlihat eksplisit.
- Alasan rekomendasi berasal dari data/kriteria yang benar-benar dihitung.

## 12. Batasan Visual
Hindari gradien mencolok, glassmorphism berlebihan, banyak aksen, statistik palsu, serta halaman/fitur di luar PRD tanpa persetujuan.

## 13. Definition of Done UI
Semua halaman mengikuti token desain; state relevan tersedia; halaman inti memiliki empty/error state; layout diuji desktop/tablet/mobile; tabel/form/rekomendasi mudah dibaca; UI tidak mengubah aturan SAW.
