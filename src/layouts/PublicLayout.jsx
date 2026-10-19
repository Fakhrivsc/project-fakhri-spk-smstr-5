import React from 'react';
import { UtensilsCrossed, ShieldAlert, BookOpen, Clock, LogIn, ChefHat } from 'lucide-react';
import Button from '../components/ui/Button';

export default function PublicLayout({ currentPath, onNavigate, children }) {
  const navItems = [
    { id: 'home', label: 'Beranda', path: '#/' },
    { id: 'recipes', label: 'Pilih Masakan', path: '#/recipes' },
    { id: 'recommendation', label: 'Rekomendasi', path: '#/recommendation' },
    { id: 'history', label: 'Riwayat', path: '#/history' },
  ];

  return (
    <div className="public-layout">
      {/* Top Navbar */}
      <header className="public-navbar">
        <div className="container public-navbar-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#/"
              onClick={(e) => { e.preventDefault(); onNavigate('#/'); }}
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
                      onNavigate(item.path);
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
            <Button
              variant="secondary"
              size="sm"
              iconLeft={LogIn}
              onClick={() => onNavigate('#/admin/login')}
            >
              Login Admin
            </Button>
          </div>
        </div>
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
