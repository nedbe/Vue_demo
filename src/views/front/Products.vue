<template>
  <div>
    <Jumbotron />
    <div class="container mb-1 pt-3">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3">
          <Sidebar />
        </div>
        <!-- 右側排序 -->
        <div class="col-md-9">
          <div class="d-flex justify-content-end mb-4">
            <label class="d-flex align-items-center my-1 mr-2" for="sort"
              >顯示方法</label
            >
            <select name="sort" id="sort" class="custom-select">
              <option value="預設排序" selected>預設排序</option>
              <option value="價格排序低到高">價格排序：低到高</option>
              <option value="價格排序高到低">價格排序：高到低</option>
            </select>
          </div>
          <!-- 主要商品列表 -->
          <div class="products_content">
            <div class="row">
              <div class="col-md-4 mb-4">
                <div class="card border-0 text-center">
                  <div class="card_img">
                    <router-link
                      href="#!"
                      class="card_detail"
                      :to="{ name: 'Product_detail' }"
                    >
                      <img
                        class="card-img-top"
                        src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                        alt="商品圖片"
                    /></router-link>
                    <div class="overlay">查看商品</div>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title text-center text-textColor">
                      北歐風格床
                    </h4>
                    <p class="card-text text-center">NT$8,000元</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#!" class="btn btn-block customize_btn btn_outline_color"> 加入購物車 </a>
                    <a href="#" class="btn btn-block customize_btn btn_outline_color disabled">
                      缺貨中
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- 分頁 -->
            <nav aria-label="Page navigation" class="my-5">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">上一頁</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">下一頁</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import Jumbotron from '@/components/front/Jumbotron.vue';
import Sidebar from '@/components/front/Sidebar.vue';

export default {
  name: 'Products',
  components: {
    Jumbotron,
    Sidebar,
  },
  created() {
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
// 引入 button 樣式
@import "@/assets/styles/scss/common/_button";

$background_color: #87775c;

// 排序
.custom-select {
  max-width: 25%;
  &:focus {
    border: 1px solid #ced4da;
    box-shadow: 0 0 0 0;
  }
}

// 商品卡片
.card_img {
  position: relative;
  box-shadow: 3px 1px 12px rgba(0, 0, 0, 0.301);
  overflow: hidden;
  .overlay {
    position: absolute;
    bottom: 0;
    background: $background_color;
    color: #fff;
    width: 100%;
    transition: 0.5s ease;
    opacity: 0;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    transition: opacity 0.7s ease-in;
  }
  &:hover .overlay {
    opacity: 1;
    transition: opacity 0.7s ease-out;
  }
  img {
    border-radius: 0px;
    transform: scale(1, 1);
    transition: transform 0.7s ease-in;
  }
  &:hover img {
    transform: scale(1.05, 1.05);
    transition: transform 0.7s ease-out;
  }
}
</style>
