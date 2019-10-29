import Vue from 'vue'
import Vuex from 'vuex'
import other from './other';
import api from './api';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    other
  },
  state: {
    isFooter: true,
    isHeight: false,
    countDown: {
      title: '获取验证码',
      time: 60,
      disabled: false
    },
    userinfo: api.storage('userinfo'),
  },
  actions: {
    getSchoolList({ commit }, params) {
      let url = '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/2019schoolPlan.json?v=';
      return api.get('/api/version', null).then(res => {
        return api.get(url + res.message, null, { isUrl: 'empty' })
      })
    },
    getListTimeLineText(action, data) {
      return api.get('/api/timeLineText/listTimeLineText', data);
    },
    getNews(action, data) {
      return api.get('/api/news/page', data);
    },
    getNewsDetail({ }, params) {
      return api.get(`/api/news/info`, params)
    },
    getCaptcha({ }, params) {
      return api.post(`/api/person/captcha`, params)
    },
    getLogin(action, data) {
      let url = ['/api/unicom/login', '/api/person/login'];
      url = url[data.type];
      return api.post(url, data).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken);
          api.storage('userinfo', res.data);
          action.state.userinfo = res.data;
          action.state.accesstoken = res.data.accesstoken;
          // if (data.type == 1) {
          //   if (res.data.isValid == 0) {
          //     api.post('/api/person/checkValidUser', {})
          //   }
          //   宁波市必需购买VIP，验证
          // /api/person/checkNingBoUser
          // }
        }
        return res;
      })
    },
    getUserInfo(action, params) {
      return api.post(`/api/app/person/info`, params).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken);
          api.storage('userinfo', res.data);
          action.state.userinfo = res.data;
          action.state.accesstoken = res.data.accesstoken;
        }
        return res;
      })
    },
    //获学校
    getHighschoolList({ }, data) {
      return api.post('/api/highschool/list', data)
    },
    //猎取微信CODE
    getWxOpenidCode(action, data) {
      return api.post('/api/wx/openid/code', data).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken);
          api.storage('userinfo', res.data);
          action.state.userinfo = res.data;
          action.state.accesstoken = res.data.accesstoken;
        }
      })
    },
    saveUserinfo(action, params) {
      return api.post(`/api/person/info/save`, params).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken);
          api.storage('userinfo', res.data);
          action.state.userinfo = res.data;
          action.state.accesstoken = res.data.accesstoken;
        }
        return res;
      })
    },
    getRankAdvice({ }, params) {
      return api.post(`/api/person/rank/advice`, params)
    },
    getScoreAdvice({ }, params) {
      return api.post(`/api/person/score/advice`, params)
    },
    setScoreRank(action, params) {
      let url = [, '/api/person/scoreRank/save', '/api/app/info/art/save']
      return api.post(url[params.examType], params).then(res => {
        if (res.code == 20000) {
          let countType = 0;
          if (res.data.changeCount > 0 && res.data.subjectChangeCount > 0) {
            countType = 0;
          } else if (res.data.changeCount > 0) {
            countType = 1;
          }
          api.post(`/api/person/changecountandsubjectcount`, { type: countType }).then(res => {
            if (res.code == 20000) {
              action.dispatch('getUserInfo');
            }
          })
        }
        return res;
      })
    },
    getOrderList({ }, params) {
      return api.post(`/api/order/paid/list`, params)
    },
    saveOrder({ }, params) {
      return api.post(`/api/order/add`, params)
    },
    alipayWap({ }, params) {
      return api.post(`/api/order/pay/alipay/wap`, params)
    },
    saveOrderByWxH5({ }, params) {
      return api.post(`/api/order/pay/wx/h5`, params)
    },
    saveOrderByWx({ }, params) {
      return api.post(`/api/order/pay/wx/jsapi`, params)
    },
    orderByTrandeNo({ }, params) {
      return api.post(`/api/order/query/outtradeno`, params)
    },
    orderByOrderId({ }, params) {
      return api.post(`/api/order/query`, params)
    },
    zkJump({ }, params) {
      if (params) {
        params.retUrl = api.env('payUrl');
      }
      return api.post(`/zk/jump`, params)
    },
    zkCheck({ }, params) {
      return api.get(`/zk/check`, params)
    },
    getExpireTime({ }, params) {
      return api.get(`/api/searchExperience/expireTime`, params)
    },
    getArtCategory({ }, params) {
      return api.post(`/api/app/art/category`, params)
    },
    getCategoryList({ }, params) {
      return api.get(`/api/category/list`, params)
    },
    getCategory({ }, params) {
      return api.post(`/api/app/category`, params)
    },
    getResultByCategory({ }, params) {
      return api.post(`/api/app/search`, params)
    },
    getResult({ }, params) {
      return api.post('/api/person/getSearchInfo', params)
    },
    saveResult({ }, params) {
      return api.post('/api/person/saveSearchInfo', params)
    },
  },
  mutations: {
    setBarStatus(state, val) {
      state.isFooter = val.isFooter;
      state.isHeight = val.isHeight;
    },
    setOutLogin(state, data) {
      console.log('setOutLogin', 'setOutLogin')
      localStorage.removeItem('userinfo');
      localStorage.removeItem('accesstoken');
      state.userinfo = '';
      state.accesstoken = '';
    },
    setCountDown(state, val) {
      let time = val.time || 60;
      state.countDown = {
        title: `正在发送(${time})`,
        disabled: true
      }
      let timeOut = setInterval(() => {
        time--
        state.countDown.title = `正在发送(${time})`;
        state.countDown.disabled = true;
        if (time == 0) {
          clearInterval(timeOut);
          state.countDown = {
            title: '获取验证码',
            disabled: false
          }
          return false;
        }
      }, 1000)
    }
  }
})