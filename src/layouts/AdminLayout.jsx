import React, { useState } from 'react';
import {
  LayoutDashboard,
  Beef,
  UtensilsCrossed,
  Sliders,
  Calculator,
  History,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ArrowLeft,
  ChefHat,
  Menu,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';

export default function AdminLayout({ currentPath, onNavigate, onLogout, title = 'Admin Panel', children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '#/admin/dashboard', icon: LayoutDashboard },
    { id: 'cuts', label: 'Data Bagian Daging', path: '#/admin/cuts', icon: Beef },
    { id: 'recipes', label: 'Jenis Masakan', path: '#/admin/recipes', icon: UtensilsCrossed },
    { id: 'criteria', label: 'Kriteria & Bobot', path: '#/admin/criteria', icon: Sliders },
    { id: 'saw', label: 'Perhitungan SAW', path: '#/admin/saw', icon: Calculator },
    { id: 'history', label: 'Riwayat Perhitungan', path: '#/admin/history', icon: History },
    { id: 'reports', label: 'Laporan', path: '#/admin/reports', icon: FileText },
    { id: 'settings', label: 'Pengaturan', path: '#/admin/settings', icon: Settings },
  ];

  const handleMenuClick = (path) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <ChefHat size={18} />
            </div>
            {!collapsed && <span className="brand-title">BeefChoice Admin</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="btn-ghost"
              style={{ color: 'var(--color-text-muted)', padding: 6, borderRadius: 6, display: 'flex' }}
              title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            {mobileOpen && (
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-ghost"
                style={{ color: 'var(--color-text-muted)', padding: 6, borderRadius: 6, display: 'flex' }}
                title="Tutup Menu"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <li key={item.id}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.path);
                  }}
                  className={`sidebar-item-link ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('#/');
            }}
            className="sidebar-item-link"
            title="Kembali ke Beranda Publik"
          >
            <ArrowLeft size={18} style={{ flexShrink: 0 }} />
            <span>Mode Publik</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="topbar-mobile-toggle"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 className="topbar-title">{title}</h2>
            <span className="badge-demo">ADMIN DEMO</span>
          </div>

          <div className="topbar-right">
            <Button
              variant="ghost"
              size="sm"
              iconLeft={LogOut}
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  handleMenuClick('#/');
                }
              }}
            >
              Keluar
            </Button>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
