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
          <h1 class="h3 text-center mt-3 text-mainColor">優惠券列表</h1>
        </div>
      </div>

      <!-- 建立新優惠券 -->
      <div class="row">
        <div class="col mt-3">
          <button class="btn customize_btn btn_color" @click="openModal(true)">
            建立新的優惠券
          </button>
        </div>
      </div>

      <!-- 優惠券列表 -->
      <div class="row">
        <div class="col">
          <table class="table table-hover mt-3">
            <thead class="thead-dark">
              <tr class="text-center">
                <th width="160">名稱</th>
                <th width="160">折扣百分比</th>
                <th width="160">到期日</th>
                <th width="160">是否啟用</th>
                <th width="160">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(item, key) in coupons"
                :key="key"
                v-show="coupons.length"
              >
                <td class="align-middle">{{ item.title }}</td>
                <td class="align-middle">{{ item.percent }}%</td>
                <td class="align-middle">
                  {{ item.due_date | date }}
                </td>

                <td class="align-middle">
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else class="text-muted">未啟用</span>
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
                    title="取消"
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

      <!-- 分頁 -->
      <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>
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
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="editModalLabel">
              <span>編輯優惠券</span>
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
              <div class="col-12">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md">
                      <label for="title">名稱</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        required
                        v-model="tempCoupon.title"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md">
                      <label for="code">優惠碼</label>
                      <input
                        type="text"
                        class="form-control"
                        id="code"
                        required
                        v-model="tempCoupon.code"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md">
                      <label for="due_date">到期日</label>
                      <input
                        type="date"
                        class="form-control"
                        id="due_date"
                        required
                        v-model="due_date[0]"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md">
                      <label for="percent">折扣百分比</label>
                      <input
                        type="number"
                        class="form-control"
                        id="percent"
                        placeholder="請輸入數字"
                        min="1"
                        max="100"
                        required
                        v-model="tempCoupon.percent"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="is_enabled"
                          class="form-check-input"
                          :true-value="1"
                          :false-value="0"
                          v-model="tempCoupon.is_enabled"
                        />
                        <label class="form-check-label" for="is_enabled"
                          >是否啟用</label
                        >
                      </div>
                    </div>
                  </div>
                </form>
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
              @click="updateCoupon"
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
      aria-labelledby="cancelModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="cancelModalLabel">
              <span>刪除優惠券?</span>
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
              class="btn customize_btn btn_main_color updateBtn"
              @click="deleteCoupon"
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
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

import Pagination from '@/components/back/PaginationBack.vue';

export default {
  name: 'Coupons',
  data() {
    return {
      // 優惠券列表
      coupons: [],
      // 暫存優惠券
      tempCoupon: {},
      // 判斷是否為新增優惠券
      isNew: false,
      // 判斷開啟的modal
      namedModal: '',
      // 到期日
      due_date: [],
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
  components: {
    Pagination,
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      // 啟動整頁讀取動畫
      vm.status.pageIsLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      // axios
      vm.$http.get(api).then((response) => {
        console.log(response.data);
        // 關閉整頁讀取動畫
        vm.status.pageIsLoading = false;
        // 存入優惠券資料
        vm.coupons = response.data.coupons;
        // 存入頁碼資料
        vm.pagination = response.data.pagination;
      });
      // 回到最上方
      $('html,body').scrollTop(0);
    },
    openModal(isNew, item) {
      const vm = this;
      // 將資料存入給 updateCoupon()作判斷用，true新增;false編輯
      vm.isNew = isNew;
      // 如果是新增
      if (vm.isNew) {
        // 將暫存資料清空，以免開啟 modal時還有舊資料
        vm.tempCoupon = {};
        vm.due_date = [];
      } else {
        // 如果是編輯存入要修改的優惠券
        vm.tempCoupon = { ...item };
        // 將日期數值轉為西元年月日
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        // 存入日期
        vm.due_date = [...dateAndTime];
      }
      // 開啟 modal
      $('#editModal').modal('show');
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      // 預設存入 post
      let httpMethod = 'post';
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      // 關閉確認按鈕以免連續點擊
      $('.updateBtn').attr('disabled', true);
      // 如果是要編輯優惠券
      if (!vm.isNew) {
        // 修改 api路徑
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        // 將請求方法改為 put
        httpMethod = 'put';
      }
      // axios
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        // 傳送參數給 AlertMessage並執行彈出訊息回饋
        vm.$bus.$emit('messsage:push', response.data.message, 'success');
        // 關閉 modal
        $('#editModal').modal('hide');
        // 重新取得優惠券列表
        vm.getCoupons();
        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 重新開啟確認按鈕
        $('.updateBtn').attr('disabled', false);
      });
    },
    // 優惠券刪除確認 modal
    openDeleteModal(item) {
      // 開啟確認畫面
      $('#deleteModal').modal('show');
      const vm = this;
      // 將要刪除的優惠券先存入，給 deleteCoupon()使用
      vm.tempCoupon = { ...item };
    },
    // 刪除產品
    deleteCoupon() {
      const vm = this;
      // 顯示確認按鈕讀取動畫
      vm.status.buttonIsLoading = true;
      // 關閉確認按鈕以免連續點擊
      $('#deleteModal').attr('disabled', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      // axios
      vm.$http.delete(api).then((response) => {
        console.log(response.data);
        // 如果刪除成功
        if (response.data.success) {
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message, 'success');
        } else {
          // 失敗
          // 傳送參數給 AlertMessage並執行彈出訊息回饋
          vm.$bus.$emit('messsage:push', response.data.message);
        }
        // 重新取得優惠券
        vm.getCoupons();
        // 關閉確認按鈕讀取動畫
        vm.status.buttonIsLoading = false;
        // 重新開啟確認按鈕
        $('#deleteModal').attr('disabled', false);
        // 關閉 modal
        $('#deleteModal').modal('hide');
      });
    },
  },
  watch: {
    // 監控日期格式
    due_date() {
      const vm = this;
      // 將西元年月日改為數值格式(後端要的格式)
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      // 存入暫存日期
      vm.tempCoupon.due_date = timestamp;
    },
  },
  created() {
    // 進入時先取得優惠券列表
    this.getCoupons();
    // 轉換頁面置頂
    $('html,body').scrollTop(0);
  },
};
</script>
