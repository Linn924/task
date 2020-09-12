<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
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
                    <el-button type="primary" disabled>搜索</el-button>
                </el-col>
            </el-row>

            <!-- 表格中的数据 -->
            <el-table :data="newsList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="内容" prop="content"></el-table-column>
                <el-table-column label="发布时间" prop="publishtime"></el-table-column>
                <el-table-column label="发布者" prop="author"></el-table-column>
                <el-table-column label="操作" prop="id">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>

        <el-dialog
            :title="newTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{newContent}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
export default {
    data(){
        return {
            newsList:[],
            queryList:{//分页数据
                pagenum:1,
                pagesize:5
            },
            total:0,
            dialogVisible: false,
            newTitle:'',
            newContent:''
        }
    },
    created(){
        this.getAllNews()
    },
    methods:{
        async getAllNews(){
            const {data:res} = await this.$http.get('/getallnews',{params:this.queryList})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.newsList = res.rs
            this.total = res.total
        },
        //监听每页展示账号数量的变化
        handleSizeChange(newSize) {
            this.queryList.pagesize = newSize
            this.getAllNews()
        },
        //监听去往第几页的变化
        handleCurrentChange(newNum) {
            this.queryList.pagenum = newNum
            this.getAllNews()
        },
        // 查看新闻
        handleClick(item){
            this.newTitle = item.title
            this.newContent = item.content
            this.dialogVisible = true
        }
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