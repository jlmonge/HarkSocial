<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <button type="button">{{ msg }}</button>
</template>

<style scoped>
button {
    background-color: black;
    color: white;
    font-size: 1.1em;
    border-width: 0;
    border-radius: 3em;
    padding: 1.5em 3.2em;
    letter-spacing: 0.1em;
    box-shadow: grey 1px 1px 1px;
    position: relative;
}

button:hover {
    background-color: rgb(61, 61, 61);
    cursor: pointer;
}
</style>