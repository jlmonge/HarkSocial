import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
<<<<<<< HEAD
import Conversation from '../views/Conversation.vue'
import Profile from '../views/Profile.vue'
=======
import RecordView from '../views/RecordView.vue'
>>>>>>> main

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
<<<<<<< HEAD
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: Conversation
=======
      path: '/record',
      name: 'record',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecordView.vue')
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/feed",
      component: () => import("../views/Feed.vue"),
>>>>>>> main
    }
  ]
});

export default router
