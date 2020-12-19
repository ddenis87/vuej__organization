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
    path: '/Register/Organization',
    name: 'RegisterOrganization',
    meta: { layout: 'Register' },
    component: () => import('@/views/Register/RegisterOrganization.vue'),
  },
  {
    path: '/Catalog/Bk',
    name: 'CatalogBk',
    meta: { layout: 'Catalog' },
    component: () => import('@/views/Catalog/CatalogBk.vue'),
  },
  {
    path: '/Register/Test',
    name: 'Test',
    meta: { layout: 'Register' },
    component: () => import('@/views/Register/Test.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
