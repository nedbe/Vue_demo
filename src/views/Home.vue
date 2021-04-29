<template>
<div>
  <Navbar />
  <div id="test"></div>
</div>
</template>

<style>
#test {
  height: 1000px;
}
</style>

<script>
// @ is an alias to /src
// 引入元件
import Navbar from '@/components/front/Navbar.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Navbar,
  },
};
</script>
