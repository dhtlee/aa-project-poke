export type PokemonDetails = {
  id: number;
  name: string;
  types: string[];
  stats: {
    hp?: number;
    attack?: number;
    height?: number;
    defence?: number;
    weight?: number;
    specialAttack?: number;
    baseExperience?: number;
    specialDefence?: number;
    speed?: number;
  };
  abilities: string[];
  imageUrl: string;
}

