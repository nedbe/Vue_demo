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

    <div class="checkout_box">
      <div class="container">
        <div class="row mb-1">
          <div class="col-12" v-if="status.is_paid === false">
            <h1 class="h3 text-center mt-3 mb-3 text-mainColor">
              結帳資料填寫
            </h1>
            <hr />
          </div>

          <div class="col-12" v-else>
            <h1 class="h3 text-center mt-3 mb-3 text-mainColor">
              感謝您的購買，如訂單有問題請與我們客服聯繫。
            </h1>
            <hr />
            <p class="h4 text-center">此頁面將於10秒後跳轉到首頁。</p>
          </div>
        </div>

        <div class="row" v-if="status.is_paid === false">
          <div class="col-12 col-lg-6 table">
            <h2 class="h4 text-center pt-3 pb-3">訂單詳情</h2>
            <table>
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
              <tbody>
                <tr
                  class="text-center"
                  v-for="(item, index) in cart.carts"
                  :key="index"
                >
                  <td colspan="2" class="align-middle text-left">
                    <img
                      :src="item.product.imageUrl"
                      alt="商品圖片"
                      class="cart_img"
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

                <tr class="last_tr">
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
              <tfoot>
                <tr>
                  <td colspan="5" class="coupon">
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
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="col-12 col-lg-6 mt-5 mt-lg-1">
            <h2 class="h4 text-center pt-3 pb-3">收件人資訊</h2>
            <validation-observer v-slot="{ invalid }" ref="checkoutForm">
              <form class="checkout_form" @submit.prevent="submitCheckoutData">
                <div class="form-row">
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
                        placeholder="請輸入全名"
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
                      :class="classes"
                      id="電子信箱"
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
                  <label for="pay"
                    >付款方式 <span class="text-danger">*</span></label
                  >
                  <select
                    name=""
                    id="pay"
                    class="form-control"
                    required
                    v-model="checkoutData.payment_method"
                  >
                    <option value="" disabled selected>請選擇付款方式</option>
                    <option value="transfer">銀行轉帳</option>
                    <option value="credit_card">信用卡支付</option>
                  </select>
                </div>
                <div class="d-flex justify-content-between">
                  <a
                    href="#!"
                    class="btn customize_btn btn_outline_color"
                    @click.prevent="goBack"
                    >返回上一頁</a
                  >
                  <button
                    type="submit"
                    class="btn customize_btn btn_main_color"
                    :disabled="invalid"
                  >
                    確認結帳
                  </button>
                </div>
              </form>
            </validation-observer>
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
  name: 'Checkout',
  data() {
    return {
      // 購物車資料
      cart: {},
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
      // 訂單ID
      orderId: '',
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
            console.log('訂單已建立', response);
            // 存入回傳之訂單ID
            vm.orderId = response.data.orderId;
            // 將付款結果傳入後端
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
            vm.$http.post(url).then((res) => {
              console.log(res);
              if (res.data.success) {
                // 關閉整頁讀取動畫
                vm.status.pageIsLoading = false;
                // 切換成付款後畫面
                vm.status.is_paid = true;
                // 更新導覽列購物車數量
                vm.$bus.$emit('upateCartQty');
                // 轉換頁面置頂
                $('html,body').scrollTop(0);
                // 5秒後跳轉首頁
                setTimeout(() => vm.$router.push({ path: '/home' }), 10000);
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
  created() {
    // 進入時先取得購物車列表
    this.getCart();
    // 轉換頁面置頂
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
$mainColor: #da471d;
$secColor: #87775c;

// 整個頁面
.checkout_box {
  min-height: 100vh;
  margin: 70px auto 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #fff;
  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
}

// 左邊訂單
// 第一個表格線條
.table {
  border: 2px solid $mainColor;
  table {
    width: 100%;
  }
  th {
    border-top: 0;
  }
}

// 最後一個表格線條
.last_tr {
  border-bottom: 2px solid #dee2e6;
}

// 購物車圖片
.cart_img {
  width: 80px;
  height: 60px;
}

// 折扣碼相關樣式
.coupon {
  // 超連結
  .coupon_link {
    color: $secColor;
    &:hover {
      color: $secColor;
    }
  }
  .input-group {
    padding-right: 12px;
  }
}

// 右邊結帳資料
// 表頭對齊
.checkout_form {
  .form-row {
    padding-top: 8px;
  }
}
</style>
