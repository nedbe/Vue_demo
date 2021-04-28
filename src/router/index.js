import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 當匹配不到網址時，跳轉首頁
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
