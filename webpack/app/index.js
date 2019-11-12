import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Mint from 'mint-ui';
import 'amfe-flexible/index.js';
import mixins  from './mixins';
Vue.mixin(mixins);
Vue.use(Mint);
new Vue({
  el:'#app',
  router,
  store,
  render: (h) => h(App),
})
