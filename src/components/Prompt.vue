<script>
import { db } from '@/firebase'
import {doc,getDoc,setDoc,query,where,snapshotEqual,getDocs,collection,addDoc} from 'firebase/firestore'
 
export default {
  name:"App",
  data() {

   return {
     prompts: [],
     prompt: null,
     readPrompts: null,
     promptID: null,
     savedPrompt:null
     };
 },

 beforeMount(){
  this.displayPrompt();
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

         const pRef = doc(db,'prompts',currentDate);

         await setDoc(pRef,{
          date:currentDate,
          prompt:this.prompt
         })
 
         /*const dRef = await addDoc(
           collection(db, 'prompts'),
           {
             date: currentDate,
             prompt: this.prompt,
           },
         );*/
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

      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            var data = doc.data();
            this.savedPrompt = data.prompt;
            })
        });
   }
 }
}
</script>
 
<template>
<div id="App"></div>
 <div id="bars">
  
   <input type="text" v-model="prompt"/>
   <br>
   <button @click="createPrompt()" id="promptButton">Create Prompt</button>
   <br>
   <p>{{prompt}}</p>
   <h1>{{savedPrompt}}</h1>

   <br>
 
 </div>
</template>

<style>

#promptButton{
  cursor: pointer;
  background-color: black;
  font-size: 15px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  border-radius: 15px;
  border-style: solid;
  padding:5px 5px 5px 5px
}

#promptButton:hover{
  background-color: gray;
  color: white;
}

#bars{
    text-align: center;
}

#todayPrompt{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

</style>
