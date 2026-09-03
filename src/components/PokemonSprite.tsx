import { useState, useEffect } from 'react';

interface PokemonSpriteProps {
  name: string;
  className?: string;
  alt?: string;
}

const SPECIAL_NAME_MAP: Record<string, string> = {
  'rotom agua': 'rotom-wash',
  'rotom_agua': 'rotom-wash',
  'rotom fuego': 'rotom-heat',
  'rotom_fuego': 'rotom-heat',
  'rotom hielo': 'rotom-frost',
  'rotom_hielo': 'rotom-frost',
  'rotom ventilador': 'rotom-fan',
  'rotom_ventilador': 'rotom-fan',
  'rotom corte': 'rotom-mow',
  'rotom_corte': 'rotom-mow',
  'mr. mime': 'mrmime',
  'mr mime': 'mrmime',
  'mime jr.': 'mimejr',
  'mime jr': 'mimejr',
  'ho-oh': 'hooh',
  'nidoran♀': 'nidoranf',
  'nidoran-f': 'nidoranf',
  'nidoran female': 'nidoranf',
  'nidoran♂': 'nidoranm',
  'nidoran-m': 'nidoranm',
  'nidoran male': 'nidoranm',
  'farfetch’d': 'farfetchd',
  "farfetch'd": 'farfetchd',
  'porygon-z': 'porygon-z',
  'porygon z': 'porygon-z',
  'porygon2': 'porygon2',
};

export const getPokemonAnimatedGifUrl = (pokemonName: string): string => {
  if (!pokemonName) return '';
  const clean = pokemonName.toLowerCase().trim();
  if (SPECIAL_NAME_MAP[clean]) {
    return `https://play.pokemonshowdown.com/sprites/ani/${SPECIAL_NAME_MAP[clean]}.gif`;
  }
  const normalized = clean
    .replace(/[.'’]/g, '')
    .replace(/\s+/g, '')
    .replace(/_/g, '');
  return `https://play.pokemonshowdown.com/sprites/ani/${normalized}.gif`;
};

export const getPokemonStaticPngUrl = (pokemonName: string): string => {
  if (!pokemonName) return '';
  return `${import.meta.env.BASE_URL}images/pokemon/${pokemonName.toLowerCase().replace(/ /g, '_')}.png`;
};

export const PokemonSprite = ({ name, className = '', alt }: PokemonSpriteProps) => {
  const animatedUrl = getPokemonAnimatedGifUrl(name);
  const staticUrl = getPokemonStaticPngUrl(name);
  const [src, setSrc] = useState(animatedUrl);

  useEffect(() => {
    setSrc(getPokemonAnimatedGifUrl(name));
  }, [name]);

  return (
    <img
      src={src}
      alt={alt || name}
      className={className}
      loading="lazy"
      style={{ imageRendering: 'pixelated' }}
      onError={() => {
        if (src !== staticUrl) {
          setSrc(staticUrl);
        }
      }}
    />
  );
};
