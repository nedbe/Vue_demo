<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/front/Navbar.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  name: 'Layout',
  // 註冊元件
  components: {
    Navbar,
    Footer,
  },
};
</script>
