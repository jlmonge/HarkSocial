<script setup>
    //import AvBar from '../../node_modules/vue-audio-visual/src/components/AvBars'
    import { getDownloadURL, getStorage, ref } from "firebase/storage";
    import firebase from 'firebase/compat';
    import { userStore } from "../stores/UserStore";
    const storage = getStorage();
    const storageRef = ref(storage);
    const main = userStore()
    const today = new Date();
    const date = `${today.getFullYear()}` + `${(today.getMonth() + 1)}` + `${today.getDate()}`
    const user = main.email
    const friend = main.currentPair

    const userAudioRef = ref(storageRef, `${ user + friend }`)

    getDownloadURL(userAudioRef)
        .then((url) => {
            const audioControls = document.getElementById('vis')
            audioControls.setAttribute('src', url)
        })
        .catch((error) => {
            console.log(error)
        });
</script>

<template>
    <audio id="vis" src="" controls>
        <source type="audio/mpeg">
    </audio>
</template>


<style scoped>

</style>