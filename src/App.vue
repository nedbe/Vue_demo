<template>
  <div id="app" class="">
    <router-view />
  </div>
</template>

<style lang="scss">
/* 引入bootstrap自定義樣式 */
@import "@/assets/styles/all";
/* 引入 Josefin Sans字型 */
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans");
/* 引入思源宋體字型 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap");

body {
  font-family: "Josefin Sans", "Noto Sans TC", sans-serif;
}
</style>
