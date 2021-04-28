import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

import App from './App.vue';
import router from './router';

// 安裝 axios
Vue.use(VueAxios, axios);
// 前端 cookie跨域設定
axios.defaults.withCredentials = true;

// vue-loading-overlay全域註冊
Vue.component('Loading', Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
