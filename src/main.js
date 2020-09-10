// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

import './assets/global2.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
