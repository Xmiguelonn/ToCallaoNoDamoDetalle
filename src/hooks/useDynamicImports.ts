import type { Pokemon } from '../interfaces/Pokemon';

// Import all Pokemon JSON data eagerly using Vite's import.meta.glob
const modules = import.meta.glob('../data/**/*.json', { eager: true }) as Record<string, any>;

/**
 * Custom hook to handle dynamic imports of Pokemon data files
 */
export const useDynamicImports = () => {
  /**
   * Gets Pokemon data directly for a specific region and leader
   */
  const getLeaderPokemons = (regionId: string, leaderId: string): Pokemon[] => {
    try {
      const pattern = `/data/${regionId}/${leaderId}/`;
      return Object.entries(modules)
        .filter(([key]) => key.replace(/\\/g, '/').includes(pattern))
        .map(([key, mod]) => {
          const data = mod.default || mod;
          const fileName = (key.split('/').pop() || '').replace('.json', '');
          return {
            ...data,
            id: data.id || data.name?.toLowerCase() || fileName,
          };
        });
    } catch (error) {
      console.error(`Error getting pokemon data for ${regionId}/${leaderId}:`, error);
      return [];
    }
  };

  /**
   * Backward compatible helper: Gets Pokemon files for a specific region and leader
   */
  const getPokemonFiles = async (regionId: string, leaderId: string): Promise<string[]> => {
    try {
      const pattern = `/data/${regionId}/${leaderId}/`;
      const files = Object.keys(modules)
        .filter(key => key.replace(/\\/g, '/').includes(pattern))
        .map(key => key.split('/').pop() || '');
      
      return files;
    } catch (error) {
      console.error(`Error getting files for ${regionId}/${leaderId}:`, error);
      return [];
    }
  };

  return { getPokemonFiles, getLeaderPokemons };
};

