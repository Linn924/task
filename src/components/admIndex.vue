<template>
  <div class="box">
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="aside">
              <el-menu :default-openeds="['1', '4']">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    <span> 查看账户</span>
                  </template>
                    <el-menu-item index="1-1"><router-link to="/allaccount">所有账户</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/usedaccount">已启用账户</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/frozendaccount">已冻结账户</router-link></el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                  <router-link to="/adduser"><i class="el-icon-circle-plus-outline"></i>开户</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                  <router-link to="/modifypwd"><i class="el-icon-lock"></i>修改密码</router-link>
                </el-menu-item>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-date"></i>
                    <span> 新闻管理</span>
                  </template>
                    <el-menu-item index="4-1"><router-link to="/allnews">查看新闻</router-link></el-menu-item>
                    <el-menu-item index="4-2"><router-link to="/addnews">推送新闻</router-link></el-menu-item>
                </el-submenu>
                <el-menu-item index="5">
                  <router-link to="/me"><i class="el-icon-user"></i>个人信息</router-link>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <el-main>
              <!-- 路由占位符 -->
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
  created(){
    // console.log(window.sessionStorage.getItem('id'))
  }
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
.el-menu-item>a{
  display: block;
  width: 100%;
  height: 100%;
  color: #303133;
  text-decoration: none;
}
</style>
