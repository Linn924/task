<template>
  <div class="box">
    <el-container class="container">
        <el-header class="header">
          <span class="logo">个人资金账户管理系统</span>
          <my-loginout></my-loginout>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
              <el-menu router :default-active='defaultActive'>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-money"></i>
                    <span> 资金操作</span>
                  </template>
                    <el-menu-item index="/userindex/save">存款</el-menu-item>
                    <el-menu-item index="/userindex/withdrawal">取款</el-menu-item>
                    <el-menu-item index="/userindex/transfer">转账</el-menu-item>
                </el-submenu>
                <el-menu-item index="/userindex/information">
                  <i class="el-icon-user"></i>
                  <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/userindex/modifypwd">
                  <i class="el-icon-lock"></i>
                  <span slot="title">修改密码</span>
                </el-menu-item>
                <el-menu-item index="/userindex/transaction">
                  <i class="el-icon-bank-card"></i>
                  <span slot="title">交易记录</span>
                </el-menu-item>
                <el-menu-item index="/userindex/allnews">
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
import loginout from './loginout'

export default {
  components:{
      'my-loginout':loginout
  },
  data() {
    return {
        defaultActive: ''
    }
  },
  created(){
      this.defaultActive = this.$router.history.current.path
  }
}
</script>

<style scoped lang="less">
.box,.container{
    height: 100%;
}
.header{
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
}
.logo{
  line-height: 59px;
  font-size: 22px;
}
.aside{
    height: 100%;
    border-right: 1px solid #eee;
}
</style>
