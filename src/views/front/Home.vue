<template>
  <div>
    <Swiper />
    <div class="about bg-aboutColor">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="text-mainColor">THE NAP STORE 設計傢俱品牌</h1>
            <h2 class="text-mainColor">
              Create a space that welcomes a lifetime of comfort and style.
            </h2>
            <br />
            <p class="text-secColor">
              The Nap Store 創始於1989年，如今已成為一個知名的設計傢俱品牌。
              我們設計、生產並銷售適合於客廳、臥室和戶外空間等的一系列現代設計傢俱，
              同時我們也可以提供專業室內傢俱布置建議給客戶，
              我們會傾聽您的需求，並構想出不同的解決方案，幫助您打造出夢想之家。
            </p>
          </div>
        </div>
      </div>
      <div class="category">
        <div class="row">
          <div id="beds" class="col-md category_img">
            <router-link href="#!" to="/products/beds"> </router-link>
            <h3>Beds</h3>
          </div>
          <div id="sofas" class="col-md category_img">
            <router-link href="#!" to="/products/sofas"> </router-link>
            <h3>Sofas</h3>
          </div>
        </div>
        <div class="row">
          <div id="chairs" class="col-md category_img">
            <router-link href="#!" to="/products/chairs"> </router-link>
            <h3>Chairs</h3>
          </div>
          <div id="tables" class="col-md category_img">
            <router-link href="#!" to="/products/tables"> </router-link>
            <h3>Tables</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

// @ is an alias to /src
// 引入元件
import Swiper from '@/components/front/Swiper.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Swiper,
  },
  created() {
    // 切換頁時回到最上方
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scope>
// 引入 rwdMixin
@import "@/assets/styles/scss/rwdMixin";

// 品牌故事區塊
.about {
  padding-top: 50px;
  h1 {
    @include sm {
      font-size: 22px;
    }
  }
  h2 {
    @include sm {
      font-size: 20px;
    }
  }
  p {
    font-size: 24px;
    text-align: justify;
    margin-bottom: 50px;
    @include sm {
      font-size: 16px;
      margin-bottom: 25px;
    }
  }
}

// 產品分類圖片
.category {
  position: relative;
  overflow: hidden;
  .row:nth-child(1) {
    margin-top: 15px;
  }
  .category_img {
    z-index: 100;
    height: 450px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 3px 3px 12px #000;
    transition: transform 0.7s ease-out;
    &:hover {
      z-index: 300;
      // overflow: hidden;
      transform: scale(1.05, 1.05);
    }
    @include sm {
      height: 250px;
    }
  }
  // 製造遮色
  a {
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;
    background-color: rgba(#000, 0.3);
    &:hover {
      background-color: rgba(#000, 0);
    }
  }
  h3 {
    position: absolute;
    bottom: 10%;
    left: 15%;
    color: #fff;
    font-size: 40px;
    font-weight: 300;
  }
}

// 背景圖
#beds {
  background-image: url("../../assets/images/home/about/beds.jpg");
}

#sofas {
  background-image: url("../../assets/images/home/about/sofas.jpg");
}

#chairs {
  background-image: url("../../assets/images/home/about/chairs.jpg");
}

#tables {
  background-image: url("../../assets/images/home/about/tables.jpg");
}
</style>
