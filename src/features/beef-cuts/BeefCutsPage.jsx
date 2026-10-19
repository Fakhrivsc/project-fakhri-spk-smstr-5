import React, { useState } from 'react';
import { Beef, Plus, Edit, Trash2, Search, RotateCcw, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input, Select, Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import Modal from '../../components/feedback/Modal';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function BeefCutsPage() {
  const { showToast } = useToast();
  const [cuts, setCuts] = useState(storageAdapter.getBeefCuts());
  const [search, setSearch] = useState('');
  
  // Modal State for Add / Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCut, setEditingCut] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    texture: '',
    fatLevel: '',
    characteristics: '',
    bestUses: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);

  const refreshData = () => {
    setCuts(storageAdapter.getBeefCuts());
  };

  const handleOpenAdd = () => {
    setEditingCut(null);
    setFormData({
      code: `A${cuts.length + 1}`,
      name: '',
      texture: '',
      fatLevel: '',
      characteristics: '',
      bestUses: '',
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cut) => {
    setEditingCut(cut);
    setFormData({
      code: cut.code,
      name: cut.name,
      texture: cut.texture,
      fatLevel: cut.fatLevel,
      characteristics: cut.characteristics,
      bestUses: cut.bestUses,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.code.trim()) errors.code = 'Kode alternatif wajib diisi (misal: A1).';
    if (!formData.name.trim()) errors.name = 'Nama potongan daging wajib diisi.';
    if (!formData.texture.trim()) errors.texture = 'Tekstur daging wajib diisi.';
    if (!formData.fatLevel.trim()) errors.fatLevel = 'Tingkat lemak wajib diisi.';
    if (!formData.characteristics.trim()) errors.characteristics = 'Karakteristik wajib diisi.';
    if (!formData.bestUses.trim()) errors.bestUses = 'Kegunaan / masakan cocok wajib diisi.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingCut) {
      storageAdapter.updateBeefCut(editingCut.id, formData);
      showToast(`Data "${formData.name}" berhasil diperbarui.`, 'success');
    } else {
      storageAdapter.addBeefCut(formData);
      showToast(`Bagian daging "${formData.name}" berhasil ditambahkan.`, 'success');
    }
    setIsFormOpen(false);
    refreshData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    storageAdapter.deleteBeefCut(deleteTarget.id);
    showToast(`Potongan "${deleteTarget.name}" berhasil dihapus.`, 'warning');
    setDeleteTarget(null);
    refreshData();
  };

  const filteredCuts = cuts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.texture.toLowerCase().includes(search.toLowerCase()) ||
      c.bestUses.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'code',
      header: 'Kode',
      width: '90px',
      render: (row) => <Badge variant="primary">{row.code}</Badge>,
    },
    {
      key: 'name',
      header: 'Nama Potongan Daging',
      render: (row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <strong>{row.name}</strong>
            <span className="badge-demo">DEMO</span>
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Cocok: {row.bestUses}
          </span>
        </div>
      ),
    },
    {
      key: 'texture',
      header: 'Tekstur',
      width: '150px',
      render: (row) => <Badge variant="neutral">{row.texture}</Badge>,
    },
    {
      key: 'fatLevel',
      header: 'Tingkat Lemak',
      width: '180px',
      render: (row) => <span style={{ fontSize: 'var(--font-size-xs)' }}>{row.fatLevel}</span>,
    },
    {
      key: 'characteristics',
      header: 'Karakteristik Fisik Daging',
      render: (row) => (
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4, display: 'block', maxWidth: '320px' }}>
          {row.characteristics}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Aksi',
      align: 'right',
      width: '140px',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={Edit}
            onClick={() => handleOpenEdit(row)}
            aria-label="Ubah"
          >
            Ubah
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconLeft={Trash2}
            onClick={() => setDeleteTarget(row)}
            aria-label="Hapus"
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-demo">MASTER DATA ALTERNATIF (DEMO)</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              PRD.md 4.2
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Manajemen Bagian Daging Sapi</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Kelola data alternatif daging sapi yang akan diproses dalam matriks keputusan metode SAW.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="primary"
            size="md"
            iconLeft={Plus}
            onClick={handleOpenAdd}
          >
            Tambah Bagian Daging
          </Button>
        </div>
      </div>

      {/* Filter and Table Card */}
      <Card>
        <CardHeader
          title={`Daftar Potongan Daging Sapi (${cuts.length} Alternatif)`}
          subtitle="Data alternatif terdaftar untuk perhitungan SAW"
          action={
            <div style={{ width: '280px' }}>
              <Input
                placeholder="Cari bagian daging..."
                name="search_cut"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
          }
        />
        <CardBody style={{ padding: 0 }}>
          <Table
            columns={columns}
            data={filteredCuts}
            emptyMessage={search ? `Tidak ada data cocok dengan "${search}".` : 'Belum ada alternatif bagian daging.'}
          />
        </CardBody>
      </Card>

      {/* Add / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCut ? 'Ubah Data Bagian Daging' : 'Tambah Alternatif Daging Baru'}
        confirmLabel="Simpan Data"
        onConfirm={handleSave}
        cancelLabel="Batal"
        maxWidth="560px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
            <Input
              label="Kode"
              name="cut_code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              error={formErrors.code}
              required
            />
            <Input
              label="Nama Bagian Daging"
              name="cut_name"
              placeholder="Contoh: Has Dalam (Tenderloin)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formErrors.name}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Tekstur Daging"
              name="cut_texture"
              placeholder="Contoh: Sangat Empuk / Kenyal"
              value={formData.texture}
              onChange={(e) => setFormData({ ...formData, texture: e.target.value })}
              error={formErrors.texture}
              required
            />
            <Input
              label="Tingkat Kandungan Lemak"
              name="cut_fat"
              placeholder="Contoh: Rendah (3-5%)"
              value={formData.fatLevel}
              onChange={(e) => setFormData({ ...formData, fatLevel: e.target.value })}
              error={formErrors.fatLevel}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="cut_char">
              <span>Karakteristik Fisik Daging <span className="required">*</span></span>
            </label>
            <textarea
              id="cut_char"
              className={`form-input ${formErrors.characteristics ? 'has-error' : ''}`}
              rows={3}
              placeholder="Deskripsi serat, jaringan ikat, atau sifat daging saat dimasak..."
              value={formData.characteristics}
              onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
            />
            {formErrors.characteristics && <span className="form-error">{formErrors.characteristics}</span>}
          </div>

          <Input
            label="Rekomendasi Kegunaan Olahan"
            name="cut_uses"
            placeholder="Contoh: Steak, tumisan, sate..."
            value={formData.bestUses}
            onChange={(e) => setFormData({ ...formData, bestUses: e.target.value })}
            error={formErrors.bestUses}
            required
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Bagian Daging"
        confirmLabel="Ya, Hapus"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
      >
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus data potongan <strong>"{deleteTarget?.name}"</strong> ({deleteTarget?.code})?
          Data ini akan dihapus dari simulasi penilaian SAW.
        </p>
      </Modal>
    </div>
  );
}
