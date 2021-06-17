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
                class="badge badge-countColor text-white count_num"
                :class="{ count_animation: cartIsLoading }"
                v-if="qty > 0"
                >{{ qty }}</span
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
                <router-link
                  class="dropdown-item mr-2"
                  href="#"
                  to="/products/all"
                  >全部商品</router-link
                >
                <router-link
                  class="dropdown-item mr-2"
                  href="#"
                  to="/products/beds"
                  >床</router-link
                >
                <router-link
                  class="dropdown-item mr-2"
                  href="#"
                  to="/products/sofas"
                  >沙發</router-link
                >
                <router-link
                  class="dropdown-item mr-2"
                  href="#"
                  to="/products/chairs"
                  >椅子</router-link
                >
                <router-link
                  class="dropdown-item mr-2"
                  href="#"
                  to="/products/tables"
                  >桌子</router-link
                >
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
  data() {
    return {
      // 購物車數量
      qty: 0,
      // 購物車數量變動動畫
      cartIsLoading: false,
    };
  },
  methods: {
    // 取得購物車資料
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // axios
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        // 如果取得資料成功
        if (response.data.success) {
          console.log('更新購物車數量成功');
          let total = 0;
          // 加總商品數量
          response.data.data.carts.forEach((item) => {
            total += item.qty;
          });
          // 存入計算結果並顯示
          vm.qty = total;
          // 顯示動畫
          vm.cartIsLoading = true;
        }
      });
    },
  },
  watch: {
    cartIsLoading() {
      setTimeout(() => {
        this.cartIsLoading = false;
      }, 1100);
    },
  },
  created() {
    const vm = this;
    // 取得購物車數量
    vm.getCart();

    // 使用 event bus跨組件溝通
    // 使用方式詳 '/bus.js'
    vm.$bus.$on('upateCartQty', () => {
      // 取得購物車數量
      vm.getCart();
    });
  },
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
      top: -5px;
      right: 0px;
      width: 20px;
      height: 20px;
      padding: 5px;
      border-radius: 100%;
      @media (max-width: $sm) {
        right: -3px;
      }
    }
    .count_animation {
      animation-name: count_animation;
      animation-duration: 1s;
    }
    @keyframes count_animation {
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
</style>
