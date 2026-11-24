import React, { useState, useMemo } from 'react';
import { CARDS_API, META_DECKS } from './api/cardsData';
import CardItem from './components/CardItem';
import DeckBuilder from './components/DeckBuilder';
import { Search, Crown, Shield, Swords } from 'lucide-react';

export default function App() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState("Todas");
  const [filterType, setFilterType] = useState("Todos");

  const handleAddCard = (card) => {
    if (currentDeck.some(c => c.id === card.id)) {
      handleRemoveCard(card.id);
      return;
    }
    if (currentDeck.length < 8) {
      setCurrentDeck([...currentDeck, card]);
    }
  };

  const handleRemoveCard = (cardId) => {
    setCurrentDeck(currentDeck.filter(c => c.id !== cardId));
  };

  const handleLoadMetaDeck = (cardIds) => {
    const selectedCards = cardIds
      .map(id => CARDS_API.find(c => c.id === id))
      .filter(Boolean);
    setCurrentDeck(selectedCards);
  };

  const handleRandomDeck = () => {
    const shuffled = [...CARDS_API].sort(() => 0.5 - Math.random());
    setCurrentDeck(shuffled.slice(0, 8));
  };

  const filteredCards = useMemo(() => {
    return CARDS_API.filter(card => {
      const matchesName = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === "Todas" || card.rarity === filterRarity;
      const matchesType = filterType === "Todos" || card.type === filterType;
      return matchesName && matchesRarity && matchesType;
    });
  }, [searchTerm, filterRarity, filterType]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950 pb-16">
      <header className="border-b border-blue-900/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="font-clash text-2xl sm:text-3xl text-white leading-none">
                ROYALE <span className="text-amber-400">DECKS</span>
              </h1>
              <p className="text-xs text-blue-300 font-medium">Constructor & Estrategia</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-blue-950 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800">
            <Swords className="w-3.5 h-3.5" /> Arena Legendaria
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-10">
        <section>
          <DeckBuilder 
            deck={currentDeck} 
            onRemoveCard={handleRemoveCard}
            onClearDeck={() => setCurrentDeck([])}
            onRandomDeck={handleRandomDeck}
          />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="font-clash text-xl text-white">Mazos Meta Populares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {META_DECKS.map(meta => (
              <div key={meta.id} className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-clash text-lg text-amber-400">{meta.name}</h3>
                    <span className="text-[11px] font-bold bg-blue-950 text-blue-300 px-2 py-0.5 rounded-md">
                      {meta.archetype}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{meta.description}</p>
                </div>
                <button
                  onClick={() => handleLoadMetaDeck(meta.cardIds)}
                  className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs rounded-xl transition-colors"
                >
                  Probar en el Constructor
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="font-clash text-2xl text-white">Colección de Cartas</h2>

            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar carta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48 bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="Todas">Todas las rarezas</option>
                <option value="Común">Común</option>
                <option value="Especial">Especial</option>
                <option value="Épica">Épica</option>
                <option value="Legendaria">Legendaria</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Tropa">Tropas</option>
                <option value="Hechizo">Hechizos</option>
                <option value="Estructura">Estructuras</option>
              </select>
            </div>
          </div>

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
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
            <div className="text-center py-12 text-slate-500">
              No se encontraron cartas con esos filtros.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}