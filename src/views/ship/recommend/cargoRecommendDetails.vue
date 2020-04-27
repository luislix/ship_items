<template>
  <div class="cargoInfo">
    <van-row>
      <van-nav-bar
        title="货物详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <!-- <van-icon name="search" slot="right" /> -->
      </van-nav-bar>
    </van-row>
    <van-row v-if="cargoOrderInfo != ''">
      <van-row class="cargoName">
        <van-col span="6">
          <van-image
            width="1.3rem"
            height="1.3rem"
            round
            :src="
              consigner.userPortrait
                ? consigner.userPortrait
                : 'https://img.yzcdn.cn/vant/cat.jpeg'
            "
          />
        </van-col>
        <van-col span="13" class="grade">
          <!-- <van-row>{{whether=='false'?cargoOrderInfo.contactsName:consigner.userName}}</van-row> -->
          <!-- <van-row><van-rate v-model="grade" /></van-row> -->
          <span class="bold">{{
            whether == "true"
              ? cargoOrderInfo.userName
              : cargoOrderInfo.contactsName
          }}</span>
          <van-row
            >订单成交数:{{
              whether == "true" ? cargoOrderInfo.orderCountDone : 1
            }}</van-row
          >
        </van-col>
        <van-col span="5">
          <van-row type="flex" justify="end" @click="callPhone()">
            <van-row class="icon">
              <van-icon name="phone-o" />
            </van-row>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="cargoAddress">
        <van-row class="cargoContent">
          <van-row class="cargoContent-col dashed">
            <van-col>
              <van-row>始发地</van-row>
              <van-row class="bold">{{
                whether == "true"
                  ? cargoOrderInfo.startAddress
                  : cargoOrderInfo.location
              }}</van-row>
            </van-col>
            <van-col>
              <van-row
                >装货日期：{{
                  whether == "true"
                    ? cargoOrderInfo.loadingStartTime
                    : cargoOrderInfo.startDate | formatTime()
                }}</van-row
              >
              <!-- <van-row class="icon"><van-icon name="arrow" /></van-row> -->
              <van-row>
                <img class="arrow" src="@/assets/image/arrow.png" alt />
              </van-row>
            </van-col>
            <van-col>
              <van-row>目的地</van-row>
              <van-row class="bold">{{
                whether == "true"
                  ? cargoOrderInfo.endAddress
                  : cargoOrderInfo.placeOfArrival
              }}</van-row>
            </van-col>
          </van-row>
          <van-row class="consigner-col solid">
            <van-row class="consigner">
              <!-- <van-col span="2" class="icon">
                                <van-icon name="location" />
              </van-col>-->
              <van-col span="9">
                联系人 :
                <span class="bold">{{
                  whether == "true"
                    ? cargoOrderInfo.userName
                    : cargoOrderInfo.contactsName
                }}</span>
                <!-- 发货人:<span class="bold">{{whether == 'true'?cargoOrderInfo.startAddressHistoryDTO.userName:cargoOrderInfo.title}}</span> -->
              </van-col>
            </van-row>
            <van-row class="consigner">
              <van-col span="14" @click="callPhone">
                联系电话：
                <span class="bold">{{
                  whether == "true"
                    ? cargoOrderInfo.mobilePhone
                    : cargoOrderInfo.contactsPhone
                }}</span>
              </van-col>
            </van-row>
            <van-row class="consigner">
              <van-col span="12" v-if="whether == 'true'"
                >始发地址：{{
                  cargoOrderInfo.startAddress}}</van-col
              >
              <van-col span="2" class="icon" offset="11">
                <img
                  @click="toStartMap"
                  v-if="whether == 'true'"
                  src="@/assets/image/dingwei.jpg"
                  width="14"
                />
              </van-col>
            </van-row>
            <van-row class="consigner">
              <van-col span="12" v-if="whether == 'true'"
                >目的地址：{{
                  cargoOrderInfo.endAddress}}</van-col
              >
              <van-col
                span="2"
                v-if="whether == 'true'"
                class="icon"
                offset="11"
              >
                <img
                  @click="toEndMap"
                  src="@/assets/image/dingwei.jpg"
                  width="14"
                />
              </van-col>
            </van-row>
          </van-row>
          <!-- <van-row class="cargoContent-col">
                        <van-row class="consigner">
                            <van-col span="2" class="icon">
                                <van-icon name="location" />
                            </van-col>
                            <van-col span="8">
                                收货人:<span class="bold">{{ whether == 'true'?cargoOrderInfo.endAddressHistoryDTO.userName:cargoOrderInfo.contactsName}}</span>
                            </van-col>
                            <van-col span="14">
                                联系电话：<span class="bold">{{ whether == 'true'?cargoOrderInfo.endAddressHistoryDTO.mobilePhone:cargoOrderInfo.contactsPhone }}</span>
                            </van-col>
                        </van-row>
                        <van-row  class="consigner">
                            <van-col span="2" class="icon">
                                <van-icon name="location-o" />
                            </van-col>
                            <van-col class="18" v-if="whether == 'true'">
                                {{cargoOrderInfo.endAddressHistoryDTO.provinceName+cargoOrderInfo.endAddressHistoryDTO.cityName+cargoOrderInfo.endAddressHistoryDTO.addressDetails}}
                            </van-col>
                            <van-col class="18" v-if="whether == 'false'">
                                {{cargoOrderInfo.placeOfArrival}}
                            </van-col>
                        </van-row>
          </van-row>-->
        </van-row>
      </van-row>
      <van-row class="cargoData">
        <van-row class="cargoContent">
          <van-row class="cargoWeight">
            <van-col span="10">
              货物重量：
              <span class="bold"
                >{{
                  whether == "true"
                    ? cargoOrderInfo.actualTotalWeight
                    : cargoOrderInfo.tonnage
                }}吨</span
              >
            </van-col>
            <van-col span="10">
              货物价格：
              <span class="bold"
                >{{
                  whether == "true"
                    ? cargoOrderInfo.singlePrice
                    : cargoOrderInfo.freightRate
                }}元</span
              >
            </van-col>
          </van-row>
          <van-row class="cargoPrice">
            <van-col span="12">
              托运物品：
              <span class="bold">{{
                whether == "true"
                  ? cargoOrderInfo.goodsName
                  : cargoOrderInfo.title
              }}</span>
            </van-col>
            <van-col span="12">
              货物运价：
              <span class="bold"
                >{{
                  whether == "true" ? cargoOrderInfo.totalPrice : "-"
                }}元</span
              >
            </van-col>
          </van-row>
          <van-row class="remark">
            <van-col span="10">
              备注：
              <span class="bold">{{
                whether == "true"
                  ? cargoOrderInfo.remark.slice(0, 7) || ""
                  : cargoOrderInfo.title
              }}</span>
            </van-col>
          </van-row>
          <van-dialog
            v-model="showTime"
            title="确认需要托运的船只"
            @confirm="confirmTo"
            show-cancel-button
            messageAlign
          >
            <ul class="showShip">
              <li>
                <p>托运物品：</p>
                <p>
                  {{
                    whether == "true"
                      ? cargoOrderInfo.goodsName
                      : cargoOrderInfo.title
                  }}
                </p>
              </li>
              <li>
                <p>装货时间：</p>
                <p>
                  {{
                    whether == "true"
                      ? cargoOrderInfo.loadingStartTime
                      : cargoOrderInfo.startDate | formatTime
                  }}
                </p>
              </li>
              <li>
                <p>货物重量：</p>
                <p>
                  {{
                    whether == "true"
                      ? cargoOrderInfo.actualTotalWeight
                      : cargoOrderInfo.tonnage
                  }}吨
                </p>
              </li>
              <li>
                <p>货运起止地：</p>
                <p>
                  {{
                    whether == "true"
                      ? cargoOrderInfo.startAddress: cargoOrderInfo.location +
                        "-" +
                        cargoOrderInfo.placeOfArrival
                  }}
                </p>
              </li>
            </ul>
          </van-dialog>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="btn">
      <van-button type="info" @click="toShipManagement">确认托运</van-button>
    </van-row>
  </div>
</template>

<script>
import { getCargoDetails,dial, getUserInfo, getPythonCargoInfo,shipCallPhone ,pythonPhoneByShip} from "@/api/index";
export default {
  data() {
    return {
      // grade:5,
      consigner: "", //发货人信息
      cargoOrderInfo: "", //货物订单信息
      showTime: false,
      whether: this.$route.query.whether,
      id: ""
    };
  },
  created() {
    this.whether = this.$route.query.whether;
    this.id = this.$route.query.id;
    this.$nextTick(function() {
      this.getCargoDetails(
        this.$route.query.id,
        this.$route.query.userId,
        localStorage.getItem("token")
      );
    });
    console.log("ppp" + this.id)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toStartMap(){
      if(this.whether == "false"){
        this.$router.push({path:'/map',query:{longitude:this.cargoOrderInfo.longitude,latitude:this.cargoOrderInfo.latitude}})

      }else {
         this.$router.push({ path:'/map',query:{ longitude:this.cargoOrderInfo.startAddressHistoryDTO.longitude,latitude:this.cargoOrderInfo.startAddressHistoryDTO.latitude } })
      }
    },
    toEndMap() {
      if(this.whether == "false"){
        this.$router.push({path:'/map',query:{longitude:this.cargoOrderInfo.longitude,latitude:this.cargoOrderInfo.latitude}})
      }else{
         this.$router.push({ path:'/map',query:{ longitude:this.cargoOrderInfo.endAddressHistoryDTO.longitude,latitude:this.cargoOrderInfo.endAddressHistoryDTO.latitude } })
      }
    },
    toShipManagement() {
      // this.$router.push({path:'/shipManagement',query:{}})
      if(this.$route.query.whether=='false'){
        this.callPhone();
      } else {
        this.showTime = true;
      }
    },
    // 获取货主订单信息
    getCargoDetails(cargoOrderId, userId, token) {
      if (this.whether == "false") {
        // 爬虫货物数据
        getPythonCargoInfo(cargoOrderId, token).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.cargoOrderInfo = res.data.data;
            console.log(this.cargoOrderInfo)
          }
        });
      } else {
        // 发货人信息
        getUserInfo(userId, token).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.consigner = res.data.data;
          }
          console.log(this.consigner);
        });
        // 货物订单信息
        getCargoDetails(cargoOrderId, token).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.cargoOrderInfo = res.data.data;
            console.log(this.cargoOrderInfo, 111);
          }
        });
      }
      console.log("consigner", this.consigner);
      console.log("cargoOrderInfo", this.cargoOrderInfo);
    },
    confirmTo() {
      this.$router.push({
        path: "/shipManagement",
        query: { id: this.id, jumpStatus: 1 }
      });
    },
    callPhone(item) {
      console.log("cargoOrderInfo", this.cargoOrderInfo);
      if(JSON.parse(localStorage.getItem('userLoginInfo')).user_certificate_status==0){
          return this.$dialog.confirm({
              title:"嘟嘟船讯提醒您!",
              message:"您的身份未认证!认证后可查看更多详情，点击确定前往认证。"
          }).then(() => {
            this.$router.push({path:'/Authentication',query:{jumpStatus:0}})
          }).catch(() => {});
      }
      this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `是否联系:${this.cargoOrderInfo.mobilePhone?this.cargoOrderInfo.mobilePhone:this.cargoOrderInfo.contactsPhone}`
        })
        .then(() => {
          if (this.whether == "false") {
            pythonPhoneByShip(this.cargoOrderInfo.id,3,localStorage.getItem('token')).then(res=>{
              console.log(res)
            })
            window.location.href = "tel:" + this.cargoOrderInfo.contactsPhone;
          } else {
            let userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'))
            let calleeUserOrderId
            if(userLoginInfo.userType==3){
              calleeUserOrderId = this.cargoOrderInfo.goodsOrderId;
            } else {
            }
            dial(userLoginInfo.user_id,userLoginInfo.userType,this.cargoOrderInfo.userId,2,this.cargoOrderInfo.mobilePhone,calleeUserOrderId,localStorage.getItem('token')).then(res=>{
              console.log(res)
              userLoginInfo = '';
            })
            window.location.href ="tel:" + this.cargoOrderInfo.mobilePhone;
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.cargoInfo {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  color: #666;
  // background: #fafdff;
  .icon {
    color: #0b6eff;
    font-size: 0.3rem;
  }
  .bold {
    font-size: 16px;
    color: #484848;
  }
  .cargoName {
    background: #fff;
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    .grade {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
    }
    .icon {
      font-size: 0.5rem;
      color: #0b6eff;
    }
  }
  .cargoAddress {
    display: flex;
    justify-content: center;
    margin-top: 0.2rem;
    .cargoContent {
      height: 5.24rem;
      width: 6.9rem;
      background: #fff;
      border-radius: 0.1rem;
      .cargoContent-col {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1.598rem;
        width: 6.9rem;
        margin-bottom: 0.5rem;
      }
      .consigner-col {
        text-align: left;
        padding-left: 0.4rem;
        .consigner {
          width: 100%;
          display: flex;
          margin-bottom: 0.3rem;
          justify-content: left;
          // justify-content: flex-start;
          :nth-child(2) {
            display: flex;
            align-items: flex-start;
          }
        }
      }
      .cargoContent-col:nth-child(2),
      .cargoContent-col:nth-child(3) {
        // display:flex;
        // justify-content: space-between;
        flex-direction: column;
      }

      .dashed {
        border-bottom: 1px dashed #eee;
        &::before,
        &::after {
          display: block;
          content: "";
          height: 0.3rem;
          width: 0.3rem;
          background: #f5f5f5;
          position: relative;
          border-radius: 50%;
          top: 0.8rem;
          left: 0.33rem;
        }
        &::before {
          left: -0.33rem;
        }
      }
      // .solid {
      // border-bottom: 1px solid #eee;
      // }
    }
  }
  .cargoData {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.2rem;
    .cargoContent {
      text-align: left;
      padding-left: 0.4rem;
    }
    .cargoContent {
      height: 2rem;
      width: 6.9rem;
      background: #fff;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: column;
      // align-items:center;
      .van-row {
        height: 50%;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  .btn {
    width: 100%;
    height: 1.2rem;
    background: #fff;
    position: absolute;
    bottom: 0px;
    line-height: 1.3rem;
    box-shadow: 0px 0px 8px #c3bdbd;
    .van-button {
      width: 60%;
      height: 0.9rem;
      border-radius: 0.2rem;
      font-size: 18px;
      border-color: #fff;
      background: radial-gradient(
        farthest-side at 0 0,
        #0b6eff 0%,
        #68aaff 100%
      );
    }
  }
}
.showShip {
  padding: 0.4rem 0;
}
.showShip li {
  display: flex;
  justify-content: left;
  // justify-content: space-around;
  height: 0.6rem;
  margin-left: 1rem;
  align-items: center;
  color: #555555;
  font-size: 0.26rem;
}
.showShip li p:nth-child(2) {
  text-align: right;
}
.van-col--10 {
  width: 100%;
}
</style>
