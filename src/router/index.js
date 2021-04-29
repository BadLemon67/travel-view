import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Backstage from '../components/Backstage'
import Home from '../components/modules/Home'
import Scenic from '../components/modules/Scenic'
import Hotel from '../components/modules/Hotel'
import Route from '../components/modules/Route'
import Order from '../components/modules/Order'
import Feedback from '../components/modules/Feedback'
import Ad from '../components/modules/Ad'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/backstage',
    component: Backstage,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'scenic',
        name: 'scenic',
        component: Scenic
      },
      {
        path: 'hotel',
        name: 'hotelManager',
        component: Hotel
      },
      {
        path: 'route',
        name: 'route',
        component: Route
      },
      {
        path: 'order',
        name: 'orderManager',
        component: Order
      },
      {
        path: 'feedback',
        name: 'feedbackManager',
        component: Feedback
      },
      {
        path: 'ad',
        name: 'adManager',
        component: Ad
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
