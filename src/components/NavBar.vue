<script setup>
import RaisedButton from '../components/RaisedButton.vue';

import { RouterLink } from 'vue-router'
</script>

<template>
    <nav>
        <div class="nav-logo">
            <RouterLink to="/">A T</RouterLink>
        </div>
        <div class="nav-search">
            <input type="text" placeholder="Search Friends...">
        </div>
        <div class="nav-links">
            <ul>
                <li><RouterLink to="conversation">Feed</RouterLink></li>
                <li><RouterLink to="profile">Profile</RouterLink></li>
                <li><a href="">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
nav {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: black;
    margin: 0;
    padding: 0;
    height: 70px;
    font-size: 1.1em;
    font-family: 'Barlow';
}
.nav-logo {
    margin: 0 30px;
}
input {
    padding: 10px 20px;
    border-radius: 35px;
    width: 80%;
    font-size: 1.1em;
}
a {
    text-decoration: none;
    color: #FFFFFF;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
li {
    float: left;
    padding: 14px 36px;
}
</style>