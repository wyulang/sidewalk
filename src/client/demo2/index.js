import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import mixins from './mixins';
import 'lib/vue-module.js';
Vue.mixin(mixins);
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
