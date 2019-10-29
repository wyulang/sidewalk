
import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';
import configs from 'lib/config.js';
Vue.use(Router);

/* webpackChunkName: "exam" */

const examType = configs.type;
const examTitle = [, '金榜题名', '浙考一点通志愿填报'][examType];

const routers = [
	{
		path: '/',
		name: "index",
		component: () => {
			if (examType == 1) {
				return import(/* webpackChunkName: "exam" */ './pages/index/index.vue');
			} else if (examType == 2) {
				return import(/* webpackChunkName: "exam" */ './pages/index/zjone.vue');
			}
		},
		meta: {
			bottom: 1,
			title: examTitle,
			history: 0
		}
	},
	{
		path: '/contact',
		name: "contact",
		component: () => import(/* webpackChunkName: "exam" */ './pages/contact.vue'),
		meta: {
			bottom: 1,
			title: "联系我们",
			history: 1
		}
	},
	{
		path: '/new/detail',
		name: "new-detail",
		component: () => import(/* webpackChunkName: "exam" */ './pages/news-detail.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 3
		}
	},
	{
		path: '/new/list',
		name: "new-list",
		component: () => import(/* webpackChunkName: "exam" */ './pages/news.vue'),
		meta: {
			bottom: 1,
			title: "新闻列表",
			history: 2
		}
	},
	{
		path: '/login',
		name: "login",
		component: () => import(/* webpackChunkName: "exam" */ './pages/login.vue'),
		meta: {
			bottom: 0,
			title: "用户登录",
			history: 1
		}
	}, {
		path: '/user',
		name: "user",
		component: () => import(/* webpackChunkName: "exam" */ './pages/user/index.vue'),
		meta: {
			bottom: 1,
			title: "我的",
			history: 1
		}
	}, {
		path: '/user/info',
		name: "user-info",
		component: () => {
			if (examType == 1) {
				return import(/* webpackChunkName: "exam" */ './pages/user/info.vue');
			} else if (examType == 2) {
				return import(/* webpackChunkName: "exam" */ './pages/user/oneInfo.vue');
			}
		},
		meta: {
			bottom: 0,
			title: "个人信息",
			history: 3
		}
	}, {
		path: '/user/rank',
		name: "user-rank",
		component: () => import(/* webpackChunkName: "exam" */ './pages/user/rank.vue'),
		meta: {
			bottom: 0,
			title: "我的成绩",
			history: 3
		}
	}, {
		path: '/user/order',
		name: "user-order",
		component: () => import(/* webpackChunkName: "exam" */ './pages/user/order.vue'),
		meta: {
			bottom: 1,
			title: "我的订单",
			history: 3
		}
	}, {
		path: '/pay',
		name: "pay",
		component: () => import(/* webpackChunkName: "exam" */ './pages/pay/index.vue'),
		meta: {
			bottom: 0,
			title: "套餐购买",
			history: 2
		}
	}, {
		path: '/pay/success',
		name: "success",
		component: () => import(/* webpackChunkName: "exam" */ './pages/pay/success.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 3
		}
	}, {
		path: '/query',
		name: "query",
		component: () => import(/* webpackChunkName: "exam" */ './pages/query/index.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 1
		}
	}, {
		path: '/query/step2',
		name: "query-step2",
		component: () => import(/* webpackChunkName: "exam" */ './pages/query/step2.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 2
		}
	}, {
		path: '/query/step3',
		name: "query-step3",
		component: () => import(/* webpackChunkName: "exam" */ './pages/query/step3.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 3
		}
	}, {
		path: '/query/step4',
		name: "query-step4",
		component: () => import(/* webpackChunkName: "exam" */ './pages/query/step4.vue'),
		meta: {
			bottom: 0,
			title: examTitle,
			history: 4
		}
	}, {
		path: '/plan',
		name: "plan",
		component: () => import(/* webpackChunkName: "exam" */ './pages/plan/index.vue'),
		meta: {
			bottom: 1,
			title: "院校计划查询",
			isHeight: 1,
			history: 1
		}
	}, {
		path: '/plan/about',
		name: "plan-about",
		component: () => import(/* webpackChunkName: "exam" */ './pages/plan/about.vue'),
		meta: {
			bottom: 1,
			title: "院校计划查询",
			history: 2
		}
	}, {
		path: '/school',
		name: "school",
		component: () => import(/* webpackChunkName: "exam" */ './pages/school/index.vue'),
		meta: {
			bottom: 0,
			title: "院校/专业排行榜",
			history: 1
		}
	}, {
		path: '/school/detail',
		name: "school-detail",
		component: () => import(/* webpackChunkName: "exam" */ './pages/school/detail.vue'),
		meta: {
			bottom: 0,
			title: "院校/专业排行榜",
			history: 2
		}
	},
	{
		path: '/oauth',
		name: "oauth",
		component: () => import(/* webpackChunkName: "exam" */ './pages/pay/oauth.vue'),
		meta: {
			bottom: 0,
			title: "授权",
			history: 2
		}
	}
]

const routerDefaut = new Router({
	// mode: 'history',
	routes: routers
})

routerDefaut.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	store.commit('setBarStatus', { isFooter: to.meta.bottom, isHeight: to.meta.isHeight });
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
	next();
})

export default routerDefaut;
export const menus = routers;
