<script setup>
import { RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  animation: 1s appear ease-out;
  padding: 0 10%;
}

@keyframes appear {
  from {opacity: 0%;}
  to {opacity: 100%}
}
</style>
