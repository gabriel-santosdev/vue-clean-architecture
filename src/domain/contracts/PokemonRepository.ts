export interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export interface PokemonRepository {
    fetchPokemonList(): Promise<Pokemon[]>;
    fetchPokemonDetails(id: number): Promise<Pokemon>;
}
