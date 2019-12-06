import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const routers = [
  {
    path: '/login',
    name: "login",
    level: 3,
    component: () => import(/* webpackChunkName: "exam" */ './pages/login.vue'),
    meta: {
      index: 0,
      title: '登录',
      icon: 'iconwangzhan',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/manage',
    name: "manage",
    level: 1,
    component: () => import(/* webpackChunkName: "exam" */ './pages/manage.vue'),
    meta: {
      index: 0,
      title: '后台管理',
      icon: 'iconwangzhan',
      isHeader: 1,
      isFooter: 1,
    },
    children: [
      {
        path: '/manage/base',
        name: "manage-base",
        level: 2,
        component: () => import(/* webpackChunkName: "exam" */ './pages/manage/base.vue'),
        meta: {
          index: 0,
          title: '网站管理',
          icon: 'iconyonghu',
          isHeader: 1,
          isFooter: 1,
        }
      },
      {
        path: '/manage/common',
        name: "manage-common",
        level: 1,
        pre: 1,
        component: () => import(/* webpackChunkName: "exam" */ './pages/manage/common.vue'),
        meta: {
          index: 0,
          title: '后台管理员',
          icon: 'iconyonghu',
          isHeader: 1,
          isFooter: 1,
        }
      },
    ]
  },
]

const routerDefaut = new Router({
  routes: routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export const menu = routers;

export default routerDefaut;