import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import MyPublished from '../views/MyPublished'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-published',
    name: 'MyPublished',
    component: MyPublished,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

function loggedIn () {
  return !!localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn()) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!loggedIn()) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
