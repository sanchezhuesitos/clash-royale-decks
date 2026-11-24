import React from 'react';

const rarityBorders = {
  "Común": "border-slate-400 bg-slate-800/80",
  "Especial": "border-amber-500 bg-amber-950/40",
  "Épica": "border-purple-500 bg-purple-950/40",
  "Legendaria": "border-cyan-400 bg-gradient-to-b from-cyan-900/50 via-purple-900/50 to-amber-900/50 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
};

export default function CardItem({ card, onClick, isSelected, disabled }) {
  return (
    <button
      onClick={() => onClick(card)}
      disabled={disabled && !isSelected}
      className={`relative group flex flex-col items-center p-1.5 rounded-xl border-2 transition-all duration-200 
        ${rarityBorders[card.rarity] || rarityBorders["Común"]}
        ${isSelected ? 'ring-4 ring-emerald-400 scale-95 opacity-60' : 'hover:scale-105 hover:-translate-y-1 cursor-pointer'}
        ${disabled && !isSelected ? 'opacity-40 cursor-not-allowed hover:scale-100 hover:translate-y-0' : ''}
      `}
    >
      <div className="absolute -top-2 -left-2 z-10 w-7 h-7 bg-fuchsia-600 border-2 border-fuchsia-300 rounded-full flex items-center justify-center shadow-md">
        <span className="font-clash text-sm text-white leading-none">{card.elixir}</span>
      </div>

      <img 
        src={card.image} 
        alt={card.name} 
        className="w-20 h-24 object-contain drop-shadow-md select-none"
        loading="lazy"
      />

      <span className="mt-1 text-[11px] font-bold text-center text-slate-100 leading-tight line-clamp-1">
        {card.name}
      </span>

      {isSelected && (
        <div className="absolute inset-0 bg-slate-950/50 rounded-xl flex items-center justify-center">
          <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
            EN MAZO
          </span>
        </div>
      )}
    </button>
  );
}