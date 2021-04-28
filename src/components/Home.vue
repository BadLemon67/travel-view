<template>
  <div>
    <span>Welcome, {{username}}</span>
    <br>
    <el-button type="warning" @click="logout" round>登出</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  beforeMount () {
    this.getUsername()
  },
  methods: {
    async getUsername () {
      await this.$axios({
        method: 'POST',
        url: '/sys/user/getInfo'
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            return false
          }
          this.username = data.page.username
          return true
        }
      )
    },
    async logout () {
      await this.$axios({
        method: 'POST',
        url: '/sys/user/logout'
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            return false
          }
          this.$router.push('/login')
          return true
        }
      )
    }
  }
}
</script>

<style>

</style>
