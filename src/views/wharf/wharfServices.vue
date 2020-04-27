<template>
  <div class="wharfServices">
    <myheader></myheader>
    <form action="/">
      <van-search placeholder="输入感兴趣的码头名称" v-model="content" show-action>
        <div slot="action" @click="search">
          搜索
        </div>
      </van-search>
    </form>
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有数据了"
          :immediate-check="flag"
          :offset="offset"
          @load="onLoad"
        >
          <div class="list" v-for="(item,index) in list" :key="index">
            <van-row @click="details(item)" style="border-bottom: 1px solid #ebedf0bf;padding-bottom: 10px;">
              <van-col span="8">
                <img src="@/assets/image/mttx.png" width="100rem" height="73rem" />
              </van-col>
              <van-col span="15">
                <div style="text-align:left;">
                  <p>
                    {{item.companyName=='null'?'':item.companyName|ellipsis}}
                    
                    <van-col class="icon align_center">
                        <img
                          :src="gerenIcon"
                          alt
                        />
                      </van-col>
                      <van-col class="icon align_center" style="right:.9rem;">
                        <img
                          src="../../assets/image/service/qiyeIcon.png"
                          alt
                        />
                      </van-col>
                  </p>
                </div>
                <p class="van-multi-ellipsis--l2" style="text-align:left;color: gray;margin-top:.2rem;">{{item.lineOfBusiness}}</p>
              </van-col>
            </van-row>
            <van-row class="van-hairline--top" style="padding-top: 0.1rem;">
              <van-col span="2">
                <img src="../../assets/image/dingwei.png" style="width: 16px;" @click="toMap(item)" />
              </van-col>
              <van-col span="8" style="text-align: left;">
                <span class="van-ellipsis">地址：{{item.provinceCity||''}}</span>
              </van-col>
              <van-col span="2" offset="11" class="van-hairline--left">
                <img src="../../assets/image/dian hua.png" style="width: 23px;" @click="callPhone(item)" />
              </van-col>
            </van-row>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { queryPyShipPortByPage } from "@/api/index.js";
import { PullRefresh } from "vant";
import Vue from "vue";
Vue.use(PullRefresh);
export default {
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  },
  data() {
    return {
      value: 0,
      list: [],
      gerenIcon:require('@/assets/image/service/userIcon.png'),
      totalPage: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      offset: 10,
      flag: false,
      data: {
        pageNum: 1,
        pageSize: 10,
        params: {
          companyName: ""
        }
      },
      content: "",
      is: 1
    };
  },
  created() {
    this.getList(this.data);
  },
  methods: {
    search() {
      this.is = 0;
      if (this.is == 0) {
        this.data.params.companyName = this.content;
        console.log(this.data);
        queryPyShipPortByPage(this.data, localStorage.getItem("token")).then(
          res => {
            this.list = [];
            if (res.data.code == 200) {
              if (res.data.data.list.length > 0) {
                this.list = this.list.concat(res.data.data.list);
              } else {
                this.loading = false;
                this.finished = true;
              }
            }
          }
        );
      }
    },
    details(item) {
      this.$router.push({ path: "/details", query: { id: item.id } });
    },
    getList(data) {
      queryPyShipPortByPage(this.data, localStorage.getItem("token"))
        .then(res => {
          console.log(res);
          if (
            this.totalPage + 1 == this.data.pageNum &&
            this.data.pageNum != 1
          ) {
            this.finished = true;
            this.loading = false;
            return;
          } else {
            if (res.data.code == 200) {
              if (res.data.data.list.length >= 1) {
                this.list = this.list.concat(res.data.data.list);
              } else{
                this.loading = false;
                this.finished = true;
              }
            }
            if (res.data.data.total <= this.data.pageSize) {
              this.totalPage = 1;
            } else {
              this.totalPage = Math.ceil(
                res.data.data.total / this.data.pageSize
              );
            }
            this.isLoading = false;
          }
        })
        .catch(res => {
          this.loading = false;
          this.finished = true;
          return
        });
      this.loading = false; //控制上拉加载的加载动画
    },
    // 下拉加载
    onRefresh() {
      (this.data.pageNum = 1), (this.totalPage = 0);
      let self = this;
      setTimeout(() => {
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
      if(!item.linkPhone){return this.$toast('对方号码为空')}
      this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `联系:` + item.linkPhone
        })
        .then(() => {
          window.location.href = "tel://" + item.linkPhone;
        })
        .catch(() => {});
    },
    //定位地图
    toMap(item) {
      console.log(item.provinceCity);
      this.$router.push({
        path: "/wharfMap",
        query: { address: item.provinceCity }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.wharfServices {
  background: #eeeeee;
  height:100vh;
  .van-search--show-action{
    padding-right: 12px;
    position: relative;
  }
  .van-cell {
    display: flex;
    align-items: center;
  }
  .van-search__action{
    background: #0470DC;
    color: white;
    border-radius: 0 .05rem .05rem 0;
  }
  .list {
    padding: 0.4rem 0.2rem 0.6rem 0.2rem;
    margin: 0.1rem 0;
    background: #ffffff;
    position: relative;
    .van-button--warning {
      background-color: #ff9b39;
      border: 1px solid #ff9b39;
    }
    .van-button--normal {
      padding: 0 3px;
      margin: 4px;
    }
    .van-button {
      line-height: 0;
    }
    .van-hairline--left::after{
      border: none;
    }
  }
  .icon {
    // background:#0D97EF;
    width:.5rem;
    height:.5rem;
    border-radius:.1rem;
    display: flex;
    justify-content: center;
    position: absolute;
    right: .3rem;
    top:.3rem;
    img {
      height:.4rem;
      width:0.4rem;
      font-size: 0.2rem;
    }
  }
}
</style>