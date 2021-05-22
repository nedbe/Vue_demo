<template>
  <div class="navbar_box">
    <div class="bg-navbarColor fixed-top">
      <nav class="navbar navbar-dark container">
        <!-- Brand -->
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          ><img src="@/assets/images/logo.png" alt="logo" /><span>
            THE NAP STORE</span
          ></router-link
        >

        <!-- Links -->
        <ul class="navbar-nav">
          <li class="nav-item mr-2">
            <a href="#!" class="nav-link" @click.prevent="signout">登出</a>
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
</style>
