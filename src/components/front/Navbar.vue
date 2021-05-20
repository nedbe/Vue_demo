<template>
  <div class="navbar_box">
    <div class="bg-navbarColor fixed-top">
      <nav class="navbar navbar-expand-sm navbar-dark container">
        <!-- Brand -->
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          ><img src="@/assets/images/logo.png" alt="logo" /><span>
            THE NAP STORE</span
          ></router-link
        >
        <!-- 購物車 -->
        <ul class="navbar-nav icon">
          <li class="nav-item mr-2">
            <router-link
              class="nav-link"
              href="#"
              title=""
              :to="{ name: 'Cart' }"
            >
              <i class="fas fa-shopping-cart"></i>
              <span
                class="badge badge-countColor badge-pill text-white count_num"
                >1</span
              >
            </router-link>
          </li>
        </ul>

        <!-- 漢堡選單 -->
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
              <div class="dropdown-menu bg-navbarColor">
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
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss" scoped>
$sm: 576px;
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

// 購物車icon位置與漢堡選單調整
.navbar {
  position: relative;
  .icon {
    position: absolute;
    right: -20px;
    @media (max-width: $sm) {
      right: 100px;
      top: 18px;
    }
    .count_num {
      position: absolute;
      top: -2px;
      right: 3px;
      animation-name: count_num;
      animation-duration: 1s;
      @media (max-width: $sm) {
        right: -3px;
      }
    }

    @keyframes count_num {
      0% {
        transform: scale(1, 1);
      }
      50% {
        transform: scale(1.2, 1.2);
      }
      100% {
        transform: scale(1, 1);
      }
    }
  }
}

// dropdown 樣式
.dropdown-menu {
  box-shadow: 3px 1px 12px rgba(0, 0, 0, 0.301);
  min-width: 8rem;
  border: 0;
  .dropdown-item {
    padding: 4px 8px;
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      color: #fff;
      background-color: #da471d;
    }
    &:active {
      background-color: #da471d;
    }
  }
}
</style>
