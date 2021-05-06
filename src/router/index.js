import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 當匹配不到網址時，跳轉首頁
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/products',
  //   name: 'Products',
  //   component: Products,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
