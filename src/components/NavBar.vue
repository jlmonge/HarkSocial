<script setup>
import RaisedButton from '../components/RaisedButton.vue';
import { getAuth , onAuthStateChanged} from '@firebase/auth'
import { ref, watchEffect } from 'vue'
import 'firebase/compat/auth'
import firebase from 'firebase/compat/app';
import { RouterLink } from 'vue-router';
import { userStore } from '../stores/UserStore';
//  const isLoggedIn = ref(true)

var isLoggedIn = false;
var userEmail = 'User not logged in.'
const main = userStore();
if (main.isLoggedIn === true){
    isLoggedIn = true;
    userEmail = main.email;
    console.log('Pinia store successful, email is: ' + userEmail +' isLoggedin:' +isLoggedIn);
}
else {
    isLoggedIn = false;
    console.log('User not logged in, returning to home page.')
        router.push('/')
}
  // runs after firebase is initialized
//   firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         isLoggedIn.value = true 
//         var email = user.email
//         var uuid = user.UserID
//         // console.log(firebase.auth().currentUser.email )
//         // if we have a user
//       } else {
//         isLoggedIn.value = false // if we do not
//         console.log('not logged in ):')
//       }
//   })
  const signOut = () => {
    firebase.auth().signOut()
    main.email = undefined;
    main.isLoggedIn = undefined;
    console.log('signed out returning to home page')
    router.push('/')
  }

</script>

<template>
    <nav>
        <div class="nav-logo">
            <RouterLink to="/">HARK</RouterLink>
        </div>
        <div class="nav-search">
            <!-- <input type="text" placeholder="Search Friends..."> -->
            <li> {{userEmail}}</li>
        </div>
        <div class="nav-links">
            <ul>
                <li><RouterLink to="conversation">Feed</RouterLink></li>
                <li><RouterLink to="profile">Profile</RouterLink></li>
                <button @click="signOut"><RouterLink to="/">Log Out</RouterLink></button>
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