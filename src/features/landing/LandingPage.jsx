import React from 'react';
import {
  ChefHat,
  ArrowRight,
  Calculator,
  Award,
  Layers,
  UtensilsCrossed,
  Beef,
  Flame,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Input';
import { storageAdapter } from '../../services/storageAdapter';

export default function LandingPage({ onNavigate }) {
  const recipes = storageAdapter.getRecipes();
  const beefCuts = storageAdapter.getBeefCuts();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          borderBottom: '1px solid var(--color-border)',
          paddingTop: '64px',
          paddingBottom: '64px',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge-demo">METODE SIMPLE ADDITIVE WEIGHTING (SAW)</span>
            <Badge variant="primary">Sistem Pendukung Keputusan</Badge>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 700,
              maxWidth: '840px',
              lineHeight: 1.2,
              marginBottom: '20px',
              color: 'var(--color-charcoal)',
            }}
          >
            Pilih Bagian Daging Sapi yang Tepat untuk Setiap Masakan Anda
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              maxWidth: '680px',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
            }}
          >
            Keputusan memasak yang tepat dimulai dari pemilihan potongan daging yang sesuai.
            Sistem kami menganalisis keempukan, kandungan lemak, daya serap bumbu, dan metode masak
            menggunakan algoritma matematis <span style={{ fontWeight: 600, color: 'var(--color-primary-red)' }}>SAW</span> yang terukur dan objektif.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              onClick={() => onNavigate('#/recipes')}
            >
              Mulai Rekomendasi Masakan
            </Button>
            <Button
              variant="secondary"
              size="lg"
              iconLeft={Calculator}
              onClick={() => onNavigate('#/admin/dashboard')}
            >
              Buka Panel Admin (DEMO)
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              marginTop: '48px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-page-gray)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--color-success)" />
              <span><strong>5 Potongan Utama</strong> Sapi Terdaftar</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--color-success)" />
              <span><strong>6 Jenis Olahan</strong> Kuliner Nusantara & Barat</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--color-success)" />
              <span><strong>Normalisasi Presisi</strong> Penuh Benefit & Cost</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Langkah Kerja SAW */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '12px' }}>
            Bagaimana Metode SAW Membantu Keputusan Anda?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Tiga tahapan sistematis untuk menghasilkan rekomendasi ilmiah tanpa bias dan dapat ditelusuri.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--color-soft-red)',
                  color: 'var(--color-primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '20px',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Pilih Jenis Masakan</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                Setiap masakan (seperti rendang, steak, sop) memerlukan profil daging yang berbeda terhadap waktu pemanasan, keempukan, dan lemak.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--color-soft-red)',
                  color: 'var(--color-primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '20px',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Normalisasi & Pembobotan</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                Matriks alternatif dinormalisasi berdasarkan kriteria <em>Benefit</em> (keempukan/kesesuaian) dan <em>Cost</em> (lemak/harga), lalu dikalikan bobot.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--color-soft-red)',
                  color: 'var(--color-primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '20px',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>Peringkat & Alasan Jelas</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                Hasil nilai preferensi (V<sub>i</sub>) diurutkan dari tertinggi ke terendah, disertai uraian alasan ilmiah mengapa potongan tersebut paling tepat.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Katalog 6 Masakan */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge-demo" style={{ marginBottom: '8px' }}>DATA DEMO</span>
            <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Pilihan Jenis Masakan</h2>
            <p>Pilih masakan untuk melihat rekomendasi bagian daging terbaik berdasarkan metode SAW.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => onNavigate('#/recipes')}>
            Lihat Semua Masakan
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {recipes.map((recipe) => (
            <Card key={recipe.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: 'var(--color-soft-red)',
                        color: 'var(--color-primary-red)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <UtensilsCrossed size={18} />
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{recipe.name}</h3>
                  </div>
                  <span className="badge-demo">DEMO</span>
                </div>

                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {recipe.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-page-gray)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Metode Masak: </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{recipe.cookingMethod}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Karakter Daging yang Dicari: </span>
                    <span style={{ color: 'var(--color-primary-red)' }}>{recipe.recommendedCutHint}</span>
                  </div>
                </div>
              </CardBody>

              <CardFooter>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ width: '100%' }}
                  iconRight={ArrowRight}
                  onClick={() => onNavigate('#/recipes')}
                >
                  Pilih & Analisis SAW
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Bagian Daging Sapi Terdaftar */}
      <section className="container">
        <div style={{ marginBottom: '28px' }}>
          <span className="badge-demo" style={{ marginBottom: '8px' }}>5 ALTERNATIF AWAL (PRD 4.2)</span>
          <h2 style={{ fontSize: 'var(--font-size-2xl)' }}>Alternatif Potongan Daging Sapi</h2>
          <p>Potongan daging yang terdaftar dan dinilai dalam matriks keputusan metode SAW.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {beefCuts.map((cut) => (
            <Card key={cut.id}>
              <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="primary">{cut.code}</Badge>
                  <span className="badge-demo">DEMO</span>
                </div>
                <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{cut.name}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '4px 0' }}>
                  <Badge variant="neutral">{cut.texture}</Badge>
                  <Badge variant="neutral">{cut.fatLevel}</Badge>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {cut.characteristics}
                </p>
                <div style={{ fontSize: 'var(--font-size-xs)', borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Cocok untuk: </span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{cut.bestUses}</strong>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
