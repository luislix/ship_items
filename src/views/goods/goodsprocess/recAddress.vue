<template>
  <div class="recAddress">
    <myheader></myheader>
    <ul>
      <li>
        <p>联系人</p>
        <input type="text" v-model="userName" placeholder="请输入联系人" />
      </li>
      <li>
        <p>手机号</p>
        <input type="text" v-model="mobilePhone" placeholder="请输入手机号" />
      </li>
      <li>
        <p>座机(选填)</p>
        <input type="text" v-model="telphone" placeholder="请输入座机号" />
      </li>
      <li>
        <p>选择始发地址</p>
        <div @click="chooseStart">
          <input
            v-model="startAddress"
            type="text"
            placeholder="请选择始发地址"
          />
          <img src="@/assets/image/jiantou2.png" alt="" />
        </div>
      </li>
    </ul>

    <div
      style="background:#fff;width:100%;position: absolute;bottom: 0;padding: 10px 0;"
    >
      <button class="add" @click="save" type="button">确认地址</button>
    </div>

    <van-popup position="bottom" v-model="show">
      <van-area
        :area-list="areaList"
        @confirm="confirmStart"
        @cancel="cancelStart"
        value="110101"
      />
    </van-popup>
  </div>
</template>

<script>
import { address } from "@/mixin/address";
import { Address } from "@/api/index";
import { Dialog } from "vant";
import { Toast } from "vant";
import { Notify } from "vant";
export default {
  name: "recAddress",
  mixins: [address],
  data() {
    return {
      startAddress: "",
      show: false,
      userName: "",
      telphone: "",
      mobilePhone: "",
      value1: ""
    };
  },
  methods: {
    chooseStart() {
      this.show = true;
    },
    confirmStart(value) {
      console.log(value);
      this.value1 = value;
      this.startAddress =
        value[0].lonAndLat.name +
        "-" +
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.show = false;
    },
    cancelStart() {
      this.show = false;
    },
    save() {
      var that = this;
      let data = {
        userName: this.userName || "",
        mobilePhone: this.mobilePhone || "",
        telephone: this.telephone || "",
        provinceName: this.value1[0].lonAndLat.name,
        cityName: this.value1[1].lonAndLat.name || "",
        longitude: this.value1[2].lonAndLat.lon || "",
        latitude: this.value1[2].lonAndLat.lat || "",
        addressDetails: this.addressDetails || ""
      };
      if (this.userName == "") {
        Notify({ type: "danger", message: "联系人不能为空" });
      } else if (this.mobilePhone == "") {
        Notify({ type: "danger", message: "手机号不能为空" });
      } else if (this.provinceName == "") {
        Notify({ type: "danger", message: "请选择地址" });
      } else {
        Address(data, localStorage.getItem("token")).then(res => {
          if (res.data.code == 200) {
            Toast.success("添加成功");
            setTimeout(() => {
              that.$router.push("/releaseGoods");
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.recAddress {
  height: 100%;
  background: #fff;
}
ul {
  padding: 0.3rem;
}
input {
  border: none;
  outline: none;
  text-align: right;
}
ul li {
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  height: 0.8rem;
  align-items: center;
  border-bottom: 1px #f1f1f1 solid;
}
img {
  width: 0.14rem;
  height: 0.24rem;
}
.add {
  width: 5rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.28rem;
  border: none;
  outline: none;
  background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
  color: #fff;
  border-radius: 0.1rem;
}
</style>
