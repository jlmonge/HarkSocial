<script setup>
import RaisedButton from '../components/RaisedButton.vue'
import NavBar from '../components/NavBar.vue'
import { RouterLink } from 'vue-router'
import { uploadBytes, getStorage, ref } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat';
import Prompt from '../components/Prompt.vue'
import { userStore } from '../stores/UserStore';
const main = userStore();
const today = new Date();
const date = `${today.getFullYear()}` + `${(today.getMonth() + 1)}` + `${today.getDate()}`;
const pathName = main.email + main.currentPair;
const user = firebase.auth().currentUser.uid;
console.log(user);

const storage = getStorage();
const storageRef = ref(storage);
const userAudio = ref(storageRef, `${ pathName }`)

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

        document.getElementById("attempts").innerHTML = "Attempts: " + counter;

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
           document.getElementById("attempts").innerHTML = "Out of attempts";

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
            console.log('blob uploaded as:' + pathName)
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

    <main>   
        <Prompt></Prompt>
        <div id="countdown"></div>
        <div id="attempts"></div>
        <audio id="aud2" controls></audio>
        <div id="btn-row">
            <RaisedButton msg="Start Recording" id="btnStart"></RaisedButton><br/>
            <RaisedButton msg="Stop Recording" id="btnStop"></RaisedButton><br/>
        </div>
    </main>

</template>

<style scoped>
main {
    font-family: Barlow;

    display: flex;
    flex-direction: column;
    align-items: center;
}
#btn-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}
#aud2 {
    margin: 2vw 0 3vw 0;
}
#btn-row > * {
    margin: 0 1vw;
}
</style>