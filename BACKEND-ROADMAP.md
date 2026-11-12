# PANDUAN PENGEMBANGAN BACKEND & DATABASE (BACKEND-ROADMAP)
## Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi Menggunakan Metode SAW

Dokumen ini disusun sebagai cetak biru (*blueprint*) teknis untuk pengembangan backend API dan integrasi basis data terpusat pasca-Ujian Tengah Semester (tahap UAS).

---

## 1. Arsitektur Backend yang Direkomendasikan

Untuk mempertahankan performa tinggi dan kompatibilitas ekosistem JavaScript modern dengan frontend React + Vite yang telah berjalan, arsitektur yang direkomendasikan adalah:

- **Runtime**: Node.js (v20+ LTS)
- **Framework API**: **Express.js** atau **Fastify** (Ringan, cepat, dan ekosistem middleware luas).
- **ORM / Query Builder**: **Prisma ORM** (Type-safe, migrasi skema deklaratif, dan visualisasi Prisma Studio) atau **Drizzle ORM**.
- **Database Engine**: **PostgreSQL** (ACID compliant, mendukung tipe data JSONB untuk snapshot parameter, dan performa tinggi).
- **Autentikasi**: JSON Web Token (JWT) dengan *HTTP-Only Cookie* dan *Bcrypt Password Hashing*.

```
┌─────────────────────────────────┐
│     Frontend (React + Vite)     │
│   BeefChoice Client Application │
└────────────────┬────────────────┘
                 │ REST API Calls (JSON via Axios/Fetch)
                 ▼
┌─────────────────────────────────┐
│       Backend API Server        │
│    (Node.js + Express/Fastify)  │
│  - JWT Auth Middleware          │
│  - SAW Calculation Engine       │
│  - Input Data Validation (Zod)  │
└────────────────┬────────────────┘
                 │ Prisma ORM
                 ▼
┌─────────────────────────────────┐
│       Database Server           │
│         PostgreSQL              │
│  - Cuts, Recipes, Criteria      │
│  - Decision Matrices            │
│  - History Snapshots (JSONB)    │
│  - Users & Roles                │
└─────────────────────────────────┘
```

---

## 2. Perancangan Skema Basis Data Relasional (ERD)

Struktur tabel yang dirancang telah memenuhi kaidah normalisasi bentuk ketiga (3NF) dengan tetap mempertahankan kemampuan snapshot riwayat:

### A. Tabel `users` (Pengguna & Administrator)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ADMIN', -- 'ADMIN' | 'USER'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### B. Tabel `beef_cuts` (Alternatif Potongan Daging Sapi)
```sql
CREATE TABLE beef_cuts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- Contoh: 'A1', 'A2'
    name VARCHAR(100) NOT NULL,
    texture VARCHAR(50) NOT NULL,
    fat_level VARCHAR(50) NOT NULL,
    characteristics TEXT NOT NULL,
    best_uses TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### C. Tabel `recipes` (Jenis Olahan Masakan)
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    cooking_method VARCHAR(100) NOT NULL,
    recommended_cut_hint TEXT NOT NULL,
    icon_type VARCHAR(50) DEFAULT 'utensils',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### D. Tabel `criteria` (Kriteria Penilaian SAW)
```sql
CREATE TABLE criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- Contoh: 'C1', 'C2'
    name VARCHAR(100) NOT NULL,
    attribute VARCHAR(10) NOT NULL CHECK (attribute IN ('Benefit', 'Cost')),
    weight DECIMAL(5, 4) NOT NULL CHECK (weight > 0 AND weight <= 1.0),
    scale VARCHAR(50) DEFAULT '1 - 5',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### E. Tabel `decision_matrices` (Nilai Penilaian Alternatif $X$)
```sql
CREATE TABLE decision_matrices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beef_cut_id UUID NOT NULL REFERENCES beef_cuts(id) ON DELETE CASCADE,
    criterion_id UUID NOT NULL REFERENCES criteria(id) ON DELETE CASCADE,
    score DECIMAL(4, 2) NOT NULL CHECK (score >= 1 AND score <= 5),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_cut_criterion UNIQUE (beef_cut_id, criterion_id)
);
```

### F. Tabel `recommendation_histories` (Riwayat Perhitungan SAW)
```sql
CREATE TABLE recommendation_histories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    recipe_name VARCHAR(100) NOT NULL,
    cooking_method VARCHAR(100) NOT NULL,
    top_cut_code VARCHAR(10) NOT NULL,
    top_cut_name VARCHAR(100) NOT NULL,
    saw_score DECIMAL(6, 4) NOT NULL,
    snapshot_data JSONB NOT NULL, -- Menyimpan kriteria, bobot, dan urutan ranking statis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Spesifikasi REST API Endpoint

Seluruh komunikasi antara frontend dan backend akan melalui antarmuka REST API dengan format respon JSON standar:

```json
{
  "success": true,
  "message": "Data berhasil diambil.",
  "data": { ... }
}
```

### A. Autentikasi (`/api/v1/auth`)
- `POST /api/v1/auth/login`: Masuk admin & mengembalikan JWT cookie.
- `POST /api/v1/auth/logout`: Menghapus sesi JWT.
- `GET /api/v1/auth/me`: Mengambil identitas pengguna yang sedang masuk.

### B. Bagian Daging Sapi (`/api/v1/cuts`)
- `GET /api/v1/cuts`: Mengambil seluruh daftar potongan daging.
- `POST /api/v1/cuts`: Menambah potongan daging baru (Admin).
- `PUT /api/v1/cuts/:id`: Memperbarui data potongan daging (Admin).
- `DELETE /api/v1/cuts/:id`: Menghapus potongan daging (Admin).

### C. Jenis Masakan (`/api/v1/recipes`)
- `GET /api/v1/recipes`: Mengambil daftar resep olahan masakan.
- `POST /api/v1/recipes`: Menambah resep baru (Admin).
- `PUT /api/v1/recipes/:id`: Memperbarui resep (Admin).
- `DELETE /api/v1/recipes/:id`: Menghapus resep (Admin).

### D. Kriteria, Bobot, & Matriks (`/api/v1/criteria`)
- `GET /api/v1/criteria`: Mengambil kriteria beserta bobot aktif.
- `PUT /api/v1/criteria/weights`: Memperbarui bobot seluruh kriteria (dengan validasi total 100%).
- `GET /api/v1/matrix`: Mengambil matriks keputusan $X$.
- `PUT /api/v1/matrix`: Memperbarui sel matriks penilaian alternatif.

### E. Perhitungan SAW & Rekomendasi (`/api/v1/saw`)
- `POST /api/v1/saw/calculate`: Menjalankan komputasi SAW di server berdasarkan ID resep dan mengembalikan perankingan beserta justifikasi alasan ilmiah.

### F. Riwayat & Laporan (`/api/v1/history`)
- `GET /api/v1/history`: Mengambil riwayat perhitungan (dengan pagination & search).
- `POST /api/v1/history`: Menyimpan hasil kalkulasi ke tabel riwayat.
- `DELETE /api/v1/history/:id`: Menghapus satu arsip riwayat (Admin).
- `GET /api/v1/reports/:id/pdf`: Menghasilkan berkas PDF formal langsung dari server (*headless Chromium / Puppeteer*).

---

## 4. Strategi Migrasi Tanpa Merusak Frontend

Frontend saat ini telah dirancang dengan pola *Adapter Pattern* terisolasi pada [`src/services/storageAdapter.js`](file:///c:/SPK-Daging-Sapi-SAW-SOT-Final/src/services/storageAdapter.js).

Proses migrasi dapat dilakukan dengan tahapan transisi mulus:
1. **Fase Transisi**: Mengubah fungsi-fungsi di dalam `storageAdapter.js` dari pembacaan `localStorage` menjadi pemanggilan HTTP API asinkron (`fetch('/api/v1/...')`).
2. **Fallback Otomatis**: Jika backend sedang luring (*offline*), `storageAdapter.js` dapat secara otomatis beralih (*fallback*) ke data `localStorage` lokal sehingga aplikasi tetap dapat berjalan secara *offline-first*.
3. **Komponen UI Bebas Perubahan**: Seluruh komponen tampilan (Halaman Beranda, Katalog Masakan, Hasil Rekomendasi, dan Dashboard Admin) tidak perlu diubah strukturnya karena kontrak data yang diterima dari adapter tetap identik.

