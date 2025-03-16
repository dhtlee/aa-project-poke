import { Pokemon } from "../types/PokemonSummary";

interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
  pokemons: Pokemon[];
}

export class PokemonTrie {
  root: TrieNode;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): TrieNode {
    return {
      children: {},
      isEndOfWord: false,
      pokemons: [],
    };
  }

  insert(pokemon: Pokemon): void {
    let node = this.root;
    const name = pokemon.name.toLowerCase();

    // Insert the pokemon at each letter prefix
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (!node.children[char]) {
        node.children[char] = this.createNode();
      }
      node = node.children[char];
      // Add the pokemon to this node's pokémon list
      node.pokemons.push(pokemon);
    }
    node.isEndOfWord = true;
  }

  search(prefix: string): Pokemon[] {
    let node = this.root;
    prefix = prefix.toLowerCase();

    // Traverse to the node representing the prefix
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        return []; // No match found
      }
      node = node.children[char];
    }

    // Return the list of pokemons at this prefix node
    return node.pokemons;
  }

  getAllPokemons(): Pokemon[] {
    return this.root.children && Object.keys(this.root.children).length > 0
      ? this.root.pokemons
      : [];
  }

  bulkInsert(pokemons: Pokemon[]): void {
    pokemons.forEach(pokemon => this.insert(pokemon));
  }

  setAllPokemons(pokemons: Pokemon[]): void {
    this.root.pokemons = pokemons;
  }
}
