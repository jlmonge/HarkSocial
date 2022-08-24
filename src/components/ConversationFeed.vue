<script setup>
import AudioVisualizer from './AudioVisualizer.vue';
//import RecordButton from './RecordButton.vue';
import RaisedButton from './RaisedButton.vue';
import FriendAudio from './FriendAudio.vue'
import { userStore } from '../stores/UserStore';
const main = userStore();
</script>

<template>
    <div id="conversation-feed">
        <div id="user1">
            <p>{{main.email}}</p>
            <AudioVisualizer></AudioVisualizer>
        </div>
        <RouterLink to="record">
            <RaisedButton msg="Record Now"></RaisedButton>
        </RouterLink>
        <div id="user2">
            <p>{{main.currentPair}}</p>
            <FriendAudio></FriendAudio>
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