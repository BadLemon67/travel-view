<template>
  <div id="backstage">
    <el-container>
      <el-aside width="15%">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="openHandler"
          router>
          <el-menu-item index="/backstage/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="/backstage/scenic">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/backstage/scenic">
              <i class="el-icon-camera"></i>
              <span>景点管理</span>
            </el-menu-item>
            <el-menu-item index="/backstage/hotel">
              <i class="el-icon-suitcase"></i>
              <span>酒店管理</span>
            </el-menu-item>
            <el-menu-item index="/backstage/route">
              <i class="el-icon-position"></i>
              <span>线路管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/backstage/order">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="/backstage/feedback">
            <i class="el-icon-question"></i>
            <span>反馈信息</span>
          </el-menu-item>
          <el-menu-item index="/backstage/ad">
            <i class="el-icon-message-solid"></i>
            <span>宣传管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
            <el-dropdown @command="dropdownCommand">
              <img src="../assets/pic/logo.png" alt="avatar" class="user_avatar">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-circle-close" command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-header>
          <el-main>
            <router-view/>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'backstage',
  methods: {
    openHandler (key, keyPath) {
      if (key) {
        this.$router.push({
          path: key
        })
      }
    },
    dropdownCommand (type) {
      switch (type) {
        case 'logout': this.logout(); break
        default: break
      }
    }
  }
}
</script>

<style lang="css">
.user_avatar {
  height: 4vw;
  width: 4vw;
  border: solid 1px #eeeeee;
  box-shadow: 0 0 10px #dddddd;
  border-radius: 50%;
}

.el-header {
  box-shadow: 0 0 10px #dddddd;
}
</style>
