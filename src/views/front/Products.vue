<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>
    <Jumbotron />

    <div class="container mb-1 pt-1 pt-sm-3" id="show">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3 sticky_container d-none d-sm-block">
          <Sidebar />
        </div>
        <!-- 右側排序 -->
        <div class="col-md-9">
          <div class="d-flex justify-content-end mb-4">
            <label
              class="d-flex align-items-center text-secColor my-1 mr-2"
              for="sort"
              >顯示方法</label
            >
            <select
              name="sort"
              id="sort"
              class="custom-select"
              v-model="sortMethod"
            >
              <option value="價格排序低到高">價格排序：低到高</option>
              <option value="價格排序高到低">價格排序：高到低</option>
            </select>
          </div>
          <!-- 主要商品列表 -->
          <div class="products_content">
            <div class="row">
              <div
                class="col-md-4 mb-4"
                v-for="(item, index) in showProducts"
                :key="index"
              >
                <div class="card border-0 text-center">
                  <div class="card_img">
                    <!-- 正常商品 -->
                    <a
                      href="#!"
                      @click.prevent="goToProductDetail(item.id)"
                      v-if="item.is_enabled === 1"
                    >
                      <img
                        class="card-img-top"
                        :src="item.imageUrl"
                        alt="商品圖片"
                      />
                      <div class="overlay text-white text-center w-100 p-2">
                        查看商品
                      </div>
                    </a>
                    <!-- 缺貨商品 -->
                    <a href="javascript:;" class="disabled_link" v-else>
                      <img
                        class="card-img-top"
                        :src="item.imageUrl"
                        alt="商品圖片"
                      />
                    </a>
                  </div>
                  <div class="card-body">
                    <h3 class="h4 card-title text-center text-secColor">
                      {{ item.title }}
                    </h3>
                    <span class="card-text text-center">
                      NT{{ item.price | currency }}元
                    </span>
                  </div>
                  <div class="card-footer border-top-0 p-0">
                    <button
                      class="btn btn-block customize_btn btn_color"
                      @click="checkCart(item.id, (qty = 1), $event)"
                      v-if="item.is_enabled === 1"
                    >
                      加入購物車
                    </button>
                    <a
                      href="#"
                      class="btn btn-block customize_btn btn_outline_color disabled"
                      v-else
                    >
                      缺貨中
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- 分頁 -->
            <div class="row justify-content-center mb-4 mt-4">
              <Pagination
                :pages="pagination"
                @emitPages="getPagination"
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import LoadingPage from '@/components/common/Loading_page.vue';
import Jumbotron from '@/components/front/Jumbotron.vue';
import Sidebar from '@/components/front/Sidebar.vue';
import Pagination from '@/components/front/Pagination.vue';

export default {
  name: 'Products',
  components: {
    LoadingPage,
    Jumbotron,
    Sidebar,
    Pagination,
  },
  data() {
    return {
      // 商品
      products: [],
      // 暫存商品
      tempProducts: [],
      // 要顯示的商品
      showProducts: [],
      // 暫存購物車商品
      tempCart: [],
      // 商品類別
      category: [
        { name: '全部商品', link: 'all' },
        { name: '床', link: 'beds' },
        { name: '沙發', link: 'sofas' },
        { name: '椅子', link: 'chairs' },
        { name: '桌子', link: 'tables' },
      ],
      // 排序方法
      sortMethod: '價格排序低到高',
      // 頁數相關
      pagination: {
        // 總頁數
        totalPages: 1,
        // 當前頁數
        currentPage: 1,
      },
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
      },
    };
  },
  methods: {
    // 取得商品列表以及分類資訊
    getProducts() {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      // 存入路由參數
      const linkName = vm.$route.params.category;
      // 用參數篩選出要顯示商品類別，結果為一陣列
      const tempCategory = vm.category.filter((item) => {
        let temp = '';
        if (item.link === linkName) {
          temp = item.name;
        }
        return temp;
      });

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((response) => {
        // 如果取資料成功
        if (response.data.success) {
          // 存入商品資料
          vm.products = response.data.products;

          // 如果商品類別沒有匹配成功，或使用者亂輸入網址
          if (tempCategory.length === 0) {
            vm.$router.push({ path: '/products/all' });
            // 存入全部商品
            vm.tempProducts = [...vm.products];
          } else if (tempCategory[0].name === '全部商品') {
            // 如果篩選後類別是全部商品
            // 存入全部商品
            vm.tempProducts = [...vm.products];
          } else {
            // 其他篩選結果
            // 存入篩選後分類
            vm.tempProducts = vm.products.filter((item) => item.category === tempCategory[0].name);
          }

          // 關閉整頁讀取動畫
          vm.status.pageIsLoading = false;

          // 預設價格排序低到高
          vm.sortMethod = '價格排序低到高';
          vm.tempProducts.sort((a, b) => a.price - b.price);

          // 頁數計算
          vm.getPagination();
        }
      });
    },
    // Sidebar 商品分類連結處理
    productLink(link) {
      const vm = this;
      // 存入路由參數
      const name = vm.$route.params.category;
      // 如果點擊不同連結時
      if (name !== link) {
        vm.$router.push({ path: `/products/${link}` });
        // 重新取得商品列表
        vm.getProducts();
      }
    },
    // 商品頁數判斷與顯示
    getPagination(page = 1) {
      const vm = this;
      // 總頁數且每6筆1頁
      let totalPages = Math.floor(vm.tempProducts.length / 6);
      // 暫存餘數
      const temp = vm.tempProducts.length % 6;
      // 若有餘數再加1頁
      if (temp > 0) {
        totalPages += 1;
      }
      // 將正確總頁數存入
      vm.pagination.totalPages = totalPages;

      // 暫存傳入的當前頁數
      let tempPage = page;
      // 防止當前頁數變負數或大於總頁數
      // 如果傳入頁數小於等於0
      if (tempPage <= 0) {
        // 讓當前頁數變為1
        tempPage = 1;
      } else if (tempPage > totalPages) {
        // 如果傳入頁數大於總頁數
        // 讓當前頁數變為總頁數
        tempPage = totalPages;
      }

      // 依當前頁數做商品陣列切割，顯示6筆1頁
      vm.showProducts = vm.tempProducts.slice((tempPage - 1) * 6, tempPage * 6);
      // 存入當前頁數
      vm.pagination.currentPage = tempPage;
    },
    // 轉址到商品細節頁面
    goToProductDetail(productId) {
      this.$router.push({ name: 'Product_detail', params: { id: productId } });
    },
    // 取得購物車列表
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(api).then((response) => {
        // 將購物車資料存入
        vm.tempCart = response.data.data;
      });
    },
    // 檢查購物車商品
    checkCart(id, qty = 1, event) {
      const vm = this;
      // 顯示按鈕讀取動畫
      const i = '<i class="fas fa-spinner fa-spin"></i>';
      $(event.target).append(i);
      // 關閉按鈕以免連續點擊
      $(event.target).attr('disabled', true);

      // 後端格式
      const cart = {
        product_id: id,
        qty,
      };
      // 查看是否有重複的資料
      const check = vm.tempCart.carts.find((item) => item.product_id === id);
      // 如果購物車有重複的商品，先刪除後再重新加入
      if (check !== undefined) {
        // 讓該商品數量加1
        cart.qty = check.qty + 1;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${check.id}`;
        vm.$http.delete(url).then(() => {
          vm.addtoCart(cart, event);
        });
      } else {
        vm.addtoCart(cart, event);
      }
    },
    // 將商品加入購物車
    addtoCart(cart, event) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.post(api, { data: cart }).then((response) => {
        // 如果加入購物車成功
        if (response.data.success) {
          // 更新導覽列購物車數量
          vm.$bus.$emit('upateCartQty');
          // 重新取得購物車資料
          vm.getCart();
        }

        // 移除按鈕讀取動畫
        $(event.target)
          .children()
          .remove();
        // 重新開啟按鈕
        $(event.target).attr('disabled', false);
      });
    },
  },
  watch: {
    // 商品排序處理
    sortMethod(value) {
      const vm = this;
      if (value === '價格排序低到高') {
        // 升冪
        vm.tempProducts.sort((a, b) => a.price - b.price);
      } else if (value === '價格排序高到低') {
        // 降冪
        vm.tempProducts.sort((a, b) => b.price - a.price);
      }

      // 頁數計算及顯示
      vm.getPagination();
    },
    // 監聽網址改變時處理
    $route() {
      const vm = this;
      // 轉換頁面位置
      const target = $('#show').offset().top;
      $('html,body').animate({ scrollTop: target - 100 }, 600);

      // 重新取得商品列表
      vm.getProducts();
    },
  },
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.getCart();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/_rwdMixin";

$thirdColor: #cacd4a;

// 側邊欄
.sticky_container {
  position: sticky !important;
  top: 100px;
  left: 0;
  height: 300px;
}

// 排序
.custom-select {
  max-width: 25%;
  border-radius: 0;
  &:focus {
    border: 1px solid #ced4da;
    box-shadow: 0 0 0 0;
  }
  @include md {
    max-width: 35%;
  }
  @include sm {
    max-width: 50%;
    font-size: 14px;
  }
}

// 商品文字
.card-body {
  h3 {
    @include md {
      font-size: 20px;
    }
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
    background: $thirdColor;
    transition: 0.5s ease;
    opacity: 0;
    transition: opacity 0.7s ease-in;
  }
  &:hover .overlay {
    opacity: 1;
    transition: opacity 0.7s ease-out;
  }

  img {
    height: 180px;
    object-fit: cover;
    border-radius: 0px;
    transform: scale(1, 1);
    transition: transform 0.7s ease-in;
  }
  &:hover img {
    transform: scale(1.05, 1.05);
    transition: transform 0.7s ease-out;
  }
}

// 缺貨商品連結指標樣式
.disabled_link {
  cursor: default;
}
</style>
