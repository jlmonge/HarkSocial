<template>
  <div id="login">
    <h1>Login to Your Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="signIn">Log In</button></p>
  </div>
  <div id="register">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="emailReg" /></p>
    <p><input type="password" placeholder="Password" v-model="passwordReg" /></p>
    <p><button @click="register">Register</button></p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import firebase from 'firebase/compat';
  import { useRouter } from 'vue-router' // import router
  import moment from 'moment'   // used for current
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore' ;
  const db = getFirestore()
  const email = ref('')
  const password = ref('')
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter() // get a reference to our vue router
  const signIn = () => { // we also renamed this method
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
      .then((data) => {
          this.emailStore.email = user.uid;
        console.log('Successfully logged in!');
        router.push('/conversation') // redirect to the feed
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
      });
  }
  const emailReg = ref('')
  const passwordReg = ref('')
  const routerReg = useRouter() // get a reference to our vue router
  const auth = getAuth();
  const today = String(moment().format('MM/DD/YYYY'));
  const register = () => {
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(emailReg.value, passwordReg.value) // need .value because ref()
      .then((data) => {
          let user = auth.currentUser;
  this.emailStore.email = user.uid;
 if(auth.currentUser != null) { setDoc(doc(db, "users",emailReg.value), {
  email: emailReg.value,
  UserID: user.uid,
  dateRegistered: today,
  friendsList: [],
  userPairs: []
});
 }
         alert("Succesfully registered! Please log-in above."); // redirect to the feed
        //do set doc

      })
      .catch(error => {
        console.log(error)
        alert(error);
      });
  }
</script>
