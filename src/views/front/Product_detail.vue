<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="container mt-3 mt-sm-5 mb-5 page--pt">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3 sidebar--sticky d-none d-sm-block">
          <Sidebar />
        </div>
        <!-- 右側商品資訊 -->
        <div class="col-md-9">
          <div class="row product">
            <div class="col-md-6 text-center">
              <img
                :src="product.imageUrl"
                alt="商品圖片"
                class="product__img"
              />
            </div>
            <div class="col-md-6 pt-5">
              <h1 class="text-secColor product__title">{{ product.title }}</h1>
              <span class="card-text text-left mt-3 product__price">
                NT{{ product.price | currency }}元
              </span>
              <p class="text-justify text-secColor mt-4">
                {{ product.description }}
              </p>
              <div class="d-flex justify-content-between mt-4">
                <div class="input">
                  <input
                    type="button"
                    value="-"
                    class="input__button"
                    @click="addCartQty(tempQty - 1)"
                  />
                  <input
                    type="number"
                    class="text-center input__number"
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
                    class="input__button"
                    @click="addCartQty(tempQty + 1)"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn--baseSet btn--secColor"
                  @click.prevent="addtoCart(product, $event)"
                  v-if="product.is_enabled === 1"
                >
                  加入購物車
                </button>
                <a
                  class="btn btn--baseSet btn-outline--secColor disabled"
                  v-else
                  >缺貨中</a
                >
              </div>
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
              <!-- 顯示的內容 -->
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="specification"
                  role="tabpanel"
                  aria-labelledby="specification-tab"
                >
                  <p
                    class="text-justify content content--pre p-3"
                    v-text="product.content"
                  ></p>
                </div>
                <div
                  class="tab-pane fade"
                  id="notice"
                  role="tabpanel"
                  aria-labelledby="notice-tab"
                >
                  <ul class="text-justify content p-3">
                    <li class="content__item">
                      <strong>送貨時間：</strong>
                      <br />
                      我們將於訂單完成後3日內(不含例假日)與您聯繫送貨時間。請務必於訂單中填寫您正確的連絡電話，
                      在無法聯繫上您的情況下，我們將不會安排出貨。
                      若您於下單後有任何問題，可與我們聯絡。
                    </li>
                    <li class="content__item">
                      <strong>配送運費：</strong>
                      <br />
                      運費已包含在售價裡，並不會再另外向您收費。
                    </li>
                    <li class="content__item">
                      <strong>線上購物七天鑑賞期：</strong>
                      <br />
                      線上購買之商品於到貨日起算之7日內為鑑賞期(鑑賞期並非試用期)，若非商品品質瑕疵問題於鑑賞期內退換貨之情形，
                      我們須酌收退換貨所產生之運費。所有退貨或換貨之商品均需為未使用之全新狀態且包裝完整
                      ，及所有相關之購買發票、配件、價標、贈品等也需保持其完整性，
                      若有損壞、遺失、配件不全或商品有使用痕跡，恕無法接受退換貨。
                    </li>
                    <li class="content__item">
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
          <div class="row mt-4 mt-sm-3 mb-3">
            <div class="col">
              <h2 class="records">瀏覽紀錄</h2>
              <swiper class="swiper pt-3" :options="swiperOption">
                <swiper-slide
                  v-for="(item, index) in recordProducts"
                  :key="index"
                >
                  <div class="swiper__body">
                    <a href="#!" @click.prevent="goToProductDetail(item.id)">
                      <img :src="item.imageUrl" alt="" class="swiper__img" />
                      <div class="swiper__img--overlay p-2">查看商品</div>
                    </a>
                  </div>
                  <h3 class="h5 text-secColor pt-2 pb-2">{{ item.title }}</h3>
                  <span class="pt-2 pb-2 swiper__price"
                    >NT{{ item.price | currency }}元</span
                  >
                  <button
                    class="btn btn-block btn--baseSet btn--secColor"
                    @click="addtoCart(item, $event, (tempQty = 1))"
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

import LoadingPage from '@/components/common/Loading_page.vue';
import Sidebar from '@/components/front/Sidebar.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'Product_detail',
  components: {
    LoadingPage,
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
          769: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
      // 商品
      product: {},
      // 購物車商品
      cart: [],
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
      vm.$http.get(api).then((response) => {
        // 如果取資料成功
        if (response.data.success) {
          // 存入商品資料
          vm.product = response.data.product;
          // 存瀏覽資料
          vm.saveRecord();
        } else {
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
      }
    },
    // 將商品加入購物車
    addtoCart(data, event) {
      const vm = this;
      // 顯示按鈕讀取動畫
      const i = '<i class="fas fa-spinner fa-spin"></i>';
      $(event.target).append(i);
      // 關閉按鈕以免連續點擊
      $(event.target).attr('disabled', true);

      // 查看購物車裡是否有重複的資料
      const check = vm.cart.findIndex((item) => item.product_id === data.id);
      // 如果沒重複則直接將商品加入購物車
      if (check === -1) {
        const product = {
          product_id: data.id,
          qty: vm.tempQty,
          title: data.title,
          price: data.price,
          imageUrl: data.imageUrl,
        };
        vm.cart.push(product);
      } else {
        // 有重複則將數量加總
        vm.cart[check].qty += vm.tempQty;
      }

      // 將購物車存入localStorage
      new Promise((resolve) => {
        resolve(localStorage.setItem('cart', JSON.stringify(vm.cart)));
      }).then(() => {
        // 更新導覽列購物車數量
        vm.$bus.$emit('upateCartQty');

        setTimeout(() => {
          // 移除按鈕讀取動畫
          $(event.target)
            .children()
            .remove();
          // 重新開啟按鈕
          $(event.target).attr('disabled', false);
        }, 1000);
      });
    },
    // 存瀏覽資料
    saveRecord() {
      const vm = this;
      // 檢查有無重複的值
      const check = vm.recordProducts.find((item) => item.id === vm.product.id);
      // 如果沒有重複的值，則將新的資料加入
      if (check === undefined) {
        vm.recordProducts.push(vm.product);
      }

      // 將瀏覽資料存入 localStorage
      localStorage.setItem('save', JSON.stringify(vm.recordProducts));
    },
    // 取瀏覽資料
    getRecord() {
      // 從 localStorage取瀏覽資料
      const data = JSON.parse(localStorage.getItem('save'));
      // 如果有資料，則直接將資料存入
      if (data) {
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
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
  },
  created() {
    const vm = this;
    vm.getProductDetail();
    vm.getCart();
    vm.getRecord();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/_rwdMixin";

$secColor: #87775c;
$thirdColor: #cacd4a;

// 整個頁面
.page--pt {
  padding-top: 76px;
}

// 側邊欄
.sidebar--sticky {
  position: sticky;
  top: 100px;
  left: 0;
  height: 300px;
}

// 商品資訊
.product {
  // 商品圖
  &__img {
    width: 400px;
    height: 300px;
    object-fit: cover;
    @include sm {
      margin-bottom: 16px;
    }
  }

  // 商品名稱
  &__title {
    @include md {
      font-size: 32px;
    }
  }

  // 商品價格
  &__price {
    font-size: 25px;
    @include md {
      font-size: 24px;
    }
  }
}

// 商品規格與注意事項標籤切換效果
.nav-link {
  color: $secColor;
  &:hover {
    color: #495057;
    border-color: $thirdColor;
  }
}

.nav-tabs {
  border-color: $thirdColor;
}

.nav-tabs .nav-link.active {
  border-color: $thirdColor $thirdColor #fff;
}

// 商品規格與注意事項
.content {
  line-height: 2rem;
  border-bottom: 1px solid $thirdColor;

  &__item {
    list-style-type: none;
    padding-bottom: 12px;
  }

  &--pre {
    white-space: pre;
    overflow: auto;
  }
}

// 瀏覽紀錄
.records {
  font-size: 24px;
  padding: 16px 8px;
  border-bottom: 1px solid $thirdColor;
}

// swiper樣式
.swiper {
  width: 100%;

  &__body {
    position: relative;
    overflow: hidden;
    box-shadow: 3px 1px 12px rgba(0, 0, 0, 0.301);
  }

  // 圖片
  &__img {
    width: 250px;
    height: 180px;
    object-fit: cover;
    transform: scale(1, 1);
    transition: transform 0.7s ease-in;
  }

  &__body:hover &__img {
    transform: scale(1.05, 1.05);
    transition: transform 0.7s ease-out;
  }

  &__img--overlay {
    position: absolute;
    bottom: 0;
    background: $thirdColor;
    color: #fff;
    width: 100%;
    transition: 0.5s ease;
    opacity: 0;
    font-size: 16px;
    text-align: center;
    transition: opacity 0.7s ease-in;
  }

  &__body:hover &__img--overlay {
    opacity: 1;
    transition: opacity 0.7s ease-out;
  }

  // 價格
  &__price {
    font-size: 16px;
  }
}

.swiper-slide {
  height: 100%;
  flex-direction: column;
}
</style>
