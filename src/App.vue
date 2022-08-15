<script setup>
import { RouterLink, RouterView } from 'vue-router'
import firebase from 'firebase/compat/app'
import { getAuth , onAuthStateChanged} from '@firebase/auth'
import { ref, watchEffect } from 'vue'
import 'firebase/compat/auth'

 const isLoggedIn = ref(true)
  // runs after firebase is initialized
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        isLoggedIn.value = true // if we have a user
      } else {
        isLoggedIn.value = false // if we do not
      }
  })
  const signOut = () => {
    firebase.auth().signOut()
    router.push('/')
  }
</script>

<template>
  <RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>