import React from 'react';
import { Trash2, Shuffle, Droplet, Copy, Sparkles, X, Layers } from 'lucide-react';

export default function DeckBuilder({ deck, onRemoveCard, onClearDeck, onRandomDeck, onCopyDeck }) {
  // Cálculo de Elixir Medio
  const avgElixir = deck.length > 0
    ? (deck.reduce((acc, card) => acc + card.elixir, 0) / deck.length).toFixed(1)
    : '0.0';

  // Conteo por tipo de carta
  const troopsCount = deck.filter(c => c.type === 'Tropa').length;
  const spellsCount = deck.filter(c => c.type === 'Hechizo').length;
  const buildingsCount = deck.filter(c => c.type === 'Estructura').length;

  // Evaluación visual del coste
  const getElixirBadge = (avg) => {
    const val = parseFloat(avg);
    if (deck.length === 0) return { label: 'Sin cartas', color: 'text-slate-400', bar: 'w-0 bg-slate-600' };
    if (val <= 3.1) return { label: 'Ciclo Ultra Rápido ⚡', color: 'text-cyan-300', bar: 'w-1/3 bg-gradient-to-r from-cyan-400 to-blue-500' };
    if (val <= 3.9) return { label: 'Equilibrado ⚖️', color: 'text-emerald-300', bar: 'w-2/3 bg-gradient-to-r from-emerald-400 to-teal-500' };
    return { label: 'Pesado / Beatdown 🔥', color: 'text-amber-300', bar: 'w-full bg-gradient-to-r from-amber-400 to-rose-500' };
  };

  const elixirStatus = getElixirBadge(avgElixir);

  // Crear arreglo fijo de 8 ranuras
  const slots = Array.from({ length: 8 }, (_, index) => deck[index] || null);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900/95 to-blue-950/90 border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.12)] p-5 sm:p-7">
      {/* Brillos decorativos de fondo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Encabezado del Constructor */}
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-clash text-base shadow-md">
              {deck.length}/8
            </span>
            <h2 className="font-clash text-2xl sm:text-3xl text-white tracking-wide">
              TU MAZO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">BATALLA</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1">
            Haz clic en las cartas de abajo para equiparlas o tócalas aquí para quitarlas.
          </p>
        </div>

        {/* Botones de Acción Interactivos */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onRandomDeck}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" /> Mazo Aleatorio
          </button>

          {deck.length > 0 && (
            <>
              <button
                type="button"
                onClick={onCopyDeck}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Copy className="w-4 h-4" /> Copiar Mazo
              </button>

              <button
                type="button"
                onClick={onClearDeck}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 transition-all active:scale-95 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Vaciar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cuadrícula de 8 Ranuras del Mazo */}
      <div className="relative grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3.5 mb-6">
        {slots.map((card, idx) => (
          <div key={card ? card.id : `empty-${idx}`} className="aspect-[3/4]">
            {card ? (
              <div
                onClick={() => onRemoveCard(card.id)}
                title={`Quitar ${card.name}`}
                className="animate-pop-in group relative w-full h-full rounded-2xl bg-gradient-to-b from-amber-400/80 to-blue-600/80 p-[2px] cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                <div className="relative w-full h-full rounded-[14px] bg-slate-900/95 flex flex-col items-center justify-between p-1.5 overflow-hidden">
                  {/* Gota de Elixir */}
                  <span className="absolute top-1 left-1 z-10 w-5 h-5 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-700 text-white font-clash text-[11px] flex items-center justify-center shadow">
                    {card.elixir}
                  </span>

                  {/* Botón rojo al pasar el mouse para quitar */}
                  <div className="absolute inset-0 bg-rose-950/75 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center text-rose-200">
                    <X className="w-6 h-6 text-rose-400" />
                    <span className="text-[10px] font-bold">Quitar</span>
                  </div>

                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-[72%] object-contain mt-1 drop-shadow-md"
                  />
                  <span className="text-[10px] font-bold text-white truncate w-full text-center">
                    {card.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-2xl border-2 border-dashed border-blue-400/25 bg-slate-950/50 flex flex-col items-center justify-center text-blue-400/40 select-none">
                <Sparkles className="w-4 h-4 mb-1 opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ranura {idx + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Barra Inferior de Estadísticas en Vivo */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/70 border border-blue-800/40 rounded-2xl p-4">
        {/* Coste Medio de Elixir */}
        <div className="md:col-span-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center shadow-lg shadow-fuchsia-600/30 shrink-0">
            <Droplet className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Coste Medio de Elixir
              </span>
              <span className={`text-xs font-bold ${elixirStatus.color}`}>
                {elixirStatus.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-clash text-2xl text-fuchsia-400">{avgElixir}</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${elixirStatus.bar}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Composición del Mazo */}
        <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Balance:</span>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold">
            ⚔️ Tropas: {troopsCount}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
            ✨ Hechizos: {spellsCount}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            🏰 Estructuras: {buildingsCount}
          </span>
        </div>
      </div>
    </div>
  );
}