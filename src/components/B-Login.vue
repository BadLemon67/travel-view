<template>
  <div class="login_container">
<!--    <div class="login_title_box">-->
<!--      <span class="login_title">旅游信息后台管理</span>-->
<!--    </div>-->
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/pic/logo.png" class="avatar_box_img">
      </div>
      <el-form class="login_form" :model="loginForm" ref="loginValidateForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
<!--        <span v-show="showMsg">用户名不存在</span>-->
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <el-form-item class="login_box_btn">
          <el-button type="primary" @click="loginSys" :loading="isLoading" plain round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /** 登录表单 */
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    async loginSys () {
      this.isLoading = true
      await this.$http.post('/api/sys/login/login', this.loginForm).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.isLoading = false
            this.password = ''
            alert(data.msg)
            return false
          }
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box {
  background-color: #ffffff;
  height: 100px;
  width: 100px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box_img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  -webkit-user-drag: none;
}

.login_title_box {
}

.login_title {
  font-size: 80px;
  color: #000000;
}
</style>
