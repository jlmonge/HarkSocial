<template>
<button id = "bttn1"></button>
</template>
<script>
let audio1 = new Audio();
    audio1.src = 'http://localhost:5174/src/assets/audio/jellyjam.mp3';
    const button1 = document.getElementById('bttn1');
    button1.addEventListener('click',function(){audio1.play();});
export default {
    

    data() {
        return {
        }
    }
}

</script>



<style scoped>
button {
    font-weight: bold;
}
</style>