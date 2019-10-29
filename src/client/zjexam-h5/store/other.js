import api from './api';
const joy = {
  Url: api.env('joyred'), header: {
    'loginServer': api.env('loginServer')
  }
}
export default {
  state: {
    
  },
  actions: {
    getCollegesLevel({ state }, params) {
      return api.get(`/collegesLevel`, params, joy).then(res => {
        res.forEach(v => { v.select = false });
        api.session('collegesList', res);
      })
    },
    getArea({ state }, params) {
      return api.get(`/area`, params, joy).then(res => {
        res.forEach(v => { v.select = false });
        api.session('areaList', res);
      })
    },
    getDepartment({ state }, params) {
      let type = [null, null, 'QJP', 'RK', 'WS', 'XYH', 'DLYX', 'MBYX', 'GZGZ', true];
      let data = null;
      if (params == 1) {
        data = null
      } else if (params == 9) {
        data = { majorRank: true }
      } else {
        data = { which: type[params] }
      }
      return api.get(`/department`, data, joy).then(res => {
        api.session('departMentList', res.map(v => { return { title: v, select: false } }));
      })
    },
    getCollegeZYRankZys({ state }, params) {
      return api.get(`/collegeZYRankZy`, params, joy).then(res => {
        api.session('majorList', res.map(v => { return { title: v, select: false } }));
      })
    },
    getRankList({ }, data) {
      let toUrl = [,
        'collegeHomepage',// 获取院校网站详情
        'collegeBKRank',// 获取本科院校排行榜
        'collegeBKRank',// 获取本科院校排行榜
        'collegeBKRank',// 获取本科院校排行榜
        'collegeBKRank',// 获取本科院校排行榜
        'collegeIndepRank',// 获取独立院校100强
        'collegeMBRank',// 获取民办院校100强
        'collegeGZRank',// 获取高职高专院校排行榜
        'collegeZYRank', //// 获取学科专业排行榜,
        'collegeRKZYRank'
      ]
      return api.get(`/${toUrl[data.type]}`, data.params, joy);
    }
  },
  mutations: {

  }
}