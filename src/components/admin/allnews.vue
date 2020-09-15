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
                    <el-button type="primary" disabled>搜索</el-button>
                </el-col>
            </el-row>

            <!-- 表格中的数据 -->
            <el-table :data="newsList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="title" prop="title"></el-table-column>
                <el-table-column label="content" prop="content"></el-table-column>
                <el-table-column label="publishtime" prop="publishtime"></el-table-column>
                <el-table-column label="author" prop="author"></el-table-column>
                <el-table-column label="operate" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editNews(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteNews(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>

        <!-- 修改用户账号状态的对话框 -->
        <el-dialog
            title="编辑新闻"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <!-- 内容主题区域 disabled 禁用-->
            <el-form :model="newsForm" label-width="80px">
                <el-form-item label="title" prop='title'>
                    <el-input v-model="newsForm.title"></el-input>
                </el-form-item>
                <el-form-item label="content" prop='content'>
                    <el-input type="textarea" v-model="newsForm.content"></el-input>
                </el-form-item>
                <el-form-item label="time" prop='publishtime'>
                    <el-date-picker type="date" placeholder="选择日期" v-model="newsForm.publishtime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="author">
                    <el-input v-model="newsForm.author"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editAdmin">修改</el-button>
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
            newsForm:{
                title:'',
                content:'',
                publishtime:'',
                author:''
            },
            editDialogVisible:false,
            flag:false,
            form:{//与修改的newForm对比

            }
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
        editNews(data){
            this.editDialogVisible = true
            this.form = data
            var obj = Object.assign({}, data)
            this.newsForm = obj
            
        },
        async editAdmin(){
            if(JSON.stringify(this.form) === JSON.stringify(this.newsForm)) 
            return this.$message({message: '请做出修改',type: 'error',duration:1000})
            const {data:res} = await this.$http.post('updatenews',this.newsForm)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.editDialogVisible = false
            this.getAllNews()
        },
        async deleteNews(data){
            // 弹框询问用户是否删除数据
            const confirmResult = await this.$confirm(
            '此操作将永久删除该用户, 是否继续?','提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            // 如果用户确认删除，则返回值为字符串 confirm
            // 如果用户取消了删除，则返回值为字符串 cancel
            if (confirmResult !== 'confirm') return this.$message({message: '已取消删除',type: 'info',duration:1000})
            const {data:res} = await this.$http.get('/deletenews',{params:{id:data.id}})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getAllNews()
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