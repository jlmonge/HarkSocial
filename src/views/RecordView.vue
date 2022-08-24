<script setup>
import RaisedButton from '../components/RaisedButton.vue'
import NavBar from '../components/NavBar.vue'
import { RouterLink } from 'vue-router'
import { uploadBytes, getStorage, ref } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import firebase from 'firebase/compat';
import Prompt from '../components/Prompt.vue'

const today = new Date();
const date = `${today.getFullYear()}` + `${(today.getMonth() + 1)}` + `${today.getDate()}`;

const user = firebase.auth().currentUser.uid;
console.log(user);

const storage = getStorage();
const storageRef = ref(storage);
const userAudio = ref(storageRef, `${ user + date }`)

let constraintObj = { 
        audio: true, 
        video: false
}; 

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    //add listeners for saving video/audio
    let start = document.getElementById('btnStart');
    let stop = document.getElementById('btnStop');
    let audSave = document.getElementById('aud2');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    var countdown;
    let counter = 0;
    let chunks = [];
    
    start.addEventListener('click', (ev)=>{

        let timeleft = 9;

        counter ++;

        document.getElementById("attempts").innerHTML = "Attempts:" + counter;

        mediaRecorder.start();
        console.log(mediaRecorder.state);

        //countdowns time, stops recording when 10 seconds is reached, other wise displays countdown
        countdown = setInterval(function(){
           if(timeleft <= 0){
               clearInterval(countdown);
               document.getElementById("countdown").innerHTML = "Time's up!";
               mediaRecorder.stop();
           }
           else {
                   document.getElementById("countdown").innerHTML = timeleft + " seconds left";
                   }
           timeleft -= 1;
           }, 1000);

           //counts if event is clicked twice, if so the button is disabled, otherwise the user can still record until attempts are reached
        if(counter >= 2){
           start.setAttribute('disabled',true);
           document.getElementById("attempts").innerHTML = "Out of Attempts";

           //sets time to how long the user isn't able to record
           setTimeout(function(){
           start.removeAttribute('disabled');
           counter = 0;
           },5000);
       }


    })
    stop.addEventListener('click', (ev)=>{

        mediaRecorder.stop();

        // stops timer, resets when start is clicked again
       clearInterval(countdown);
       document.getElementById("countdown").innerHTML = "Recording Stopped";

        console.log(mediaRecorder.state);
    });

    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'audio/mpeg;' });
        uploadBytes(userAudio, blob).then((snapshot) => {
            console.log('blob uploaded')
        })
        chunks = [];
        let audioURL = window.URL.createObjectURL(blob);
        audSave.src = audioURL;
        document.getElementById("message").innerHTML = "File uploaded successfully";
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});
</script>

<template>
    <NavBar />
    <Prompt></Prompt>
    <div class="record-row">
        <RouterLink :to="{ name:'home' }">
            <RaisedButton msg="Record now"></RaisedButton>
        </RouterLink>
    </div>

    <main>        
        <button id="btnStart">START RECORDING</button><br/>
        <div id="countdown"></div>
        <div id="attempts"></div>
        <button id="btnStop">STOP RECORDING</button><br/>
        <audio id="aud2" controls></audio>
    </main>

</template>

<style scoped>
.prompt-row {
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}
.record-row {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>