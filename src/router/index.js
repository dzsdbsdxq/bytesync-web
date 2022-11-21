import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShareView from "@/views/ShareView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:code',
    name: 'share',
    component: ShareView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
