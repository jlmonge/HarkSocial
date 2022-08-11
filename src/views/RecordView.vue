<script setup>
import RaisedButton from '../components/RaisedButton.vue'
import NavBar from '../components/NavBar.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <NavBar />
    <div class="prompt-row">
        <p class="prompt">Prompt: Count to 10 in random order</p>
    </div>
    <div class="record-row">
        <RouterLink :to="{ name:'home' }">
            <RaisedButton msg="Record now"></RaisedButton>
        </RouterLink>
    </div>
</template>

<style scoped>
.prompt-row {
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.record-row {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>