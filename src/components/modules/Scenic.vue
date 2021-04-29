<template>
  <div>
    <div class="table">
      <el-table
        :data="scenicPage.regard"
        style="width: 100%;"
        max-height="800px"
        :header-cell-style="{textAlign: 'center'}"
        stripe>
        <el-table-column
          prop="areaId"
          label="景点编号"
          width="100px"></el-table-column>
        <el-table-column
          prop="name"
          label="景点名称"
          width="100px"></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="250px"></el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          :show-overflow-tooltip="true"
          width="300px"></el-table-column>
        <el-table-column
          label="图片"
          width="50px">
          <template slot-scope="prop">
            <el-image :src="prop.row.pic" :preview-src-list="prop.row.pics"></el-image>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="scenicListParam.page"
        :page-size="scenicListParam.limit"
        :total="scenicListParam.total"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scenicListParam: {
        page: 1,
        limit: 10,
        total: 0
      },
      scenicPage: {}
    }
  },
  beforeMount () {
    this.getScenicList()
  },
  methods: {
    async getScenicList () {
      await this.$axios({
        method: 'POST',
        data: this.scenicListParam,
        url: '/scenicarea/list'
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            return false
          }
          this.scenicPage = data.page
          this.scenicList = data.page.regard
          this.scenicListParam.page = this.scenicPage.currPage
          this.scenicListParam.limit = this.scenicPage.pageSize
          this.scenicListParam.total = this.scenicPage.totalCount
          for (const scenic of this.scenicList) {
            scenic.pics = [scenic.pic]
          }
          return true
        }
      )
    }
  }
}
</script>

<style lang="css">
  .el-table .green-row {
    background-color: #f0f9eb;
  }
</style>
