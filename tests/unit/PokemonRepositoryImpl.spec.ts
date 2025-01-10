import axios from "axios";
import { PokemonRepositoryImpl } from "@/infra/PokemonRepositoryImpl";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("PokemonRepositoryImpl", () => {
    let repository: PokemonRepositoryImpl;

    beforeEach(() => {
        repository = new PokemonRepositoryImpl();
    });

    it("deve retornar uma lista de Pokémon", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                results: [
                    { name: "bulbasaur" },
                    { name: "ivysaur" },
                ],
            },
        });

        const result = await repository.fetchPokemonList();
        expect(result).toEqual([
            { id: 1, name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
            { id: 2, name: "ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" },
        ]);
        expect(mockedAxios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon?limit=10");
    });

    it("deve retornar os detalhes de um Pokémon", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                name: "bulbasaur",
                sprites: {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                },
            },
        });

        const result = await repository.fetchPokemonDetails(1);
        expect(result).toEqual({
            id: 1,
            name: "bulbasaur",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        });
        expect(mockedAxios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
    });
});