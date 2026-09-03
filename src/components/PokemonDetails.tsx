import type { Pokemon } from '../interfaces/Pokemon';
import { TrickItem } from './TrickItem';
import { PokemonSprite } from './PokemonSprite';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-7 animate-in slide-in-from-bottom duration-300 border border-slate-700/80 shadow-2xl backdrop-blur-md">
      {/* Strategy Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center p-1.5 overflow-hidden shadow-inner">
            <PokemonSprite
              name={pokemon.name}
              alt={pokemon.name}
              className="h-full w-auto object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide uppercase">
              {pokemon.name}
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Estrategia y secuencia de combate
            </span>
          </div>
        </div>

        {/* Initial Move Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Inicio:
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-950/50">
            {pokemon.initialMove}
          </span>
        </div>
      </div>

      {/* Strategy Steps */}
      <div className="space-y-2">
        {pokemon.tricks && pokemon.tricks.length > 0 ? (
          pokemon.tricks.map((trick, index) => (
            <TrickItem key={index} trick={trick} />
          ))
        ) : (
          <div className="text-slate-400 text-center py-8 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
            <p className="text-sm font-medium">
              No hay pasos específicos registrados para {pokemon.name}. Sigue la pauta general del líder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
