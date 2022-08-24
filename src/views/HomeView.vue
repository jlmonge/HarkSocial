<script setup>
import RaisedButton from '../components/RaisedButton.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="wrapper">
        <div class="logo-row">
            <h1 class="logo">
                <span class="line1">hark</span>
                <span class="line2"></span>
            </h1>
        </div>
        <div class="desc-row">
            <p class="desc">Hark is a platform that creates a safe space for empathetic conversations – using the user’s own voice.</p>
        </div>
        <div class="btn-row">
            <RouterLink to="signin">
                <RaisedButton msg="Get started"></RaisedButton>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    animation: 1s appear ease-out;
    padding: 0 10%;
    height: 100vh;
    font-family: 'Barlow';
    background-image: url("../../src/assets/hark-bg.gif");
    background-position: center;
}

@keyframes appear {
  from {opacity: 0%;}
  to {opacity: 100%}
}
.logo-row {
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.logo {
    font-size: 5em;
    /* font-style: italic; */
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