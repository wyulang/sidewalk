import Vue from 'vue'
import Vuex from 'vuex'
import joyread from './joyread';
import api from './webapi';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    joyread
  },
  state: {
    isVedio: {
      show: false,
      src: ""
    },
    countDown: {
      title: '获取验证码',
      time: 60,
      disabled: false
    },
    loadObj: {
      lock: true,
      target: null,
      text: '',
      spinner: 'spinner',
      background: 'rgba(255, 255, 255, 0.6)',
      customClass: 'loading'
    },
    isHeader: 1,
    isFooter: 1,
    isHeight: 0,
    countDown: {
      title: '获取验证码',
      time: 60,
      disabled: false
    },
    isLogin: false,
    userinfo: api.storage('userinfo')
  },
  actions: {
    getSimulationData({ }, data) {
      let url = [
        '',
        // '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/2019normal.json?v=',
        '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/normal20190918.json?v=',
        // '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/2019art.json?v='
        '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/art20190918.json?v='
      ]
      return api.get('/api/version', null).then(res => {
        return api.get(url[data.type || 0] + res.message, null, { isUrl: 'empty' })
      })
    },
    getSaveTrinityInfo(obj,data){
      return api.post('/api/trinity/saveTrinityInfo',data).then(res=>{
        if(res.code==20000){
          obj.dispatch('getUserInfo');
          api.post('/api/person/changecountandsubjectcount', { type: 3 });
        }
        return res;
      })
    },
    //留言
    getMessageBoard({ }, data) {
      return api.post('/messageBoard/save', data);
    },
    //留言
    getMessageBoardFind({ }, data) {
      return api.get('/messageBoard/find', data);
    },
    //三位一体查询结果
    getTrinitySearch({ }, data) {
      return api.get('/api/trinity/search', data);
    },
    //三位一体查询结果
    getUnicomLogin({ }, data) {
      return api.post('/wz/unicomLogin', data);
    },
    //三位一体查询结果
    getTrinitylistTrinityUniversity({ }, data) {
      return api.get('/api/trinity/listTrinityUniversity', data);
    },
    //三位一体查询结果
    getInterviewQuestionById({ }, data) {
      return api.get('/api/InterviewQuestionController/getInterviewQuestionById', data);
    },
    //三位一体查询结果
    getInterviewQuestionByUniversity({ }, data) {
      return api.get('/api/InterviewQuestionController/getInterviewQuestionByUniversity', data);
    },
    //三位一体查询结果
    findTrainingCourse({ }, data) {
      return api.get('/api/trainingCourse/findTrainingCourse', data);
    },
    //三位一体查询结果
    findExcellentCourse({ }, data) {
      return api.get('/api/trainingCourse/findExcellentCourse', data);
    },
    //三位一体查询结果
    findCourseByUniversiyIds({ }, data) {
      return api.get('/api/trainingCourse/findCourseByUniversiyIds', data);
    },
    //获取验证码
    getCaptcha({ }, data) {
      return api.post('/api/person/captcha', data);
    },
    //获取验证码
    getlistTimeLineText({ }, data) {
      return api.get('/api/timeLineText/listTimeLineText', data).then(res => {
        if (res.code == 20000) {
          let homepz = [];
          homepz.push(res.dt.home_page_lower.text);
          homepz.push(res.dt.scroll_bar.text);
          homepz.push(res.dt.search_right.text);
          api.storage('gobalText', homepz.join('|'));
        }
        return res;
      })
    },
    //检测用户是否为VIP
    getVip({ }, data) {
      return api.get('/api/person/vip', data);
    },
    //手机登录
    getPersonLogin({ }, data) {
      return api.post('/api/person/login', data)
    },

    getInfoSave(sto, data) {
      return api.post('/api/person/info/save', data).then(res => {
        if (res.code == 20000) {
          api.storage('userinfo', res.data);
          api.storage('accesstoken', res.data.accesstoken)
          sto.state.userinfo = res.data;
        }
        return res;
      });
    },

    toLogin(sto, data) {
      let sqData = {};
      if (data.type == 0) {//账号登录
        sqData.account = data.phone;
        sqData.password = data.captcha;
        return api.post('/api/unicom/login', sqData).then(res => {
          sto.state.isLogin = false;
          api.storage('userinfo', res.data);
          api.storage('accesstoken', res.data.accesstoken)
          sto.state.userinfo = res.data;
          return res;
        });
      } else {//手机号登录
        sqData.phone = data.phone
        sqData.captcha = data.captcha;
        return api.post('/api/person/login', sqData).then(res => {
          sto.state.isLogin = false;
          api.storage('userinfo', res.data);
          api.storage('accesstoken', res.data.accesstoken)
          sto.state.userinfo = res.data;
          let arr = [
            api.get('/api/changePhone/oldPhone'),// 你的原有手机号码将于isOverDate天后过期
            api.get('/api/person/unicomPhoneCheck') //您是联通用户，可通过充值100元话费免费领取VIP。
          ];
          return api.all(arr).then(v => {
            if (v[0].code == 20000) {
              res.data.isOverDate = parseInt(v.message) || 0;
            }
            if (v[1].code == 20000) {
              res.data.phoneCheck = true;
            }
            return res;
          })
        })
      }
    },

    //用户注册
    getRegisterNew({ }, data) {
      return api.post('/api/person/register/new', data)
    },
    getUnicomPhoneCheck({ }, data) {
      return api.get('/api/person/unicomPhoneCheck', data)
    },
    //订单预定
    getOrderAdd({ }, data) {
      return api.post('/api/order/add', data)
    },
    //获取支付信息
    getOrderPay({ }, data) {
      return api.post('/api/order/pay', data)
    },
    //使用优惠券
    getOrderCoupon({ }, data) {
      return api.post('/api/order/coupon', data)
    },
    //获取支付结果
    getOrderQuery({ }, data) {
      return api.post('/api/order/query', data)
    },
    //获取新的个人信息
    getUserInfo({ state }, data) {
      return api.post('/api/person/info', data).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken)
          api.storage('userinfo', res.data);
          state.userinfo = res.data;
        }
        return res;
      })
    },
    //创建报告
    getSurveyAdd({ }, data) {
      return api.post('/api/survey/add', data)
    },
    //保存问题
    getSurveyAnswer({ }, data) {
      return api.post('/api/survey/answer', data)
    },
    //更新进度
    getSurveyMark({ }, data) {
      return api.post('/api/survey/mark', data)
    },
    //获取问卷详情,获取报告信息,继续填报
    getSurveyOne({ }, data) {
      return api.post('/api/survey/one', data)
    },
    //获得JSON版本号
    getVersion({ }, data) {
      return api.post('/api/version', data)
    },
    //跳转查询
    getScoreRankSave({ state }, data) {
      return api.post('/api/person/scoreRank/save', data).then(res => {
        if (res.code == 20000) {
          api.storage('accesstoken', res.data.accesstoken)
          api.storage('userinfo', res.data);
          state.userinfo = res.data;
          if (res.data.changeCount > 0 && res.data.subjectChangeCount > 0) {
            api.post('/api/person/changecountandsubjectcount', { type: 0 });
          } else if (res.data.changeCount > 0) {
            api.post('/api/person/changecountandsubjectcount', { type: 1 });
          }
        }
        return res;
      })
    },
    //XXXXXXX
    getZkCheck({ }, data) {
      return api.get('/zk/check', data)
    },
    //xxxxxxxxx
    getUnicomPhoneCheck({ }, data) {
      return api.get('/api/person/unicomPhoneCheck', data)
    },
    //购买后跳转地址
    getPersonLogin({ }, data) {
      return api.post('/zk/jump', data)
    },
    //继续报表查询
    getUpdatesearchexperiencetimes(obj, data) {
      return api.post('/api/person/updatesearchexperiencetimes', data).then(res => {
        obj.dispatch('getUserInfo')
        return res;
      })
    },
    //xxxxxxxxx
    getPersonCaptchaTest({ }, data) {
      return api.post('/api/person/captcha/test', data)
    },
    //获取筛选条件请求
    getDataConditions({ }, data) {
      return api.post('/api/data/conditions', data)
    },
    //获取大学列表
    getDataUniversitys({ }, data) {
      return api.post('/api/data/universitys', data)
    },
    //获取省份
    getProvinceList({ }, data) {
      return api.post('/api/province/list', data)
    },
    //获取市
    getCityList({ }, data) {
      return api.post('/api/city/list', data)
    },
    //获取区
    getDistrictList({ }, data) {
      return api.post('/api/district/list', data)
    },
    //获学校
    getHighschoolList({ }, data) {
      return api.post('/api/highschool/list', data)
    },
    //保存联通的用户信息
    getPersonMailSaven({ }, data) {
      return api.post('/api/person/mail/save', data)
    },
    //获取体验用户免费时间
    getSearchpayIsfree({ }, data) {
      return api.post('/api/person/searchpay/isfree', data)
    },
    //留言列表
    getMessageBoardFind({ }, data) {
      return api.get('/messageBoard/find', data)
    },
    //保存留言
    getPersonLogin({ }, data) {
      return api.post('/messageBoard/save', data)
    },
    //首页美丽校园取学校列表
    getBeautifulschoolAll({ }, data) {
      return api.get('/api/beautifulschool/all', data)
    },
    //xxxxxxxxx
    getOrderLast({ }, data) {
      return api.get('/api/order/last', data)
    },
    //xxxxxxxxx
    getNewsAll({ }, data) {
      return api.get('/api/news/all', data)
    },
    //获取订单信息
    getSurveyList({ }, data) {
      return api.post('/api/survey/list', data)
    },
    //xxxxxxxxx
    getSurveyCopy({ }, data) {
      return api.post('/api/survey/copy', data)
    },
    //xxxxxxxxx
    getNewsDetail({ }, data) {
      return api.get('/api/news/info', data)
    },
    //xxxxxxxxx
    getPersonPreorder({ }, data) {
      return api.post('/api/person/preorder', data)
    },
    //下单
    getSurveySxpert({ }, data) {
      return api.post('/api/survey/expert', data)
    },
    //院校计划查询
    getSchoolPlanList({ commit }, params) {
      let url = '//86edu.oss-cn-hangzhou.aliyuncs.com/json/20181101/2019schoolPlan.json?v=';
      return api.get('/api/version', null).then(res => {
        return api.get(url + res.message, null, { isUrl: 'empty' })
      })
    },
    //下载表格
    getSchoolDownload({ }, data) {
      return api.post('/api/data/school/download', data)
    },
    //添加标记
    getSurveyMark({ }, data) {
      return api.post('/api/survey/mark', data)
    },
    //编辑个人信息请求
    getPersonEdit({ }, data) {
      return api.post('/api/person/edit', data)
    },
    //设置地址
    setAdress({ }, data) {
      let datas = require('./json/data-address.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //xxxxxxxxx
    getAreaSchool({ }, data) {
      let datas = require('./json/data-area-university.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //查询学校
    getSerchSchool({ }, data) {
      let datas = require('./json/data-university.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //xxxxxxxxx
    Plan({ }, data) {
      return api.get('http://image.iclass.cn/1498554230612data.json', null, { isUrl: 'empty' })
    },
    //获取问题列表
    getQuestionList({ }, data) {
      let datas = require('./json/answer.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //xxxxxxxxx
    getCharacter({ }, data) {
      let datas = require('./json/data-characters.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //xxxxxxxxx
    getDownSurvey({ }, data) {
      return api.get('/api/survey/report/' + data, {})
    },
    //请求当前服务阶段
    getSurveyTitle({ }, data) {
      return api.post('/api/survey/title', data)
    },
    //获取专业
    getSubHot({ }, data) {
      let datas = require('./json/data-category.json');
      return new Promise((succ, err) => {
        succ(datas);
      })
    },
    //搜索专业
    getSurveyCategory({ }, data) {
      return api.post('/api/survey/category', { name: '' })
    },
    //院校级别校验
    getSchoolLevelValid({ }, data) {
      return api.post('/api/survey/school/level/valid', data)
    },
    //院校专业校验
    getSchoolCategoryValid({ }, data) {
      return api.post('/api/survey/school/category/valid', data)
    },
    //搜索学校
    getSurveySchool({ }, data) {
      return api.post('/api/survey/school', data)
    },
    //获取喜欢的院校的城市推荐
    getSurveySchoolCitys({ }, data) {
      return api.post('/api/survey/school/citys', data)
    },
    //搜索城市
    getSurveyCitys({ }, data) {
      return api.post('/api/survey/citys', data)
    },
    //搜索城市
    getSurveyResultNew({ }, data) {
      return api.post('/api/survey/resultNew', data)
    },
    //获取报告结果
    getSurveyResult({ }, data) {
      return api.post('/api/survey/result', data)
    },
    //获取下载地址发起下载
    getCommonreportDownload({ }, data) {
      return api.post('/api/survey/commonreport/download', data)
    },
    //获取下载地址发起下载
    getReportDownload({ }, data) {
      return api.post('/api/survey/report/download', data)
    },
    //xxxxxxxxx
    getQueryDownload({ }, data) {
      var url = data.type == 1 ? '/api/data/download' : '/api/data/details/download';
      delete data.type;
      return api.post(url, data)
    },
    //获取学校详情
    getDataUniversity({ }, data) {
      return api.post('/api/data/university', data)
    },
    //获取专业数据
    getUniversityCategorys({ }, data) {
      return api.post('/api/data/university/categorys', data)
    },
    //xxxxxxxxx
    getDataSchools({ }, data) {
      return api.post('/api/data/schools', data)
    },
    //获取推荐信息
    getPersonShareIdList({ }, data) {
      return api.post('/api/person/shareId/list', data)
    },
    //xxxxxxxxx
    getProtocalDownload({ }, data) {
      return api.post('/api/protocal/download', data)
    },
    //验证王卡
    getUnicomKingcard({ }, data) {
      return api.post('/api/unicom/kingcard', data)
    },
    //购买大礼包
    getUnicomPersonSave({ }, data) {
      return api.post('/api/unicom/person/save', data)
    },
    //xxxxxxxxx
    getPersonCheckValidUser({ }, data) {
      return api.post('/api/person/checkValidUser', data)
    },
    //修改选课次数&成绩次数
    getChangecountandsubjectcount({ }, data) {
      return api.post('/api/person/changecountandsubjectcount', data)
    },
    //修改成绩修改剩余次数
    getChangecountUpdate({ }, data) {
      return api.post('/api/person/changecount/update', data)
    },
    //获取是否可以修改名次和位次
    getPersonChangecount({ }, data) {
      return api.post('/api/person/changecount', data)
    },
    //修改选课剩余次数
    getSubjectcountUpdate({ }, data) {
      return api.post('/api/person/subjectcount/update', data)
    },
    //估算位次号
    getRankAdvice({ }, data) {
      return api.post('/api/person/rank/advice', data)
    },
    //xxxxxxxxx
    getScoreAdvice({ }, data) {
      return api.post('/api/person/score/advice', data)
    },
    //获取订单信息
    getOrderPaidList({ }, data) {
      return api.post('/api/order/paid/list', data)
    },
    //获取订单信息
    wzPerson({ }, data) {
      return api.post('/wz/person/' + data, null)
    }
  },
  mutations: {
    setShowHeader(state, val) {
      state.isHeader = val.isHeader;
      state.isFooter = val.isFooter;
      state.isHeight = val.isHeight;
    },
    setVedio(state, val) {
      state.isVedio = val
    },
    setMenuShow(state, val) {
      state.isMenu = val
    },
    setUserinfo(state, val) {
      state.userinfo = val;
    },
    setOutLogin(state) {
      state.isLogin = true;
      state.userinfo = null;
      api.storage('userinfo', null, 'remore');
      api.storage('accesstoken', '', 'delete');
    },
    setShowLogin(state, val) {
      state.isLogin = val;
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