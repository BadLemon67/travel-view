<template>
  <div class="login_container">
    <div class="carousel_box">
      <div>
        <el-carousel :interval="4000" :height="variableHeight" direction="vertical" style="z-index: 0;">
          <el-carousel-item v-for="pic of pics" :key="pic" style="-webkit-user-drag: none">
            <el-image :src="pic" class="img_scroll" alt="加载失败"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="login_box">
        <div class="avatar_box" v-show="loginOrSign">
          <el-image :src="headUrl" class="avatar_box_img" alt="用户头像"></el-image>
        </div>
        <el-form class="loginAndSign_form" :model="loginForm" :rules="rules" v-show="loginOrSign">
          <el-form-item prop="login_loginName">
            <el-input v-model="loginForm.loginName" @keyup.enter.native="loginSys" v-on:input="getAvatar" placeholder="登录名" prefix-icon="el-icon-user-solid" clearable></el-input>
          </el-form-item>
          <el-form-item prop="login_password">
            <el-input v-model="loginForm.password" @keyup.enter.native="loginSys" placeholder="密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
          </el-form-item>
          <el-form-item class="login_box_btn">
            <el-button type="primary" @click="loginSys" :loading="isLoading" round>登录</el-button>
            <el-button type="primary" @click="switch2('loginForm')" plain round>注册</el-button>
          </el-form-item>
        </el-form>
        <el-form class="loginAndSign_form" :model="signForm" :rules="rules" v-show="!loginOrSign">
          <el-form-item prop="sign_mobile">
            <el-input v-model="signForm.mobile" placeholder="手机号" prefix-icon="el-icon-phone" maxlength="11" clearable></el-input>
          </el-form-item>
          <el-form-item prop="sign_password">
            <el-input v-model="signForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
          </el-form-item>
          <el-form-item prop="sign_password2">
            <el-input v-model="signForm.confirmPwd" placeholder="确认密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
          </el-form-item>
          <el-form-item prop="sign_opacity">
            <el-input v-model="signForm.inputOpacity" placeholder="验证码" prefix-icon="el-icon-warning" clearable>
              <el-button slot="append" @click="getOpacity" v-text="signForm.opacity"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item class="login_box_btn">
            <el-button type="primary" @click="sign" :loading="isLoading" round>注册</el-button>
            <el-button type="primary" @click="switch2('signForm')" plain round>返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    const validateLoginName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录名'))
      }
      callback()
    }
    const validateLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    const validateSignMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g.test(value)) {
        callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    const validateSignPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    const validateSignPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }
      callback()
    }
    const validateSignOpacity = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      callback()
    }
    return {
      /** 登录表单 */
      loginForm: {
        loginName: '',
        password: ''
      },
      /** 注册表单 */
      signForm: {
        mobile: '',
        password: '',
        confirmPwd: '',
        inputOpacity: '',
        opacity: '获取验证码',
        roleId: 2
      },
      pics: [
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E5%A4%9C%E6%99%AF.ea4e4124.jpg',
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E7%A7%92%E9%80%9F.jpg',
        'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E9%BB%84%E6%98%8F.jpg'
      ],
      rules: {
        login_loginName: [
          { validator: validateLoginName, trigger: 'blur' }
        ],
        login_password: [
          { validator: validateLoginPwd, trigger: 'blur' }
        ],
        sign_mobile: [
          { validator: validateSignMobile, trigger: 'blur' }
        ],
        sign_password: [
          { validator: validateSignPwd, trigger: 'blur' }
        ],
        sign_password2: [
          { validator: validateSignPwd2, trigger: 'blur' }
        ],
        sign_opacity: [
          { validator: validateSignOpacity, trigger: 'blur' }
        ]
      },
      headUrl: 'https://travel-pengr.oss-cn-chengdu.aliyuncs.com/%E5%A4%B4%E5%83%8F/Avatar_default.png',
      isLoading: false,
      arrowFlag: 'never',
      loginOrSign: true, // true : login, false : sign
      fullHeight: document.documentElement.clientHeight
    }
  },
  watch: {
    fullHeight (val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
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
            this.$message.error(data.msg)
            this.isLoading = false
            return false
          }
          const token = data.token
          localStorage.setItem('token', token)
          this.isLoading = false
          this.$router.push('/backstage')
          return true
        }
      )
    },
    async sign () {
      if (this.signForm.opacity !== this.signForm.inputOpacity) {
        this.$message.error('验证码不正确')
        this.getOpacity()
        return false
      }
      await this.$axios({
        method: 'POST',
        url: 'sys/user/sign',
        data: this.signForm
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            this.getOpacity()
            return false
          }
          this.loginOrSign = true
          this.loginForm.loginName = data.page.mobile
          return true
        }
      )
    },
    getOpacity () {
      this.signForm.opacity = ''
      for (let i = 0; i < 4; i++) {
        this.signForm.opacity += Math.floor(Math.random() * 10)
      }
    },
    clearValidateMsg (refName) {
      this.$refs[refName].clearValidate()
    },
    switch2 (refName) {
      this.loginOrSign = !this.loginOrSign
      this.loginForm.password = ''
      this.signForm.mobile = ''
      this.signForm.inputOpacity = ''
      this.signForm.opacity = '获取验证码'
      this.signForm.password = ''
      this.signForm.confirmPwd = ''
      this.clearValidateMsg(refName)
    },
    async getAvatar () {
      if (this.loginForm.loginName.length !== 11) {
        return
      }
      await this.$axios({
        method: 'POST',
        url: '/static/user/info/' + this.loginForm.loginName
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            return false
          }
          if (data.page.headUrl) {
            this.headUrl = data.page.headUrl
          }
          return true
        }
      )
    },
    getBodyHeight () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    }
  },
  mounted () {
    this.getBodyHeight()
  },
  computed: {
    variableHeight () {
      return this.fullHeight + 'px'
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
  max-width: 100%;
  height: auto;
  -webkit-user-drag: none;
}

.login_box {
  width: 25%;
  height: 40%;
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
  width: 6vw;
  height: 6vw;
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
  -webkit-user-drag: none;
}

.loginAndSign_form {
  position: absolute;
  bottom: 5%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  -webkit-user-drag: none;
}
</style>
