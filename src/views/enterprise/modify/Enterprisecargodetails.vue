<template>
  <div id="box">
    <myheader></myheader>
    <van-collapse v-model="activeName" accordion  v-if="list.whether !== 'false'">
      <van-collapse-item title="我的发布信息" name="1">
        <div >
          <van-row class="border_bottom" >
                 <van-col span="12" class="textColor_gray float_l">订单编号</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.contactsName:list.goodsOrderNumber}}
                   </van-col>
             </van-row>

              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">货源物品</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.title:list.goodsName}}
                   </van-col>
             </van-row>

              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">货物总量</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.title:list.actualTotalWeight}}
                   </van-col>
             </van-row>

              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">装货日期</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.contactsPhone:list.loadingStartTime}}
                   </van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">货物单价</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.title:list.singlePrice}}
                   </van-col>
             </van-row>
             <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">货物总价</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                    {{list.whether == 'false'?list.title:list.totalPrice}}
                   </van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">船只始发地</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   {{list.whether == 'false'?list.location:list.startAddressHistoryDTO.cityName}}                   
                   </van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">船只目的地</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">
                   <!-- {{list.placeOfArrival}} -->
                   {{list.whether == 'false'?list.placeOfArrival:list.endAddressHistoryDTO.portName}}
                   </van-col>
             </van-row>
              <van-row class="border_bottom" style="border-bottom: 0px">
                 <van-col span="5" class="textColor_gray float_l">备注</van-col>
                 <van-col span="19" class="textColor_darkGray float_r">{{list.title}}</van-col>
             </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>
    <!-- ------------------------------------------------------ -->
      
      <van-collapse v-model="activeName" accordion  v-if="list.whether == 'false'">
      <van-collapse-item title="我的发布信息" name="1">
        <div>
            <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">您于{{list.createDate}}更新的货物</van-col>
                 <van-col span="12" class="textColor_darkGray float_r"></van-col>
             </van-row>
         
          <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">姓名</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.contactsName}}</van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">货物类型</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.title}}</van-col>
             </van-row>
 
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">联系电话</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.contactsPhone}}</van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">装载量</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.tonnage}}</van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">船只始发地</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.location}}</van-col>
             </van-row>
              <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">船只目的地</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.placeOfArrival}}</van-col>
             </van-row>
             <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">开始时间</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.startDate}}</van-col>
             </van-row>
             <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">结束时间</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">{{list.endDate}}</van-col>
             </van-row>
              <van-row class="border_bottom" style="border-bottom: 0px">
                 <van-col span="5" class="textColor_gray float_l">备注</van-col>
                 <van-col span="19" class="textColor_darkGray float_r">{{list.title}}</van-col>
             </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>



     <van-row class="btnStyle" style="background-color: rgba(255, 255, 255, 1);box-shadow:0px 0px 8px #c3bdbd">
            <van-col span="12">
        <van-button
          @click="Delete"
          size="normal"
          style="width:75%;height:0.8rem;line-height:0.8rem;background-image: linear-gradient(#9f9f9f, #c5c5c5);border-radius: 4px;color: #ffffff"
        >删除</van-button>
      </van-col>
      <van-col span="12">
        <van-button
          @click="editShipOrderInfo"
          type="info"
          size="normal"
          style="width:75%;height:0.8rem;line-height:0.8rem;background-image: linear-gradient(#0b6eff, #68aaff);border-radius: 4px"
        >编辑</van-button>
      </van-col>
        </van-row>
  </div>
</template>

<script>
import { Deletebulkcargod } from "@/api/index"

import {Normaldeletionofgoods} from "@/api/index"
export default {
  data() {
    return {
      activeName: "1",
      list:[],
      pythonInfoCargoIdList:'',
      goodsOrderId:''
    };
  },
  
  created(){
      var ssss = window.localStorage.getItem('Releaselist')
    
       this.list = JSON.parse(ssss)
      
      console.log(this.list,22222222);
      
        //  this.list = this.$router.history.current.query.obj; 
        //  console.log(this.list);

           var date = new Date(this.list.createDate);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.list.createDate = Y + M + D ;
         
  },

  methods:{
      Delete(){
          
          // console.log(this.pythonInfoShipIdList);

        //   删除货源-----------------------------
          if(this.list.whether == "false"){
         this.pythonInfoCargoIdList = this.list.id
          Deletebulkcargod(this.pythonInfoCargoIdList,localStorage.getItem("token")).then(res => {
              if(res.data.code == 200){
                  console.log(11111111);
                  this.$toast("删除成功");
                  this.$router.push(
                   {path:'/myIssue'}
              )
              }
              
          })
          }
        // -----------------------------------------

        if(this.list.whether !=="false"){
        this.pythonInfoCargoIdList = this.list.goodsOrderId
           Normaldeletionofgoods(this.pythonInfoCargoIdList,localStorage.getItem("token")).then(res => {
              if(res.data.code == 200){
                  console.log(11111111);
                  this.$toast("删除成功");
                  this.$router.push(
                   {path:'/myIssue'}
              )
              }
              
          })
     
       }

      },
      

       editShipOrderInfo(){
              this.$router.push(
                  {path:'/Editgoods',query:{obj:this.list}}
              )
      }
  }
};
</script>

<style lang="less">
#box {
  .van-cell__title {
    text-align: left;
  }

  .van-collapse{
      margin-top: 0.2rem
  }

  .border_bottom{
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
  }
   .btnStyle{
      width: 100%;
      position: absolute;
      height: 1rem;
      line-height: 1rem;
      bottom: 0rem
  }
}
</style>>




