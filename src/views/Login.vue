<template>
  <div class="login">
    <div class="login-box">
      <div class="header">
        登录
      </div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="login-input"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips" @click="register">没有账号？立即注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        username: "admin",
        password: "123",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
          localStorage.setItem("ms_username", this.param.username);
          this.$router.push("/");
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    },
    //去注册
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("../assets/imgs/bg.jpg");
  background-repeat: no-repeat;
  .fj(center);
}
.login-box {
  width: 350px;
  height: 300px;
  position: absolute;
  background-color: #00000068;
  padding: 20px;
}
.header {
  .sc(25px, #fff);
  text-align: center;
}
.login-input {
  text-align: center;
  padding-top: 35px;
  .login-btn button {
    width: 100%;
  }
  .login-tips {
    padding-top: 20px;
    text-align: right;
    color: #fff;
    cursor: pointer;
  }
}
</style>
