import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/offers', component: () => import('./components/OffersPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router