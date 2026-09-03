import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

// Import interfaces
import type { Pokemon } from "../interfaces/Pokemon"
import type { Region } from "../interfaces/Region"
import regionConfigData from "../data/config-region.json"

// Import hooks
import { useDynamicImports } from "../hooks/useDynamicImports"

// Import components
import { RegionCard } from "./RegionCard"
import { LeaderCard } from "./LeaderCard"
import { PokemonCard } from "./PokemonCard"
import { PokemonDetails } from "./PokemonDetails"

export default function PokemonGuide() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [lightMode, setLightMode] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)

  // Referencia para el scroll automático
  const detailsRef = useRef<HTMLDivElement>(null)

  const { getLeaderPokemons } = useDynamicImports()

  // Load region and pokemon data
  useEffect(() => {
    try {
      const baseRegions = ((regionConfigData as any).regions || []) as Region[]
      const updatedRegions: Region[] = baseRegions.map((region) => ({
        ...region,
        leaders: (region.leaders || []).map((leader) => ({
          ...leader,
          pokemons: getLeaderPokemons(region.id, leader.id),
        })),
      }))

      setRegions(updatedRegions)
      setLoading(false)
    } catch (error) {
      console.error("Error loading pokemon data:", error)
      setLoading(false)
    }
  }, [getLeaderPokemons])

  const handleRegionClick = (regionId: string) => {
    if (expandedRegion === regionId) {
      setExpandedRegion(null)
      setExpandedLeader(null)
      setSelectedPokemon(null)
    } else {
      setExpandedRegion(regionId)
      setExpandedLeader(null)
      setSelectedPokemon(null)
    }
  }

  const handleLeaderClick = (leaderId: string) => {
    if (expandedLeader === leaderId) {
      setExpandedLeader(null)
      setSelectedPokemon(null)
    } else {
      setExpandedLeader(leaderId)
      setSelectedPokemon(null)
    }
  }

  const handlePokemonClick = (pokemon: Pokemon) => {
    const isSame = selectedPokemon?.name === pokemon.name;
    setSelectedPokemon(isSame ? null : pokemon);

    if (!isSame) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  const currentRegion = regions.find((r) => r.id === expandedRegion)
  const currentLeader = currentRegion?.leaders.find((l) => l.id === expandedLeader)
  const currentLeaderPokemons = currentLeader?.pokemons || []

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        lightMode
          ? "bg-slate-100 text-slate-900"
          : "bg-[#0b0f19] text-slate-100"
      }`}
    >
      {/* Background Glow */}
      {!lightMode && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header Hero */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GUÍA DE ESTRATEGIAS & SECUENCIAS
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            FARM LIGA PokeMMO
          </h1>

          {/* Action Links (Video & Discord) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a
              href="https://youtu.be/LidSI0vJYKs?si=JRz1Vgg_1OzLFPDI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-200 hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-sm hover:shadow-red-500/20 hover:-translate-y-0.5"
            >
              <img
                className="w-5 h-5 object-contain"
                src={`${import.meta.env.BASE_URL}images/PaxpoYT.png`}
                alt="YouTube"
              />
              <span>TUTORIAL EN VIDEO</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href="https://discord.gg/pKPxjAFNmA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 text-indigo-200 hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-sm hover:shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              <img
                className="w-5 h-5 object-contain"
                src={`${import.meta.env.BASE_URL}images/discord.png`}
                alt="Discord"
              />
              <span>COMUNIDAD & REPORTES</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Route Stepper Banner */}
          <div className="max-w-4xl mx-auto rounded-2xl p-3 sm:p-4 bg-slate-900/80 border border-slate-800/80 shadow-lg shadow-black/20 backdrop-blur-md mb-6">
            <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              Ruta Recomendada de Farmeo:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                Teselia
              </span>
              <span className="text-slate-500">→</span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                Sinnoh
                <span className="text-[10px] text-emerald-400 font-bold">(casa)</span>
                <img
                  className="w-3.5 h-3.5 object-contain"
                  src={`${import.meta.env.BASE_URL}images/Healicon.png`}
                  alt="Casa"
                />
              </span>
              <span className="text-slate-500">→</span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                Hoenn
                <span className="text-[10px] text-emerald-400 font-bold">(casa)</span>
                <img
                  className="w-3.5 h-3.5 object-contain"
                  src={`${import.meta.env.BASE_URL}images/Healicon.png`}
                  alt="Casa"
                />
              </span>
              <span className="text-slate-500">→</span>

              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                Johto
              </span>
              <span className="text-slate-500">→</span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                Kanto
                <span className="text-[10px] text-emerald-400 font-bold">(casa)</span>
                <img
                  className="w-3.5 h-3.5 object-contain"
                  src={`${import.meta.env.BASE_URL}images/Healicon.png`}
                  alt="Casa"
                />
              </span>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 py-4 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Cargando datos de estrategias...</span>
            </div>
          )}
        </header>

        {/* Tips & Recommendations Accordion */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900/90 shadow-lg shadow-black/20">
            <button
              type="button"
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 hover:from-amber-950/60 transition-colors text-left focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  ⚠️
                </span>
                <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide">
                  RECOMENDACIONES ANTES DE EMPEZAR (EQUIPO - TIPS IMPORTANTES)
                </span>
              </div>
              {showTips ? (
                <ChevronUp className="w-5 h-5 text-amber-400 transition-transform flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-amber-400 transition-transform flex-shrink-0" />
              )}
            </button>

            {showTips && (
              <div className="p-4 sm:p-6 border-t border-amber-500/20 bg-slate-950/60 text-slate-200 text-xs sm:text-sm space-y-3 animate-in slide-in-from-top">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <span className="font-bold text-white">EQUIPO NECESARIO: </span>
                    <a
                      href="https://pokepast.es/e356ee22f26cf6dc"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-semibold ml-1"
                    >
                      Ver Pokepast del equipo recomendado <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <div>
                    <span className="font-bold text-white">FARMEOS EN DIRECTO: </span>
                    <a
                      href="https://www.twitch.tv/parzivalmmo"
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline font-semibold ml-1"
                    >
                      twitch.tv/parzivalmmo
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Completa cada Liga 5 veces antes para desbloquear el rematch optimizado.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><b className="text-white">Otra Vez:</b> Sirve para boostearte 2 veces. Cuando se acabe, úsalo otra vez si te hace falta boostearte más.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><b className="text-amber-300">Desactivar Repartir Experiencia (EXP Share) / Reamplificador.</b></span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>En las notas numéricas: el <b className="text-emerald-300">primer número</b> representa Maquinación o Especial X, y el <b className="text-cyan-300">segundo número</b> representa Velocidad.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Utilizar <b>"Otra Vez"</b> con Gengar salvo indicación específica contraria.</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 1: Region Selection */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase">
              1. Selecciona una Región
            </h2>
            {expandedRegion && (
              <span className="text-xs text-cyan-400 font-semibold uppercase">
                Región activa: {expandedRegion}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isExpanded={expandedRegion === region.id}
                onClick={handleRegionClick}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Leader Selection */}
        {expandedRegion && currentRegion && (
          <section className="mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase">
                2. Selecciona un Líder del Alto Mando ({currentRegion.name})
              </h2>
              {expandedLeader && (
                <span className="text-xs text-indigo-400 font-semibold uppercase">
                  Líder activo: {currentLeader?.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
              {currentRegion.leaders.map((leader) => (
                <LeaderCard
                  key={leader.id}
                  leader={leader}
                  isExpanded={expandedLeader === leader.id}
                  onClick={handleLeaderClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Pokemon Selection */}
        {expandedLeader && (
          <section className="mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase">
                3. Pokémon que te saca {currentLeader?.name} ({currentLeaderPokemons.length} registrados)
              </h2>
              {selectedPokemon && (
                <span className="text-xs text-emerald-400 font-semibold uppercase">
                  Seleccionado: {selectedPokemon.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5">
              {currentLeaderPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isSelected={selectedPokemon?.id === pokemon.id}
                  onClick={handlePokemonClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Details & Combat Strategy */}
        {selectedPokemon && (
          <section ref={detailsRef} className="scroll-mt-8 mb-10">
            <div className="mb-3 px-1">
              <h2 className="text-xs sm:text-sm font-bold tracking-wider text-emerald-400 uppercase">
                4. Secuencia y Estrategia recomendada
              </h2>
            </div>
            <PokemonDetails pokemon={selectedPokemon} />
          </section>
        )}

        {/* Footer & Credits */}
        <footer className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-bold uppercase tracking-wider text-slate-500">Créditos:</span>

            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}images/LehosifJS.png`}
                className="w-8 h-8 rounded-full border border-slate-700 object-contain bg-slate-800"
                alt="Lehosif"
                title="Lehosif"
              />

              <a href="https://imgur.com/IgDjlXj" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <img
                  className="w-8 h-8 rounded-full border border-slate-700 object-contain bg-slate-800"
                  src={`${import.meta.env.BASE_URL}images/IrviingHC.png`}
                  alt="Irviing"
                  title="Irviing"
                />
              </a>

              <a href="https://imgur.com/Hxui6yL" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <img
                  className="w-8 h-8 rounded-full border border-slate-700 object-contain bg-slate-800"
                  src={`${import.meta.env.BASE_URL}images/zParzival.png`}
                  alt="Parzival"
                  title="Parzival"
                />
              </a>

              <a href="https://imgur.com/JRVJmKe" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <img
                  className="w-8 h-8 rounded-full border border-slate-700 object-contain bg-slate-800"
                  src={`${import.meta.env.BASE_URL}images/ItachiiSuka.png`}
                  alt="Itachii"
                  title="Itachii"
                />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightMode(!lightMode)}
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-medium"
          >
            {lightMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
          </button>
        </footer>

      </div>
    </div>
  )
}
