import Vue from 'vue';

// $bus 在Vue本體下註冊這個變數名稱，可自訂
Vue.prototype.$bus = new Vue();

// <----- 後台彈出提示訊息 AlertMessage使用方法 ----->
// 自定義事件名稱 'messsage:push'
// message(String): 訊息內容
// status(String): Alert 的樣式(Bootstrap)

// 外層用$on註冊
// vm.$bus.$on('messsage:push', (message, status = 'warning') => {
//   vm.updateMessage(message, status);
// });

// 內層用$emit觸發
// vm.$bus.$emit('messsage:push', message, 'success');

// <----- 更新導覽列購物車數量 Navbar使用方法----->
// 自定義事件名稱 'upateCartQty'

// 外層用$on註冊
// vm.$bus.$on('upateCartQty', () => {
//   vm.getCart();
// });

// 內層用$emit觸發
// vm.$bus.$emit('upateCartQty');
