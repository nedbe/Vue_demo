<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/front/Navbar.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Navbar,
    Footer,
  },
};
</script>
