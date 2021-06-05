<template>
  <div class="list-group">
    <a
      class="list-group-item list-group-item-action disabled text-textColor"
      href="#!"
      >商品分類</a
    >
    <router-link
      href="#!"
      class="list-group-item list-group-item-action"
      to="/products/all"
      >全部商品</router-link
    >
    <router-link
      href="#!"
      class="list-group-item list-group-item-action"
      to="/products/beds"
      >床</router-link
    >
    <router-link
      href="#!"
      class="list-group-item list-group-item-action"
      to="/products/sofas"
      >沙發</router-link
    >
    <router-link
      href="#!"
      class="list-group-item list-group-item-action"
      to="/products/chairs"
      >椅子</router-link
    >
    <router-link
      href="#!"
      class="list-group-item list-group-item-action"
      to="/products/tables"
      >桌子</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
// 連結下底線
.list-group-item {
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  color: #6c757d;
  &:hover {
    color: #000;
  }
}

// 當前連結文字顏色
.router-link-exact-active{
  color: #000;
}
</style>
