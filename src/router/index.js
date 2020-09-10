// import Vue from 'vue'
// import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import userindex from '../components/userIndex.vue'
import admindex from '../components/admIndex.vue'
Vue.use(VueRouter)

  const routes = [
    { path:'/',redirect: '/login' },
    { path: '/login',component: Login },
    { path: '/userindex',component: userindex },
    { path: '/admindex',component: admindex },
  
]
  
const router = new VueRouter({
  routes
})

export default router
