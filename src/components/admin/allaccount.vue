<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>查看账户</el-breadcrumb-item>
            <el-breadcrumb-item>所有账户</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="2">
                <el-col :span="4">
                    <el-input placeholder="查询账户" v-model="input" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>

            <!-- 表格中的数据 -->
            <el-table :data="userAccountList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="username" prop="username"></el-table-column>
                <el-table-column label="password" prop="password"></el-table-column>
                <el-table-column label="email" prop="email"></el-table-column>
                <el-table-column label="money" prop="money"></el-table-column>
                <el-table-column label="phone" prop="phone"></el-table-column>
                <el-table-column label="state" prop="state">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.state === '0'">已启用</el-tag>
                        <el-tag type="danger" v-else>已冻结</el-tag>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>

    </section>
</template>

<script>
export default {
    data(){
        return {
            userAccountList:[],
            queryList:{//分页数据
                pagenum:1,
                pagesize:5,
                key:''
            },
            total:0
        }
    },
    created(){
        this.getAllAccount()
    },
    methods:{
        async getAllAccount(){
            const {data:res} = await this.$http.get('/getalluser',{params:this.queryList})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.userAccountList = res.rs
            this.total = res.total
        },
        //监听每页展示账号数量的变化
        handleSizeChange(newSize) {
            this.queryList.pagesize = newSize
            this.getAllAccount()
        },
        //监听去往第几页的变化
        handleCurrentChange(newNum) {
            this.queryList.pagenum = newNum
            this.getAllAccount()
        },
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px 0;
    .el-table{
        margin: 20px 0;
    }
}
</style>