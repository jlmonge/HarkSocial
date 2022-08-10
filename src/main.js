import { createApp } from 'vue'
import { createPinia } from 'pinia'
import firebase from "firebase"
import App from './App.vue'
import router from './router'

import './assets/main.css'
/* firebase config */
const firebaseConfig = {
    apiKey: "AIzaSyAj1E_ptZEB26r2qR25sraU77pTgTfiqC4",
    authDomain: "all-talk-b0062.firebaseapp.com",
    projectId: "all-talk-b0062",
    storageBucket: "all-talk-b0062.appspot.com",
    messagingSenderId: "728826059551",
    appId: "1:728826059551:web:db74e82738fb3f16c46e2a"
  };

firebase.initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
