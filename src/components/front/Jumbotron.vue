<template>
  <div class="jumbotron jumbotron-fluid jumbotron_bg d-flex">
    <span class="bg_block"></span>
    <div class="container text-white align-self-center">
      <h1 class="display-3">歡慶開幕</h1>
      <h2 class="text-thirdColor">全館八折 ｜ 限時折扣碼【WOW】</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jumbotron',
};
</script>

<style lang="scss" scoped>
// 引入 rwdMixin
@import "@/assets/styles/scss/rwdMixin";

.jumbotron_bg {
  height: 300px;
  margin-top: 76px;
  background-image: url("../../assets/images/products/products.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;
  position: relative;

  // 製造遮色
  .bg_block {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;
    background-color: rgba(#000, 0.2);
  }

  .container {
    z-index: 200;
  }

  h1 {
    @include sm {
      font-size: 52px;
    }
  }

  h2 {
    @include sm {
      font-size: 22px;
    }
  }
}
</style>
