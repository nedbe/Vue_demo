import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/front/Layout.vue';
import Home from '@/views/front/Home.vue';
import Products from '@/views/front/Products.vue';
import ProductDetail from '@/views/front/Product_detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 當匹配不到網址時，跳轉首頁
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/products',
        name: 'Products',
        component: Products,
      },
      {
        path: '/product_detail',
        name: 'Product_detail',
        component: ProductDetail,
      },
    ],
  },

];

const router = new VueRouter({
  routes,
});

export default router;
