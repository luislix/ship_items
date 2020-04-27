<template>
  <div class="waitShipment">
    <myheader></myheader>
    <div class="OrderNum">
      <img class="border" src="../../../assets/image/border.png" alt="" />
      <p>订单编号：{{ orderlist.goodsOrderNumber }}</p>
    </div>
    <van-steps direction="vertical" :active="active" active-color="#0470DC">
      <van-step>
        <h3>待接货</h3>
        <p>{{ active == 0 ? date : "--- ---" }}</p>
      </van-step>
      <van-step>
        <h3>运货待确认</h3>
        <p>{{ active == 1 ? date : "--- ---" }}</p>
      </van-step>
      <van-step>
        <h3>运输中</h3>
        <p>{{ active == 2 ? date : "--- ---" }}</p>
      </van-step>
      <van-step>
        <h3>卸货待确认</h3>
        <p>{{ active == 3 ? date : "--- ---" }}</p>
      </van-step>
      <van-step>
        <h3>已完成</h3>
        <p>{{ active == 4 ? date : "--- ---" }}</p>
      </van-step>
    </van-steps>
    <van-collapse
      style="padding-bottom:1.1rem"
      v-model="activeNames"
      v-if="shiplist != ''"
    >
      <van-collapse-item style="margin-bottom:.2rem" name="1">
        <div slot="title">
          <div class="headers">
            <img
              style="margin:.1rem .3rem 0 0"
              class="border"
              src="../../../assets/image/border.png"
              alt=""
            />
            <span>带接货船只</span>
          </div>
          <p style="float:left">
            托运船只:<span>{{ shiplist.shipInfoDTO.shipName }}</span>
          </p>
        </div>
        <ul class="shipDetailss">
          <li>
            <p>船只名称</p>
            <p>{{ shiplist.shipInfoDTO.shipName }}</p>
          </li>
          <li>
            <p>联系电话</p>
            <p>{{ shiplist.shipInfoDTO.shipPhone }}</p>
          </li>
          <li>
            <p>装载量</p>
            <p>
              {{ shiplist.shipInfoDTO.minRequiredWeight }}-{{
                shiplist.shipInfoDTO.maxRequiredWeight
              }}
            </p>
          </li>
          <li>
            <p>空船日期</p>
            <p>{{ shiplist.shipInfoDTO.modifyTime | myDate }}</p>
          </li>
          <li>
            <p>船只始发地</p>
            <p>
              {{ shiplist.startAddress}}
            </p>
          </li>
          <li>
            <p>船只目的地</p>
            <p>
              {{ shiplist.endAddress}}
            </p>
          </li>
          <li>
            <p>船只当前位置</p>
            <p>-</p>
          </li>
        </ul>
      </van-collapse-item>
      <van-collapse-item style="margin-top:.2rem" name="2">
        <div slot="title">
          <div class="headers">
            <img
              style="margin:.1rem .3rem 0 0"
              class="border"
              src="../../../assets/image/border.png"
              alt=""
            />
            <span>我发布的信息</span>
          </div>
        </div>
        <ul class="content" v-if="orderlist != ''">
          <li>
            <span>联系人：</span>
            <span>{{ orderlist.userName }}</span>
          </li>
          <li>
            <span>联系电话：</span>
            <span>{{ orderlist.mobilePhone }}</span>
          </li>
          <li>
            <span>始发地址：</span>
            <span>{{
              orderlist.startAddress}}</span>
          </li>
          <li>
            <span>目的地址：</span>
            <span>{{
              orderlist.endAddress}}</span>
          </li>
        </ul>
        <ul class="details">
          <li>
            <p>货物重量：{{ orderlist.actualTotalWeight }}吨</p>
            <p>货物单价：{{ orderlist.singlePrice }}元</p>
          </li>
          <li>
            <p>托运物品：{{orderlist.goodsName}}</p>
            <P>货物总运价：{{ orderlist.totalPrice }}元</P>
          </li>
          <li>
            <p>备注：</p>
            <p>{{ orderlist.remark }}</p>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <div class="tabs">
      <div class="tab">
        <button
          v-if="orderlist.deliveryStatus == 1"
          @click="cancelOrders"
          type="button"
        >
          取消托运
        </button>
        <button
          v-if="orderlist.deliveryStatus == 1"
          type="button"
          @click="contactShip"
        >
          联系船主
        </button>
        <button
          v-if="orderlist.deliveryStatus == 8"
          type="button"
          @click="cancelOrders"
        >
          取消交易
        </button>
        <button
          v-if="orderlist.deliveryStatus == 8"
          type="button"
          @click="agreeLoading"
        >
          同意装货
        </button>
        <button
          v-if="orderlist.orderStatus == 6 && orderlist.deliveryStatus == 3"
          type="button"
          @click="contactShip"
        >
          联系收货人
        </button>
        <button
          v-if="orderlist.orderStatus == 6 && orderlist.deliveryStatus == 9"
          type="button"
          @click="unLoading"
        >
          同意卸货
        </button>

        <button
          @click="orderevaluate"
          v-if="orderlist.orderStatus == 8 && orderlist.deliveryStatus == 5"
          type="button"
        >
          订单评价
        </button>
      </div>
    </div>

    <!-- 取消托运 -->
    <van-dialog
      @confirm="confirm"
      @cancel="cancels"
      v-model="show"
      title="请选择取消托运的原因"
      show-cancel-button
    >
      <van-radio-group style="padding:.5rem;width:4.8rem" v-model="radio">
        <van-radio
          v-for="item in options"
          :key="item.id"
          style="height:.8rem;display:flex;justify-content:flex-start;align-items:center"
          :name="item.name"
        >
          <p style="margin-left:.3rem;">{{ item.text }}</p>
        </van-radio>
      </van-radio-group>
      <textarea placeholder="请输入其他原因" class="reason" name="reason" id="">
      </textarea>
    </van-dialog>
  </div>
</template>

<script>
import {
  queryOrderDetails,
  cancelOrder,
  allowLoading,
  orderSendSmsToServer,
  allowUnLoading
} from "@/api/index";
import { Toast } from "vant";
import { Dialog } from "vant";
import { timeToLocaleString } from "../../../assets/js/index";
export default {
  name: "waitShipment",
  data() {
    return {
      active: 0,
      activeNames: ["1"],
      shiplist: "",
      orderlist: "",
      shipOrderIdListStr: "",
      goodsOrderId: "",
      userData: "",
      show: false,
      radio: "1",
      options: [
        {
          id: 1,
          name: 1,
          text: "已找到船只托运"
        },
        {
          id: 2,
          name: 2,
          text: "货物预期取消"
        },
        {
          id: 3,
          name: 3,
          text: "计划延期"
        },
        {
          id: 4,
          name: 4,
          text: "其他"
        }
      ],
      status: "",
      date: "---    ---"
    };
  },
  created() {
    this.shipOrderIdListStr = this.$route.query.shipId;
    this.goodsOrderId = this.$route.query.orderId;
    this.getGoodsDetails();
  },
  // watch:{
  //   status(oldVal,newVal){
  //     console.log(oldVal,newVal);
  //   }
  // },
  methods: {
    //查询货物详细信息
    getGoodsDetails() {
      queryOrderDetails(this.goodsOrderId, localStorage.getItem("token")).then(
        res => {
          this.orderlist = res.data.data.goodsOrderDTO;
          this.shiplist = res.data.data.shipOrderDTOList[0];
          this.shipOrderIdListStr = this.shiplist.emptyShipOrderId;
          this.status = this.orderlist.deliveryStatus;
          this.date = timeToLocaleString(this.shiplist.modifyTime);
          if (this.orderlist.deliveryStatus == 8) {
            this.date = timeToLocaleString(this.shiplist.modifyTime);
            this.active = 1;
          } else if (this.orderlist.deliveryStatus == 1) {
            this.date = timeToLocaleString(this.shiplist.modifyTime);
            this.active = 0;
          } else if (this.orderlist.orderStatus == 6) {
            this.date = timeToLocaleString(this.shiplist.modifyTime);
            this.active = 2;
          } else if (
            this.orderlist.orderStatus == 8 &&
            this.orderlist.deliveryStatus == 5
          ) {
            this.date = timeToLocaleString(this.shiplist.modifyTime);
            this.active = 4;
          } else if (
            this.orderlist.orderStatus == 6 &&
            this.orderlist.deliveryStatus == 9
          ) {
            this.active = 3;
          }
          console.log(res);
        }
      );
    },

    //取消订单
    cancelOrders() {
      this.show = true;
    },
    confirm() {
      var that = this;
      cancelOrder(
        this.shiplist.emptyShipOrderId,
        this.goodsOrderId,
        localStorage.getItem("token")
      ).then(res => {
        if (res.status == 200) {
          Toast.success("已取消交易");
          // 记录拨打电话
          orderSendSmsToServer(this.shiplist.shipInfoDTO.shipPhone,localStorage.getItem('token'))
          setTimeout(() => {
            that.$router.push({
              path: "/index/order",
              query:{}
            });
          }, 1000);
        }
      });
    },
    cancels() {
      this.show = false;
    },

    //货主同意装货
    agreeLoading() {
      var that = this;
      console.log(this.orderlist.goodsOrderId);
      allowLoading(
        this.shiplist.emptyShipOrderId,
        this.orderlist.goodsOrderId,
        localStorage.getItem("token")
      ).then(res => {
        // console.log(res);
        Toast.success("已同意装货");
        setTimeout(() => {
          that.$router.push({
            path: "/index/order"
          });
        }, 1000);
      });
    },
    //货主同意卸货
    unLoading() {
      var that = this;
      Dialog.confirm({
        title: "确定要卸货吗？"
      }).then(() => {
        allowUnLoading(
          this.shiplist.emptyShipOrderId,
          this.orderlist.goodsOrderId,
          localStorage.getItem("token")
        ).then(res => {
          console.log(res);
          Toast.success("已同意卸货");
          setTimeout(() => {
            that.$router.push({
              path: "/index/order"
            });
          }, 1000);
        });
      });
    },

    //联系船主
    contactShip() {
      Dialog.confirm({
        title: "是否拨打船主电话",
        message: `${this.shiplist.shipInfoDTO.shipPhone}`
      })
        .then(() => {
          window.location.href = "tel:" + this.shiplist.shipInfoDTO.shipPhone;
          this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
          SendMsg(
            this.userData.user_id,
            this.userData.userType,
            this.shiplist.userId,
            3,
            this.shiplist.shipInfoDTO.shipPhone
          ).then(res => {
            console.log(res);
          });
        })
        .catch(() => {
        });
    },
    orderevaluate() {
      this.$router.push({
        path: "/evaluate",
        query: {
          shipOrderIdList: this.shiplist.emptyShipOrderId,
          orderIdListStr: this.orderlist.goodsOrderId
        }
      });
    }
  }
};
</script>

<style lang="less">
.waitShipment {
  background: #f1f1f1;
  height: 100%;
  .van-step--vertical:not(:last-child)::after {
    border: none;
  }
  .van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    background-color: #0b6eff;
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
  .headers {
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
  .shipDetailss li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
  }
  .reason {
    border: none;
    background: #f8f8f8;
    width: 5rem;
    height: 2.4rem;
    margin: 0 auto;
    padding: 0.2rem;
    font-size: 0.26rem;
  }
}
</style>
