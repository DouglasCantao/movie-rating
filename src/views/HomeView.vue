<script setup>
import { ref, provide } from "vue";
import MoviesContainer from "@/components/MoviesContainer.vue";
import { items } from "../movies.json";

const movies = ref(items);
provide('movies', movies);

</script>

<template>
  <MoviesContainer />
  <div></div>
</template>
