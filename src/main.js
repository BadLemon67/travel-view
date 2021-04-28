import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://8.142.20.7:8088/webserver'
axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, (error) => {
  Vue.$router.push('/login')
  alert('请登录')
  return Promise.reject(error)
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
