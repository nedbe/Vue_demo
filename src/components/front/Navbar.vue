<template>
  <div class="bg-navbarColor fixed-top">
    <nav class="navbar navbar-expand-sm navbar-dark container">
      <!-- Brand -->
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        ><img src="@/assets/images/logo.png" alt="logo" /><span>
          THE NAP STORE</span
        ></router-link
      >

        <ul class="navbar-nav icon">
          <li class="nav-item mr-2">
            <a class="nav-link" href="#" title=""
              ><i class="fas fa-shopping-bag"></i
            ></a>
          </li>
        </ul>
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
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-2 active">
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
  // LOGO
  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
}

// 購物車icon位置與漢堡選單調整
.navbar {
  position: relative;
  .icon {
    position: absolute;
    right: -20px;

    @media (max-width: 576px) {
      right: 100px;
      top: 18px;
    }
  }
}

// dropdown 樣式
.dropdown-menu {
  box-shadow: 3px 1px 12px rgba(0, 0, 0, 0.301);
  .dropdown-item {
    &:active {
      background-color: #da471d;
    }
  }
}
</style>
