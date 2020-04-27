<template>
  <div class="shipDetail">
    <myheader></myheader>
    <div class="title" v-if="list != ''">
      <img class="touxiang" src="@/assets/image/goods_logo.png" alt="" />
      <div class="name">
        <h3 style="font-size:.32rem;color:#333333;">
          {{ whether == "true" ? list.userName : list.contactsName }}
        </h3>
        <p>
          订单成交数:{{
            whether == "true" ? list.orderCountDone : list.numberInfo
          }}
        </p>
      </div>
      <img
        @click="showTel"
        class="phone"
        src="@/assets/image/dianhua@2x.png"
        alt=""
      />
    </div>

    <div class="main" v-if="list != ''">
      <div class="detail">
        <ul class="city">
          <li>
            <h3>始发地</h3>
            <h1>
              {{
                whether == "true"
                  ? list.startAddress
                  : list.location
              }}
            </h1>
          </li>
          <li>
            <h3>装货日期：{{ whether == "true" ? time : list.startDate | formatTime }}</h3>
            <img class="jiantou" src="@/assets/image/jiantou.png" alt="" />
          </li>
          <li>
            <h3>目的地</h3>
            <h1>
              {{
                whether == "true"
                  ? list.endAddress
                  : list.placeOfArrival
              }}
            </h1>
          </li>
        </ul>

        <ul class="ship_details">
          <li>
            船只名称：<span>{{
              whether == "true" ? list.shipInfoDTO.shipName : list.shipsName
            }}</span>
          </li>
          <li>
            MMSI：<span>{{
              whether == "true" ? list.shipInfoDTO.shipMmsi : ""
            }}</span>
          </li>
          <li @click="showTel">
            联系电话：<span>{{
              whether == "true"
                ? list.shipInfoDTO.shipPhone
                : list.contactsPhone
            }}</span>
          </li>
          <li>
            装载量:
            <span v-if="$route.query.whether == 'true'"
              >{{ list.shipInfoDTO.minRequiredWeight }} -
              {{ list.shipInfoDTO.maxRequiredWeight }}吨</span
            >
            <span v-if="$route.query.whether == 'false'"
              >{{ list.tonnage }}吨</span
            >
          </li>
          <li @click="toStartMap">
            始发详细地址：<span v-if="$route.query.whether == 'true'">{{ list.startAddress}}</span>
              <img src="@/assets/image/dingwei.jpg" alt="" style="0.3rem;height:0.3rem;position: absolute ;bottom:4.2rem; right: 0.7rem;">
          </li>
          <li @click="toEndMap">
            目的详细地址：<span v-if="$route.query.whether == 'true'"
              >{{ list.endAddress}}</span
            >
            <img src="@/assets/image/dingwei.jpg" alt="" style="0.3rem;height:0.3rem;position: absolute ; bottom:3.6rem; right: 0.7rem;">
          </li>
          <li style="max-height:3rem;overflow:auto;">
            备注：<span>{{ list.remark == "" ? "无" : list.remark }}</span>
          </li>
        </ul>
        <van-dialog
          v-model="showTime"
          title="确认需要托运的船只"
          @confirm="confirmTo"
          show-cancel-button>
          <ul class="showShip">
            <li>
              <p>船只名称：</p>
              <p>
                {{
                  whether == "true" ? list.shipInfoDTO.shipName : list.shipsName
                }}
              </p>
            </li>
            <li>
              <p>MMSI：</p>
              <p>{{ whether == "true" ? list.shipInfoDTO.shipMmsi : "" }}</p>
            </li>
            <li @click="showTel">
              <p>联系电话：</p>
              <p>
                {{
                  whether == "true"
                    ? list.shipInfoDTO.shipPhone
                    : list.contactsPhone
                }}
              </p>
            </li>
            <li>
              <p>装载量：</p>
              <p v-if="$route.query.whether == 'true'">
                {{ list.shipInfoDTO.minRequiredWeight }} -
                {{ list.shipInfoDTO.maxRequiredWeight }}吨
              </p>
              <p v-if="$route.query.whether == 'false'">{{ list.tonnage }}吨</p>
            </li>
            <li>
              <p>船只始发地：</p>
              <p v-if="$route.query.whether == 'true'">
                {{ list.startAddress}}
              </p>
              <p v-if="$route.query.whether == 'false'">
                {{ list.location.slice(0, 5) }}
              </p>
            </li>
            <li>
              <p>船只目的地：</p>
              <p v-if="$route.query.whether == 'true'">
                {{ list.startAddress}}
              </p>
              <p v-if="$route.query.whether == 'false'">
                {{ list.placeOfArrival.slice(0, 5) }}
              </p>
            </li>
          </ul>
        </van-dialog>
      </div>
    </div>
    <div class="tab">
      <button type="button" @click="showShipDetail">申请托运</button>
    </div>
  </div>
</template>

<script>
import { getEmptyShip, getPythonShipInfo, SendMsg,dial,pythonPhoneByShip } from "@/api/index.js";
import { timeToLocaleString } from "@/assets/js/index.js";
import { Dialog } from "vant";
export default {
  name: "shipDetail",
  data() {
    return {
      token: "",
      emptyShipId: this.$route.query.id,
      list: [],
      time: "",
      show: false,
      userData: "",
      phone: "",
      showTime: false,
      whether: this.$route.query.whether
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    console.log(this.$route.query);
    this.token = localStorage.getItem("token");
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.phone = this.userData.loginName;
    this.getEmptyShip();
  },
  methods: {
    //获取空船详情
    getEmptyShip() {
      //获取用户空船订单详情
      if (this.$route.query.whether == "true") {
        console.log()
        getEmptyShip(this.emptyShipId, { token: this.token }).then(res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.list = res.data.data;
            this.time = timeToLocaleString(this.list.startTime);
          }
          console.log(this.list);
        });
      } else if (this.$route.query.whether == "false") {
        //获取爬虫船订单详情
        if (this.userData.userType == 2||this.userData.userType==8) {
          getPythonShipInfo(this.$route.query.id, this.token).then(res => {
            if (res.data.code == 200) {
              this.list = res.data.data;
              this.time = timeToLocaleString(this.list.startTime);
            }
            console.log(this.whether == "true");
            var tt = this.list.shipInfoDTO
              ? this.list.shipInfoDTO.shipName
              : this.list.shipsName;
            console.log(tt);
          });
        } 
      }
    },
    showTel() {
      console.log(this.list.userId);
      Dialog.confirm({
        // title: '标题',
        message:
          this.whether == "true"
            ? this.list.shipInfoDTO.shipPhone + "</br>是否联系船主"
            : this.list.contactsPhone + "</br>是否联系船主"
      })
        .then(() => {
          if (this.whether == "false") {
            window.location.href = "tel://" + this.list.contactsPhone;
            pythonPhoneByShip(this.list.id,2,localStorage.getItem('token')).then(res=>{
              console.log(res)
            })
          } else {
            window.location.href = "tel://" + this.list.shipInfoDTO.shipPhone;
            dial(this.userData.user_id,this.userData.userType,this.list.userId,3,this.list.shipInfoDTO.shipPhone,this.list.emptyShipOrderId,localStorage.getItem('token')).then(res=>{
              console.log(res)
            })
          }
        })
        .catch(() => {
        });
    },
    showShipDetail() {
      this.showTime = true;
    },
    confirmTo() {
      var that = this;
      if (this.whether == "false") {
        window.location.href = "tel://" + this.list.contactsPhone;
        setTimeout(()=>{
          that.$router.push({path:'/index/home'})
        },800)
      } else {
        this.$router.push({
          path: "/chooseGoods",
          query: { id: this.emptyShipId }
        });
      }
    },
    toStartMap() {
      if(this.$route.query.whether == "false"){
        this.$router.push({path:"/map",query:{longitude:this.list.longitude,latitude:this.list.latitude}})
      }else{
        let lonAndLat = this.list.startLonLat.split(',');
        this.$router.push({path:"/map",query:{longitude:lonAndLat[0],latitude:lonAndLat[1]}})
      }
    },
    toEndMap() {
       if(this.$route.query.whether == "false"){
        this.$router.push({path:"/map",query:{longitude:this.list.longitude,latitude:this.list.latitude}})
      }else{
        let endlonAndLat = this.list.endLonLat.split(',');
        this.$router.push({path:"/map",query:{longitude:endlonAndLat[0],latitude:endlonAndLat[1]}})
      }
    }
  }
};
</script>

<style scoped>
.shipDetail {
  background: #f5f5f5;
  height: 100%;
}
img {
  display: block;
}
.touxiang {
  width: 1rem;
  height: 1rem;
}
.phone {
  width: 0.4rem;
  height: 0.4rem;
  margin-left: 0.5rem;
}
.title {
  padding: 0 0.3rem;
  height: 1.8rem;
  background: #fff;
  display: flex;
  align-items: center;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.2rem;
}
.name {
  width: 4.7rem;
  margin-left: 0.2rem;
}
.name h3 {
  text-align: left;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #333;
  font-family: PingFang-SC-Medium;
  font-weight: 450;
}
.name p {
  font-size: 0.26rem;
  color: #666666;
  text-align: left;
  font-family: PingFang-SC-Regular;
}
.main {
  padding: 0 0.3rem;
  margin-bottom: 1.7rem;
}
.detail {
  padding: 0.5rem 0.25rem;
  background: url("../../assets/image/bg_01.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.detail .city {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px #dddddd dashed;
}
.detail .city li h3 {
  font-family: PingFang-SC-Regular;
  color: #666666;
  font-size: 0.24rem;
  margin-bottom: 0.2rem;
}
.jiantou {
  width: 1.8rem;
  height: 0.12rem;
  margin-left: 0.4rem;
}
.detail .city li h1 {
  font-size: 0.36rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.2rem;
}
.ship_details {
  padding: 0.4rem 0 0.4rem 0.3rem;
}
.ship_details li {
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: left;
  color: #666666;
  font-size: 0.26rem;
  font-weight: 500;
}
.ship_details li span {
  font-size: 0.28rem;
  color: #333333;
  font-weight: 600;
  font-family: PingFang-SC-Medium;
}
.tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
  box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.1);
}
button {
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 4rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  margin: 0 auto;
  background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
}
.showShip {
  padding: 0.4rem 0;
}
.showShip li {
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  height: 0.6rem;
  align-items: center;
  color: #555555;
  font-size: 0.26rem;
}
.showShip li p:nth-child(2) {
  text-align: right;
}
</style>
