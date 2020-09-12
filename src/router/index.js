// import Vue from 'vue'
// import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import userindex from '../components/userIndex.vue'
import admindex from '../components/admIndex.vue'

// 管理员路由
import allaccount from '../components/admin/allaccount.vue'
import usedaccount from '../components/admin/usedaccount.vue'
import frozendaccount from '../components/admin/frozendaccount.vue'
import adduser from '../components/admin/adduser.vue'
import modifypwd from '../components/admin/modifypwd.vue'
import allnews from '../components/admin/allnews.vue'
import addnews from '../components/admin/addnews.vue'
import me from '../components/admin/me.vue'

// 用户路由
import transaction from '../components/user/transaction.vue'
import usermodifupwd from '../components/user/usermodifypwd.vue'
import userallnews from '../components/user/allnews.vue'
import userinformation from '../components/user/information.vue'
import save from '../components/user/save.vue'
import withdrawal from '../components/user/withdrawal.vue'
import transfer from '../components/user/transfer.vue'

Vue.use(VueRouter)

  const routes = [
    { path:'/',redirect: '/login' },
    { path: '/login',component: Login },
    { 
      path: '/userindex',
      component: userindex,
      children:[
        {path:'/userindex/transaction',component:transaction},
        {path:'/userindex/modifypwd',component:usermodifupwd},
        {path:'/userindex/allnews',component:userallnews},
        {path:'/userindex/information',component:userinformation},
        {path:'/userindex/save',component:save},
        {path:'/userindex/withdrawal',component:withdrawal },
        {path:'/userindex/transfer',component:transfer },
      ]},
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
        {path:'/me',component:me},
      ] 
    },
  
]
  
const router = new VueRouter({
  routes
})

export default router
