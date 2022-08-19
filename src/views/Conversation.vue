<script setup>
    import ConversationFeed from '@/components/ConversationFeed.vue'
    import Prompt from '@/components/Prompt.vue'
    import NavBar from '../components/NavBar.vue';
</script>

<script>

</script>

<template>
    <NavBar></NavBar>
    <div class="conversation">
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
