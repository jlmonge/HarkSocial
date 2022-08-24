<script setup>
import ConversationFeed from '@/components/ConversationFeed.vue'
import Prompt from '@/components/Prompt.vue'
import NavBar from '../components/NavBar.vue';
import firebase from 'firebase/compat';
import { userStore } from '../stores/UserStore.js'
// import { async } from '@firebase/util';
//import { forEach } from 'cypress/types/lodash';
const main = userStore();
import { getFirestore, collection, getDocs, query, where, snapshotEqual} from '@firebase/firestore'
// import {
//   collection,
//   doc,
//   addDoc,
//   getDoc,
//   getDocs,
//   query,
//   where,
//   deleteDoc,
// } from 'firebase/firestore'
const db = firebase.firestore()
const userRef = collection(db, 'users')
const friendsRef = collection(db,'friends')
const pairsRef = collection(db, 'pairs')
let friendsCollection = query(collection(db,'friends'))
let pairCollection = query(collection(db,'pairs'))
const allUsers = []
const allFriends = []
const allPairs = []
var friendsList = []
var userList = []
getDocs(userRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            allUsers.push({...doc.data(), id: doc.id})
        })
        console.log(allUsers)
    })
    .catch(err => {
        console.log(err.message)
    })
    for (user in allUsers){
        userList.push(user.email)
    }

getDocs(friendsRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            allFriends.push({...doc.data(), id: doc.id})
        })
        // console.log(allUsers)
    })
    .catch(err => {
        console.log(err.message)
    })

getDocs(pairsRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            allPairs.push({...doc.data(), id: doc.id})
        })
        // console.log(allUsers)
    })
    .catch(err => {
        console.log(err.message)
    })


// console.log(allFriends);
// console.log(userList);

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
  return usersPair;
}
async function checkAudioPath(p1,p2){
    
}


// checkPair(main.email);
main.pairFound=true;
</script>


<template>
    <NavBar></NavBar>
    <div class="conversation">
        <button @click="shufflePairs()">Shuffle Pairs</button>
        <button @click="checkPair(main.email)">get friends</button>
        <button @click="main.printMessage()">Print</button>
        <Prompt></Prompt>
        <h3 v-if= !main.pairFound>Loading...</h3>
        <ConversationFeed v-else></ConversationFeed>
    </div>
</template>
