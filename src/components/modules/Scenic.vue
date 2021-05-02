<template>
  <div>
    <div class="table">
      <el-table
        :data="scenicPage.regard"
        style="width: 100%;"
        max-height="800px"
        :header-cell-style="{textAlign: 'center'}"
        border
        stripe>
        <el-table-column
          prop="areaId"
          label="景点编号"
          width="150px"></el-table-column>
        <el-table-column
          prop="name"
          label="景点名称"
          width="100px"></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="400px"></el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          :show-overflow-tooltip="true"
          width="600px"></el-table-column>
        <el-table-column
          label="图片"
          width="94px">
          <template slot-scope="prop">
            <el-image :src="prop.row.pic" :preview-src-list="prop.row.pics">
              <span slot="error" style="text-align: center">暂无</span>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="details(scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
            <el-button
              @click.native.prevent="deleteThisRow(scope.row.areaId)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
        total: 0,
        totalPage: 0
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
          this.pageValuation(data)
          return true
        }
      )
    },
    handleSizeChange (val) {
      this.scenicListParam.limit = val
      this.getScenicList()
    },
    handleCurrentChange (val) {
      this.scenicListParam.page = val
      this.getScenicList()
    },
    pageValuation (data) {
      this.scenicPage = data.page
      this.scenicList = this.scenicPage.regard
      this.scenicListParam.page = this.scenicPage.currPage
      this.scenicListParam.limit = this.scenicPage.pageSize
      this.scenicListParam.total = this.scenicPage.totalCount
      this.scenicListParam.totalPage = this.scenicPage.totalPage
      for (const scenic of this.scenicList) {
        scenic.pics = [scenic.pic]
      }
    },
    details (row) {
      alert(row)
    },
    async deleteThisRow (areaId) {
      if (areaId === null || areaId === '') {
        return
      }
      await this.$axios({
        method: 'POST',
        url: '/scenicarea/del',
        data: {
          areaId: areaId
        }
      }).then(
        (response) => {
          const data = response.data
          if (data.code !== 0) {
            this.$message.error(data.msg)
            return false
          }
          this.getScenicList()
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
    max-height: 900px;
  }

  .table {
    width: 83%;
    height: 90%;
    text-align: center;
    margin: auto;
    padding: 0;
    position: absolute;
  }

  .cell {
    text-align: center;
  }
</style>
