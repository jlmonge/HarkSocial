<script setup>
<<<<<<< HEAD
  import { RouterLink, RouterView } from 'vue-router'
=======
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import firebase from 'firebase/compat/app';
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
>>>>>>> main
</script>

<template>
  <RouterView />
<<<<<<< HEAD
</template>

<style scoped>

</style>
=======
</template>
>>>>>>> main
