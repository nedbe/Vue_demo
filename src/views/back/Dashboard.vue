<template>
  <div>
    <NavbarBack />
    <!-- <Alert></Alert> -->
        <!-- <Sidebar></Sidebar> -->
          <router-view></router-view>
  </div>
</template>

<script>
// import Sidebar from '../components/Sidebar';
import NavbarBack from '@/components//back/NavbarBack.vue';
// import Alert from '../components/AlertMessage';

export default {
  name: 'Dashboard',
  components: {
    // Sidebar,
    NavbarBack,
    // Alert,
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

<style lang="scss" scoped>
</style>
