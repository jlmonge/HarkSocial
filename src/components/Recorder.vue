<script>
//import { ReadStream } from 'tty';

//import { type } from 'os';


export default{

    data(){
        return{
            recorder:null,
            chunks: []
        }
    },

    methods:{
        startRecord(){
            
            navigator.mediaDevices.getUserMedia({audio:true}).then((stream) =>{

            this.recorder = new MediaRecorder(stream);

            this.recorder.ondataavailable = (e) =>{
                chunks.push(e.data)
            }

            if(this.recorder.state == "inactive"){
                const audio = document.createElement('audio');

                audio.controls = true;

                const audioData = new Blob(chunks,{type:"audio/wav"});

                const audioURL = window.URL.createObjectURL(audioData);

                audio.src = audioURL;
            }

            this.recorder.start();

            })
        },

        stopRecord(){
            this.recorder.stop();
        }
    }
}

</script>

<template>
<button @click="startRecord()">Record</button>
<button @click="stopRecord()">Stop Recording</button>
</template>


<style>
button{
    font-weight: bold;
}
</style>