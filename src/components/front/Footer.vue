<template>
  <div class="bg-footerColor fixed-buttom">
    <footer class="container">
      <ul class="row d-flex justify-content-around align-items-center">
        <li class="icon">
          <!-- Facebook -->
          <a class="btn" href="#!"><i class="fab fa-facebook-f"></i></a>

          <!-- Twitter -->
          <a class="btn" href="#!"><i class="fab fa-twitter"></i></a>

          <!-- Google -->
          <a class="btn" href="#!"><i class="fab fa-google"></i></a>

          <!-- Instagram -->
          <a class="btn" href="#!"><i class="fab fa-instagram"></i></a>
        </li>
        <li>
          <span class="text-white">聯絡電話：04-2244-6688</span>
        </li>
        <li>
          <span class="text-white"
            >ⓒ僅個人作品練習，無任何商業用途
            <span class="divider">
              <router-link
                class="user"
                href="#!"
                title="管理者登入"
                data-toggle="modal"
                data-target="#loginModal"
                :to="{ name: 'Dashboard' }"
                ><i class="fas fa-user"></i
              ></router-link>
            </span>
          </span>
        </li>
      </ul>
    </footer>

    <!-- 管理者登入 -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-navbarColor" id="modalLabel">
              管理者登入
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="signinController">
            <div class="modal-body">
              <div class="form-group">
                <label for="username" class="col-form-label">帳號</label>
                <input
                  type="text"
                  class="form-control inputDisabled"
                  id="username"
                  required
                  v-model="user.username"
                />
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">密碼</label>
                <input
                  type="text"
                  class="form-control inputDisabled"
                  id="password"
                  required
                  v-model="user.password"
                />
              </div>
            </div>
            <div
              class="modal-footer justify-content-end"
              :class="{ 'justify-content-between': status.showMessage }"
            >
              <span class="text-danger" v-if="status.showMessage"
                >帳號或密碼錯誤，請重新登入。</span
              >
              <button type="submit" class="btn login_btn">
                登入
                <i class="fas fa-spinner fa-spin" v-if="status.isLoading"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

export default {
  name: 'Footer',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      status: {
        showMessage: false,
        isLoading: false,
      },
    };
  },
  methods: {
    signinController() {
      const vm = this;
      vm.status.showMessage = false;
      vm.status.isLoading = true;
      $('.inputDisabled').attr('disabled', true);

      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      // 使用axios ajax
      vm.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        // 如果取得資料
        if (response.data.success) {
          // 取得api的token跟expired
          const { token } = response.data;
          const { expired } = response.data;
          // console.log(token, expired);

          // myToken 為自訂的Cookie名稱並儲存狀態; expires為到期時間
          document.cookie = `myToken=${token};expires=${new Date(expired)};`;

          // 轉址
          // 法一
          vm.$router.push('/admin');
          // 法二
          // vm.$router.push({ name: 'Dashboard'});
          $('#loginModal').modal('hide');
        } else {
          vm.status.showMessage = true;
        }
        vm.status.isLoading = false;
        $('.inputDisabled').attr('disabled', false);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$btn_color: #87775c;
$login_btn_color: #da471d;

footer {
  padding-top: 25px;
  padding-bottom: 15px;
  ul {
    padding: 0;
  }
}

// icon
a {
  width: 40px;
  margin-left: 5px;
  color: #fff;
  &:focus {
    // 移除效果
    box-shadow: 0 0 0 0;
  }
  &:hover {
    color: #cacd4a;
  }
}

// user icon 旁垂直線
.divider {
  border-left: 1px solid rgb(253, 159, 18);
  height: 30px;
  margin: 0 7.5px;
  .user {
    padding-left: 5px;
  }
}

// 管理者登入視窗
.modal {
  // 視窗外框
  .modal-content {
    border-radius: 0;
  }

  // 底線
  .modal-header {
    border-bottom: 2px solid #dee2e6;
  }

  .modal-footer {
    border-top: 0;
  }

  // 輸入框
  .form-control {
    border-radius: 0;
    &:focus {
      box-shadow: 0 0 0 0;
      border-color: $btn_color;
    }
  }
}

// 登入按鈕
.login_btn {
  color: #fff;
  font-size: 16px;
  background-color: $login_btn_color;
  border-radius: 0px;
  padding: 6px 20px;
  &:hover {
    background-color: $login_btn_color - #111111;
  }
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
</style>
