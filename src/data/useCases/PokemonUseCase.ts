import { Pokemon, PokemonRepository } from "@/domain/contracts/PokemonRepository";

export class PokemonUseCase {
    constructor(private readonly repository: PokemonRepository) { }

    async getPokemonList(): Promise<Pokemon[]> {
        return await this.repository.fetchPokemonList();
    }

    async getPokemonDetails(id: number): Promise<Pokemon> {
        return await this.repository.fetchPokemonDetails(id);
    }
}