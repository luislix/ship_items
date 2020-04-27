<template>
  <div class="order">
    <van-nav-bar title="待处理" left-arrow @click-left="onClickLeft" class="color" />
    <van-panel class="panel">
      <van-row gutter="20" class="ordertitle">
        <van-col span="1" offset="1">
          <div class="border"></div>
        </van-col>
        <van-col span="14">订单编号:{{orderId}}</van-col>
      </van-row>
      <van-steps direction="vertical" class="step" :active="active">
        <van-step>
          <h3>待接货</h3>
          <p>11-07 10:30</p>
        </van-step>
        <van-step>
          <h3>运货待确认</h3>
          <p>11-07 15:56</p>
        </van-step>
        <van-step>
          <h3>运输中</h3>
          <p>11-08 07:34</p>
        </van-step>
        <van-step>
          <h3>卸货待确认</h3>
          <p></p>
        </van-step>
        <van-step>
          <h3>已完成</h3>
        </van-step>
      </van-steps>
    </van-panel>
    <van-panel class="ty-panel">
      <van-row gutter="20" class="ordertitle">
        <van-col span="1" offset="1">
          <div class="border"></div>
        </van-col>
        <van-col span="8">卸货待确认船只</van-col>
      </van-row>
      <van-row class="xq">
        <van-col span="5" offset="2">
          <p>托运船只 ：</p>
        </van-col>
        <van-col span="4">{{shipName}}</van-col>
        <p>
          详细情况
          <van-icon name="arrow" />
        </p>
      </van-row>
    </van-panel>
    <van-panel class="ms-pancel">
      <van-row gutter="20" class="ordertitle">
        <van-col span="1" offset="1">
          <div class="border"></div>
        </van-col>
        <van-col span="7">
          <p>我发布的信息</p>
        </van-col>
        <van-col span="1" offset="12">
          <van-icon name="arrow-down" />
        </van-col>
      </van-row>
      <div class="ms">
        <van-row gutter="20">
          <van-col span="5" offset="1">联系人：</van-col>
          <van-col span="3">{{msName}}</van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="5" offset="1">联系电话:</van-col>
          <van-col span="3">{{tel}}</van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="5" offset="1">详细地址:</van-col>
          <van-col span="10">
            <p>
              湖北省武汉市
              <br />洪山区光谷大道解放路
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
              湖南省岳阳市
              <br />江夏区巨龙大道民主路
            </p>
          </van-col>
          <van-col span="2" offset="5">
            <van-icon name="location-o" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="5">货物重量：</van-col>
          <van-col span="3">100吨</van-col>
          <van-col span="9" offset="2">货物总价（选填）:</van-col>
          <van-col span="4">10000元</van-col>
        </van-row>
        <van-row>
          <van-col span="5">托运物品：</van-col>
          <van-col span="3">沙子</van-col>
          <van-col span="9" offset="2">货物总运价（选填）：</van-col>
          <van-col span="4">100元</van-col>
        </van-row>
        <van-row>
          <van-col span="5">备注：</van-col>
          <van-col span="3">无</van-col>
        </van-row>
      </div>
    </van-panel>
    <van-panel class="btn-panel">
      <van-icon name="phone-o" />
      <router-link :to="{name:'orderComplete',query:{id:1}}">
        <van-button @click="clickbtnload" type="info">同意卸货</van-button>
      </router-link>
    </van-panel>
  </div>
</template>

<script>
// import { METHODS } from 'http'
import { getUserInfo} from '@/api/index'
export default {
  name: "unloadGoods",
  props: {
    active: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      orderId: "G201909081234880",
      shipName: "安达660",
      msName: "李阳",
      tel: "13557896523",
      token:''
    };
  },

  created() {
    this.token = localStorage.getItem("token");
    console.log(this.token,111111);
    this.getData();
  },
  methods: {
    clickbtnload: function() {
      
    },
    getData() {
      console.log(this.token,333);
      getUserInfo(4, this.token).then(res => {        
        console.log(res);
      });
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
  margin-top: 15px;
}
.van-nav-bar {
  background: #0470dc !important;
}
.ms-pancel {
  height: 235px;
  font-size: 13px;
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
  margin-top: 6px;
}
.ms p {
  text-align: left;
}
</style>             