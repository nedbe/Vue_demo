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

    <div class="container mt-5 mb-5 Whole_box">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3 sticky_container">
          <Sidebar />
        </div>
        <!-- 右側商品資訊 -->
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <img :src="product.imageUrl" alt="商品圖片" class="product_img" />
            </div>
            <div class="col-md-6">
              <h1 class="text-textColor">{{ product.title }}</h1>
              <p class="card-text text-left mt-3">
                NT{{ product.price | currency }}元
              </p>
              <p class="text-justify text-textColor mt-4">
                {{ product.description }}
              </p>
              <form action="#" method="post">
                <div class="d-flex justify-content-between mt-4">
                  <div class="input_group">
                    <input
                      type="button"
                      value="-"
                      class="input_button"
                      @click="addCartQty(tempQty - 1)"
                    />
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
                      v-model.number="tempQty"
                    />
                    <input
                      type="button"
                      value="+"
                      class="input_button"
                      @click="addCartQty(tempQty + 1)"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn customize_btn btn_color"
                    @click.prevent="checkCart(product.id, $event)"
                    v-if="product.is_enabled === 1"
                  >
                    加入購物車
                  </button>
                  <a class="btn customize_btn btn_color disabled" v-else
                    >缺貨中</a
                  >
                </div>
              </form>
            </div>
          </div>
          <!-- 商品規格與注意事項 -->
          <div class="row mt-5 mb-3">
            <div class="col">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="specification-tab"
                    data-toggle="tab"
                    href="#specification"
                    role="tab"
                    aria-controls="specification"
                    aria-selected="true"
                    >商品規格</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="notice-tab"
                    data-toggle="tab"
                    href="#notice"
                    role="tab"
                    aria-controls="notice"
                    aria-selected="false"
                    >注意事項</a
                  >
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="specification"
                  role="tabpanel"
                  aria-labelledby="specification-tab"
                >
                  <p
                    class="text-justify content content_pre"
                    v-text="product.content"
                  ></p>
                </div>
                <div
                  class="tab-pane fade"
                  id="notice"
                  role="tabpanel"
                  aria-labelledby="notice-tab"
                >
                  <ul class="text-justify content">
                    <li>
                      <strong>送貨時間：</strong>
                      <br />
                      我們將於訂單完成後3日內(不含例假日)與您聯繫送貨時間。請務必於訂單中填寫您正確的連絡電話，
                      在無法聯繫上您的情況下，我們將不會安排出貨。
                      若您於下單後有任何問題，可與我們聯絡。
                    </li>
                    <li>
                      <strong>配送運費：</strong>
                      <br />
                      運費已包含在售價裡，並不會再另外向您收費。
                    </li>
                    <li>
                      <strong>線上購物七天鑑賞期：</strong>
                      <br />
                      線上購買之商品於到貨日起算之7日內為鑑賞期(鑑賞期並非試用期)，若非商品品質瑕疵問題於鑑賞期內退換貨之情形，
                      我們須酌收退換貨所產生之運費。所有退貨或換貨之商品均需為未使用之全新狀態且包裝完整
                      ，及所有相關之購買發票、配件、價標、贈品等也需保持其完整性，
                      若有損壞、遺失、配件不全或商品有使用痕跡，恕無法接受退換貨。
                    </li>
                    <li>
                      <strong>其他服務：</strong>
                      <br />
                      如您有其他關於訂購、商品等相關問題，
                      可以致電我們的免費客服電話：04-22446688
                      我們將有專人為您處理線上購物問題。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 瀏覽紀錄 -->
          <div class="row mt-3 mb-3">
            <div class="col">
              <h4>瀏覽紀錄</h4>
              <swiper class="swiper" :options="swiperOption">
                <swiper-slide
                  v-for="(item, index) in recordProducts"
                  :key="index"
                >
                  <div class="position">
                    <a href="#!" @click.prevent="goToProductDetail(item.id)">
                      <img :src="item.imageUrl" alt="" class="swiper_img" />
                      <div class="overlay">查看商品</div>
                    </a>
                  </div>
                  <h5 class="text-textColor pt-3">{{ item.title }}</h5>
                  <span class="">NT{{ item.price | currency }}元</span>
                  <button
                    class="btn btn-block customize_btn btn_color"
                    @click="checkCart(item.id, $event, (tempQty = 1))"
                  >
                    加入購物車
                  </button>
                </swiper-slide>
                <!-- 前進後退按鈕 -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
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

import Sidebar from '@/components/front/Sidebar.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'Product_detail',
  components: {
    Sidebar,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // swiper 套件選項
      swiperOption: {
        // 前進後退按鈕
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 預設顯示數量
        slidesPerView: 4,
        // slide之間距離，單位px
        spaceBetween: 50,
        // 斷點設定
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      },
      // 商品
      product: {},
      // 暫存購物車商品
      tempCart: [],
      // 暫存商品數量
      tempQty: 1,
      // 瀏覽過的商品
      recordProducts: [],
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
      },
    };
  },
  methods: {
    // 取得商品細節
    getProductDetail() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;
      // 存入商品id
      let id = '';
      id = vm.$route.params.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      // axios
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        // 如果取資料成功
        if (response.data.success) {
          // 存入商品資料
          vm.product = response.data.product;
          // 執行saveRecord
          vm.saveRecord();
        } else {
          // 如果取資料失敗
          // 轉址
          vm.$router.push({ path: '/products/all' });
        }
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;
      });
    },
    // 商品數量
    addCartQty(qty) {
      const vm = this;
      // 暫存傳入的當前商品數
      let tempQty = qty;
      // 防止商品數變負數
      // 如果傳入商品數小於等於0
      if (tempQty <= 0) {
        // 讓當商品數變為1
        tempQty = 1;
      } else if (tempQty > 99) {
        // 如果傳入商品數大於99
        // 讓商品數變為99
        tempQty = 99;
      }
      // 存入當前數量
      vm.tempQty = tempQty;
    },
    // 取得購物車列表
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // axios
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        // 將購物車資料存入
        vm.tempCart = response.data.data;
      });
    },
    // 檢查購物車商品
    checkCart(id, event) {
      const vm = this;
      // 顯示按鈕讀取動畫
      const i = '<i class="fas fa-spinner fa-spin"></i>';
      $(event.target).append(i);
      // 關閉按鈕以免連續點擊
      $(event.target).attr('disabled', true);
      // 後端格式
      const cart = {
        product_id: id,
        qty: vm.tempQty,
      };
      console.log(vm.tempQty);
      // 查看是否有重複的資料
      const check = vm.tempCart.carts.find((item) => item.product_id === id);
      console.log(check);
      // 如果購物車有重複的商品，先刪除後再重新加入
      if (check !== undefined) {
        // 讓該商品數量加上新填入的數量
        cart.qty = check.qty + vm.tempQty;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${check.id}`;
        // axios
        vm.$http.delete(url).then((response) => {
          console.log(response.data);
          vm.addtoCart(cart, event);
        });
      } else {
        vm.addtoCart(cart, event);
      }
    },
    // 將商品加入購物車
    addtoCart(cart, event) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // axios
      vm.$http.post(api, { data: cart }).then((response) => {
        console.log(response.data);
        // 如果加入購物車成功
        if (response.data.success) {
          // 更新導覽列購物車數量
          vm.$bus.$emit('upateCartQty');
          // 重新取得購物車資料
          vm.getCart();
        }
        // 移除按鈕讀取動畫
        $(event.target)
          .children()
          .remove();
        // 重新開啟按鈕
        $(event.target).attr('disabled', false);
      });
    },
    // 存瀏覽資料
    saveRecord() {
      const vm = this;
      // 檢查有無重複的值
      const check = vm.recordProducts.find((item) => item.id === vm.product.id);
      // 如果沒有
      if (check === undefined) {
        // 將新的資料加入
        vm.recordProducts.push(vm.product);
      }
      // 將瀏覽資料存入 localStorage
      localStorage.setItem('save', JSON.stringify(vm.recordProducts));
    },
    // 取瀏覽資料
    getRecord() {
      // 從 localStorage取瀏覽資料
      const data = JSON.parse(localStorage.getItem('save'));
      // 如果有資料
      if (data.length !== null) {
        // 直接將資料存入
        this.recordProducts = data;
      }
    },
    // 轉址到商品細節頁面
    goToProductDetail(productId) {
      this.$router.push({ path: `/product_detail/${productId}` });
    },
  },
  watch: {
    // 監聽商品數量
    tempQty(value) {
      const vm = this;
      // 暫存傳入的當前商品數
      let tempQty = value;
      // 防止商品數變負數
      // 如果傳入商品數小於等於0
      if (tempQty <= 0) {
        // 讓當商品數變為1
        tempQty = 1;
      } else if (tempQty > 99) {
        // 如果傳入商品數大於99
        // 讓商品數變為99
        tempQty = 99;
      }
      // 存入當前數量
      vm.tempQty = tempQty;
    },
    // 監聽網址改變時處理
    $route() {
      const vm = this;
      // 重新取得商品列表
      vm.getProductDetail();
      // 轉換頁面置頂
      $('html,body').scrollTop(0);
    },
  },
  created() {
    // 進入時先取得商品出來
    this.getProductDetail();
    // 取得購物車資料
    this.getCart();
    // 取得瀏覽過的商品
    this.getRecord();
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

$btn_color: #87775c;
$border_color: #cacd4a;

// 整個頁面
.Whole_box {
  padding-top: 76px;
}

// 側邊欄
.sticky_container {
  position: sticky;
  top: 100px;
  left: 0;
  height: 300px;
}

// 商品圖
.product_img {
  max-width: 100%;
  max-height: 450px;
}

// 商品價格
.card-text {
  font-size: 25px;
}

// 商品規格與注意事項標籤切換效果
.nav-link {
  color: $btn_color;
  &:hover {
    color: #495057;
    border-color: $border_color;
  }
}

.nav-tabs {
  border-color: $border_color;
}

.nav-tabs .nav-link.active {
  border-color: $border_color $border_color #fff;
}

// 商品規格與注意事項
.content {
  line-height: 2rem;
  padding: 16px;
  border-bottom: 1px solid $border_color;
  li {
    list-style-type: none;
    padding-bottom: 12px;
  }
}

.content_pre {
  white-space: pre;
}

// 瀏覽紀錄
h4 {
  padding: 16px 8px;
  border-bottom: 1px solid $border_color;
}

// swiper樣式
.swiper {
  padding-top: 16px;
  width: 100%;
  .swiper-slide {
    height: 100%;
    flex-direction: column;
    .position {
      position: relative;
      overflow: hidden;
      box-shadow: 3px 1px 12px rgba(0, 0, 0, 0.301);
      .overlay {
        position: absolute;
        bottom: 0;
        background: $border_color;
        color: #fff;
        width: 100%;
        transition: 0.5s ease;
        opacity: 0;
        font-size: 16px;
        padding: 5px;
        text-align: center;
        transition: opacity 0.7s ease-in;
      }
      &:hover .overlay {
        opacity: 1;
        transition: opacity 0.7s ease-out;
      }
      // 圖片
      .swiper_img {
        width: 100%;
        height: 180px;
        transform: scale(1, 1);
        transition: transform 0.7s ease-in;
      }
      &:hover .swiper_img {
        transform: scale(1.05, 1.05);
        transition: transform 0.7s ease-out;
      }
    }

    // 文字
    h5,
    span {
      padding-top: 8px;
      padding-bottom: 8px;
    }
    span {
      font-size: 16px;
    }
  }
}
</style>
