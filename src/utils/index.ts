import { PokemonDetails } from "../types/PokemonDetails";

export const transformedPokemonDetailsData = (data: any): PokemonDetails => {
  let hp, attack, defence, specialAttack, specialDefence, speed;
  data.stats.forEach((stat: any) => {
    if (stat.stat.name === 'hp') {
      hp = stat.base_stat;
    } else if (stat.stat.name === 'attack') {
      attack = stat.base_stat;
    } else if (stat.stat.name === 'defense') {
      defence = stat.base_stat;
    } else if (stat.stat.name === 'special-attack') {
      specialAttack = stat.base_stat;
    } else if (stat.stat.name === 'special-defense') {
      specialDefence = stat.base_stat;
    } else if (stat.stat.name === 'speed') {
      speed = stat.base_stat;
    }
  });
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    types: data.types.map((type: { type: { name: string } }) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
    stats: {
      hp,
      attack,
      height: data.height,
      defence,
      weight: data.weight,
      specialAttack,
      baseExperience: data.base_experience,
      specialDefence,
      speed,
    },
    abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
    imageUrl: data.sprites.other?.["official-artwork"]?.["front_default"]
  }
}