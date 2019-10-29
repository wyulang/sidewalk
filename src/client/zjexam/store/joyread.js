import api from './webapi';
const joy = {
  Url: api.env('joyred'), header: {
    'loginServer': api.env('loginServer')
  }
}

export default {
  state: {

  },
  actions: {
    login({ }, params) {
      return api.get(`/login`, params, joy)
    },
    getSubject({ }, params) {
      return api.get(`/subject`, params, joy)
    },
    getCollegesLevel({ }, params) {
      return api.get(`/collegesLevel`, params, joy)
    },
    getArea({ }, params) {
      return api.get(`/area`, params, joy)
    },
    getBigMajorCategory({ }, params) {
      return api.get(`/bigMajorCategory`, params, joy)
    },
    getSmallMajorCategory({ }, params) {
      return api.get(`/smallMajorCategory`, params, joy)
    },
    getMajor({ }, params) {
      return api.get(`/major`, params, joy)
    },

    getDepartment({ }, params) {
      let type = [null, null, 'QJP', 'RK', 'WS', 'XYH', 'DLYX', 'MBYX', 'GZGZ', true,true];
      let data = null;
      if (params == 1) {
        data = null
      } else if (params == 9 || params==10) {
        data = { majorRank: true }
      } else {
        data = { which: type[params] }
      }
      return api.get(`/department`, data, joy)
    },
    getCollegeHomepage({ }, params) {
      return api.get(`/collegeHomepage`, params, joy)
    },
    getCollegeBKRank({ }, params) {
      return api.get(`/collegeBKRank`, params, joy)
    },
    getTopCollege({ }, params) {
      return api.get(`/topCollegesInfo`, params, joy)
    },
    getCollegeIndepRank({ }, params) {
      return api.get(`/collegeIndepRank`, params, joy)
    },
    getCollegeMBRank({ }, params) {
      return api.get(`/collegeMBRank`, params, joy)
    },
    getCollegeGZRank({ }, params) {
      return api.get(`/collegeGZRank`, params, joy)
    },
    getCollegeZYRank({ }, params) {
      return api.get(`/collegeZYRank`, params, joy)
    },
    getCollegeRKZYRank({ }, params) {
      return api.get(`/collegeRKZYRank`, params, joy)
    },
    getCollegeZYRankZy({ }, params) {
      return api.get(`/collegeZYRankZy`, params, joy)
    },
    getCheckValidUser({ }, params) {
      return api.post(`/api/person/checkValidUser`, params, joy)
    },
    getoldPhone({ }, params) {
      return api.post(`/api/changePhone/oldPhone`, params, joy)
    },
    getRankList({ }, data) {
      let type = data.type;
      let toUrl = [
        'collegeHomepage',// 获取院校网站详情
        'topCollegesInfo',
        'collegeBKRank',// 邱均平排行
        'collegeBKRank',// 软科排行
        'collegeBKRank',// 武书连排行
        'collegeBKRank',// 校友会排行
        'collegeIndepRank',// 获取独立院校100强
        'collegeMBRank',// 获取民办院校100强
        'collegeGZRank',// 获取高职高专院校排行榜
        'collegeZYRank', //// 获取学科专业排行榜,
        'collegeRKZYRank' //软科学科排行
      ]
      delete data.type;
      return api.get(`/${toUrl[type]}`, data, joy)
    }
  },
  mutations: {

  }
}