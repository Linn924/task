<template>
  <div class="box">
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="aside">
              <el-menu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    <span> 查看账户</span>
                  </template>
                    <el-menu-item index="1-1">所有账户</el-menu-item>
                    <el-menu-item index="1-2">已启用账户</el-menu-item>
                    <el-menu-item index="1-2">已冻结账户</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">开户</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-lock"></i>
                  <span slot="title">修改密码</span>
                </el-menu-item>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-date"></i>
                    <span> 新闻管理</span>
                  </template>
                    <el-menu-item index="4-1">查看新闻</el-menu-item>
                    <el-menu-item index="4-2">推送新闻</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    }
  },
}
</script>

<style scoped lang="less">
.box,.container{
    height: 100%;
}
.header{
    border-bottom: 1px solid #eee;
}
.aside{
    height: 100%;
    border-right: 1px solid #eee;
}
</style>
