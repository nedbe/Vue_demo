<template>
  <div class="bg-mainColor fixed-top" id="nav">
    <nav
      class="navbar navbar-expand-lg navbar-dark container position-relative"
    >
      <!-- Logo -->
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        ><img src="@/assets/images/logo.png" alt="logo" class="logo" /><span>
          THE NAP STORE</span
        ></router-link
      >
      <!-- End Logo -->
      <!-- 購物車 -->
      <ul class="navbar-nav icon">
        <li class="nav-item mr-2">
          <router-link class="nav-link" :to="{ name: 'Cart' }">
            <i class="fas fa-shopping-cart"></i>
            <span
              class="badge badge-thirdColor text-white icon__cartQty"
              :class="{ cartQtyAnimation: cartIsLoading }"
              v-if="qty > 0"
              >{{ qty }}</span
            >
          </router-link>
        </li>
      </ul>
      <!-- End 購物車 -->
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
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-2">
            <router-link
              class="nav-link"
              data-toggle="collapse"
              data-target=".show.navbar-collapse"
              :to="{ name: 'Home' }"
              >首頁</router-link
            >
          </li>
          <li class="nav-item mr-2">
            <router-link
              class="nav-link"
              data-toggle="collapse"
              data-target=".show.navbar-collapse"
              to="/home/contact"
              >訂製&租借</router-link
            >
          </li>

          <!-- Dropdown -->
          <li class="nav-item dropdown mr-2">
            <a
              class="nav-link dropdown-toggle"
              :class="{ 'routerLink--active': active }"
              href="#"
              id="navbardrop"
              data-toggle="dropdown"
            >
              找商品
            </a>
            <div class="dropdown-menu bg-mainColor">
              <router-link
                class="dropdown-item mr-2"
                data-toggle="collapse"
                data-target=".show.navbar-collapse"
                to="/products/all"
                >全部商品</router-link
              >
              <router-link
                class="dropdown-item mr-2"
                data-toggle="collapse"
                data-target=".show.navbar-collapse"
                to="/products/beds"
                >床</router-link
              >
              <router-link
                class="dropdown-item mr-2"
                data-toggle="collapse"
                data-target=".show.navbar-collapse"
                to="/products/sofas"
                >沙發</router-link
              >
              <router-link
                class="dropdown-item mr-2"
                data-toggle="collapse"
                data-target=".show.navbar-collapse"
                to="/products/chairs"
                >椅子</router-link
              >
              <router-link
                class="dropdown-item mr-2"
                data-toggle="collapse"
                data-target=".show.navbar-collapse"
                to="/products/tables"
                >桌子</router-link
              >
            </div>
          </li>
          <!-- End Dropdown -->
        </ul>
      </div>
      <!-- End 漢堡選單 -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      // 購物車數量
      qty: 0,
      // 購物車數量變動動畫
      cartIsLoading: false,
      // 找商品連結點擊樣式
      active: false,
    };
  },
  methods: {
    // 顯示購物車商品數量
    showQty() {
      const vm = this;
      // 從 localStorage取瀏覽資料
      const data = JSON.parse(localStorage.getItem('cart'));
      // 如果有資料則加總商品數量並存入計算結果
      if (data) {
        let total = 0;
        data.forEach((item) => {
          total += item.qty;
        });
        vm.qty = total;
      } else {
        vm.qty = '';
      }

      // 顯示購物車數量動畫
      vm.cartIsLoading = true;
    },
    linkCss() {
      const vm = this;
      if (vm.$route.name === 'Products') {
        vm.active = true;
      } else {
        vm.active = false;
      }
    },
  },
  watch: {
    cartIsLoading() {
      setTimeout(() => {
        this.cartIsLoading = false;
      }, 1100);
    },
    $route() {
      const vm = this;
      if (vm.$route.name === 'Products') {
        vm.active = true;
      } else {
        vm.active = false;
      }
    },
  },
  created() {
    const vm = this;
    vm.linkCss();
    vm.showQty();

    // 使用 event bus跨組件溝通
    // 使用方式詳 '/bus.js'
    vm.$bus.$on('upateCartQty', () => {
      // 取得購物車數量
      vm.showQty();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/_rwdMixin";

// LOGO
.navbar-brand {
  display: flex;
  align-items: center;

  .logo {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
}

// 購物車icon位置與漢堡選單調整
.navbar {
  // 購物車icon
  .icon {
    position: absolute;
    right: -20px;
    @include sm {
      right: 90px;
      top: 18px;
    }
    @include md {
      right: 90px;
      top: 18px;
    }

    // 購物車數量icon
    &__cartQty {
      position: absolute;
      top: -5px;
      right: 0px;
      width: 20px;
      height: 20px;
      padding: 5px;
      border-radius: 100%;
      @include sm {
        right: -5px;
      }
      @include md {
        right: -8px;
      }
    }

    // 加入購物車動畫
    .cartQtyAnimation {
      animation-name: cartQtyAnimation;
      animation-duration: 1s;
    }
    @keyframes cartQtyAnimation {
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

// link 激活樣式
.router-link-exact-active {
  color: #fff !important;
}

.routerLink--active {
  color: #fff !important;
}
</style>
