<template>
  <div class="menu_left cflex" :style="{ width: sidebar.width + 'px' }">
    <div class="menu_page_top rflex">
      <img
        :class="['logo', { closeLogo: !sidebar.opened }]"
        :src="logo"
        alt="company"
      />
      <span class="title" v-show="sidebar.opened">company</span>
    </div>
    <div class="menu_page_bottom is-scroll-left" id="menu_page">
      <el-menu
        mode="vertical"
        theme="dark"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="menuObj.bgColor"
        :text-color="menuObj.textColor"
        :active-text-color="menuObj.activeTextColor"
        :style="{ width: sidebar.width + 'px' }"
      >
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
              :to="getIindex(citem, item, cindex)"
              :key="cindex"
            >
              <el-menu-item
                v-if="citem.meta.title"
                :index="getIindex(citem, item, cindex)"
              >
                <span slot="title"> {{ citem.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logoImg from "@/assets/imgs/logo.png";
export default {
  name: "left-Menu",
  data() {
    return {
      menuObj: {
        bgColor: "rgb(48, 65, 86)",
        textColor: "rgb(191, 203, 217)",
        activeTextColor: "rgb(64, 158, 255)",
      },
      logo: logoImg,
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "sidebar", "permission_routers"]),
  },
  methods: {
    getIindex(citem, item, cindex) {
      return citem.meta.titleList
        ? item.path + "/" + citem.path + "/" + citem.meta.titleList[0].path
        : item.path + "/" + citem.path;
    },
  },
};
</script>

<style lang="less" scoped>
@left-bgColor: rgb(48, 65, 86); // 左侧菜单背景颜色;
@icon-link: #ff6c60;
.menu_left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.menu_page_top {
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.2);
  background-color: rgb(48, 65, 86);
  color: #fff;
  .logo {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    display: inline-block;
  }
  .closeLogo {
    width: 30px;
    height: 30px;
  }
  .title {
    font-size: 22px;
    i {
      color: #ff6c60;
    }
  }
}
.menu_page_bottom {
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  // margin-top: 3px;
  z-index: 10;
  box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
  background-color: rgb(48, 65, 86);
}
.el-menu-item:hover,
#menu_page  .el-submenu__title:focus,#menu_page .el-submenu__title:hover {
  background-color: #263445 !important;
}
</style>
