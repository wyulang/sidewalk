import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Mint from 'mint-ui';
import 'amfe-flexible/index.js';
import conf from 'lib/config.js';
import { session, storages } from 'lib/storage.js';
Vue.prototype.session = session;
Vue.prototype.storage = storages;
Vue.prototype.$config=conf;
Vue.use(Mint);
new Vue({
  el:'#app',
  router,
  store,
  render: (h) => h(App),
})
