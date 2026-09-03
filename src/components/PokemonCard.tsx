import type { Pokemon } from '../interfaces/Pokemon';
import { PokemonSprite } from './PokemonSprite';

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onClick: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  return (
    <button
      type="button"
      className={`group relative w-full cursor-pointer rounded-xl overflow-hidden transition-all duration-200 flex flex-col items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
        isSelected
          ? "ring-2 ring-emerald-400 bg-slate-900 border border-emerald-500/70 shadow-xl shadow-emerald-500/20 scale-105 z-10"
          : "border border-slate-800/90 bg-slate-900/75 hover:border-slate-650 hover:bg-slate-850 hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={() => onClick(pokemon)}
    >
      {/* Sprite Container */}
      <div className="w-full flex-1 flex items-center justify-center p-2 min-h-[5rem] sm:min-h-[6.5rem] relative overflow-hidden">
        {isSelected && (
          <div className="absolute inset-0 bg-emerald-500/10 rounded-t-xl" />
        )}
        <PokemonSprite
          name={pokemon.name}
          alt={pokemon.name}
          className="h-16 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-115"
        />
      </div>

      {/* Name Label */}
      <div className={`w-full py-1 px-1.5 text-center border-t transition-colors ${
        isSelected
          ? "bg-emerald-950/80 border-emerald-500/50"
          : "bg-slate-950/75 border-slate-800/80 group-hover:bg-slate-900/90"
      }`}>
        <span className={`text-[11px] sm:text-xs font-bold block truncate uppercase tracking-tight ${
          isSelected ? "text-emerald-300" : "text-slate-200 group-hover:text-white"
        }`}>
          {pokemon.name}
        </span>
      </div>
    </button>
  );
};
