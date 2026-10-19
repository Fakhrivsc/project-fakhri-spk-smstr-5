import React, { useState } from 'react';
import {
  Sparkles,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Plus,
  Send,
  Sliders,
  TrendingUp,
  Beef,
  UtensilsCrossed,
  Layers,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter, StatCard } from '../components/ui/Card';
import { Input, Select, Badge } from '../components/ui/Input';
import Table from '../components/tables/Table';
import EmptyState from '../components/feedback/EmptyState';
import Skeleton from '../components/feedback/Skeleton';
import Modal from '../components/feedback/Modal';
import { useToast } from '../components/feedback/ToastContext';

export default function DesignSystemShowcase({ onNavigate }) {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('has_dalam');
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSimulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      showToast('Aksi berhasil diproses dengan presisi!', 'success');
    }, 1500);
  };

  const sampleColumns = [
    { key: 'code', header: 'Kode', width: '100px' },
    { key: 'name', header: 'Nama Bagian Daging' },
    { key: 'texture', header: 'Tekstur Daging' },
    { key: 'fatLevel', header: 'Kandungan Lemak' },
    {
      key: 'type',
      header: 'Tipe Kriteria',
      render: (row) => (
        <Badge variant={row.type === 'Benefit' ? 'benefit' : 'cost'}>
          {row.type}
        </Badge>
      )
    },
    {
      key: 'action',
      header: 'Aksi',
      align: 'right',
      render: () => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm" onClick={() => showToast('Edit item (DEMO)', 'info')}>
            Ubah
          </Button>
          <Button variant="danger" size="sm" onClick={() => setModalOpen(true)}>
            Hapus
          </Button>
        </div>
      )
    }
  ];

  const sampleData = [
    { id: '1', code: 'A1', name: 'Has Dalam (Tenderloin)', texture: 'Sangat Empuk', fatLevel: 'Rendah (3%)', type: 'Benefit' },
    { id: '2', code: 'A2', name: 'Has Luar (Sirloin)', texture: 'Cukup Empuk', fatLevel: 'Sedang (8%)', type: 'Benefit' },
    { id: '3', code: 'A3', name: 'Sandung Lamur (Brisket)', texture: 'Berlemak & Kenyal', fatLevel: 'Tinggi (18%)', type: 'Cost' },
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* Header Showcase */}
      <div style={{ marginBottom: '36px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge-demo">FASE B TERVERIFIKASI</span>
          <Badge variant="primary">Design System BeefChoice</Badge>
        </div>
        <h1 style={{ marginBottom: '12px' }}>Fondasi Design System & Layout</h1>
        <p style={{ maxWidth: '640px', margin: '0 auto' }}>
          Penerapan token desain warna, tipografi Inter, komponen interaktif, responsivitas, dan layout Public & Admin
          sesuai spesifikasi ketat <span style={{ fontWeight: 600 }}>UI-GUIDELINE.md</span>.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Button
            variant="primary"
            size="md"
            iconRight={ArrowRight}
            onClick={() => onNavigate('#/admin/dashboard')}
          >
            Lihat Layout Admin
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => showToast('Notifikasi info sistem berhasil diuji.', 'info')}
          >
            Uji Toast Info
          </Button>
        </div>
      </div>

      {/* Grid: Color Tokens */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={22} color="var(--color-primary-red)" />
          Palet Warna Token UI-Guideline
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'var(--color-primary-red)', color: '#fff', borderRadius: 'var(--radius-card)' }}>
            <strong>Primary Red</strong><br />
            <small>#E54852</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-soft-red)', color: 'var(--color-primary-red)', borderRadius: 'var(--radius-card)', border: '1px solid #F8D2D4' }}>
            <strong>Soft Red</strong><br />
            <small>#FCE8E9</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-charcoal)', color: '#fff', borderRadius: 'var(--radius-card)' }}>
            <strong>Charcoal</strong><br />
            <small>#151619</small>
          </div>
          <div style={{ padding: '16px', background: '#FFFFFF', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)' }}>
            <strong>White & Card BG</strong><br />
            <small>#FFFFFF</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-page-gray)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)' }}>
            <strong>Page Gray</strong><br />
            <small>#F5F6F8</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-success)', color: '#fff', borderRadius: 'var(--radius-card)' }}>
            <strong>Success</strong><br />
            <small>#168A5B</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-warning)', color: '#fff', borderRadius: 'var(--radius-card)' }}>
            <strong>Warning</strong><br />
            <small>#D98A16</small>
          </div>
          <div style={{ padding: '16px', background: 'var(--color-error)', color: '#fff', borderRadius: 'var(--radius-card)' }}>
            <strong>Error</strong><br />
            <small>#C93440</small>
          </div>
        </div>
      </div>

      {/* Grid: Stat Cards & Widgets */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Kartu Statistik & Ringkasan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <StatCard
            icon={Beef}
            label="Alternatif Daging"
            value="5 Bagian"
            helper="Label DEMO: Has dalam, has luar, dll."
          />
          <StatCard
            icon={UtensilsCrossed}
            label="Jenis Masakan"
            value="6 Masakan"
            helper="Rendang, steak, sate, sop, dll."
          />
          <StatCard
            icon={Sliders}
            label="Kriteria SAW"
            value="4 Kriteria"
            helper="Benefit & Cost terdefinisi"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Perhitungan"
            value="18 Kali"
            helper="Tersimpan dalam riwayat DEMO"
          />
        </div>
      </div>

      {/* Interactive Controls & Forms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Buttons & Actions */}
        <Card>
          <CardHeader title="Komponen Tombol (Buttons)" subtitle="State normal, hover, loading, danger, dan disabled" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Button variant="primary" size="md" iconLeft={Plus} onClick={() => showToast('Tombol Primary diklik', 'success')}>
                Primary Button
              </Button>
              <Button variant="secondary" size="md" onClick={() => showToast('Tombol Secondary diklik', 'info')}>
                Secondary
              </Button>
              <Button variant="danger" size="md" iconLeft={Trash2} onClick={() => setModalOpen(true)}>
                Danger Action
              </Button>
              <Button variant="ghost" size="md">
                Ghost Button
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button
                variant="primary"
                size="sm"
                isLoading={btnLoading}
                onClick={handleSimulateLoading}
              >
                {btnLoading ? 'Memproses...' : 'Uji Tombol Loading'}
              </Button>
              <Button variant="primary" size="md" disabled>
                Tombol Nonaktif (Disabled)
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Form Controls */}
        <Card>
          <CardHeader title="Komponen Input & Form" subtitle="Validasi dekat input & label selalu tampak" />
          <CardBody>
            <Input
              label="Nama Alternatif Bagian Daging"
              name="cut_name"
              placeholder="Contoh: Has Dalam (Tenderloin)"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              hint="Masukkan nama potongan daging sapi yang terdaftar"
            />
            <Select
              label="Pilihan Bagian Daging (DEMO)"
              name="demo_select"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'has_dalam', label: 'Has Dalam (Tenderloin)' },
                { value: 'has_luar', label: 'Has Luar (Sirloin)' },
                { value: 'sandung_lamur', label: 'Sandung Lamur (Brisket)' },
                { value: 'sengkel', label: 'Sengkel (Shank)' },
                { value: 'paha_belakang', label: 'Paha Belakang (Round)' },
              ]}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Badge variant="benefit">Benefit Kriteria</Badge>
              <Badge variant="cost">Cost Kriteria</Badge>
              <Badge variant="primary">Nilai SAW 0.8750</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Table Component */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2>Komponen Tabel Terstruktur</h2>
            <p>Header kontras, baris terstruktur, aksi di kolom kanan, dan responsif.</p>
          </div>
          <span className="badge-demo">DATA CONTOH DEMO</span>
        </div>
        <Table columns={sampleColumns} data={sampleData} />
      </div>

      {/* Feedback & Skeleton Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <Card>
          <CardHeader title="Skeleton Loading State" subtitle="Placeholder saat proses perhitungan atau pemuatan data" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Skeleton height="32px" width="60%" />
            <Skeleton height="16px" width="100%" />
            <Skeleton height="16px" width="85%" />
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <Skeleton height="36px" width="100px" borderRadius="var(--radius-button)" />
              <Skeleton height="36px" width="120px" borderRadius="var(--radius-button)" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Empty State Component" subtitle="Tampilan saat riwayat atau daftar data masih kosong" />
          <CardBody>
            <EmptyState
              title="Belum Ada Hasil Perhitungan"
              description="Pilih jenis masakan pada menu Rekomendasi untuk memulai proses pembobotan SAW."
              actionLabel="Mulai Rekomendasi"
              onAction={() => showToast('Navigasi ke halaman masakan', 'info')}
            />
          </CardBody>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Konfirmasi Penghapusan Data"
        confirmLabel="Ya, Hapus Data"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={() => {
          setModalOpen(false);
          showToast('Data berhasil dihapus dari simulasi DEMO.', 'warning');
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Apakah Anda yakin ingin menghapus data potongan daging ini? Tindakan ini tidak dapat dibatalkan pada sesi saat ini.
        </p>
      </Modal>
    </div>
  );
}
