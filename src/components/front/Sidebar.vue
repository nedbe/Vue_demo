<template>
  <div class="list-group">
    <a class="list-group-item list-group-item-action disabled" href="#!"
      >商品分類</a
    >
    <a href="#!" class="list-group-item list-group-item-action">床</a>
    <a href="#!" class="list-group-item list-group-item-action">沙發</a>
    <a href="#!" class="list-group-item list-group-item-action">椅子</a>
    <a href="#!" class="list-group-item list-group-item-action">桌子</a>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
.list-group-item {
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  color: #6c757d;
  &:hover {
    color: #000;
  }
}
</style>
