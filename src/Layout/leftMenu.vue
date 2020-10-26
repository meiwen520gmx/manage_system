<template>
  <!-- :style="{ width: sidebar.width + 'px' }" -->
  <div class="aside-menu">
    <div class="menu-logo">
      <img class="logo" :src="logo" alt="company" />
      <span class="title" v-show="sidebar.opened">xxx后台</span>
    </div>
    <el-menu
      mode="vertical"
      theme="dark"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="menuObj.bgColor"
      :text-color="menuObj.textColor"
      :active-text-color="menuObj.activeTextColor"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logoImg from "@/assets/imgs/logo.png";
import SidebarItem from "./components/SidebarItem";
export default {
  name: "left-Menu",
  data() {
    return {
      menuObj: {
        bgColor: "#001529",
        textColor: "#fff",
        activeTextColor: "#1890FF",
      },
      logo: logoImg,
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "sidebar", "permission_routers"]),
  },
  methods: {},
  components: {
    SidebarItem,
  },
};
</script>

<style lang="less" scoped>
.aside-menu {
  height: 100vh;
}
.menu-logo {
  .fj(center, center);
  padding: 15px 0;
  text-transform: uppercase;
  box-sizing: border-box;
  .logo {
    .wh(36px, 36px);
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    font-size: 22px;
    color: #fff;
  }
}
</style>
