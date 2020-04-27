<template>
  <div class="goodsRecDetail">
    <myheader></myheader>
    <div class="accpet" v-if="shipOrderIdListStr">
      <div class="question">
        <img src="@/assets/image/border.png" alt="" />
        <div style="font-size:16px;color:black;font-weight:blod">请选择托运您货物的船只：</div>
      </div>
      <van-collapse v-model="activeNamess" style="padding: 0 .2rem;border:none;">
        <van-collapse-item
          style="padding: 0 .2rem;"
          name="1"
          v-for="(item, index) in shipOrderInfoList"
          :key="index"
        >
          <div slot="title" @click="selectSihp(item.emptyShipOrderId, index)">
            <van-icon
              name="checked"
              :style="{
                color: selectSihpId == item.emptyShipOrderId ? '#0b6eff' : ''
              }"
            />
            <p style="margin-left:0rem;">
              船只名称:<span>{{ item.shipInfoDTO.shipName }}</span>
            </p>
          </div>
          <ul class="info_message">
            <li>
              <p style="font-size:.28rem;color:#666666;">订单编号</p>
              <p style="font-size:.3rem;color:#333333;font-weight:600">
                {{ item.shipOrderNumber }}
              </p>
            </li>
            <li>
              <P>船只名称</P>
              <P>{{ item.shipInfoDTO.shipName }}</P>
            </li>
            <li>
              <p>MMSI</p>
              <p>{{ item.shipInfoDTO.shipMmsi }}</p>
            </li>
            <li @click="$tools.callPhone(item.shipInfoDTO.shipPhone)">
              <p>联系电话</p>
              <p class="textColor_blue">{{ item.shipInfoDTO.shipPhone }}</p>
            </li>
            <li>
              <p>装载量</p>
              <p>{{ item.shipInfoDTO.maxRequiredWeight }}</p>
            </li>
            <li>
              <p>船只始发地</p>
              <p>
                {{ item.startAddress }}
              </p>
            </li>
            <li>
              <p>船只目的地</p>
              <p>
                {{ item.endAddress }}
              </p>
            </li>
            <li>
              <p>备注</p>
              <p id="remark">
                {{ item.remark ? item.remark : "" }}
              </p>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="information" v-if="list != ''">
      <van-collapse :border="false" v-model="activeName" style="padding:0rem;">
        <van-collapse-item name="1">
          <div slot="title" style="font-size:16px;color:black;font-weight:blod"><img style="height:.3rem;width:.03rem;margin-right:.2rem;" src="@/assets/image/border.png" alt="" />我发布的信息</div>
          <ul class="info_message">
            <li>
              <p style="font-size:.28rem;color:#666666;">订单编号</p>
              <p style="font-size:.3rem;color:#333333;font-weight:600">
                {{ list.goodsOrderNumber }}
              </p>
            </li>
            <li>
              <P>托运物品</P>
              <P>{{ list.goodsName }}</P>
            </li>
            <li>
              <p>货物重量</p>
              <p>{{ list.actualTotalWeight }}</p>
            </li>
            <li>
              <p>装货日期</p>
              <p>{{ Time }}</p>
            </li>
            <li>
              <p>货物单价(选填)</p>
              <p>{{ list.singlePrice }}</p>
            </li>
            <li>
              <p>货物总运价（选填）</p>
              <p>{{ list.totalPrice }}</p>
            </li>
            <li>
              <p>货物始发地</p>
              <p>
                {{ list.startAddress }}
              </p>
            </li>
            <li>
              <p>货物目的地</p>
              <p>
               {{ list.endAddress }}
              </p>
            </li>
            <li style="height:auto;margin-top:.2rem;">
              <p>备注</p>
              <p style="width:90%;">{{ list.remark?list.remark:'' }}</p>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-row
      class="addedServices background_white"
      v-if="$route.query.orderStatus == 1"
    >
      <van-row class="align_center" style="padding-right:.2rem;" @click="showServices = !showServices">
        <van-col span="16">
          <van-col class="iconfont textColor_blue icon-shuxian"></van-col>
          <van-col style="font-size:16px;color:black;font-weight:blod;">保险与合同</van-col>
        </van-col>
        <van-col
          span="8"
          :class="showServices ? 'icon-down' : 'icon-fangxiangyou'"
          class="iconfont float_r"
        ></van-col>
      </van-row>
      <transition name="fade">
        <van-row v-if="showServices" class="addedServices_content">
          <van-row class="border_bottom">
            <van-row @click.stop="serviceIntroduce">
              <van-col
                span="12"
                class="float_l align_center"
                @click.stop="serviceDetails"
              >
                <van-col class="float_c"><van-icon name="checked"/></van-col>
                <van-col style="margin-left:.1rem;">合同服务</van-col>
                <van-col class="float_c" style="margin-left:.1rem;"
                  ><van-icon name="question-o"
                /></van-col>
              </van-col>
              <van-col span="12" class="float_r">
                <van-col class="textClolor_lightGray">去购买</van-col>
                <van-col
                  class="iconfont icon-fangxiangyou"
                  style="font-size:13px;"
                ></van-col>
              </van-col>
            </van-row>
            <van-row class="sampleForm">
              <van-col
                span="12"
                class="float_l textColor_blue"
                style="text-decoration:underline;"
                @click.stop="checkSample"
                >合同样表</van-col
              >
              <van-col span="12" class="float_r" style="color:#FFB33B;"
                >&yen;20</van-col
              >
            </van-row>
          </van-row>
          <van-row>
            <van-row>
              <van-col span="12" class="float_l align_center" @click.stop="serviceDetails('insurance')">
                <van-col class="float_c"><van-icon name="checked"/></van-col>
                <van-col style="margin-left:.1rem;">保险服务</van-col>
                <van-col class="float_c" style="margin-left:.1rem;"
                  ><van-icon name="question-o"
                /></van-col>
              </van-col>
              <van-col span="12" class="float_r" @click="insurance">
                <van-col class="textClolor_lightGray">去购买</van-col>
                <van-col
                  class="iconfont icon-fangxiangyou"
                  style="font-size:13px;"
                ></van-col>
              </van-col>
            </van-row>
            <van-row class="sampleForm">
              <!-- <van-col span="12" class="float_l textColor_blue" style="text-decoration:underline;">保险样表</van-col> -->
              <!-- <van-col span="12" class="float_r" style="color:#FFB33B;">&yen;20</van-col> -->
            </van-row>
          </van-row>
        </van-row>
      </transition>
    </van-row>
    <div class="Agree">
      <div class="question" style="padding:0;margin-bottom:.2rem;">
        <img src="@/assets/image/border.png" alt="" />
        <div style="font-size:16px;color:black;font-weight:blod">推荐船源</div>
      </div>
    </div>
    <div class="footer">
      <div class="tab" v-if="list.orderStatus == 2">
        <button type="button" @click="reConsign(2)">拒绝托运</button>
        <button type="button" @click="reConsign(1)">同意托运</button>
      </div>
      <div class="tab" v-if="list.orderStatus == 1">
        <button type="button" @click="delOrder">删除</button>
        <button type="button" @click="edit">编辑</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCargoDetails,
  goodscancelShip,
  delGoodsOrder,
  getEmptyShipInfoById
} from "@/api/index";
import { timeToLocaleString } from "@/assets/js/index";
import { Toast } from "vant";
export default {
  name: "goodsRecDetail",
  data() {
    return {
      emptyShipId: "",
      activeName: ["1"],
      activeNamess: ["1"],
      token: localStorage.getItem("token"),
      showServices: true, //显示合同
      goodsOrderId: 15,
      list: "",
      Time: "",
      shipOrderIdListStr: [], //申请托运的船只id list
      shipOrderInfoList: [], //申请托运的船只信息
      responseType: "",
      selectSihpId: "", //选中的船只订单id
      shipIndex: ""
    };
  },
  created() {
    this.goodsOrderId = this.$route.query.id;
    console.log(this.goodsOrderId);
    this.getMyselfGoods();
  },
  methods: {
    getMyselfGoods() {
      getCargoDetails(this.goodsOrderId, this.token).then(res => {
        console.log(res.data.data);
        this.list = res.data.data;
        this.Time = timeToLocaleString(this.list.loadingStartTime);
        if (this.list.relativeOrder) {
          this.shipOrderIdListStr = this.list.relativeOrder.split(",");
          console.log(this.shipOrderIdListStr);
          if (this.shipOrderIdListStr.length > 0) {
            this.shipOrderIdListStr.forEach((element, index) => {
              console.log(element);
              getEmptyShipInfoById(element, localStorage.getItem("token")).then(
                res => {
                  console.log(res);
                  if (res.data.code == 200) {
                    this.shipOrderInfoList.push(res.data.data);
                    console.log(this.shipOrderInfoList);
                  } else if (res.data.message == "船舶订单详情为空") {
                    this.$toast("系统自动过滤船只信息为空的订单!");
                    goodscancelShip(
                      this.goodsOrderId,
                      this.shipOrderIdListStr[index],
                      2,
                      1,
                      localStorage.getItem("token")
                    ).then(res => {
                      console.log("过滤", res);
                      if (res.data.code == 200) {
                        this.getMyselfGoods();
                      }
                    });
                  }
                  //  if (that.data.orderInfo.orderStatus == 10 || that.data.orderInfo.orderStatus==3 && that.data.orderInfo.deliveryStatus==1){
                  //     // 根据relativeOrder船只id查询船只信息
                  //     if (!data.relativeOrder) { return }
                  //     let shipInfoList = data.relativeOrder.split(',')
                  //     let shipData = []
                  //     for (let i = 0; i < shipInfoList.length; i++) {
                  //       shipOrderInfo(shipInfoList[i], this.data.userData.access_token).then(res => {
                  //         if (res.code == 200) {
                  //           res.data.checked = false
                  //           shipData.push(res.data)
                  //         } else if (res.message == "船舶订单详情为空"){
                  //           utils.tip('系统自动过滤船只信息为空的订单！',3500)
                  //           this.onShow()
                  //           // 货主订单，船主订单
                  //          consentShip(that.data.orderInfo.goodsOrderId, shipInfoList[i], 2, that.data.userData.access_token).then(res => {
                  //           })
                  //         }
                  //       })
                  //     }
                  //   }
                }
              );
            });
          }
        }
      });
    },
    //货主同意/拒绝托运
    reConsign(num) {
      var that = this;
      this.responseType = num;
      console.log(this.selectSihpId);
      if (!this.selectSihpId) {
        return this.$toast("请选择船只！");
      }
      goodscancelShip(
        this.goodsOrderId,
        this.selectSihpId,
        this.responseType,
        3,
        this.token
      ).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (num == 1) {
            Toast.success("已同意");
            setTimeout(() => {
              that.$router.push({
                path: "/waitShipment",
                query: {
                  shipId: this.shipOrderIdListStr,
                  orderId: this.goodsOrderId
                }
              });
            }, 1500);
          } else if (num == 2) {
            Toast.success("已拒绝");
            setTimeout(() => {
              that.$router.push("/index/home");
            }, 1500);
          }
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    //货主删除订单
    delOrder() {
      var that = this;
      delGoodsOrder(this.goodsOrderId, this.token).then(res => {
        if (res.status == 200) {
          Toast.success("删除成功");
          setTimeout(() => {
            that.$router.push("/myIssue");
          }, 1500);
        }
      });
    },
    //编辑货物订单
    edit() {
      this.$router.push({
        path: "/releaseGoods",
        query: { id: this.goodsOrderId }
      });
    },
    // 选择托运船只
    selectSihp(shipid, index) {
      console.log(shipid, index);
      this.selectSihpId = shipid;
      this.shipIndex = index;
      console.log(this.selectSihpId);
    },
    // 查看合同详情
    serviceIntroduce() {
      if (!this.selectSihpId) {
        return this.$toast("请先选择托运您货物的船只！");
      }
      this.$store.commit("setContract", this.list);
      this.$store.commit(
        "setShipOrderInfo",
        this.shipOrderInfoList[this.shipIndex]
      );
      this.$router.push({
        path: "/buyService",
        query: {
          orderStatus: this.$route.query.orderStatus,
          goodsOrderId: this.goodsOrderId,
          shipOrderId: this.selectSihpId
        }
      });
    },
    // 查看样表
    checkSample() {
      this.$router.push({ path: "/contract", query: { jumpStatus: 1 } });
    },
    // 保险服务
    insurance() {
      if (!this.selectSihpId) {
        return this.$toast("请先选择托运您货物的船只！");
      }
      this.$router.push({ path: "/insurance", query: {} });
    },
    // 查看服务详情
    serviceDetails(serviceType) {
      console.log(serviceType)
      if(serviceType==='insurance'){
        this.$router.push({ path: "/serviceIntroduce", query: {jumpStatus:1} });
      } else {
        this.$router.push({ path: "/serviceIntroduce", query: {} });
      }
    }
  }
};
</script>

<style scoped lang="less">
.goodsRecDetail {
  background: #f5f5f5;
  height: 100%;
  overflow: auto;
  padding-bottom: 1rem;
  .addedServices {
    margin-top: 0.2rem;
    .van-row {
      padding: 0.15rem;
    }
    .addedServices_content {
      padding: 0 0.4rem;
      .sampleForm {
        padding-left: 0.4rem;
      }
    }
  }
  .van-collapse {
    .van-collapse-item {
      .van-cell {
        .van-cell__title {
          div {
            display: flex;
            // justify-content: space-around;
            align-items: center;
            .van-icon {
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
}
.accpet {
  background: #fff;
  margin-bottom: 0.2rem;
}
.question {
  padding: 0.3rem 0.3rem 0.25rem 0.32rem;
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
.options {
  padding: 0 0.3rem 0 0.6rem;
}
.options li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.9rem;
  border-bottom: 1px #f1f1f1 solid;
}
.options li p {
  font-size: 0.26rem;
  color: #666666;
}
.options li p span {
  font-size: 0.28rem;
  font-weight: 600;
}
.options li .checked {
  width: 0.28rem;
  height: 0.28rem;
}
.detail {
  display: flex;
}
.jiantou {
  width: 0.1rem;
  height: 0.2rem;
  margin-top: 0.1rem;
}
.information {
  // padding: 0.4rem 0.3rem 0 0.3rem;
  background: #fff;
  // margin-bottom: 1.25rem;
}
.update_time {
  font-size: 0.24rem;
  color: #888888;
  text-align: left;
}
.info_message li {
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #f1f1f1 solid;
}
.info_message li p:nth-child(1) {
  color: #666;
  font-size: 0.28rem;
}
.info_message li p:nth-child(2) {
  font-size: 0.3rem;
  color: #333333;
  font-weight: 550;
}
.info_message li:nth-child(9) {
  border-bottom: none;
}
.Rec_order {
  background: #fff;
}
.Rec_order .title {
  padding: 0 0.3rem;
  height: 1rem;
  display: flex;
  align-items: center;
}
.title img {
  height: 0.3rem;
  margin-right: 0.2rem;
}
.title h3 {
  font-size: 0.28rem;
  color: #333333;
}
.Agree {
  padding: 0.4rem 0.3rem 0 0.3rem;
  height: 1.63rem;
  background: #fff;
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
.van-cell {
  position: static;
  font-size: 0.3rem;
  color: rgb(51, 51, 51);
  font-weight: 600;
}
.van-collapse-item__content {
  padding: 0 .2rem;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
