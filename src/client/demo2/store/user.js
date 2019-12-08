import api from './webapi';
const Base64 = require('js-base64').Base64;
export default {
  state: {

  },
  actions: {
    updateUser(action, params) {
      return api.post(`/api/user/update`, params)
    },
    getUserList(action, params) {
      return api.post(`/api/user/list`, params)
    },
    getUserDelete(action, params) {
      return api.post(`/api/user/delete`, params)
    },
    getUserLogin(action, params) {
      return api.post(`/api/user/login`, params, { header: { token: api.session('LOGINTIME') || ("===LOGIN#TIME@#1&0" + new Date().getTime()) } }).then(res => {
        if (res.token) {
          api.session('LOGINTIME', res.token);
        }
        return res;
      })
    },
  },
  mutations: {

  }
}