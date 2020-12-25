import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import "mand-mobile/components/_style/global.styl";
import "normalize.css";
import './assets/global.css'

Vue.config.productionTip = false
axios.defaults.baseURL = '/pospweb';
Vue.prototype.$axios = axios

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
