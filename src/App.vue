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

/* 中文字型 */
/* @font-face {
    font-family: custom-font-face;
    src:
      local("微軟正黑體"),
      local("Microsoft JhengHei");
    unicode-range: U+4E00-9FFF;
  } */

/* 英文字型 */
/* @font-face {
    font-family: custom-font-face;
    src:
    url('https://fonts.googleapis.com/css2?family=Josefin+Sans');
    unicode-range: U+00-024F;
  } */

body {
  font-family: "Josefin Sans", "Noto Sans TC", sans-serif;
}
</style>
