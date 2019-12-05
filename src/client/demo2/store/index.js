import Vue from 'vue'
import Vuex from 'vuex';
import base from './base';
import user from './user';
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    base,
    user
  },
  state:{},
  actions:{},
  mutations:{}
});