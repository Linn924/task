<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>资金操作</el-breadcrumb-item>
            <el-breadcrumb-item>取款</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit">取出</el-button>
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
        }
    },
    methods:{
        async onSubmit(){
            let data = {}
            data.id = this.id
            data.money = this.form.money

            try {
                let {data:res} = await axios.post('/withdrawal',data)
                if(res.code===200){
                    this.$message.success('取款成功');
                }else{
                    this.$message.error('取款失败');
                }
                this.form = {}
            } catch(err) {
                this.$message.error('取款失败');
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
    .el-row{
        margin-bottom: 20px;
    }
}
</style>