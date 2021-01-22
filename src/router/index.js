import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { layout: 'Empty' },
    component: Login,
  },
  // {
  //   path: '/Table/TableOrganizations',
  //   name: 'Organizations',
  //   meta: { layout: 'Tableold' },
  //   component: () => import('@/views/Table/TableOrganizations.vue'),
  // },
  // {
  //   path: '/Table/TableBudgetClassifications',
  //   name: 'BudgetClassifications',
  //   meta: { layout: 'Tableold' },
  //   component: () => import('@/views/Table/TableBudgetClassifications.vue'),
  // },
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
