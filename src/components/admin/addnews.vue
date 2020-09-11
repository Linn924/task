<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
            <el-breadcrumb-item>推送新闻</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="newsForm" ref="newsFormRef" label-width="80px">
                    <el-form-item label="title">
                        <el-input v-model="newsForm.title" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="content">
                        <el-input type="textarea" v-model="newsForm.content" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="publishtime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="newsForm.publishtime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="author">
                        <el-input v-model="newsForm.author" clearable></el-input>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="addnews">推送新闻</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        return {
            newsForm:{
                title:'',
                content:'',
                publishtime:'',
                author:''
            },
        }
    },
    methods:{
        addnews(){

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