<script setup>
import ConversationFeed from '@/components/ConversationFeed.vue'
import Prompt from '@/components/Prompt.vue'
import { addDoc, doc } from '@firebase/firestore';
import NavBar from '../components/NavBar.vue';
import { userStore } from '../stores/UserStore.js'
const main = userStore();

import { getFirestore, collection, getDocs, updateDoc, query, where } from '@firebase/firestore'
const db = getFirestore()
const userRef = collection(db, 'users')
const pairsRef = collection(db, 'pairs')
const pairCollection = query(collection(db, 'pairs'))
const friendsCollection = query(collection(db, 'friends'))
const allUsers = []
const allPairs = []

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


getDocs(pairsRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            allPairs.push({...doc.data(), id: doc.id})
        })

        console.log(allPairs)
    })
    .catch(err => {
        console.log(err.message)
    })


async function shuckle() {
    try {
        let finalPairs = new Map()
        for (const user of allUsers) {
            // Create array of user's friends
            let friendsList = []
            let paired = false
            let userPaired = false
            let pairExists = false
            let currentPairID
            let currentPair

            // Construct user's friendsList
            let friendsCollection1 = query(friendsCollection, where('user1', '==', user.email))
            const friendsQueryResponse1 = await getDocs(friendsCollection1)
            friendsQueryResponse1.forEach((responseItem) => {
                friendsList.push(responseItem.data().user2)
            })
            let friendsCollection2 = query(friendsCollection, where('user2', '==', user.email))
            const friendsQueryResponse2 = await getDocs(friendsCollection2)
            friendsQueryResponse2.forEach((responseItem) => {
                friendsList.push(responseItem.data().user1)
            })

            // Get the user's current pair
            let pairsCollection1 = query(pairsCollection, where('pair1', '==', user.email),
                                                            where('isPair', '==', true))
            const pairsResponse1 = await getDocs(pairsCollection1)
            if(!pairsResponse1.empty) {
                pairsResponse1.forEach((responseItem) => {
                    currentPairID = responseItem.id
                    currentPair = responseItem.data().pair2
                })
            }
            let pairsCollection2 = query(pairsCollection, where('pair2', '==', user.email),
                                                            where('isPair', '==', true))
            const pairsResponse2 = await getDocs(pairsCollection2)
            if(!pairsResponse2.empty) {
                pairsResponse2.forEach((responseItem) => {
                    currentPairID = responseItem.id
                    currentPair = responseItem.data().pair1
                })
            }

            // console.log('currentPair (responseItem): ' + currentPair)
            // console.log('currentPair.id: ' + currentPair.id)
            // console.log('currentPair.data(): ' + currentPair.data())
            // console.log('currentPair.data().id: ' + currentPair.data().id)
            //console.log(typeof currentPair.id)

            // Find a pairing for the user
            while ( !paired ) {
                // Assign the user a potential pair
                let random = Math.floor(Math.random() * user.friendsList.length)
                let potentialPair = friendsList[random]

                // Check if potential pair is the current pair
                if (potentialPair === currentPair) {
                    console.log('potential is current pair')
                    continue
                }

                // Check if the {user, potentialPair} already exists
                for (let i = 0; i < allPairs.length; i++) {
                    if ((allPairs[i].pair1 === user.email && allPairs[i].pair2 === potentialPair)) {
                        pairExists = true
                        // const currentPairRef = doc(db, 'pairs', currentPair.id)
                        // await updateDoc(currentPairRef, {
                        //         isPair: false
                        //     })
                        //continue pairingLoop
                    }
                    if ((allPairs[i].pair2 === user.email && allPairs[i].pair1 === potentialPair)) {
                        pairExists = true
                        // const currentPairRef = doc(db, 'pairs', currentPair.id)
                        // await updateDoc(currentPairRef, {
                        //         isPair: false
                        //     })
                        //continue pairingLoop
                    }
                }

                console.log(user.email + ' and ' + potentialPair + ' is a potential pairing before map check')
                // Enters if {user, potentialPair} does not exist
                if ( !pairExists && !userPaired) {
                    finalPairs.forEach( (value, key) => {
                        // Check if the current user iteration has been paired already
                        if ( value === user.email ){
                            console.log(user.email + ' has already been paired with ' + key)
                            userPaired = true
                        }

                        //Check if the potential pair has been paired already
                        if (key === potentialPair) {
                            console.log('Potential Pair has been paired: '+ potentialPair + ' has already been paired with ' + value)
                            pairExists = true
                        }
                        if (value === potentialPair) {
                            console.log('Potential Pair has been paired: '+ potentialPair + ' has already been paired with ' + key)
                            pairExists = true
                        }
                    })
                    if ( !pairExists && !userPaired ) {
                        finalPairs.set(user.email, potentialPair)
                        paired = true
                    }
                }
                paired = true
            }
        }
        console.log(finalPairs)
        let turnFalse = []
        const pairRefResponse = await getDocs(collection(db, 'pairs'))
        pairRefResponse.forEach((responseItem) => {
            turnFalse.push(responseItem)
        })
        for(let i = 0; i < turnFalse.length; i++) {
            const currentPairRef = doc(db, 'pairs', turnFalse[i].id)
            await updateDoc(currentPairRef, {
                    isPair: false
                })
        }
            
        for (const [key, value] of finalPairs) {
            const pairReference = await addDoc(collection(db, 'pairs'),
                            {
                            isPair: true,
                            pair1: key,
                            pair2: value,
                            })
        }
    }
    catch(err) {
        console.log(err)
    }
}
async function checkPair(currentUser) {
    let usersPair = [];
    console.log("running getfriends")
    console.log(currentUser)
    currentUser = String(currentUser);
    let isUser1QuerySnapshot;
    let isUser2QuerySnapshot;
  let isUser1 = query(pairCollection,where('pair1', '==',currentUser), where('isPair','==',true));
  let isUser2 = query(pairCollection,where('pair2', '==', currentUser), where('isPair','==',true));


console.log('query successful')
console.log('attempt snapshot')
isUser1QuerySnapshot  = await getDocs(isUser1);
isUser2QuerySnapshot  = await getDocs(isUser2);

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
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
// async function shufflePairs() { 
//             try {
//                 for (const user of allUsers) {
//                     // const friendsCollection = query(collection(db, 'friends'))
//                     // const pairsCollection = query(collection(db, 'pairs'))
//                     // Empty friendsList for each user iteration
//                     let friendsList = []
//                     let paired = false

//                     // Create query to find user's friends in the case that user1 = user
//                     let friendsCollection1 = query(friendsCollection, where('user1', '==', user.email))
//                     const friendsQueryResponse1 = await getDocs(friendsCollection1)
//                     friendsQueryResponse1.forEach((responseItem) => {
//                         friendsList.push(responseItem.data().user2)
//                     })

//                     // Create query to find user's friends in the case that user2 = user
//                     let friendsCollection2 = query(friendsCollection, where('user2', '==', user.email))
//                     const friendsQueryResponse2 = await getDocs(friendsCollection2)
//                     friendsQueryResponse2.forEach((responseItem) => {
//                         friendsList.push(responseItem.data().user1)
//                     })
//                     // User's friendsList is complete
//                     //console.log(user.email + '\'s friendsList: ' + friendsList)

//                     let currentPair
//                     // Pair the user with a random friend
//                     while ( !paired ) {
//                         let random = Math.floor(Math.random() * user.friendsList.length)
//                         let potentialPair = friendsList[random]

//                         // Case that pair1 is the user and pair2 is the user's potential pair
//                         let checkPairQuery1 = query(pairsCollection, where('pair1', '==', user.email), 
//                                                                     where('pair2', '==', potentialPair))
//                         const checkPairQueryResponse1 = await getDocs(checkPairQuery1)

//                         // Enters if query is found and is the current user's pair
//                         if(!checkPairQueryResponse1.empty) {
//                             checkPairQueryResponse1.forEach((responseItem) => {
//                                 if(responseItem.data().isPair) {
//                                     currentPair = responseItem
//                                     console.log(user.email + '\'s current partner is: ' + currentPair.data().pair2)
//                                     console.log(currentPair.id)
//                                 }
//                             })
//                         }
                        
//                         // Case that pair2 is the user and pair1 is the user's potential pair
//                         let checkPairQuery2 = query(pairsCollection, where('pair2', '==', user.email), 
//                                                                     where('pair1', '==', potentialPair))
//                         const checkPairQueryResponse2 = await getDocs(checkPairQuery2)

//                         // Enters if query is found and is the current user's pair
//                         if(!checkPairQueryResponse2.empty) {
//                             checkPairQueryResponse2.forEach((responseItem) => {
//                                 if(responseItem.data().isPair) {
//                                     currentPair = responseItem
//                                     console.log(user.email + '\'s current partner is: ' + currentPair.data().pair1)
//                                     console.log(currentPair.id)
//                                 }
//                             })
//                         }

//                         // Enters if the {user, friend} pair does not exist in the pairs collection
//                         if (checkPairQueryResponse1.empty && checkPairQueryResponse2.empty) {
//                             console.log(user.email + ' and ' + potentialPair + ' is a new pairing in the collection')
//                             // addDoc and set the isPair field to true
//                             // const pairReference = await addDoc(
//                             //     collection(db, 'pairs'),
//                             //     {
//                             //     isPair: true,
//                             //     pair1: user.email,
//                             //     pair2: potentialPair,

//                             //     }
//                             // )
//                             // updateDoc(currentPair.id, {
//                             //     isPair: false
//                             // })
//                             console.log('Pairing: ' + user.email + ' and ' + potentialPair + ' is added')
//                             paired = true
//                         }

//                         // Enters if the {user, friend} pair exists in the pairs collection
//                         if (!checkPairQueryResponse1.empty){
//                             checkPairQueryResponse1.forEach((responseItem) => {
//                                 //console.log(user.email + '\'s current partner is: ' + currentPair)
//                                 if(responseItem.data().isPair === false && responseItem.data().pair2 == currentPair.data().pair2) {
//                                     console.log(responseItem.id)
//                                     // updateDoc and update isPair to true
//                                     // updateDoc(responseItem.id, {
//                                     //     isPair: true
//                                     // })
//                                     paired = true
//                                 }
//                             })
//                         }
//                         if (!checkPairQueryResponse2.empty){
//                             checkPairQueryResponse2.forEach((responseItem) => {
//                                 //console.log(user.email + '\'s current partner is: ' + currentPair)
//                                 if(responseItem.data().isPair === false && responseItem.data().pair1 == currentPair.data().pair1) {
//                                     console.log(responseItem.id)
//                                     // updateDoc and update isPair to true
//                                     // updateDoc(responseItem.id, {
//                                     //     isPair: true
//                                     // })
//                                     paired = true
//                                 }
//                             })
//                         }
//                         //paired = true
//                     }
//                 }
//             }
//             catch(err) {
//                 console.log(err)
//             }
//         }

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
//
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
        <button @click="shuckle()">Shuffle Pairs</button>
        <button @click="checkPair(main.email)">get friends</button>
        <button @click="main.printMessage()">Print</button>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
