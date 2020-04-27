<template>
  <div id="goodsSource">
    <van-row type="flex" ref="searchBar" class="searchBar" justify="space-between">
      <van-col @click="goback()" span="4">
        <van-row class="address">
          <img src="@/assets/image/fanhui.png" alt />
        </van-row>
      </van-col>
      <van-col span="16">
        <van-row class="searchBox">
        <van-field
            v-model="searchContent"
            placeholder="搜索订单 / 船只"
            left-icon="search"
        />
        </van-row>
      </van-col>
      <van-col span="4">
      </van-col>
    </van-row>
    <van-row>
        <van-col span="6">
            <van-button type="default" style="width: 100%;overflow:hidden;" @click="selectAddress = !selectAddress">
                <span style="padding-right: .1rem;fon-size:12px;">{{data.params.startAddress?data.params.startAddress.substr(0,3)+'..':'始发地'}}</span>
                <img v-if="!data.params.startAddress" class="custome-title" src="../../../assets/image/xialajiantou.png" />
                <van-icon v-else name="cross" @click.stop="initStartAddress(1)"/>
            </van-button>
        </van-col>
        <van-col span="6">
            <van-button type="default" style="width: 100%;" @click="endAddress = !endAddress">
                <span style="padding-right: .1rem;">{{data.params.endAddress?data.params.endAddress.substr(0,3)+'..':'目的地'}}</span>
                <img v-if="!data.params.endAddress" class="custome-title" src="../../../assets/image/xialajiantou.png" />
                <van-icon v-else name="cross" @click.stop="initStartAddress(2)"/>
            </van-button>
        </van-col>
        <van-col span="6">
            <van-button type="default" style="width: 100%;" @click="goodsweigth = !goodsweigth">
                <span style="padding-right: .1rem;">{{data.params.minWeight?data.params.maxWeight+'(吨)':'货量'}}</span>
                <img v-if="!data.params.minWeight" class="custome-title" src="../../../assets/image/xialajiantou.png" />
                <van-icon v-else name="cross" style="padding:.1rem;right:-.1rem;" @click.stop="initStartAddress(3)"/>
            </van-button>
        </van-col>
        <van-col span="6">
            <van-button type="default" style="width: 100%;" @click="showTime = !showTime">
                <span style="padding-right: .1rem;">{{data.params.centreTime?data.params.centreTime.substr(5,5):'日期'}}</span>
                <img v-if="!data.params.centreTime" class="custome-title" src="../../../assets/image/xialajiantou.png" />
                <van-icon v-else name="cross" @click.stop="initStartAddress(4)"/>
            </van-button>
        </van-col>
    </van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有数据了"
        :immediate-check="flag"
        :offset="offset"
        @load="onLoad"
        >
        <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
          <van-cell style="height: auto;">
            <template slot="title">
              <van-row>
                <img class="stick" v-if="item.orderStatus?true:false" src="@/assets/image/homeOrderStatus/stick.png" alt="">
                <van-col span="8" style="font-size: 16px;font-weight: 600;color: #000;">
                  <span>{{item.startAddress?item.startAddress.slice(0,3):item.location.slice(0,4)}}...</span>
                </van-col>
                <van-col span="6">
                  <img src="../../../assets/image/jianblue.png"/>
                </van-col>
                <van-col span="8" style="font-size: 16px;font-weight: 600;color: #000;">
                  <span>{{item.endAddress?item.endAddress.slice(0,3):item.placeOfArrival.slice(0,4)}}...</span>
                </van-col>
                 <!-- 合同 -->
                <van-col span="2" style="font-size: 16px;color: #000;text-align:center">
                   <img class="hetongIcon" :src="item.whetherCheck?hetongIcon:''"/>
                </van-col>

              </van-row>
              <van-row>
                <van-col span="10"  style="text-align: start;">
                  <span>重量(吨)：</span>
                  <span>{{item.actualTotalWeight?item.actualTotalWeight:item.tonnage}}</span>
                </van-col>
                <van-col span="14">
                  <span>装货日期：</span>
                  <span>{{item.endDate?item.createDate:item.loadingStartTime |formatTime}}</span>
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 时间选择器 -->
    <van-popup
        v-model="showTime"
        position="bottom"
        :style="{ height: '40%' }"
    >
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="confirmPicker"
            :min-date="minDate"
        />
    </van-popup>
    <!-- 始发地址选择 -->
    <van-popup
      v-model="selectAddress"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area
        :area-list="areaList"
        @confirm="pickerStartAddress"
        @cancel="selectAddress = !selectAddress"
      />
    </van-popup>
    <!-- 目的地址选择 -->
    <van-popup
      v-model="endAddress"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area
        :area-list="areaList"
        @confirm="pickerEndAddress"
        @cancel="selectAddress = !selectAddress"
      />
    </van-popup>
    <!-- 货量 -->
    <van-popup
      v-model="goodsweigth"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        title="最小值与最大值"
        :columns="columns"
        @cancel="OnCancel"
        @confirm="OnConfirm"
      >
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import { getgoodsSource } from "@/api/index.js";
import { Button } from 'vant';
import { PullRefresh } from "vant";
import { address } from "@/mixin/address";
import { Stepper } from 'vant';
import { Notify } from 'vant';
import { DatetimePicker } from 'vant';
import Vue from "vue";
Vue.use(PullRefresh);
const leftnum = [];
const rightnum = [];
export default {
  mixins: [address],
  data() {
    return {
      hetongIcon:require('../../../assets/image/homeOrderStatus/hetong08.png'),
      list: [],
      searchContent: "",
      showTime: false,
      selectAddress: false, //选择始发地址
      endAddress: false, //选择目的地址
      currentDate: new Date(), //选择时间
      goodsweigth: false, //货量
      columns: [{
        values:leftnum,
        className:'column1',
      },{
        values:rightnum,
        className:'column2',
      }],
      liang: false,
      minDate: new Date(),
      shipList: [],
      totalPage: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      offset: 10,
      flag: false,
      is: 1,
      orderStatus: 0,
      data: {
        pageNum: 1,
        pageSize: 10,
        lat: "31.23",
        lng: "121.47",
        params: {
          minWeight: "",
          maxWeight: "",
          startAddress: "",
          endAddress: "",
          centreTime: "",
          index:""
        }
      }
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    if(localStorage.getItem('position')){
      this.data.lat = JSON.parse(localStorage.getItem('position')).latitude;
      this.data.lng = JSON.parse(localStorage.getItem('position')).longitude;
    }
    this.getList();
    // this.updown();
    leftnum[0] = 1;
    rightnum[0] = 1;
    for(var i = 1;i<=100;i++){
      leftnum[i] = leftnum[i-1]+999;
      rightnum[i] = rightnum[i-1]+1000;
    }
  },
  mounted() {
    this.timestampToTime()
  },
  methods: {
    goback(){
      this.$router.go(-1);
    },
    updown() {
      this.selectAddress = !this.selectAddress;
      getgoodsSource(this.data,localStorage.getItem("token")).then(
        res => {
          this.list = [];
          if (res.data.code == 200) {
            if (res.data.data.list.length > 0) {
              this.list = this.list.concat(res.data.data.list);
            }
          }
        }
      );
      console.log('567' + this.list);
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
    timestampToTime(timestamp) {
      var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return Y + M + D
    },
    getList() {
      getgoodsSource(this.data, localStorage.getItem("token")).then(
            res => {
              if (res.data.code == 200) {
                  if(res.data.data.hasNextPage){
                    if(res.data.data.isLastPage){
                      this.data.params.index = res.data.data.pageNum+1;
                    }
                      res.data.data.list.forEach((element, index) => {
                        if (element.startTime) {
                          res.data.data.list[index].startTime = this.$tools.formatTime(element.startTime,'mm-dd');
                          
                        } else {
                          res.data.data.list[index].startDate = this.$tools.formatTime(element.startDate,'mm-dd');
                        }
                      });
                      this.list = this.list.concat(res.data.data.list);
                      if(res.data.data.isLastPage){
                        this.data.pageNum++;
                        getgoodsSource(this.data,localStorage.getItem("token")).then(res=>{
                          if(res.data.data.list.length==0){
                            return this.finished = true;
                          };
                          res.data.data.list.forEach((element, index) => {
                            if (element.startTime) {
                              res.data.data.list[index].startTime = this.$tools.formatTime(element.startTime,'mm-dd');
                              
                            } else {
                              res.data.data.list[index].startDate = this.$tools.formatTime(element.startDate,'mm-dd');
                            }
                          });
                          this.list = this.list.concat(
                            res.data.data.list
                          );
                        });
                      }
                  } else {
                    this.finished = true;
                    this.loading = false;
                  }
                }
                this.loading = false;
            }
          );
      this.loading = false; //控制上拉加载的加载动画
    },
    //跳转详情页
    toDetail(item){
      let id, whether, userId;
      console.log('item',item)
      if(!item.whether){
        id = item.goodsOrderId;
        whether = "true";
        userId = item.userId;
        console.log('item',userId)
        this.$router.push({
          path: "/cargoRecommendDetails",
          query: { id: id, whether: whether, userId: userId }
        });
      }else if(item.whether == "false"){
        id = item.id;
        whether = "false";
        userId = item.userId;
        console.log('item',item)
        this.$router.push({
          path: "/cargoRecommendDetails",
          query: { id: id, whether: whether, userId: userId}
        });
      }
    },
    // 下拉加载 
    onRefresh() {
      this.data = {
        pageNum: 1,
        pageSize: 10,
        params: {
          minWeight: "",
          maxWeight: "",
          startAddress: "",
          endAddress: "",
          centreTime: "",
          index:""
        }
      }
      this.list = [];
      let self = this;
      setTimeout(() => {
        self.isLoading = false;
        this.finished = false;
        self.getList(self.data); //加载数据
      }, 500);
    },
    // 上拉刷新
    onLoad() {
      // 异步更新数据
      var count = parseInt(this.total/10)+1
      setTimeout(() => {
        this.loading = false;
        this.finished = false;
        this.getList(this.data);
        this.data.pageNum++;
        if(this.data.pageNum >= count){
          this.finished = true;
        }
      }, 500);
    },
    //选择货量
    OnConfirm(value) {
      this.data.params.minWeight = value[0];
      this.data.params.maxWeight = value[1];
      if(this.data.params.minWeight > this.data.params.maxWeight){
        this.$toast('最小值不能大于最大值');
      }else{
        this.goodsweigth = false;
        this.list=[];
        this.data.pageNum = 1;
        this.data.params.index = '';
        this.getList();
        console.log(this.list);
      }
    },
    OnCancel() {
      this.goodsweigth = false;
    },
    // 初始化地址
    initStartAddress(flag){
      this.data.pageNum = 1;
      if(flag==1) {
        this.data.params.startAddress = '';
      } else if(flag == 2) {
        this.data.params.endAddress = '';
      } else if(flag == 3) {
        this.data.params.minWeight = '';
        this.data.params.maxWeight = '';
      } else if(flag == 4) {
        this.data.params.centreTime = '';
      }
    },
    // 选择时间
    confirmPicker(value) {
      this.value4 = +new Date(value);
      var m = value.getMonth() + 1;
      var d = value.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = value.getFullYear() + "-" + m + "-" + d;
      this.data.params.centreTime = timer + " " +"23:59:59";
      // console.log(this.data.params.value4);
      this.showTime = false;
      this.list=[];
      this.data.pageNum = 1;
      this.data.params.index = '';
      this.getList();
      console.log(this.list);
    },
    // 选择开始地址
    pickerStartAddress(value) {
      this.data.params.startAddress = value[1].name.slice(0,value[1].name.indexOf('市')>-1?value[1].name.indexOf('市'):value[1].name.length);
      this.selectAddress = false;
      this.list=[];
      this.data.pageNum = 1;
      this.data.params.index = '';
      this.getList();
    },
    // // 选择结束地址
    pickerEndAddress(value) {
      this.data.params.endAddress = value[1].name.slice(0,value[1].name.indexOf('市')>-1?value[1].name.indexOf('市'):value[1].name.length);
      this.endAddress = false;
      this.list=[];
      this.data.pageNum = 1;
      this.data.params.index = '';
      this.getList();
    },
  }
};
</script>
<style lang="less">
#app{
  background: #ebedf0;
}
#goodsSource {
  background: #eeeeee;
  .searchBar {
      height: 1.28rem;
      padding-top: 0.45rem;
      width: 100%;
      color: #fff;
      opacity: 1;
      z-index: 999;
      top: 0;
      background: #0470DC;
      .van-col {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .address {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 0 27px 0 12px;
          .van-icon:nth-child(3) {
            font-size: 0.4rem;
          }
        }
      }
      /deep/.searchBox .van-field {
        padding: 0.1rem 0.2rem;
        height: 0.6rem;
        border-radius: 0.4rem;
        color: #fff;
        background: rgba(255, 255, 255, 0.3) !important;
        display: flex;
        align-items: center;
        .van-cell__value {
          height: 0.5rem !important;
          .van-field__control {
            color:#fff!important;
          }
          input::-webkit-input-placeholder{
            color:#fff;
        }
        }
      }
      .searchBox .van-hairline--top-bottom {
        display: flex;
        justify-content: center;
        flex-direction: column;
        &::after {
          border: none;
        }
      }
      .map-icon {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: 0.5rem;
      }
    }
  .van-dropdown-menu__title::after {
    display: none;
  }
  .van-dropdown-menu__title img {
    position: absolute;
    top: 40%;
    left: 95%;
  }
  .van-button--default {
      border: 1px solid #fff;
      padding:none;
      .van-button__text {
        display:flex;
        align-items:center;
      }
      .van-icon {
        position:absolute;
        right:0rem;
        padding:.2rem;
      }
  }
  .van-dropdown-menu__item--disabled .van-dropdown-menu__title {
    color: #666;
  }
  .list {
    margin: 0.2rem 0.3rem;
    background: #ffffff;
    box-shadow: 2px 2px 5px rgba(4, 0, 0, 0.1);
    .van-cell--large .van-cell__title {
      text-align: left;
    }
    .van-cell__value--alone {
      text-align: right;
    }
    .van-cell {
      color: #666;
    }
  }
   .hetongIcon{
    position: absolute;
    top: 0.2rem;
    right: 0.15rem;
    width: 20px;
  }
   .stick {
      width: .6rem;
      height:.6rem;
      position:absolute;
      top:-.01rem;
      left:-.02rem;
    }
}
</style>