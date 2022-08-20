<script setup>
import RaisedButton from '../components/RaisedButton.vue'
import NavBar from '../components/NavBar.vue'
import { RouterLink } from 'vue-router'
import { uploadBytes, getStorage, ref } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import firebase from 'firebase/compat';

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
    let chunks = [];
    
    start.addEventListener('click', (ev)=>{
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    })
    stop.addEventListener('click', (ev)=>{
        mediaRecorder.stop();
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
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});
</script>

<template>
    <NavBar />
    <div class="prompt-row">
        <p class="prompt">Prompt: Count to 10 in random order</p>
    </div>
    <div class="record-row">
        <RouterLink :to="{ name:'home' }">
            <RaisedButton msg="Record now"></RaisedButton>
        </RouterLink>
    </div>

    <main>        
        <button id="btnStart">START RECORDING</button><br/>
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