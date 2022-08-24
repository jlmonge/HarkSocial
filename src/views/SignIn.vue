<script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import firebase from 'firebase/compat';
  import { useRouter } from 'vue-router' // import router
  import RaisedButton from '../components/RaisedButton.vue';
  import {userStore} from '../stores/UserStore.js'
  const db = getFirestore()
  let pairCollection = query(collection(db,'pairs'))
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
  const main = userStore();
  const email = ref('')
  const password = ref('')
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter() // get a reference to our vue router
  
  async function checkPair(currentUser) {
    let usersPair = "no current pair"
    console.log("running getfriends")
    console.log(currentUser)
    currentUser = String(currentUser);
//   const isUser1 = where(friendsRef, 'user2', '==', currentUser).get()
// const isUser2 = where(friendsRef, 'user1', '==', currentUser).get()
  let isUser1 = query(pairCollection,where('pair1', '==',currentUser), where('isPair','==',true));
  let isUser2 = query(pairCollection,where('pair2', '==', currentUser), where('isPair','==',true));

//   let isUser2 = friendsRef.where('user2', '==', currentUser).get();

console.log('query successful')
//   const isUser2 = friendsRef.where('user2', '==', currentUser).get();
console.log('attempt snapshot')
const isUser1QuerySnapshot  = await getDocs(isUser1);
const isUser2QuerySnapshot  = await getDocs(isUser2);

console.log('snapshot')

const isUser1Array = [];
const isUser2Array = [];
isUser1QuerySnapshot.forEach((responseItem)=>{
isUser1Array.push(responseItem.data());
console.log(responseItem.data())
})
isUser2QuerySnapshot.forEach((responseItem)=>{
isUser2Array.push(responseItem.data());
console.log(responseItem.data())
})
console.log("check response item print")

console.log(isUser1Array)
// console.log(isUser2Array[0].pair1)
console.log("check done array")

if(isUser1Array.length > 0){
    if(isUser1Array[0].pair1 != null && isUser1Array[0].pair1 === currentUser){
        usersPair = isUser1Array[0].pair2
    }
    if(isUser1Array[0].pair2 != null && isUser1Array[0].pair2 === currentUser){
        usersPair = isUser1Array[0].pair1
    }
}
if(isUser2Array.length > 0){
    if(isUser2Array[0].pair1 === currentUser){
        usersPair = isUser2Array[0].pair2
    }
    if(isUser2Array[0].pair2 === currentUser){
        usersPair = isUser2Array[0].pair1
    }
}

console.log("checkPair Success" + usersPair)
usersPair = String(usersPair)
main.currentPair = usersPair;
main.pairFound=true;
  return usersPair;
}
  const signIn = () => { // we also renamed this method
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
      .then((data) => {
        console.log('Storing user pinia')
       
//         main.$patch({
//   isLoggedIn: true,
//   email: email.value,

// })
main.email = email.value;
main.isLoggedIn = true;
console.log("CheckingPair")
checkPair(main.email)
        console.log('Pinia successful' + main.currentPair)
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
  const dobReg = ref('')
  const routerReg = useRouter() // get a reference to our vue router
  const auth = getAuth();
  const today = String(moment().format('MM/DD/YYYY'));
  const register = () => {
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(emailReg.value, passwordReg.value) // need .value because ref()
      .then((data) => {
          let user = auth.currentUser;

 if(auth.currentUser != null) { setDoc(doc(db, "users",emailReg.value), {
  email: emailReg.value,
  UserID: user.uid,
  dateRegistered: today,
  friendsList: [],
  userPairs: [],
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

<template>
  <div id="wrapper">
    <div id="login">
      <h1>Login</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>


     
      <RaisedButton @click="main.printMessage()" msg="check pinia data"></RaisedButton>
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
        <input type="date" name="birthday-dob" v-model="dobReg">
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


<!-- main.$patch({
  isLoggedIn: true,
  email: email.value,
  uuid: user.uid,
}) -->