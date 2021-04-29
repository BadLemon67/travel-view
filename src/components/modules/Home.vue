<template>
  <div>
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
    // this.getUsername()
  },
  methods: {
    /** 获取用户名 */
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
    dropdownCommand (type) {
      switch (type) {
        case 'logout': this.logout(); break
        default: break
      }
    },
    openHandler (key, keyPath) {
      if (key) {
        this.$router.push({
          path: key
        })
      }
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

<style lang="css">
</style>
