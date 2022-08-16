<script>
    import ConversationFeed from '@/components/ConversationFeed.vue'
    import Prompt from '@/components/Prompt.vue'
    import NavBar from '../components/NavBar.vue';
    import { getFirestore,collection, getDocs, snapshotEqual } from '@firebase/firestore';
import { mapStores } from 'pinia';
import useEmailStore from '../stores/emailStore.js'   
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

        console.log(this.emailStore.email)

   export default{
    computed : {
        ...mapStores(useEmailStore)
    },
    }     
        
</script>

<template>
    <NavBar></NavBar>
    <div class="conversation">
        <Prompt></Prompt>
        <ConversationFeed></ConversationFeed>
    </div>
</template>
