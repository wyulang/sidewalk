import api from './webapi';
export default {
  state: {

  },
  actions: {
    addTable (action,params) {
      return api.post(`/api/base/table`, params)
    },
    addDatabase (action,params) {
      return api.post(`/api/base/database`, params)
    },
    deleteTable (action,params) {
      return api.post(`/api/base/delete-table`, params)
    },
  },
  mutations: {

  }
}