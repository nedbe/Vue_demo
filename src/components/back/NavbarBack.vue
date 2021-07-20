<template>
  <div class="navbar_box">
    <div class="bg-mainColor fixed-top">
      <nav class="navbar navbar-dark container">
        <!-- Brand -->
        <router-link class="navbar-brand mr-5" :to="{ name: 'Home' }"
          ><img src="@/assets/images/logo.png" alt="logo" /><span>
            THE NAP STORE</span
          ></router-link
        >
        <ul class="navbar-nav flex-row mr-auto">
          <li class="nav-item mr-5">
            <router-link class="nav-link" :to="{ name: 'Products_list' }">
              <i class="fas fa-boxes"></i> 產品列表
            </router-link>
          </li>
          <li class="nav-item mr-5">
            <router-link class="nav-link" :to="{ name: 'Order_list' }">
              <i class="far fa-list-alt"></i> 訂單列表
            </router-link>
          </li>
          <li class="nav-item mr-5">
            <router-link class="nav-link" :to="{ name: 'Coupons' }">
              <i class="fas fa-ticket-alt"></i> 優惠券
            </router-link>
          </li>
        </ul>

        <!-- Links -->
        <ul class="navbar-nav">
          <li class="nav-item mr-2">
            <a href="#!" class="nav-link" @click.prevent="signout"
              ><i class="fas fa-sign-out-alt"></i> 登出</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarBack',
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        // 如果登出成功返回首頁
        if (response.data.success) {
          vm.$router.push({ name: 'Home' });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// LOGO
.navbar-brand {
  display: flex;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
}

// link 激活樣式
.router-link-exact-active {
  color: #fff !important;
}
</style>
