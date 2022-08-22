<script setup>
import ConversationFeed from '@/components/ConversationFeed.vue'
import Prompt from '@/components/Prompt.vue'
import NavBar from '../components/NavBar.vue';
import firebase from 'firebase/compat';
import { userStore } from '../stores/UserStore.js'
const main = userStore();

import { getFirestore, collection, getDocs, snapshotEqual } from '@firebase/firestore'
const db = getFirestore()
const userRef = collection(db, 'users')
const allUsers = []

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
            while(user)
            if (user.hasPair === false) {
                user.userPairs.push(friend)
                user.hasPair = true

                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].email === friend) {
                        allUsers[i].userPairs.push(user.email)
                        allUsers[i].hasPair = true
                        break
                    }
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
        <button @click="shuffle()">Shuffle Pairs</button>
        <button @click="main.printMessage()">Print</button>
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
