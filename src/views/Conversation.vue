<script setup>
import ConversationFeed from '@/components/ConversationFeed.vue'
import Prompt from '@/components/Prompt.vue'
import NavBar from '../components/NavBar.vue';
import firebase from 'firebase/compat';
import { userStore } from '../stores/UserStore.js'
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
console.log(userList)


async function getFriendsWithUser(currentUser) {
    console.log("running getfriends")
    console.log(currentUser)
    currentUser = String(currentUser);
//   const isUser1 = where(friendsRef, 'user2', '==', currentUser).get()
// const isUser2 = where(friendsRef, 'user1', '==', currentUser).get()
  let isUser1 = query(friendsCollection,where('user1', '==',currentUser),where('isPair','==','true'));
  let isUser2 = query(friendsCollection,where('user2', '==', currentUser));

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
isUser1Array.push(responseItem.id);
})
isUser2QuerySnapshot.forEach((responseItem)=>{
isUser2Array.push(responseItem.id);
})
//   const isUser1Array = isUser1QuerySnapshot.docs;
//   const isUser2Array = isUser2QuerySnapshot.docs;
const doneArray = [].concat(isUser1Array,isUser2Array);
console.log(doneArray)
  //Note that we don't need to de-duplicate in this case
  return doneArray;
}
// function checkPair(docID){

// }
function shufflePairs() { 
    allUsers.forEach(user => {
        // Reset currentPair and friendsList for each user iteration
        let currentPair = ''
        friendsList = []
        let paired = false
        let nonexisting = true

        // Find the friends of each user from the friends collection
        for (let i = 0; i < allFriends.length; i++) {
            if (user.email === allFriends[i].user1) {
                friendsList.push(allFriends[i].user2)
            }
            if (user.email === allFriends[i].user2) {
                friendsList.push(allFriends[i].user1)
            }
        }
        //Find the user's current pair and set pairedBefore to true
        for (let i = 0; i < allPairs.length; i++) {
            if (user.email === allPairs[i].pair1 && allPairs[i].isPair) {
                currentPair = allPairs[i].pair2
                allPairs[i].pairedBefore = true
            }
            if (user.email === allPairs[i].pair2 && allPairs[i].isPair) {
                currentPair = allPairs[i].pair1
                allPairs[i].pairedBefore = true
            }
        }
        console.log(user.email + '\'s current pair is: ' + currentPair)

        // Pair these fuckers
        while( !paired ) {
            // Assign a random friend to be matched with the user
            let random = Math.floor(Math.random() * user.friendsList.length)
            let potentialPair = friendsList[random]

            // Check if there is a non-existing potentialPair and user matching
            // If so, addDoc that pairing
            for(let i = 0; i < allPairs.length; i++) {
                if (user.email === allPairs[i].pair1 && allPairs[i].pair2 === potentialPair) {
                    nonexisting = false
                    break
                }
                if (user.email === allPairs[i].pair2 && allPairs[i].pair1 === potentialPair) {
                    nonexisting = false
                    break
                }
            }
            // if (nonexisting) {
            //      addDoc when finished
            // }
            console.log(user.email + '\'s new pair is: ' + potentialPair)

            paired = true
        }
    })
}

function shuffle() {
    allUsers.forEach(user => {
        // Indicate that the current friend has been paired with the user
        // and that the user does not have a pair
        user.previousPair.push(user.userPairs[0])
        user.userPairs = []
        user.hasPair = false

        // This will run if the user has no pair
        while(user.userPairs.length === 0) {
            if (user.hasPair === true) { continue }
            let random = Math.floor(Math.random() * user.friendsList.length)
            if (user.friendsList[random] != undefined && user.previousPair.includes(user.friendsList[random])) {
                if (user.previousPair.length === user.friendsList.length) {
                   user.previousPair = []
                }
                continue
            }

            let friend = user.friendsList[random]
            
            if (user.hasPair === false) {
                user.userPairs.push(friend)
                user.hasPair = true
            }
            for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].email === friend) {
                        allUsers[i].userPairs.push(user.email)
                        allUsers[i].hasPair = true
                        break
                    }
            }
            break
        }
    })
    console.log(allUsers)
}
</script>


<template>
    <NavBar></NavBar>
    <div class="conversation">
        <button @click="shufflePairs()">Shuffle Pairs</button>
        <button @click="getFriendsWithUser(main.email)">get friends</button>
        <button @click="main.printMessage()">Print</button>
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
