<template>
  <div>
    <div class="checkout_box">
      <div class="container">
        <div class="row mb-1">
          <div class="col-12">
            <h4 class="text-center mt-3 mb-3 text-navbarColor">結帳資料填寫</h4>
            <hr />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-lg-5 table">
            <h5 class="text-center pt-3 pb-3">訂單詳情</h5>
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
                <tr class="text-center">
                  <td colspan="2" class="align-middle text-left">
                    <img
                      src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                      alt="商品圖片"
                      class="cart_img"
                    />
                    <span
                      class="pl-2 text-textColor d-inline d-lg-table-cell d-xl-inline"
                      >金牌西裝</span
                    >
                  </td>
                  <td class="align-middle text-right">$1,400</td>
                  <td class="align-middle">x1</td>
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

                <tr class="last_tr">
                  <td colspan="2" class="align-middle">總計</td>
                  <td
                    colspan="3"
                    class="align-middle text-right font-weight-bold"
                  >
                    $4,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-12 col-lg-7 mt-5 mt-lg-1">
            <h5 class="text-center pt-3 pb-3">訂購人資訊</h5>
            <form class="checkout_form">
              <div class="form-row">
                <div class="form-group col-md">
                  <label for="name"
                    >訂購人姓名 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder=""
                    required
                  />
                </div>
                <div class="form-group col-md">
                  <label for="tel"
                    >聯絡電話 <span class="text-danger">*</span></label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    id="tel"
                    placeholder=""
                    required
                  />
                </div>
                <div class="form-group col-md">
                  <label for="email"
                    >電子信箱 <span class="text-danger">*</span></label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md">
                  <label for="city"
                    >城市 <span class="text-danger">*</span></label
                  >
                  <select name="" id="city" class="form-control" required>
                    <option value="" disabled selected>請選擇</option>
                    <option value="基隆市">基隆市</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                    <option value="苗栗縣">苗栗縣</option>
                    <option value="台中市">台中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="雲林縣">雲林縣</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                    <option value="台東縣">台東縣</option>
                    <option value="澎湖縣">澎湖縣</option>
                    <option value="金門縣">金門縣</option>
                    <option value="連江縣">連江縣</option>
                  </select>
                </div>
                <div class="form-group col-md">
                  <label for="township"
                    >鄉鎮市 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="township"
                    required
                  />
                </div>
                <div class="form-group col-md">
                  <label for="zip"
                    >郵遞區號 <span class="text-danger">*</span></label
                  >
                  <input type="text" class="form-control" id="zip" required />
                </div>
              </div>
              <div class="form-group">
                <label for="address"
                  >街道地址 <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder=""
                  required
                />
              </div>
              <div class="form-group">
                <label for="comments">訂單備註(選填)</label>
                <textarea
                  class="form-control"
                  id="comments"
                  placeholder="例如: 運送時的特別註記。"
                  rows="2"
                  cols="5"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="pay"
                  >付款方式 <span class="text-danger">*</span></label
                >
                <select name="" id="pay" class="form-control" required>
                  <option value="" disabled selected>請選擇</option>
                  <option value="銀行轉帳">銀行轉帳</option>
                  <option value="貨到付款">貨到付款</option>
                  <option value="信用卡支付">信用卡支付</option>
                </select>
              </div>
              <div class="text-right">
                <button type="submit" class="btn customize_btn btn_main_color">
                  確認結帳
                </button>
              </div>
            </form>
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

$border_btn_color: #da471d;

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
  border: 2px solid $border_btn_color;
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

// 右邊結帳資料
// 表頭對齊
.checkout_form {
  .form-row {
    padding-top: 8px;
  }
}
</style>
