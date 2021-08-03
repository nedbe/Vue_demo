<template>
  <div>
    <loading :active.sync="loadingStatus">
      <div class="loading">
        <div class="loading__item">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </loading>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
  props: ['loadingStatus'],
};
</script>
