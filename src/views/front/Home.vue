<template>
  <div>
    <LoadingPage :loadingStatus="status.pageIsLoading"></LoadingPage>
    <SwiperNavigation />
    <div class="about bg-aboutColor pt-5">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="text-mainColor about__title">
              THE NAP STORE 設計傢俱品牌
            </h1>
            <h2 class="text-mainColor about__subtitle">
              Create a space that welcomes a lifetime of comfort and style.
            </h2>
            <br />
            <p class="text-secColor about__content">
              The Nap Store 創始於1989年，如今已成為一個知名的設計傢俱品牌。
              我們設計、生產並銷售適合於客廳、臥室和戶外空間等的一系列現代設計傢俱，
              同時我們也可以提供專業室內傢俱布置建議給客戶，
              我們會傾聽您的需求，並構想出不同的解決方案，幫助您打造出夢想之家。
            </p>
          </div>
        </div>
      </div>

      <div class="category">
        <div class="row">
          <div id="beds" class="col-md category__img">
            <router-link class="mask mask--hover zindex--m" to="/products/beds">
            </router-link>
            <h3 class="category__title">Beds</h3>
          </div>
          <div id="sofas" class="col-md category__img">
            <router-link
              class="mask mask--hover zindex--m"
              to="/products/sofas"
            >
            </router-link>
            <h3 class="category__title">Sofas</h3>
          </div>
        </div>
        <div class="row">
          <div id="chairs" class="col-md category__img">
            <router-link
              class="mask mask--hover zindex--m"
              to="/products/chairs"
            >
            </router-link>
            <h3 class="category__title">Chairs</h3>
          </div>
          <div id="tables" class="col-md category__img">
            <router-link
              class="mask mask--hover zindex--m"
              to="/products/tables"
            >
            </router-link>
            <h3 class="category__title">Tables</h3>
          </div>
        </div>
      </div>

      <div class="contact" id="contact">
        <span class="mask"></span>
        <div class="container pt-5 pb-md-5">
          <div class="row">
            <div class="col-12 col-sm-7 text-white align-self-center">
              <h3 class="contact__title">傢俱訂製 & 租借服務</h3>
              <p class="contact__content p-5">
                若您有傢俱訂製、租借的需求，或是對我們的服務上有任何的疑問，歡迎直接聯繫我們或填寫線上表單，我們的工作團隊將會盡快為您回覆。
              </p>
            </div>

            <!-- 聯繫表單 -->
            <div class="col-12 col-sm-5 bg-secColor pt-3 pb-3">
              <validation-observer v-slot="{ invalid }" ref="contactForm">
                <form id="contactData" @submit.prevent="submitContactData">
                  <div class="form-group col-md">
                    <validation-provider
                      :rules="{
                        min: 2,
                        required: 'required',
                      }"
                      v-slot="{ classes }"
                    >
                      <label for="姓名" class="text-white"
                        >姓名 <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        id="姓名"
                        class="form-control"
                        :class="classes"
                        placeholder="請輸入姓名"
                        v-model="contactData.name"
                      />
                    </validation-provider>
                  </div>
                  <div class="form-group col-md">
                    <validation-provider
                      rules="required|email"
                      v-slot="{ classes }"
                    >
                      <label for="電子信箱" class="text-white"
                        >電子信箱 <span class="text-danger">*</span></label
                      >
                      <input
                        type="email"
                        id="電子信箱"
                        class="form-control"
                        :class="classes"
                        placeholder="請輸入電子信箱"
                        v-model="contactData.email"
                      />
                    </validation-provider>
                  </div>
                  <div class="form-group col-md">
                    <validation-provider
                      :rules="{
                        required: 'required',
                      }"
                    >
                      <label for="主旨" class="text-white"
                        >主旨 <span class="text-danger">*</span></label
                      >
                      <select
                        id="主旨"
                        class="form-control"
                        v-model="contactData.service"
                      >
                        <option value="" disabled selected>請選擇</option>
                        <option value="傢俱訂製">傢俱訂製</option>
                        <option value="傢俱租借">傢俱租借</option>
                        <option value="其他服務">其他服務</option>
                      </select>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md">
                    <validation-provider
                      :rules="{
                        max: 500,
                        required: 'required',
                      }"
                      v-slot="{ classes }"
                    >
                      <label for="需求內容" class="text-white"
                        >需求內容 <span class="text-danger">*</span></label
                      >
                      <textarea
                        rows="5"
                        cols="10"
                        id="需求內容"
                        class="form-control"
                        :class="classes"
                        placeholder="限制500字以內"
                        v-model="contactData.message"
                      ></textarea>
                    </validation-provider>
                  </div>
                  <div class="col-md text-right">
                    <button
                      type="submit"
                      class="btn btn--baseSet btn--mainColor"
                      id="submitBtn"
                      :disabled="invalid"
                    >
                      確認送出
                    </button>
                  </div>
                </form>
              </validation-observer>
            </div>
            <!-- End 聯繫表單 -->
          </div>
        </div>

        <!-- 提交後訊息 -->
        <div
          class="modal fade"
          id="contactModal"
          tabindex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-md">
            <div class="modal-content rounded-0 border-0">
              <div class="modal-header bg-mainColor rounded-0 border-0">
                <h5 class="modal-title text-white" id="modalLabel">
                  THE NAP STORE
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click.prevent="closeModal"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body d-flex align-items-center modal__body">
                <p class="mb-0 modal__content">
                  系統已收到您的訊息，我們將會派專人與您聯繫，謝謝。
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End 提交後訊息 -->
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

// @ is an alias to /src
import SwiperNavigation from '@/components/front/Swiper_navigation.vue';
import LoadingPage from '@/components/common/Loading_page.vue';

export default {
  name: 'Home',
  data() {
    return {
      // 結帳資料
      contactData: {
        name: '',
        email: '',
        message: '',
        service: '',
      },
      // 判斷是否啟用狀態
      status: {
        // 整頁讀取動畫
        pageIsLoading: false,
      },
    };
  },
  components: {
    SwiperNavigation,
    LoadingPage,
  },
  methods: {
    // 提交表單資料
    submitContactData() {
      const vm = this;
      // vee-validate的api validate()
      vm.$refs.contactForm.validate().then((result) => {
        // 如果通過驗證
        if (result) {
          // 啟動整頁讀取動畫
          vm.status.pageIsLoading = true;
          setTimeout(() => {
            // 啟動整頁讀取動畫
            vm.status.pageIsLoading = false;

            $('#contactModal').modal('show');
          }, 800);
        }
      });
    },
    // 關閉 modal
    closeModal() {
      $('#contactModal').modal('hide');

      // 清除表單資料
      $('#submitBtn').attr('disabled', true);
      this.$refs.contactForm.reset();
      setTimeout(() => {
        $('#contactData')[0].reset();
      }, 500);
    },
    // 將畫面前往指定位置
    goTo() {
      const vm = this;
      const goTo = vm.$route.params.loaction;
      // 如果有網址參數
      if (goTo !== undefined) {
        // 取得待顯示內容的位置
        let target = $(`#${goTo}`).offset().top;
        // 將座標減去頁首px
        target -= 76;

        // 平滑捲動
        $('html,body').animate({ scrollTop: target }, 1500);
      } else {
        $('html,body').animate({ scrollTop: 0 }, 1500);
      }
    },
  },
  watch: {
    // 監聽網址改變時處理
    $route() {
      this.goTo();
    },
  },
  mounted() {
    // 轉換頁面時置頂
    $('html,body').scrollTop(0);
    this.goTo();

    $('body').addClass('front');
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/styles/scss/_rwdMixin";

// 品牌故事區塊
.about {
  &__title {
    @include sm {
      font-size: 22px;
    }
  }

  &__subtitle {
    @include sm {
      font-size: 20px;
    }
  }

  &__content {
    font-size: 20px;
    text-align: justify;
    margin-bottom: 50px;
    @include sm {
      font-size: 16px;
      margin-bottom: 25px;
    }
  }
}

// 產品分類圖片
.category {
  position: relative;
  overflow: hidden;

  .row:nth-child(1) {
    margin-top: 15px;
  }

  &__img {
    z-index: 100;
    height: 450px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: transform 0.7s ease-out;
    &:hover {
      z-index: 300;
      box-shadow: 3px 3px 12px #000;
      transform: scale(1.05, 1.05);
    }
    @include sm {
      height: 250px;
    }
  }

  &__title {
    position: absolute;
    bottom: 10%;
    left: 15%;
    color: #fff;
    font-size: 40px;
    font-weight: 300;
  }
}

// 製造遮色
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: block;
  background-color: rgba(#000, 0.3);

  &--hover {
    &:hover {
      background-color: rgba(#000, 0);
    }
  }
}

// 圖層
.zindex--m {
  z-index: 200;
}

// 背景圖
#beds {
  background-image: url("../../assets/images/home/about/beds.jpg");
}

#sofas {
  background-image: url("../../assets/images/home/about/sofas.jpg");
}

#chairs {
  background-image: url("../../assets/images/home/about/chairs.jpg");
}

#tables {
  background-image: url("../../assets/images/home/about/tables.jpg");
}

// 聯繫我們客製區塊
.contact {
  background-image: url("../../assets/images/home/contact/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  &__title {
    font-size: 40px;
    text-align: center;
    @include sm {
      font-size: 22px;
    }
  }

  &__content {
    font-size: 20px;
    text-align: justify;
    margin-bottom: 50px;
    @include sm {
      font-size: 16px;
      margin-bottom: 25px;
    }
  }

  .was-validated .form-control:valid,
  .form-control.is-valid,
  .was-validated .form-control:invalid,
  .form-control.is-invalid {
    border-color: unset;
    &:focus {
      box-shadow: unset;
    }
  }
}

// bootstrap modal
.front,
#nav {
  padding-right: 0px !important;
}

.front.modal-open {
  overflow-y: scroll;
  overflow-x: hidden;
}

.modal {
  &__body {
    height: 80px;
  }

  &__content {
    font-size: 18px;
  }
}
</style>
