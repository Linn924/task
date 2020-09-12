<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>资金操作</el-breadcrumb-item>
            <el-breadcrumb-item>转账</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="金额" prop="money">
                    <el-input v-model.number="form.money"></el-input>
                </el-form-item>
                <el-form-item label="转账用户">
                    <el-input v-model="form.toname"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit">转账</el-button>
            </el-form>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        return {
            form:{},
            id:0,
            rules: {
                money: [
                    { type: 'number', message: '金额必须为数字值'}
                ]
            }
        }
    },
    methods:{
        async onSubmit(){
            let flag = false
             this.$refs.form.validate((valid) => {
                if (!valid) {
                    this.$message.error('您的输入有误')
                    flag = true
                }
            });
            if(flag) return 0

            this.form.id = this.id

            let touserid = await this.findToUser(this.form.toname)
            if(!touserid){
                return this.$message.error('验证用户失败，请检查你的转账用户')
            }
            this.form.toid = touserid
            try {
                let {data:res} = await axios.post('/transfer',this.form)
                if(res.code===200){
                    this.$message.success('转账成功');
                    this.form = {}
                }else{
                    this.$message.error('转账失败');
                }
            } catch(err) {
                this.$message.error('转账失败');
            }
        },
        // 查询被转账用户是否存在
        async findToUser(username){
            let id = false
            try{
                let {data:res} = await axios.get(`/checktouser/${username}`)
                if(res.code===200){
                    id = res.touserid
                }
            }catch(err){}
            return id
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
    .el-row{
        margin-bottom: 20px;
    }
}
</style>