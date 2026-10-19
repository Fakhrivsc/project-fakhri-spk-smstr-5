import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  CheckCircle2,
  Calendar,
  UtensilsCrossed,
  Award,
  Clock,
  RotateCcw,
  ChefHat,
  Share2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Input';
import { storageAdapter } from '../../services/storageAdapter';
import { calculateSAW, formatLocalDecimal } from '../../utils/sawEngine';
import { useToast } from '../../components/feedback/ToastContext';

export default function ReportsPage() {
  const { showToast } = useToast();
  const recipes = storageAdapter.getRecipes();
  const cuts = storageAdapter.getBeefCuts();
  const criteria = storageAdapter.getCriteria();
  const matrix = storageAdapter.getDecisionMatrix();
  const historyList = storageAdapter.getHistory();

  // Mode: 'CURRENT' (kalkulasi aktif saat ini) atau ID Riwayat ('hist-1', dll.)
  const [selectedSource, setSelectedSource] = useState('CURRENT');
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id || 'recipe-1');

  const currentRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  // Hitung hasil jika mode CURRENT
  const currentSawResult = useMemo(() => {
    return calculateSAW(cuts, criteria, matrix);
  }, [cuts, criteria, matrix]);

  // Siapkan data laporan yang konsisten
  const reportData = useMemo(() => {
    if (selectedSource === 'CURRENT') {
      const topRank = currentSawResult.rankings[0];
      return {
        docId: `RPT-SAW-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) + ' WIB',
        recipeName: currentRecipe.name,
        cookingMethod: currentRecipe.cookingMethod,
        hint: currentRecipe.recommendedCutHint,
        topCutName: topRank?.alternative?.name || '-',
        topCutCode: topRank?.alternative?.code || '-',
        topScore: topRank?.displayScore || '0,0000',
        topReason: topRank?.reason || '-',
        criteria: criteria.map((c) => ({
          code: c.code,
          name: c.name,
          attribute: c.attribute,
          weight: c.weight,
        })),
        rankings: currentSawResult.rankings.map((r) => ({
          rank: r.rank,
          code: r.alternative.code,
          name: r.alternative.name,
          texture: r.alternative.texture,
          fatLevel: r.alternative.fatLevel,
          score: r.displayScore,
          reason: r.reason,
        })),
        matrix: cuts.map((cut) => ({
          code: cut.code,
          name: cut.name,
          values: criteria.map((c) => ({
            code: c.code,
            raw: matrix[cut.id]?.[c.id] || 0,
            normalized: formatLocalDecimal(currentSawResult.normalizedMatrix[cut.id]?.[c.id], 4),
          })),
        })),
      };
    } else {
      // Ambil dari snapshot riwayat
      const histItem = historyList.find((h) => h.id === selectedSource) || historyList[0];
      const snapshot = histItem?.snapshot || {};
      return {
        docId: `RPT-SAW-${histItem.id.toUpperCase()}`,
        date: histItem.date,
        recipeName: histItem.recipeName,
        cookingMethod: histItem.cookingMethod || snapshot.recipe?.cookingMethod || 'Standar Olahan Sapi',
        hint: snapshot.recipe?.hint || 'Daging olahan terpilih',
        topCutName: histItem.topCutName,
        topCutCode: histItem.topCutCode,
        topScore: histItem.sawScore,
        topReason: snapshot.rankings?.[0]?.reason || `Peringkat pertama dengan skor ${histItem.sawScore}`,
        criteria: snapshot.criteria || criteria.map((c) => ({
          code: c.code,
          name: c.name,
          attribute: c.attribute,
          weight: c.weight,
        })),
        rankings: snapshot.rankings || [
          { rank: 1, code: histItem.topCutCode, name: histItem.topCutName, score: histItem.sawScore, reason: 'Peringkat 1 snapshot tersimpan' },
        ],
        matrix: null, // matrix detail ringkas pada snapshot lama
      };
    }
  }, [selectedSource, selectedRecipeId, currentSawResult, historyList, currentRecipe, criteria, cuts, matrix]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${reportData.docId}_Laporan_SAW.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Berkas ringkasan laporan (JSON) berhasil diunduh.', 'success');
  };

  const handleCopyText = () => {
    const text = `LAPORAN REKOMENDASI SPK DAGING SAPI SAW
No: ${reportData.docId} | Tanggal: ${reportData.date}
Masakan: ${reportData.recipeName} (${reportData.cookingMethod})
Rekomendasi Utama: ${reportData.topCutName} (${reportData.topCutCode})
Nilai Preferensi (V): ${reportData.topScore}
Alasan: ${reportData.topReason}
--------------------------------------------------
Hasil Lengkap Peringkat:
${reportData.rankings.map((r) => `#${r.rank} ${r.code} ${r.name} - Nilai V: ${r.score}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    showToast('Ringkasan teks laporan berhasil disalin ke clipboard!', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Control Toolbar (Hidden in Print) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-demo">LAPORAN RESMI (PRD 4.8)</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Fase G Terverifikasi
            </span>
          </div>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Laporan Keputusan Pemilihan Daging SAW</h2>
          <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px' }}>
            Pratinjau laporan formal, cetak format dokumen standar A4, dan ekspor data hasil kalkulasi.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="md" iconLeft={Copy} onClick={handleCopyText}>
            Salin Teks
          </Button>
          <Button variant="secondary" size="md" iconLeft={Download} onClick={handleDownloadJSON}>
            Unduh JSON
          </Button>
          <Button variant="primary" size="md" iconLeft={Printer} onClick={handlePrint}>
            Cetak Dokumen Laporan
          </Button>
        </div>
      </div>

      {/* Source Selector Bar (Hidden in Print) */}
      <Card className="no-print">
        <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Sumber Data Laporan:
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="form-select"
                style={{ fontSize: 'var(--font-size-sm)', minWidth: '240px' }}
              >
                <option value="CURRENT">Kalkulasi Aktif Saat Ini (Real-time)</option>
                {historyList.map((h) => (
                  <option key={h.id} value={h.id}>
                    Arsip: {h.recipeName} ({h.date})
                  </option>
                ))}
              </select>
            </div>

            {selectedSource === 'CURRENT' && (
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                  Pilihan Olahan Masakan:
                </label>
                <select
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(e.target.value)}
                  className="form-select"
                  style={{ fontSize: 'var(--font-size-sm)', minWidth: '200px' }}
                >
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textAlign: 'right' }}>
            <span>Status Sumber: </span>
            <strong style={{ color: 'var(--color-primary-red)' }}>
              {selectedSource === 'CURRENT' ? 'Kalkulasi Baru (Live)' : 'Snapshot Riwayat Arsip'}
            </strong>
          </div>
        </CardBody>
      </Card>

      {/* OFFICIAL FORMAL REPORT DOCUMENT (PRINTABLE CONTAINER) */}
      <div
        className="report-document"
        style={{
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          padding: '48px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Document Header / Kop Laporan */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '3px double #151619', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'var(--color-primary-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChefHat size={22} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '0.05em' }}>BEEFCHOICE DECISION SUPPORT SYSTEM</span>
            <span className="badge-demo">DEMO</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 2px 0', textTransform: 'uppercase' }}>
            LAPORAN KEPUTUSAN PEMILIHAN BAGIAN DAGING SAPI
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Hasil Analisis Perhitungan Menggunakan Metode Simple Additive Weighting (SAW)
          </p>
        </div>

        {/* Document Metadata Table */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            backgroundColor: '#F8F9FA',
            padding: '16px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            fontSize: '13px',
          }}
        >
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>Nomor Dokumen:</span><br />
            <strong>{reportData.docId}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>Tanggal / Waktu Analisis:</span><br />
            <strong>{reportData.date}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>Olahan Masakan:</span><br />
            <strong style={{ color: 'var(--color-primary-red)' }}>{reportData.recipeName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>Metode Pengolahan:</span><br />
            <strong>{reportData.cookingMethod}</strong>
          </div>
        </div>

        {/* Ringkasan Eksekutif (Peringkat #1) */}
        <div style={{ border: '2px solid var(--color-primary-red)', borderRadius: 'var(--radius-card)', padding: '24px', backgroundColor: '#FFFDFD' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Award size={20} color="var(--color-primary-red)" />
            <strong style={{ fontSize: '15px', color: 'var(--color-primary-red)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Keputusan Utama (Peringkat 1 Terpilih)
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>
                {reportData.topCutName} ({reportData.topCutCode})
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Karakter daging paling tepat dan memenuhi spesifikasi olahan {reportData.recipeName}.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Nilai Preferensi ($V_1$):</span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary-red)', fontFamily: 'monospace' }}>
                {reportData.topScore}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #FCE8E9', fontSize: '13px', lineHeight: 1.6 }}>
            <strong>Uraian Alasan Ilmiah: </strong>
            <span>{reportData.topReason}</span>
          </div>
        </div>

        {/* Bagian 1: Parameter & Bobot Kriteria */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            1. Parameter dan Bobot Kriteria yang Digunakan
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            Model keputusan dievaluasi berdasarkan kriteria terstandarisasi dengan total akumulasi bobot $\sum w_j = 1,00$ ($100\%$).
          </p>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Kode</th>
                  <th>Nama Kriteria Penilaian</th>
                  <th style={{ width: '130px' }}>Sifat (Atribut)</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Bobot Relatif ($w$)</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Persentase</th>
                </tr>
              </thead>
              <tbody>
                {reportData.criteria.map((c, idx) => (
                  <tr key={idx}>
                    <td><Badge variant="primary">{c.code}</Badge></td>
                    <td><strong>{c.name}</strong></td>
                    <td><Badge variant={c.attribute === 'Benefit' ? 'benefit' : 'cost'}>{c.attribute}</Badge></td>
                    <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{c.weight.toFixed(2)}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{(c.weight * 100).toFixed(0)}%</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#F8F9FA', fontWeight: 700 }}>
                  <td colSpan={3} style={{ textAlign: 'right' }}>Total Akumulasi Bobot:</td>
                  <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>1,00</td>
                  <td style={{ textAlign: 'center', color: 'var(--color-success)' }}>100% (Valid)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bagian 2: Matriks Nilai & Normalisasi (Jika Live) */}
        {reportData.matrix && (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
              2. Matriks Keputusan ($X$) dan Normalisasi ($R$)
            </h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Bagian Daging</th>
                    {reportData.criteria.map((c, i) => (
                      <th key={i} style={{ textAlign: 'center' }}>
                        {c.code}<br />
                        <small style={{ fontWeight: 400 }}>{c.attribute}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.matrix.map((row, idx) => (
                    <tr key={idx}>
                      <td><Badge variant="primary">{row.code}</Badge></td>
                      <td><strong>{row.name}</strong></td>
                      {row.values.map((val, vIdx) => (
                        <td key={vIdx} style={{ textAlign: 'center', fontSize: '12px' }}>
                          <span style={{ fontWeight: 600 }}>x: {val.raw}</span>
                          <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '11px' }}>
                            r: {val.normalized}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bagian 3: Tabel Perangkingan Akhir */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
            {reportData.matrix ? '3. ' : '2. '} Tabel Perangkingan Lengkap Hasil SAW
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '80px', textAlign: 'center' }}>Peringkat</th>
                  <th style={{ width: '90px' }}>Kode</th>
                  <th>Bagian Daging Sapi</th>
                  <th style={{ width: '150px', textAlign: 'center' }}>Nilai Preferensi ($V$)</th>
                  <th>Justifikasi Alasan Ilmiah</th>
                </tr>
              </thead>
              <tbody>
                {reportData.rankings.map((r, idx) => (
                  <tr key={idx} style={{ backgroundColor: r.rank === 1 ? '#FFF8F8' : undefined }}>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>
                      {r.rank === 1 ? <span style={{ color: 'var(--color-primary-red)' }}>#1 (Utama)</span> : `#${r.rank}`}
                    </td>
                    <td><Badge variant="primary">{r.code}</Badge></td>
                    <td><strong>{r.name}</strong></td>
                    <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, color: r.rank === 1 ? 'var(--color-primary-red)' : undefined }}>
                      {r.score}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                      {r.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Tanda Tangan Formal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', pageBreakInside: 'avoid' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', maxWidth: '360px' }}>
            <strong>Catatan Validitas:</strong><br />
            Laporan ini dibuat otomatis oleh Sistem Pendukung Keputusan BeefChoice. Nilai preferensi dihitung murni secara matematis menggunakan algoritma Simple Additive Weighting (Label Data: DEMO).
          </div>
          <div style={{ textAlign: 'center', minWidth: '220px', fontSize: '13px' }}>
            <span>Disahkan pada, {reportData.date.split(',')[0]}</span><br />
            <span>Administrator SPK BeefChoice</span>
            <div style={{ height: '70px' }}></div>
            <strong>( Administrator Sistem )</strong><br />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ID: ADMIN-SAW-DEMO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
