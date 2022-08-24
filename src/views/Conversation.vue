<script setup>
import ConversationFeed from '@/components/ConversationFeed.vue'
import Prompt from '@/components/Prompt.vue'
import { doc } from '@firebase/firestore';
import NavBar from '../components/NavBar.vue';
import { userStore } from '../stores/UserStore.js'
const main = userStore();

import { getFirestore, collection, getDocs, getDoc, query, where, snapshotEqual } from '@firebase/firestore'
const db = getFirestore()
const userRef = collection(db, 'users')
// const friendsRef = collection(db, 'friends')
// const pairsRef = collection(db, 'pairs')
// let friendsCollection = query(collection(db, 'friends'))

const allUsers = []
// const allFriends = []
// const allPairs = []


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

// getDocs(friendsRef)
//     .then((snapshot) => {
//         snapshot.docs.forEach((doc) => {
//             allFriends.push({...doc.data(), id: doc.id})
//         })
//         console.log(allUsers)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

// getDocs(pairsRef)
//     .then((snapshot) => {
//         snapshot.docs.forEach((doc) => {
//             allPairs.push({...doc.data(), id: doc.id})
//         })
//         console.log(allUsers)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

const friendsCollection = query(collection(db, 'friends'))
const pairsCollection = query(collection(db, 'pairs'))

async function shufflePairs() { 
            try {
                for (const user of allUsers) {
                    // Empty friendsList for each user iteration
                    let friendsList = []
                    let paired = false

                    // Create query to find user's friends in the case that user1 = user
                    let friendsCollection1 = query(friendsCollection, where('user1', '==', user.email))
                    const friendsQueryResponse1 = await getDocs(friendsCollection1)
                    friendsQueryResponse1.forEach((responseItem) => {
                        friendsList.push(responseItem.data().user2)
                    })

                    // Create query to find user's friends in the case that user2 = user
                    let friendsCollection2 = query(friendsCollection, where('user2', '==', user.email))
                    const friendsQueryResponse2 = await getDocs(friendsCollection2)
                    friendsQueryResponse2.forEach((responseItem) => {
                        friendsList.push(responseItem.data().user1)
                    })
                    // User's friendsList is complete
                    //console.log(user.email + '\'s friendsList: ' + friendsList)

                    // Pair the user with a random friend
                    while ( !paired ) {
                        let random = Math.floor(Math.random() * user.friendsList.length)
                        let potentialPair = friendsList[random]

                        let checkPairQuery1 = query(pairsCollection, where('pair1', '==', user.email), 
                                                                    where('pair2', '==', potentialPair))
                        const checkPairQueryResponse1 = await getDocs(checkPairQuery1)

                        let checkPairQuery2 = query(pairsCollection, where('pair2', '==', user.email), 
                                                                    where('pair1', '==', potentialPair))
                        const checkPairQueryResponse2 = await getDocs(checkPairQuery2)

                        // Enters if the {user, friend} pair does not exist in the pairs collection
                        if (checkPairQueryResponse1.empty && checkPairQueryResponse2.empty) {
                            console.log(user.email + ' and ' + potentialPair + ' is a new pairing')
                        }
                        else {
                            
                            console.log(user.email + ' and ' + potentialPair + ' is a new pairing')
                        }
                        paired = true
                    }
                }
            }
            catch(err) {
                console.log(err)
            }
        }

// function shufflePairs() { 
//     allUsers.forEach(user => {
//         // Reset currentPair and friendsList for each user iteration
//         let currentPair = ''
//         friendsList = []
//         let paired = false
//         let nonexisting = true

//         // Find the friends of each user from the friends collection
//         for (let i = 0; i < allFriends.length; i++) {
//             if (user.email === allFriends[i].user1) {
//                 friendsList.push(allFriends[i].user2)
//             }
//             if (user.email === allFriends[i].user2) {
//                 friendsList.push(allFriends[i].user1)
//             }
//         }
//         //Find the user's current pair and set pairedBefore to true
//         for (let i = 0; i < allPairs.length; i++) {
//             if (user.email === allPairs[i].pair1 && allPairs[i].isPair) {
//                 currentPair = allPairs[i].pair2
//                 allPairs[i].pairedBefore = true
//             }
//             if (user.email === allPairs[i].pair2 && allPairs[i].isPair) {
//                 currentPair = allPairs[i].pair1
//                 allPairs[i].pairedBefore = true
//             }
//         }
//         console.log(user.email + '\'s current pair is: ' + currentPair)

//         // Pair these fuckers
//         while( !paired ) {
//             // Assign a random friend to be matched with the user
//             let random = Math.floor(Math.random() * user.friendsList.length)
//             let potentialPair = friendsList[random]

//             // Check if there is a non-existing potentialPair and user matching
//             // If so, addDoc that pairing
//             for(let i = 0; i < allPairs.length; i++) {
//                 if (user.email === allPairs[i].pair1 && allPairs[i].pair2 === potentialPair) {
//                     nonexisting = false
//                     continue
//                 }
//                 if (user.email === allPairs[i].pair2 && allPairs[i].pair1 === potentialPair) {
//                     nonexisting = false
//                     continue
//                 }
//             }
//             // if (nonexisting) {
//             //      addDoc when finished
//             // }
//             console.log(user.email + '\'s new pair is: ' + potentialPair)
//             paired = true
//         }
//     })
// }

// function shuffle() {
//     allUsers.forEach(user => {
//         // Indicate that the current friend has been paired with the user
//         // and that the user does not have a pair
//         user.previousPair.push(user.userPairs[0])
//         user.userPairs = []
//         user.hasPair = false

//         // This will run if the user has no pair
//         while(user.userPairs.length === 0) {
//             if (user.hasPair === true) { continue }
//             let random = Math.floor(Math.random() * user.friendsList.length)
//             if (user.friendsList[random] != undefined && user.previousPair.includes(user.friendsList[random])) {
//                 if (user.previousPair.length === user.friendsList.length) {
//                    user.previousPair = []
//                 }
//                 continue
//             }

//             let friend = user.friendsList[random]
            
//             if (user.hasPair === false) {
//                 user.userPairs.push(friend)
//                 user.hasPair = true
//             }
//             for (let i = 0; i < allUsers.length; i++) {
//                     if (allUsers[i].email === friend) {
//                         allUsers[i].userPairs.push(user.email)
//                         allUsers[i].hasPair = true
//                         break
//                     }
//             }
//             break
//         }
//     })
//     console.log(allUsers)
// }
</script>


<template>
    <NavBar></NavBar>
    <div class="conversation">
        <button @click="shufflePairs()">Shuffle Pairs</button>
        <button @click="main.printMessage()">Print</button>
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
