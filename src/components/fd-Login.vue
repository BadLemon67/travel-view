<template>
  <div class="login_container">
    <div class="carousel_box">
      <div>
        <el-carousel :interval="4000" height="1000px" direction="vertical" style="z-index: 0;">
          <el-carousel-item v-for="pic of pics" :key="pic">
            <el-image :src="pic" class="img_scroll" alt="加载失败"></el-image>>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/pic/logo.png" class="avatar_box_img" alt="用户头像">
        </div>
        <el-form class="login_form" :model="loginForm" ref="loginValidateForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.loginName" placeholder="用户名" prefix-icon="el-icon-user" clearable></el-input>
          </el-form-item>
          <!--        <span v-show="showMsg">用户名不存在</span>-->
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
          </el-form-item>
          <el-form-item class="login_box_btn">
            <el-button type="primary" @click="loginSys" :loading="isLoading" round>登录</el-button>
            <el-button type="primary" @click="sign" plain round disabled>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      /** 登录表单 */
      loginForm: {
        loginName: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ]
      },
      isLoading: false,
      pics: [
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E5%A4%9C%E6%99%AF.ea4e4124.jpg',
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E7%A7%92%E9%80%9F.jpg',
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E9%BB%84%E6%98%8F.jpg'
      ],
      arrowFlag: 'never'
    }
  },
  methods: {
    async loginSys () {
      this.isLoading = true
      await this.$axios({
        method: 'POST',
        url: '/sys/user/login',
        data: this.loginForm
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.password = ''
            alert(data.msg)
            this.isLoading = false
            return false
          }
          const token = data.token
          localStorage.setItem('token', token)
          this.isLoading = false
          alert(data.msg + '\n' + 'token:' + data.token)
          // this.$router.push('/home')
          return true
        }
      )
    },
    sign () {
      this.$router.push('/sign')
    }
  }
}
</script>

<style lang="css" scoped>
.login_container {
  height: 100%;
}

.carousel_box {
  height: 100%;
  width: 100%;
}

.img_scroll {
  display: inline-block;
  height: auto;
  max-width: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 15px;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%,-50%);
  opacity: 0.7;
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
