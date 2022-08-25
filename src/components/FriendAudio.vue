<script setup>
    //import AvBar from '../../node_modules/vue-audio-visual/src/components/AvBars'
    import { getDownloadURL, getStorage, ref } from "firebase/storage";
    //import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    import firebase from 'firebase/compat';
    import { userStore } from "../stores/UserStore";
    const storage = getStorage();
    const storageRef = ref(storage);
    const main = userStore();
    // const today = new Date();
    // const date = `${today.getFullYear()}` + `${(today.getMonth() + 1)}` + `${today.getDate()}`
    // const user = firebase.auth().currentUser.uid

    const friendPath = main.currentPair

    const friendAudioRef = ref(storageRef, `${friendPath + main.email }`)

    getDownloadURL(friendAudioRef)
        .then((url) => {
            const audioControls = document.getElementById('vis2')
            audioControls.setAttribute('src', url)
        })
        .catch((error) => {
            console.log(error)
        });
</script>

<template>
    <audio id="vis2" src="" controls>
        <source type="audio/mpeg">
    </audio>
</template>


<style scoped>

</style>