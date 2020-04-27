<template>
  <div class="confirmGoods">
    <myheader></myheader>
    <div class="OrderNum">
      <img class="border" src="../../../assets/image/border.png" alt="" />
      <p>订单编号：{{ list.goodsOrderNumber }}</p>
    </div>
    <van-steps direction="vertical" :active="1">
      <van-step>
        <h3>待接货</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>运货待确认</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>运输中</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
      <van-step>
        <h3>卸货待确认</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
      <van-step>
        <h3>已完成</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <div slot="title">
          <div class="header">
            <img
              style="margin:.1rem .3rem 0 0"
              class="border"
              src="../../../assets/image/border.png"
              alt=""
            />
            <span>带接货船只</span>
          </div>
          <p style="float:left">托运船只:<span>安达660</span></p>
        </div>
        内容
      </van-collapse-item>
      <van-collapse-item style="margin-top:.2rem" name="2">
        <div slot="title">
          <div class="header">
            <img
              style="margin:.1rem .3rem 0 0"
              class="border"
              src="../../../assets/image/border.png"
              alt=""
            />
            <span>我发布的信息</span>
          </div>
        </div>
        <div class="ms">
            <van-row gutter="20">
              <van-col span="5" offset="1">联系人：</van-col>
              <van-col span="4">李阳</van-col>
           </van-row>
            <van-row gutter="20">
              <van-col span="6" offset="1">联系电话：</van-col>
              <van-col span="3">{{startAddress.mobilePhone}}</van-col>
           </van-row>
           <van-row gutter="20">
             <van-col span="5" offset="1">详细地址:</van-col>
             <van-col span="12"><p>{{startAddress.cityName}}<br>{{startAddress.addressDetails}}</p></van-col>
             <van-col span="2" offset="3"><van-icon name="location-o" /></van-col>
           </van-row>
           <van-row gutter="20">
             <van-col span="5" offset="1">目的地址:</van-col>
             <van-col span="10"><p>{{endAddress.cityName}}<br> {{endAddress.addressDetails}}</p></van-col>
             <van-col span="2" offset="5"><van-icon name="location-o"/></van-col>
           </van-row>
           <van-divider />
           <van-row>
            <van-col span="5">货物重量：</van-col>
            <van-col span="3">{{ list.actualTotalWeight }}吨</van-col>
            <van-col span="9" offset="2">货物总价（选填）:</van-col>
            <van-col span="4">{{ list.totalPrice }}元</van-col>
          </van-row>
          <van-row>
            <van-col span="5">托运物品：</van-col>
            <van-col span="3">{{list.goodsName}}</van-col>
            <van-col span="9" offset="2">货物总运价（选填）：</van-col>
            <van-col span="4">{{list.totalPrice}}元</van-col>
          </van-row>
          <van-row>
            <van-col span="5">备注：</van-col>
            <van-col span="3">{{ list.remark }}</van-col>
          </van-row>
          </div>
      </van-collapse-item>
    </van-collapse>
    <div class="tabs">
      <div class="tab">
        <button type="button">取消交易</button>
        <button type="button">同意装货</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getCargoDetails} from "@/api/index.js";
export default {
  name: "confirmGoods",
  data() {
    return {
      active: 1,
      activeNames: ["1"],
      token: "",
      goodsOrderId:'2',
      list:'',
      endAddress:'',
      startAddress:''
    };
  },
  created(){
    this.token = localStorage.getItem("token");
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.getData();
  },
  methods: {
      getData(){
        getCargoDetails(2, this.token).then(res => {
                console.log(res);
                this.list = res.data.data
                this.endAddress = res.data.data.endAddressHistoryDTO
                this.startAddress = res.data.data.startAddressHistoryDTO
               
            })
      }
  }
}

</script>

<style lang="less" scoped>
.confirmGoods {
  background: #f1f1f1;
  height: 100%;
}
.waitGoods {
  padding: 0.4rem 0.3rem;
  background: #fff;
  margin-bottom: 0.2rem;
}
.question {
  padding: 0.4rem 0.3rem 0rem 0.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.question img {
  height: 0.3rem;
  margin-right: 0.2rem;
}
.question h3 {
  font-size: 0.28rem;
  color: #333333;
}
.ship {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: #666666;
    font-size: 0.28rem;
    img {
      width: 0.1rem;
      height: 0.2rem;
      margin-left: 0.1rem;
    }
  }
}
.myRelease {
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  height: 1.08rem;
  align-items: center;
  background: #fff;
  .jiantou {
    width: 0.1rem;
    height: 0.2rem;
  }
}
.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
  box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.1);
}
.tab button:nth-child(1) {
  background: linear-gradient(to right, #9f9f9f, #a8a8a8, #c5c5c5);
}
button {
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 2.6rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  margin: 0 auto;
  background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
}

.van-step--vertical {
  height: 1rem;
  padding: 0.3rem;
}
.van-steps {
  margin-bottom: 0.2rem;
}
.van-step__title h3 {
  float: left;
  height: 0.4rem;
  font-size: 0.3rem;
}
.van-step__title p {
  float: right;
  height: 0.4rem;
  font-size: 0.24rem;
}
.OrderNum {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem;
  background: #fff;
  font-weight: 600;
  img {
    width: 0.04rem;
    height: 0.28rem;
  }
  p {
    font-size: 0.28rem;
    color: #333333;
    margin-left: 0.3rem;
  }
}
.border {
  width: 0.04rem;
  height: 0.28rem;
}
.header {
  display: flex;
  text-align: left;
}
.ms p{
       text-align: left;
   }
</style>
