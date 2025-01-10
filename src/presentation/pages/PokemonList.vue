<template>
    <div>
        <h1>Pokémon List</h1>
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.id" @click="showDetails(pokemon.id)">
                <img :src="pokemon.image" :alt="pokemon.name" />
                <p>{{ pokemon.name }}</p>
            </li>
        </ul>
        <PokemonDetails v-if="selectedPokemon" :pokemon="selectedPokemon" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PokemonUseCase } from "@/data/useCases/PokemonUseCase";
import { PokemonRepositoryImpl } from "@/infra/PokemonRepositoryImpl";
import PokemonDetails from "@/components/PokemonDetails.vue";

const pokemons = ref<Array<{ id: number; name: string; image: string }>>([]);
const selectedPokemon = ref<{ id: number; name: string; image: string } | null>(null);
const pokemonUseCase = new PokemonUseCase(new PokemonRepositoryImpl());

const loadPokemonList = async () => {
    try {
        pokemons.value = await pokemonUseCase.getPokemonList();
    } catch (error) {
        console.error("Erro ao carregar lista de Pokémon:", error);
    }
};

const showDetails = async (id: number) => {
    try {
        selectedPokemon.value = await pokemonUseCase.getPokemonDetails(id);
    } catch (error) {
        console.error("Erro ao carregar detalhes do Pokémon:", error);
    }
};

onMounted(loadPokemonList);
</script>