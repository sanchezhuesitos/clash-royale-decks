import React from 'react';
import { Check, Sparkles } from 'lucide-react';

const RARITY_STYLES = {
  Común: {
    wrapper: 'bg-gradient-to-b from-sky-400 to-blue-600 p-[2px] shadow-blue-500/20',
    inner: 'bg-gradient-to-b from-slate-800 to-slate-950',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  Especial: {
    wrapper: 'bg-gradient-to-b from-amber-300 via-orange-500 to-amber-700 p-[2px] shadow-orange-500/30',
    inner: 'bg-gradient-to-b from-orange-950/60 to-slate-950',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  Épica: {
    wrapper: 'bg-gradient-to-b from-fuchsia-400 via-purple-600 to-indigo-800 p-[2px] shadow-purple-500/40',
    inner: 'bg-gradient-to-b from-purple-950/70 to-slate-950',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  Legendaria: {
    wrapper: 'legendary-border p-[2.5px] shadow-pink-500/40',
    inner: 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950',
    badge: 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-pink-200 border-pink-400/50',
  },
};

export default function CardItem({ card, onClick, isSelected, disabled }) {
  const style = RARITY_STYLES[card.rarity] || RARITY_STYLES.Común;
  const isBlocked = disabled && !isSelected;

  return (
    <button
      type="button"
      onClick={() => !isBlocked && onClick(card)}
      disabled={isBlocked}
      title={`${card.name} (${card.elixir} Elixir) - ${card.role || card.type}`}
      className={`group relative rounded-2xl transition-all duration-200 text-left select-none shadow-lg ${
        style.wrapper
      } ${
        isSelected
          ? 'ring-2 ring-emerald-400 scale-[0.97] brightness-95'
          : isBlocked
          ? 'opacity-40 cursor-not-allowed grayscale-[40%]'
          : 'hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95'
      }`}
    >
      <div className={`relative rounded-[14px] p-2 h-full flex flex-col items-center justify-between overflow-hidden ${style.inner}`}>
        {/* Destello de fondo al hacer hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />

        {/* Gota de Elixir */}
        <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-400 via-pink-500 to-purple-700 border border-pink-200/80 shadow-md shadow-fuchsia-600/50 flex items-center justify-center">
          <span className="font-clash text-xs text-white leading-none">{card.elixir}</span>
        </div>

        {/* Indicador de carta equipada */}
        {isSelected && (
          <div className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-emerald-500 border border-emerald-200 text-slate-950 flex items-center justify-center shadow-md animate-pop-in">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        {/* Icono especial si es legendaria */}
        {card.rarity === 'Legendaria' && !isSelected && (
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 absolute top-2 right-2 opacity-80 animate-pulse" />
        )}

        {/* Imagen de la carta */}
        <div className="w-full aspect-[4/5] flex items-center justify-center mt-1 mb-1.5">
          <img
            src={card.image}
            alt={card.name}
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Nombre y Rareza */}
        <div className="w-full text-center space-y-1">
          <p className="text-[11px] sm:text-xs font-bold text-white truncate px-0.5 leading-tight">
            {card.name}
          </p>
          <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${style.badge}`}>
            {card.rarity}
          </span>
        </div>
      </div>
    </button>
  );
}