<template>
<div>
  <el-table
    :data="users"
    border>
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="introduce"
      label="简介"
      width="220">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  beforeMount () {
    this.$axios({
      method: 'POST',
      url: '/sys/user/list'
    }).then(
      (response) => {
        console.log(response)
        this.users = response.data
        return true
      }
    )
  }
}
</script>

<style scoped>

</style>
