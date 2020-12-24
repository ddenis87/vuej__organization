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
    path: '/Tables/Organisation',
    name: 'Organization',
    meta: { layout: 'Tables' },
    component: () => import('@/views/Tables/Organisation.vue'),
  },
  {
    path: '/Tables/Bk',
    name: 'Bk',
    meta: { layout: 'Tables' },
    component: () => import('@/views/Tables/Bk.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
