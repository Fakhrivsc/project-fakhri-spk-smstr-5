import React, { useState } from 'react';
import {
  Beef,
  UtensilsCrossed,
  Sliders,
  TrendingUp,
  Plus,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Award
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter, StatCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function DashboardPage({ onNavigate }) {
  const { showToast } = useToast();
  const [stats, setStats] = useState(storageAdapter.getDashboardStats());
  const [history, setHistory] = useState(storageAdapter.getHistory());

  const handleResetDemo = () => {
    storageAdapter.resetAllDemoData();
    setStats(storageAdapter.getDashboardStats());
    setHistory(storageAdapter.getHistory());
    showToast('Seluruh data DEMO berhasil dikembalikan ke pengaturan awal!', 'success');
  };

  const recentColumns = [
    { key: 'date', header: 'Waktu Analisis', width: '180px' },
    { key: 'recipeName', header: 'Jenis Masakan' },
    {
      key: 'topCutName',
      header: 'Rekomendasi Utama (Peringkat 1)',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="primary">{row.topCutCode}</Badge>
          <strong>{row.topCutName}</strong>
        </div>
      ),
    },
    {
      key: 'sawScore',
      header: 'Nilai Preferensi (V)',
      align: 'center',
      width: '150px',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary-red)' }}>
          {row.sawScore}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status Data',
      align: 'right',
      render: () => <span className="badge-demo">DEMO</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '24px',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-demo">PANEL ADMINISTRATOR</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Metode Simple Additive Weighting (SAW)
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Ringkasan Sistem SPK Pemilihan Bagian Daging</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Kelola alternatif potongan daging sapi, konfigurasi jenis masakan, serta bobot kriteria untuk perhitungan SAW.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={RotateCcw}
            onClick={handleResetDemo}
            title="Kembalikan dataset potongan & masakan ke data awal DEMO"
          >
            Reset Data DEMO
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconLeft={Plus}
            onClick={() => onNavigate('#/admin/cuts')}
          >
            Kelola Daging
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        <StatCard
          icon={Beef}
          label="Alternatif Daging"
          value={`${stats.totalCuts} Bagian`}
          helper="Has dalam, has luar, sengkel, dll."
        />
        <StatCard
          icon={UtensilsCrossed}
          label="Jenis Masakan"
          value={`${stats.totalRecipes} Resep`}
          helper="Rendang, steak, sop, sate, dll."
        />
        <StatCard
          icon={Sliders}
          label="Kriteria Terdaftar"
          value={`${stats.totalCriteria} Kriteria`}
          helper="Atribut Benefit & Cost"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Perhitungan"
          value={`${stats.totalHistory} Riwayat`}
          helper="Tersimpan dalam snapshot parameter"
        />
      </div>

      {/* Quick Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <Card>
          <CardHeader title="Manajemen Alternatif Potongan Daging" subtitle="CRUD data master daging sapi" />
          <CardBody>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5, marginBottom: '16px' }}>
              Perbarui karakteristik tekstur, kadar lemak, dan kegunaan potongan daging sapi yang dijadikan alternatif penilaian.
            </p>
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              onClick={() => onNavigate('#/admin/cuts')}
            >
              Buka Manajemen Daging
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Manajemen Jenis Masakan" subtitle="CRUD olahan kuliner Nusantara & Barat" />
          <CardBody>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5, marginBottom: '16px' }}>
              Tambah atau sesuaikan daftar olahan masakan, metode memasak (slow cooking, grilling), dan kriteria daging yang dicari.
            </p>
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              onClick={() => onNavigate('#/admin/recipes')}
            >
              Buka Manajemen Masakan
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Kriteria, Bobot & Mesin SAW" subtitle="Fase D & E selanjutnya" />
          <CardBody>
            <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5, marginBottom: '16px' }}>
              Atur atribut Benefit/Cost, normalisasi matriks keputusan, serta validasi jumlah bobot 100% (1,00).
            </p>
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              onClick={() => onNavigate('#/admin/criteria')}
            >
              Lihat Konfigurasi Bobot
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Recent Calculations Table */}
      <Card>
        <CardHeader
          title="Rekomendasi & Perhitungan Terbaru"
          subtitle="Riwayat kalkulasi metode SAW dengan snapshot parameter"
          action={<span className="badge-demo">RIWAYAT DEMO</span>}
        />
        <CardBody style={{ padding: 0 }}>
          <Table columns={recentColumns} data={history} emptyMessage="Belum ada riwayat perhitungan SAW." />
        </CardBody>
        <CardFooter>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('#/admin/history')}>
            Lihat Semua Riwayat Perhitungan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
