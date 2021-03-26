import Vue from 'vue'
import VueRouter from 'vue-router'
import fLogin from '../components/fd-Login.vue'
import fSign from '../components/fd-Sign.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: fLogin
  },
  {
    path: '/sign', component: fSign
  },
  {
    path: '/', redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
