
import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';
import configs from 'lib/config.js';
Vue.use(Router)

/* webpackChunkName: "group-foo" */
const examType = configs.type;
const examTitle = [, '金榜题名', '浙考一点通新高考志愿填报服务平台'][examType];

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
			index: 0,
			title: examTitle,
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/new/detail/:id',
		name: "newDetail",
		component: () => import('./pages/newDetail.vue'),
		meta: {
			index: 0,
			title: "新闻详情",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/baike/:id',
		name: "baike",
		component: () => import('./pages/baike.vue'),
		meta: {
			index: 0,
			title: "高考百科",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/school',
		name: "school",
		component: () => import('./pages/school/index.vue'),
		meta: {
			index: 0,
			title: "院校/专业排行",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/user',
		name: "user",
		component: () => import('./pages/user/index.vue'),
		meta: {
			index: 0,
			title: "个人中心",
			isHeader: 1,
			isFooter: 1,
		},
		children: [
			{
				path: '/user/info',
				name: "user-info",
				component: () => import('./pages/user/info.vue'),
				meta: {
					index: 0,
					title: "考生基本信息",
					isHeader: 1,
					isFooter: 1,
				}
			},
			{
				path: '/user/rank',
				name: "user-rank",
				component: () => import('./pages/user/rank.vue'),
				meta: {
					index: 0,
					title: "成绩与位次",
					isHeader: 1,
					isFooter: 1,
				}
			}, {
				path: '/user/order',
				name: "user-order",
				component: () => import('./pages/user/order.vue'),
				meta: {
					index: 0,
					title: "我的订单列表",
					isHeader: 1,
					isFooter: 1,
				}
			}
		]
	},
	{
		path: '/pay',
		name: "pay",
		component: () => import('./pages/pay/index.vue'),
		meta: {
			index: 0,
			title: "套餐购买",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/pay/success',
		name: "pay-success",
		component: () => import('./pages/pay/success.vue'),
		meta: {
			index: 0,
			title: "套餐购买",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/report',
		name: "report",
		component: () => import('./pages/report/index.vue'),
		meta: {
			index: 0,
			title: "志愿智能辅助报告",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/plan',
		name: "plan",
		component: () => import('./pages/plan/index.vue'),
		meta: {
			index: 0,
			title: "院校计划查询",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/plan/detail',
		name: "plan-detail",
		component: () => import('./pages/plan/detail.vue'),
		meta: {
			index: 0,
			title: "院校计划查询",
			isHeader: 0,
			isFooter: 0,
		}
	},
	{
		path: '/query/volunteer',
		name: "query-volunteer",
		component: () => import('./pages/query/volunteer.vue'),
		meta: {
			index: 0,
			title: "高考志愿查询系统",
			isHeader: 0,
			isFooter: 0,
			isHeight: 1,
		}
	},
	{
		path: '/query/curricula',
		name: "query-curricula",
		component: () => import('./pages/query/curricula.vue'),
		meta: {
			index: 0,
			title: "自主选课",
			isHeader: 0,
			isFooter: 0,
			isHeight: 1,
		}
	},
	{
		path: '/about',
		name: "about",
		component: () => import('./pages/about.vue'),
		meta: {
			index: 0,
			title: "金榜题名新高考志愿填报服务平台",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/sso/:token',
		name: "sso",
		component: () => import('./pages/login.vue'),
		meta: {
			index: 0,
			title: "金榜题名新高考志愿填报服务平台-单点登录",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/test',
		name: "test",
		component: () => import('./pages/test.vue'),
		meta: {
			index: 0,
			title: "金榜题名新高考志愿填报服务平台",
			isHeader: 1,
			isFooter: 1,
		}
	},
	{
		path: '/trinity',
		name: "trinity",
		component: () => import('./pages/trinity/index.vue'),
		meta: {
			index: 0,
			title: "三位一体",
			isHeader: 0,
			isFooter: 0,
			isHeight: 1,
		}
	},
	{
		path: '/trinity/analyze',
		name: "trinity-analyze",
		component: () => import('./pages/trinity/analyze.vue'),
		meta: {
			index: 0,
			title: "三位一体-面试题解析",
			isHeader: 0,
			isFooter: 1,
		}
	},
	{
		path: '/trinity/questions',
		name: "trinity-questions",
		component: () => import('./pages/trinity/questions.vue'),
		meta: {
			index: 0,
			title: "三位一体-面试题",
			isHeader: 0,
			isFooter: 1,
		}
	},
	{
		path: '/trinity/questions/detail',
		name: "trinity-questions-detail",
		component: () => import('./pages/trinity/questions-detail.vue'),
		meta: {
			index: 0,
			title: "三位一体-面试题",
			isHeader: 0,
			isFooter: 1,
		}
	},
	{
		path: '/trinity/course',
		name: "trinity-course",
		component: () => import('./pages/trinity/course.vue'),
		meta: {
			index: 0,
			title: "三位一体-面试题解析",
			isHeader: 0,
			isFooter: 1,
		}
	},
	{
		path: '/trinity/course/detail',
		name: "trinity-course-detail",
		component: () => import('./pages/trinity/course-detail.vue'),
		meta: {
			index: 0,
			title: "三位一体-面试题解析",
			isHeader: 0,
			isFooter: 0,
			isHeight: 1,
		}
	},
]

const routerDefaut = new Router({
	// mode: 'history',
	routes: routers
})

routerDefaut.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	store.commit('setShowHeader', {
		isHeader: to.meta.isHeader,
		isFooter: to.meta.isFooter,
		isHeight: to.meta.isHeight,
	});
	setTimeout(() => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}, 200);
	next();
})

export default routerDefaut;

export const menus = routers;
