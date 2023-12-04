<script setup>
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import EditIcon from "@/components/icons/EditIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";

defineEmits(['removeMovie', 'editMovie']);

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
const hoverCard = ref(false);
const rating = ref(props.movie.rating);
const handlerRating = (star) => {
  rating.value = star;
  props.movie.rating = star;
};

</script>

<template>
  <div @mouseover="hoverCard=true" @mouseout="hoverCard=false" class="movie-card">
    <div>
      <div class="absolute ml-48">
        <StarIcon class="w-10 relative float-right" :class="[rating ? 'fill-orange-500' : 'fill-gray-500']"/>
        <span class="highligted-star">{{ rating ? rating : '-'}}</span>
      </div>
      <figure class="w-full h-96">
        <img class="h-full w-full" :src="movie.image" :alt="movie.name" />
      </figure>
    </div>
    <div class="flex flex-col p-1 items-center gap-2">
      <h2 class="font-bold">{{ movie.name }}</h2>
      <div>
        <span v-for="gen of movie.genres" :key="gen" class="rounded bg-violet-600 text-white p-1 mx-px text-xs">{{ gen }}</span>
      </div>      
      <p class="text-center font-light text-sm line-clamp-3">{{ movie.description }}</p>
      <div class="flex pb-2 gap-12">
        <div class="flex">
          <StarIcon v-for="star of 5" :key="star" class="w-6 fill-gray-500" :class="{'fill-orange-500' : star <= rating, 'cursor-not-allowed': star == rating , 'cursor-pointer': star != rating}" @click="handlerRating(star)"/>
        </div>
        <figure :class="['flex gap-1 items-center', hoverCard ? 'opacity-100 transition-all' : 'opacity-0']">
          <EditIcon class="w-4 pt-px stroke-slate-900 hover:stroke-violet-600 cursor-pointer" alt="edit" @click="$emit('editMovie', {isOPen: true, movie})"/>
          <TrashIcon class="stroke-slate-900 hover:stroke-rose-700 cursor-pointer" @click="$emit('removeMovie', movie.id)"/>
          <router-link
            :key="movie.id"
            :to="{
              name:'movie.show',
              params: {id: movie.id}
            }">
            <EyeIcon class="stroke-slate-900 hover:stroke-lime-300 cursor-pointer" @click="$emit('removeMovie', movie.id)"/>
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>
