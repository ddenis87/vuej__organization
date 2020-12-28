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
    path: '/Table/TableOrganisation',
    name: 'Organization',
    meta: { layout: 'Tables' },
    component: () => import('@/views/Table/TableOrganisation.vue'),
  },
  {
    path: '/Table/TableBudgetClassifications',
    name: 'BudgetClassifications',
    meta: { layout: 'Tables' },
    component: () => import('@/views/Table/TableBudgetClassifications.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
