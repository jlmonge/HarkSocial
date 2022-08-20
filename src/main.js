import { createApp }from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'
import AudioVisual from 'vue-audio-visual'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AudioVisual)

app.mount('#app')