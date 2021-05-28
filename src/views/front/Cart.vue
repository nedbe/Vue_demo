<template>
  <div>
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
            <table class="table">
              <thead class="bg-navbarColor">
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
                    class="d-none d-sm-table-cell font-weight-normal text-right"
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td colspan="5" class="align-middle text-textColor">
                    您尚未加入商品
                  </td>
                </tr>

                <tr class="text-center">
                  <td class="align-middle">
                    <a href="#!"
                      ><i class="far fa-times-circle delete_icon"></i
                    ></a>
                  </td>
                  <td class="align-middle text-left">
                    <a href="#!" class="product_link">
                      <img
                        src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                        alt="商品圖片"
                        class="cart_img"
                      />
                      <span class="pl-2 text-textColor">金牌西裝</span>
                    </a>
                  </td>
                  <td class="align-middle text-right">$1,400</td>
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
                        value="1"
                        title="數量"
                        size="2"
                        pattern="[1-9]{1}[0-9]{1}"
                      />
                      <input type="button" value="+" class="input_button" />
                    </span>
                  </td>
                  <td class="align-middle d-none d-sm-table-cell text-right">
                    $1,400
                  </td>
                </tr>

                <tr>
                  <td colspan="2" class="align-middle">小計</td>
                  <td colspan="3" class="align-middle text-right">$5,000</td>
                </tr>

                <tr>
                  <td colspan="2" class="align-middle text-navbarColor">
                    開幕慶折扣
                  </td>
                  <td colspan="3" class="align-middle text-right">-$1,000</td>
                </tr>

                <tr>
                  <td colspan="2" class="align-middle">總計</td>
                  <td
                    colspan="3"
                    class="align-middle text-right font-weight-bold"
                  >
                    $4,000
                  </td>
                </tr>

                <tr class="last_tr">
                  <td colspan="3">
                    <router-link
                      href="#!"
                      class="btn customize_btn btn_outline_color mr-3"
                      :to="{ name: 'Products' }"
                      >繼續購物</router-link
                    >
                    <a href="#!" class="btn customize_btn btn_color"
                      >更新購物車</a
                    >
                  </td>
                  <td colspan="2" class="text-right">
                    <router-link
                      href="#!"
                      class="btn customize_btn btn_main_color"
                      :to="{ name: 'Checkout' }"
                      >前往結帳</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

            <div class="input-group collapse" id="collapseCoupon">
              <input
                type="text"
                class="form-control pt-3"
                placeholder="請輸入折扣碼"
                aria-describedby="couponBtn"
              />
              <div class="input-group-prepend">
                <button class="btn customize_btn btn_color" id="couponBtn">
                  套用
                </button>
              </div>
            </div>
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
  created() {
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
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
