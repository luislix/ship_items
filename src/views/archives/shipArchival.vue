<template>
  <div id="shipArchival">
    <myheader></myheader>
    <van-dropdown-menu>
      <van-dropdown-item @change="updown" v-model="value1" :options="option1">
        <template slot="title" style="padding-right: 0.3rem;">
          <span>{{option1[value1].text}}</span>
          <img class="custome-title" src="../../assets/image/xialajiantou.png" />
        </template>
      </van-dropdown-item>
      <!-- <van-dropdown-item v-model="value2" :options="option2" @change="updown">
        <template slot="title"  style="padding-right: 0.3rem;">
          <span>{{option2[value2].text}}</span>
          <img class="custome-title" src="../../assets/image/xialajiantou.png" />
        </template>
      </van-dropdown-item> -->
      <van-dropdown-item v-model="value3" @change="updown" :options="option3">
        <template slot="title" style="padding-right: 0.3rem;">
          <span>{{ option3[value3].text }}</span>
          <img class="custome-title" src="../../assets/image/xialajiantou.png" />
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有数据了"
        :immediate-check="flag"
        :offset="offset"
        @load="onLoad"
      >
        <div class="list" v-for="(item,index) in list" :key="index" @click.stop="btnEdit(item)">
          <van-cell
            :title="item.shipNumber"
            :value="item.shipT"
            style="color:#333333; font-size:0.32rem;font-weight:500;"
            size="large"
          />
          <van-cell style="height:1.3rem;">
            <template slot="title">
              <van-row>
                <van-col span="3">
                  <van-col><span class="custom-title textClolor_lightGray">航线：</span></van-col>
                  <van-col><span>{{item.shipType}}</span></van-col>
                </van-col>
                <van-col span="5">
                  <van-col><span>{{item.shipLine}}</span></van-col>
                  <van-col><span style="padding-left:.1rem;">{{item.sealingWarehouse}}</span></van-col>
                </van-col>
                <van-col span="2" offset="14">
                  <img style="width:.5rem;" src="@/assets/image/dianhua@2x.png" @click.stop="callPhone(item)" />
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { queryPyShipInfoByPage } from "@/api/index.js";
import { PullRefresh } from "vant";
import Vue from "vue";
Vue.use(PullRefresh);
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "船舶吨位", value: 0 },
        { text: "1000吨以下", value: 1 },
        { text: "1000-3000吨", value: 2 },
        { text: "3000-5000吨", value: 3 },
        { text: "5000-7000吨", value: 4 },
        { text: "7000吨以上", value: 5 }
      ],
      option2: [
        { text: "船舶类型", value: 0 },
        { text: "散货船", value: 1 },
        // { text: "运沙船", value: "2" },
        { text: "平板船", value: 2 },
        { text: "其他船", value: 3 }
      ],
      option3: [
        { text: "封仓形式", value: 1 },
        { text: "无封仓", value: 1 },
        { text: "棚架封仓", value: 2 },
        { text: "雨布封仓", value: 3 },
        { text: "简易封仓", value: 0 }
      ],
      list: [],
      shipList: [],
      totalPage: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      offset: 10,
      flag: false,
      is: 1,
      data: {
        pageNum: 1,
        pageSize: 10,
        params: {
          shipT: "",
          shipType: "",
          sealingWarehouse: ""
        }
      }
    };
  },
  created() {
    console.log("value1" + this.value1);
    console.log(this.option1);
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    this.getList();
  },
  methods: {
    updown() {
      console.log(this.value3);
      this.is = 0;
      if (this.is == 0) {
        this.data.params.shipT = this.value1;
        this.data.params.shipType = this.value2;
        this.data.params.sealingWarehouse = this.value3;
      }
      queryPyShipInfoByPage(this.data, localStorage.getItem("token")).then(
        res => {
          this.list = [];
          if (res.data.code == 200) {
            if (res.data.data.list.length > 0) {
              this.list = this.list.concat(res.data.data.list);
            }
          }
        }
      );
      console.log(this.data);
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    btnEdit(item) {
      this.$router.push({
        path: "/archivalInformation",
        query: { id: item.id }
      });
    },
    getList() {
      queryPyShipInfoByPage(this.data, localStorage.getItem("token"))
        .then(res => {
          console.log("船只档案" + res);
          if (
            this.totalPage + 1 == this.data.pageNum &&
            this.data.pageNum != 1
          ) {
            console.log("大于总页数");
            this.finished = true;
            this.loading = false;
            return;
          } else {
            if (res.data.code == 200) {
              if (res.data.data.list.length > 0) {
                this.list = this.list.concat(res.data.data.list);
              }
            }
            if (res.data.data.total <= this.data.pageSize) {
              this.totalPage = 1;
            } else {
              this.totalPage = Math.ceil(
                res.data.data.total / this.data.pageSize
              );
            }
            console.log(this.totalPage);
            this.isLoading = false;
          }
          console.log(this.list);
        })
        .catch(res => {
          this.loading = false;
          this.finished = true;
          return;
        });

      this.loading = false; //控制上拉加载的加载动画
    },
    // 下拉加载
    onRefresh() {
      (this.data.pageNum = 1), (this.totalPage = 0);
      let self = this;
      setTimeout(() => {
        console.log(self.data);
        self.list = [];
        self.getList(this.data); //加载数据
      }, 500);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      if (this.data.pageNum == 1) {
        this.data.pageNum = 1;
      } else {
        this.data.pageNum++;
      }
      this.loading = true;
      let self = this;
      setTimeout(() => {
        self.finished = false;
        self.isLoading = false;
        self.getList(self.data);
        if (self.data.pageNum == 1) {
          this.data.pageNum++;
        }
      }, 500);
    },
    //打电话
    callPhone(item) {
      console.log("callPhone");
      this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `联系:` + item.linkmanPhone
        })
        .then(() => {
          window.location.href = "tel://" + item.linkmanPhone;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less">
#shipArchival {
  background: #eeeeee;
  .van-dropdown-menu__title::after {
    display: none;
  }
  .van-dropdown-menu__title img {
    position: absolute;
    top: 40%;
    left: 95%;
  }
  .van-dropdown-menu__title{
    padding-right: 0.3rem;
    color: #666;
  }
  .van-dropdown-menu__item--disabled  {
    color: #666;
  }
  .list {
    margin: 0.1rem 0;
    background: #ffffff;
    .van-cell--large .van-cell__title {
      text-align: left;
    }
    .van-cell__value--alone {
      text-align: right;
      color:black;
    }
    .van-cell {
      color: #666;
    }
  }
}
</style>