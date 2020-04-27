<template>
  
  <div class="order">
    <myheader></myheader>
    <!-- <van-nav-bar
      title="待处理"
      left-arrow
      @click-left="onClickLeft"
      class="color"
    /> -->
    <van-panel class="panel">
      <van-row gutter="20" class="ordertitle">
        <van-col span="1" offset="1">
          <div class="border"></div>
        </van-col>
        <van-col span="14">订单编号:{{ orderId }}</van-col>
      </van-row>
      <van-row class="xq">
        <van-col span="5" offset="2"><p>订单已取消</p></van-col>
      </van-row>
      <van-row class="xq">
        <van-col span="7" offset="2"><p>货物预期取消</p></van-col>
      </van-row>
    </van-panel>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="运货船只" name="1" style="text-align:left">
        托运船只：安达660
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" style="margin-top:10px;" v-if="list1!=''">
      <van-collapse-item title="您的货源信息" name="2" style="text-align:left;">
        <div class="ms">
          <van-row gutter="20">
            <van-col span="5" offset="1">联系人：</van-col>
            <van-col span="3">{{ list1.goodsOrderDTO.endAddressHistoryDTO.userName }}</van-col>
          </van-row>
          <van-row gutter="20">
            <van-col span="5" offset="1">联系电话:</van-col>
            <van-col span="3">{{ list1.goodsOrderDTO.endAddressHistoryDTO.mobilePhone }}</van-col>
          </van-row>
          <van-row gutter="20">
            <van-col span="5" offset="1">详细地址:</van-col>
            <van-col span="10">
              <p>
                {{list1.goodsOrderDTO.startAddressHistoryDTO.provinceName}}{{list1.goodsOrderDTO.startAddressHistoryDTO.cityName}}
                <br />
              </p>
            </van-col>
            <van-col span="2" offset="5">
              <van-icon name="location-o" />
            </van-col>
          </van-row>
          <van-row gutter="20">
            <van-col span="5" offset="1">目的地址:</van-col>
            <van-col span="10">
              <p>
                {{ list1.goodsOrderDTO.endAddressHistoryDTO.provinceName }}{{ list1.goodsOrderDTO.endAddressHistoryDTO.cityName }}
                <br />
              </p>
            </van-col>
            <van-col span="2" offset="5">
              <van-icon name="location-o" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="5">货物重量：</van-col>
            <van-col span="3">{{ list1.goodsOrderDTO.actualTotalWeight }}吨</van-col>
            <van-col span="9" offset="2">货物单价（选填）:</van-col>
            <van-col span="4">{{ list1.goodsOrderDTO.singlePrice }}元</van-col>
          </van-row>
          <van-row>
            <van-col span="5">托运物品：</van-col>
            <van-col span="3">沙子</van-col>
            <van-col span="9" offset="2">货物总运价（选填）：</van-col>
            <van-col span="4">{{ list1.goodsOrderDTO.totalPrice }}元</van-col>
          </van-row>
          <van-row>
            <van-col span="5">备注：</van-col>
            <van-col span="3">无</van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-panel class="btn-panel">
      <van-button @click="clickbtnload" type="danger">删除订单</van-button>
    </van-panel>
  </div>
</template>

<script>
// import { METHODS } from 'http'
import { delcancelGoodsOrder,queryOrderDetails } from "@/api/index";
import { Toast } from 'vant';
export default {
  name: "cancelGoods",
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      orderId: "G201909081234880",
      shipName: "安达660",
      day: "",
      list: [
        {
          id: "01",
          desc: "李阳",
          label: "联系人："
        },
        {
          id: "02",
          desc: "13557896523",
          label: "联系电话:"
        }
      ],
      activeNames: ["1"],
      activeName: "1",
      goodsOrderId:'',
      list1:''
    };
  },
  created(){
    this.goodsOrderId = this.$route.query.goodsId;
    this.queryOrderDetail();
  },
  methods: {

    //查询订单详情
    queryOrderDetail(){
      var that = this;
      queryOrderDetails(this.goodsOrderId, localStorage.getItem("token")).then(res=>{
        this.list1 = res.data.data;
        console.log(this.list1);
      })
    },
    clickbtnload() {
        var that = this;
        console.log(this.$route.query.goodsId);
        delcancelGoodsOrder(this.$route.query.goodsId,localStorage.getItem('token')).then(res=>{
            Toast.success('删除成功!');
            setTimeout(()=>{
                that.$router.push({path:"/index/order"});
            },1000)
        })
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  background-color: #f4f8fb;
  height: 100%;
  font: PingFang-SC-Medium;
}
h3 {
  float: left;
  margin-left: 14.5px;
  color: #444444;
  font: 15px;
}
p {
  text-align: right;
}
.border {
  border-left: 2px #1e8adc solid;
  width: 2pt;
  height: 14pt;
}
.ordertitle {
  padding-top: 20px;
}
.van-panel__header {
  display: none;
}
.panel {
  height: 102px;
  margin-bottom: 10px;
}
.ty-panel {
  height: 82.5px;
  margin-bottom: 10px;
}
.ty-panel p {
  color: #666666;
}
.xq {
  margin-top: 10px;
}
.van-nav-bar {
  background: #0470dc !important;
}
.ms-pancel {
  height: 54px;
}
.btn-panel {
  height: 55px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.btn-panel button {
  width: 200px;
  height: 35px;
  border-radius: 5px;
  margin: 10px 20px;
}
.step i {
  display: block;
  width: 8px;
  height: 8px;
  background-color: #666666;
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
.ms .van-row {
  margin-top: 5px;
}
.ms p {
  text-align: left;
}
.van-cell:not(:last-child)::after {
  border: 0;
}
</style>
