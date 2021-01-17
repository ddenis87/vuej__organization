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
    path: '/Table/TableOrganisations',
    name: 'Organizations',
    meta: { layout: 'Table' },
    component: () => import('@/views/Table/TableOrganisations.vue'),
  },
  {
    path: '/Organisations',
    name: 'Organizations',
    meta: { layout: 'Table' },
    component: () => import('@/components/TTables/TableOrganisations.vue'),
  },
  {
    path: '/Table/TableBudgetClassifications',
    name: 'BudgetClassifications',
    meta: { layout: 'Table' },
    component: () => import('@/views/Table/TableBudgetClassifications.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
