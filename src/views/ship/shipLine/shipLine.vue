<template>
    <div class="shipLine">
        <myheader></myheader>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有数据了"
                :immediate-check='flag'
                :offset="offset"
                @load="onLoad"
                >              
            <div class="list" v-for="(item,index) in shipList" :key="index" @click="btnSearch(item)">
                <van-cell :title="item.title"  size="large" />
                <van-cell style="height:1.3rem;">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title" >
                    <van-row>
                        <van-col span="21">
                            <span class="custom-title" >航线 </span>
                            <br/>
                            <span class="custom-content" >{{item.initialAddress}}  → {{item.terminationAddress}}</span>
                        </van-col>
                        <van-col span="1" offset="1">
                        <!-- <img src="../../../assets/image/dian hua.png" @click="callPhone(item)"/> -->
                        </van-col>
                    </van-row>
                </template>
                </van-cell>
            </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { queryWaterLine } from '@/api/index.js'
import { lchown } from 'fs';
import { PullRefresh } from "vant";
import Vue from "vue";
Vue.use(PullRefresh);
export default {
    data(){
        return{
            shipList:[],
            totalPage: 0,
            loading: false, //控制上拉加载的加载动画
            finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
            isLoading: false, //控制下拉刷新的加载动画
            offset: 10,
            flag:false,
            data: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created(){
      this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
      this.getshipList(this.data);
    },
    methods:{
        btnSearch(item){
         this.$router.push({path:'/waterWay',query:{id:item.id}})
        },
        callPhone(item){
            console.log('callPhone');
            this.$dialog.confirm({
            title: '嘟嘟船讯提醒您!',
            message: `联系:`+item.telephone
            }).then(() => {
                window.location.href = item.telephone;
            }).catch(() => {
            });
        },
        getshipList(data){
        queryWaterLine(this.data).then(
            res=>{
                console.log(res);
                if (this.totalPage + 1 == this.data.pageNum &&
                        this.data.pageNum != 1) {
                        console.log("大于总页数");
                        this.finished = true;
                        this.loading = false;
                        return;
                    }else{
                        if (res.data.code == 200) {
                            if (res.data.data.list.length > 0) {
                                this.shipList = this.shipList.concat(res.data.data.list
                                );
                            }
                         }
                        if (res.data.data.total <= this.data.pageSize) {
                            this.totalPage = 1;
                        } else {
                            this.totalPage = Math.ceil(
                            res.data.data.total / this.data.pageSize
                            );
                        }
                        console.log(this.totalPage);
                        this.isLoading = false;
                    }
                console.log(this.shipList);
            }
        )
        .catch(res => {
                this.loading = false;
                this.finished = true;
                return;
              });
            this.loading = false; //控制上拉加载的加载动画
        },
         // 下拉加载
        onRefresh() {
          this.data.pageNum=1,
          this.totalPage=0;
          let self = this;
          setTimeout(() => {
              console.log(self.data)
              self.list=[];
              self.getshipList(this.data); //加载数据
          }, 500);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      if (this.data.pageNum == 1) {
        this.data.pageNum = 1;
      } else {
        this.data.pageNum++;
      }
      this.loading = true;
      let self = this;
            setTimeout(() => {
                self.finished = false;
                self.isLoading = false;
                self.getshipList(self.data);
                if (self.data.pageNum == 1) {
                this.data.pageNum++;
                }
            }, 500);
        }
    },
}
</script>
<style lang="less" scoped>
 .shipLine{
    background: #eeeeee;
    .content{
        .list{
            margin-bottom: .2rem;
            background: #ffffff;
            span{
                color: #444444;
            }
            .van-cell--large .van-cell__title{
                text-align: left;
            }
            .custom-title,.custom-content{
                float: left;
            }
        }
    }
 }
 
</style>