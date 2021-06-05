<template>
  <swiper class="swiper" :options="swiperOption" :pagination="true">
    <!-- 背景圖片因在assets內會被webpack編譯壓縮過，所以需要用引入的方式處理 -->
    <swiper-slide
      v-for="(item, index) in imgSrc"
      :key="index"
      :style="{
        backgroundImage:
          'url(' + require(`@/assets/images/home/swiper/${item}`) + ')',
      }"
    >
      <div class="swiper_content">
        <h1 class="title">THE NAP STORE</h1>
        <p class="content" data-swiper-parallax="-140" v-show="index === 0">
          歡慶開幕 全館八折
        </p>
        <p class="content" data-swiper-parallax="-140" v-show="index === 1">
          - DESIGN FURNITURE -
        </p>
        <router-link class="btn btn-lg pick_btn" to="/products/all"
          >挑選商品</router-link
        >
      </div>
    </swiper-slide>
    <!-- 前進後退按鈕 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <!-- 分頁器 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'swiper-example-navigation',
  title: 'Navigation',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // swiper套件設定
      swiperOption: {
        // 前進後退按鈕
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 分頁器設定
        pagination: {
          el: '.swiper-pagination',
          // 是否動態顯示圓點
          // dynamicBullets: true,
          // 可否點擊切換
          clickable: true,
          // 修改激活中的分頁樣式
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
        },
        // 自動撥放設定
        autoplay: {
          // 秒數
          delay: 5000,
          // 被操作後重新啟動 autoplay
          disableOnInteraction: false,
        },
        // 切換動畫設定
        effect: 'fade',
        // 動畫速度
        speed: 1000,
        // 文字滑入
        parallax: true,
        // 是否循環
        loop: true,
        // 鼠標是否變成手掌圖案
        grabCursor: true,
      },
      imgSrc: ['swiper1.jpg', 'swiper2.jpg'],
    };
  },
};
</script>

<style lang="scss">
// style 加scoped會導致無法設定分頁器樣式
/* 整體 swiper */
.swiper-slide {
  text-align: center;
  font-size: 18px;
  height: 100vh;
  background-position: 50% 70%;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

/* 前進後退按鈕 */
.swiper-button-prev:after,
.swiper-button-next:after {
  color: #fff;
  opacity: 0.5;
  transition: all 1s;
}

.swiper-button-prev:hover:after,
.swiper-button-next:hover:after {
  font-size: 50px;
  opacity: 1;
  transition: all 1s;
}

/* 分頁器 */
.my-bullet {
  width: 10px;
  height: 10px;
  margin: auto 5px;
  display: inline-block;
  border-radius: 100%;
  background: #fff;
  opacity: 0.3;
}

.my-bullet-active {
  opacity: 1;
}
</style>

<style lang="scss" scoped>
// 廣告標語相關
.swiper_content {
  color: #fff;
}

.title {
  font-size: 80px;
}

.content {
  font-size: 50px;
}

$text_color: #cacd4a;

.pick_btn {
  border-radius: 99px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #87775c;
  background-color: #fff;
  &:hover {
    color: $text_color;
    background-color: rgba(255, 255, 255, 0);
    border: 1px $text_color solid;
  }
}
</style>
