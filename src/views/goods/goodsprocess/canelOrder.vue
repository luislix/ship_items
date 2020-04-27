<template>
  <div class="canelOrder">
    <myheader></myheader>
    <div class="OrderNum">
      <img class="border" src="../../../assets/image/border.png" alt="" />
      <p>订单编号：{{orderlist.goodsOrderNumber}}</p>
    </div>
    <div class="OrderNum-content">
        <ul>
            <li>订单已取消</li>
            <li>取消原因：已经托运其他货源</li>
        </ul>
    </div>
    <van-collapse style="padding-bottom:1.1rem" v-model="activeNames">
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
        <ul class="content" v-if="orderlist != ''">
          <li>
            <span>联系人：</span>
            <span>{{ orderlist.endAddressHistoryDTO.userName }}</span>
          </li>
          <li>
            <span>联系电话：</span>
            <span>{{ orderlist.endAddressHistoryDTO.mobilePhone }}</span>
          </li>
          <li>
            <span>详细地址：</span>
            <span>{{
              orderlist.startAddressHistoryDTO.provinceName +
                orderlist.startAddressHistoryDTO.cityName +
                orderlist.startAddressHistoryDTO.addressDetails
            }}</span>
          </li>
          <li>
            <span>目的地址：</span>
            <span>{{
              orderlist.endAddressHistoryDTO.provinceName +
                orderlist.endAddressHistoryDTO.cityName +
                orderlist.endAddressHistoryDTO.addressDetails
            }}</span>
          </li>
        </ul>
        <ul class="details">
          <li>
            <p>货物重量：{{ orderlist.actualTotalWeight }}吨</p>
            <p>货物总价：{{ orderlist.totalPrice }}元</p>
          </li>
          <li>
            <p>托运物品：{{orderlist.goodsName}}</p>
            <P>货物总运价：{{orderlist.totalPrice}}元</P>
          </li>
          <li>
            <p>备注：{{ orderlist.remark }}</p>
            <p></p>
          </li>
        </ul>
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
            <span>运货船只</span>
          </div>
           <p style="float:left">托运船只:<span>{{shipInfoDTO.shipName}}</span></p>
        </div>
        
        
      </van-collapse-item>
    </van-collapse>
    <div class="tabs">
      <div class="tab">
        <button type="button" @click="delOrder">删除订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { queryOrderDetails,delGoodsOrder, cancelOrder } from "@/api/index";
import { Toast } from "vant";
import { log } from 'util';
export default {
  name: "canelOrder",
  data() {
    return {
      active: 1,
      activeNames: ["1"],
      shiplist: "",
      orderlist: "",
      shipOrderIdListStr: "",
    //   goodsOrderId: "",
      shipInfoDTO: ""
    };
  },
  created() {
    this.shipOrderIdListStr = this.$route.query.shipId;
    // this.goodsOrderId = this.$route.query.orderId;
    this.getGoodsDetails();
    this.delOrder();
  },
  methods: {
    //查询货物详细信息
    getGoodsDetails() {
      queryOrderDetails(1, localStorage.getItem("token")).then(
        res => {
          this.orderlist = res.data.data.goodsOrderDTO;
          this.shiplist = res.data.data.shipOrderDTOList[0];
          this.shipInfoDTO = res.data.data.shipOrderDTOList[0].shipInfoDTO;
          console.log(this.orderlist);
          console.log(res);
        }
      );
    },
    delOrder(){
        delGoodsOrder(1,localStorage.getItem("token")).then(
            res => {
                console.log("删除成功");
            }
        )
  }
  },
 
};
</script>

<style lang="less" scoped>
.canelOrder {
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
  background: linear-gradient(to right, #CC2012, #FF6666, #FF6666);
}
button {
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 3.3rem;
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
.content li {
  text-align: left;
  height: 0.6rem;
  font-size: 0.26rem;
  color: #666666;
}
.details li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.OrderNum-content{
    text-align: left;
    background: #fff;
    margin-bottom: 0.2rem;
    padding-left: 0.3rem;
    padding-bottom: 0.3rem;
}
</style>
