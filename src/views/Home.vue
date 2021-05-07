<template>
  <div>
    <Navbar />
    <Swiper />
    <div class="about bg-foggy">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="title text-warm">THE NAP STORE 設計傢俱</h1>
            <h3 class="label text-warm">
              Create a space that welcomes a lifetime of comfort and style
            </h3>
            <br />
            <div class="text-mocha">
              BoConcept 於 1952
              年在丹麥誕生，如今已成為一個高檔的零售時尚品牌。我們設計、生產並銷售適合起居室、餐廳、臥室、家庭辦公室和戶外空間的一系列現代丹麥
              設計傢俱、裝飾件和照明。我們的
              傢俱店提供現代設計的所有產品類別——從設計師沙發和，豐富多樣，不勝枚舉。我們還提供全面的家居或商店
              ，説明我們的客戶創造個性化的居所環境。室內設計師融入室內裝飾理念、家居配件等，為您的家居塑造獨特風格。我們的室內顧問可幫助您在餐廳營造北歐氛圍，運用斯堪的納維亞風格的
              打造酒店般的客廳。我們所有的傢俱店都有資深室內設計師駐場，他們會在店內為您提供建議，或者來到您的家中，
              傾聽您的需求，並構想出不同的解決方案，幫助您打造夢想之家。
              <br /><br />
              歡迎光臨我們的瞭解我們豐富多樣的多功能設計傢俱，並獲取有關現代生活和室內設計的專業建議。傢俱店會展示我們的斯堪的納維亞傢俱系列，並以最新的北歐風格和設計激發您的靈感。
              店員和室內設計師會幫助您找到貼合您個性和家居裝飾的完美風格。瀏覽我們的設計師傢俱時，在您所看到的一切背後都有著未展示出來的無限可能。我們的傢俱可根據您的需求進行
              ，並和諧搭配豐富的美麗色彩和材料，讓您的家中保持統一協調的外觀印象。苯胺皮革、毛氈、天鵝絨、橡木、胡桃木、鉻和鋼——我們將各種材料和表面結合在一起，
              通過美麗的定制組合突出來自丹麥
              ，並將其與現代和當代趨勢與技術相結合。
              立即前來我們的商店，欣賞植根于傳統同時也密切關注未來的丹麥設計精髓。
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scope>
.about {
  padding: 50px 0px;
}
</style>

<script>
// @ is an alias to /src
// 引入元件
import Navbar from '@/components/front/Navbar.vue';
import Swiper from '@/components/front/Swiper.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  name: 'Home',
  // 註冊元件
  components: {
    Navbar,
    Swiper,
    Footer,
  },
};
</script>
