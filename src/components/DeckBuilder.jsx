import React from 'react';
import { Trash2, Copy, Check, Droplet, Sparkles } from 'lucide-react';

export default function DeckBuilder({ deck, onRemoveCard, onClearDeck, onRandomDeck }) {
  const [copied, setCopied] = React.useState(false);

  const averageElixir = deck.length > 0
    ? (deck.reduce((sum, card) => sum + card.elixir, 0) / deck.length).toFixed(1)
    : "0.0";

  const handleCopyDeck = () => {
    const deckText = `👑 Mi Mazo de Clash Royale (${averageElixir} Elixir):\n` + 
      deck.map(c => `- ${c.name} (${c.elixir})`).join('\n');
    navigator.clipboard.writeText(deckText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slots = Array.from({ length: 8 }, (_, index) => deck[index] || null);

  return (
    <div className="bg-slate-900/90 border-2 border-blue-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <h2 className="font-clash text-2xl text-amber-400 flex items-center gap-2">
            Mazo de Batalla ({deck.length}/8)
          </h2>
          <p className="text-xs text-slate-400">Haz clic en una carta del mazo para quitarla</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-fuchsia-500/40">
          <Droplet className="w-5 h-5 text-fuchsia-500 fill-fuchsia-500" />
          <div>
            <span className="text-xs text-slate-400 block leading-none">Coste Medio</span>
            <span className="font-clash text-xl text-fuchsia-400">{averageElixir}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
        {slots.map((card, idx) => (
          <div 
            key={idx}
            className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-center relative overflow-hidden"
          >
            {card ? (
              <button
                onClick={() => onRemoveCard(card.id)}
                title="Quitar carta"
                className="w-full h-full flex flex-col items-center justify-center p-1 bg-slate-800/90 hover:bg-red-950/80 transition-colors group"
              >
                <span className="absolute top-1 left-1 w-5 h-5 bg-fuchsia-600 rounded-full text-xs font-clash flex items-center justify-center">
                  {card.elixir}
                </span>
                <img src={card.image} alt={card.name} className="w-16 h-20 object-contain group-hover:scale-90 transition-transform" />
                <span className="text-[10px] font-bold text-center truncate w-full px-1">{card.name}</span>
              </button>
            ) : (
              <span className="text-slate-700 font-clash text-xl">{idx + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={onRandomDeck}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-blue-600/20"
          >
            <Sparkles className="w-4 h-4" /> Aleatorio
          </button>
          <button
            onClick={onClearDeck}
            disabled={deck.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-red-600/80 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Vaciar
          </button>
        </div>

        <button
          onClick={handleCopyDeck}
          disabled={deck.length < 8}
          className="flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "¡Mazo Copiado!" : "Copiar Mazo"}
        </button>
      </div>
    </div>
  );
}