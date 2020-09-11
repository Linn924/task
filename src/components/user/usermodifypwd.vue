<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="80px">
                    <el-form-item label="password" prop='password'>
                        <el-input type="password" v-model="pwdForm.password" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="checkpwd" prop="checkpwd">
                        <el-input type="password" v-model="pwdForm.checkpwd" clearable></el-input>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="modifypwd">提交</el-button>
                    </el-form-item>
                </el-form>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        // 重复密码规则
        var checkpwd = (rule, value, cb) => {
            if (this.pwdForm.password === this.pwdForm.checkpwd) {   
                return cb()
            }
            cb(new Error('密码错误'))
        }
        return {
            pwdForm:{
                password:'',
                checkpwd:''
            },
            pwdFormRules:{
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                checkpwd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: checkpwd, trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        modifypwd(){

        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px 0;
    width: 550px;
}    
</style>