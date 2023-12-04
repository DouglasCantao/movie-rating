<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { items } from "../movies.json";
  import { StarIcon } from "@heroicons/vue/24/solid";
  
  const route = useRoute();
  const movie = ref(null);
  const rating = ref(null);

  onMounted(() => {
    movie.value = items.find((mve) => mve.id === Number.parseInt(route.params.id))
    rating.value = movie.value.rating
  })

</script>
<template>
  <div v-if="movie" class="flex justify-center pt-4">
    <div class="movie-detail">
    <div>
      <div class="absolute ml-48">
        <StarIcon class="w-10 relative float-right" :class="[rating ? 'fill-orange-500' : 'fill-gray-500']"/>
        <span class="highligted-star">{{ rating ? rating : '-'}}</span>
      </div>
      <figure class="w-60 h-96">
        <img class="h-full w-full" :src="movie.image" :alt="movie.name" />
      </figure>
    </div>
    <div class="flex flex-col p-1 items-flex-start gap-2">
      <h2 class="font-bold">{{ movie.name }}</h2>
      <div>
        <span v-for="gen of movie.genres" :key="gen" class="rounded bg-violet-600 text-white p-1 mx-px text-xs">{{ gen }}</span>
      </div>      
      <p class="text-left font-light text-sm line-clamp-3">{{ movie.description }}</p>
    </div>
  </div>    
  </div>
</template>

<style>

  @media (max-width: 62em){
    .movie-detail {
      flex-direction: column;
    }
    
  }

</style>