<template>
  <el-container class="layout-wrap">
    <el-aside width="200px" class="layout-aside"><left-menu /></el-aside>
    <el-container>
      <el-header class="layout-header">
        <head-nav />
      </el-header>
      <bread></bread>
      <el-main class="layout-main">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
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
.layout-wrap {
  height: 100vh;
}
.layout-header{
  position: relative;
  z-index: 2;
  height: 75px;
  background-color: #fff;
  .webkit(box-shadow,0 3px 16px 0 rgba(0,0,0,.1));
}
.layout-main{
  border: 25px solid #f7f7f7;
  background-color: #fff;
  overflow-x: hidden;//去掉由transform动画导致的横向滚动条
}
</style>
