<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="pwdForm" :rules="pwdFormRules" ref="form" label-width="80px">
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
            cb(new Error('密码不一致'))
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
        async modifypwd(){
            let flag = false
             this.$refs.form.validate((valid) => {
                if (!valid) {
                    this.$message.error('您的输入有误')
                    flag = true
                }
            });
            if(flag) return 0

            let data = {}
            data.id = this.id
            data.pwd = this.pwdForm.password

            try {
                let {data:res} = await axios.post('/usermidifypwd',data)
                if(res.code===200){
                    this.$message.success('修改密码成功');
                    this.pwdForm = {}
                }else{
                    this.$message.error('修改密码失败');
                }
            } catch(err) {
                this.$message.error('修改密码失败');
            }
        }
    },
    created(){
        let id= window.sessionStorage.getItem("id")
        this.id = id    
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px 0;
    width: 550px;
}    
</style>