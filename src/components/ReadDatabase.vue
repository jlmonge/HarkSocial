<script setup>
    import { getFirestore,collection, getDocs, snapshotEqual } from '@firebase/firestore';
    import { getAuth , onAuthStateChanged} from '@firebase/auth'

    const db = getFirestore();
    const colRef = collection(db,'users')

    export function getUser() {
        getDocs(colRef)
        .then(snapshot) => {
            let allUsers =  []
            snapshotEqual.docs.forEach((doc)=>{
                allUsers.push({ ...doc.data() , id: doc.id})
            })
            console.log(allUsers)
        }
        .catch(err => {
            console.log(err.message)
        })
    }
    
</script>

<template>
  
</template>


<style scoped>

</style>