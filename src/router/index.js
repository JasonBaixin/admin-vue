import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Home from '@/components/home/home'

import UserList from '@/components/user-list/user-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home', // home 组件会渲染到 App.vue 根组件中的 router-view中
      path: '/',
      component: Home, // 此处为cmoponent。
      children: [
        {
          name: 'user-list',
          path: '/users',
          components: UserList
        }
      ]
    }
  ]
})

// 1. 添加路由拦截器（导航钩子、守卫）
//    接下来所有的视图导航都必须经过这道关卡
//    一旦进入这道关卡，你得告诉路由守卫，
//    to 我要去哪里
//    from 我从哪儿来的
//    next 用来放行的
router.beforeEach((to, from, next) => {
  // 2.
  // 拿到当前请求的视图路径标识
  // 2.1 如果是登陆组件，则直接放行通过
  // 2.2 如果是非登陆组件，则检查 Token 令牌
  //    2.2.1 有令牌就过去
  //    2.2.2 无令牌，则让其登陆去
  if (to.name === 'login') {
    next()
  } else {
    // 检查登陆状态令牌
    const token = window.localStorage.getItem('admin-token')
    if (!token) { // 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 有令牌就允许通过
      next()
    }
  }
})

export default router
