import React, { useState } from 'react';
import { ChefHat, Lock, User, Eye, EyeOff, LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Input, Badge } from '../../components/ui/Input';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function LoginPage({ onNavigate }) {
  const { showToast } = useToast();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username wajib diisi.');
      return;
    }
    if (!password) {
      setError('Kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = storageAdapter.login(username, password);
      setIsLoading(false);
      if (res.success) {
        showToast('Login berhasil! Selamat datang di Panel Admin.', 'success');
        onNavigate('#/admin/dashboard');
      } else {
        setError(res.message);
        showToast(res.message, 'error');
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--header-height) - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'var(--color-primary-red)',
              color: 'var(--color-white)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <ChefHat size={28} />
          </div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: '6px' }}>
            Login Administrator
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)' }}>
            Masuk untuk mengelola data alternatif daging, masakan, dan kriteria SAW.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-soft-red)',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid #F8D2D4',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={18} color="var(--color-primary-red)" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong>Kredensial Akun DEMO:</strong><br />
                  Username: <code style={{ color: 'var(--color-primary-red)' }}>admin</code> | Kata Sandi: <code style={{ color: 'var(--color-primary-red)' }}>admin123</code>
                </div>
              </div>

              {error && (
                <div
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-error-bg)',
                    borderRadius: 'var(--radius-input)',
                    color: 'var(--color-error)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 500,
                  }}
                >
                  {error}
                </div>
              )}

              <Input
                label="Username / Identitas Admin"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="password">
                  <span>Kata Sandi <span className="required">*</span></span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    required
                    className="form-input"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                    }}
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </CardBody>

            <CardFooter style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button
                type="submit"
                variant="primary"
                size="md"
                style={{ width: '100%' }}
                iconLeft={LogIn}
                isLoading={isLoading}
              >
                Masuk ke Panel Admin
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconLeft={ArrowLeft}
                onClick={() => onNavigate('#/')}
              >
                Kembali ke Beranda
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
