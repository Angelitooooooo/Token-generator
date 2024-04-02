import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function(to, from , next) {
  if(to.path =='/login'){
    if(store.state.isLoggin == false){
      next()
    }else{
      next()
    }
  }
  else{
    if(store.state.isLoggin == false){
      next("/login")
    }else{
      next()
    }
  }
})

export default router