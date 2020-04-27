<template>
  <div class="releaseGoods">
    <myheader></myheader>
    <ul style="padding: 0;">
      <keep-alive>
        <li>
          <p>选择始发地址</p>

          <div @click="chooseStart(1)">
            <input
              v-model="startAddress"
              type="text"
              readonly
              placeholder="请选择始发地址"
            />
            <img src="../../assets/image/jiantou2.png" alt="" />
          </div>
        </li>
      </keep-alive>
      <li>
        <p>选择目的地址</p>
        <div @click="chooseStart(2)">
          <input
            readonly
            v-model="endAddress"
            type="text"
            placeholder="请选择目的地址"
          />
          <img src="../../assets/image/jiantou2.png" alt="" />
        </div>
      </li>
      <li>
        <p>装载时间</p>
        <div @click="chooseTime">
          <input
            v-model="loadTime"
            readonly
            type="text"
            placeholder="请选择装载时间"
          />
          <img src="../../assets/image/jiantou2.png" alt="" />
        </div>
      </li>
      <li>
        <p>联系人</p>
        <input
          v-model="Contacts"
          type="text"
          placeholder="请输入联系人"
          class="rightText"
        />
      </li>
      <li>
        <p>联系电话</p>
        <input
          v-model="telphone"
          type="text"
          placeholder="请输入联系电话"
          class="rightText"
        />
      </li>
      <li>
        <p>货物名称</p>
        <input
          v-model="goodsName"
          type="text"
          placeholder="请输入货物名称"
          class="rightText"
        />
      </li>
      <li>
        <p>货物总重量(吨)</p>
        <input
          v-model="actWeight"
          type="text"
          placeholder="请输入货物总重量"
          class="rightText"
        />
      </li>
      <li>
        <p>货物单价（选填）</p>
        <input
          v-model="price"
          type="text"
          placeholder="请输入货物单价"
          class="rightText"
        />
      </li>
      <li>
        <p>货物总运价（选填）</p>
        <input
          v-model="All_price"
          type="text"
          placeholder="请输入货物总运价"
          class="rightText"
        />
      </li>
    </ul>

    <div class="Remarks">
      <h3>备注（选填）</h3>
      <textarea
        v-model="remark"
        name="remark"
        id="remark"
        placeholder="对船主我还有些话想说"
      ></textarea>
    </div>
    <div class="contract">
      <!-- <img style="width:.3rem;height:.3rem" src="../../assets/image/lanse.png" alt=""> -->
      <van-radio-group v-model="radio" icon-size=".3rem">
        <van-radio @click="checked" name="1"></van-radio>
      </van-radio-group>
      <p>合同服务</p>
      <img
        @click="serviceTip"
        style="width:.24rem;height:.24rem"
        src="../../assets/image/wenhao.png"
        alt=""
      />
    </div>
    <div>
      <h4
        style="padding:.3rem .3rem 1.7rem .3rem;font-size:.22rem;text-align:left;font-weight: 100;"
      >
        <span style="color: red;padding-right: 5px;">*</span
        >因本平台注重订单时效性，您发布的订单如果在一个月内未成单，系统将删除该订单！
      </h4>
    </div>

    <div class="tab">
      <button v-if="goodsOrderId == ''" type="button" @click="release">
        发布
      </button>
      <button v-if="goodsOrderId != ''" type="button" @click="updateGoodsOrder">
        编辑
      </button>
    </div>
    <van-popup position="bottom" v-model="showTime">
      <van-datetime-picker
        @cancel="exit"
        @confirm="ready"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
      />
    </van-popup>
    <!-- <van-popup position="bottom" v-model="showStartAddress">
      <div class="Address">
        <ul class="address_list" v-if="list.length > 0">
          <li id="addressList" v-for="item in list" :key="item.id" @click="chooseAddressOne(item)">
            <p style="text-align:left">
              <span style="margin-right:.2rem">{{ item.userName }}</span
              ><span>{{ item.mobilePhone }}</span>
            </p>
            <p style="text-align:left">
              {{ item.provinceName }} {{ item.cityName }}
            </p>
            <img style="width:.4rem;height:.4rem" src="../../assets/image/edit.png" alt="">
          </li>
        </ul>
        <button class="add" @click="add_map" type="button">新增收货地址</button>
      </div>
    </van-popup> -->
    <!-- <van-popup position="bottom" v-model="showEndAddress">
      <div class="Address">
        <ul class="address_list" v-if="list.length > 0">
          <li id="addressList" v-for="item in list" :key="item.id" @click="chooseAddressTwo(item)">
            <p style="text-align:left">
              <span style="margin-right:.2rem">{{ item.userName }}</span
              ><span>{{ item.mobilePhone }}</span>
            </p>
            <p style="text-align:left">
              {{ item.provinceName }} {{ item.cityName }}
            </p>
            <img style="width:.4rem;height:.4rem" src="../../assets/image/edit.png" alt="">
          </li>
        </ul>
        <button class="add" @click="add_map" type="button">新增收货地址</button>
      </div>
    </van-popup> -->
    <!-- 选择始发 -->
    <van-popup
      v-model="showStartAddress"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-area
        :area-list="areaList"
        @confirm="confirmStart"
        @cancel="cancelStart"
        value="110101"
      />
    </van-popup>
    <!-- 选择目的地 -->
    <van-popup
      v-model="showEndAddress"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-area
        :area-list="areaList"
        @confirm="confirmEnd"
        @cancel="cancelEnd"
        value="110101"
      />
    </van-popup>
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
import { Picker } from "vant";
import {
  releaseOrder,
  getCargoDetails,
  updateGoods,
  queryAddress
} from "@/api/index";
import { address } from "@/mixin/address";
import { timeToLocaleString } from "@/assets/js/index";
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
Vue.use(Picker);
export default {
  name: "releaseGoods",
  mixins: [address],
  data() {
    return {
      showStart: false,
      showEnd: false,
      showTime: false,
      currentDate: new Date(),
      minDate: new Date(),
      //绑定数据
      loadTime: "",
      startAddress: "",
      endAddress: "",
      Contacts: "",
      telphone: "",
      goodsName: "",
      actWeight: "",
      price: "",
      All_price: "",
      remark: "",
      radio: "1",
      flag: false,
      token: "",
      goodsOrderId: "",
      Item: "",
      goods: null,
      showStartAddress: false,
      showEndAddress: false,
      list: [],
      startCityAddress: "",
      endCityAddress: "",
      columns: [],
      startLonLat:'',
      endLonLat:''
    };
  },
  computed: {
    // 计算属性的 getter
    // All_price: function() {
    //   // `this` 指向 vm 实例
    //   return this.price * this.actWeight;
    // }
  },
  created() {
    // this.queryAddressList();
    this.token = localStorage.getItem("token");
    this.goodsOrderId = this.$route.query.id ? this.$route.query.id : "";
    this.ids = this.$route.query.ids ? this.$route.query.ids : "";
    console.log(this.goodsOrderId);
    if (this.goodsOrderId != "") {
      this.getMyselfGoods();
    }
  },
  mounted() {},
  methods: {
    ready() {
      this.loadTime = this.timeFormat(this.currentDate);
      this.showTime = false;
    },
    exit() {
      this.showTime = false;
    },

    //始发地
    confirmStart(value) {
      console.log(value);
      this.startCityAddress =
        value[1].lonAndLat.name + "-" + value[2].lonAndLat.name;
      this.startLonLat = value[2].lonAndLat.lon + ',' + value[2].lonAndLat.lat;
      this.value1 = value;
      this.startAddress =
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.showStartAddress = false;
    },
    cancelStart() {
      this.showStartAddress = false;
    },
    chooseStart(num) {
      if (num == 1) {
        this.showStartAddress = true;
      } else if (num == 2) {
        this.showEndAddress = true;
      }
    },

    //目的地
    confirmEnd(value) {
      this.value1 = value;
      // this.endCityAddress = 
      //  value[1].lonAndLat.name +
      //   "-" +
      //   value[2].lonAndLat.name;
      this.endLonLat = value[2].lonAndLat.lon + ',' + value[2].lonAndLat.lat;
      this.endAddress =
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.showEndAddress = false;
    },
    cancelEnd() {
      this.showEndAddress = false;
    },
    chooseTime() {
      this.showTime = !this.showTime;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    checked() {
      this.flag = !this.flag;
      if (this.flag) {
        this.radio = "1";
      } else {
        this.radio = "0";
      }
    },
    //要修改订单详情
    getMyselfGoods() {
      getCargoDetails(this.goodsOrderId, this.token).then(res => {
        console.log(res.data.data, 888);
        this.Item = res.data.data;
        this.startAddress =
          this.Item.startAddress;
        this.endAddress =
          this.Item.endAddress;
        this.startLonLat = this.Item.startLonLat;
        this.endLonLat = this.Item.endLonLat;
        this.loadTime = timeToLocaleString(this.Item.loadingStartTime);
        this.Contacts = this.Item.userName;
        this.goodsName = this.Item.goodsName;
        this.actWeight = this.Item.actualTotalWeight;
        this.telphone = this.Item.mobilePhone;
        this.price = this.Item.singlePrice;
        this.All_price = this.Item.totalPrice;
        this.remark = this.Item.remark;
        this.startAddressId = this.Item.startAddress;
        this.endAddressId = this.Item.endAddress;
      });
    },

    //更新货源
    updateGoodsOrder() {
      var that = this;
      var data = {
        startAddress: this.startAddress,
        endAddress: this.endAddress,
        userName:this.Contacts,
        mobilePhone:this.telphone,
        startLonLat: this.startLonLat,
        endLonLat:this.endLonLat,
        loadingStartTime: Date.parse(this.loadTime),
        loadingEndTime: "",
        goodsName: this.goodsName,
        actualTotalWeight: this.actWeight,
        singlePrice: this.price,
        totalPrice: this.All_price,
        remark: this.remark,
        goodsOrderId: this.goodsOrderId
      };
      console.log(data);
      updateGoods(data, this.token).then(res => {
        if (res.status == 200) {
          Toast.success("修改成功");
          setTimeout(() => {
            that.$router.push({path:"/myIssue"});
          }, 1000);
        }
      });
    },
    //发布货源
    release() {
      if (this.startAddress == "") {
        Notify({ type: "warning", message: "始发地不能为空" });
      } else if (this.endAddress == "") {
        Notify({ type: "warning", message: "目的地不能为空" });
      } else if (this.loadTime == "") {
        Notify({ type: "warning", message: "装载时间不能为空" });
      } else if (this.goodsName == "") {
        Notify({ type: "warning", message: "货物不能为空" });
      } else if (this.actWeight == "") {
        Notify({ type: "warning", message: "货物总重量不能为空" });
      } else if (this.price == "" && this.price < 0) {
        Notify({ type: "warning", message: "货物单价不能为空且不能小于零" });
      } else {
        let data = {
          startAddress: this.startAddress,
          endAddress: this.endAddress,
          userName:this.Contacts,
          mobilePhone:this.telphone,
          startLonLat: this.startLonLat,
          endLonLat:this.endLonLat,
          loadingStartTime: Date.parse(this.loadTime),
          loadingEndTime: "",
          goodsName: this.goodsName,
          actualTotalWeight: this.actWeight,
          singlePrice: this.price,
          totalPrice: this.All_price,
          remark: this.remark
        };
        if(this.flag){
          data.whetherCheck=1
        }
        //发布货订单
        releaseOrder(data, this.token).then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$router.push("/index/home");
          }
        });
      }
    },

    //查询货物地址列表
    queryAddressList() {
      var pageDTO = {
        pageNum: 1,
        pageSize: 30,
        user_id: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      };
      queryAddress(pageDTO, localStorage.getItem("token")).then(res => {
        this.list = res.data.data.list;
        for (var i = 0; i <= this.list.length; i++) {
          this.columns[i] =
            this.list[i].userName +
            "," +
            this.list[i].mobilePhone +
            "," +
            this.list[i].provinceName +
            "-" +
            this.list[i].cityName;
          // console.log("id", this.list[i].addressId)
        }
      });
    },
    // 选择船只
    onChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    // 选择始发地
    checkStartAddress(picker, value, index) {
      picker = picker.split(",");
      this.startAddress = picker[2];
      console.log(picker[2], 998);
      // console.log("id", this.list[value].addressId)
      this.startAddressId = this.list[value].addressId;
      console.log(this.startAddressId);
      this.showStartAddress = !this.showStartAddress;
    },
    // 选择目的地
    checkEndAddress(picker, value, index) {
      picker = picker.split(",");
      this.endAddress = picker[2];
      this.endAddressId = this.list[value].addressId;
      console.log(picker[2]);
      console.log(this.endAddressId);
      this.showEndAddress = !this.showEndAddress;
    },
    // chooseAddressOne(e) {
    //   console.log(e);
    //   this.startAddress = e.provinceName + "-" + e.cityName;
    //   this.showStartAddress = false;
    //   this.startAddressId = e.addressId;
    // },
    // chooseAddressTwo(e) {
    //   this.endAddress = e.provinceName + "-" + e.cityName;
    //   this.endAddressId = e.addressId;
    //   this.showEndAddress = false;
    // },
    //新增地址
    add_map() {
      this.$router.push("/recAddress");
    },
    // 合同服务提示
    serviceTip() {
      this.$toast({
        message:
          "保障双方在此次交易过程中合法权益,勾选后会在订单流程中,提供合同签订服务。",
        duration: 5000
      });
    }
  }
};
</script>

<style lang="less" scoped>
.releaseGoods {
  background: #f1f1f1;
  ul {
    padding: 0 0.3rem;
    background: #fff;
  }
  ul li {
    height: 0.86rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px #f1f1f1 solid;
    img {
      width: 0.14rem;
      height: 0.24rem;
    }
    p {
      width: 2.8rem;
      text-align: left;
      font-size: 0.3rem;
      color: #333333;
      height: 0.86rem;
      line-height: 0.86rem;
    }
    input {
      border: none;
      outline: none;
      text-align: right;
    }
    .rightText {
      text-align: right;
    }
  }
}
.releaseGoods ul {
  margin-bottom: 0.2rem;
}
.Remarks {
  background: #fff;
  margin-bottom: 0.2rem;
  padding: 0.3rem;
  h3 {
    text-align: left;
    font-size: 0.28rem;
    color: #333333;
  }
  #remark {
    resize: none;
    padding: 0.2rem;
    margin-top: 0.2rem;
    width: 7rem;
    min-height: 2rem;
    background: #f1f1f1;
    border: none;
    // height: auto;
  }
}
.contract {
  height: 0.88rem;
  background: #fff;
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
.contract {
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  p {
    margin: 0 0.2rem;
    font-size: 0.24rem;
    color: #666666;
  }
}
.address_list {
  background: #f1f1f1;
  margin-bottom: 0.5rem;
}
#addressList {
  height: 1.2rem !important;
  background: #fff;
  border-bottom: 1px #f1f1f1 solid;
  p {
    height: 0.5rem;
    line-height: 0.5rem;
  }
}
</style>
