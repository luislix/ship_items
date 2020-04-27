<template>
  <div class="waitShipment">
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
            <span>货源信息</span>
          </div>  
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
            <span>带接货船只</span>
          </div>
          <p style="float:left">托运船只:<span>安达660</span></p>
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
  name: "acceptGoods",
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
.waitShipment {
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
