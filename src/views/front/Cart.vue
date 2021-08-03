<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="cart_box">
      <div class="container">
        <div class="row mb-1">
          <div class="col">
            <h1 class="h3 text-center mt-3 text-mainColor">購物車</h1>
            <hr />
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
                    class="d-none d-sm-table-cell font-weight-normal text-right"
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- 購物車無商品時顯示 -->
                <tr class="text-center" v-if="cart.final_total === 0">
                  <td colspan="6" class="align-middle text-secColor">
                    您尚未加入商品
                  </td>
                </tr>

                <!-- 購物車商品 -->
                <tr
                  class="text-center"
                  v-for="(item, index) in cart.carts"
                  :key="index"
                  v-show="cart.final_total > 0"
                >
                  <td class="align-middle">
                    <a href="#!" @click.prevent="deleteCartItem(item.id)"
                      ><i class="far fa-times-circle delete_icon"></i
                    ></a>
                  </td>
                  <td class="align-middle text-left p-0 p-sm-3">
                    <a
                      href="#!"
                      class="product_link"
                      @click.prevent="goToProductDetail(item.product_id)"
                    >
                      <img
                        :src="item.product.imageUrl"
                        alt="商品圖片"
                        class="cart_img d-block d-sm-inline-block"
                      />
                      <span class="pl-sm-2 text-secColor">{{
                        item.product.title
                      }}</span>
                    </a>
                  </td>
                  <td class="align-middle text-right">
                    {{ item.product.price | currency }}
                  </td>
                  <td class="align-middle text-right text-sm-center">
                    <span class="input_group d-inline-block">
                      <input
                        type="button"
                        value="-"
                        class="input_button"
                        @click="addCartQty(-1, index)"
                      />
                      <input
                        type="text"
                        class="text-center input_number"
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
                        class="input_button"
                        @click="addCartQty(+1, index)"
                      />
                    </span>
                  </td>
                  <td class="align-middle d-none d-sm-table-cell text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>

                <tr v-show="cart.final_total > 0">
                  <td colspan="3" class="align-middle">總計</td>
                  <td
                    colspan="3"
                    class="align-middle text-right font-weight-bold"
                  >
                    {{ cart.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="last_tr">
                  <td colspan="3" class="pl-0">
                    <a
                      href="#!"
                      class="btn customize_btn btn_outline_color mr-3"
                      @click.prevent="goBack"
                      >返回上一頁</a
                    >
                    <a
                      href="#!"
                      class="btn customize_btn btn_color"
                      @click.prevent="upateCart"
                      >更新購物車</a
                    >
                  </td>
                  <td colspan="3" class="text-right pr-0">
                    <router-link
                      href="#!"
                      class="btn customize_btn btn_main_color"
                      :to="{ name: 'Checkout' }"
                      v-if="cart.final_total > 0"
                      >前往結帳</router-link
                    >
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
      cart: {},
      // 暫存商品數量
      tempQty: 1,
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
      },
    };
  },
  methods: {
    // 取得購物車列表
    getCart() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        // 更新導覽列購物車數量
        vm.$bus.$emit('upateCartQty');

        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;

        // 存入購物車資料
        vm.cart = response.data.data;
      });
    },
    // 刪除購物車商品
    deleteCartItem(id) {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(() => {
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;
        // 重新取得購物車資料
        vm.getCart();
      });
    },
    // 調整商品數量
    addCartQty(num, index, event) {
      const vm = this;
      // 如果是使用按鈕增減數量
      if (num !== true) {
        // 暫存傳入的當前商品數
        vm.tempQty = vm.cart.carts[index].qty;
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
      vm.cart.carts[index].qty = vm.tempQty;
    },
    // 更新購物車
    upateCart() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      // 先將購物車刪除再重新加入
      vm.cart.carts.forEach((item) => {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
        vm.$http.delete(url).then(() => {
          // 後端格式
          const cart = {
            product_id: item.product_id,
            qty: item.qty,
          };
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          vm.$http.post(api, { data: cart }).then((res) => {
            // 如果新增購物車成功
            if (res.data.success) {
              // 重新取得購物車資料
              vm.getCart();
            }
          });
        });
      });
    },
    // 轉址到商品細節頁面
    goToProductDetail(productId) {
      this.$router.push({ path: `/product_detail/${productId}` });
    },
    // 返回上一頁
    goBack() {
      this.$router.back();
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
@import "@/assets/styles/scss/rwdMixin";

$secColor: #87775c;

// 整個頁面
.cart_box {
  min-height: 100vh;
  margin: 70px auto 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #fff;
  @include md {
    min-height: 85vh;
  }

  // 頁面標題
  h1 {
    @include sm {
      font-size: 24px;
    }
  }

  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
}

// 表格表頭底線
.table {
  th {
    border-bottom: 0;
    @include sm {
      font-size: 14px;
    }
  }

  td {
    @include sm {
      font-size: 14px;
    }
  }
}

// 表尾
tfoot {
  // 最後一個表格線條
  .last_tr {
    border-top: 2px solid #dee2e6;
  }

  // 按鈕大小
  a {
    @include sm {
      padding: 4px 12px;
    }
  }
}

// 購物車圖片
.cart_img {
  width: 100px;
  height: 80px;
  @include sm {
    width: 40px;
    height: 30px;
  }
}

// 商品超連結
.product_link {
  @include sm {
    color: $secColor;
    text-decoration: underline;
  }
  &:hover {
    color: $secColor;
  }
}
</style>
