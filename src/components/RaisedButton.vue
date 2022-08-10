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
    padding: 1.6em 4.2em;
    letter-spacing: 0.1em;
    box-shadow: grey 1px 1px 1px;
    position: relative;
    animation: .25s button-dehover ease-out;
    animation-fill-mode: forwards;
}

button:active {
    background-color: rgb(61, 61, 61);
}

button:hover {
    animation: .25s button-hover ease-out;
    animation-fill-mode: forwards;
}

@keyframes button-dehover {
    from {
        box-shadow: grey 2px 5px 1px;
        bottom: 5px;
        right: 1px;
    } to {
        box-shadow: grey 1px 1px 1px;
        bottom: 0;
        right: 0;
    }
}

@keyframes button-hover {
    from {
        box-shadow: grey 1px 1px 1px;
        bottom: 0;
        right: 0;
    } to {
        box-shadow: grey 2px 5px 1px;
        bottom: 5px;
        right: 1px;
    }
}
</style>