<template>
  <div class="register">
    <div class="register-box">
      <div class="header">
        注册
      </div>
      <el-form
        :model="param"
        :rules="rules"
        ref="register"
        label-width="0px"
        class="register-input"
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
        <el-form-item prop="telphone">
          <el-input v-model="param.telphone" placeholder="telphone">
            <el-button slot="prepend" icon="el-icon-phone-outline"></el-button>
          </el-input>
        </el-form-item>
        <div class="register-btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </div>
        <p class="register-tips" @click="login">已有账号？立即登录</p>
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
        telphone: "123123123132",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        telphone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          this.$message.success("注册成功！");
          this.$router.push("/login");
        } else {
          this.$message.error("请输入正确的信息！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    //去注册
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  position: relative;
  .wh(100%, 100%);
  background-image: url("../assets/imgs/bg.jpg");
  background-repeat: no-repeat;
  .fj(center);
}
.register-box {
  .wh(350px, 400px);
  position: absolute;
  background-color: #00000068;
  padding: 20px;
}
.header {
  .sc(25px, #fff);
  text-align: center;
}
.register-input {
  text-align: center;
  padding-top: 35px;
  .register-btn button {
    width: 100%;
  }
  .register-tips {
    padding-top: 20px;
    text-align: right;
    color: #fff;
    cursor: pointer;
  }
}
</style>
