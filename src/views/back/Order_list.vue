<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>

    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col mt-5">
          <h1 class="h3 text-center mt-3 text-mainColor">訂單列表</h1>
        </div>
      </div>

      <!-- 訂單列表 -->
      <div class="row">
        <div class="col">
          <table class="table table-hover mt-3">
            <thead class="thead-dark">
              <tr class="text-center">
                <th width="160">訂單時間</th>
                <th width="250">訂單編號</th>
                <th width="160">電子信箱</th>
                <th>購買品項</th>
                <th class="text-right">訂單金額</th>
                <th width="160">訂單狀態</th>
                <th width="160">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(item, key) in sortOrder"
                :key="key"
                v-show="orders.length"
                :class="{ 'text-secondary': !item.is_paid }"
              >
                <td class="align-middle">{{ item.create_at | date }}</td>
                <td class="align-middle">{{ item.id }}</td>
                <td class="align-middle">
                  <span>{{ item.user.email }}</span>
                </td>
                <td class="align-middle text-left">
                  <ul class="list-unstyled pl-5">
                    <li v-for="(product, index) in item.products" :key="index">
                      {{ product.product.title }} x{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td class="align-middle text-right">
                  {{ item.total | currency }}
                </td>
                <td class="align-middle">
                  <span v-if="item.is_paid">訂單成立</span>
                  <span v-else>取消訂單</span>
                </td>
                <td class="align-middle">
                  <a
                    href="#!"
                    title="編輯"
                    @click.prevent="openModal('edit', item)"
                  >
                    <i class="far fa-edit edit_icon"></i>
                  </a>
                  <span v-if="item.is_paid">
                    |
                    <a
                      href="#!"
                      title="取消"
                      class="align-middle"
                      @click.prevent="openModal('cancel', item)"
                    >
                      <i class="far fa-times-circle delete_icon pt-1"></i>
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- End 訂單列表 -->
      <Pagination :pages="pagination" @emitPages="getAllOrders"></Pagination>
    </div>

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
              <span>編輯訂單</span>
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
          <form @submit.prevent="updateOrder">
            <div class="modal-body">
              <div class="row">
                <!-- 訂單詳情 -->
                <div class="col-6 table">
                  <h5 class="text-center pt-3 pb-3">訂單詳情</h5>
                  <table class="w-100">
                    <thead>
                      <tr class="text-center">
                        <th
                          scope="col"
                          colspan="2"
                          class="font-weight-normal text-left"
                        >
                          商品名稱
                        </th>
                        <th scope="col" class="font-weight-normal text-right">
                          單價
                        </th>
                        <th scope="col" class="font-weight-normal">數量</th>
                        <th
                          scope="col"
                          class="font-weight-normal text-right text-mainColor"
                        >
                          折扣
                        </th>
                        <th scope="col" class="font-weight-normal text-right">
                          小計
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="text-center"
                        v-for="(item, index) in tempOrder.products"
                        :key="index"
                      >
                        <td colspan="2" class="align-middle text-left">
                          <span class="text-secColor">{{
                            item.product.title
                          }}</span>
                        </td>
                        <td class="align-middle text-right">
                          {{ item.product.price | currency }}
                        </td>
                        <td class="align-middle">x{{ item.qty }}</td>
                        <td
                          class="align-middle text-right text-mainColor"
                          v-if="item.total - item.final_total > 0"
                        >
                          -{{ (item.total - item.final_total) | currency }}
                        </td>
                        <td
                          class="align-middle text-right text-mainColor"
                          v-else
                        >
                          -
                        </td>
                        <td class="align-middle text-right">
                          {{ item.final_total | currency }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot class="tfoot">
                      <tr>
                        <td colspan="3" class="align-middle">總計</td>
                        <td
                          colspan="3"
                          class="align-middle text-right font-weight-bold"
                        >
                          {{ tempOrder.total | currency }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <!-- End 訂單詳情 -->

                <!-- 收件人 -->
                <div class="col-6" v-if="tempOrder.hasOwnProperty('create_at')">
                  <h5 class="text-center pt-3 pb-3">收件人資訊</h5>
                  <div class="form-row">
                    <div class="form-group col-md">
                      <label for="name"
                        >姓名 <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        required
                        v-model="tempOrder.user.name"
                      />
                    </div>
                    <div class="form-group col-md">
                      <label for="tel"
                        >聯絡電話 <span class="text-danger">*</span></label
                      >
                      <input
                        type="tel"
                        class="form-control"
                        id="tel"
                        required
                        v-model="tempOrder.user.tel"
                      />
                    </div>
                    <div class="form-group col-md">
                      <label for="email"
                        >電子信箱 <span class="text-danger">*</span></label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        required
                        v-model="tempOrder.user.email"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="address"
                      >地址 <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      required
                      v-model="tempOrder.user.address"
                    />
                  </div>
                  <div class="form-group">
                    <label for="comments">訂單備註(選填)</label>
                    <textarea
                      class="form-control"
                      id="comments"
                      placeholder="例如: 運送時的特別註記。"
                      rows="2"
                      cols="5"
                      v-model="tempOrder.message"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="status"
                      >訂單狀態 <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      id="status"
                      class="form-control"
                      required
                      v-model="tempOrder.is_paid"
                    >
                      <option value="" disabled selected>請選擇</option>
                      <option value="true">訂單成立</option>
                      <option value="false">訂單取消</option>
                    </select>
                  </div>
                </div>
                <!-- End 收件人 -->
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
                修改
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

    <!-- cancel Modal -->
    <div
      class="modal fade"
      id="cancelModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cancelModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="cancelModalLabel">
              <span>取消訂單?</span>
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
              @click="updateOrder"
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
    <!-- End cancel Modal -->
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import LoadingPage from '@/components/common/Loading_page.vue';
import Pagination from '@/components/back/PaginationBack.vue';

export default {
  name: 'Order_list',
  components: {
    LoadingPage,
    Pagination,
  },
  data() {
    return {
      // 訂單
      orders: [],
      // 暫存訂單
      tempOrder: {},
      // 判斷該開啟的modal
      namedModal: '',
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
        // 確認按鈕讀取動畫
        buttonIsLoading: false,
      },
      // 頁數，這裡由後端設定每10筆顯示1頁
      pagination: {},
    };
  },
  methods: {
    // 取得訂單列表
    getAllOrders(page = 1) {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$http.get(api).then((response) => {
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;

        // 存入訂單資料
        vm.orders = response.data.orders;
        // 存入頁碼資料
        vm.pagination = response.data.pagination;
      });
      // 回到最上方
      $('html,body').scrollTop(0);
    },
    // 編輯與取消畫面 modal
    // 參數 name: 'edit'編輯或 'cancel'取消畫面;item: 要編輯的資料
    openModal(named, item) {
      const vm = this;
      // 存入訂單資訊好給後端 id，取得指定的單筆訂單資料
      // 因傳參考的特性，怕影響原始 order資料，故用淺拷貝處理(注意如果多層會失敗)。
      vm.tempOrder = { ...item };
      // 存入 modal名稱
      vm.namedModal = named;
      // 如果是取消按鈕 modal
      if (named === 'cancel') {
        // 借用 is_paid = false;設定為取消訂單
        vm.tempOrder.is_paid = false;
      }
      // 開啟 modal
      $(`#${named}Modal`).modal('show');
    },
    // 更新指定的訂單資料
    updateOrder() {
      const vm = this;
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      // 關閉確認按鈕以免連續點擊
      $('.updateBtn').attr('disabled', true);

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http.put(api, { data: vm.tempOrder }).then((response) => {
        // 傳送參數給 AlertMessage並執行彈出訊息回饋
        vm.$bus.$emit('messsage:push', response.data.message, 'success');

        // 關閉 modal
        $(`#${vm.namedModal}Modal`).modal('hide');

        // 重新取得訂單列表
        vm.getAllOrders();

        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 重新開啟確認按鈕
        $('.updateBtn').attr('disabled', false);
      });
    },
  },
  computed: {
    // 排序訂單
    sortOrder() {
      const vm = this;
      // 暫存排序後訂單
      let newOrder = [];
      // 如果有訂單資料
      if (vm.orders.length) {
        // 降冪排序
        newOrder = vm.orders.sort((a, b) => b.create_at - a.create_at);
      }
      return newOrder;
    },
  },
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
  },
  created() {
    this.getAllOrders();
  },
};
</script>

<style lang="scss" scoped>
// edit modal
.modal-lg {
  max-width: 1000px;
}

// 訂單詳情
// 最後一個表格線條
.tfoot {
  border-bottom: 2px solid #dee2e6;
}
</style>
