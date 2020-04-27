<template>
    <div class="order">
      <van-nav-bar
        title="已完成"
        left-arrow
        class="color"
        @click-left="onClickLeft"
        />
      <van-panel class="panel">    
        <van-row gutter="20" class="ordertitle">
            <van-col span="1" offset="1">
                <div class="border"></div>
            </van-col>
            <van-col span="14">订单编号:{{orderId}}</van-col>
        </van-row>
        <van-steps direction="vertical" class="step"  :active="active">
            <van-step v-for="item in stepList" :key="item.id">
                <h3>{{item.desc}}</h3>
                <p>{{item.time}}</p>
            </van-step>
        </van-steps>
      </van-panel>
      <van-panel  class="ty-panel">
          <van-row gutter="20" class="ordertitle">
            <van-col span="1" offset="1">
                <div class="border"></div>
            </van-col>
            <van-col span="5">托运船只</van-col>
        </van-row>
        <van-row class="xq">
            <van-col span="5" offset="2"><p>托运船只 ：</p></van-col>
            <van-col span="4">{{shipName}}</van-col>
            <p>详细情况<van-icon name="arrow" /></p>
        </van-row>    
      </van-panel>
      <van-panel class="hy-pancel">
          <van-row gutter="20" class="ordertitle">
            <van-col span="1" offset="1">
                <div class="border"></div>
            </van-col>
            <van-col span="5"><p>订单详情</p></van-col>
            <van-col span="1" offset="14"><van-icon name="arrow-down" /></van-col>
          </van-row>  
      </van-panel>
      <van-panel class="btn-panel">
          <router-link to='/orderRate'><van-button type="warning">订单评价</van-button></router-link>
          <van-button type="info">发布空船</van-button>
      </van-panel>                    
    </div>  
</template>

<script>
// import { METHODS } from 'http'
export default {
   name:'orderComplete',
   props:{
     active: {
      type: Number,
      default: 5
    }
   },
   data (){
       return{
          orderId:'G201909081234880',
          shipName:'安达660',
          day:'',
          stepList:[{
              id: '01',
              desc:'待接货',
              time:'11-07 10:30'
          },{
              id: '02',
              desc:'运货待确认',
              time:'11-07 15:56'
          },{
              id: '03',
              desc:'运输中',
              time:'11-08 07:34'
          },{
              id:'04',
              desc:'卸货待确认',
              time: this.$route.params.id
          },{
              id:'05',
              desc:'已完成',
              time: (new Date().getMonth()+1)+"-"+new Date().getDate()+"  "+new Date().getHours()+":"+new Date().getMinutes()
          }]
       }
   },
    methods:{
      onClickLeft() {
      this.$router.go(-1);
    },

   }
}    
</script>
<style lang="less" scoped>
   .order{
        background-color:#F4F8FB; 
        height: 100%;
        font: PingFang-SC-Medium;
    }
   h3{
       float: left;
       margin-left: 14.5px;
       color:#444444;
       font: 15px;  
   }
   p{
       text-align: right;
   }
   .border{
       border-left: 2px #1E8ADC solid;
       width: 2pt;
       height: 14pt;
       
   }
   .ordertitle{
      padding-top: 20px;
   }
    .van-panel__header{
       display: none;
   }
   .panel{
       margin-bottom: 10px;
   }
   .ty-panel{
       height: 82.5px;
        margin-bottom: 10px;
   }
   .ty-panel p{
       color:#666666;
   }
   .xq{
       margin-top: 15px;
   }
   .van-nav-bar {
    background:#0470DC !important;
   }
   .hy-pancel{
       height: 54px;
   }
   .hy-pancel p{
       color: #333333;
       font-size: 14px;
       font-weight: Medium;
       font: PingFang-SC-Medium;
   }
   .btn-panel{
       height: 55px;
       width: 100%;
       position: absolute;
       left: 0;
       bottom: 0;
   }
   .btn-panel button{
       width: 130px;
       height: 35px;
       border-radius: 5px;
       margin: 10px 20px;
   }
  .step i{
      display: block;
      width: 8px;
      height: 8px;
      background-color:#666666;
      border-radius: 50%;
      float: left;
   }
   .van-step--vertical:not(:last-child)::after {
    border-bottom-width: 0px;
  }
  .van-step__circle {
    width: 8px;
    height: 8px;
  }
   .van-step__line {
    height: 50%;
   }
</style>             