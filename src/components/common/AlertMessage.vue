<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, index) in messages"
      :key="index"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(index)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    // 更新訊息
    updateMessage(message, status) {
      const vm = this;
      // 取得轉換成現在時間的數值
      const timestamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        // 訊息
        message,
        // 樣式
        status,
        // 時間
        timestamp,
      });
      // 設定自動移除訊息
      vm.removeMessageWithTiming(timestamp);
    },
    // 手動點擊移除訊息
    removeMessage(index) {
      // 移除目標訊息
      this.messages.splice(index, 1);
    },
    // 自動移除訊息
    removeMessageWithTiming(timestamp) {
      const vm = this;
      // 設定5秒後移除訊息
      setTimeout(() => {
        vm.messages.forEach((item, index) => {
          // 如果 data內的 timestamp與目標相同
          if (item.timestamp === timestamp) {
            // 移除該訊息
            vm.messages.splice(index, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    // 使用 event bus跨組件溝通
    vm.$bus.$on('messsage:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  beforeDestroy() {
    this.$bus.$off('messsage:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
