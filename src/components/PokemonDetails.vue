<template>
    <div>
        <h2>Details</h2>
        <img :src="pokemon.image" :alt="pokemon.name" />
        <p>Name: {{ pokemon.name }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Pokemon } from "@/domain/contracts/PokemonRepository";

export default defineComponent({
    props: {
        pokemon: {
            type: Object as PropType<Pokemon>,
            required: true,
        },
    },
});
</script>