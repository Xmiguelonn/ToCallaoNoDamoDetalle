import { ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"

interface TrickItemProps {
  trick: {
    detail: string
    variant: TrickItemProps['trick'][]
  }
  level?: number
}

export function TrickItem({ trick, level = 0 }: TrickItemProps) {
  const hasVariants = trick.variant && trick.variant.length > 0
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    if (hasVariants) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className="w-full">
      <div 
        className={`p-3.5 sm:p-4 rounded-xl mb-2 transition-all duration-200 border ${
          hasVariants ? 'cursor-pointer select-none' : ''
        } ${
          isExpanded
            ? 'bg-slate-850 border-indigo-500/60 shadow-md shadow-indigo-950/20'
            : hasVariants
            ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
            : 'bg-slate-850/60 border-slate-750/60'
        }`}
        style={{ marginLeft: level > 0 ? `${level * 0.75}rem` : undefined }}
        onClick={hasVariants ? toggleExpand : undefined}
      >
        <div className="flex items-start gap-3">
          {hasVariants ? (
            <button
              type="button"
              className="mt-0.5 p-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 hover:text-white transition-colors flex-shrink-0"
              aria-label={isExpanded ? "Contraer variantes" : "Expandir variantes"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform duration-200" />
              )}
            </button>
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-sm shadow-emerald-400/50" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-normal">
              {trick.detail}
            </p>

            {hasVariants && (
              <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-indigo-300 font-medium hover:underline">
                {isExpanded ? 'Ocultar ramas alternativas' : `${trick.variant.length} variantes disponibles`}
              </span>
            )}
          </div>
        </div>
      </div>

      {hasVariants && isExpanded && (
        <div className="pl-3 sm:pl-5 border-l-2 border-indigo-500/40 ml-4 my-2.5 space-y-2 animate-in slide-in-from-top duration-200">
          {trick.variant.map((variant, index) => (
            <TrickItem 
              key={index} 
              trick={variant} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
