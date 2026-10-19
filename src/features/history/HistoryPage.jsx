import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  UtensilsCrossed,
  Award,
  Clock,
  Printer,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Input, Select, Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import Modal from '../../components/feedback/Modal';
import EmptyState from '../../components/feedback/EmptyState';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function HistoryPage({ isAdminMode = false, onNavigate }) {
  const { showToast } = useToast();
  const [historyList, setHistoryList] = useState(storageAdapter.getHistory());
  const [search, setSearch] = useState('');
  const [recipeFilter, setRecipeFilter] = useState('ALL');

  // Modal Detail Snapshot State
  const [selectedSnapshotRecord, setSelectedSnapshotRecord] = useState(null);
  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);

  const refreshHistory = () => {
    setHistoryList(storageAdapter.getHistory());
  };

  const recipes = storageAdapter.getRecipes();

  // Filter List
  const filteredList = historyList.filter((item) => {
    const matchSearch =
      item.recipeName.toLowerCase().includes(search.toLowerCase()) ||
      item.topCutName.toLowerCase().includes(search.toLowerCase()) ||
      item.date.toLowerCase().includes(search.toLowerCase());
    const matchRecipe = recipeFilter === 'ALL' || item.recipeId === recipeFilter;
    return matchSearch && matchRecipe;
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    storageAdapter.deleteHistoryItem(deleteTarget.id);
    showToast(`Riwayat perhitungan "${deleteTarget.recipeName}" berhasil dihapus.`, 'warning');
    setDeleteTarget(null);
    refreshHistory();
  };

  const handleClearAll = () => {
    storageAdapter.clearAllHistory();
    showToast('Seluruh riwayat perhitungan berhasil dibersihkan.', 'warning');
    refreshHistory();
  };

  const columns = [
    {
      key: 'date',
      header: 'Waktu Analisis',
      width: '180px',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={14} color="var(--color-text-muted)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>{row.date}</span>
        </div>
      ),
    },
    {
      key: 'recipeName',
      header: 'Jenis Masakan',
      render: (row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <strong>{row.recipeName}</strong>
            <span className="badge-demo">DEMO</span>
          </div>
          {row.cookingMethod && (
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {row.cookingMethod}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'topCutName',
      header: 'Rekomendasi Utama (Peringkat 1)',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="primary">{row.topCutCode}</Badge>
          <strong style={{ color: 'var(--color-charcoal)' }}>{row.topCutName}</strong>
        </div>
      ),
    },
    {
      key: 'sawScore',
      header: 'Nilai Preferensi (V)',
      align: 'center',
      width: '150px',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '15px', color: 'var(--color-primary-red)' }}>
          {row.sawScore}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Aksi',
      align: 'right',
      width: '150px',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={Eye}
            onClick={() => setSelectedSnapshotRecord(row)}
            title="Buka snapshot parameter perhitungan"
          >
            Detail
          </Button>
          {isAdminMode && (
            <Button
              variant="danger"
              size="sm"
              iconLeft={Trash2}
              onClick={() => setDeleteTarget(row)}
              title="Hapus riwayat"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-demo">ARSIP PERHITUNGAN (PRD 4.7)</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Snapshot Parameter Terisolasi
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>
            {isAdminMode ? 'Manajemen Riwayat Perhitungan SAW' : 'Riwayat Rekomendasi Terkini'}
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Menyimpan tanggal, masakan, bobot kriteria, dan ranking rekomendasi. Snapshot parameter menjaga hasil lama tidak berubah saat konfigurasi baru diedit.
          </p>
        </div>

        {isAdminMode && historyList.length > 0 && (
          <Button variant="danger" size="sm" iconLeft={Trash2} onClick={handleClearAll}>
            Bersihkan Seluruh Riwayat
          </Button>
        )}
      </div>

      {/* Filter and Table Card */}
      <Card>
        <CardHeader
          title={`Daftar Riwayat Perhitungan (${historyList.length} Tersimpan)`}
          subtitle="Buka detail untuk meninjau parameter asli pada saat kalkulasi dilakukan"
          action={
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '220px' }}>
                <Input
                  placeholder="Cari riwayat..."
                  name="search_history"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ marginBottom: 0 }}
                />
              </div>
              <div style={{ width: '180px' }}>
                <select
                  value={recipeFilter}
                  onChange={(e) => setRecipeFilter(e.target.value)}
                  className="form-select"
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  <option value="ALL">Semua Jenis Masakan</option>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          }
        />
        <CardBody style={{ padding: 0 }}>
          {filteredList.length === 0 ? (
            <div style={{ padding: '40px 20px' }}>
              <EmptyState
                icon={History}
                title="Riwayat Tidak Ditemukan"
                description={
                  search || recipeFilter !== 'ALL'
                    ? 'Tidak ada riwayat perhitungan yang cocok dengan filter pencarian Anda.'
                    : 'Belum ada riwayat perhitungan yang tersimpan. Lakukan perhitungan di menu Rekomendasi.'
                }
                actionLabel={search || recipeFilter !== 'ALL' ? 'Reset Filter' : 'Mulai Rekomendasi'}
                onAction={() => {
                  if (search || recipeFilter !== 'ALL') {
                    setSearch('');
                    setRecipeFilter('ALL');
                  } else if (onNavigate) {
                    onNavigate('#/recipes');
                  }
                }}
              />
            </div>
          ) : (
            <Table columns={columns} data={filteredList} />
          )}
        </CardBody>
      </Card>

      {/* Modal: Detail Snapshot Riwayat */}
      <Modal
        isOpen={Boolean(selectedSnapshotRecord)}
        onClose={() => setSelectedSnapshotRecord(null)}
        title="Detail Snapshot Riwayat Perhitungan SAW"
        maxWidth="740px"
        cancelLabel="Tutup"
        confirmLabel="Cetak Laporan Snapshot"
        confirmVariant="secondary"
        onConfirm={() => window.print()}
      >
        {selectedSnapshotRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Meta Information */}
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-page-gray)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Waktu Analisis:</span><br />
                <strong>{selectedSnapshotRecord.date}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Olahan Masakan:</span><br />
                <strong>{selectedSnapshotRecord.recipeName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Rekomendasi Terpilih (#1):</span><br />
                <span style={{ color: 'var(--color-primary-red)', fontWeight: 700 }}>
                  {selectedSnapshotRecord.topCutName} ({selectedSnapshotRecord.topCutCode})
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Nilai Preferensi (V):</span><br />
                <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '18px', color: 'var(--color-primary-red)' }}>
                  {selectedSnapshotRecord.sawScore}
                </span>
              </div>
            </div>

            {/* Snapshot Criteria Used */}
            {selectedSnapshotRecord.snapshot?.criteria && (
              <div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>
                  Konfigurasi Bobot pada Saat Perhitungan:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {selectedSnapshotRecord.snapshot.criteria.map((c, i) => (
                    <div key={i} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)' }}>
                      <strong>{c.code}: {c.name}</strong><br />
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        Sifat: {c.attribute} | Bobot: {(c.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Snapshot Rankings */}
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>
                Hasil Perangkingan Lengkap Snapshot:
              </h4>
              {selectedSnapshotRecord.snapshot?.rankings ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: '60px', textAlign: 'center' }}>Rank</th>
                        <th style={{ width: '80px' }}>Kode</th>
                        <th>Potongan Daging</th>
                        <th style={{ width: '120px', textAlign: 'center' }}>Skor ($V$)</th>
                        <th>Alasan Rekomendasi Terhitung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSnapshotRecord.snapshot.rankings.map((r, i) => (
                        <tr key={i} style={{ backgroundColor: r.rank === 1 ? '#FFF8F8' : undefined }}>
                          <td style={{ textAlign: 'center', fontWeight: 700 }}>#{r.rank}</td>
                          <td><Badge variant="primary">{r.code}</Badge></td>
                          <td><strong>{r.name}</strong></td>
                          <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, color: r.rank === 1 ? 'var(--color-primary-red)' : undefined }}>
                            {r.score}
                          </td>
                          <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                            {r.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  Data snapshot ranking ringkas tersimpan: Pemenang {selectedSnapshotRecord.topCutName} dengan skor {selectedSnapshotRecord.sawScore}.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Riwayat"
        confirmLabel="Ya, Hapus"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
      >
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus catatan riwayat perhitungan untuk masakan <strong>"{deleteTarget?.recipeName}"</strong> ({deleteTarget?.date})?
        </p>
      </Modal>
    </div>
  );
}
