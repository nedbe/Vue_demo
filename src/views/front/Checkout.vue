<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="checkout mb-5">
      <div class="container">
        <div class="row mb-1">
          <div class="col-12">
            <h1
              class="title text-center mt-3 mb-3 text-mainColor"
              v-if="status.is_paid === false"
            >
              結帳資料填寫
            </h1>
            <h1 class="title text-center mt-3 mb-3 text-mainColor" v-else>
              訂單已完成
            </h1>
            <hr class="divider" />
          </div>
        </div>

        <div class="row m-1 m-sm-0">
          <!-- 訂單詳情 -->
          <div class="col-12 col-lg-6 table pb-5 mb-0">
            <h2 class="subtitle text-center pt-3 pb-3">訂單詳情</h2>
            <table class="w-100">
              <thead>
                <tr class="text-center">
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
                    class="d-none d-sm-table-cell font-weight-normal text-right"
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr
                  class="text-center"
                  v-for="(item, index) in cart.carts"
                  :key="index"
                >
                  <td colspan="2" class="align-middle text-left">
                    <img
                      :src="item.product.imageUrl"
                      alt="商品圖片"
                      class="table__img"
                    />
                    <span
                      class="pl-2 text-secColor d-inline d-lg-table-cell d-xl-inline"
                      >{{ item.product.title }}</span
                    >
                  </td>
                  <td class="align-middle text-right">
                    {{ item.product.price | currency }}
                  </td>
                  <td class="align-middle">x{{ item.qty }}</td>
                  <td class="align-middle d-none d-sm-table-cell text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>

                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="2" class="align-middle">小計</td>
                  <td colspan="3" class="align-middle text-right">
                    {{ cart.total | currency }}
                  </td>
                </tr>

                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="2" class="align-middle text-mainColor">
                    優惠折扣
                  </td>
                  <td
                    colspan="3"
                    class="align-middle text-right text-mainColor"
                  >
                    -{{ (cart.total - cart.final_total) | currency }}
                  </td>
                </tr>

                <tr class="tbody__tr" v-if="cart.carts">
                  <td colspan="2" class="align-middle">總計</td>
                  <td
                    colspan="3"
                    class="align-middle text-right font-weight-bold"
                  >
                    {{ cart.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <!-- 折扣碼 -->
              <tfoot v-if="cart.carts">
                <tr v-if="status.is_paid === false">
                  <td colspan="5" class="coupon pl-0 pr-0 pb-4">
                    <p class="pl-2 pb-1">
                      有折扣碼嗎?
                      <a
                        class="coupon__link"
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
                        class="form-control coupon__input"
                        placeholder="請輸入折扣碼"
                        aria-describedby="couponBtn"
                        v-model.trim="coupon"
                      />
                      <div class="input-group-prepend">
                        <button
                          class="btn btn--baseSet btn--secColor coupon__input"
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
                  </td>
                </tr>
              </tfoot>
              <!-- End 折扣碼 -->
            </table>
          </div>
          <!-- End 訂單詳情 -->

          <!-- 收件人資訊 -->
          <div
            class="col-12 col-lg-6 mt-1 mt-lg-1"
            v-if="status.is_paid === false"
          >
            <h2 class="subtitle text-center pt-3 pb-3">收件人資訊</h2>
            <validation-observer v-slot="{ invalid }" ref="checkoutForm">
              <form class="checkout-form" @submit.prevent="submitCheckoutData">
                <div class="form-row checkout-form--pt">
                  <div class="form-group col-md">
                    <validation-provider
                      :rules="{
                        regex: /^[\u4E00-\u9FA5]{2,}$/,
                        required: 'required',
                      }"
                      v-slot="{ errors, classes }"
                    >
                      <label for="姓名"
                        >姓名 <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="姓名"
                        placeholder="請輸入姓名"
                        :class="classes"
                        v-model="checkoutData.user.name"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md">
                    <validation-provider
                      :rules="{ regex: /^09[0-9]{8}$/, required: 'required' }"
                      v-slot="{ errors, classes }"
                    >
                      <label for="聯絡電話"
                        >聯絡電話 <span class="text-danger">*</span></label
                      >
                      <input
                        type="tel"
                        class="form-control"
                        id="聯絡電話"
                        :class="classes"
                        placeholder="請輸入手機號碼"
                        v-model="checkoutData.user.tel"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="required|email"
                    v-slot="{ errors, classes }"
                  >
                    <label for="電子信箱"
                      >電子信箱 <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="電子信箱"
                      :class="classes"
                      placeholder="請輸入電子信箱"
                      v-model="checkoutData.user.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider
                    :rules="{
                      regex: /^[\u4E00-\u9FA5-0-9]{5,}$/,
                      required: 'required',
                    }"
                    v-slot="{ errors, classes }"
                  >
                    <label for="收件地址"
                      >收件地址 <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="收件地址"
                      :class="classes"
                      placeholder="請輸入收件地址"
                      v-model="checkoutData.user.address"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <label for="comments">訂單備註(選填)</label>
                  <textarea
                    class="form-control"
                    id="comments"
                    placeholder="例如: 運送時的特別註記。"
                    rows="2"
                    cols="5"
                    v-model="checkoutData.message"
                  ></textarea>
                </div>
                <div class="form-group">
                  <validation-provider
                    :rules="{
                      required: 'required',
                    }"
                  >
                    <label for="付款方式"
                      >付款方式 <span class="text-danger">*</span></label
                    >
                    <select
                      id="付款方式"
                      class="form-control"
                      v-model="checkoutData.payment_method"
                    >
                      <option value="" disabled selected>請選擇付款方式</option>
                      <option value="transfer">銀行轉帳</option>
                      <option value="credit_card">信用卡支付</option>
                    </select>
                  </validation-provider>
                </div>
                <div class="d-flex justify-content-between">
                  <a
                    href="#!"
                    class="btn btn--baseSet btn-outline--secColor"
                    @click.prevent="goBack"
                    >返回上一頁</a
                  >
                  <button
                    type="submit"
                    class="btn btn--baseSet btn--mainColor"
                    :disabled="invalid"
                  >
                    確認結帳
                  </button>
                </div>
              </form>
            </validation-observer>
          </div>
          <!-- End 收件人資訊 -->

          <!-- 訂單完成資訊 -->
          <div class="order col-12 col-lg-6" v-else>
            <div>
              <p class="h5 text-center text-secColor pt-3 pb-3">
                感謝您的訂購，如訂單有問題請與我們聯繫。
              </p>
              <ul>
                <li class="pt-3">
                  訂單編號：<span class="text-secColor pl-1">{{
                    order.orderId
                  }}</span>
                </li>
                <li class="pt-3">
                  訂單日期：<span class="text-secColor pl-1">{{
                    order.date | date
                  }}</span>
                </li>
                <li class="pt-3">
                  訂單金額：<span class="text-secColor pl-1">{{
                    order.total | currency
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- End 訂單完成資訊 -->
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
  name: 'Checkout',
  components: {
    LoadingPage,
  },
  data() {
    return {
      // 購物車資料
      cart: [],
      // 暫存購物車資料
      tempCart: [],
      // 折扣碼
      coupon: '',
      // 套用折扣碼訊息回饋
      couponFeedBack: '',
      // 結帳資料
      checkoutData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
        payment_method: '',
      },
      // 訂單資料
      order: {
        orderId: '',
        date: '',
        total: '',
      },
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
        // 判別結帳與付款頁面
        is_paid: false,
      },
    };
  },
  methods: {
    // 清除購物車以免有之前的資料
    cleanCart() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        // 暫存入購物車資料
        vm.tempCart = response.data.data;
        // 如果購物車API有資料
        if (vm.tempCart.carts.length > 0) {
          // 將購物車清空
          vm.tempCart.carts.forEach((item) => {
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
            vm.$http.delete(url).then();
          });

          vm.getCart();
        } else if (JSON.parse(localStorage.getItem('cart'))) {
          // 如果localStorage有資料
          vm.getCart();
        } else {
          vm.$router.push({ path: 'Home' });
        }
      });
    },
    // 取得購物車列表
    getCart() {
      const vm = this;
      // 從 localStorage取資料
      const data = JSON.parse(localStorage.getItem('cart'));
      // 如果有資料，則直接將資料存入
      if (data) {
        vm.cart = data;
      }

      // 將購物車資料送往後端API
      vm.cart.forEach((item) => {
        // 後端格式
        const cart = {
          product_id: item.product_id,
          qty: item.qty,
        };

        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        // 送出到後端後再取回確認資料無誤
        vm.$http.post(api, { data: cart }).then((response) => {
          if (response.data.success) {
            vm.$http.get(api).then((res) => {
              if (res.data.success) {
                // 關閉整頁讀取動畫
                vm.status.pageIsLoading = false;

                // 存入購物車資料
                vm.cart = res.data.data;
              }
            });
          }
        });
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
      vm.$http.post(api, { data: coupon }).then((response) => {
        // 如果套用成功
        if (response.data.success) {
          vm.couponFeedBack = '已成功套用折扣碼！';
        } else {
          vm.couponFeedBack = '折扣碼過期或輸入錯誤！';
        }

        // 重新取得購物車資料
        const cartAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.$http.get(cartAPI).then((res) => {
          if (res.data.success) {
            // 關閉整頁讀取動畫
            vm.status.pageIsLoading = false;

            // 存入購物車資料
            vm.cart = res.data.data;
          }
        });
      });
    },
    // 提交結帳資料
    submitCheckoutData() {
      const vm = this;

      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      // 存入要新增的訂單
      const order = vm.checkoutData;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      // vee-validate的api validate()
      vm.$refs.checkoutForm.validate().then((result) => {
        // 如果通過驗證
        if (result) {
          vm.$http.post(api, { data: order }).then((response) => {
            // 存入回傳之訂單資訊
            vm.order.orderId = response.data.orderId;
            vm.order.date = response.data.create_at;
            vm.order.total = response.data.total;
            // 將付款結果傳入後端
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.order.orderId}`;
            vm.$http.post(url).then((res) => {
              if (res.data.success) {
                // 關閉整頁讀取動畫
                vm.status.pageIsLoading = false;

                // 切換成付款後畫面
                vm.status.is_paid = true;

                localStorage.clear();

                // 更新導覽列購物車數量
                vm.$bus.$emit('upateCartQty');
              }
            });
          });
        }
      });
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
    this.cleanCart();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/_rwdMixin";

$mainColor: #da471d;
$secColor: #87775c;

// 整個頁面
.checkout {
  min-height: calc(100vh - 195px);
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

  // 副標題
  .subtitle {
    font-size: 24px;
    @include sm {
      font-size: 20px;
    }
  }

  // 分隔線
  .divider {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
}

// 左邊訂單
// 第一個表格線條
.table {
  border: 2px solid $mainColor;

  th {
    border-top: 0;
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

  // 購物車圖片
  &__img {
    width: 80px;
    height: 60px;
    @include sm {
      width: 40px;
      height: 30px;
    }
  }
}

.tbody {
  // 最後一個表格線條
  &__tr {
    border-bottom: 2px solid #dee2e6;
  }
}

// 折扣碼相關樣式
.coupon {
  // 超連結
  &__link {
    color: $secColor;
    &:hover {
      color: $secColor;
    }
  }

  // 輸入框
  &__input {
    padding-top: 7px;
    padding-bottom: 5px;
    @include sm {
      font-size: 14px;
    }
  }
}

// 右邊結帳資料
// 表頭對齊
.checkout-form {
  &--pt {
    padding-top: 8px;
  }
}
</style>
