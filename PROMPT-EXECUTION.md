# PROMPT EKSEKUSI AWAL — SPK DAGING SAPI SAW

Kamu bertindak sebagai system analyst dan senior front-end engineer untuk proyek **Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode SAW**.

## SUMBER KEBENARAN
Baca dan patuhi dokumen root:
1. `AGENTS.md`
2. `PRD.md`
3. `UI-GUIDELINE.md`
4. `IMPLEMENTATION_PLAN.md`

Dokumen tersebut adalah sumber kebenaran. Jangan mengubahnya tanpa persetujuan pengguna.

## TUJUAN EKSEKUSI PERTAMA
Lakukan **INSPEKSI REPOSITORY SAJA**. Jangan membangun UI, menambahkan fitur, menginstal dependensi, membuat backend, mengubah database, atau menulis ulang file proyek.

## LANGKAH KERJA
1. Periksa struktur direktori dan file.
2. Periksa `package.json`, lockfile, konfigurasi Vite, entry point React, routing, styling, dan komponen.
3. Periksa apakah backend, database, autentikasi, dan konfigurasi environment ada. Jangan tampilkan nilai rahasia dari file environment.
4. Identifikasi fitur yang sudah ada, belum ada, atau belum dapat diverifikasi.
5. Identifikasi teknologi/dependensi dari file yang ditemukan; jangan mengasumsikan backend/database tertentu.
6. Bandingkan kondisi repository dengan PRD dan UI-GUIDELINE.
7. Susun rekomendasi fondasi dan daftar risiko/keputusan yang diperlukan.

Jika file SOT belum tersedia, laporkan file yang hilang. Jangan mengarang atau menggantinya dengan asumsi.

## BATASAN
- Target front-end: React + Vite.
- Backend/database diputuskan setelah inspeksi dan persetujuan.
- Data demonstrasi harus diberi label DEMO.
- Pengujian SAW harus menggunakan hasil acuan yang dapat diverifikasi.
- Jangan menambah fitur di luar PRD.
- Jangan menghapus, memindahkan, atau menimpa file.
- Jangan menginstal paket atau menjalankan migrasi.
- Jangan deployment.
- Jangan membuat ZIP.
- Jangan melanjutkan implementasi tanpa persetujuan eksplisit.

## FORMAT LAPORAN
### 1. Ringkasan kondisi repository
### 2. Teknologi dan dependensi yang ditemukan
### 3. Fitur yang sudah tersedia
### 4. Fitur yang belum tersedia/belum terverifikasi
### 5. Kesenjangan terhadap SOT
### 6. Rekomendasi fondasi implementasi
### 7. Risiko dan keputusan yang memerlukan persetujuan
### 8. File yang diubah

Untuk eksekusi ini, nyatakan tidak ada file proyek yang diubah jika memang tidak ada perubahan.

Akhiri dengan status **MENUNGGU PERSETUJUAN PENGGUNA**. Setelah laporan inspeksi selesai, berhenti. Jangan menjalankan tugas lain otomatis.
