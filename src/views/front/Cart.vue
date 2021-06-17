<template>
  <div>
    <!-- vue-loading -->
    <loading :active.sync="status.pageIsLoading">
      <div class="loadingio-spinner-dual-ball-mx4nrrd19pi">
        <div class="ldio-l6eq6mvdt0s">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </loading>

    <div class="cart_box">
      <div class="container">
        <div class="row mb-1">
          <div class="col">
            <h4 class="text-center mt-3 text-navbarColor">購物車</h4>
            <hr />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <table class="table table-hover">
              <thead class="thead-dark">
                <tr class="text-center text-white">
                  <th
                    scope="col"
                    colspan="2"
                    class="font-weight-normal text-left"
                  >
                    商品名稱
                  </th>
                  <th scope="col" class="font-weight-normal text-right">
                    單價
                  </th>
                  <th scope="col" class="font-weight-normal">數量</th>
                  <th
                    scope="col"
                    class="font-weight-normal text-right"
                    v-if="cart.total - cart.final_total > 0"
                  >
                    折扣
                  </th>
                  <th scope="col" v-else></th>
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
                  <td colspan="6" class="align-middle text-textColor">
                    您尚未加入商品
                  </td>
                </tr>

                <!-- 購物車商品 -->
                <tr
                  class="text-center"
                  v-for="item in cart.carts"
                  :key="item.id"
                  v-show="cart.final_total > 0"
                >
                  <td class="align-middle">
                    <a href="#!" @click.prevent="deleteCartItem(item.id)"
                      ><i class="far fa-times-circle delete_icon"></i
                    ></a>
                  </td>
                  <td class="align-middle text-left">
                    <a href="#!" class="product_link">
                      <img
                        :src="item.product.imageUrl"
                        alt="商品圖片"
                        class="cart_img"
                      />
                      <span class="pl-2 text-textColor">{{
                        item.product.title
                      }}</span>
                    </a>
                  </td>
                  <td class="align-middle text-right">
                    {{ item.product.price | currency }}
                  </td>
                  <td class="align-middle text-right text-sm-center">
                    <span class="input_group d-inline-block">
                      <input type="button" value="-" class="input_button" />
                      <input
                        type="number"
                        class="text-center input_number"
                        step="1"
                        min="1"
                        max="99"
                        name="quantity"
                        :value="item.qty"
                        title="數量"
                        size="2"
                        pattern="[1-9]{1}[0-9]{1}"
                      />
                      <input type="button" value="+" class="input_button" />
                    </span>
                  </td>
                  <td
                    class="align-middle text-right text-navbarColor"
                    v-if="item.total - item.final_total > 0"
                  >
                    -{{ (item.total - item.final_total) | currency }}
                  </td>
                  <td v-else></td>
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
                    <a href="#!" class="btn customize_btn btn_color"
                      >更新購物車</a
                    >
                  </td>
                  <td colspan="3" class="text-right pr-0">
                    <router-link
                      href="#!"
                      class="btn customize_btn btn_main_color"
                      :to="{ name: 'Checkout' }"
                      >前往結帳</router-link
                    >
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <!-- 折扣碼 -->
        <div class="row">
          <div class="col coupon">
            <p class="pb-1">
              有折扣碼嗎?
              <a
                class="coupon_link"
                data-toggle="collapse"
                href="#collapseCoupon"
                role="button"
                aria-expanded="false"
                aria-controls="collapseCoupon"
              >
                點此輸入
              </a>
            </p>

            <div class="input-group collapse pr-0" id="collapseCoupon">
              <input
                type="text"
                class="form-control"
                placeholder="請輸入折扣碼"
                aria-describedby="couponBtn"
                v-model.trim="coupon"
              />
              <div class="input-group-prepend">
                <button
                  class="btn customize_btn btn_color"
                  id="couponBtn"
                  @click="postCoupon"
                >
                  套用
                </button>
              </div>
            </div>
            <p class="text-danger mt-2" v-if="couponFeedBack !== ''">
              {{ couponFeedBack }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

export default {
  name: 'Cart',
  data() {
    return {
      // 購物車資料
      cart: {},
      // 折扣碼
      coupon: '',
      // 套用折扣碼訊息回饋
      couponFeedBack: '',
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
      // axios
      vm.$http.get(api).then((response) => {
        console.log(response.data);
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
      // axios
      vm.$http.delete(api).then((response) => {
        console.log(response.data);
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;
        // 重新取得購物車資料
        vm.getCart();
      });
    },
    // 折扣碼處理
    postCoupon() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      // 折扣碼傳送格式
      const coupon = {
        code: vm.coupon,
      };
      // axios
      vm.$http.post(api, { data: coupon }).then((response) => {
        console.log(response.data);
        // 如果套用成功
        if (response.data.success) {
          vm.couponFeedBack = '已成功套用折扣碼！';
        } else {
          vm.couponFeedBack = '折扣碼過期或輸入錯誤！';
        }
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;
        // 重新取得購物車資料
        vm.getCart();
      });
    },
    // 返回上一頁
    goBack() {
      this.$router.back();
    },
  },
  created() {
    // 進入時先取得訂單列表
    this.getCart();
    // 轉換頁面置頂
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
/* 引入 vue-loading套件自定義樣式 */
@import "@/assets/styles/scss/common/_loading";

// 引入 button 樣式
@import "@/assets/styles/scss/common/_button";

// 引入 input 樣式
@import "@/assets/styles/scss/common/_input";

$link_color: #87775c;

// 整個頁面
.cart_box {
  min-height: 100vh;
  margin: 70px auto 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #fff;
  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
}

// 表格表頭底線
.table {
  th {
    border-bottom: 0;
  }
}

// 最後一個表格線條
.last_tr {
  border-top: 2px solid #dee2e6;
}

// 購物車圖片
.cart_img {
  width: 100px;
  height: 80px;
}

// 商品超連結
.product_link {
  color: #000;
  &:hover {
    color: $link_color;
    // text-decoration: none;
  }
}

// 折扣碼相關樣式
.coupon {
  p {
    padding-left: 12px;
  }
  // 超連結
  .coupon_link {
    color: $link_color;
    &:hover {
      color: $link_color;
    }
  }
  .input-group {
    padding-right: 12px;
  }
}
</style>
