<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看新闻</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="2">
                <el-col :span="4">
                    <el-input placeholder="查看新闻" v-model="input" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>

            <!-- 表格中的数据 -->
            <el-table border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="title"></el-table-column>
                <el-table-column label="content"></el-table-column>
                <el-table-column label="publishtime"></el-table-column>
                <el-table-column label="author"></el-table-column>
                <el-table-column label="operate" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editnews(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletenews(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域-->
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination> -->

        </el-card>

    </section>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px 0;
    .el-row{
        margin-bottom: 20px;
    }
}
</style>