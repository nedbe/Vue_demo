import Vue from 'vue';

// $bus 在Vue本體下註冊這個變數名稱，可自訂
Vue.prototype.$bus = new Vue();

// AlertMessage 使用方法
// 自定義事件名稱 'messsage:push'
// message(String): 訊息內容
// status(String): Alert 的樣式(Bootstrap)

// 外層用$on註冊
// vm.$bus.$on

// 內層用$emit觸發
// vm.$bus.$emit('messsage:push');
