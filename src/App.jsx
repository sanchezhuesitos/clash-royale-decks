import React, { useState, useMemo } from 'react';
import { CARDS_API, META_DECKS } from './api/cardsData';
import CardItem from './components/CardItem';
import DeckBuilder from './components/DeckBuilder';
import { Search, Crown, Shield, Swords, Droplet, ArrowUpDown, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState("Todas");
  const [filterType, setFilterType] = useState("Todos");
  const [filterElixir, setFilterElixir] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddCard = (card) => {
    if (currentDeck.some(c => c.id === card.id)) {
      handleRemoveCard(card.id);
      return;
    }
    if (currentDeck.length < 8) {
      setCurrentDeck([...currentDeck, card]);
      if (currentDeck.length === 7) {
        triggerToast("¡Mazo completo! Listo para la arena 🏆");
      }
    } else {
      triggerToast("Tu mazo ya tiene 8 cartas. Quita una primero.");
    }
  };

  const handleRemoveCard = (cardId) => {
    setCurrentDeck(currentDeck.filter(c => c.id !== cardId));
  };

  const handleLoadMetaDeck = (meta) => {
    const selectedCards = meta.cardIds
      .map(id => CARDS_API.find(c => c.id === id))
      .filter(Boolean);
    setCurrentDeck(selectedCards);
    triggerToast(`Mazo "${meta.name}" cargado en el constructor ⚡`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomDeck = () => {
    const shuffled = [...CARDS_API].sort(() => 0.5 - Math.random());
    setCurrentDeck(shuffled.slice(0, 8));
    triggerToast("¡Mazo aleatorio generado! 🎲");
  };

  const handleCopyDeck = () => {
    if (currentDeck.length === 0) return;
    const avg = (currentDeck.reduce((a, b) => a + b.elixir, 0) / currentDeck.length).toFixed(1);
    const list = currentDeck.map(c => `• ${c.name} (${c.elixir}💧)`).join('\n');
    const text = `🏆 Mi Mazo de Clash Royale (${avg} Elixir):\n${list}`;
    navigator.clipboard.writeText(text);
    triggerToast("¡Mazo copiado al portapapeles! 📋");
  };

  const filteredCards = useMemo(() => {
    const filtered = CARDS_API.filter(card => {
      const matchesName = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === "Todas" || card.rarity === filterRarity;
      const matchesType = filterType === "Todos" || card.type === filterType;
      const matchesElixir =
        filterElixir === "Todos" ||
        (filterElixir === "6+" ? card.elixir >= 6 : card.elixir === Number(filterElixir));
      return matchesName && matchesRarity && matchesType && matchesElixir;
    });

    if (sortBy === "elixir-asc") {
      return [...filtered].sort((a, b) => a.elixir - b.elixir);
    }
    if (sortBy === "elixir-desc") {
      return [...filtered].sort((a, b) => b.elixir - a.elixir);
    }
    if (sortBy === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [searchTerm, filterRarity, filterType, filterElixir, sortBy]);

  const elixirOptions = ["Todos", "1", "2", "3", "4", "5", "6+"];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-[#050814] pb-20">
      {/* Notificación emergente (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-pop-in flex items-center gap-2.5 bg-slate-900/95 border-2 border-amber-400 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-amber-500/20">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Barra Superior */}
      <header className="border-b border-blue-800/40 bg-slate-950/85 backdrop-blur-lg sticky top-0 z-30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30 rotate-3 hover:rotate-0 transition-transform">
              <Crown className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="font-clash text-2xl sm:text-3xl text-white leading-none">
                ROYALE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">DECKS</span>
              </h1>
              <p className="text-xs text-cyan-300 font-semibold">Constructor Interactivo & Estrategia</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-cyan-200 px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-inner">
              <Swords className="w-3.5 h-3.5 text-amber-400" /> Arena Legendaria
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-10">
        {/* Constructor de Mazo */}
        <section>
          <DeckBuilder
            deck={currentDeck}
            onRemoveCard={handleRemoveCard}
            onClearDeck={() => {
              setCurrentDeck([]);
              triggerToast("Mazo vaciado");
            }}
            onRandomDeck={handleRandomDeck}
            onCopyDeck={handleCopyDeck}
          />
        </section>

        {/* Mazos Meta con Vista Previa Visual */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="font-clash text-2xl text-white">Mazos Meta Populares</h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Haz clic para equipar al instante</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {META_DECKS.map(meta => {
              const metaCards = meta.cardIds.map(id => CARDS_API.find(c => c.id === id)).filter(Boolean);
              const metaAvg = (metaCards.reduce((acc, c) => acc + c.elixir, 0) / metaCards.length).toFixed(1);

              return (
                <div
                  key={meta.id}
                  className="group relative bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-clash text-lg text-white group-hover:text-amber-300 transition-colors">
                        {meta.name}
                      </h3>
                      <span className={`shrink-0 text-[11px] font-bold bg-gradient-to-r ${meta.color} text-white px-2.5 py-0.5 rounded-full shadow`}>
                        {meta.archetype}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300/80 mb-3 leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Miniaturas de las 8 cartas del mazo meta */}
                    <div className="grid grid-cols-8 gap-1 bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 mb-4">
                      {metaCards.map(c => (
                        <img
                          key={c.id}
                          src={c.image}
                          alt={c.name}
                          title={`${c.name} (${c.elixir})`}
                          className="w-full aspect-square object-contain hover:scale-125 transition-transform"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-fuchsia-950/60 border border-fuchsia-500/30 text-fuchsia-300 font-clash text-xs">
                      <Droplet className="w-3.5 h-3.5 fill-fuchsia-400" /> {metaAvg}
                    </span>
                    <button
                      onClick={() => handleLoadMetaDeck(meta)}
                      className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Probar Mazo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Colección de Cartas con Filtros Avanzados */}
        <section className="bg-slate-900/70 border border-blue-900/40 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h2 className="font-clash text-2xl text-white">
                Colección de Cartas <span className="text-sm font-sans text-slate-400 font-normal">({filteredCards.length})</span>
              </h2>
            </div>

            {/* Buscador y Selectores */}
            <div className="flex flex-wrap gap-2.5">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar carta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48 bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Todas">Todas las rarezas</option>
                <option value="Común">🔵 Común</option>
                <option value="Especial">🟠 Especial</option>
                <option value="Épica">🟣 Épica</option>
                <option value="Legendaria">🌈 Legendaria</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Tropa">⚔️ Tropas</option>
                <option value="Hechizo">✨ Hechizos</option>
                <option value="Estructura">🏰 Estructuras</option>
              </select>

              <div className="relative flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="default">Orden original</option>
                  <option value="elixir-asc">Menor Elixir</option>
                  <option value="elixir-desc">Mayor Elixir</option>
                  <option value="name">Alfabético (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Barra interactiva de filtro por Coste de Elixir */}
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-800/80">
            <span className="text-xs font-bold text-fuchsia-300 flex items-center gap-1 mr-1">
              <Droplet className="w-4 h-4 fill-fuchsia-500 text-fuchsia-400" /> Filtrar Elixir:
            </span>
            {elixirOptions.map(cost => {
              const active = filterElixir === cost;
              return (
                <button
                  key={cost}
                  type="button"
                  onClick={() => setFilterElixir(cost)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-md shadow-fuchsia-600/40 scale-105'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-fuchsia-500/40'
                  }`}
                >
                  {cost === "Todos" ? "Todos" : `${cost} 💧`}
                </button>
              );
            })}
          </div>

          {/* Cuadrícula de Cartas */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
              {filteredCards.map(card => {
                const isSelected = currentDeck.some(c => c.id === card.id);
                return (
                  <CardItem
                    key={card.id}
                    card={card}
                    onClick={handleAddCard}
                    isSelected={isSelected}
                    disabled={currentDeck.length >= 8}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-slate-400 text-sm">No se encontraron cartas con esos filtros.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setFilterRarity("Todas");
                  setFilterType("Todos");
                  setFilterElixir("Todos");
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}