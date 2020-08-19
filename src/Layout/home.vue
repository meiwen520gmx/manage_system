<template>
  <div class="home rflex">
    <left-menu></left-menu>
    <div
      class="menu_right wflex el-scrollbar"
      ref="menu_right"
      :style="{ left: sidebar.width + 'px' }"
    >
      <head-nav></head-nav>
      <div class="menu_content" ref="menu_content">
        <bread></bread>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view
          ><!--页面渲染入口-->
        </transition>
      </div>
      <!-- <footerNav></footerNav> -->
    </div>
  </div>
</template>

<script>
import HeadNav from "./headNav.vue";
import LeftMenu from "./leftMenu.vue";
import Bread from "./bread.vue";
import FooterNav from "./footerNav.vue";
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  components: {
    HeadNav,
    LeftMenu,
    Bread,
    FooterNav,
  },
};
</script>

<style lang="less" scoped>
.home {
  .menu_right {
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f6f7fc;
    .menu_content {
      position: relative;
      width: 100%;
      height: calc(100% - 60px);
      margin-top: 60px;
      background: #f0f2f5;
    }
  }
}
</style>
