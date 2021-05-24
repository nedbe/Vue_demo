import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
// 將$開頭給jquery使用
import $ from 'jquery';

import Layout from '@/views/front/Layout.vue';
import Home from '@/views/front/Home.vue';
import Products from '@/views/front/Products.vue';
import ProductDetail from '@/views/front/Product_detail.vue';
import Cart from '@/views/front/Cart.vue';
import Checkout from '@/views/front/Checkout.vue';

import Dashboard from '@/views/back/Dashboard.vue';
import ProductsList from '@/views/back/Products_list.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 當匹配不到網址時，跳轉首頁
    path: '*',
    redirect: '/home',
  },
  {
    // 路徑建議開頭不要大寫
    path: '/home',
    // 因有 children 還加 name,DevTools會跳警示訊息
    // name: 'Layout',
    component: Layout,
    children: [
      {
        // 沒寫路徑則為上層路徑'/'的預設頁面
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
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
      },
    ],
  },
  {
    path: '/admin',
    // 因有 children 還加 name,DevTools會跳警示訊息
    // name: 'Dashboard',
    component: Dashboard,
    // 進入此頁面前需要驗證
    meta: { requiresAuth: true },
    // 轉址到 '/admin/products_list'
    redirect: ProductsList,
    children: [
      {
        path: '/admin/products_list',
        name: 'Products_list',
        component: ProductsList,
        meta: { requiresAuth: true },
      },
    ],
  },

];

const router = new VueRouter({
  routes,
});

// 全局守衛
router.beforeEach((to, from, next) => {
  // console.log('to:', to, 'from:', from, 'next:', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      // 如果還是登入狀態則放行
      if (response.data.success) {
        next();
        // 登入modal關閉
        $('#loginModal').modal('hide');
      } else {
        // 登入modal開啟
        $('#loginModal').modal('show');
      }
    });
  } else {
    next();
  }
});

export default router;

// nedbe780112@gmail.com
