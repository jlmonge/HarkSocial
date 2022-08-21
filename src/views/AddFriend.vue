<script>
    // TODO:
    // You can't add yourself.
    // _ is already your friend.
    import RaisedButton from '../components/RaisedButton.vue'
    import NavBar from '../components/NavBar.vue';
    import { db } from '@/firebase'
    import { ref, onMounted } from 'vue'
    import { collection, query, where, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
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
                emailError: '',
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
                const isValid = String(this.email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                this.emailError = !isValid;
                if (!this.emailError) {
                    await this.checkAddedUser(this.email);
                }

                this.submitted = true;
            },
            async checkAddedUser(email) {
                // check if user exists
                const addeeRef = doc(db, "users", email);
                const addeeSnap = await getDoc(addeeRef);

                if (addeeSnap.exists()) {
                    console.log("Document data:", addeeSnap.data());

                    const auth = getAuth();
                    const currentUserEmail = auth.currentUser.email;
                    const adderRef = doc(db, "users", currentUserEmail);
                    const adderSnap = await getDoc(adderRef);
                    console.log("Document data:", adderSnap.data());
                    // check if users already friends
                    // coming soon
                    
                    // adds friend (if already friends, nothing)
                    await updateDoc(addeeRef, {
                        friendsList: arrayUnion(currentUserEmail)
                    });
                    await updateDoc(adderRef, {
                        friendsList: arrayUnion(email)
                    });

                    console.log("successfully added each other");
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
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