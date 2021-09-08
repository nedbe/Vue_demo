<template>
  <div>
    <NavbarBack />
    <AlertMessage />
    <router-view></router-view>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import NavbarBack from '@/components/back/NavbarBack.vue';
import AlertMessage from '@/components/common/AlertMessage.vue';

export default {
  name: 'Dashboard',
  components: {
    NavbarBack,
    AlertMessage,
  },
  mounted() {
    $('body').removeClass('front');
  },
  created() {
    // 取出Cookie
    // myToken 從Layout.vue設定來的
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

    // 將 Token 加入 headers 以便在http請求中發送至後端驗證
    this.$http.defaults.headers.common.Authorization = `${myCookie}`;
  },
};
</script>
