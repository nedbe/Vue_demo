<template>
  <div>
    <Navbar />
    <Swiper />
    <!-- <div class="bg-classic about">
      <div class="container">123</div>
    </div>
    <div class="bg-night about">
      <div class="container">123</div>
    </div> -->
    <Footer />
  </div>
</template>

<style lang="scss" scope>
.about{
  height: 50vh;
}
</style>

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
