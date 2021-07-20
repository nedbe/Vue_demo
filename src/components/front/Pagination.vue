<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.currentPage - 1), showPosition()"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.totalPages"
        :key="page"
        :class="{ active: pages.currentPage === page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(page), showPosition()"
          >{{ page }}</a
        >
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.currentPage === pages.totalPages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.currentPage + 1), showPosition()"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// 將$開頭給jquery使用
import $ from 'jquery';

export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emitPages', page);
    },
    showPosition() {
      // 轉換時頁面位置
      const target = $('#show').offset().top;
      $('html,body').animate({ scrollTop: target - 100 }, 600);
    },
  },
};
</script>
