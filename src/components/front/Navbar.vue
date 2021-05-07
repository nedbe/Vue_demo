<template>
  <div class="bg-warm fixed-top">
    <nav class="navbar navbar-expand-sm navbar-dark container">
      <!-- Brand -->
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        ><img src="@/assets/logo.png" alt="" /><span>
          THE NAP STORE</span
        ></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Links -->
        <ul class="navbar-nav ml-auto align-items-end">
          <li class="nav-item mr-2">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >首頁</router-link
            >
          </li>

          <!-- Dropdown -->
          <li class="nav-item dropdown mr-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbardrop"
              data-toggle="dropdown"
            >
              找商品
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item mr-2" href="#">床</a>
              <a class="dropdown-item mr-2" href="#">沙發</a>
              <a class="dropdown-item mr-2" href="#">椅子</a>
              <a class="dropdown-item mr-2" href="#">桌子</a>
            </div>
          </li>
          <li class="nav-item mr-2">
            <a class="nav-link" href="#" title="願望清單"
              ><i class="fas fa-heart"></i
            ></a>
          </li>
          <li class="nav-item mr-2">
            <a class="nav-link" href="#" title="購物車"
              ><i class="fas fa-shopping-bag"></i
            ></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  display: flex;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
  }
}
</style>
