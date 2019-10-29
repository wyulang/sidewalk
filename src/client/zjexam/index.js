import Vue from 'vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import Vuebar from 'vuebar';
import VueQriously from 'vue-qriously';
import configs from 'lib/config.js';
import { session, storages } from 'lib/storage.js';
Vue.prototype.$config=configs;
Vue.use(VueQriously);
Vue.use(Vuebar);
Vue.use(ElementUI);
let App = null;
if (configs.type == 1) {
  App = () => import(`./App.vue`);
} else {
  App = () => import(`./One.vue`);
}
Vue.prototype.session = session;
Vue.prototype.storage = storages;
Vue.prototype.href = configs.toHref

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if (module.hot) {
  module.hot.accept();
}
