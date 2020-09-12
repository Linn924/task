<template>
    <section>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="用户名">
                    <p class="information" v-show="!showinput">{{showInformation.username}}</p>
                    <el-input v-model="form.username" v-show="showinput"></el-input>
                </el-form-item>
                <el-form-item label="余额">
                    <p class="information">{{showInformation.money}}</p>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <p class="information" v-show="!showinput">{{showInformation.email}}</p>
                    <el-input v-model="form.email" v-show="showinput"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <p class="information" v-show="!showinput">{{showInformation.phone}}</p>
                    <el-input v-model="form.phone" v-show="showinput"></el-input>
                </el-form-item>
                <el-button type="primary" @click="startchange">{{showinput?'取消':'修改'}}</el-button>
                <el-button type="primary" v-show="showinput" @click="onSubmit">提交</el-button>
            </el-form>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        return {
            id:0,
            showInformation:{},
            form:{},
            showinput:false,
            rules: {
                email: [
                    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
                ],
                phone: [
                    { pattern: /^1[34578]\d{9}$/, message: '请输入中国大陆的手机号码' }
                ]
            }
        }
    },
    methods:{
        startchange(){
            if(this.showinput){
                this.form =  JSON.parse(JSON.stringify(this.showInformation))
            }
            this.showinput = !this.showinput
        },
        async onSubmit(){
            let flag = false
             this.$refs.form.validate((valid) => {
                if (!valid) {
                    this.$message.error('您的输入有误')
                    flag = true
                }
            });
            if(flag) return 0

            try {
                let {data:res} = await axios.post('/updateuserinformation',this.form)
                if(res.code===200){
                this.$message.success('修改成功');
                }else{
                    this.$message.error('修改失败');
                }
                this.form = {}
            } catch(err) {
                this.$message.error('修改失败');
            }


            this.getInformation()
            this.showinput = !this.showinput
        },
        async getInformation(){
            let {data:res} = await axios.get(`/getuserinformation/${this.id}`)
            this.showInformation = JSON.parse(JSON.stringify(res.rs[0]))
            this.form = res.rs[0]
        }
    },
    created(){
        let id= window.sessionStorage.getItem("id")
        this.id = id
        this.getInformation()
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
.information{
    height: 38px;
    line-height: 38px;
    margin-top: 1px;
    margin-bottom: 0;
    margin-left: 15px;
    font-size: inherit;
    color: #606266;
}
</style>