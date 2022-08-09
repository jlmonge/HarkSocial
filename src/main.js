import { createApp, h }from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import AudioVisual from 'vue-audio-visual'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AudioVisual)

app.mount('#app')
