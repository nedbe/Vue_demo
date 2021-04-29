<template>
  <div class="bg-dark">
    <nav class="navbar navbar-expand-sm navbar-dark container">
      <!-- Brand -->
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >THE NAP STORE</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Links -->
        <ul class="navbar-nav ml-auto align-items-center">
          <li class="nav-item mr-2">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >首頁</router-link
            >
          </li>

          <!-- Dropdown -->
          <li class="nav-item dropdown mr-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbardrop"
              data-toggle="dropdown"
            >
              全部商品
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item mr-2" href="#">床</a>
              <a class="dropdown-item mr-2" href="#">椅子</a>
              <a class="dropdown-item mr-2" href="#">沙發</a>
            </div>
          </li>
          <li class="nav-item mr-2">
            <a class="nav-link" href="#"><i class="fas fa-heart"></i></a>
          </li>

          <li class="nav-item mr-2">
            <a class="nav-link" href="#"><i class="fas fa-shopping-bag"></i></a>
          </li>
          <li class="nav-item divider"></li>
          <li class="nav-item mr-2">
            <a class="nav-link" href="#"><i class="fas fa-user"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
/* user icon 旁垂直線 */
.divider {
  border-left: 1px solid rgb(253, 159, 18);
  height: 30px;
  margin: 0 7.5px;
}

</style>
