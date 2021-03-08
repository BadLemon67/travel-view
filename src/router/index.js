import Vue from 'vue'
import VueRouter from 'vue-router'
import fLogin from '../components/fd-Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: fLogin
  },
  {
    path: '/', redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
