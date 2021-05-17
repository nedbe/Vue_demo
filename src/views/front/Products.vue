<template>
  <div>
    <Navbar />
    <Jumbotron />
    <div class="container mb-1 pt-3">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 -->
          <div class="list-group">
            <a class="list-group-item list-group-item-action disabled" href="#!"
              >商品分類</a
            >
            <a href="#!" class="list-group-item list-group-item-action">床</a>
            <a href="#!" class="list-group-item list-group-item-action">沙發</a>
            <a href="#!" class="list-group-item list-group-item-action">椅子</a>
            <a href="#!" class="list-group-item list-group-item-action">桌子</a>
          </div>
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
                    <a href="#!" class="card_detail">
                      <img
                        class="card-img-top"
                        src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350"
                        alt="商品圖片"
                    /></a>
                    <div class="overlay">查看商品</div>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title text-left text-textColor">
                      北歐風格床
                    </h4>
                    <p class="card-text text-left">NT$8,000元</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#!" class="btn btn-block add_btn"> 加入購物車 </a>
                    <a href="#" class="btn btn-block add_btn disabled">
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
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/front/Navbar.vue';
import Footer from '@/components/front/Footer.vue';
import Jumbotron from '@/components/front/Jumbotron.vue';

export default {
  name: 'Products',
  components: {
    Navbar,
    Footer,
    Jumbotron,
  },
};
</script>

<style lang="scss" scoped>
// 排序
.custom-select {
  max-width: 25%;
  &:focus {
    border: 1px solid #ced4da;
    box-shadow: 0 0 0 0;
  }
}

// 左側選單
.list-group-item {
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  color: #6c757d;
  &:hover {
    color: #000;
  }
}

// 商品卡片
$btn_color: #87775c;

.card_img {
  position: relative;
  .overlay {
    position: absolute;
    bottom: 0;
    background: $btn_color;
    color: #fff;
    width: 100%;
    transition: 0.5s ease;
    opacity: 0;
    font-size: 16px;
    padding: 5px;
    text-align: center;
  }

  &:hover .overlay {
    opacity: 1;
  }
}

.add_btn {
  color: $btn_color;
  font-size: 16px;
  background-color: #fff;
  border: 1px $btn_color solid;
  &:hover {
    color: #fff;
    background-color: $btn_color;
  }
}
</style>
