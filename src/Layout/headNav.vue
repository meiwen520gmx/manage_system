<template>
  <header class="head-nav">
    <span class="collapse">
      <i class="collapse-icon el-icon-s-unfold"></i>
    </span>
    <!-- :style="{ width: headNavWidth + 'px' }" -->
    <div class="right-nav">
      <div class="userinfo">
        <el-menu class="el-menu-demo" mode="horizontal">
          <!-- <el-submenu index="1" popper-class="langItem">
                            <template slot="title">
                                <img :src="langLogo" class='langAvatar' alt="">
                            </template>
                            <el-menu-item index="1-1" @click="changeLocale('zh')">
                                <img :src="chinaImg" class='langAvatar' alt="">
                                <span class="intro">中文</span>
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="changeLocale('en')">
                                <img :src="americaImg" class='langAvatar' alt="">
                                <span class="intro">EngList</span>
                            </el-menu-item>
                        </el-submenu> -->
          <el-submenu index="2" popper-class="infoItem">
            <template slot="title">
              <div class="welcome">
                <span class="name">Hi,{{ name }}</span>
              </div>
              <img :src="avatar" class="avatar" alt="" />
            </template>
            <el-menu-item index="2-1" @click="handleTopMenu('info')"
              >个人中心</el-menu-item
            >
            <el-menu-item index="2-2" @click="handleTopMenu('index')"
              >首页</el-menu-item
            >
            <el-menu-item index="2-3" @click="handleTopMenu('logout')"
              >退出登录</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { setToken, getToken } from "@/common/auth";
import store from "@/store";

export default {
  name: "head-nav",
  data() {
    return {
      menu: {
        userBgcolor: "#f0f2f5",
      },
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "sidebar"]),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    /**
     * 个人中心，首页，退出登录
     * @param {string} params 类型
     */
    handleTopMenu(params) {
      switch (params) {
        case "info":
          this.$router.push("/infoManage/personCenter");
          break;
        case "index":
          this.$router.push("/index/index");
          break;
        case "logout":
          this.logout();
          break;
      }
    },
  },
};
</script>

<style scoped lang="less">

.head-nav {
  padding: 0 20px;
  .fj(space-between, center);
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.collapse{
  cursor: pointer;
  margin-left: -15px;
  .collapse-icon{
    font-size: 25px;
  }
}
.right-nav {
  .fj(flex-end, flex-start);
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo {
  padding: 0 10px;
}
.avatar {
  .wh(32px, 32px);
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
// .langAvatar {
//   .wh(24px, 24px);
//   border-radius: 50%;
//   vertical-align: middle;
//   display: inline-block;
// }
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
  }
  // .avatarname {
  //   font-weight: bolder;
  //   .sc(13px, #a9d86e);
  // }
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
</style>
