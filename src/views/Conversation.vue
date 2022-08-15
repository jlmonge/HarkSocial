<script setup>
    import ConversationFeed from '@/components/ConversationFeed.vue'
    import Prompt from '@/components/Prompt.vue'
    import NavBar from '../components/NavBar.vue';
    import { getFirestore,collection, getDocs, snapshotEqual } from '@firebase/firestore';
    const db = getFirestore();
    const colRef = collection(db,'users')
    
        getDocs(colRef)
        .then((snapshot) => {
            let allUsers = [];
            snapshot.docs.forEach((doc)=>{
                allUsers.push({ ...doc.data() , id: doc.id})
            })
            console.log(allUsers)
        })
        .catch(err => {
            console.log(err.message)
        })

        
        
</script>

<template>
    <NavBar></NavBar>
    <div class="conversation">
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
