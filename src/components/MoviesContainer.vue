<script setup>
  import { ref, inject, watch, defineAsyncComponent } from "vue";
  import MovieCard from "@/components/MovieCard.vue";

  const Modal = defineAsyncComponent(() => import('@/components/Modal.vue'));
  const MovieForm = defineAsyncComponent(() => import('@/components/MovieForm.vue'));

  const movies = inject('movies');
  const movieToEdit = ref({});
  const ratingAverage = ref(0);
  const isOpen = ref(false);
  const modalTitle = ref('Add Movie');
  
  const handleOpenModal = () => {
    isOpen.value = true;
    movieToEdit.value = {};
    modalTitle.value = 'Add Movie'
  };

  const handleAddMovie = (movie) => {
    movies.value.push(movie);
    isOpen.value = false;
  };

  const handleEditMovie = (movie) => {
    movies.value = movies.value.map(mv => {
      if(mv.id == movie.id) {
        return movie;
      }
      return mv;
    });
  };

  const handleRemoveMovie = (id) => {
    movies.value = movies.value.filter((movie) => movie.id != id);
    updateRatingAverage();
  };

  watch(movies, () => {
    updateRatingAverage();
  }, { deep: true });

  const updateRatingAverage = () => {
    const totalRating = movies.value.reduce((acc, movie) => acc + movie.rating, 0);
    ratingAverage.value = movies.value.length ? (totalRating / movies.value.length).toFixed(1) : 0;
  };
  updateRatingAverage();

  const styleClasses = ref('bg-violet-500 hover:bg-violet-700 rounded text-white w-20');

</script>

<template>
  <div class="container mx-auto">
    <nav class="flex justify-between p-2 sticky bg-violet-200 top-0 z-1">
      <div class="flex gap-4">
        <h2>Total Movies: {{ movies.length }}</h2>
        <h2>Avarage Rating: {{ ratingAverage }}</h2>
      </div>
      <button :class="styleClasses" @click="handleOpenModal()">Add</button>
    </nav>
    <div class="container mx-auto flex flex-wrap gap-4 p-2">
      <TransitionGroup name="fade">
        <MovieCard v-for="movie of movies" :movie="movie" :key="movie.id" 
          @removeMovie="(pay)=> {handleRemoveMovie(pay)}" 
          @editMovie="(pay) => { isOpen = !pay.isOpen, movieToEdit = pay.movie, modalTitle = 'Edit Movie' }"
        />
      </TransitionGroup>
    </div>
    <Modal :title="modalTitle" :showModal="isOpen" @closeModal="(pay)=> {isOpen = !pay}">
      <MovieForm 
        @closeModal="(pay)=> {isOpen = !pay}" 
        @addMovie="(pay) => {handleAddMovie(pay)}" 
        @editMovie="(pay) => {handleEditMovie(pay)}" 
        :movie="movieToEdit"
      />
    </Modal>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>