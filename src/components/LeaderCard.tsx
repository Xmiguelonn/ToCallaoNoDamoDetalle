import type { ConfigLeader } from '../interfaces/Region';

interface LeaderCardProps {
  leader: ConfigLeader;
  isExpanded: boolean;
  onClick: (leaderId: string) => void;
}

export const LeaderCard = ({ leader, isExpanded, onClick }: LeaderCardProps) => {
  return (
    <button
      type="button"
      className={`group relative w-full cursor-pointer rounded-xl overflow-hidden transition-all duration-250 flex flex-col items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
        isExpanded
          ? "ring-2 ring-indigo-400 bg-slate-900 border border-indigo-500/60 shadow-xl shadow-indigo-500/20 scale-[1.03]"
          : "border border-slate-800/90 bg-slate-900/80 hover:border-slate-650 hover:bg-slate-850 hover:shadow-lg hover:-translate-y-0.5"
      }`}
      onClick={() => onClick(leader.id)}
    >
      {/* Sprite Area */}
      <div className="w-full flex items-center justify-center p-2 sm:p-3 h-20 sm:h-24 md:h-28 relative">
        {/* Subtle background glow when active */}
        {isExpanded && (
          <div className="absolute inset-0 bg-indigo-500/10 rounded-t-xl" />
        )}
        <img 
          src={`${import.meta.env.BASE_URL}images/lideres/${leader.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={leader.name} 
          className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Name Bar */}
      <div className={`w-full py-1.5 px-2 text-center border-t transition-colors ${
        isExpanded
          ? "bg-indigo-950/80 border-indigo-500/50"
          : "bg-slate-950/70 border-slate-800/80 group-hover:bg-slate-900/90"
      }`}>
        <span className={`text-xs sm:text-sm font-bold block truncate tracking-wide ${
          isExpanded ? "text-indigo-200" : "text-slate-200 group-hover:text-white"
        }`}>
          {leader.name}
        </span>
      </div>
    </button>
  );
};
