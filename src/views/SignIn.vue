<script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import firebase from 'firebase/compat';
  import { useRouter } from 'vue-router' // import router
  import RaisedButton from '../components/RaisedButton.vue';

  const email = ref('')
  const password = ref('')
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter() // get a reference to our vue router
  const signIn = () => { // we also renamed this method
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
      .then((data) => {
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
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
      });
  }
  const emailReg = ref('')
  const passwordReg = ref('')
  const routerReg = useRouter() // get a reference to our vue router
  const register = () => {
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(emailReg.value, passwordReg.value) // need .value because ref()
      .then((data) => {
        console.log('Successfully registered!');
        router.push('/conversation') // redirect to the feed
      })
      .catch(error => {
        console.log(error.code)
        alert(error.message);
      });
  }
</script>

<template>
  <div id="wrapper">
    <div id="login">
      <h1>Login</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <RaisedButton @click="signIn" msg="Sign in"></RaisedButton>
      <p v-if="errMsg">{{ errMsg }}</p>
    </div>
    <span id="or">OR</span>
    <div id="register">
      <h1>Register</h1>
      <p><input type="text" placeholder="Email" v-model="emailReg" /></p>
      <p><input type="password" placeholder="Password" v-model="passwordReg" /></p>
      <div id="birthday">
        <p id="birthday-label">Birthday</p>
        <input type="date" name="birthday-dob">
      </div>
      <p></p>
      <RaisedButton @click="register" msg="Register"></RaisedButton>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  animation: 1s appear ease-out;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-family: 'Barlow';
}

@keyframes appear {
  from {opacity: 0%;}
  to {opacity: 100%;}
}
#login, #register {
  border: 1px solid rgb(212, 212, 212);
  border-radius: 1px;
  padding: 0 5%;
  flex-basis: 0;
  height: 75%;
}
#login {
  margin-left: 10%;
}
#register {
  margin-right: 10%;
}
h1 {
  align-items: center;
}
input[type=text], input[type=password], input[type=date] {
  padding: 10px;
  border: 1px solid rgb(212, 212, 212);
}
::placeholder, input[type=date] {
  color:rgb(183, 183, 183);
}
span {
  color: rgb(183, 183, 183)
}
#birthday-label {
  margin: 16px 0 2px 0;
  color:rgb(183, 183, 183);
  font-size: 0.9em;
}
@media screen and (max-width: 700px) {
  #wrapper {
    flex-direction: column;
    margin: 10vh 0;
  }
  #login, #register {
    margin: 0;
    padding: 0vh 3vh 5vh 3vh;
  }
  #or {
    margin: 2px 0;
  }
}
</style>