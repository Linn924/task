<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>交易记录</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="2">
                <el-col :span="4">
                    <el-input placeholder="查询记录" v-model="input" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>

            <!-- 表格中的数据 -->
            <el-table border stripe :data="transactionArr">
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column prop="state" label="交易类型">
                    <template slot-scope="scope">
                        {{scope.row.state | toMystate}}
                    </template>
                </el-table-column>
                <el-table-column prop="toname" label="转账用户">
                    <template slot-scope="scope">
                        {{scope.row.toname | toName}}
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
            transactionArr:[]
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
            }else{
                state = '转账'
            }
            return state
        },
        toName: function(value) {
            if (!value) return '-'
        }
    },
    methods:{
        async getTransaction(){
            try {
                let {data:res} = await axios.get(`/getusertransaction/${this.id}`)
                if(res.code!==200){
                    this.$message.error('获取交易记录失败');
                }
                this.transactionArr = res.rs
            } catch(err) {
                this.$message.error('获取交易记录失败');
            }
        }
    },
    created(){
        let id= window.sessionStorage.getItem("id")
        this.id = id    
        this.getTransaction()
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