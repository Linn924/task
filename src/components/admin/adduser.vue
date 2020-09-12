<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>开户</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="userForm" ref="userFormRef" :rules="userFormRules" label-width="80px">
                <el-form-item label="username" prop='username'>
                    <el-input v-model="userForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="password" prop='password'>
                    <el-input type="password" v-model="userForm.password" clearable></el-input>
                </el-form-item>
                <el-form-item label="email" prop='email'>
                    <el-input v-model="userForm.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="money">
                    <el-input v-model="userForm.money" clearable></el-input>
                </el-form-item>
                    <el-form-item label="phone" prop='phone'>
                    <el-input v-model="userForm.phone" clearable></el-input>
                </el-form-item>
                <el-form-item label="state">
                    <el-select v-model="userForm.state" filterable allow-create placeholder="请选择状态">
                        <el-option v-for="item in stateList" :key="item.id" :label="item.state" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="adduser">立即开户</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱   
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        return {
            userForm:{
                username:'',
                password:'',
                email:'',
                money:'',
                phone:'',
                state:''
            },
            stateList:[
                {id:0,state:'启用'},
                {id:1,state:'冻结'},
            ],
            userFormRules:{
                username:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        async adduser(){
            this.$refs.userFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.$http.post('/adduser',this.userForm)
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                //表单置空
                this.$refs.userFormRef.resetFields()
                this.userForm.money = ''
                this.userForm.state = ''
             })
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