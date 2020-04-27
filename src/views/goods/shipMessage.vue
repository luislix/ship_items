<template>
  <div class="shipMessage">
    <myheader></myheader>
    <!-- <div class="accpet">
          <div class="question">
              <img src="../../assets/image/border.png" alt="">
              <h3>有货主申请您的船只托运，是否同意？</h3>
          </div>
          <ul class="options">
              <li>
                  <img class="checked" src="../../assets/image/lanse.png" alt="">
                  <p style="margin-left:-2rem;">托运货物:<span>石头-500吨</span></p>
                  <div class="detail">
                      <p style="margin-right:.1rem;">详细信息</p>
                      <img class="jiantou" src="../../assets/image/jiantou2.png" alt="">
                  </div> 
              </li>
              <li>
                   <img class="checked" src="../../assets/image/lanse.png" alt="">
                  <p style="margin-left:-2rem;">托运货物:<span>石头-500吨</span></p>
                  <div class="detail">
                      <p style="margin-right:.1rem;">详细信息</p>
                      <img class="jiantou" src="../../assets/image/jiantou2.png" alt="">
                  </div> 
              </li>
              <li>
                   <img class="checked" src="../../assets/image/lanse.png" alt="">
                  <p style="margin-left:-2rem;">托运货物:<span>石头-500吨</span></p>
                  <div class="detail">
                      <p style="margin-right:.1rem;">详细信息</p>
                      <img class="jiantou" src="../../assets/image/jiantou2.png" alt="">
                  </div> 
              </li>
          </ul>
      </div> -->
    <div class="information">
      <div class="question" style="padding:0;margin-bottom:.2rem;">
        <img src="@/assets/image/border.png" alt="" />
        <h3>我发布的信息</h3>
      </div>
      <p class="update_time">您于2019-09-08更新了此船期</p>
      <ul class="info_message" v-if="list!=''">
        <li>
          <p>订单编号</p>
          <p>{{ list.shipOrderNumber }}</p>
        </li>
        <li>
          <P>船只名称</P>
          <P>{{ list.shipInfoDTO.shipName }}</P>
        </li>
        <li>
          <p>MMSI</p>
          <p>{{ list.shipInfoDTO.shipMmsi }}</p>
        </li>
        <li>
          <p>联系电话</p>
          <p>{{ list.shipInfoDTO.shipPhone }}</p>
        </li>
        <li>
          <p>装载量</p>
          <p>{{ list.shipInfoDTO.maxRequiredWeight }}吨</p>
        </li>
        <li>
          <p>船只始发地</p>
          <p>{{ list.startAddressHistoryDtoList[0].provinceName }}-{{ list.startAddressHistoryDtoList[0].cityName }}</p>
        </li>
        <li>
          <p>船只目的地</p>
          <p>{{ list.endAddressHistoryDtoList[0].provinceName }}-{{ list.endAddressHistoryDtoList[0].cityName }}</p>
        </li>
        <li>
          <p>备注</p>
          <p>{{ list.remark==""?"无":list.remark }}</p>
        </li>
      </ul>
    </div>

    <div class="Rec_order">
      <div class="title">
        <img src="../../assets/image/border.png" alt="" />
        <h3>推荐货源</h3>
      </div>
      <div class="choose">
        <button type="button">拒绝托运</button>
        <button type="button">同意托运</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmptyShip } from "@/api/index.js";
import { timeToLocaleString } from "@/assets/js/index.js";
export default {
  name: "shipMessage",
  data() {
    return {
      userType: "",
      list:'',
      emptyShipId:103,
      token:''
    };
  },
  created() {
    this.userType = JSON.parse(localStorage.getItem("userLoginInfo")).userType;
    this.token = localStorage.getItem("token");
    this.getEmptyShips();
  },
  methods: {
    getEmptyShips() {
      getEmptyShip(this.emptyShipId, { token: this.token }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
          this.list = res.data.data;
          this.time = timeToLocaleString(this.list.startTime);
          console.log(this.list);
        }
      });
    }
  }
};
</script>

<style scoped>
.shipMessage {
  background: #f5f5f5;
  height: 100%;
}
.accpet {
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
  padding: 0.4rem 0.3rem 0 0.3rem;
  background: #fff;
  margin-bottom: 0.2rem;
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
.info_message li:nth-child(8) {
  border-bottom: none;
}
.Rec_order {
  background: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
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
.choose {
  display: flex;
  justify-content: space-around;
  padding: 0.2rem 0;
  box-shadow: 0px -2px 3px rgba(0, 0, 0, 0.1);
}
.choose button {
  width: 2.6rem;
  height: 0.7rem;
  border: none;
  font-family: PingFang-SC-Medium;
  color: #fff;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
.choose button:nth-child(1) {
  background: linear-gradient(to right, #9f9f9f, #a0a0a0, #c5c5c5);
}
.choose button:nth-child(2) {
  background: linear-gradient(to right, #0b6eff, #398cff, #68aaff);
}
.info_message li p:nth-child(1) {
  font-size: 0.28rem;
  color: #666666;
}
.info_message li p:nth-child(2) {
  font-size: 0.3rem;
  color: #333333;
  font-weight: 500;
}
</style>
