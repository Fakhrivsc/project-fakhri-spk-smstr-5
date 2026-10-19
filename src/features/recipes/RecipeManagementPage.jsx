import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input, Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import Modal from '../../components/feedback/Modal';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function RecipeManagementPage() {
  const { showToast } = useToast();
  const [recipes, setRecipes] = useState(storageAdapter.getRecipes());
  const [search, setSearch] = useState('');

  // Modal State for Add / Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cookingMethod: '',
    recommendedCutHint: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);

  const refreshData = () => {
    setRecipes(storageAdapter.getRecipes());
  };

  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setFormData({
      name: '',
      description: '',
      cookingMethod: '',
      recommendedCutHint: '',
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleOpenEdit = (recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      description: recipe.description,
      cookingMethod: recipe.cookingMethod,
      recommendedCutHint: recipe.recommendedCutHint,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Nama masakan wajib diisi.';
    if (!formData.description.trim()) errors.description = 'Deskripsi olahan masakan wajib diisi.';
    if (!formData.cookingMethod.trim()) errors.cookingMethod = 'Metode masak wajib diisi.';
    if (!formData.recommendedCutHint.trim()) errors.recommendedCutHint = 'Karakter daging yang dicari wajib diisi.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingRecipe) {
      storageAdapter.updateRecipe(editingRecipe.id, formData);
      showToast(`Masakan "${formData.name}" berhasil diperbarui.`, 'success');
    } else {
      storageAdapter.addRecipe(formData);
      showToast(`Masakan baru "${formData.name}" berhasil ditambahkan.`, 'success');
    }
    setIsFormOpen(false);
    refreshData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    storageAdapter.deleteRecipe(deleteTarget.id);
    showToast(`Masakan "${deleteTarget.name}" berhasil dihapus.`, 'warning');
    setDeleteTarget(null);
    refreshData();
  };

  const filteredRecipes = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.cookingMethod.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Nama Olahan Masakan',
      render: (row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong>{row.name}</strong>
            <span className="badge-demo">DEMO</span>
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'block', maxWidth: '300px', lineHeight: 1.4 }}>
            {row.description}
          </span>
        </div>
      ),
    },
    {
      key: 'cookingMethod',
      header: 'Metode Pengolahan / Waktu',
      render: (row) => <Badge variant="neutral">{row.cookingMethod}</Badge>,
    },
    {
      key: 'recommendedCutHint',
      header: 'Karakter Potongan Daging Ideal',
      render: (row) => (
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-red)', fontWeight: 500 }}>
          {row.recommendedCutHint}
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
            <span className="badge-demo">MASTER DATA MASAKAN (DEMO)</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              PRD.md 4.3
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Manajemen Jenis Masakan</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Kelola daftar olahan kuliner yang dapat dipilih pengguna untuk dihitung rekomendasi potongan dagingnya.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="primary"
            size="md"
            iconLeft={Plus}
            onClick={handleOpenAdd}
          >
            Tambah Jenis Masakan
          </Button>
        </div>
      </div>

      {/* Filter and Table Card */}
      <Card>
        <CardHeader
          title={`Daftar Jenis Masakan (${recipes.length} Masakan)`}
          subtitle="Daftar masakan aktif yang tersedia di katalog publik"
          action={
            <div style={{ width: '280px' }}>
              <Input
                placeholder="Cari jenis masakan..."
                name="search_recipe"
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
            data={filteredRecipes}
            emptyMessage={search ? `Tidak ada masakan cocok dengan "${search}".` : 'Belum ada masakan terdaftar.'}
          />
        </CardBody>
      </Card>

      {/* Add / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingRecipe ? 'Ubah Data Masakan' : 'Tambah Jenis Masakan Baru'}
        confirmLabel="Simpan Masakan"
        onConfirm={handleSave}
        cancelLabel="Batal"
        maxWidth="560px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Nama Masakan"
            name="recipe_name"
            placeholder="Contoh: Rawon Daging Khas Jawa Timur"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            required
          />

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="recipe_desc">
              <span>Deskripsi Masakan <span className="required">*</span></span>
            </label>
            <textarea
              id="recipe_desc"
              className={`form-input ${formErrors.description ? 'has-error' : ''}`}
              rows={3}
              placeholder="Jelaskan karakteristik masakan, bumbu, atau cita rasa..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {formErrors.description && <span className="form-error">{formErrors.description}</span>}
          </div>

          <Input
            label="Metode Pengolahan & Estimasi Durasi"
            name="recipe_method"
            placeholder="Contoh: Slow cooking / rebus 2-3 jam"
            value={formData.cookingMethod}
            onChange={(e) => setFormData({ ...formData, cookingMethod: e.target.value })}
            error={formErrors.cookingMethod}
            required
          />

          <Input
            label="Karakteristik Potongan Daging yang Dibutuhkan"
            name="recipe_hint"
            placeholder="Contoh: Berlemak & berkaldu, tahan rebusan lama..."
            value={formData.recommendedCutHint}
            onChange={(e) => setFormData({ ...formData, recommendedCutHint: e.target.value })}
            error={formErrors.recommendedCutHint}
            required
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Jenis Masakan"
        confirmLabel="Ya, Hapus"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
      >
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus masakan <strong>"{deleteTarget?.name}"</strong>?
          Masakan ini tidak akan lagi muncul pada katalog pemilihan masakan.
        </p>
      </Modal>
    </div>
  );
}
