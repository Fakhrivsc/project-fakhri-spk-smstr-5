import React, { useState, useMemo } from 'react';
import {
  Award,
  UtensilsCrossed,
  ArrowRight,
  RotateCcw,
  Save,
  Printer,
  ChevronRight,
  Info,
  Layers,
  ChefHat,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Search,
  Sparkles
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Input';
import Table from '../../components/tables/Table';
import Modal from '../../components/feedback/Modal';
import { storageAdapter } from '../../services/storageAdapter';
import { calculateSAW, formatLocalDecimal } from '../../utils/sawEngine';
import { useToast } from '../../components/feedback/ToastContext';

export default function RecommendationResultPage({ onNavigate }) {
  const { showToast } = useToast();
  const recipes = storageAdapter.getRecipes();
  const cuts = storageAdapter.getBeefCuts();
  const criteria = storageAdapter.getCriteria();
  const matrix = storageAdapter.getDecisionMatrix();

  // Ambil masakan yang dipilih pengguna
  const [selectedRecipeId, setSelectedRecipeId] = useState(() => {
    try {
      const saved = localStorage.getItem('beefchoice_selected_recipe');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) return parsed.id;
      }
    } catch (e) {}
    return recipes[0]?.id || 'recipe-1';
  });

  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const currentRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  // Hitung SAW secara dinamis
  const sawResult = useMemo(() => {
    return calculateSAW(cuts, criteria, matrix);
  }, [cuts, criteria, matrix]);

  const handleSelectRecipeChange = (recipeId) => {
    setSelectedRecipeId(recipeId);
    const rec = recipes.find((r) => r.id === recipeId);
    if (rec) {
      localStorage.setItem('beefchoice_selected_recipe', JSON.stringify(rec));
      showToast(`Menganalisis rekomendasi potongan daging untuk "${rec.name}"...`, 'info');
    }
  };

  const handleSaveToHistory = () => {
    if (!sawResult.success || sawResult.rankings.length === 0) return;

    const topRank = sawResult.rankings[0];
    const newRecord = {
      recipeId: currentRecipe.id,
      recipeName: currentRecipe.name,
      cookingMethod: currentRecipe.cookingMethod,
      topCutName: topRank.alternative.name,
      topCutCode: topRank.alternative.code,
      sawScore: topRank.displayScore,
      criteriaCount: criteria.length,
      alternativeCount: cuts.length,
      snapshot: {
        recipe: {
          name: currentRecipe.name,
          cookingMethod: currentRecipe.cookingMethod,
          hint: currentRecipe.recommendedCutHint,
        },
        criteria: criteria.map((c) => ({
          code: c.code,
          name: c.name,
          attribute: c.attribute,
          weight: c.weight,
        })),
        rankings: sawResult.rankings.map((r) => ({
          rank: r.rank,
          code: r.alternative.code,
          name: r.alternative.name,
          score: r.displayScore,
          reason: r.reason,
        })),
      },
    };

    storageAdapter.addHistory(newRecord);
    showToast(`Hasil rekomendasi "${topRank.alternative.name}" berhasil disimpan ke Riwayat!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const topCut = sawResult.success && sawResult.rankings.length > 0 ? sawResult.rankings[0] : null;

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-size-sm)' }}>
          <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('#/'); }} style={{ color: 'var(--color-text-secondary)' }}>
            Beranda
          </a>
          <ChevronRight size={14} color="var(--color-text-muted)" />
          <a href="#/recipes" onClick={(e) => { e.preventDefault(); onNavigate('#/recipes'); }} style={{ color: 'var(--color-text-secondary)' }}>
            Pilih Masakan
          </a>
          <ChevronRight size={14} color="var(--color-text-muted)" />
          <strong style={{ color: 'var(--color-text-primary)' }}>Hasil Rekomendasi SAW</strong>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm" iconLeft={RotateCcw} onClick={() => onNavigate('#/recipes')}>
            Ganti Masakan
          </Button>
          <Button variant="secondary" size="sm" iconLeft={Printer} onClick={handlePrint}>
            Cetak Hasil
          </Button>
          <Button variant="primary" size="sm" iconLeft={Save} onClick={handleSaveToHistory}>
            Simpan ke Riwayat
          </Button>
        </div>
      </div>

      {/* Recipe Context Ribbon */}
      <div
        style={{
          padding: '18px 24px',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: 'var(--color-soft-red)',
              color: 'var(--color-primary-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UtensilsCrossed size={22} />
          </div>
          <div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Olahan Masakan yang Dianalisis:
            </span>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>
              {currentRecipe.name}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: 'var(--font-size-xs)' }}>
          <div>
            <span style={{ color: 'var(--color-text-secondary)' }}>Metode Pengolahan:</span><br />
            <strong>{currentRecipe.cookingMethod}</strong>
          </div>
          <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '20px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Karakter yang Dicari:</span><br />
            <strong style={{ color: 'var(--color-primary-red)' }}>{currentRecipe.recommendedCutHint}</strong>
          </div>
          <div style={{ minWidth: '180px' }}>
            <label style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '2px' }}>Ganti Olahan:</label>
            <select
              value={selectedRecipeId}
              onChange={(e) => handleSelectRecipeChange(e.target.value)}
              className="form-select"
              style={{ fontSize: 'var(--font-size-xs)', padding: '4px 8px' }}
            >
              {recipes.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Winner Hero Card */}
      {topCut && (
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: '2px solid var(--color-primary-red)',
            borderRadius: 'var(--radius-card)',
            padding: '32px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'var(--color-primary-red)',
              color: '#fff',
              padding: '6px 20px',
              borderBottomLeftRadius: 'var(--radius-card)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Award size={14} /> REKOMENDASI TERBAIK #1
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  backgroundColor: 'var(--color-soft-red)',
                  color: 'var(--color-primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(229, 72, 82, 0.2)',
                }}
              >
                <Award size={40} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Badge variant="primary">{topCut.alternative.code}</Badge>
                  <span className="badge-demo">METODE SAW</span>
                </div>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                  {topCut.alternative.name}
                </h1>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  Tekstur: <strong>{topCut.alternative.texture}</strong> | Lemak: <strong>{topCut.alternative.fatLevel}</strong>
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Nilai Preferensi Akhir ($V_1$)
              </span>
              <div
                style={{
                  fontSize: '44px',
                  fontWeight: 800,
                  color: 'var(--color-primary-red)',
                  fontFamily: 'monospace',
                  lineHeight: 1.1,
                  marginTop: '2px',
                }}
              >
                {topCut.displayScore}
              </div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', fontWeight: 500 }}>
                ✓ Skor Tertinggi dari {cuts.length} Alternatif
              </span>
            </div>
          </div>

          {/* Justifikasi Ilmiah Berbasis Kriteria */}
          <div
            style={{
              marginTop: '24px',
              backgroundColor: 'var(--color-page-gray)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              <Sparkles size={14} color="var(--color-primary-red)" />
              Alasan Rekomendasi Berbasis Kriteria SAW:
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
              {topCut.reason}
            </p>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', borderTop: '1px solid #E5E7EB', paddingTop: '8px', marginTop: '4px' }}>
              Karakteristik Fisik: {topCut.alternative.characteristics}
            </div>
          </div>
        </div>
      )}

      {/* Comparative Progress Bars Chart */}
      {sawResult.success && (
        <Card style={{ marginBottom: '32px' }}>
          <CardHeader
            title="Perbandingan Nilai Preferensi Seluruh Alternatif"
            subtitle="Visualisasi proporsional skor akhir V_i (Skala 0,0000 - 1,0000)"
            action={
              <Button variant="ghost" size="sm" iconLeft={Info} onClick={() => setIsMathModalOpen(true)}>
                Lihat Rincian Rumus SAW
              </Button>
            }
          />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sawResult.rankings.map((item) => {
              const percent = Math.min(100, Math.round(item.preferenceScore * 100));
              const isWinner = item.rank === 1;
              return (
                <div key={item.alternative.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, width: '24px', color: isWinner ? 'var(--color-primary-red)' : 'var(--color-text-muted)' }}>
                        #{item.rank}
                      </span>
                      <strong style={{ color: isWinner ? 'var(--color-primary-red)' : 'var(--color-text-primary)' }}>
                        {item.alternative.name}
                      </strong>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        ({item.alternative.code})
                      </span>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: isWinner ? 'var(--color-primary-red)' : 'var(--color-text-primary)' }}>
                      {item.displayScore}
                    </span>
                  </div>

                  <div style={{ height: '10px', backgroundColor: '#E5E7EB', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${percent}%`,
                        backgroundColor: isWinner ? 'var(--color-primary-red)' : '#9CA3AF',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      )}

      {/* Complete Rankings Table */}
      {sawResult.success && (
        <Card style={{ marginBottom: '32px' }}>
          <CardHeader
            title="Tabel Peringkat Lengkap Alternatif Daging Sapi"
            subtitle="Diurutkan berdasarkan nilai preferensi tertinggi dengan presisi internal penuh"
            action={<span className="badge-demo">METODE SAW</span>}
          />
          <CardBody style={{ padding: 0 }}>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>Peringkat</th>
                    <th style={{ width: '90px' }}>Kode</th>
                    <th>Nama Potongan Daging</th>
                    <th>Tekstur & Kadar Lemak</th>
                    <th style={{ textAlign: 'center', width: '150px' }}>Nilai Preferensi ($V$)</th>
                    <th>Rekomendasi Kegunaan</th>
                  </tr>
                </thead>
                <tbody>
                  {sawResult.rankings.map((item) => (
                    <tr
                      key={item.alternative.id}
                      style={{
                        backgroundColor: item.rank === 1 ? '#FFF8F8' : undefined,
                      }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        {item.rank === 1 ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-primary-red)',
                              color: '#fff',
                              fontWeight: 700,
                            }}
                          >
                            1
                          </span>
                        ) : (
                          <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                            #{item.rank}
                          </span>
                        )}
                      </td>
                      <td><Badge variant="primary">{item.alternative.code}</Badge></td>
                      <td>
                        <strong>{item.alternative.name}</strong>
                      </td>
                      <td>
                        <span style={{ fontSize: 'var(--font-size-xs)' }}>
                          {item.alternative.texture} | {item.alternative.fatLevel}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '15px', color: item.rank === 1 ? 'var(--color-primary-red)' : 'var(--color-text-primary)' }}>
                          {item.displayScore}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                          {item.alternative.bestUses}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Modal: Dasar Perhitungan Matematis SAW */}
      <Modal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        title="Dasar Perhitungan & Normalisasi Matematis SAW"
        maxWidth="680px"
        cancelLabel="Tutup"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
            Sistem menggunakan metode <strong>Simple Additive Weighting (SAW)</strong> dengan tahapan perhitungan matematis sebagai berikut:
          </p>

          <div style={{ backgroundColor: 'var(--color-page-gray)', padding: '14px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)', lineHeight: 1.6 }}>
            <strong>1. Normalisasi Matriks Keputusan:</strong><br />
            • Kriteria <em>Benefit</em>: $r_{'{ij}'} = x_{'{ij}'} / \max(x_j)$<br />
            • Kriteria <em>Cost</em>: $r_{'{ij}'} = \min(x_j) / x_{'{ij}'}$<br />
            <strong>2. Nilai Preferensi ($V_i$):</strong><br />
            • $V_i = \sum (w_j \times r_{'{ij}'})$, di mana total bobot $\sum w_j = 1,00$.
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', marginBottom: '8px' }}>Bobot Kriteria yang Digunakan:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {criteria.map((c) => (
                <div key={c.id} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)' }}>
                  <strong>{c.code}: {c.name.split('(')[0]}</strong><br />
                  <span>Sifat: {c.attribute} | Bobot: {(c.weight * 100).toFixed(0)}% ({c.weight.toFixed(2)})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
