<template>
    <div class="manager">
        <myheader></myheader>
        <div class="list" v-for="(item,index) in list" :key="index" @click="chooseName(item)">
            <van-row>
                <van-col span="18" >
                    {{item.companyName}}
                    <br/>
                    联系人： {{item.linkName}}
                    <br/>
                    联系方式：{{item.linkPhone}}
                </van-col>
                <van-col span="3">
                    <van-icon name="edit" size="25" style="padding:0.2rem 0.1rem;"/> 
                </van-col>
                <van-col span="3"  style="border-left: 1px solid #ebedf0; padding:0.2rem;">
                   <van-icon name="delete" size="25" />
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import {queryPyShipPortByPage} from '@/api/index.js'
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            let data={
            pageNum:1,
            pageSize:5
        }
            queryPyShipPortByPage(data,localStorage.getItem('token')).then(
                res=>{
                    console.log(res);
                    for(let i=0;i<data.pageSize;i++){
                        var obj={};
                        obj = res.data.data.list[i];
                        this.list.push(obj);
                    }
                    console.log(this.list);
                }
            )
        },
        chooseName(item){
        this.$router.push({path:'/service',query:{name:item.companyName}})
        }
    }
}
</script>
<style lang="less" scoped>
.manager{
    background: #eeeeee;
    height: 100%;
    
 }
 .list{
    padding: 0.3rem;
    margin-bottom: 0.2rem;
     background: #ffffff;
     text-align: left;
     font-size: .28rem;
 }
</style>