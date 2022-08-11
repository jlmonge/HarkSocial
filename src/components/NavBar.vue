<script setup>
import RaisedButton from '../components/RaisedButton.vue';

import { RouterLink } from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/">
            <img src="https://cdn.pixabay.com/photo/2021/08/07/07/38/onomatopeia-6527943_1280.png" alt="All Talk logo" width="32" height="32">
        </RouterLink>
        <div class="nav-search">
            <input type="text" placeholder="Search...">
        </div>
        <div class="nav-items">
            <ul>
                <li><RouterLink to="feed">Feed</RouterLink></li>
                <li><RouterLink to="profile">Profile</RouterLink></li>
                <li><a href="">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
    overflow: hidden;
    display: flex;
}
img {
    float: left
}
.nav-search {
    float: center;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    float: right;
}
li {
    float: right
}
</style>