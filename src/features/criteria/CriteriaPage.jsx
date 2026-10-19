import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Save,
  HelpCircle,
  TableProperties,
  Sparkles
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Input, Select, Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import Modal from '../../components/feedback/Modal';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function CriteriaPage() {
  const { showToast } = useToast();
  const [criteria, setCriteria] = useState(storageAdapter.getCriteria());
  const [cuts, setCuts] = useState(storageAdapter.getBeefCuts());
  const [matrix, setMatrix] = useState(storageAdapter.getDecisionMatrix());

  // Weight edit draft state
  const [weightsDraft, setWeightsDraft] = useState({});
  const [isEditingWeights, setIsEditingWeights] = useState(false);

  // Modal State for Add / Edit Criteria
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    attribute: 'Benefit',
    weight: 0.25,
    scale: '1 - 5',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Sync draft weights on load or criteria update
  useEffect(() => {
    const draft = {};
    criteria.forEach((c) => {
      draft[c.id] = Math.round(c.weight * 100);
    });
    setWeightsDraft(draft);
  }, [criteria]);

  const refreshData = () => {
    setCriteria(storageAdapter.getCriteria());
    setCuts(storageAdapter.getBeefCuts());
    setMatrix(storageAdapter.getDecisionMatrix());
  };

  // Calculate Running Total
  const runningTotalPercent = Object.values(weightsDraft).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );
  const isWeightValid = Math.abs(runningTotalPercent - 100) < 0.01;

  const handleWeightChange = (critId, value) => {
    const num = parseFloat(value) || 0;
    setWeightsDraft((prev) => ({
      ...prev,
      [critId]: num,
    }));
  };

  const handleSaveWeights = () => {
    if (!isWeightValid) {
      showToast(`Total bobot belum 100% (saat ini: ${runningTotalPercent}%). Mohon sesuaikan kembali.`, 'error');
      return;
    }

    const decimalMap = {};
    Object.keys(weightsDraft).forEach((k) => {
      decimalMap[k] = weightsDraft[k] / 100;
    });

    const res = storageAdapter.saveAllWeights(decimalMap);
    if (res.success) {
      showToast('Seluruh bobot kriteria berhasil disimpan dan tervalidasi 100% (1,00).', 'success');
      refreshData();
      setIsEditingWeights(false);
    } else {
      showToast(res.message, 'error');
    }
  };

  // Presets
  const applyPreset = (presetName) => {
    let newWeights = {};
    if (presetName === 'steak') {
      // Prioritaskan keempukan tinggi
      newWeights = { 'crit-1': 45, 'crit-2': 15, 'crit-3': 15, 'crit-4': 25 };
    } else if (presetName === 'rendang') {
      // Prioritaskan ketahanan rebusan & bumbu
      newWeights = { 'crit-1': 15, 'crit-2': 15, 'crit-3': 40, 'crit-4': 30 };
    } else if (presetName === 'sop') {
      // Prioritaskan lemak kaldu & ketahanan
      newWeights = { 'crit-1': 20, 'crit-2': 30, 'crit-3': 25, 'crit-4': 25 };
    } else {
      // Default Seimbang
      newWeights = { 'crit-1': 30, 'crit-2': 20, 'crit-3': 25, 'crit-4': 25 };
    }

    // Hanya terapkan jika id kriteria sesuai
    setWeightsDraft((prev) => ({ ...prev, ...newWeights }));
    setIsEditingWeights(true);
    showToast(`Preset bobot "${presetName.toUpperCase()}" dimuat ke formulir draft!`, 'info');
  };

  // Add / Edit Criteria
  const handleOpenAdd = () => {
    setEditingCriteria(null);
    setFormData({
      code: `C${criteria.length + 1}`,
      name: '',
      attribute: 'Benefit',
      weight: 10,
      scale: '1 - 5',
      description: '',
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleOpenEdit = (crit) => {
    setEditingCriteria(crit);
    setFormData({
      code: crit.code,
      name: crit.name,
      attribute: crit.attribute,
      weight: Math.round(crit.weight * 100),
      scale: crit.scale,
      description: crit.description,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.code.trim()) errors.code = 'Kode kriteria wajib diisi (misal: C1).';
    if (!formData.name.trim()) errors.name = 'Nama kriteria wajib diisi.';
    if (!formData.description.trim()) errors.description = 'Deskripsi kriteria wajib diisi.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCriteria = () => {
    if (!validateForm()) return;

    if (editingCriteria) {
      storageAdapter.updateCriteria(editingCriteria.id, {
        ...formData,
        weight: (parseFloat(formData.weight) || 10) / 100,
      });
      showToast(`Kriteria "${formData.name}" berhasil diperbarui.`, 'success');
    } else {
      storageAdapter.addCriteria({
        ...formData,
        weight: (parseFloat(formData.weight) || 10) / 100,
      });
      showToast(`Kriteria baru "${formData.name}" berhasil ditambahkan.`, 'success');
    }
    setIsFormOpen(false);
    refreshData();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    storageAdapter.deleteCriteria(deleteTarget.id);
    showToast(`Kriteria "${deleteTarget.name}" berhasil dihapus.`, 'warning');
    setDeleteTarget(null);
    refreshData();
  };

  // Matrix Cell Edit
  const handleMatrixCellChange = (cutId, critId, val) => {
    const num = Math.max(1, Math.min(5, parseFloat(val) || 1));
    const updated = {
      ...matrix,
      [cutId]: {
        ...(matrix[cutId] || {}),
        [critId]: num,
      },
    };
    setMatrix(updated);
  };

  const handleSaveMatrix = () => {
    storageAdapter.saveFullMatrix(matrix);
    showToast('Matriks keputusan nilai alternatif (X) berhasil disimpan!', 'success');
  };

  const columns = [
    {
      key: 'code',
      header: 'Kode',
      width: '90px',
      render: (row) => <Badge variant="primary">{row.code}</Badge>,
    },
    {
      key: 'name',
      header: 'Nama Kriteria & Penjelasan',
      render: (row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong>{row.name}</strong>
            <span className="badge-demo">DEMO</span>
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'block', maxWidth: '340px', lineHeight: 1.4 }}>
            {row.description}
          </span>
        </div>
      ),
    },
    {
      key: 'attribute',
      header: 'Atribut (Sifat)',
      width: '130px',
      render: (row) => (
        <Badge variant={row.attribute === 'Benefit' ? 'benefit' : 'cost'}>
          {row.attribute}
        </Badge>
      ),
    },
    {
      key: 'weight',
      header: 'Bobot Saat Ini',
      width: '160px',
      render: (row) => (
        <div>
          <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-red)' }}>
            {(row.weight * 100).toFixed(0)}%
          </span>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: '6px' }}>
            ({row.weight.toFixed(2)})
          </span>
        </div>
      ),
    },
    {
      key: 'scale',
      header: 'Skala Nilai',
      render: (row) => <span style={{ fontSize: 'var(--font-size-xs)' }}>{row.scale}</span>,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-demo">METODE SAW (PRD 4.4 & 5)</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Fase D Terverifikasi
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Manajemen Kriteria & Pembobotan SAW</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Atur parameter kriteria (Benefit vs Cost), persentase bobot preferensi ($W$), dan matriks keputusan ($X$).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="primary"
            size="md"
            iconLeft={Plus}
            onClick={handleOpenAdd}
          >
            Tambah Kriteria
          </Button>
        </div>
      </div>

      {/* Running Weight Calculator Card */}
      <Card>
        <CardHeader
          title="Kalkulator Penyesuaian Bobot Berjalan"
          subtitle="Aturan PRD: Total bobot dari seluruh kriteria wajib tepat 100% (1,00)"
          action={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Status Bobot:</span>
              {isWeightValid ? (
                <span className="badge badge-benefit" style={{ fontWeight: 600 }}>
                  <CheckCircle2 size={14} style={{ marginRight: 4 }} />
                  Total Valid: 100% (1,00)
                </span>
              ) : (
                <span className="badge badge-cost" style={{ fontWeight: 600, color: 'var(--color-error)', backgroundColor: 'var(--color-error-bg)', borderColor: 'rgba(201, 52, 64, 0.2)' }}>
                  <AlertTriangle size={14} style={{ marginRight: 4 }} />
                  Total Belum 100% ({runningTotalPercent}%)
                </span>
              )}
            </div>
          }
        />
        <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', padding: '12px 16px', backgroundColor: 'var(--color-page-gray)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Muat Preset Cepat:
            </span>
            <Button variant="secondary" size="sm" onClick={() => applyPreset('steak')}>
              Preset Steak (Fokus Empuk)
            </Button>
            <Button variant="secondary" size="sm" onClick={() => applyPreset('rendang')}>
              Preset Rendang (Fokus Tahan Rebus)
            </Button>
            <Button variant="secondary" size="sm" onClick={() => applyPreset('sop')}>
              Preset Sop (Fokus Lemak Kaldu)
            </Button>
            <Button variant="ghost" size="sm" onClick={() => applyPreset('default')}>
              Reset Default Seimbang
            </Button>
          </div>

          {/* Quick Adjust Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {criteria.map((c) => {
              const currentVal = weightsDraft[c.id] !== undefined ? weightsDraft[c.id] : Math.round(c.weight * 100);
              return (
                <div
                  key={c.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    backgroundColor: 'var(--color-white)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Badge variant="primary">{c.code}</Badge>
                      <strong style={{ fontSize: 'var(--font-size-sm)' }}>{c.name.split('(')[0]}</strong>
                    </div>
                    <Badge variant={c.attribute === 'Benefit' ? 'benefit' : 'cost'}>
                      {c.attribute}
                    </Badge>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={currentVal}
                      onChange={(e) => handleWeightChange(c.id, e.target.value)}
                      className="form-input"
                      style={{ textAlign: 'center', fontWeight: 600, width: '80px', padding: '6px 8px' }}
                    />
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>%</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                      = {(currentVal / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar of Total */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '6px' }}>
              <span>Total Bobot Berjalan: <strong>{runningTotalPercent}%</strong></span>
              <span>Target Wajib: <strong>100% (1,00)</strong></span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, runningTotalPercent)}%`,
                  backgroundColor: isWeightValid ? 'var(--color-success)' : 'var(--color-primary-red)',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            * Tombol simpan dinonaktifkan otomatis apabila akumulasi bobot tidak tepat 100%.
          </span>
          <Button
            variant="primary"
            size="md"
            iconLeft={Save}
            disabled={!isWeightValid}
            onClick={handleSaveWeights}
          >
            Simpan Konfigurasi Bobot
          </Button>
        </CardFooter>
      </Card>

      {/* Criteria Table Card */}
      <Card>
        <CardHeader
          title={`Daftar Master Kriteria SAW (${criteria.length} Kriteria)`}
          subtitle="Kriteria evaluasi dan karakteristik matematis untuk normalisasi"
          action={<span className="badge-demo">DATA ACUAN DEMO</span>}
        />
        <CardBody style={{ padding: 0 }}>
          <Table columns={columns} data={criteria} />
        </CardBody>
      </Card>

      {/* Decision Matrix (X) Table Card */}
      <Card>
        <CardHeader
          title="Matriks Keputusan Nilai Alternatif (Matriks X)"
          subtitle="Nilai penilaian potongan daging pada masing-masing kriteria (Skala 1 - 5)"
          action={
            <Button
              variant="primary"
              size="sm"
              iconLeft={Save}
              onClick={handleSaveMatrix}
            >
              Simpan Matriks
            </Button>
          }
        />
        <CardBody style={{ padding: 0 }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Kode</th>
                  <th>Alternatif Daging</th>
                  {criteria.map((c) => (
                    <th key={c.id} style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <span>{c.code}</span>
                        <small style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>
                          {c.attribute} ({(c.weight * 100).toFixed(0)}%)
                        </small>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cuts.map((cut) => {
                  const cutRow = matrix[cut.id] || {};
                  return (
                    <tr key={cut.id}>
                      <td><Badge variant="primary">{cut.code}</Badge></td>
                      <td>
                        <strong>{cut.name}</strong>
                        <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          {cut.texture}
                        </span>
                      </td>
                      {criteria.map((c) => {
                        const cellVal = cutRow[c.id] !== undefined ? cutRow[c.id] : 3;
                        return (
                          <td key={c.id} style={{ textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              step="1"
                              value={cellVal}
                              onChange={(e) => handleMatrixCellChange(cut.id, c.id, e.target.value)}
                              className="form-input"
                              style={{ width: '64px', textAlign: 'center', margin: '0 auto', padding: '4px 6px' }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            Keterangan Skala: 1 = Sangat Rendah/Liat | 3 = Cukup/Sedang | 5 = Sangat Tinggi/Empuk
          </span>
          <Button
            variant="primary"
            size="sm"
            iconLeft={Save}
            onClick={handleSaveMatrix}
          >
            Simpan Nilai Matriks
          </Button>
        </CardFooter>
      </Card>

      {/* Add / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCriteria ? 'Ubah Data Kriteria' : 'Tambah Kriteria SAW Baru'}
        confirmLabel="Simpan Kriteria"
        onConfirm={handleSaveCriteria}
        cancelLabel="Batal"
        maxWidth="540px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
            <Input
              label="Kode"
              name="crit_code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              error={formErrors.code}
              required
            />
            <Input
              label="Nama Kriteria"
              name="crit_name"
              placeholder="Contoh: Tingkat Keempukan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formErrors.name}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Atribut Kriteria"
              name="crit_attr"
              value={formData.attribute}
              onChange={(e) => setFormData({ ...formData, attribute: e.target.value })}
              options={[
                { value: 'Benefit', label: 'Benefit (Makin besar makin baik)' },
                { value: 'Cost', label: 'Cost (Makin kecil makin baik)' },
              ]}
              required
            />
            <Input
              label="Skala Penilaian"
              name="crit_scale"
              placeholder="1 - 5"
              value={formData.scale}
              onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="crit_desc">
              <span>Deskripsi & Justifikasi <span className="required">*</span></span>
            </label>
            <textarea
              id="crit_desc"
              className={`form-input ${formErrors.description ? 'has-error' : ''}`}
              rows={3}
              placeholder="Penjelasan kriteria dan mengapa atribut Benefit/Cost diterapkan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {formErrors.description && <span className="form-error">{formErrors.description}</span>}
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Kriteria"
        confirmLabel="Ya, Hapus"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={handleDeleteConfirm}
      >
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus kriteria <strong>"{deleteTarget?.name}"</strong> ({deleteTarget?.code})?
          Nilai bobot kriteria lainnya perlu disesuaikan kembali agar totalnya tetap 100%.
        </p>
      </Modal>
    </div>
  );
}
