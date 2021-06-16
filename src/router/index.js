




import Vue from 'vue'
import VueRouter from 'vue-router'

import Calender from '../views/Calender.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/calender',
    name: 'calender',
    component: Calender
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
