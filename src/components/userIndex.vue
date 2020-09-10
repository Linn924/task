<template>
  <div class="box">
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="aside">
              <el-menu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-money"></i>
                    <span> 资金操作</span>
                  </template>
                    <el-menu-item index="1-1">存款</el-menu-item>
                    <el-menu-item index="1-2">取款</el-menu-item>
                    <el-menu-item index="1-2">转账</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-user"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-lock"></i>
                  <span slot="title">修改密码</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-bank-card"></i>
                  <span slot="title">交易记录</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-date"></i>
                  <span slot="title">查看新闻</span>
                </el-menu-item>
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
