<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue';
</script>

<template>
  <div class="wrapper">
    <Home></Home>
  </div>
  <!-- <RouterView /> -->
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
