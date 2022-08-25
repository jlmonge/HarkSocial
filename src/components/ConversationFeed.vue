<script setup>
import AudioVisualizer from './AudioVisualizer.vue';
//import RecordButton from './RecordButton.vue';
import RaisedButton from './RaisedButton.vue';
import FriendAudio from './FriendAudio.vue'
import firebase from 'firebase/compat';
const user = firebase.auth().currentUser.email
import Prompt from './Prompt.vue'
import { userStore } from '../stores/UserStore';
import {ref} from 'vue'
const main = userStore();
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};
</script>

<template>
    <Prompt></Prompt>
    <button @click="forceRerender()">Refresh</button>
    <div id="conversation-feed">
        <div id="user1">
            <p>{{main.email}}</p>
            <AudioVisualizer :key="componentKey"></AudioVisualizer>
        </div>
        <RouterLink to="record">
            <RaisedButton msg="Record Now"></RaisedButton>
        </RouterLink>
        <div id="user2">
            <p>{{main.currentPair}}</p>
            <FriendAudio :key="componentKey"></FriendAudio>
        </div>
    </div>
</template>

<style scoped>
#conversation-feed {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #000000;
    border-radius: 1em;
    margin: 0 auto;
    width: 515px;
    height: 440px;
}

#user1{
    margin-top: 25px;
    padding-bottom: 40px;
}

#user1 p{
    margin: 0;
}

#user2{
    margin-bottom: 25px;
    padding-top: 40px;
}

#user2 p{
    margin: 0;
}
</style>