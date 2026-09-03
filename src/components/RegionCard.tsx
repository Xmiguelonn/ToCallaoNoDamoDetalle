import type { Region } from '../interfaces/Region';

interface RegionCardProps {
  region: Region;
  isExpanded: boolean;
  onClick: (regionId: string) => void;
}

const REGION_GRADIENTS: Record<string, string> = {
  kanto: 'from-red-600/25 via-rose-900/20 to-slate-900',
  johto: 'from-amber-500/25 via-yellow-900/20 to-slate-900',
  hoenn: 'from-emerald-500/25 via-teal-900/20 to-slate-900',
  sinnoh: 'from-cyan-500/25 via-blue-900/20 to-slate-900',
  teselia: 'from-violet-500/25 via-purple-900/20 to-slate-900',
};

const REGION_ACCENT_COLORS: Record<string, { border: string; text: string; glow: string }> = {
  kanto: { border: 'border-red-500/50', text: 'text-red-300', glow: 'shadow-red-500/25' },
  johto: { border: 'border-amber-500/50', text: 'text-amber-300', glow: 'shadow-amber-500/25' },
  hoenn: { border: 'border-emerald-500/50', text: 'text-emerald-300', glow: 'shadow-emerald-500/25' },
  sinnoh: { border: 'border-cyan-500/50', text: 'text-cyan-300', glow: 'shadow-cyan-500/25' },
  teselia: { border: 'border-violet-500/50', text: 'text-violet-300', glow: 'shadow-violet-500/25' },
};

export const RegionCard = ({ region, isExpanded, onClick }: RegionCardProps) => {
  const gradient = REGION_GRADIENTS[region.id] || 'from-slate-700/25 to-slate-900';
  const accents = REGION_ACCENT_COLORS[region.id] || { border: 'border-cyan-500/50', text: 'text-cyan-300', glow: 'shadow-cyan-500/25' };

  return (
    <button
      type="button"
      className={`group relative w-full rounded-xl overflow-hidden transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
        isExpanded
          ? `ring-2 ring-cyan-400 bg-slate-900 border ${accents.border} shadow-lg ${accents.glow} scale-[1.02]`
          : "border border-slate-800/80 bg-slate-900/70 hover:border-slate-650 hover:bg-slate-850 hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={() => onClick(region.id)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />

      {/* Content Container */}
      <div className="relative z-10 px-2 py-3 sm:py-4 flex flex-col items-center justify-center min-h-[4.5rem] sm:min-h-[5.5rem]">
        <div className="flex items-center gap-1.5 mb-1">
          {isExpanded && (
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          )}
          <span className={`text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors ${
            isExpanded ? 'text-white' : 'text-slate-200 group-hover:text-white'
          }`}>
            {region.name}
          </span>
        </div>

        <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
          {region.leaders.length} líderes
        </span>
      </div>

      {/* Bottom active line */}
      <div className={`h-0.5 w-full transition-all duration-300 ${
        isExpanded ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-100' : 'bg-transparent opacity-0'
      }`} />
    </button>
  );
};
