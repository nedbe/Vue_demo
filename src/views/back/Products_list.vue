<template>
  <div>
    <!-- vue-loading -->
    <loading :active.sync="status.pageIsLoading">
      <div class="loadingio-spinner-dual-ball-mx4nrrd19pi">
        <div class="ldio-l6eq6mvdt0s">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </loading>

    <div class="container-fluid mt-5">
      <!-- 標題 -->
      <div class="row">
        <div class="col mt-5">
          <h4 class="text-center mt-3 text-navbarColor">產品列表</h4>
        </div>
      </div>

      <!-- 建立產品 -->
      <div class="row">
        <div class="col mt-3">
          <button class="btn customize_btn btn_color" @click="openModal(true)">
            建立新的產品
          </button>
        </div>
      </div>

      <!-- 產品列表 -->
      <div class="row">
        <div class="col">
          <table class="table table-hover mt-3">
            <thead class="thead-dark">
              <tr class="text-center">
                <th width="160">產品分類</th>
                <th>產品名稱</th>
                <th width="160" class="text-right">原價</th>
                <th width="160" class="text-right">售價</th>
                <th width="160">是否啟用</th>
                <th width="160">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="item in products" :key="item.id">
                <td class="align-middle">{{ item.category }}</td>
                <td class="align-middle text-left pl-5">
                  <img
                    :src="item.imageUrl"
                    alt="商品圖片"
                    class="product_img"
                  /><span class="pl-2">{{ item.title }}</span>
                </td>
                <td class="align-middle text-right">
                  {{ item.origin_price | currency }}
                </td>
                <td class="align-middle text-right">
                  {{ item.price | currency }}
                </td>
                <td class="align-middle">
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    title="編輯"
                    @click.prevent="openModal(false, item)"
                  >
                    <i class="far fa-edit edit_icon"></i>
                  </a>
                  |
                  <a
                    href="#!"
                    title="刪除"
                    class="align-middle"
                    @click.prevent="openDeleteModal(item)"
                  >
                    <i class="far fa-times-circle delete_icon pt-1"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">產品名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入產品名稱"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn customize_btn btn_outline_color"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn customize_btn btn_main_color updateBtn"
              @click="updateProduct"
            >
              確認
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.buttonIsLoading"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="deleteModalLabel">
              <span>確認刪除?</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn customize_btn btn_outline_color"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn customize_btn btn_main_color"
              @click="deleteProduct()"
            >
              確認
              <i
                class="fas fa-spinner fa-spin updateBtn"
                v-if="status.buttonIsLoading"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'Products_list',
  data() {
    return {
      // 產品
      products: [],
      // 暫存產品
      tempProduct: {},
      // 判斷是否為新增產品
      isNew: false,
      // 暫存要刪除的產品
      tempDeleteItem: {},
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
        // 上傳檔案讀取動畫
        fileUploading: false,
        // 確認按鈕讀取動畫
        buttonIsLoading: false,
      },
      // 頁數，這裡由後端設定每10筆顯示1頁
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 取得產品列表以及頁數資訊
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;
      // AJAX
      this.$http.get(api).then((response) => {
        console.log(response.data);
        // 如果取資料成功
        if (response.data.success) {
          // 關閉整頁讀取動畫
          vm.status.pageIsLoading = false;
          // 存入產品資料
          vm.products = response.data.products;
          // 存入頁碼資料
          vm.pagination = response.data.pagination;
        }
      });
      // 回到最上方
      $('html,body').scrollTop(0);
    },
    // 新增與編輯畫面 modal
    // 參數 isNew:判斷是新增還是編輯; item: 要編輯的資料
    openModal(isNew, item) {
      const vm = this;
      // 如果是新增
      if (isNew) {
        // 將暫存資料清空，以免開啟 modal時還有舊資料
        vm.tempProduct = {};
        // 設定為新增產品，給 updateProduct()作判斷用
        vm.isNew = true;
      } else {
        // 如果是編輯
        // 因傳參考的特性，怕影響原始 product資料，故用解構的方式處理
        vm.tempProduct = { ...item };
        // 設定為編輯產品，給 updateProduct()作判斷用
        vm.isNew = false;
      }
      // 開啟 modal
      $('#productModal').modal('show');
    },
    // 更新產品
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      // 關閉確認按鈕以免連續點擊
      $('.updateBtn').attr('disabled', true);
      // 如果是要編輯產品，
      if (!vm.isNew) {
        // 修改 api路徑
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        // 將請求方法改為 put
        httpMethod = 'put';
      }
      // axios
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        // 如果更新或新增成功
        if (response.data.success) {
          // 關閉 modal
          $('#productModal').modal('hide');
          // 重新取得產品
          vm.getProducts();
        } else {
          // 如果失敗
          // 關閉 modal
          $('#productModal').modal('hide');
          // 重新取得產品
          vm.getProducts();
          console.log('新增失敗');
        }
        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 重新開啟確認按鈕
        $('.updateBtn').attr('disabled', false);
      });
    },
    // 產品刪除確認 modal
    openDeleteModal(item) {
      // 開啟確認畫面
      $('#deleteModal').modal('show');
      const vm = this;
      // 將要刪除的產品先存入，給 deleteProduct()使用
      vm.tempDeleteItem = item;
    },
    // 刪除產品
    deleteProduct() {
      const vm = this;
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempDeleteItem.id}`;
      // axios
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        // 重新取得產品
        vm.getProducts();
        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 關閉 modal
        $('#deleteModal').modal('hide');
      });
    },
    // 上傳檔案
    uploadFile() {
      const vm = this;
      // 為上傳檔案的資訊
      const uploadedFile = vm.$refs.files.files[0];
      // 使用 web api的 FormData()來模擬表單，因上傳檔案需用form的格式
      // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
      const formData = new FormData();
      // 用 append傳送上傳檔案的欄位與資料
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      // 顯示上傳按鈕讀取動畫
      vm.status.fileUploading = true;
      // axios
      this.$http
        .post(api, formData, {
          // 設定表單的表頭為 enctype="multipart/form-data" 這樣才能上傳檔案
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          // 如果上傳成功
          if (response.data.success) {
            // 因 tempProduct.imageUrl沒有雙向綁定，故使用 $set將資料綁定
            // 參數(目標物件或是目標陣列,目標屬性或是陣列元素位置,賦予的資料值)
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            // 傳送參數給 AlertMessage並執行彈出訊息回饋
            this.$bus.$emit('messsage:push', response.data.message, 'danger');
          }
          // 關閉上傳按鈕讀取動畫
          vm.status.fileUploading = false;
        });
    },
  },
  created() {
    // 進入時先取得產品出來
    this.getProducts();
    // 轉換頁面置頂
    $('html,body').scrollTop(0);
  },
};
</script>

<style lang="scss" scoped>
/* 引入 vue-loading套件自定義樣式 */
@import "@/assets/styles/scss/common/_loading";

// 引入 button 樣式
@import "@/assets/styles/scss/common/_button";

// 引入 input 樣式
@import "@/assets/styles/scss/common/_input";

// table 樣式
.table {
  // 產品圖片
  .product_img {
    width: 100px;
    height: 80px;
  }
}

// modal 樣式
.modal {
  .form-control {
    height: auto;
  }
}
</style>
