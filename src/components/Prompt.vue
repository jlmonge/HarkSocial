<script>
import { db } from '@/firebase'
import {doc,getDoc,setDoc,} from 'firebase/firestore'
 
export default {
 data() {
   return {
     prompts: [],
     prompt: null,
     readPrompts: null,
     promptID: null,
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
 
         const docReference = await setDoc(
           doc(db, 'prompts',currentDate),
           {
             prompt: this.prompt,
           }
         );
       } catch(err) {
         console.error(err);
       }
     }
   },
 
   async readPrompt() {
     if (this.promptID != null) {
       try {
         const docReference = doc(db, 'prompts', this.promptID);
 
         const response = await getDoc(docReference);
 
         this.readPrompts = {
           id: response.id, ...response.data(),
         }
       } catch(err) {
         console.error(err);
       }
     }
   }
 }
}
</script>
 
<template>
 <div>
  
   <input type="text" v-model="prompt"/>
   <br>
   <button @click="createPrompt()">Create Prompt</button>
   <br>
 
   <h3>Enter Today's Date for Today's Prompt</h3>
 
   <input type="text" v-model="promptID" placeholder="Eg: 1/23/2022" />
 
   <br>
 
   <button @click="readPrompt()">Look At Prompt</button>
 
   <template v-if="readPrompts">
     <p>{{ readPrompts.prompt || 'Check the Date' }}</p>
   </template>
 
 </div>
</template>
