import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'ListUser',
    path: '/user/list-user',
    component: () => import('@/pages/User.vue'),
  },
  {
    name: 'Flowbite',
    path: '/flowbite/component',
    component: () => import('@/pages/Flowbite.vue'),
  },
  ,
  {
    name: 'Home learn',
    path: '/home/learn',
    component: () => import('@/pages/learn_vuejs/Home.vue'),
    children: [
      { path: 'footer', component: () => import('@/pages/footer/footer.vue') }, 
    ]
  }
  , {
    name: 'About',
    path: '/about',
    component: () => import('@/pages/footer/footer.vue'),
    // children: [
    //   { path: 'profile', component: Profile },
    //   { path: 'settings', component: Settings }
    // ]
  }

]

let router = createRouter({
  history: createWebHistory('/Tutorial_Page'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
