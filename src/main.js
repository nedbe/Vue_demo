import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap';

import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

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

// vee-validate 規則與相關設定
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 語系
localize('zh_TW', TW);

// 全域註冊
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// 樣式
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// vue filter全域註冊
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
