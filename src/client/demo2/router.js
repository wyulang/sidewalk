import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routers = [
  {
    path: '/manage',
    name: "manage",
    level:1,
    component: () => import(/* webpackChunkName: "exam" */ './pages/manage/index.vue'),
    meta: {
      index: 0,
      title: '首页',
      icon:'iconhome',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/user',
    name: "user",
    level:2,
    component: () => import(/* webpackChunkName: "exam" */ './pages/index.vue'),
    meta: {
      index: 0,
      title: '用户管理',
      icon:'iconyonghu2',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/user/common',
    name: "user-common",
    pre:2,
    component: () => import(/* webpackChunkName: "exam" */ './pages/manage/common.vue'),
    meta: {
      index: 0,
      title: '普通用户',
      icon:'iconyonghu',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/user/manage',
    name: "user-manage",
    pre:2,
    component: () => import(/* webpackChunkName: "exam" */ './pages/index.vue'),
    meta: {
      index: 0,
      title: '后台管理员',
      icon:'iconguanliyuan',
      isHeader: 1,
      isFooter: 1,
    }
  },
  {
    path: '/net',
    name: "net",
    level:3,
    component: () => import(/* webpackChunkName: "exam" */ './pages/net.vue'),
    meta: {
      index: 0,
      title: '网站收集',
      icon:'iconwangzhan',
      isHeader: 1,
      isFooter: 1,
    }
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

export const menu=routers;

export default routerDefaut;