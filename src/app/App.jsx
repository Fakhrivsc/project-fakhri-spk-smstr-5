import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from '../components/feedback/ToastContext';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import LandingPage from '../features/landing/LandingPage';
import RecipeSelectionPage from '../features/recipes/RecipeSelectionPage';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import BeefCutsPage from '../features/beef-cuts/BeefCutsPage';
import RecipeManagementPage from '../features/recipes/RecipeManagementPage';
import CriteriaPage from '../features/criteria/CriteriaPage';
import SawCalculationPage from '../features/saw/SawCalculationPage';
import RecommendationResultPage from '../features/recommendations/RecommendationResultPage';
import HistoryPage from '../features/history/HistoryPage';
import ReportsPage from '../features/reports/ReportsPage';
import DesignSystemShowcase from './DesignSystemShowcase';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Input';
import Button from '../components/ui/Button';
import Table from '../components/tables/Table';
import { storageAdapter } from '../services/storageAdapter';
import { Sliders, Calculator, History, FileText, Settings, ArrowRight, RotateCcw, Award } from 'lucide-react';

function MainAppContent() {
  const { showToast } = useToast();
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [auth, setAuth] = useState(storageAdapter.getAuth());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      setAuth(storageAdapter.getAuth());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    storageAdapter.logout();
    setAuth({ isAuthenticated: false, user: null });
    showToast('Anda telah keluar dari Panel Administrator.', 'info');
    navigate('#/');
  };

  const isAdminRoute = currentPath.startsWith('#/admin') && currentPath !== '#/admin/login';

  // Get Admin Page Title
  const getAdminTitle = () => {
    switch (currentPath) {
      case '#/admin/dashboard': return 'Dashboard Admin';
      case '#/admin/cuts': return 'Manajemen Bagian Daging Sapi';
      case '#/admin/recipes': return 'Manajemen Jenis Masakan';
      case '#/admin/criteria': return 'Kriteria & Bobot (Fase D)';
      case '#/admin/saw': return 'Perhitungan SAW (Fase E)';
      case '#/admin/history': return 'Riwayat Perhitungan SAW';
      case '#/admin/reports': return 'Laporan Rekomendasi (Fase G)';
      case '#/admin/settings': return 'Pengaturan & Dataset';
      default: return 'Admin Panel';
    }
  };

  // Helper placeholder for future phases
  const renderPhasePlaceholder = (title, phaseCode, phaseDescription, nextTarget) => (
    <Card>
      <CardHeader
        title={title}
        subtitle={`Modul ini disiapkan untuk ${phaseCode} sesuai IMPLEMENTATION_PLAN.md`}
        action={<span className="badge-demo">{phaseCode}</span>}
      />
      <CardBody>
        <div style={{ padding: '24px', backgroundColor: 'var(--color-page-gray)', borderRadius: 'var(--radius-card)', border: '1px dashed var(--color-border)' }}>
          <h4 style={{ marginBottom: '8px', color: 'var(--color-text-primary)' }}>
            Status: Menunggu Persetujuan Fase Terjadwal
          </h4>
          <p style={{ marginBottom: '16px', lineHeight: 1.6, maxWidth: '640px' }}>
            {phaseDescription}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="primary" size="sm" onClick={() => navigate('#/admin/dashboard')}>
              Kembali ke Dashboard
            </Button>
            {nextTarget && (
              <Button variant="secondary" size="sm" onClick={() => navigate(nextTarget)}>
                Buka Menu Lain
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );

  // Render Admin subpages
  if (isAdminRoute) {
    let content = null;
    switch (currentPath) {
      case '#/admin/dashboard':
        content = <DashboardPage onNavigate={navigate} />;
        break;
      case '#/admin/cuts':
        content = <BeefCutsPage />;
        break;
      case '#/admin/recipes':
        content = <RecipeManagementPage />;
        break;
      case '#/admin/criteria':
        content = <CriteriaPage />;
        break;
      case '#/admin/saw':
        content = <SawCalculationPage />;
        break;
      case '#/admin/history':
        content = <HistoryPage isAdminMode={true} onNavigate={navigate} />;
        break;
      case '#/admin/reports':
        content = <ReportsPage />;
        break;
      case '#/admin/settings':
        content = (
          <Card>
            <CardHeader title="Pengaturan & Dataset Sistem" subtitle="Kelola konfigurasi penyimpanan data DEMO" />
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--color-page-gray)', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)' }}>
                <h4 style={{ marginBottom: '6px' }}>Status Penyimpanan: LocalStorage Adapter (Terisolasi)</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: '16px' }}>
                  Sistem saat ini menggunakan LocalStorage Adapter berlabel DEMO. Seluruh perubahan CRUD tersimpan di peramban Anda dan dapat di-reset kapan saja ke data acuan default.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  iconLeft={RotateCcw}
                  onClick={() => {
                    storageAdapter.resetAllDemoData();
                    showToast('Seluruh data DEMO berhasil di-reset ke nilai awal default!', 'success');
                  }}
                >
                  Reset Semua Data ke Default DEMO
                </Button>
              </div>
            </CardBody>
          </Card>
        );
        break;
      default:
        content = <DashboardPage onNavigate={navigate} />;
    }

    return (
      <AdminLayout currentPath={currentPath} onNavigate={navigate} title={getAdminTitle()}>
        {content}
      </AdminLayout>
    );
  }

  // Public Layout Pages
  let publicContent = null;
  switch (currentPath) {
    case '#/recipes':
      publicContent = <RecipeSelectionPage onNavigate={navigate} />;
      break;
    case '#/admin/login':
      publicContent = <LoginPage onNavigate={navigate} />;
      break;
    case '#/history':
      publicContent = (
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
          <HistoryPage isAdminMode={false} onNavigate={navigate} />
        </div>
      );
      break;
    case '#/recommendation':
      publicContent = <RecommendationResultPage onNavigate={navigate} />;
      break;
    case '#/':
    default:
      publicContent = <LandingPage onNavigate={navigate} />;
      break;
  }

  return (
    <PublicLayout currentPath={currentPath} onNavigate={navigate}>
      {publicContent}
    </PublicLayout>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainAppContent />
    </ToastProvider>
  );
}
