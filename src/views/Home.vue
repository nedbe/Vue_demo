<template>
  <div>
    <Navbar />
    <Swiper />
  </div>
</template>

<style>
/* #test {
  height: 1000px;
} */
</style>

<script>
// @ is an alias to /src
// 引入元件
import Navbar from '@/components/front/Navbar.vue';
import Swiper from '@/components/front/Swiper.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Navbar,
    Swiper,
  },
};
</script>
