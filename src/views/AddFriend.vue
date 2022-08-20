<script>
    import RaisedButton from '../components/RaisedButton.vue'
    import NavBar from '../components/NavBar.vue';
    import db from '@/firebase'
    import { ref, onMounted } from 'vue'
    import { collection, getDocs } from 'firebase/firestore'

    export default {
        components: {
            RaisedButton,
            NavBar,
        },
        data() {
            return {
                email: '',
                emailError: '',
                submitted: false
            }
        },
        async created() { 
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.name, " => ", doc.data());
                });
        },
        methods: {
            handleSubmit: function() { // check data and submit to database
                //console.log(this.$refs.emailField.value);
                this.email = this.$refs.emailField.value;
                const isValid = String(this.email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                this.emailError = !isValid;
                if (!this.emailError) {
                    console.log('VALID!');
                }
                window.console.log('email:', this.email);
                this.submitted = true;
            },
        }
    }
</script>

<template>
    <NavBar></NavBar>
    <div id="wrapper">
        <h1>Add a friend!</h1>
        <input type="text" placeholder="Email" ref="emailField" id="email-box" required><br/>
        <RaisedButton @click="handleSubmit" msg="Add friend"></RaisedButton>
        <ol id="instructions">
            <li>Enter your friend's email address.</li>
            <li>They will be added as a friend if they have an account.</li>
        </ol>
        <div v-if="submitted"> <!-- doesn't work -->
            <p v-if="!emailError">{{ email }} has been added as a friend!</p>
            <p v-else-if="emailError && email.length > 0">{{ email }} could not be added as a friend</p>
            <p v-else>Please enter an email</p>
        </div>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
#wrapper {
    margin: 5vh 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#email-box {
    margin: 5vh 0;
}
#instructions {
    color: rgb(183, 183, 183);
    line-height: 2em;
}
</style>