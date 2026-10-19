# AGENTS.md
## Kontrak Kerja Agen AI

Proyek: Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan Menggunakan Metode SAW.

## 1. Tujuan
Agen wajib mengikuti SOT yang disetujui dan tidak memperluas ruang lingkup secara sepihak.

## 2. Hierarki Sumber Kebenaran
1. Instruksi eksplisit terbaru dari pemilik proyek, sepanjang tidak bertentangan dengan keputusan yang masih berlaku.
2. `PRD.md` — kebutuhan, batasan, aturan bisnis.
3. `UI-GUIDELINE.md` — visual dan interaksi.
4. `IMPLEMENTATION_PLAN.md` — tahapan dan pengujian.
5. `AGENTS.md` — cara kerja agen.
Jika konflik/ambigu, hentikan bagian terdampak dan minta klarifikasi. Jangan mengubah SOT diam-diam.

## 3. Teknologi
- Front-end wajib React + Vite.
- Backend/database belum ditentukan sampai repository diinspeksi.
- Pertahankan teknologi yang sudah sesuai.
- Jangan menambah teknologi tanpa kebutuhan dan persetujuan yang jelas.

## 4. Sebelum Mengedit
Periksa struktur/file relevan; baca hanya bagian SOT yang dibutuhkan; identifikasi implementasi yang ada; catat risiko/dependensi/dampak; jangan menghapus atau menimpa secara membabi buta; minta klarifikasi jika keputusan penting belum tersedia.

## 5. Eksekusi Bertahap
- Kerjakan satu fase/tugas yang telah disetujui.
- Jangan melanjutkan otomatis ke fase berikutnya.
- Laporkan hasil dan tunggu persetujuan.
- Persetujuan satu fase tidak berlaku untuk fase lain.
- Hindari perubahan yang tidak diperlukan.

## 6. Desain dan UI
Ikuti `UI-GUIDELINE.md`; gunakan hitam, putih, merah lembut; sediakan state loading/empty/error/success/disabled yang relevan; jangan menyajikan data fiktif sebagai data aktual; data awal diberi label DEMO.

## 7. Aturan SAW
Pisahkan mesin SAW dari UI; terapkan normalisasi benefit/cost sesuai PRD; validasi matriks/bobot/nilai; total bobot sesuai ketentuan; presisi internal penuh dan pembulatan hanya untuk tampilan; pertahankan hasil acuan independen; jangan mengubah acuan untuk menutupi kesalahan; alasan rekomendasi harus dapat ditelusuri ke data/kriteria.

## 8. Keamanan dan Integritas
Jangan menaruh secret di front-end; proteksi route browser bukan pengganti otorisasi server; jangan mengekspos rahasia environment; jangan menghapus/migrasikan database tanpa persetujuan eksplisit; pertahankan snapshot parameter untuk meninjau hasil lama.

## 9. Hemat Token
Jangan membaca ulang seluruh repository tanpa alasan; jangan menyalin seluruh SOT ke setiap prompt; fokus pada file relevan; lakukan perubahan minimal; jangan ulangi pekerjaan terverifikasi; ringkas laporan tanpa menghilangkan pengujian/kendala.

## 10. Pengujian
Jalankan build/pemeriksaan relevan; uji SAW dengan dataset dan hasil acuan; uji validasi input; uji hak akses jika autentikasi tersedia; uji responsivitas; jangan mengklaim pengujian berhasil jika belum dijalankan.

## 11. Format Laporan
Laporkan status, file dibuat/diubah, ringkasan perubahan, pengujian dan hasil sebenarnya, kendala/keputusan yang diperlukan, serta konfirmasi bahwa agen berhenti menunggu persetujuan.

## 12. Larangan
Tidak mengubah ruang lingkup tanpa persetujuan; melompati persetujuan; mengganti teknologi utama sepihak; menyajikan DEMO sebagai data penelitian aktual; mengklaim fitur selesai tanpa verifikasi; membuat ZIP final atau deployment tanpa instruksi dan persetujuan.

## 13. Kondisi Selesai
Tugas selesai jika kriteria penerimaan terpenuhi, pengujian dilaporkan jujur, tidak ada perubahan di luar ruang lingkup, dan laporan akhir disampaikan.
