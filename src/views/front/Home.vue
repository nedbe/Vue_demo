<template>
  <div>
    <Navbar />
    <Swiper />
    <div class="about bg-aboutColor">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="title text-navbarColor">THE NAP STORE 設計傢俱品牌</h1>
            <h2 class="label text-navbarColor">
              Create a space that welcomes a lifetime of comfort and style.
            </h2>
            <br />
            <p class="text-textColor">
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
            <a href="#!"> </a>
            <h3>Beds</h3>
          </div>
          <div id="sofas" class="col-md category_img">
            <a href="#!"> </a>
            <h3>Sofas</h3>
          </div>
        </div>
        <div class="row">
          <div id="chairs" class="col-md category_img">
            <a href="#!"> </a>
            <h3>Chairs</h3>
          </div>
          <div id="tables" class="col-md category_img">
            <a href="#!"> </a>
            <h3>Tables</h3>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// 引入元件
import Navbar from '@/components/front/Navbar.vue';
import Swiper from '@/components/front/Swiper.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Navbar,
    Swiper,
    Footer,
  },
};
</script>

<style lang="scss" scope>
.about {
  padding-top: 50px;
  .text-textColor {
    font-size: 20px;
    text-align: justify;
    margin-bottom: 50px;
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
      // z-index: 10;
      background-color: rgba(#000, 0);
    }
  }
  h3 {
    position: absolute;
    // z-index: 200;
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
