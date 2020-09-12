<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>交易记录</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>

            <!-- 表格中的数据 -->
            <el-table border stripe :data="transactionArr">
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="state" label="交易类型">
                    <template slot-scope="scope">
                        {{scope.row.state | toMystate}}
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="相关用户">
                    <template slot-scope="scope">
                        {{scope.row.username | toName}}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="日期">
                    <template slot-scope="scope">
                        {{scope.row.time | toMydate}}
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="余额"></el-table-column>
            </el-table>

            <!-- 分页区域-->
            <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange"
                :current-page="currentPage" :page-sizes="[3, 5, 8]" :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>

    </section>
</template>

<script>
export default {
    data(){
        return {
            transactionArr:[],
            currentPage:1,
            pagesize:5,
            total:'',
        }
    },
    filters: {
        toMydate: function (value) {
            if (!value) return ''
            return (new Date(value)).toLocaleString()
        },
        toMystate: function (value ){
            if (!value) return ''
            let state = ''
            if(value==0){
                state = '存款'
            }else if(value==1){
                state = '取款'
            }else if(value==2){
                state = '转账'
            }else{
                state = '收款'
            }
            return state
        },
        toName: function(value) {
            if (!value) return '-'
            else return value
        }
    },
    methods:{
        async getTransaction(currentPage,pageSize){
            try {
                let {data:res} = await axios.get(`/getusertransaction/${this.id}/${currentPage}/${pageSize}`)
                if(res.code!==200){
                    this.$message.error('获取交易记录失败');
                }
                this.transactionArr = res.rs
            } catch(err) {
                this.$message.error('获取交易记录失败');
            }
        },
        // 获取记录总数
        async getCount(){
            try {
                let {data:res} = await axios.get(`/getcountusertransaction/${this.id}`)
                this.total = res.rs
            } catch(err) {
                this.$message.error('获取交易记录失败');
            }
        },
        // 每页容量改变时触发
        pageSizeChange(val){
            this.pagesize = val
            this.getTransaction(this.currentPage,this.pagesize)
        },
        // 页码改变时触发
        pageCurrentChange(val){
            this.currentPage = val
            this.getTransaction(this.currentPage,this.pagesize)

        }
    },
    created(){
        let id= window.sessionStorage.getItem("id")
        this.id = id    
        this.getCount()
        this.getTransaction(this.currentPage,this.pagesize)
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