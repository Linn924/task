// import Vue from 'vue'
// import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import userindex from '../components/userIndex.vue'
import admindex from '../components/admIndex.vue'

import allaccount from '../components/admin/allaccount.vue'
import usedaccount from '../components/admin/usedaccount.vue'
import frozendaccount from '../components/admin/frozendaccount.vue'
import adduser from '../components/admin/adduser.vue'
import modifypwd from '../components/admin/modifypwd.vue'
import allnews from '../components/admin/allnews.vue'
import addnews from '../components/admin/addnews.vue'

Vue.use(VueRouter)

  const routes = [
    { path:'/',redirect: '/login' },
    { path: '/login',component: Login },
    { path: '/userindex',component: userindex },
    { 
      path: '/admindex',
      redirect: '/allaccount',
      component: admindex,
      children:[
        {path:'/allaccount',component:allaccount},
        {path:'/usedaccount',component:usedaccount},
        {path:'/frozendaccount',component:frozendaccount},
        {path:'/modifypwd',component:modifypwd},
        {path:'/allnews',component:allnews},
        {path:'/addnews',component:addnews},
        {path:'/adduser',component:adduser},
      ] 
    },
  
]
  
const router = new VueRouter({
  routes
})

export default router
