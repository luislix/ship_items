<template>
    <div class="orderDetails pageCommonStyle">
        <myheader></myheader>
        <van-row class="content" v-if="shipOrderInfo">
            <van-row class="goodsInfo background_white" v-if="shipOrderInfo.orderStatus==10||shipOrderInfo.orderStatus==2">
                <van-row class="align_center">
                    <van-col class="iconfont textColor_blue icon-shuxian"></van-col>
                    <van-col>有货主申请您的船只托运,是否同意?</van-col>
                </van-row>
                <van-row @click="checkGoods(item,index,$event)" v-for="(item,index) in goodsList" :key="index">
                    <van-row :class="index!=goodsList.length-1?'border_bottom':''" class="align_center" @click="showGoodsInfo=!showGoodsInfo">
                        <van-col class="float_c"  span="2"><van-icon name="checked" :class="index+1==flag?'active':''"/></van-col>
                        <van-col class="float_l" span="12">托运货物:{{item.goodsName}}<span class="textColor_darkGray">{{item.actualTotalWeight}}吨</span></van-col>
                        <van-col class="float_r textClolor_lightGray" span="8">详细信息</van-col>
                        <van-col class="float_c iconfont iconSize" :class="showGoodsInfo?'icon-down':'icon-fangxiangyou'" span="2"></van-col>
                    </van-row>
                    <van-row class="showGoodsInfo">
                        <van-row class="shipInfo" v-if="showGoodsInfo" :class="showGoodsInfo?'showGoodsInfo':''">
                            <van-row>
                                <van-row class="border_bottom" @click="$tools.callPhone(item.startAddressHistoryDTO.mobilePhone)">
                                    <van-col span="12" class="textColor_gray float_l">发货人电话</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r textColor_blue">{{item.startAddressHistoryDTO.mobilePhone||''}}</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">托运货物</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.goodsName||''}}</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">货物重量</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.actualTotalWeight||''}}</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">装货日期</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.loadingStartTime|formatTime()}}</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">货物单价</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.singlePrice||''}}吨</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">货物总运价</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.totalPrice||''}}</van-col>
                                </van-row>
                                <van-row class="border_bottom">
                                    <van-col span="12" class="textColor_gray float_l">货物始发地</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.startAddressHistoryDTO.cityName||''}}</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="12" class="textColor_gray float_l">货物目的地</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.endAddressHistoryDTO.cityName}}</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="12" class="textColor_gray float_l">备注</van-col>
                                    <van-col span="12" class="textColor_darkGray float_r">{{item.remark}}</van-col>
                                </van-row>
                            </van-row>
                        </van-row>
                    </van-row>
                </van-row>
            </van-row>
            <van-row class="myIssueInfo background_white">
                <van-row @click="showMyIssueInfo=!showMyIssueInfo">
                    <van-col span="16">
                        <van-col class="iconfont textColor_blue icon-shuxian"></van-col>
                        <van-col>我的发布信息</van-col>
                    </van-col>
                    <van-col span="8" :class="showMyIssueInfo?'icon-down':'icon-fangxiangyou'" class="iconfont float_r"></van-col>
                </van-row>
                <transition name="fade">
                    <van-row class="shipInfo" v-if="showMyIssueInfo" :class="showMyIssueInfo?'showMyIssueInfo':''">
                        <van-row class="textClolor_lightGray"><van-col>您于{{shipOrderInfo.modifyTime|formatTime}}更新了此船期</van-col></van-row>
                        <van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">订单编号</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipOrderNumber||''}}</van-col>
                            </van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">船只名称</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipInfoDTO.shipName||''}}</van-col>
                            </van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">MMSI</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipInfoDTO.shipMmsi||''}}</van-col>
                            </van-row>
                            <van-row class="border_bottom" @click="$tools.callPhone(shipOrderInfo.mobilePhone)">
                                <van-col span="12" class="textColor_gray float_l">联系电话</van-col>
                                <van-col span="12" class="textColor_blue float_r">{{shipOrderInfo.mobilePhone||''}}</van-col>
                            </van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">装载量</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.shipInfoDTO.maxRequiredWeight||''}}吨</van-col>
                            </van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">船只始发地</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.startAddress||''}}</van-col>
                            </van-row>
                            <van-row class="border_bottom">
                                <van-col span="12" class="textColor_gray float_l">船只目的地</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.endAddress||''}}</van-col>
                            </van-row>
                            <van-row>
                                <van-col span="12" class="textColor_gray float_l">备注</van-col>
                                <van-col span="12" class="textColor_darkGray float_r">{{shipOrderInfo.remark}}</van-col>
                            </van-row>
                        </van-row>
                    </van-row>
                </transition>
            </van-row>

            <!-- ---- -->
            <van-row class="addedServices background_white" v-if="$route.query.orderStatus==1">
                <van-row class="align_center" @click="showServices=!showServices">
                    <van-col span="16">
                        <van-col class="iconfont textColor_blue icon-shuxian"></van-col>
                        <van-col>保险与合同</van-col>
                    </van-col>
                    <van-col span="8" :class="showServices?'icon-down':'icon-fangxiangyou'" class="iconfont float_r"></van-col>
                </van-row>
                <transition name="fade">
                  <van-row v-if="showServices" class="addedServices_content">
                    <van-row class="border_bottom" @click.stop="serviceIntroduce">
                      <van-row>
                        <van-col span="12" class="float_l align_center" @click="serviceDetails">
                          <van-col class="float_c"><van-icon  :style="{color:payStatus?'#0470dc':''}" name="checked" /></van-col>
                          <van-col style="margin-left:.1rem;">合同服务</van-col>
                          <van-col class="float_c" style="margin-left:.1rem;"><van-icon name="question-o" /></van-col>
                        </van-col>
                        <van-col span="12" class="float_r">
                          <van-col class="textClolor_lightGray">{{payStatus?'已购买':'去购买'}}</van-col>
                          <van-col class="iconfont icon-fangxiangyou" style="font-size:13px;"></van-col>
                        </van-col>
                      </van-row>
                      <van-row class="sampleForm">
                        <van-col span="12" class="float_l textColor_blue" style="text-decoration:underline;" @click.stop="checkSample">合同样表</van-col>
                        <van-col span="12" class="float_r" style="color:#FFB33B;">&yen;20</van-col>
                      </van-row>
                    </van-row>
                  </van-row>
                </transition>
            </van-row>
            <van-row class="recommendGoods background_white">
                <van-row class="align_center">
                    <van-col span="16">
                        <van-col class="iconfont textColor_blue icon-shuxian"></van-col>
                        <van-col>推荐货源</van-col>
                    </van-col>
                    <van-col span="8" :class="showMyIssueInfo?'icon-down':'icon-fangxiangyou'" class="iconfont float_r"></van-col>
                </van-row>
            </van-row>
        </van-row>
        <van-row class="btn btnStyle" v-if="orderStatus">
            <van-col span="12"><van-button type="info" style="width:60%;background:gray" @click="shipConsentGoods(2)">拒绝托运</van-button></van-col>
            <van-col span="12"><van-button type="info" style="width:60%" @click="shipConsentGoods(1)">同意托运</van-button></van-col>
        </van-row>
        <van-row class="btn btnStyle" v-else>
            <van-col span="12"><van-button @click="delEmptyOrder" type="info" style="width:60%;background:gray">删除</van-button></van-col>
            <van-col span="12"><van-button @click="editShipOrderInfo" type="info" style="width:60%">编辑</van-button></van-col>
        </van-row>
    </div>
</template>

<script>
import {
  getEmptyShipInfoById,
  getShipInfo,
  delEmptyOrder,
  shipConsentGoods,
  cargoOrderInfo,
  getMyContractList,
  goodscancelShip,
  consentCargo
} from "@/api/index";
export default {
  data() {
    return {
      showGoodsInfo:false,
      flag: 1,
      goodsList: [],
      shipInfoDTO: "",
      shipOrderInfo: "",
      payStatus:0,
      orderStatus: 0,
      showMyIssueInfo: true,
      showServices:true
    };
  },
  created() {
    this.orderStatus = Number(this.$route.query.orderStatus) || 0;
    this.$nextTick(() => {
      this.getEmptyShipInfoById();
    });
  },
  updated(){
    console.log('updated')
    console.log(this.$store.goodsContractId)
    if(this.goodsList.length>0){
      this.payStatus = this.$store.goodsContractId==this.goodsList[0].goodsOrderId?1:0;
    }
  },
  methods: {
    checkGoods(item, index, event) {
      this.flag = index + 1;
    },
    getEmptyShipInfoById() {
      getEmptyShipInfoById(
        this.$route.query.shipId,
        localStorage.getItem("token")
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.shipOrderInfo = res.data.data;
          // 查询申请托运的货物状态
          if (
            this.shipOrderInfo.deliveryStatus == 1 &&
            this.shipOrderInfo.orderStatus == 2
          ) {
            cargoOrderInfo(
              this.shipOrderInfo.relativeOrder,
              localStorage.getItem("token")
            ).then(data => {
              console.log(data);
              if (
                data.data.code == 500 &&
                data.data.message == "货主订单详情为空"
              ) {
                this.$dialog
                  .confirm({
                    title: "嘟嘟船讯提醒您!",
                    message: "该货物订单已被货主删除，请确定删除订单！"
                  })
                  .then(() => {
                    consentCargo(
                      this.shipOrderInfo.relativeOrder,
                      this.$route.query.shipId,
                      2,
                      localStorage.getItem("token")
                    ).then(res => {
                      console.log(res);
                      if (res.data.code == 200) {
                        this.$toast("已删除该异常订单!");
                        this.getEmptyShipInfoById();
                      }
                    });
                  })
                  .catch(() => {});
              } else if(data.data.code==200){
                this.goodsList.push(data.data.data);
                console.log(this.goodsList)
              }
            });
          }
        }
      });
    },
    // getShipInfo() {
    //   getShipInfo(this.$route.query.shipId, localStorage.getItem("token")).then(
    //     res => {
    //       console.log(res);
    //       if (res.data.code == 200) {
    //         this.shipInfoDTO = res.data.data;
    //       }
    //     }
    //   );
    // },
    // 删除空船订单
    delEmptyOrder() {
      delEmptyOrder(
        this.$route.query.shipId,
        localStorage.getItem("token")
      ).then(res => {
        console.log(res);
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        if (res.data.code == 200) {
          this.$toast("删除成功");
          this.$router.go(-1);
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    // 编辑船舶空船订单信息
    editShipOrderInfo() {
      this.$router.push({
        path: "/issueShip",
        query: { jumpStatus: "edit", item: this.shipOrderInfo }
      });
    },
    // 同意拒绝货主订单请求
    shipConsentGoods(flag) {
      shipConsentGoods(
        this.shipOrderInfo.relativeOrder,
        this.$route.query.shipId,
        flag,
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
        this.$toast(res.data.message);
      });
    },
    // 查看合同详情
    serviceIntroduce(){
      if(this.payStatus){this.$toast('您已购买合同服务!')};
      this.$store.commit('setContract', this.goodsList[0])
      this.$router.push({path:'/buyService',query:{orderStatus:this.$route.query.orderStatus,goodsOrderId:this.goodsList[0].goodsOrderId,shipOrderId:this.shipOrderInfo.emptyShipOrderId}})
    },
    // 查看样表
    checkSample(){
      this.$router.push({path:'/contract',query:{jumpStatus:1}})
    },
    // 查看服务详情
    serviceDetails(){
      this.$router.push({path:'/serviceIntroduce',query:{}})
    }
  }
};
</script>

<style lang="less" scoped>
.orderDetails {
  .content {
    padding-bottom:1rem;
    .goodsInfo {
      padding: 0 0.1rem;
      .van-row {
        padding: 0.15rem;
      }
      .iconSize {
        font-size: 12px;
      }
    }
    .myIssueInfo {
      margin-top: 0.2rem;
      .van-row {
        padding: 0.15rem;
      }
      .shipInfo {
        padding: 0 0.3rem;
      }
    }
    .addedServices {
      margin-top: 0.2rem;
      .van-row {
        padding: 0.15rem;
      }
      .addedServices_content {
        padding:0 .4rem;
        .sampleForm {
          padding-left:.4rem ;
        }
      }
    }
    .recommendGoods {
      margin-top: 0.2rem;
      .van-row {
        padding: 0.15rem;
      }
    }
  }
  .btnStyle {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .active {
    color: #0b6eff;
  }
  .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
}
</style>