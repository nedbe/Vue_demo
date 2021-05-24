<template>
  <div>
    <div class="container mt-5 mb-5 Whole_box">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3">
          <Sidebar />
        </div>
        <!-- 右側商品資訊 -->
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                alt="商品圖片"
                class="product_img"
              />
            </div>
            <div class="col-md-6">
              <h1 class="text-textColor">北歐風格床</h1>
              <p class="card-text text-left mt-3">NT$8,000元</p>
              <p class="text-justify text-textColor mt-4">
                最優質的明星沙發商品，皮革是使用苯染牛皮之外，還利用了流線與尖足椅腳設計，
                徹底擺脫一般皮革沙發的笨重感，乘坐空間一樣寬敞舒適，簡潔的直線絎縫，不必多餘的飾品來裝飾沙發，
                非常適合擺放在各種風格的空間裡。
              </p>
              <form action="#" method="post">
                <div class="d-flex justify-content-between mt-4">
                  <div class="input_group">
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
                  </div>
                  <button type="submit" class="btn customize_btn btn_color">加入購物車</button>
                  <a type="submit" class="btn customize_btn btn_color disabled">缺貨中</a>
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
                  <p class="text-justify content">
                    顏色：深灰色
                    <br />
                    材質：亞麻 + 金屬 + 海綿 + 桉樹
                    <br />
                    尺寸：185.4 公分 X 76.2 公分 X 86.3 公分(長×寬×高)
                  </p>
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
                <swiper-slide v-for="(item, index) in imgSrc" :key="index">
                  <a href="#!">
                    <img
                      src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                      alt=""
                      class="swiper_img"
                    />
                  </a>
                  <h5 class="text-textColor pt-3">北歐風格床</h5>
                  <span class="">NT$8,000元</span>
                  <button
                    type="button"
                    class="btn btn-block customize_btn btn_outline_color"
                  >
                    加入購物車
                  </button>
                  <a href="#!" class="btn btn-block customize_btn btn_outline_color disabled">
                    缺貨中
                  </a>
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
      imgSrc: ['swiper1.jpg', 'swiper2.jpg', 'swiper1.jpg', 'swiper2.jpg'],
    };
  },
  created() {
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
// 引入 button 樣式
@import "@/assets/styles/scss/common/_button";

$btn_color: #87775c;
$border_color: #cacd4a;

// 整個頁面
.Whole_box {
  padding-top: 76px;
}

// 商品圖
.product_img {
  max-width: 100%;
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
    // 圖片
    .swiper_img {
      background-size: cover;
      background-position: center;
      width: 100%;
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
