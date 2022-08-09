import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Conversation from '../views/Conversation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: Conversation
    }
  ]
})

export default router
