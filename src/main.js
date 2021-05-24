import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

// vue filter
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

import App from './App.vue';
import router from './router';

// event bus
import './bus';

// 安裝 axios
Vue.use(VueAxios, axios);

// vue-loading-overlay全域註冊
Vue.component('Loading', Loading);

// vue filter全域註冊
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
