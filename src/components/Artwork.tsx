import { PokemonDetails } from '../types/PokemonDetails';

type ArtworkProps = {
  pokemon: Partial<PokemonDetails>;
}

const Artwork = ({ pokemon }: ArtworkProps) => {
  return (
    <img width="100%" src={pokemon.imageUrl} alt={pokemon.name} />
  )
}

export default Artwork;