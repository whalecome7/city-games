import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScenicSpot from '../views/scenicSpot/index.vue'
import LotteryView from '../views/lottery/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/scenic-spots',
      name: 'ScenicSpot',
      component: ScenicSpot,
    },
    {
      path: '/lottery',
      name: 'LotteryView',
      component: LotteryView,
    }
  ]
} as any)

export default router
