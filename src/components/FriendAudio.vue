<script setup>
    //import AvBar from '../../node_modules/vue-audio-visual/src/components/AvBars'
    import { getDownloadURL, getStorage, ref } from "firebase/storage";
    //import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    import firebase from 'firebase/compat';
    import { userStore } from "../stores/UserStore";
    // Create a reference with an initial file path and name
    //function getStorageAudio() {
        setTimeout(2000);
        const main = userStore();
        const storage = getStorage();
        const storageRef = ref(storage);
        const friendEmail = main.currentPair;
        // const today = new Date();
        // const date = `${today.getFullYear()}` + `${(today.getMonth() + 1)}` + `${today.getDate()}`
        // const user = firebase.auth().currentUser.uid

        const friendPath = String(main.currentPair)
        const userPath = String(main.email)
        const friendAudioRef = ref(storageRef, `${ friendPath }` + `${userPath}`)
        let didWork = false;
        getDownloadURL(friendAudioRef)
            .then((url) => {
                didWork = true;
                const audioControls = document.getElementById('vis3')
                audioControls.setAttribute('src', url)
                console.log("got pair audio")
            })
            .catch((error) => {
                console.log(error)
                didWork = false;
            });

</script>

<template>
    <audio id="vis3" src="" controls>
        <source type="audio/mpeg">
    </audio>

</template>


<style scoped>

</style>