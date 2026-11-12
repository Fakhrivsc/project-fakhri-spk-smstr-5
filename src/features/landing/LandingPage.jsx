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
  CheckCircle2,
  BarChart3,
  Sliders,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Input';
import SafeImage from '../../components/ui/SafeImage';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';
import {
  HERO_IMAGE,
  RECIPE_IMAGES,
  BEEF_CUT_IMAGES,
  SAW_CRITERIA_INFO,
  SYSTEM_WORKFLOW_STEPS,
  SYSTEM_ADVANTAGES
} from './landingData';
import './landing.css';

export default function LandingPage({ onNavigate }) {
  const { showToast } = useToast();
  const recipes = storageAdapter.getRecipes();
  const beefCuts = storageAdapter.getBeefCuts();

  const handleSelectRecipe = (recipe) => {
    localStorage.setItem('beefchoice_selected_recipe', JSON.stringify(recipe));
    showToast(`Masakan "${recipe.name}" dipilih untuk analisis SAW.`, 'success');
    onNavigate('#/recommendation');
  };

  const scrollToWorkflow = () => {
    const el = document.getElementById('cara-kerja');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ====================================================================
          1. HERO SECTION (REDESIGN)
          ==================================================================== */}
      <section className="hero-redesign">
        {/* Background Photo & Dark Gradient Overlay */}
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="hero-overlay" />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-grid">
            {/* Kolom Kiri: Teks & Aksi */}
            <div className="hero-content">
              <div className="hero-pill-badge">
                <Sparkles size={14} color="#FFA4A9" />
                <span>Sistem Pendukung Keputusan Metode SAW</span>
              </div>

              <h1 className="hero-title">
                Temukan Potongan Daging Terbaik untuk{' '}
                <span className="highlight-red">Setiap Masakan</span>
              </h1>

              <p className="hero-desc">
                BeefChoice membantu Anda menentukan bagian daging sapi yang paling sesuai dengan jenis masakan menggunakan metode perhitungan Simple Additive Weighting (SAW).
              </p>

              <div className="hero-actions">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  onClick={() => onNavigate('#/recipes')}
                  style={{ boxShadow: '0 4px 16px rgba(229, 72, 82, 0.4)' }}
                >
                  Mulai Rekomendasi
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  iconLeft={Info}
                  onClick={scrollToWorkflow}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Pelajari Cara Kerja
                </Button>
              </div>

              {/* Trust Indicators Bar */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <CheckCircle2 size={16} color="var(--color-primary-red)" />
                  <span>5 Potongan Daging Terdaftar</span>
                </div>
                <div className="trust-item">
                  <CheckCircle2 size={16} color="var(--color-primary-red)" />
                  <span>6 Varian Masakan Nusantara & Western</span>
                </div>
                <div className="trust-item">
                  <CheckCircle2 size={16} color="var(--color-primary-red)" />
                  <span>Normalisasi Presisi Benefit & Cost</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Interactive Live Showcase Card */}
            <div className="hero-showcase-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--color-primary-red)" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Simulasi Rekomendasi SAW
                  </span>
                </div>
                <span className="badge-demo">CONTOH NYATA</span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid rgba(229, 72, 82, 0.4)',
                  }}
                >
                  <SafeImage
                    src={RECIPE_IMAGES['recipe-1']}
                    alt="Rendang Daging"
                    aspectRatio="1/1"
                    fallbackTitle="Rendang"
                  />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Olahan Masakan:</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Rendang Daging Sapi</h4>
                  <span style={{ fontSize: '12px', color: '#FFA4A9' }}>Metode: Slow Cooking (3-5 jam)</span>
                </div>
              </div>

              {/* Box Pemenang */}
              <div
                style={{
                  backgroundColor: 'rgba(229, 72, 82, 0.1)',
                  border: '1px solid rgba(229, 72, 82, 0.35)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-red)', backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>
                      RANK 1
                    </span>
                    <span style={{ fontSize: '12px', color: '#D1D5DB' }}>Potongan Terbaik:</span>
                  </div>
                  <strong style={{ fontSize: '15px', color: '#FFFFFF' }}>Paha Belakang (Round) - A5</strong>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Daging padat berserat kokoh, tahan ungkep lama.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Nilai Preferensi (V)</span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFA4A9', fontFamily: 'monospace' }}>
                    0,7800
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                iconRight={ArrowRight}
                onClick={() => {
                  const rendang = recipes.find((r) => r.id === 'recipe-1') || recipes[0];
                  handleSelectRecipe(rendang);
                }}
              >
                Analisis Rendang dengan SAW Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SECTION PENGENALAN BEEFCHOICE & 4 KRITERIA SAW
          ==================================================================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header-centered">
            <span className="section-tag">
              <Scale size={14} /> METODE PENGAMBILAN KEPUTUSAN
            </span>
            <h2 className="section-heading">
              Keputusan Memasak yang Tepat Dimulai dari Karakteristik Daging
            </h2>
            <p className="section-subheading">
              Memasak bukan sekadar resep bumbu. Setiap bagian karkas sapi memiliki jaringan serat, lemak, dan kolagen berbeda yang menentukan kelezatan masakan. BeefChoice menilai 4 kriteria utama secara matematis:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {SAW_CRITERIA_INFO.map((crit) => (
              <div key={crit.code} className="criteria-card-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant={crit.attribute === 'Benefit' ? 'success' : 'warning'}>
                    {crit.attribute}
                  </Badge>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary-red)', fontFamily: 'monospace' }}>
                    {crit.code}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {crit.name}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Fokus: {crit.tag}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {crit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. SECTION PILIHAN JENIS MASAKAN (6 MASAKAN DENGAN GAMBAR)
          ==================================================================== */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-page-gray)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-tag" style={{ marginBottom: '8px' }}>
                <UtensilsCrossed size={14} /> KATALOG OLAHAN SAPI
              </span>
              <h2 className="section-heading">Pilihan Jenis Masakan</h2>
              <p className="section-subheading" style={{ marginTop: '4px' }}>
                Pilih masakan untuk melihat rekomendasi potongan daging terbaik melalui simulasi metode SAW.
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              iconRight={ArrowRight}
              onClick={() => onNavigate('#/recipes')}
            >
              Lihat Katalog Lengkap
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="card-hover-lift"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Foto Masakan dengan SafeImage */}
                <SafeImage
                  src={RECIPE_IMAGES[recipe.id]}
                  alt={recipe.name}
                  aspectRatio="16/10"
                  category="recipe"
                  fallbackTitle={recipe.name}
                  badge={<span className="badge-demo">DEMO</span>}
                />

                {/* Konten Card */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-charcoal)' }}>
                      {recipe.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {recipe.description}
                    </p>

                    {/* Metadata Box */}
                    <div
                      style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid var(--color-border)',
                        borderRadius: '10px',
                        padding: '12px',
                        fontSize: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="var(--color-text-muted)" />
                        <span style={{ color: 'var(--color-text-secondary)' }}>Metode:</span>
                        <strong style={{ color: 'var(--color-text-primary)' }}>{recipe.cookingMethod}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Sparkles size={14} color="var(--color-primary-red)" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ color: 'var(--color-text-secondary)' }}>Karakter Daging:</span>
                        <span style={{ color: 'var(--color-primary-red)', fontWeight: 600 }}>{recipe.recommendedCutHint}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    iconRight={ArrowRight}
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    Pilih & Analisis SAW
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SECTION CARA KERJA SISTEM (4 LANGKAH SEDERHANA)
          ==================================================================== */}
      <section id="cara-kerja" style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header-centered">
            <span className="section-tag">
              <Layers size={14} /> ALUR KERJA SISTEM
            </span>
            <h2 className="section-heading">Bagaimana BeefChoice Menghitung Rekomendasi?</h2>
            <p className="section-subheading">
              Empat langkah transparan dan sistematis dari penentuan resep hingga keluarnya ranking potongan daging terbaik.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {SYSTEM_WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className="workflow-step-card">
                <span className="step-number-watermark">{step.step}</span>

                <div className="step-icon-box">
                  {step.icon === 'UtensilsCrossed' && <UtensilsCrossed size={24} />}
                  {step.icon === 'Sliders' && <Sliders size={24} />}
                  {step.icon === 'Calculator' && <Calculator size={24} />}
                  {step.icon === 'Award' && <Award size={24} />}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SECTION 5 ALTERNATIF POTONGAN DAGING SAPI (DENGAN FOTO)
          ==================================================================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#F8F9FA', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-tag" style={{ marginBottom: '8px' }}>
                <Beef size={14} /> 5 ALTERNATIF RESMI
              </span>
              <h2 className="section-heading">Potongan Daging Sapi Pilihan</h2>
              <p className="section-subheading" style={{ marginTop: '4px' }}>
                Daftar alternatif karkas sapi yang dinilai dalam matriks keputusan metode SAW.
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              iconRight={Calculator}
              onClick={() => onNavigate('#/admin/saw')}
            >
              Lihat Matriks Keputusan SAW
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {beefCuts.map((cut) => (
              <div
                key={cut.id}
                className="card-hover-lift"
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Foto Potongan Daging */}
                <SafeImage
                  src={BEEF_CUT_IMAGES[cut.id]}
                  alt={cut.name}
                  aspectRatio="4/3"
                  category="cut"
                  fallbackTitle={cut.name}
                  badge={
                    <span
                      style={{
                        backgroundColor: 'var(--color-primary-red)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {cut.code}
                    </span>
                  }
                />

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                      {cut.name}
                    </h3>

                    {/* Pill Badges Tekstur & Lemak */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      <Badge variant="neutral">{cut.texture}</Badge>
                      <Badge variant="neutral">{cut.fatLevel}</Badge>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {cut.characteristics}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '10px',
                      fontSize: '12px',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-muted)' }}>Cocok untuk: </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{cut.bestUses}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SECTION KEUNGGULAN APLIKASI
          ==================================================================== */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header-centered">
            <span className="section-tag">
              <ShieldCheck size={14} /> KEUNGGULAN APLIKASI
            </span>
            <h2 className="section-heading">Mengapa Menggunakan BeefChoice?</h2>
            <p className="section-subheading">
              Sistem pendukung keputusan yang dibangun dengan standar akademik terpercaya untuk menghindarkan Anda dari kesalahan memilih daging.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {SYSTEM_ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-soft-red)',
                    color: 'var(--color-primary-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {adv.icon === 'CheckCircle2' && <CheckCircle2 size={22} />}
                  {adv.icon === 'Sparkles' && <Sparkles size={22} />}
                  {adv.icon === 'BarChart3' && <BarChart3 size={22} />}
                  {adv.icon === 'ShieldCheck' && <ShieldCheck size={22} />}
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {adv.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CALL TO ACTION SECTION (CTA BANNER)
          ==================================================================== */}
      <section style={{ padding: '64px 0 80px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="cta-banner-wrapper">
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <span className="hero-pill-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
                SPK Daging Sapi Terpercaya
              </span>

              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
                Siap Menemukan Potongan Daging yang Tepat?
              </h2>

              <p style={{ fontSize: '16px', color: '#D1D5DB', lineHeight: 1.6 }}>
                Pilih masakan favorit Anda sekarang dan biarkan algoritma SAW memberikan rekomendasi bagian daging terbaik secara akurat dan objektif.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  onClick={() => onNavigate('#/recipes')}
                  style={{ boxShadow: '0 4px 20px rgba(229, 72, 82, 0.5)' }}
                >
                  Mulai Rekomendasi Sekarang
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  iconLeft={Calculator}
                  onClick={() => {
                    const auth = storageAdapter.getAuth();
                    onNavigate(auth.isAuthenticated ? '#/admin/dashboard' : '#/admin/login');
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Buka Panel Admin (DEMO)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
