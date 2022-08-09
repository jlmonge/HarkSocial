<script setup>
import AudioVisualizer from './AudioVisualizer.vue';
</script>

<template>
    <div id="conversation-feed">
        <AudioVisualizer></AudioVisualizer>
        <p>This is the conversation feed.</p>
    </div>
</template>

<style scoped>
#conversation-feed {
    background-color: #FFFFFF;
    border-radius: 1em;;
}

#conversation-feed p {
    color: #000000;
    padding: 15em;
}
</style>