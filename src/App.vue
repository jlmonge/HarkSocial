<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './components/Home.vue';
//import ConversationFeed from './components/ConversationFeed.vue'
// import AvLine from '../node_modules/vue-audio-visual/src/components/AvLine'
// import AvBar from '../node_modules/vue-audio-visual/src/components/AvBars'
</script>

<template>
  <template>
  <div class="wrapper">
    <Home></Home>
  </div>
  <!-- <RouterView /> -->
</template>

  <RouterView />
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
