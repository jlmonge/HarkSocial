<script setup>
    import ConversationFeed from '@/components/ConversationFeed.vue'
    import Prompt from '@/components/Prompt.vue'
    import NavBar from '../components/NavBar.vue';
    import firebase from 'firebase/compat';
    import {userStore} from '../stores/UserStore.js'
   const main = userStore();
  </script>

<template>
    <NavBar></NavBar>
    <div class="conversation">
        <button @click="main.printMessage()">Print</button>
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
