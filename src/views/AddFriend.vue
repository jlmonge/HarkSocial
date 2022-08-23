<script>
    // TODO:
    // You can't add yourself.
    // _ is already your friend.
    import RaisedButton from '../components/RaisedButton.vue'
    import NavBar from '../components/NavBar.vue';
    import { db } from '@/firebase'
    import { ref, onMounted } from 'vue'
    import { collection, query, where, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
    import { ref as dbRef, child, get, getDatabase } from 'firebase/database'
    import { getAuth, onAuthStateChanged } from "firebase/auth"

    export default {
        components: {
            RaisedButton,
            NavBar,
        },
        data() {
            return {
                email: '',
                properlyFormattedEmail: '',
                canFriend: false,
                submitted: false
            }
        },
        async created() { 
            /*const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.name, " => ", doc.data());
            });*/
        },
        methods: {
            async handleSubmit() { // check data and submit to database
                this.email = this.$refs.emailField.value;
                this.properlyFormattedEmail = String(this.email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                if (this.properlyFormattedEmail) {
                    this.canFriend = await this.checkIfUserCanBeFriended(this.email);
                }

                this.submitted = true;
            },
            async checkIfUserCanBeFriended(addeeEmail) {
                // addee: friend being added
                // adder: user currently logged in

                // 1. specify doc of addee
                const addeeRef = doc(db, "users", addeeEmail);
                const addeeSnap = await getDoc(addeeRef);

                // 2. if addee exists, make a "friends" doc featuring both
                if (addeeSnap.exists()) {
                    const auth = getAuth();
                    const adderEmail = auth.currentUser.email;

                    await setDoc(doc(db, "friends", String(adderEmail + addeeEmail)), {
                        user1: addeeEmail,
                        user2: adderEmail,
                        status: "added"
                    });
                    return true;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Addee not found!");
                    return false;
                }
                
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
        <div v-if="submitted">
            <p v-if="properlyFormattedEmail && canFriend">{{ email }} has been added as a friend!</p>
            <p v-else-if="properlyFormattedEmail && !canFriend">{{ email }} cannot be added as a friend</p>
            <p v-else-if="!properlyFormattedEmail && email.length > 0">{{ email }} is an invalid email</p>
            <p v-else>Please enter an email</p>
        </div>
    </div>
</template>

<style scoped>
#wrapper {
    margin: 5vh 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#email-box {
    margin: 4vh 0;
    padding: 10px 20px;
    border-radius: 35px;
    width: 50%;
    font-size: 1.1em;
}
#instructions {
    color: rgb(183, 183, 183);
    line-height: 1.2em;
    padding: 2em 0 0 0;
}
</style>