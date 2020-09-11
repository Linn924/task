// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

import './assets/css/global2.css'

axios.defaults.baseURL='http://127.0.0.1:8877/'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
