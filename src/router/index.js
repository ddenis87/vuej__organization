import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { layout: 'Empty' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/Table/PageTable',
    name: 'PageTable',
    meta: { layout: 'Table' },
    component: () => import('@/views/Table/PageTable.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
