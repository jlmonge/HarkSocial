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
.logo-row {
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.logo {
    font-size: 5em;
    font-style: italic;
    font-weight: normal;
    letter-spacing: 0.5em;
    user-select: none;
    text-shadow: grey 0.5px 0.5px 1px;
    margin: 0.5em 0 0 0;

    animation: 1s logo-spacing ease-in-out;
}
@keyframes logo-spacing {
  from {letter-spacing: 0.1em;}
  to {letter-spacing: 0.5em;}
}
.logo .line2 {
    display: block;
    padding: 0 0 0 1.5em;
}
.desc-row {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 6% 0;
}
.desc {
    line-height: 2em;
    letter-spacing: 0.1em;
    width: 80%;
}
.btn-row {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>