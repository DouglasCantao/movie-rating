<script setup>
  import { ref, defineProps, onMounted } from "vue";

  const props = defineProps({
    movie: {
      type: Object,
      required: false,
    },
  });

  const emit = defineEmits(['closeModal', 'addMovie', 'editMovie']);

  // form data
  const inputTitle = ref(null);

  const id = ref(props.movie.id ?? null);
  const title = ref(props.movie.name ?? '');
  const description = ref(props.movie.description ?? '');
  const imageUrl = ref(props.movie.image ?? '');
  const selectedGenre = ref(props.movie.genres ?? []);
  const inTheaters = ref(props.movie.inTheaters ?? false);
  const rating = ref(props.movie.rating ?? 0);

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Thriller',
    'Western',
  ];

  const handleReset = () => {
    title.value = '';
    description.value = '';
    imageUrl.value = '';
    selectedGenre.value = [];
    inTheaters.value = false;

    if(!id.value) {
      emit('closeModal', true);
    }
  };

  const handleAdd = () => {
    const movie = {
      id: Math.floor((Math.random() * 999)),
      name: title.value,
      description: description.value,
      image: imageUrl.value,
      genres: selectedGenre.value,
      inTheaters: inTheaters.value,
      rating: 0,
    };
    emit('addMovie', movie);
    emit('closeModal', true);

    handleReset();

  };

  const handleEdit = () => {
    const movie = {
      id: id.value,
      name: title.value,
      description: description.value,
      image: imageUrl.value,
      genres: selectedGenre.value,
      inTheaters: inTheaters.value,
      rating: rating.value,
    };
    emit('editMovie', movie);
    emit('closeModal', true);

    handleReset();

  };

  const validateForm = (event) => {
    event.preventDefault();
    if (title.value != '' && description.value != '' && imageUrl.value != '' && selectedGenre.value.length > 0) {
      if(!id.value) {
        handleAdd();
      } else {
        handleEdit();
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  onMounted(() => {
    inputTitle.value.focus();
  })

  const buttonStyleClasses = ref('rounded text-white w-20');

</script>

<template>
  <div>
    <form class="container flex flex-col p-5 gap-5">
      <div class="flex flex-col">
        <label for="title" class="text-left text-violet-700">Movie Title</label>
        <input id="title" v-model="title" ref="inputTitle" required class="outline-violet-500 outline-offset-2" />
        <span v-if="title == ''" class="text-left text-rose-700">This field is required</span>
      </div>
  
      <div class="flex flex-col">
        <label for="description" class="text-left text-violet-700">Movie Description</label>
        <textarea id="description" v-model="description" class="outline-violet-500"></textarea>
        <span v-if="description == ''" class="text-left text-rose-700">This field is required</span>
      </div>
  
      <div class="flex flex-col">
        <label for="image" class="text-left text-violet-700">Image</label>
        <input id="image" v-model="imageUrl" class="outline-violet-500" />
        <span v-if="imageUrl == ''" class="text-left text-rose-700">This field is required</span>
      </div>
  
      <div class="flex flex-col">
        <label for="genre-select" class="text-left text-violet-700">Genre</label>
        <select id="genre-select" name="genre" v-model="selectedGenre" multiple class="outline-violet-500">
          <option v-for="genre of genres" :key="genre">{{ genre }}</option>
        </select>
        <span v-if="selectedGenre.length == 0" class="text-left text-rose-700">This field is required</span>
      </div>

      <div class="flex gap-2">
        <input id="inTheaters" type="checkbox" v-model="inTheaters" class="outline-violet-500" />
        <label for="inTheaters" class="text-left text-violet-700">In Theaters</label>
      </div>
    </form>

  </div>
  <div class="flex justify-between">
    <button :class="[buttonStyleClasses, 'bg-gray-500 hover:bg-gray-700']" @click="handleReset()">reset</button>
    <button :class="[buttonStyleClasses, 'bg-sky-500 hover:bg-sky-700']"
      @click="validateForm($event)">save</button>
  </div>
</template>