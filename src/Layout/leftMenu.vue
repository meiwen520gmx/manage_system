<template>
  <!-- :style="{ width: sidebar.width + 'px' }" -->
  <div class="aside-menu">
    <div class="menu-logo">
      <img class="logo" :src="logo" alt="company" />
      <span class="title" v-show="sidebar.opened">高氏企业</span>
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
      <!-- <aside-menu v-for="(item, index) in permission_routers" :key="item.path" :route="item" :base-path="route.path"/> -->
      <!-- :style="{ width: sidebar.width + 'px' }" -->
      <template v-for="(item, index) in permission_routers">
        <!--表示 有一级菜单-->
        <router-link
          v-if="!item.hidden && item.noDropdown"
          :to="item.path + '/' + item.children[0].path"
          :key="index"
        >
          <el-menu-item
            class="dropItem"
            :index="item.path + '/' + item.children[0].path"
          >
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta.title" slot="title">{{
              item.meta.title
            }}</span>
          </el-menu-item>
        </router-link>
        <!--表示 有二级或者多级菜单 -->
        <el-submenu
          v-if="
            item.children &&
              item.children.length >= 1 &&
              !item.hidden &&
              !item.noDropdown
          "
          :index="item.path"
          :key="index"
        >
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta.title" slot="title">{{
              item.meta.title
            }}</span>
          </template>
          <!--直接定位到子路由上，子路由也可以实现导航功能-->
          <router-link
            v-for="(citem, cindex) in item.children"
            :to="item.path + '/' + citem.path"
            :key="cindex"
          >
            <el-menu-item
              v-if="citem.meta.title"
              :index="item.path + '/' + citem.path"
            >
              <span slot="title"> {{ citem.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logoImg from "@/assets/imgs/logo.png";
import AsideMenu from "@/components/asideMenu/Index";
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
    AsideMenu,
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
