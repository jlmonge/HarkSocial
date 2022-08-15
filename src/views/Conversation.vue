<script setup>
    import ConversationFeed from '@/components/ConversationFeed.vue'
    import Prompt from '@/components/Prompt.vue'
    import NavBar from '../components/NavBar.vue';
    import firebase from 'firebase/compat';
    console.log(firebase.auth().currentUser.uid)
</script>

<template>
    <NavBar></NavBar>
    <div class="conversation">
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
