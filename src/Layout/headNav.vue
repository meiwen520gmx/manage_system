<template>
  <header
    class="head-nav rflex "
    :style="{ width: headNavWidth + 'px' }"
    id="header_container"
  >
    <div class="right-nav" ref="rightNav">
      <div class="userinfo-right">
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
.right-nav {
  display: flex;
  flex: 1;
  width: calc(100% - 180px);
  padding-right: 15px;
  justify-content: flex-end;
  box-shadow: 0px 2px 5px 0px rgba(237, 233, 233, 0.5);
}
.head-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 29;
  transition: width 0.2s;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
  background: #fff;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo-right {
  // width: 320px;
  padding: 0 10px;
  justify-content: space-between;
}
.userinfo {
  line-height: 60px;
  text-align: right;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.langAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
  }
  .avatarname {
    color: #a9d86e;
    font-weight: bolder;
    font-size: 13px;
  }
}

.username {
  cursor: pointer;
  margin-right: 5px;
}
.border {
  border: 1px solid;
}
</style>
