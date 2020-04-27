<template>
    <div v-if="shipOrderInfo" class="orderDetails pageCommonStyle">
        <myheader></myheader>
        <van-row class="order_content">
            <van-row class="order_status">
                <van-row class="float_l">
                    <van-col class="iconfont icon-shuxian textColor_blue"></van-col>
                    <van-col>订单编号:{{shipOrderInfo.shipOrderDTO.shipOrderNumber||''}}</van-col>
                    <van-col class="iconfont icon-fuzhi" @click="copy(shipOrderInfo.shipOrderDTO.shipOrderNumber)"></van-col>
                </van-row>
                <van-row>
                  <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==7">
                    <van-row span class="float_c">
                      <van-col span="2" class="float_c"><van-icon name="warning" /></van-col>
                      <van-col span="20" class="float_l">订单已取消</van-col>
                    </van-row>
                    <van-row><van-col style="padding-left:.8rem;">货物预期取消</van-col></van-row>
                  </van-row>
                  <van-steps  v-else active-color="#38f" direction="vertical" :active="orderStatus">
                      <van-step>
                          <van-row>
                              <van-col span="12" class="float_l">待运货</van-col>
                              <van-col span="12"><p v-if="orderStatus==0">{{shipOrderInfo.goodsOrderDTO.createTime|formatTime('yy-mm-dd h:m:s')}}</p><p v-else>- - - - -</p></van-col>
                          </van-row>
                      </van-step>
                      <van-step>
                          <van-row>
                              <van-col span="12" class="float_l">运货待确认</van-col>
                              <van-col span="12"><p v-if="orderStatus==1">{{shipOrderInfo.goodsOrderDTO.createTime|formatTime('yy-mm-dd h:m:s')}}</p><p v-else>- - - - -</p></van-col>
                          </van-row>
                      </van-step>
                      <van-step>
                          <van-row>
                              <van-col span="12" class="float_l">运输中</van-col>
                              <van-col span="12"><p v-if="orderStatus==2">{{shipOrderInfo.goodsOrderDTO.createTime|formatTime('yy-mm-dd h:m:s')}}</p><p v-else>- - - - -</p></van-col>
                          </van-row>
                      </van-step>
                      <van-step>
                          <van-row>
                              <van-col span="12" class="float_l">卸货待确认</van-col>
                              <van-col span="12"><p v-if="orderStatus==3">{{shipOrderInfo.goodsOrderDTO.createTime|formatTime('yy-mm-dd h:m:s')}}</p><p v-else>- - - - -</p></van-col>
                          </van-row>
                      </van-step>
                      <van-step>
                          <van-row>
                              <van-col span="12" class="float_l">已完成</van-col>
                              <van-col span="12"><p v-if="orderStatus==4">{{shipOrderInfo.goodsOrderDTO.createTime|formatTime('yy-mm-dd h:m:s')}}</p><p v-else>- - - - -</p></van-col>
                          </van-row>
                      </van-step>
                  </van-steps>
                </van-row>
            </van-row>
            <van-row class="order_goodsInfo">
                <van-row @click="showGoodsInfo=!showGoodsInfo">
                    <van-col span="12" class="float_l">
                        <van-col class="iconfont icon-shuxian textColor_blue"></van-col>
                        <van-col>货源信息：</van-col>
                    </van-col>
                    <van-col span="12" :class="showGoodsInfo?'icon-down':'icon-fangxiangyou'" class="iconfont float_r"></van-col>
                </van-row>
                <transition name='fade'>
                  <van-row class="goodsInfo" v-if="showGoodsInfo">
                    <van-row>
                        <van-col class="textClolor_lightGray">联系人：</van-col>
                        <van-col>{{shipOrderInfo.goodsOrderDTO.userName}}</van-col>
                    </van-row>
                    <van-row @click="$tools.callPhone(shipOrderInfo.goodsOrderDTO.mobilePhone)">
                        <van-col class="textClolor_lightGray">联系电话：</van-col>
                        <van-col class="textColor_blue">{{shipOrderInfo.goodsOrderDTO.mobilePhone}}</van-col>
                    </van-row>
                    <van-row>
                        <van-row @click="lookMap">
                            <van-col span="12">
                                <van-col class="textClolor_lightGray">起始地址：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.startAddress}}</van-col>
                            </van-col>
                            <van-col span="12" style="font-size:20px;" class="iconfont icon-zu1 textColor_blue float_r"></van-col>
                        </van-row>
                        <van-row><van-col span="5"></van-col><van-col span="19" class="float_l">详细地址</van-col></van-row>
                    </van-row>
                    <van-row class="border_bottom">
                        <van-row @click="lookEndMap">
                            <van-col span="12">
                                <van-col class="textClolor_lightGray">目的地址：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.endAddress}}</van-col>
                            </van-col>
                            <van-col span="12" style="font-size:20px;" class="iconfont icon-zu1 textColor_blue float_r"></van-col>
                        </van-row>
                        <van-row><van-col span="5"></van-col><van-col span="19" class="float_l">详细地址</van-col></van-row>
                    </van-row>
                    <van-row>
                        <van-row>
                             <van-col span="12">
                                <van-col class="textClolor_lightGray">货物重量：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.actualTotalWeight}}吨</van-col>
                            </van-col>
                            <van-col span="12">
                                <van-col class="textClolor_lightGray">货物总价：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.totalPrice}}元</van-col>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">
                                <van-col class="textClolor_lightGray">托运物品：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.goodsName}}</van-col>
                            </van-col>
                            <van-col span="12">
                                <van-col class="textClolor_lightGray">货物总运价：</van-col>
                                <van-col>{{shipOrderInfo.goodsOrderDTO.totalPrice}}</van-col>
                            </van-col>
                        </van-row>
                        <van-row><van-col class="textClolor_lightGray">备注：</van-col><van-col>{{shipOrderInfo.goodsOrderDTO.remark}}</van-col></van-row>
                    </van-row>
                    <van-row></van-row>
                  </van-row>
                </transition>
            </van-row>
            <van-row class="order_shipInfo">
              <van-row>
                  <van-col class="iconfont icon-shuxian textColor_blue"></van-col>
                  <van-col>运货船只：</van-col>
              </van-row>
              <van-row class="ship_info" @click="showShipInfo=!showShipInfo">
                  <van-col span="16" class="float_l">
                      <van-col>托运船只：</van-col>
                      <van-col>{{shipOrderInfo.shipOrderDTO.shipInfoDTO.shipName}}</van-col>
                  </van-col>
                  <van-col span="8" class="float_r">
                      <van-col>详细信息</van-col>
                      <van-col :class="showShipInfo?'icon-down':'icon-fangxiangyou'" class="iconfont icon-fangxiangyou"></van-col>
                  </van-col>
              </van-row>
              <van-row class="ship_data" style="padding:.22rem;" v-if="showShipInfo">
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">订单编号</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.shipOrderNumber||''}}</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">船只名称</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.shipInfoDTO.shipName||''}}</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">MMSI</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.shipInfoDTO.shipMmsi||''}}</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">联系电话</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.shipInfoDTO.shipPhone||''}}</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">装载量</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.shipInfoDTO.maxRequiredWeight||''}}吨</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">船只始发地</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.startAddress}}</van-col>
                  </van-row>
                  <van-row class="border_bottom">
                      <van-col span="12" class="textColor_gray float_l">船只目的地</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.endAddress}}</van-col>
                  </van-row>
                  <van-row>
                      <van-col span="12" class="textColor_gray float_l">备注</van-col>
                      <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderDTO.remark}}</van-col>
                  </van-row>
              </van-row>
            </van-row>
        </van-row>
        <van-row class="btn">
            <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==3&&(shipOrderInfo.goodsOrderDTO.deliveryStatus==1||shipOrderInfo.goodsOrderDTO.deliveryStatus==8)">
                <van-col span="6" class="callPhone" @click="$tools.callPhone(shipOrderInfo.goodsOrderDTO.mobilePhone)">
                    <van-col class="iconfont icon-dianhua1 textColor_blue"></van-col>
                    <van-col class="textClolor_lightGray">联系货主</van-col>
                </van-col>
                <van-col span="18">
                    <van-button type="info" @click="applyLoading">申请装货</van-button>
                </van-col>
            </van-row>
            <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==6&&shipOrderInfo.goodsOrderDTO.deliveryStatus==9">
                <van-col span="24" @click="$tools.callPhone(shipOrderInfo.goodsOrderDTO.mobilePhone)" class="callPhone">
                    <van-col class="iconfont icon-dianhua1 textColor_blue"></van-col>
                    <van-col class="textClolor_lightGray">联系货主</van-col>
                </van-col>
            </van-row>
            <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==7&&(shipOrderInfo.goodsOrderDTO.deliveryStatus==8||shipOrderInfo.goodsOrderDTO.deliveryStatus==1)">
                <van-col span="6" @click="$tools.callPhone(shipOrderInfo.goodsOrderDTO.mobilePhone)" class="callPhone">
                    <van-col class="iconfont icon-dianhua1 textColor_blue"></van-col>
                    <van-col class="textClolor_lightGray">联系货主</van-col>
                </van-col>
                <van-col span="18">
                    <van-button style="background: radial-gradient(farthest-side at 0 0, #CC1F12 0%, #FF6666 100%)" class="cancelOrder" type="info" @click="delOrder">删除订单</van-button>
                </van-col>
            </van-row>
            <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==6&&shipOrderInfo.goodsOrderDTO.deliveryStatus==3">
                <van-col span="6" @click="$tools.callPhone(shipOrderInfo.goodsOrderDTO.mobilePhone)" class="callPhone">
                    <van-col class="iconfont icon-dianhua1 textColor_blue"></van-col>
                    <van-col class="textClolor_lightGray">联系货主</van-col>
                </van-col>
                <van-col span="18">
                    <van-button class="cancelOrder" type="info" @click="shipApplyUnloading">申请卸货</van-button>
                </van-col>
            </van-row>
            <van-row v-if="shipOrderInfo.goodsOrderDTO.orderStatus==8&&shipOrderInfo.goodsOrderDTO.deliveryStatus==5">
                <van-col span="8">
                    <van-button style="background: radial-gradient(farthest-side at 0 0, #CC1F12 0%, #FF6666 100%);width:90%" type="info" @click="delOrder">删除订单</van-button>
                </van-col>
                <van-col span="8">
                    <van-button style="width:90%" type="info" @click="OrderToEvaluate">订单评价</van-button>
                </van-col>
                <van-col span="8">
                    <van-button style="width:90%;" type="info" @click="republish">重新发布</van-button>
                </van-col>
            </van-row>
        </van-row>
  </div>
</template>

<script>
import {
  getOrderDetails,
  shipApplyLoading,
  shipApplyUnloading,
  republishShipOrder,
  delEmptyOrder,
  orderSendSmsToServer
} from "@/api/index";
export default {
  data() {
    return {
      flag: "",
      shipOrderInfo: "",
      orderStatus: 0,
      showGoodsInfo:true,
      showShipInfo:true
    };
  },
  created() {
    console.log(this.$route.query);
    this.$nextTick(() => {
      this.getOrderDetails();
    });
  },
  methods: {
    getOrderDetails() {
      getOrderDetails(
        this.$route.query.shipOrderId,
        localStorage.getItem("token")
      ).then(res => {
        if (res.data.code == 200) {
          this.shipOrderInfo = res.data.data;
          if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==3&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
              this.orderStatus=2
          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==9&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
              this.orderStatus=3
          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==5&&this.shipOrderInfo.goodsOrderDTO.orderStatus==8){
              this.orderStatus=4
          }else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==8&&this.shipOrderInfo.goodsOrderDTO.orderStatus==3){
              this.orderStatus=1
          }
          console.log(this.shipOrderInfo);
        }
      });
    },
    // 申请装货
    applyLoading() {
      console.log("申请装货");
      shipApplyLoading(
        this.shipOrderInfo.shipOrderDTO.emptyShipOrderId,
        this.shipOrderInfo.goodsOrderDTO.goodsOrderId,
        localStorage.getItem("token")
      ).then(res => {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        if (res.data.code == 200) {
          this.orderSendSmsToServer(this.shipOrderInfo.goodsOrderDTO.mobilePhone);
          this.$router.go(-1);
        }
      });
    },
    // 申请卸货
    shipApplyUnloading() {
      shipApplyUnloading(
        this.shipOrderInfo.shipOrderDTO.emptyShipOrderId,
        this.shipOrderInfo.goodsOrderDTO.goodsOrderId,
        localStorage.getItem("token")
      ).then(res => {
        console.log(res);
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        if (res.data.code == 200) {
          this.orderSendSmsToServer(this.shipOrderInfo.goodsOrderDTO.mobilePhone);
          this.$router.go(-1);
        }
      });
    },
    // 删除订单
    delOrder() {
      delEmptyOrder(
        this.shipOrderInfo.shipOrderDTO.emptyShipOrderId,
        localStorage.getItem("token")
      ).then(res => {
        console.log(res);
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        if (res.data.code == 200) {
          this.$router.go(-1);
        }
      });
    },
    // 订单评价
    OrderToEvaluate(){
      let userName = JSON.parse(localStorage.getItem('userLoginInfo')).userName;
      this.$router.push({path:'/evaluate',query:{userName:userName,shipOrderIdList:this.shipOrderInfo.shipOrderDTO.shipInfoId,orderIdListStr:this.shipOrderInfo.goodsOrderDTO.goodsOrderId,userId:this.shipOrderInfo.goodsOrderDTO.userId}});
      userName = "";
    },
    // 重新发布
    republish(){
      republishShipOrder(this.shipOrderInfo.shipOrderDTO.emptyShipOrderId,localStorage.getItem('token')).then(res=>{
        console.log(res)
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        if(res.data.code==200){
          this.$toast('发布成功')
        } else {
          setTimeout(() => {
            this.$toast(res.data.message)
          }, 1000);
        }
      })
    },
    // 查看地址信息
    lookMap(){
      let lonAndLat = this.shipOrderInfo.goodsOrderDTO.startLonLat.split(',');
      this.$router.push({path:"/map",query:{ longitude:lonAndLat[0],latitude: lonAndLat[1]}})
    },
    lookEndMap(){
      let lonAndLat = this.shipOrderInfo.goodsOrderDTO.endLonLat.split(',');
      this.$router.push({path:"/map",query:{ longitude:lonAndLat[0],latitude: lonAndLat[1] }})
    },
    // 记录拨打电话
    orderSendSmsToServer(phone){
      orderSendSmsToServer(phone,localStorage.getItem('token'));
    },
    // copy
    copy(text){
      document.execCommand(text);
    }
  }
};
</script>

<style lang="less">
.orderDetails {
  height: 100vh;
  .van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    background:#0470dc;
  }
  .van-step--vertical:not(:last-child)::after {
    border:none;
  }
  .order_content {
    height: 85vh;
    overflow: auto;
    .order_status {
      background: #fff;
      padding: 0.1rem 0.2rem;
      margin-bottom: 0.2rem;
    }
    .order_goodsInfo {
      background: #fff;
      padding: 0.1rem 0rem;
      .van-row {
        padding: 0.08rem;
      }
      .goodsInfo {
        padding: 0.1rem 0.3rem;
      }
    }
    .order_shipInfo {
      margin-top: 0.2rem;
      background: #fff;
      margin-bottom: 0.2rem;
      .van-row {
        padding: 0.1rem;
      }
      .ship_info {
        padding: 0.1rem 0.3rem;
      }
    }
  }
  .btn {
    .callPhone {
      position: relative;
      top: -0.2rem;
      display: flex;
      flex-direction: column;
      padding-bottom: 0.1rem;
      .van-col {
        height: 0.4rem;
      }
    }
  }
}
</style>
