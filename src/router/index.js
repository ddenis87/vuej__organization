import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Table/PageTable.vue'

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
    meta: { layout: 'Tableold' },
    component: () => import('@/views/Table/TableOrganisations.vue'),
  },
  {
    path: '/Table/TableBudgetClassifications',
    name: 'BudgetClassifications',
    meta: { layout: 'Tableold' },
    component: () => import('@/views/Table/TableBudgetClassifications.vue'),
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
