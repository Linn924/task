<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>资金操作</el-breadcrumb-item>
            <el-breadcrumb-item>转账</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="转账用户">
                    <el-input v-model="form.name"></el-input>
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
            form:{}
        }
    },
    methods:{
        onSubmit(){
            
        }
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