<script setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
    default: null,
  },
  showModal: { type: Boolean, default: false },
});

const modal = ref('flex justify-center bg-black fixed top-0 left-0 w-full h-full bg-opacity-50');
const modalWrapperStyleClasses = ref('text-center w-3/6 h-fit rounded mt-12 p-4 bg-violet-200 min-w-fit');

const emit = defineEmits(['closeModal']);

</script>

<template>
  <Transition>
    <div v-if="showModal" :class="modal" @click="$emit('closeModal', true)" @keyup.esc="$emit('closeModal', true)">
      <div :class="modalWrapperStyleClasses" @click.stop>
        <h2 class="text-violet-700" v-if="title">{{ title.toUpperCase() }}</h2>
        <slot />
      </div>
      <div class="relative top-12 right-5 cursor-pointer" @click="$emit('closeModal', true)">
        x
      </div>
    </div>
  </Transition>
</template>

<style scoped>

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .v-enter-active {
    animation: fadeIn .8s;
  }

  .v-leave-active {
    transition: opacity .5s;
  }
  
  .v-leave-to {
    opacity: 0;
  }
</style>