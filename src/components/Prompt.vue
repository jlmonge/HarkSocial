<script>
import { db } from '@/firebase'
import {doc,getDoc,setDoc,query,where,snapshotEqual,getDocs,collection,addDoc} from 'firebase/firestore'
 
export default {
  data() {

   return {
     prompts: [],
     prompt: null,
     readPrompts: null,
     promptID: null,
     savedPrompt:null
     };
 },

 methods: {
   async createPrompt() {
     if (this.prompt != null) {
       try {
 
         const date = new Date();
         let day = date.getDate();
         let month = date.getMonth() + 1;
         let year = date.getFullYear();
         let currentDate = `${month}-${day}-${year}`;
 
         const dRef = await addDoc(
           collection(db, 'prompts'),
           {
             date: currentDate,
             prompt: this.prompt,
           },
         );
       } catch(err) {
         console.error(err);
       }
     }
   },

   async displayPrompt(){

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;

    const pRef = collection(db,'prompts');

    let q = query(pRef, where('date', '==', currentDate));

    const allPrompts = []

      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            //allPrompts.push({...doc.data().prompt})
            var data = doc.data();
            this.savedPrompt = data.prompt;
        })
        });



    /*const List = await getDocs(q);

    List.forEach((e)=>{
      console.log(e.data())
    })*/

   }
   /*async readPrompt() {
     if (this.promptID != null) {
       try {
         const pRef = doc(db, 'prompts', this.promptID);
 
         const promptList = await getDoc(pRef);
 
         this.readPrompts = {
           id: promptList.id, ...promptList.data(),
         }
       } catch(err) {
         console.error(err);
       }
     }
   }*/
 }
}
</script>
 
<template>
 <div id="bars">
  
   <input type="text" v-model="prompt"/>
   <br>
   <button @click="createPrompt()">Create Prompt</button>
   <br>

   <button @click = "displayPrompt()">See Today's Prompt</button>

   <!--<template v-if="savedPrompt">
     <p>{{ savedPrompt.prompt || 'Check the Date' }}</p>
   </template>-->

   <h3>{{savedPrompt}}</h3>
 
 <!--
   <h3>Enter Today's Date for Today's Prompt</h3>
 
   <input type="text" v-model="promptID" placeholder="Eg: 1-23-2022" />
 
   <br>
 
   <button @click="readPrompt()">Look At Prompt</button>
 
   <template v-if="readPrompts">
     <p>{{ readPrompts.prompt || 'Check the Date' }}</p>
   </template>
   -->
 
 </div>
</template>

<style>

#bars{
    text-align: center;
}

</style>
