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
        const AudioRef = ref(storageRef, `${ userPath }` + `${friendPath}`)
        let didWork = false;
        getDownloadURL(AudioRef)
            .then((url) => {
                const audioControls = document.getElementById('vis2')
                audioControls.setAttribute('src', url)
                didWork = true;
                console.log("got user audio")
            })
            .catch((error) => {
                console.log(error)
                didWork = false;
            });


</script>

<template>
    <audio id="vis2" src="" controls>
        <source type="audio/mpeg">
    </audio>
</template>


<style scoped>

</style>