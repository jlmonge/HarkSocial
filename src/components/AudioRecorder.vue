<template>
  <!-- Voice Record -->
  <div>
    <button @click="recordAudio()">
    Record
    </button>

    <button @click="stop()">
    Stop
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recorder: null,
      chunks: [],
      device: null,
      blobObj: null,
    };
  },

  created() {
    this.device = navigator.mediaDevices.getUserMedia({ audio: true });
  },
  methods: {
    
    recordAudio() {
      this.device.then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
          if (this.recorder.state === "inactive") {
            let blob = new Blob(this.chunks, { type: "audio/wav" });
            // save to blobObj
            this.blobObj = blob;
            this.chunks = [];
            // emit to parent
            this.$emit("send-audio", this.blobObj);
            this.blobObj = null;
          }
        };
        // start
        this.recorder.start();
      });
    },
    stop() {
      // stop
      this.recorder.stop();
    },
  },
};
</script>