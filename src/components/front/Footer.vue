<template>
  <div class="bg-night fixed-buttom">
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
              <a class="user" href="#" title="管理者登入"><i class="fas fa-user"></i></a>
            </span>
          </span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
footer {
  padding-top: 25px;
  padding-bottom: 15px;
}

ul {
  padding: 0;
}

a {
  width: 40px;
  margin-left: 5px;
  color: #fff;
  &:focus {
    // 移除效果
    box-shadow: 0 0 0 0;
  }
}

/* user icon 旁垂直線 */
.divider {
  border-left: 1px solid rgb(253, 159, 18);
  height: 30px;
  margin: 0 7.5px;
  .user{
      padding-left: 5px;
  }
}
</style>
