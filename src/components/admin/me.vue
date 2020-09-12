<template>
    <section>
        <el-card>
            <span>用户名:{{meList.username}}</span>
            <span>密码:{{meList.password}}</span>
        </el-card>
    </section>
</template>

<script>
export default {
    data(){
        return {
            meList:{}
        }
    },
    created(){
        this.getMeData()
    },
    methods:{
        async getMeData(){
            const id = window.sessionStorage.getItem('id')
            const {data:res} = await this.$http.get('/medata',{params:{id}})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.meList = res.rs[0]
        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin: 20px 0;
    width: 550px;
    span{
        display: block;
        padding: 10px 0;
    }
}
</style>