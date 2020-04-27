<template>
  <div class="Orders pageCommonStyle">
       <!-- <van-button class="Ordersbutton" @click="dianji" size="mini"  >{{flag == 'false'?"切换船主":"切换货主"}}</van-button> -->
    <!-- <myheader >
    </myheader> -->
    <div style="width:100%;height:1.28rem;background-color: #0470dc;position: relative;" >
          
          <!-- <div style="color: #ffffff; position: absolute;;
           bottom: 0.2rem;left:5%">
              <img src="@/assets/image/fanhui.png" alt="">
          </div> -->

          <div style="color: #ffffff; position: absolute;;
           bottom: 0.2rem;left:43%">
           我的订单
           </div>

         <div style="color: #ffffff; position: absolute;;
           bottom: 0.2rem;right: 0.2rem; " @click="addDatass" v-if="userType==8">
                
                {{this.flag == true?"船主":"货主"}}
         </div>
             
         </div>
    <div class="order" v-if="userType==3">
        <van-row style="height:100%;">
            <van-tabs v-model="activeName" animated @click="onClick" title-active-color="#0B6EFF" color="#0B6EFF">
                <van-tab v-for="(item,index) in navContent" :name="index+1" :title="item.title" :key="index+1">
                    <van-row class="main">
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                          <van-list
                            v-model="loading"
                            :finished="finished"
                            :immediate-check='flag'
                            finished-text="没有数据了"
                            :offset="offset"
                            @load="onLoad"
                            class="list"
                            >
                            <van-row v-for="(item,index) in orderList" :key="index" class="orderList" @click="orderDetails(item)">
                                <van-row class="align_center" style="color: darkgray;">
                                    <van-col span="">订单编号:</van-col>
                                    <van-col>{{item.shipOrderDTO.shipOrderNumber}}</van-col>
                                </van-row>
                                <van-row style="color:#0B6EFF;font-size: 16px;font-weight: 600;">
                                    <van-col span="8" class="float_l">{{item.goodsOrderDTO.startAddress}}</van-col>
                                    <van-col span="8"><img src="@/assets/image/arrow.png" /></van-col>
                                    <van-col span="8" class="float_r">{{item.goodsOrderDTO.endAddress}}</van-col>
                                </van-row>
                                <van-row class="float_c">
                                    <van-col span="12" class="float_l">运载重量：{{item.shipOrderDTO.shipInfoDTO.maxRequiredWeight}}吨</van-col>
                                    <van-col span="12" class="float_r" style="color: darkgray;">最后更新：{{item.goodsOrderDTO.modifyTime|formatTime}}</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="12" class="float_l">装货日期：{{item.goodsOrderDTO.createTime|formatTime}}</van-col>
                                    <van-col span="12" class="float_r">
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==8">待运货</van-tag></van-col>
                                      <!-- <van-col><van-tag mark type="success" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==8">交易中</van-tag></van-col> -->
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==6&&item.goodsOrderDTO.deliveryStatus==3">交易中</van-tag></van-col>
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==6&&item.goodsOrderDTO.deliveryStatus==9">交易中</van-tag></van-col>
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==1">待运货</van-tag></van-col>
                                      <!-- <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==1">交易中</van-tag></van-col> -->
                                      <van-col><van-tag mark v-if="item.goodsOrderDTO.orderStatus==7">取消单</van-tag></van-col>
                                      <van-col><van-tag v-if="item.goodsOrderDTO.orderStatus==8&&item.goodsOrderDTO.deliveryStatus==5" mark type="success">已完成</van-tag></van-col>
                                      <!-- if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==3&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
                              this.orderStatus=2
                          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==9&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
                              this.orderStatus=3
                          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==5&&this.shipOrderInfo.goodsOrderDTO.orderStatus==8){
                              this.orderStatus=4
                          }else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==8&&this.shipOrderInfo.goodsOrderDTO.orderStatus==3){
                              this.orderStatus=1
                          } -->
                                    </van-col>
                                </van-row>
                            </van-row>
                          </van-list>
                      </van-pull-refresh>
                    </van-row>
                </van-tab>
            </van-tabs>
        </van-row>
    </div>

    <div class="order" v-if="userType==8 && flag == false" >

       <!-- <div class="Ordersbutton">
                     12333333
       </div> -->

        
      
        <van-row style="height:100%;">
         
            <van-tabs v-model="activeName" animated @click="onClick" title-active-color="#0B6EFF" color="#0B6EFF">
                <van-tab v-for="(item,index) in navContent" :name="index+1" :title="item.title" :key="index+1">
                    <van-row class="main">
                       <!-- <van-button class="Ordersbutton" @click="dianji" size="mini"  >{{flag == 'false'?"切换船主":"切换货主"}}</van-button> -->
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                          <van-list
                            v-model="loading"
                            :finished="finished"
                            :immediate-check='flag'
                            finished-text="没有数据了"
                            :offset="offset"
                            @load="onLoad"
                            class="list"
                            >
                            <van-row v-for="(item,index) in orderList" :key="index" class="orderList" @click="orderDetails(item)">
                                <van-row class="align_center" style="color: darkgray;">
                                    <van-col span="">订单编号:</van-col>
                                    <van-col>{{item.shipOrderDTO.shipOrderNumber}}</van-col>
                                </van-row>
                                <van-row style="color:#0B6EFF;font-size: 16px;font-weight: 600;">
                                    <van-col span="8" class="float_l">{{item.startAddress}}</van-col>
                                    <van-col span="8"><img src="@/assets/image/arrow.png" /></van-col>
                                    <van-col span="8" class="float_r">{{item.endAddress}}</van-col>
                                </van-row>
                                <van-row class="float_c">
                                    <van-col span="12" class="float_l">运载重量：{{item.shipOrderDTO.shipInfoDTO.maxRequiredWeight}}吨</van-col>
                                    <van-col span="12" class="float_r" style="color: darkgray;">最后更新：{{item.goodsOrderDTO.modifyTime|formatTime}}</van-col>
                                </van-row>
                                <van-row>
                                    <van-col span="12" class="float_l">装货日期：{{item.goodsOrderDTO.createTime|formatTime}}</van-col>
                                    <van-col span="12" class="float_r">
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==8">待运货</van-tag></van-col>
                                      <!-- <van-col><van-tag mark type="success" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==8">交易中</van-tag></van-col> -->
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==6&&item.goodsOrderDTO.deliveryStatus==3">交易中</van-tag></van-col>
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==6&&item.goodsOrderDTO.deliveryStatus==9">交易中</van-tag></van-col>
                                      <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==1">待运货</van-tag></van-col>
                                      <!-- <van-col><van-tag mark type="primary" v-if="item.goodsOrderDTO.orderStatus==3&&item.goodsOrderDTO.deliveryStatus==1">交易中</van-tag></van-col> -->
                                      <van-col><van-tag mark v-if="item.goodsOrderDTO.orderStatus==7">取消单</van-tag></van-col>
                                      <van-col><van-tag v-if="item.goodsOrderDTO.orderStatus==8&&item.goodsOrderDTO.deliveryStatus==5" mark type="success">已完成</van-tag></van-col>
                                      <!-- if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==3&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
                              this.orderStatus=2
                          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==9&&this.shipOrderInfo.goodsOrderDTO.orderStatus==6){
                              this.orderStatus=3
                          } else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==5&&this.shipOrderInfo.goodsOrderDTO.orderStatus==8){
                              this.orderStatus=4
                          }else if(this.shipOrderInfo.goodsOrderDTO.deliveryStatus==8&&this.shipOrderInfo.goodsOrderDTO.orderStatus==3){
                              this.orderStatus=1
                          } -->
                                    </van-col>
                                </van-row>
                            </van-row>
                          </van-list>
                      </van-pull-refresh>
                    </van-row>
                </van-tab>
            </van-tabs>
        </van-row>
    </div>

<div class="goodsOrder" v-if="userType == 8 && flag==true">   
      <van-row>
        
        <van-tabs
          v-model="activeName"
          animated
          @click="onClick"
          title-active-color="#0B6EFF"
          color="#0B6EFF"
        >
          <van-tab
            v-for="(item, index) in navContent"
            :name="index + 1"
            :title="item.title"
            :key="index + 1"
          >
            <van-row class="main">
              <!-- <van-button  style="background-color: #0470dc; color: #ffffff; " @click="dianji" size="mini">{{flag == 'false'?"切换货主":"切换船主"}}</van-button> -->
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有数据了"
                  :offset="offset"
                  @load="onLoad"
                  class="list"
                  >
                  <van-row
                    v-for="(item, index) in orderList"
                    :key="index"
                    class="orderList"
                    @click="orderDetails(item)"
                    style="margin-bottom:.2rem"
                  >
                    <van-row class="align_center" style="color: darkgray;">
                      <van-col span="">订单编号:</van-col>
                      <van-col>{{
                        item.goodsOrderDTO.goodsOrderNumber
                      }}</van-col>
                    </van-row>
                    <van-row style="color:#0B6EFF;font-size: 16px;font-weight: 600;">
                      <van-col span="8" class="float_l"
                        >{{
                          item.goodsOrderDTO.startAddress}}</van-col
                      >
                      <van-col
                        span="8"
                      >
                        <img src="@/assets/image/arrow.png" />
                      </van-col>
                      <van-col span="8" class="float_r">
                        {{
                          item.goodsOrderDTO.endAddress}}
                      </van-col>
                    </van-row>
                    <van-row class="float_c">
                      <van-col span="12" class="float_l">
                        货物重量：{{item.goodsOrderDTO.actualTotalWeight}}吨以下
                      </van-col>
                      <van-col span="12" class="float_r" style="color: darkgray;">
                        最后更新：{{item.goodsOrderDTO.modifyTime | formatTime}}
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="12" class="float_l">
                        装货日期：{{item.goodsOrderDTO.loadingStartTime | formatTime}}</van-col>
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          type="primary"
                          v-if="item.goodsOrderDTO.orderStatus == 3"
                          >待运货</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          v-if="item.goodsOrderDTO.orderStatus == 7"
                          >取消单</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          type="primary"
                          v-if="item.goodsOrderDTO.orderStatus == 6"
                          >交易中</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          round
                          v-if="
                            item.goodsOrderDTO.orderStatus == 8 &&
                              item.goodsOrderDTO.deliveryStatus == 5
                          "
                          mark
                          type="success"
                          >已完成</van-tag
                        ></van-col
                      >
                    </van-row>
                  </van-row>
                </van-list>
              </van-pull-refresh>
            </van-row>
          </van-tab>
        </van-tabs>
      </van-row>
    </div>
<!-- --------------------------------------------------- -->
    <!-- 货主订单 -->
    <div class="goodsOrder" v-if="userType == 2">
      <van-row>
        <van-tabs
          v-model="activeName"
          animated
          @click="onClick"
          title-active-color="#0B6EFF"
          color="#0B6EFF"
        >
          <van-tab
            v-for="(item, index) in navContent"
            :name="index + 1"
            :title="item.title"
            :key="index + 1"
          >
            <van-row class="main">
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有数据了"
                  :offset="offset"
                  @load="onLoad"
                  class="list"
                  >
                  <van-row
                    v-for="(item, index) in orderList"
                    :key="index"
                    class="orderList"
                    @click="orderDetails(item)"
                    style="margin-bottom:.2rem"
                  >
                    <van-row class="align_center" style="color: darkgray;">
                      <van-col span="">订单编号:</van-col>
                      <van-col>{{
                        item.goodsOrderDTO.goodsOrderNumber
                      }}</van-col>
                    </van-row>
                    <van-row style="color:#0B6EFF;font-size: 16px;font-weight: 600;">
                      <van-col span="8" class="float_l"
                        >{{
                          item.goodsOrderDTO.startAddress}}</van-col
                      >
                      <van-col
                        span="8"
                      >
                        <img src="@/assets/image/arrow.png" />
                      </van-col>
                      <van-col span="8" class="float_r">
                        {{
                          item.goodsOrderDTO.endAddress}}
                      </van-col>
                    </van-row>
                    <van-row class="float_c">
                      <van-col span="12" class="float_l">
                        货物重量：{{item.goodsOrderDTO.actualTotalWeight}}吨以下
                      </van-col>
                      <van-col span="12" class="float_r" style="color: darkgray;">
                        最后更新：{{item.goodsOrderDTO.modifyTime | formatTime}}
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="12" class="float_l">
                        装货日期：{{item.goodsOrderDTO.loadingStartTime | formatTime}}</van-col>
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          type="primary"
                          v-if="item.goodsOrderDTO.orderStatus == 3"
                          >待运货</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          v-if="item.goodsOrderDTO.orderStatus == 7"
                          >取消单</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          mark
                          type="primary"
                          v-if="item.goodsOrderDTO.orderStatus == 6"
                          >交易中</van-tag
                        ></van-col
                      >
                      <van-col span="12" class="float_r"
                        ><van-tag
                          round
                          v-if="
                            item.goodsOrderDTO.orderStatus == 8 &&
                              item.goodsOrderDTO.deliveryStatus == 5
                          "
                          mark
                          type="success"
                          >已完成</van-tag
                        ></van-col
                      >
                    </van-row>
                  </van-row>
                </van-list>
              </van-pull-refresh>
            </van-row>
          </van-tab>
        </van-tabs>
      </van-row>
    </div>
    <div class="loginTip" v-if="!userType">
      <van-button type="info" round style="width:80%" @click="goLogin">请登录后查看</van-button>
    </div>
  </div>
</template>

<script>
import { getOrderList, getGoodsList } from "@/api/index";
import Vue from "vue";
import { PullRefresh, List, Dialog } from "vant";
Vue.use(PullRefresh).use(List);
export default {
  data() {
    return {
      sum :false,
      flag:false,
      activeName: 1,
      navContent: [
        {
          title: "全部"
        },
        {
          title: "交易中"
        },
        {
          title: "已完成"
        },
        {
          title: "取消单"
        }
      ],
      offset: 100,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      orderList: [],
      pageData: {
        pageNum: 1,
        pageSize: 10,
        params: {
          userId: JSON.parse(localStorage.getItem("userLoginInfo"))?JSON.parse(localStorage.getItem("userLoginInfo")).user_id:''
        }
      },
      totalPage: 0,
      userType: JSON.parse(localStorage.getItem("userLoginInfo"))?JSON.parse(localStorage.getItem("userLoginInfo")).userType:'',
    };
  },
  created() {
    if (this.userType == 3 ) {
      this.getOrderList(this.pageData, 0, 0);
    } else if (this.userType == 2) {
      this.getOrderList(this.pageData, 0, 0);
    }else if(this.userType == 8){
      this.getOrderList(this.pageData, 0, 0);
    }
  },
  methods: {

    addDatass(){
      this.flag = !this.flag
    },

    onClick(name, title) {
      this.totalPage = 0;
      this.pageData.pageNum=1;
      this.orderList = [];
       if (name == 1) {
          return this.getOrderList(this.pageData, 0, 0);
        } else if (name == 2) {
          return this.getOrderList(this.pageData, 2, 0);
        } else if (name == 3) {
          return this.getOrderList(this.pageData, 3, 0);
        } else if (name == 4) {
          return this.getOrderList(this.pageData, 5, 0);
        }
    },
    // 获取船主订单列表
    getOrderList(data, orderStatus, afterServiceStatus, token) {
      if (this.totalPage == this.pageData.pageNum) {
        return (this.loading = false), (this.finished = true);
      }
      if (
        this.totalPage + 1 == this.pageData.pageNum &&
        this.pageData.pageNum != 1
      ) {
        this.finished = true;
        this.loading = false;
        return;
      } else {
        if (this.userType == 3) {
          getOrderList(
            data,
            orderStatus,
            afterServiceStatus,
            localStorage.getItem("token")
          )
            .then(res => {
              if (res.data.code == 200) {
                if (res.data.data.list.length > 0) {
                  this.orderList = this.orderList.concat(res.data.data.list);
                } else {
                  this.loading = true;
                  setTimeout(()=>{
                    this.finished = true
                  },1000)
                }
                if (res.data.data.total <= this.pageData.pageSize) {
                  this.totalPage = 1;
                } else {
                  this.totalPage = Math.ceil(
                    res.data.data.total / this.pageData.pageSize
                  );
                }
                this.getOrderNum();
              } else {
                this.finished = true;
              }
            })
            .catch(data => {
              this.loading = false;
              this.finished = true;
              return;
            });
          //this.loading = false; //控制上拉加载的加载动画
        } else if (this.userType == 2) {
          getGoodsList(
            data,
            orderStatus,
            afterServiceStatus,
            localStorage.getItem("token")
          )
            .then(res => {
              console.log(res);
              console.log("totalPage", this.totalPage);
              if (res.data.code == 200) {
                if (res.data.data.list.length > 0) {
                  this.orderList = this.orderList.concat(res.data.data.list);
                  console.log(this.orderList, 111);
                }
                if (res.data.data.total <= this.pageData.pageSize) {
                  this.totalPage = 1;
                } else {
                  this.totalPage = Math.ceil(
                    res.data.data.total / this.pageData.pageSize
                  );
                }
              }
            })
            .catch(data => {
              this.loading = false;
              this.finished = true;
              return;
            });
        
        }else if(this.userType == 8) {

          if(this.flag == false){
           getOrderList(
            data,
            orderStatus,
            afterServiceStatus,
            localStorage.getItem("token")
          )
            .then(res => {
              if (res.data.code == 200) {
                if (res.data.data.list.length > 0) {
                  this.orderList = this.orderList.concat(res.data.data.list);
                }
                if (res.data.data.total <= this.pageData.pageSize) {
                  this.totalPage = 1;
                } else {
                  this.totalPage = Math.ceil(
                    res.data.data.total / this.pageData.pageSize
                  );
                }
              }
            })
            .catch(data => {
              this.loading = false;
              this.finished = true;
              return;
            });
          this.loading = false; //控制上拉加载的加载动画
        } else{
          getGoodsList(
            data,
            orderStatus,
            afterServiceStatus,
            localStorage.getItem("token")
          )
            .then(res => {
              if (res.data.code == 200) {
                if (res.data.data.list.length > 0) {
                  this.orderList = this.orderList.concat(res.data.data.list);
                }
                if (res.data.data.total <= this.pageData.pageSize) {
                  this.totalPage = 1;
                } else {
                  this.totalPage = Math.ceil(
                    res.data.data.total / this.pageData.pageSize
                  );
                }
              } else {
                this.finished = true;
              }
            })
            .catch(data => {
              this.loading = false;
              this.finished = true;
              return;
            });
        }
        this.loading = false; //控制上拉加载的加载动画
      }
      };
      this.isLoading = false;
    },
    // 获取订单状态数量
    getOrderNum(){
      console.log(this.orderList);
      let orderNum = this.orderList.filters(item=>{
        item
      });
      this.$commit('orderNum',orderNum);
    },
    // 下拉加载
    onRefresh() {
      if(!this.userType){return };
      let self = this;
      this.orderList = [];
      setTimeout(() => {
        self.totalPage = 0;
        self.pageData.pageNum = 1;
        if (self.activeName == 1) {
          return self.getOrderList(self.pageData, 0, 0);
        } else if (self.activeName == 2) {
          return self.getOrderList(self.pageData, 2, 0);
        } else if (self.activeName == 3) {
          return self.getOrderList(self.pageData, 3, 0);
        } else if (self.activeName == 4) {
          return self.getOrderList(self.pageData, 5, 0);
        };
      }, 500);
    },
    // 上拉加载
    onLoad() {
      // 异步更新数据
      console.log("加载");
      if(!this.userType){return};
      if (this.pageData.pageNum == 1) {
        this.pageData.pageNum = 1;
      } else {
        this.pageData.pageNum++;
      }
      this.loading = true;
      let self = this;
      //   this.loading = false;
      setTimeout(() => {
        self.finished = false;
        self.isLoading = false;
        if (self.activeName == 1) {
          return self.getOrderList(self.pageData, 0, 0);
        } else if (self.activeName == 2) {
          return self.getOrderList(self.pageData, 2, 0);
        } else if (self.activeName == 3) {
          return self.getOrderList(self.pageData, 3, 0);
        } else if (self.activeName == 4) {
         return self.getOrderList(self.pageData, 5, 0);
        }
        self.getOrderList(self.pageData, 0, 0);
        if (self.pageData.pageNum == 1) {
          self.pageData.pageNum++;
        }
      }, 500);
    },
    // 查看详情
    orderDetails(item) {
      if (this.userType == 3 || this.userType == 8) {
        this.$router.push({
          path: "/orderDetails",
          query: {
            shipOrderId: item.shipOrderId,
            jumpStatus: "order",
            item: item
          }
        });
      };
      if(this.userType == 8 && this.flag == true){
            if (item.goodsOrderDTO.orderStatus == 3 || item.goodsOrderDTO.orderStatus == 6 || item.goodsOrderDTO.orderStatus == 8) {
          
          this.$router.push({
            path: "/waitShipment",
            query: { orderId: item.goodsOrderId }
          });
        } else if (item.goodsOrderDTO.orderStatus == 7) {
          this.$router.push({
            path: "/cancelGoods",
            query: { goodsId: item.goodsOrderId }
          });
        }
      } else if (this.userType == 2) {
        if (item.goodsOrderDTO.orderStatus == 3 || item.goodsOrderDTO.orderStatus == 6 || item.goodsOrderDTO.orderStatus == 8) {
          
          this.$router.push({
            path: "/waitShipment",
            query: { orderId: item.goodsOrderId }
          });
        } else if (item.goodsOrderDTO.orderStatus == 7) {
          this.$router.push({
            path: "/cancelGoods",
            query: { goodsId: item.goodsOrderId }
          });
        }
      }
    },
    goLogin(){
      this.$router.push({path:'/login',query:{}})
    },

    dianji(){
      this.flag = !this.flag
      console.log(this.flag);
    }
  }
};
</script>

<style lang="less" scoped>
.Orders {
  // background: #f1f1f1;
  // position: relative;
  height:100vh;
  overflow:hidden;
  // padding: 0 0.3rem;
  .loginTip {
    // position: relative;
    top: 45%;
  }
  .van-list{
    padding: .2rem .3rem;
    line-height: .4rem;
  }
}
.van-pull-refresh {
  background: #f5f5f5;
}
.order,.goodsOrder {
  height: 86vh;
  background: #fff;
  .main {
    overflow: scroll;
    height: 89vh;
    padding-bottom:.2rem;
    .van-pull-refresh {
      height: 92%;
      overflow: auto;
    }
  }
  .orderList {
    background: #fff;
    padding: 0.1rem 0.2rem;
    margin-bottom: .1rem;
    .van-row {
      padding: 0.1rem;
      
    }
  }

}
</style>
