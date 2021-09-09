<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col mt-5">
          <h1 class="h3 text-center mt-3 text-mainColor">產品列表</h1>
        </div>
      </div>

      <div class="row">
        <div class="col mt-3">
          <button
            class="btn btn--baseSet btn--secColor"
            @click="openModal(true)"
          >
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
                <th width="160" class="text-right">售價</th>
                <th width="160">庫存狀況</th>
                <th width="160">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="item in products" :key="item.id">
                <td class="align-middle">{{ item.category }}</td>
                <td class="align-middle text-left pl-5">
                  <img :src="item.imageUrl" alt="商品圖片" class="img" /><span
                    class="pl-2 text-secColor"
                    >{{ item.title }}</span
                  >
                </td>
                <td class="align-middle text-right">
                  {{ item.price | currency }}
                </td>
                <td class="align-middle">
                  <span v-if="item.is_enabled" class="text-success"
                    >有庫存</span
                  >
                  <span v-else>缺貨中</span>
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
      <!-- End 產品列表 -->
    </div>

    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>

    <!-- edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="editModalLabel">
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
          <form @submit.prevent="updateProduct">
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image"
                      >輸入圖片網址 <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      required
                      v-model="tempProduct.imageUrl"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片 <span class="text-danger">*</span>
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.fileUploading"
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control customFile"
                      ref="files"
                      @change="uploadFile"
                    />
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title"
                      >名稱 <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      required
                      v-model="tempProduct.title"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category"
                        >分類 <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        id="category"
                        class="form-control"
                        required
                        v-model="tempProduct.category"
                      >
                        <option value="" disabled selected>請選擇</option>
                        <option value="床">床</option>
                        <option value="沙發">沙發</option>
                        <option value="椅子">椅子</option>
                        <option value="桌子">桌子</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price"
                        >售價 <span class="text-danger">*</span></label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        min="100"
                        required
                        v-model="tempProduct.price"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="description"
                      >產品描述 <span class="text-danger">*</span></label
                    >
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      rows="5"
                      placeholder="最優質的沙發商品，皮革是使用牛皮之外．．．"
                      required
                      v-model="tempProduct.description"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content"
                      >產品規格 <span class="text-danger">*</span></label
                    >
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      rows="3"
                      placeholder="顏色、材質、尺寸等。"
                      required
                      v-model="tempProduct.content"
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
                        是否有庫存
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn--baseSet btn-outline--secColor"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="submit"
                class="btn btn--baseSet btn--mainColor updateBtn"
              >
                確認
                <i
                  class="fas fa-spinner fa-spin"
                  v-if="status.buttonIsLoading"
                ></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End edit Modal -->

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
              class="btn btn--baseSet btn-outline--secColor"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn--baseSet btn--mainColor updateBtn"
              @click="deleteProduct()"
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
    <!-- End delete Modal -->
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import LoadingPage from '@/components/common/Loading_page.vue';
import Pagination from '@/components/back/PaginationBack.vue';

export default {
  name: 'Products_list',
  components: {
    LoadingPage,
    Pagination,
  },
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
  methods: {
    // 取得產品列表以及頁數資訊
    getProducts(page = 1) {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(api).then((response) => {
        // 如果取資料成功
        if (response.data.success) {
          // 關閉整頁讀取動畫
          vm.status.pageIsLoading = false;

          // 存入產品資料
          vm.products = response.data.products;
          // 存入頁碼資料
          vm.pagination = response.data.pagination;
        } else {
          // 執行登出
          vm.signout();
        }
      });
    },
    // 登出
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then((response) => {
        // 如果登出成功返回首頁
        if (response.data.success) {
          vm.$router.push({ name: 'Home' });
        }
      });
    },
    // 新增與編輯畫面 modal
    // 參數 isNew:判斷是新增還是編輯; item: 要編輯的資料
    openModal(isNew, item) {
      const vm = this;
      // 將資料存入 給 updateProduct()作判斷
      vm.isNew = isNew;
      // 將暫存資料清空，以免開啟 modal時還有舊資料
      vm.tempProduct = {};
      // 將上傳檔案的資料清空，以免開啟 modal時還有舊資料
      document.getElementById('customFile').value = '';
      // 因傳參考的特性，怕影響原始 product資料，故用解構的方式處理
      vm.tempProduct = { ...item };

      // 開啟 modal
      $('#editModal').modal('show');
    },
    // 更新產品
    updateProduct() {
      const vm = this;

      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      // 關閉確認按鈕以免連續點擊
      $('.updateBtn').attr('disabled', true);

      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      // 如果是要編輯產品，
      if (!vm.isNew) {
        // 修改 api路徑
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        // 將請求方法改為 put
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        // 如果更新或新增成功
        if (response.data.success) {
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message, 'success');

          // 關閉 modal
          $('#editModal').modal('hide');

          // 重新取得產品
          vm.getProducts();
        } else {
          // 如果失敗
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message);

          // 關閉 modal
          $('#editModal').modal('hide');

          // 重新取得產品
          vm.getProducts();
        }
        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 重新開啟確認按鈕
        $('.updateBtn').attr('disabled', false);
      });
    },
    // 產品刪除確認 modal
    openDeleteModal(item) {
      const vm = this;
      // 開啟確認畫面
      $('#deleteModal').modal('show');

      // 將要刪除的產品先存入，給 deleteProduct()使用
      vm.tempDeleteItem = item;
    },
    // 刪除產品
    deleteProduct() {
      const vm = this;
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempDeleteItem.id}`;
      vm.$http.delete(api).then((response) => {
        // 如果刪除成功
        if (response.data.success) {
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message, 'success');
        } else {
          // 失敗
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message);
        }
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
      // 顯示上傳按鈕讀取動畫
      vm.status.fileUploading = true;

      // 為上傳檔案的資訊
      const uploadedFile = vm.$refs.files.files[0];
      // 使用 web api的 FormData()來模擬表單，因上傳檔案需用form的格式
      // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
      const formData = new FormData();
      // 用 append傳送上傳檔案的欄位與資料
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.$http
        .post(api, formData, {
          // 設定表單的表頭為 enctype="multipart/form-data" 這樣才能上傳檔案
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // 如果上傳成功
          if (response.data.success) {
            // 因 tempProduct.imageUrl沒有雙向綁定，故使用 $set將資料綁定
            // 參數(目標物件或是目標陣列,目標屬性或是陣列元素位置,賦予的資料值)
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            // 傳送參數給 AlertMessage並執行彈出訊息回饋
            vm.$bus.$emit('messsage:push', response.data.message, 'danger');
          }

          // 關閉上傳按鈕讀取動畫
          vm.status.fileUploading = false;
        });
    },
  },
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
// table 樣式
.table {
  // 產品圖片
  .img {
    width: 100px;
    height: 80px;
  }
}

// modal 樣式
.modal {
  .customFile {
    height: auto;
  }
}
</style>
