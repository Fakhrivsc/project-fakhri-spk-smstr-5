import React, { useState } from 'react';
import { Search, UtensilsCrossed, ArrowRight, Sparkles, ChefHat, Info } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import { Input, Badge } from '../../components/ui/Input';
import EmptyState from '../../components/feedback/EmptyState';
import { storageAdapter } from '../../services/storageAdapter';
import { useToast } from '../../components/feedback/ToastContext';

export default function RecipeSelectionPage({ onNavigate }) {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const recipes = storageAdapter.getRecipes();

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.cookingMethod.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectRecipe = (recipe) => {
    showToast(`Masakan "${recipe.name}" dipilih untuk analisis SAW.`, 'success');
    // Store selected recipe for recommendation engine in Phase E/F
    localStorage.setItem('beefchoice_selected_recipe', JSON.stringify(recipe));
    onNavigate('#/recommendation');
  };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-demo">KATALOG MASAKAN (DEMO)</span>
          <Badge variant="primary">Langkah 1: Pemilihan Masakan</Badge>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '8px' }}>Pilih Jenis Masakan</h1>
        <p style={{ maxWidth: '680px' }}>
          Pilih resep olahan masakan yang ingin Anda buat. Setiap masakan memiliki karakteristik proses pengolahan, suhu, dan bumbu yang menentukan kriteria bobot potongan daging terbaik.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: '480px', marginBottom: '32px' }}>
        <Input
          placeholder="Cari masakan (contoh: Rendang, Steak, Sop)..."
          name="recipe_search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Masakan Tidak Ditemukan"
          description={`Tidak ada masakan dengan kata kunci "${search}". Silakan coba kata kunci lain.`}
          actionLabel="Bersihkan Pencarian"
          onAction={() => setSearch('')}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map((recipe) => (
            <Card key={recipe.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: 'var(--color-soft-red)',
                        color: 'var(--color-primary-red)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <UtensilsCrossed size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>{recipe.name}</h3>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        Olahan Daging Sapi
                      </span>
                    </div>
                  </div>
                  <span className="badge-demo">DEMO</span>
                </div>

                <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {recipe.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'var(--color-page-gray)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Metode Masak: </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{recipe.cookingMethod}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Karakter Utama: </span>
                    <span style={{ color: 'var(--color-primary-red)', fontWeight: 500 }}>{recipe.recommendedCutHint}</span>
                  </div>
                </div>
              </CardBody>

              <CardFooter>
                <Button
                  variant="primary"
                  size="md"
                  style={{ width: '100%' }}
                  iconRight={ArrowRight}
                  onClick={() => handleSelectRecipe(recipe)}
                >
                  Hitung Rekomendasi SAW
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
