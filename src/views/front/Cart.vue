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
                      ><i class="far fa-times-circle delete_btn"></i
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
                    <input type="button" value="-" class="input_minus" />
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
                    <input type="button" value="+" class="input_plus" />
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
                      class="btn back_btn mr-3"
                      :to="{ name: 'Product_detail' }"
                      >繼續購物</router-link
                    >
                    <a href="#!" class="btn update_btn">更新購物車</a>
                  </td>
                  <td colspan="2" class="text-right">
                    <router-link
                      href="#!"
                      class="btn checkout_btn"
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
                <button class="btn update_btn" id="couponBtn">套用</button>
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
$btn_color: #87775c;
$checkout_btn_color: #da471d;
// $sm: 576px;

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
    color: $btn_color;
    // text-decoration: none;
  }
}

// 刪除按鈕
.delete_btn {
  color: #000;
  &:hover {
    color: $btn_color;
  }
}

// 返回購物按鈕
.back_btn {
  color: $btn_color;
  font-size: 16px;
  background-color: #fff;
  border: 1px $btn_color solid;
  border-radius: 0px;
  &:hover {
    color: #fff;
    background-color: $btn_color;
  }
  &:focus {
    box-shadow: 0 0 0 0;
  }
}

// 更新購物車按鈕
.update_btn {
  color: #fff;
  font-size: 16px;
  background-color: $btn_color;
  border-radius: 0px;
  padding: 6px 20px;
  &:hover {
    background-color: $btn_color - #111111;
  }
  &:focus {
    box-shadow: 0 0 0 0;
  }
}

// 結帳按鈕
.checkout_btn {
  color: #fff;
  font-size: 16px;
  background-color: $checkout_btn_color;
  border-radius: 0px;
  padding: 6px 20px;
  &:hover {
    background-color: $checkout_btn_color - #111111;
  }
  &:focus {
    box-shadow: 0 0 0 0;
  }
}

// 折扣碼相關樣式
.coupon {
  p{
    padding-left: 12px;
  }
  // 超連結
  .coupon_link {
    color: $btn_color;
    &:hover {
      color: $btn_color;
      // text-decoration: none;
    }
  }
  // 輸入框
  .form-control {
    border-radius: 0;
    &:focus {
      box-shadow: 0 0 0 0;
      border-color: $btn_color;
    }
  }
  .input-group {
    padding-right: 12px;
  }
}

// input[type=number] 取消上下箭頭
/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

// 數量與增減按鈕
input[type="number"],
input[type="button"] {
  padding: 6px;
  border-radius: 0;
  border: 0;
}

// 增減按鈕
input[type="button"] {
  font-weight: bold;
  &:hover {
    background-color: $btn_color;
  }
}

// 數量按鈕
.input_number {
  border: 1px solid rgb(239, 239, 239);
  &:focus {
    outline: none;
  }
}

.input_group {
  border: solid 1px rgb(239, 239, 239);
}
</style>
