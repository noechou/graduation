import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/login/login')
// const Layout = () => import('@/views/layout/layout')
import Layout from '@/views/layout/layout'

const List = () => import('@/views/list/list')
const Edit = () => import('@/views/edit/edit')
const View = () => import('@/views/view/view')
const User = () => import('@/views/user/user')
const ChangePwd = () => import('@/views/admin/changepwd')

const Statis = () => import('@/views/statis/statis')
const Result = () => import('@/views/statis/result')
const crossAnalysis = () => import('@/views/statis/cross-analysis')
const SourceData = () => import('@/views/statis/source-data')

const Error = () => import('@/views/common/error/error')
const Complete = () => import('@/views/common/complete/complete')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/platform'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete
    },
    {
      path: '/view/:id',
      name: 'View',
      component: View
    },
    {
      path: '/platform',
      name: 'Platform Layout',
      component: Layout,
      redirect: '/platform/list',
      children: [
        {
          path: 'list',
          name: 'Naire List',
          component: List,
          meta: {requiresAuth: true}
        },
        {
          path: 'edit',
          name: 'Edit Question',
          component: Edit,
          meta: {requiresAuth: true}
        },
        {
          path: 'edit/:id',
          name: 'Edit Detail',
          component: Edit,
          meta: {requiresAuth: true}
        },
        {
          path: 'user',
          component: User,
          meta: {requiresAuth: true}
        },
        {
          path: 'admin',
          component: ChangePwd,
          meta: {requiresAuth: true}
        },
        {
          path: 'statis',
          name: 'Static',
          component: Statis,
          children: [
            {
              path: 'result/:id',
              name: '????????????',
              component: Result,
              meta: {requiresAuth: true}
            },
            {
              path: 'source/:id',
              name: '????????????',
              component: SourceData,
              meta: {requiresAuth: true}
            },
            {
              path: 'cross-analysis/:id',
              name: '????????????',
              component: crossAnalysis,
              meta: {requiresAuth: true}
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404??????',
      component: Error
    },
    {
      path: '*',
      name: '???????????????',
      redirect: '/404'
    }
  ]
})

// JWT ??????????????????????????? TOKEN ????????? localStorage ??????
// ????????????????????? {name} === to.name
router.beforeEach((to, from, next) => {
  // ?????? JWT Token
  if (to.meta.requiresAuth) {
    // ???????????????????????????????????????
    if (localStorage.getItem('JWT_TOKEN')) {
      // ?????????????????????token????????????
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
        // ??????????????????path????????????????????????????????????????????????
      })
    }
  } else {
    next()
  }
})

export default router
