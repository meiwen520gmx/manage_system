<template>
  <el-container class="layout-wrap">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <el-aside width="200px" class="layout-aside"><left-menu /></el-aside>
    <el-container>
      <el-header class="layout-header">
        <head-nav />
      </el-header>
      <el-main class="layout-main">
        <content />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeadNav from "./headNav.vue";
import LeftMenu from "./leftMenu.vue";
import Content from "./content.vue";
import FooterNav from "./footerNav.vue";
import ResizeMixin from "./components/ResizeHandler";
import { mapGetters } from "vuex";

export default {
  name: "home",
  mixins: [ResizeMixin],
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["sidebar"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  components: {
    HeadNav,
    Content,
    LeftMenu,
    FooterNav,
  },
};
</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100vh;
}
.layout-header {
  position: relative;
  z-index: 2;
  height: 75px;
  background-color: #fff;
  .webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
.layout-main {
  border: 25px solid #f7f7f7;
  background-color: #fff;
  overflow-x: hidden; //去掉由transform动画导致的横向滚动条
}
</style>
