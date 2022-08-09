<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// <<<<<<< HEAD
//import ConversationFeed from './components/ConversationFeed.vue'
// =======
import AvLine from '../node_modules/vue-audio-visual/src/components/AvLine'
import AvMedia from '../node_modules/vue-audio-visual/src/components/AvMedia'
import AvBar from '../node_modules/vue-audio-visual/src/components/AvBars'

// >>>>>>> 04a3cfd77e292576b14baf463776c34745e7247d
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
        <av-line audio-src="jellyjam.mp3">
  </av-line>
  <av-bar class = "two" audio-src="jellyjam.mp3">
  </av-bar>
      <av-bar audio-src="jellyjam.mp3" bar-color="#ff0000">
  </av-bar>
    
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/conversation">Conversation</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
body, html {
  background-color: #FFFFFF;
  min-width: 100%;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.two{
     transform: scaleY(-1)
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
