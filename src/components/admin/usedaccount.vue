<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>查看账户</el-breadcrumb-item>
            <el-breadcrumb-item>已启用账户</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>

            <!-- 搜索与添加区域 -->
            <el-row :gutter="2">
                <el-col :span="4">
                    <el-input placeholder="查询账户" v-model="input" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" disabled>搜索</el-button>
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
                <el-table-column label="operate" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAccount(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <!-- 修改用户账号状态的对话框-->
            <el-dialog
                title="编辑用户账号"
                :visible.sync="editDialogVisible"
                width="50%" @close="editDialogClosed">
                <!-- 内容主题区域 disabled 禁用-->
                <el-form :model="userForm" label-width="80px">
                    <el-form-item label="username" prop='username'>
                        <el-input v-model="userForm.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="password" prop='password'>
                        <el-input type="password" v-model="userForm.password" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="email" prop='email'>
                        <el-input v-model="userForm.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="money">
                        <el-input v-model="userForm.money" disabled></el-input>
                    </el-form-item>
                        <el-form-item label="phone" prop='phone'>
                        <el-input v-model="userForm.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="state">
                        <el-select v-model="userForm.state" @change="watchClick">
                            <el-option v-for="item in stateList" :key="item.id" :label="item.state" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editUser">修改</el-button>
                </span>
            </el-dialog>
            

        </el-card>

    </section>
</template>

<script>
export default {
    data(){
        return {
            userAccountList:[],//所有已启用的账号信息
            queryList:{//默认分页数据
                pagenum:1,
                pagesize:5,
                state:'0'
            },
            total:0,//总数据量
            editDialogVisible:false,//隐藏对话框
            userForm:{//用户账号信息
                username:'',
                password:'',
                email:'',
                money:'',
                phone:'',
                state:''
            },
            stateList:[//账号状态可选值
                {id:0,state:'启用'},
                {id:1,state:'冻结'},
            ],
            flag:false,//是否点击下拉菜单选择冻结或者启用账号
        }
    },
    created(){
        this.getAllAccount()//页面加载完成前调用方法
    },
    methods:{
        //获取所有已启用账号
        async getAllAccount(){
            const {data:res} = await this.$http.get('/getusedaccount',{params:this.queryList})
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
        //编辑用户账号
        editAccount(data){
            this.editDialogVisible = true
            //深拷贝
            var obj = Object.assign({}, data)
            this.userForm = obj
            this.userForm.state = '启用'
        },
        //点击修改按钮
        async editUser(){
            if(!this.flag) return this.$message({message: '请做出修改',type: 'error',duration:1000})
            const {data:res} = await this.$http.post('/updateuser',this.userForm)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.flag = false
            this.editDialogVisible = false
            this.getAllAccount()
        },
        //管理员选择修改用户账号状态触发此方法
        watchClick(){
            this.flag = true
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