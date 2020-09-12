<template>
  <div class="forms">

    <div class="Login">

        <!-- 登录表单 -->
        <div class="login" >
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                <span>LOGIN</span>
                <span>Login with your account</span>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" clearable prefix-icon="el-icon-user-solid" placeholder="username" autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" clearable prefix-icon="el-icon-lock" type="password" placeholder="password"></el-input>
                </el-form-item>
                <div class="user">
                  <el-radio v-model="loginForm.radio" label="1">管理员</el-radio>
                  <el-radio v-model="loginForm.radio" label="2">用户</el-radio>
                </div>
                <el-button type="primary" @click="login">Login</el-button>
                <span>if you forget your password <a href="javascript:void(0)">Forget password?</a></span>
            </el-form>
        </div>

    </div> 
           
  </div>
</template>

<script>
export default {
  data() {
        return {
            //登录表单数据
            loginForm:{
                username:'',
                password:'',
                radio: '1'
            },
            //登录表单验证规则
            loginRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            },
            
        }
  },
  methods: {
        //点击登录按钮
        async login(){
             this.$refs.loginFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.$http.get('/login',{params:this.loginForm})
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                //把用户信息保存到sessionStorage中
                window.sessionStorage.setItem('id',res.id)
                window.sessionStorage.setItem('username',this.loginForm.username)
                if(this.loginForm.radio === '1'){
                    this.$router.push('/admindex')
                }else{
                    this.$router.push('/userindex')
                }
                //表单置空
                this.$refs.loginFormRef.resetFields()
             })
        },
    },
}
</script>

<style scoped lang="less">
a{
    color: #1e90ff;
    transition: color .3s;
    &:hover{color: #e74c3c;}
}
.forms{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/index.jpeg') no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
.Login{
    width: 540px;
    backdrop-filter: blur(50px);
    border-radius: 10px;
    padding: 50px 0;
    .login{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        .el-form{
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .user{
              display: flex;
            }
            .el-button{
                margin: 20px 0;
                width: 450px;
            }
        }
    }
}
.el-form span:first-child{
    text-align:center;
    font-weight: bolder;
    text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}
.el-form span:nth-child(2){
   margin: 20px 0;
   text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}    
.el-form span:last-child{
  display: block;
  display: flex;
  justify-content: space-between;
}
</style>
