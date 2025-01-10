import axios from "axios";
import { Pokemon, PokemonRepository } from "@/domain/contracts/PokemonRepository";

export class PokemonRepositoryImpl implements PokemonRepository {
    private readonly apiUrl = "https://pokeapi.co/api/v2";

    async fetchPokemonList(): Promise<Pokemon[]> {
        const response = await axios.get(`${this.apiUrl}/pokemon?limit=10`);
        return response.data.results.map((item: { name: string }, index: number) => ({
            id: index + 1,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
    }

    async fetchPokemonDetails(id: number): Promise<Pokemon> {
        const response = await axios.get(`${this.apiUrl}/pokemon/${id}`);
        return {
            id,
            name: response.data.name,
            image: response.data.sprites.front_default,
        };
    }
}