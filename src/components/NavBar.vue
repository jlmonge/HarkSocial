<script setup>
import RaisedButton from '../components/RaisedButton.vue';

import { RouterLink } from 'vue-router'
</script>

<template>
    <nav>
        <ul>
            <li><RouterLink></RouterLink></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>
</template>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;

}
</style>