import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cocktails',
    name: 'cocktails',
    component: () => import('../views/CocktailsView.vue')
  },
  {
    path: '/nouveau-cocktail',
    name: 'create-cocktail',
    component: () => import('../views/CreateCocktailView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
   },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/ProfilView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router