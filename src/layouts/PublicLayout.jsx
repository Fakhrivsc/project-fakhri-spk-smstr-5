import React, { useState } from 'react';
import { UtensilsCrossed, ShieldAlert, BookOpen, Clock, LogIn, ChefHat, LayoutDashboard, Menu, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { storageAdapter } from '../services/storageAdapter';

export default function PublicLayout({ currentPath, onNavigate, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const auth = storageAdapter.getAuth();

  const navItems = [
    { id: 'home', label: 'Beranda', path: '#/' },
    { id: 'recipes', label: 'Pilih Masakan', path: '#/recipes' },
    { id: 'recommendation', label: 'Rekomendasi', path: '#/recommendation' },
    { id: 'history', label: 'Riwayat', path: '#/history' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileNavOpen(false);
  };

  return (
    <div className="public-layout">
      {/* Top Navbar */}
      <header className="public-navbar">
        <div className="container public-navbar-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="public-mobile-menu-btn"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <a
              href="#/"
              onClick={(e) => { e.preventDefault(); handleNavClick('#/'); }}
              className="brand-logo"
            >
              <div className="brand-icon">
                <ChefHat size={20} />
              </div>
              <span>BeefChoice</span>
            </a>
            <span className="badge-demo">DEMO</span>
          </div>

          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                    className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {auth.isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                iconLeft={LayoutDashboard}
                onClick={() => handleNavClick('#/admin/dashboard')}
              >
                Panel Admin
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                iconLeft={LogIn}
                onClick={() => handleNavClick('#/admin/login')}
              >
                Login Admin
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="public-mobile-drawer">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
                className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              {auth.isAuthenticated ? (
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  iconLeft={LayoutDashboard}
                  onClick={() => handleNavClick('#/admin/dashboard')}
                >
                  Panel Admin
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  iconLeft={LogIn}
                  onClick={() => handleNavClick('#/admin/login')}
                >
                  Login Admin
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="public-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="container footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div className="brand-icon" style={{ width: 26, height: 26 }}>
                  <ChefHat size={16} />
                </div>
                <h4>BeefChoice</h4>
                <span className="badge-demo" style={{ transform: 'scale(0.85)' }}>DEMO</span>
              </div>
              <p>
                Sistem Pendukung Keputusan Pemilihan Bagian Daging Sapi yang Tepat untuk Pengolahan Masakan
                Menggunakan Metode Simple Additive Weighting (SAW).
              </p>
            </div>
            <div>
              <h5 style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-sm)', marginBottom: '12px' }}>
                Prinsip SAW
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                <li>• Kriteria Benefit & Cost terstandar</li>
                <li>• Normalisasi matriks keputusan presisi tinggi</li>
                <li>• Perangkingan transparan dan dapat ditelusuri</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} BeefChoice — SPK Daging Sapi SAW.</span>
            <span>Rekomendasi adalah hasil model penilaian matematis SAW (Label Data: DEMO).</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
