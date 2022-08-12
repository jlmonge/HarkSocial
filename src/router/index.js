import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Conversation from '../views/Conversation.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import RecordView from '../views/RecordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/signin",
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: Conversation
    },
    {
      path: '/record',
      name: 'record',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecordView.vue'),
    }
  ]
});

export default router
