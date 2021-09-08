<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="cart mb-5">
      <div class="container">
        <div class="row mb-1">
          <div class="col">
            <h1 class="title text-center mt-3 text-mainColor">購物車</h1>
            <hr class="divider" />
          </div>
        </div>

        <div class="row">
          <div class="col-sm">
            <table class="table">
              <thead class="thead-dark">
                <tr class="text-center text-white">
                  <th
                    scope="col"
                    colspan="2"
                    class="font-weight-normal text-center"
                  >
                    商品名稱
                  </th>
                  <th scope="col" class="font-weight-normal text-sm-right">
                    單價
                  </th>
                  <th scope="col" class="font-weight-normal">數量</th>
                  <th
                    scope="col"
                    width="200"
                    class="d-none d-sm-table-cell font-weight-normal text-right"
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- 購物車無商品時顯示 -->
                <tr class="text-center" v-if="cart.length === 0">
                  <td colspan="6" class="align-middle text-secColor">
                    您尚未加入商品
                  </td>
                </tr>
                <!-- End 購物車無商品時顯示 -->
                <!-- 購物車商品 -->
                <tr
                  class="text-center"
                  v-for="(item, index) in cart"
                  :key="index"
                  v-show="cart.length > 0"
                >
                  <td class="align-middle">
                    <a href="#!" @click.prevent="deleteCartItem(item.id)"
                      ><i class="far fa-times-circle delete_icon"></i
                    ></a>
                  </td>
                  <td class="align-middle text-left p-0 p-sm-3">
                    <a
                      href="#!"
                      class="table__link"
                      @click.prevent="goToProductDetail(item.product_id)"
                    >
                      <img
                        :src="item.imageUrl"
                        alt="商品圖片"
                        class="table__img d-block d-sm-inline-block"
                      />
                      <span class="pl-sm-2 text-secColor">{{
                        item.title
                      }}</span>
                    </a>
                  </td>
                  <td class="align-middle text-right">
                    {{ item.price | currency }}
                  </td>
                  <td class="align-middle text-right text-sm-center">
                    <span class="input d-inline-block">
                      <input
                        type="button"
                        value="-"
                        class="input__button"
                        @click="addCartQty(-1, index)"
                      />
                      <input
                        type="text"
                        class="text-center input__number"
                        name="quantity"
                        :value="item.qty"
                        title="數量"
                        size="2"
                        maxlength="2"
                        @keyup="addCartQty(true, index, $event)"
                      />
                      <input
                        type="button"
                        value="+"
                        class="input__button"
                        @click="addCartQty(+1, index)"
                      />
                    </span>
                  </td>
                  <td class="align-middle d-none d-sm-table-cell text-right">
                    {{ (item.qty * item.price) | currency }}
                  </td>
                </tr>
                <!-- End 購物車商品 -->
                <tr v-show="cart.length > 0">
                  <td colspan="3" class="align-middle">總計</td>
                  <td
                    colspan="3"
                    class="align-middle text-right font-weight-bold"
                  >
                    {{ cartTotal | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="tfoot">
                <tr>
                  <td colspan="3" class="pl-0 pb-0">
                     <router-link
                      class="btn btn--baseSet btn-outline--secColor mr-3"
                      to="/products/all"
                      >前往商品區</router-link
                    >
                    <a
                      href="#!"
                      class="btn btn--baseSet btn--secColor"
                      @click.prevent="upateCart"
                      >更新購物車</a
                    >
                  </td>
                  <td colspan="3" class="text-right pr-0">
                    <button
                      href="#!"
                      class="btn btn--baseSet btn--mainColor"
                      @click.prevent="checkout"
                      v-if="cart.length > 0"
                    >
                      前往結帳
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import LoadingPage from '@/components/common/Loading_page.vue';

export default {
  name: 'Cart',
  components: {
    LoadingPage,
  },
  data() {
    return {
      // 購物車資料
      cart: [],
      // 暫存商品數量
      tempQty: 1,
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
      },
    };
  },
  computed: {
    // 計算購物車總額
    cartTotal() {
      const vm = this;
      // 加總商品金額
      let total = 0;
      vm.cart.forEach((item) => {
        total += item.qty * item.price;
      });
      return total;
    },
  },
  methods: {
    // 取得購物車列表
    getCart() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      // 從 localStorage取資料
      const data = JSON.parse(localStorage.getItem('cart'));
      // 如果有資料，則直接將資料存入
      if (data) {
        vm.cart = data;

        // 加總商品數量
        let total = 0;
        vm.cart.forEach((item) => {
          total += item.qty;
        });

        // 更新導覽列購物車數量
        vm.$bus.$emit('upateCartQty', total);

        // 關閉整頁讀取動畫
        setTimeout(() => {
          vm.status.pageIsLoading = false;
        }, 800);
      } else {
        vm.status.pageIsLoading = false;
      }
    },
    // 刪除購物車商品
    deleteCartItem(id) {
      const vm = this;

      // 找出要刪除的商品並刪除
      const deleteItem = vm.cart.findIndex((item) => item.id === id);
      vm.cart.splice(deleteItem, 1);
    },
    // 調整商品數量
    addCartQty(num, index, event) {
      const vm = this;
      // 如果是使用按鈕增減數量
      if (num !== true) {
        // 暫存傳入的當前商品數
        vm.tempQty = vm.cart[index].qty;
        // 將商品數量增減
        vm.tempQty += parseInt(num, 10);
      } else {
        // 如果是手動輸入數量
        // 將輸入內容其轉為數字
        vm.tempQty = parseInt(event.target.value, 10);
      }

      // 防止商品數變負數
      // 如果傳入商品數小於等於0 或 空白時
      if (vm.tempQty <= 0 || Number.isNaN(vm.tempQty)) {
        // 讓當商品數變為1
        vm.tempQty = 1;
      } else if (vm.tempQty > 99) {
        // 如果傳入商品數大於99
        // 讓商品數變為99
        vm.tempQty = 99;
      }
      // 存入當前數量
      vm.cart[index].qty = vm.tempQty;
    },
    // 更新購物車
    upateCart() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      // 將購物車存入localStorage
      new Promise((resolve) => {
        resolve(localStorage.setItem('cart', JSON.stringify(vm.cart)));
      }).then(() => {
        setTimeout(() => {
          // 關閉整頁讀取動畫
          vm.status.pageIsLoading = false;
        }, 800);
      });

      // 重新取得購物車資料
      vm.getCart();
    },
    // 結帳處理
    checkout() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      vm.$router.push({ name: 'Checkout' });
    },
    // 轉址到商品細節頁面
    goToProductDetail(productId) {
      this.$router.push({ path: `/product_detail/${productId}` });
    },
  },
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/_rwdMixin";

$secColor: #87775c;

// 頁面表頭
.cart {
  min-height: calc(100vh - 243px);
  margin: 76px auto 0px;
  padding-top: 25px;
  background-color: #fff;

  // 頁面標題
  .title {
    font-size: 28px;
    @include sm {
      font-size: 24px;
    }
  }

  // 分隔線
  .divider {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
}

.table {
  // 表格表頭底線
  th {
    @include sm {
      font-size: 14px;
    }
  }

  td {
    @include sm {
      font-size: 14px;
    }
  }

  // 商品超連結
  &__link {
    @include sm {
      color: $secColor;
      text-decoration: underline;
    }
    &:hover {
      color: $secColor;
    }
  }

  // 購物車圖片
  &__img {
    width: 100px;
    height: 80px;
    @include sm {
      width: 40px;
      height: 30px;
    }
  }

  .tfoot {
    // 最後一列表格線條
    tr {
      border-top: 2px solid #dee2e6;
    }

    // 按鈕大小
    .btn {
      @include sm {
        padding: 4px 12px;
      }
    }
  }
}
</style>
