<template>
    <div class="order">
    <van-nav-bar
        title="订单评价"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="color"
        />
        <van-panel  title="您对这次交易满意吗?" class="padding1">
            <van-row class="round">
                <van-col span="4" class="touxiang">
                   <img src="@/assets/image/goods_logo.png" width="40">
                </van-col>
                <van-col span="8" class="font">罗紫</van-col>
                <van-col span="12"  class="font"><img src="@/assets/image/gouxuan.png">匿名评价</van-col>
            </van-row>
            <van-row>
                <van-col span="1" offset="4" style="position: absolute"><img src="@/assets/image/bunayi.png" ></van-col>
                <van-col span="5" offset="5" class="bk">不满意</van-col>
                <van-col span="1" offset="4" style="position:relative"><img src="@/assets/image/manyi.png"></van-col>
                <van-col span="5" class="zb">真棒</van-col>
            </van-row>
        </van-panel>
        <van-panel  class="padding2">
            <van-cell-group>
            <van-field
                :value="problem"
                type="textarea"
                placeholder="把您遇到的问题和对我们的意见反馈给我们..."
                autosize
                :border="false"
            />
            </van-cell-group>
            
        </van-panel>
        <van-panel  class="padding3">
           <van-button type="info" class="btn">提交评价</van-button>
        </van-panel>                
    </div>    
</template>

<script>
// import { METHODS } from 'http'
import { getCargoDetails } from "@/api/index";
export default {
    name:'orderRate',
    data (){
        return{
            loading: true,
            false: false,
            problem:''
        }
    },
    created() {
    this.getData();
  },
    methods:{
      onClickLeft() {
      this.$router.go(-1);
    },
    getData() {
      getCargoDetails(4, "ae45417a29a34b95a6d875e3ca3755c4").then(res => {
        console.log(res);
        
      });
    }
   }
}    
</script>

<style lang="less" scoped>
    .order{
        background-color:#F4F8FB; 
        height: 100%;
    }
    .padding1{
       margin: 15px;
       height: 199.9px;
    }
    .padding2{
        margin: 15px;
        height: 142.05px;
        color:#666666;
        border-radius: 7.5px;
        text-align: left;
        font-size: 12px;
        font: PingFang-SC-Regular;
        padding-left: 15px;
    }
    .round{
        background: #F4F8FB;
        border-radius: 35pt;
        margin: 15px;
    }
    .img{
        margin: 15px;
    }
    .font{
       margin: 26px 10px;
    }
    .padding3{
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-top: 130px;
        height: 55pt;
        border-radius:7.5px;
    }
    .btn{
        width: 200px;
        height: 35px;
    }
    .color{
        background-color: #0470DC;
    }
    .bk{
        border-radius: 12.5px;
        background-color:#F4F8FB;
        height: 25px;
    }
    .zb{
        height: 25px;
        border-radius: 12.5px;
        background-color:#E6F3FF;
    }
    .van-nav-bar {
    background:#0470DC !important;
   }

   .van-cell:not(:last-child)::after {
       border-bottom: 0px solid #ebedf0;
   }
   .round{
       position: relative;
   }
   .touxiang{
     position: absolute;
     top: 50%;
     transform: translateY(-50%);
   }
   [class*=van-hairline]::after{
       border: 0;
   }
</style>