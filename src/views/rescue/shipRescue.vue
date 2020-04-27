<template>
  <div class="shipRescue">
    <myheader></myheader>
    <div class="city">
      <van-col span="4" v-for="(item,index) in city" :key="index">
        <van-button type="info" @click="searchCity(item)" v-model="tag">{{item}}</van-button>
      </van-col>
    </div>
    <div v-if="ship.length>0" class="list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有数据了"
          :immediate-check="flag"
          :offset="offset"
          @load="onLoad"
        >
          <div class="content" v-for="(items,index) in ship" :key="index">
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template slot="title">
                <span class="custom-title">所属单位:</span>
                <span style="font-weight:600;">{{items.department}}</span>
              </template>
            </van-cell>
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template slot="title">
                <span class="custom-title">管辖水域范围(干线起止里程)：</span>
                <span style="font-weight:600;text-align: left;">{{items.precinct}}</span>
              </template>
            </van-cell>
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template slot="title">
                <span class="custom-title">地址：</span>
                <span style="font-weight:600;">{{items.address}}</span>
              </template>
            </van-cell>
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template slot="title">
                <span class="custom-title">应急电话：</span>
                <span style="color:#6DC938;" @click="$tools.callPhone(items.aidCall)">{{items.aidCall}}</span>
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { queryRiverRescueByPage, getRecommendHotAddress } from "@/api/index.js";
import { PullRefresh } from "vant";
import Vue from "vue";
Vue.use(PullRefresh);
export default {
  data() {
    return {
      tag: 0,
      ship: [],
      totalPage: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      offset: 10,
      flag: false,
      city: [],
      data: {
        pageNum: 1,
        pageSize: 10,
        sidx: "create_time",
        sord: "desc",
        params: { cityZh: "" }
      }
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    this.getShip();
    this.getCity();
  },
  methods: {
    searchCity(item) {
      console.log(item);
      this.tag = 1;
      if (this.tag == 1) {
        this.data.params.cityZh = item;
        console.log(this.data);
        queryRiverRescueByPage(this.data, localStorage.getItem("token")).then(
          res => {
            this.ship = [];
            if (res.data.code == 200) {
              if (res.data.data.list.length > 0) {
                this.ship = this.ship.concat(res.data.data.list);
              }
            }
          }
        );
      }
    },
    getShip() {
      queryRiverRescueByPage(this.data, localStorage.getItem("token"))
        .then(res => {
          console.log("船舶救援");
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
                this.ship = this.ship.concat(res.data.data.list);
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
          console.log(this.ship);
        })
        .catch(res => {
          this.loading = false;
          this.finished = true;
          return;
        });
      this.loading = false; //控制上拉加载的加载动画
    },
    getCity() {
      getRecommendHotAddress(0, 0, 3, localStorage.getItem("token")).then(
        res => {
          console.log(res)
          for (let i = 0; i < 18; i++) {
            var obj = {};
            obj = res.data.data[i].name;
            this.city.push(obj);
          }
          console.log(this.city);
          console.log(res);
        }
      );
    },
    // 下拉加载
    onRefresh() {
      console.log(111);
      (this.data.pageNum = 1), (this.totalPage = 0);
      let self = this;
      setTimeout(() => {
        console.log(self.data);
        self.list = [];
        self.getShip(this.data); //加载数据
      }, 500);
    },
    // 上拉加载
    onLoad(item) {
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
        self.getShip(self.data);
        if (self.data.pageNum == 1) {
          this.data.pageNum++;
        }
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.shipRescue {
  background: #eeeeee;
  .city {
    height: 2.5rem;
    background: #ffffff;
    margin-bottom: 0.1rem;
    .van-button--info {
      background: #f5f5f5;
      color: black;
      border: 1px solid #f5f5f5;
    }
    .van-button {
      width: 0.9rem;
      height: 0.4rem;
      line-height: 0;
    }
    .van-button--normal {
      margin: 0.2rem;
      padding: 0px;
      font-size: 0.255rem;
    }
  }
  .list {
    .content {
      background: #ffffff;
      margin-bottom: 0.1rem;
      .van-cell {
        font-size: 14px;
      }
      .van-cell:not(:last-child)::after{
        right: 14px;
      }
      span {
        float: left;
      }
    }
  }
}
</style>