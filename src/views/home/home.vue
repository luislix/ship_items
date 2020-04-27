<template>
  <div class="home" ref='homeHeight'
      @touchmove="touchmove">
    <van-row type="flex" ref="searchBar" class="searchBar" justify="space-between" style="position:fixed">
      <van-col span="8">
        <van-row class="address">
          <van-col span="12" @click="showCheckAddress=!showCheckAddress" class="leftTop" style="font-size:13px;text-align:end;">{{cityName}}</van-col>
          <van-col span="4" @click="showCheckAddress=!showCheckAddress" class="float_l"><img width="16" src="@/assets/image/xiala.png" /></van-col>
          <!-- <van-col span="8" style="font-size:12px;"><van-row>{{temperature}}&#8451;</van-row><van-row>{{weather}}</van-row></van-col> -->
          <van-col span="8" style="font-size:12px;text-align:start;">
            <van-col style="font-size:.7rem;" class="iconfont" :class="weather?weather.indexOf('晴')!=-1?'icon-qing':weather.indexOf('雨')!=-1?'icon-yutian':weather.indexOf('阴')!=-1||weather.indexOf('云')!=-1?'icon-yintian':weather.indexOf('雾')!=-1||weather.indexOf('霾')!=-1?'icon-wu':weather.indexOf('雪')!=-1?'icon-xiaoxue':'':'icon-yintian'"></van-col>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="13">
        <van-row class="searchBox">
          <van-field
            v-model="searchContent"
            placeholder="搜索订单"
            left-icon="search"
            @focus="toSearch"
          />
        </van-row>
      </van-col>
      <van-col span="3" class="map-icon"  @click="toMap">
        <img style="width:.4rem;position: absolute;right:.3rem;" src="@/assets/image/ditu-selection.png" alt />
      </van-col>
    </van-row>
      <van-row class="home-header">
        <van-row class="swipeAndNav" style="padding-top:1.54rem;height:auto;padding-bottom: 0.2rem;">
          <van-row class="swipe" style="margin-top:0px;">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) in swipeList" :key="index">
                <img :src="item.guideImageUrl" alt />
              </van-swipe-item>
            </van-swipe>
          </van-row>
          <!-- 游客导航 -->
          <van-row v-if="userType==1"> 
            <van-row type="flex" justify="space-between" class="main">
              <van-col span="4" style="margin-right: 10px;" v-for="(item, index) in navigator" :key="index" @click.stop="toIcon(item)">
                <van-row :class="`navigator-item `">
                  <van-row class="navItem"><van-image :src="item.src"></van-image></van-row>
                </van-row>
                <van-row style="font-size:12px;">{{ item.title }}</van-row>
              </van-col>
            </van-row>
          </van-row>
          <!-- 货主导航 -->
          <van-row v-else-if="userType==2">
            <van-row type="flex" justify="space-between" class="main">
              <van-col span="4" style="margin-right: 10px;" v-for="(item, index) in shipperNavigator" :key="index" @click.stop="toIcon(item)">
                <van-row :class="`navigator-item `">
                  <van-row class="navItem"><van-image :src="item.src"></van-image></van-row>
                </van-row>
                <van-row style="font-size:12px;">{{ item.title }}</van-row>
              </van-col>
            </van-row>
          </van-row>
          <!-- 船主导航 -->
          <van-row v-else-if="userType==3">
            <van-row type="flex" justify="space-between" class="main">
              <van-col span="4" style="margin-right: 10px;" v-for="(item, index) in shipownerNavigator" :key="index" @click.stop="toIcon(item)">
                <van-row :class="`navigator-item `">
                  <van-row class="navItem"><van-image :src="item.src"></van-image></van-row>
                </van-row>
                <van-row style="font-size:12px;">{{ item.title }}</van-row>
              </van-col>
            </van-row>
          </van-row>
          <!-- 企业导航 -->
          <van-row v-else-if="userType==8" @click="toIcon(item)">
            <van-row type="flex" justify="space-between" class="main">
              <van-col span="4" style="margin-right: 10px;" v-for="(item, index) in businessNavigator" :key="index" @click.stop="toIcon(item)">
                <van-row :class="`navigator-item `">
                  <van-row class="navItem"><van-image :src="item.src"></van-image></van-row>
                </van-row>
                <van-row style="font-size:12px;">{{ item.title }}</van-row>
              </van-col>
            </van-row>
          </van-row>
          <!-- 更多 -->
          <van-popup v-model="flag" position="right">
            <van-row @click="toIcon(item)">
              <van-row type="flex" justify="space-between" class="main" style="margin: 0.2rem;">
                <van-col span="12" style="" v-for="(item, index) in businessNavigatorMore" :key="index" @click="toIcon(item)">
                  <van-row :class="`navigator-item `">
                    <van-row class="navItem"><van-image :src="item.src"></van-image></van-row>
                  </van-row>
                  <van-row style="font-size:12px;">{{ item.title }}</van-row>
                </van-col>
              </van-row>
            </van-row>
          </van-popup>
        </van-row>
      </van-row>
      <van-row v-show="userType!=1" v-if="myIssueList&&myIssueList.length>0" class="issue" @click="showIssueList">
      <van-row class="issue-title align_center">
        <van-col span="12" class="myboder">
          <van-col style="color:#0070DD;" class="iconfont icon-shuxian" ></van-col>
          <van-col class="textSize_15">我的发布</van-col>
          <van-col style="padding-left:.1rem;">
            <van-tag round color="#A3D8FC" style="padding: .1em .9em;">{{myIssueIndex }}/{{ myIssueList&&myIssueList.length }}</van-tag>
          </van-col>
        </van-col>
        <van-col span="12" :class="showMyIssueInfo?'icon-down':'icon-fangxiangyou'" class="iconfont float_r"></van-col>
      </van-row>
      <van-row class="issue-content" v-if="showMyIssueInfo">
        <van-swipe class="myIssueSwipe" indicator-color="white"  @change="onChange">
          <van-swipe-item class="myIssueContent" v-for="(item, index) in myIssueList" :key="index">
            <van-row
              class="recommendOrder-item"
              :class="item.weather.indexOf('晴')!=-1?'sunshine_background':item.weather.indexOf('雨')!=-1?'rain_background':((item.weather.indexOf('阴')!=-1)||(item.weather.indexOf('云')!=-1))?'cloudy_background':item.weather.indexOf('雪')!=-1?'snowy_background':((item.weather.indexOf('霾')!=-1)||(item.weather.indexOf('雾')!=-1))?'greasy_background':'sunshine_background'"
              @click="lookMyIssueDetails(item,1)"
              >
              <van-col span="5" class="recommendOrder-weather">
                <van-row class="weather-content align_center">
                  <van-col span="12" style="font-size:28px;" class="iconfont" :class="item.weather.indexOf('晴')!=-1?'icon-qing':item.weather.indexOf('雨')!=-1?'icon-yutian':item.weather.indexOf('阴')!=-1||item.weather.indexOf('云')!=-1?'icon-yintian':item.weather.indexOf('雪')!=-1?'icon-daxue':((item.weather.indexOf('霾')!=-1)||(item.weather.indexOf('雾')!=-1))?'icon-wu':'icon-qing'">
                  </van-col>
                  <van-col span="12" class="weather-num">
                    <van-row>{{item.weather}}</van-row>
                  </van-col>
                </van-row>
                <van-row style="font-size:12px;">
                  <van-col v-if="userType == 3 || userType == 8">{{item.modifyTime|formatTime('mm-dd')}}装</van-col>
                  <van-col v-if="userType == 2 ">{{item.modifyTime|formatTime('mm-dd')}}装</van-col>
                </van-row>
              </van-col>
              <van-col span="19" class="recommendOrder-address">
                <van-row>
                  <van-col span="10" max-width="100" v-if="userType == 3  ">{{item.startAddress.substr(0,5)}}...</van-col>
                  <van-col span="10" max-width="100" v-if="userType == 2 || userType ==8">{{item.startAddress.substr(0,5)}}...</van-col>
                  <van-col span="4" class="float_c">
                    <img src="../../assets/image/jiantoubai.png" alt />
                  </van-col>
                  <van-col max-width="100" span="8" v-if="userType == 3" style="margin-left:0;">{{item.endAddress.substr(0,5)}}...</van-col>
                  <van-col max-width="100" span="10" v-if="userType==2 || userType ==8">{{item.endAddress.substr(0,5)}}...</van-col>
                </van-row>
                <van-row>
                  <van-col span="8" v-if="userType == 2" style="overflow: auto;margin-left:0;"> 货物:<span>{{item.goodsName? item.goodsName: ''}}</span></van-col>
                  <van-col span="12" v-if="userType == 2 || (userType == 8 && set==true)">重量:{{item.actualTotalWeight? item.actualTotalWeight: ''}}吨</van-col>
                  <van-col span="24" v-if="userType == 3|| (userType == 8 && set==false)"
                    style="margin-left:0;"
                    >载重:{{
                      item.shipInfoDTO
                        ? item.shipInfoDTO.maxRequiredWeight
                        : item.tonnage
                    }}吨</van-col
                  >
                  <van-col span="24" class="float_l" v-if="userType==1" style="font-size:12px;">
                    <van-col v-if="item.shipInfoDTO">运载重量：{{item.shipInfoDTO.maxRequiredWeight}}吨</van-col>
                    <van-col v-if="item.goodsName" span="24">
                      <van-col class="float_l" span="12">货物名称：{{item.goodsName}}</van-col>
                      <van-col span="12" class="float_r">货物重量：{{item.actualTotalWeight}}吨</van-col>
                    </van-col>
                    <van-col v-if="item.title" span="24">
                      <van-col span="12">货物名称：{{item.title}}</van-col>
                      <van-col span="12">货物重量：{{item.tonnage}}</van-col>
                    </van-col>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-swipe-item>
        </van-swipe>
      </van-row>
    </van-row>
    <van-row class="recommendOrder-title">
        <van-col span="16" class="myboder align_center">
          <van-col style="color:#0070DD;" class="iconfont icon-shuxian"></van-col>
          <van-col class="textSize_15" v-if="userType!=8">订单推荐</van-col>
          <van-col class="textSize_15" v-if="userType==8&&this.set == false">船源推荐</van-col>
          <van-col class="textSize_15" v-if="userType==8&&this.set == true">货源推荐</van-col>
          <!-- <van-col v-if="userType==8&&this.set == false" style="color: #6BB5FF;padding-left: 5px;">(船源)</van-col> -->
          <!-- <van-col v-else-if="userType==8&&this.set == true" style="color: #6BB5FF;padding-left: 5px;">(货源)</van-col> -->
        </van-col>
        
        <van-col span="8" @click="setting()" v-if="userType==8" style="text-align: right;padding-left: 1.2rem">
          <!-- <van-col><img style="width:.4rem;vertical-align:middle;margin-right:.1rem" src="../../assets/image/qiehuan.png" /></van-col> -->
          <van-col v-if="this.set == false" >
            <!-- <van-button style="height:100%"> -->
              <div size="mini" type="default" style="font-size: 0.26rem;border: 0px;line-height: 0.4rem" >
                <img style="width:.4rem;vertical-align:middle;margin-right:.1rem;height:0.4rem" src="../../assets/image/qiehuan08.png" />
                切换
              </div>
            <!-- </van-button> -->
          </van-col>
          <van-col v-else >
            <div size="mini" type="default" style="font-size: 0.26rem;border: 0px;line-height: 0.4rem" >
               <img style="width:.4rem;vertical-align:middle;margin-right:.1rem;height:0.4rem" src="../../assets/image/qiehuan08.png" />
                切换
            </div>
          </van-col>
        </van-col>
      </van-row>

    <van-row class="recommendOrder" ref="recommendOrder" id="list-content" @touchmove="touchmove">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="false">
        <van-list
          v-show="recommendOrderList&&recommendOrderList.length>0"
          v-model="loading"
          :finished="finished"
          finished-text="没有数据了"
          :immediate-check='flag'
          :offset="offset"
          @load="onLoad"
          class="list"
          ref="list"
          >
          <van-row
            class="recommendOrder-item"
            :class="item.weather?((item.weather.indexOf('霾')!=-1)||(item.weather.indexOf('雾')!=-1))?'greasy_background':item.weather.indexOf('雪')!=-1?'snowy_background':((item.weather.indexOf('阴')!=-1)||(item.weather.indexOf('云')!=-1))?'cloudy_background':item.weather.indexOf('晴')!=-1?'sunshine_background':item.weather.indexOf('雨')!=-1?'rain_background':'cloudy_background':'cloudy_background'"
            @click="toRecommend(item)"
            v-for="(item, index) in recommendOrderList"
            :key="index"
            >
             <!-- 顶置图标 -->
            <img class="stick" v-if="item.orderStatus?true:false" src="@/assets/image/homeOrderStatus/stick.png" alt="">
            <van-col span="6" class="recommendOrder-weather">
              <van-row class="weather-content align_center">
                <van-col span="12" v-if="item.weather" style="font-size:28px;" class="iconfont" :class="item.weather?((item.weather.indexOf('阴')!=-1)||(item.weather.indexOf('云')!=-1))?'icon-yintian':((item.weather.indexOf('霾')!=-1)||(item.weather.indexOf('雾')!=-1))?'icon-wu':item.weather.indexOf('晴')!=-1?'icon-qing':item.weather.indexOf('雨')!=-1?'icon-yutian':'icon-yintian':'icon-qing'">
                </van-col>
                <van-col span="8" class="weather-num float_l">
                  <van-row>{{item.weather&&item.weather.length>4?item.weather.slice(3,6):item.weather}}</van-row>
                </van-col>
              </van-row>
              <van-row style="font-size:10px;">
                <van-col  class="float_l" max-width="100" v-if="userType == 3 || userType == 8&&set == true">{{
                  item.loadingStartTime ? item.loadingStartTime : item.startDate
                }}装</van-col>
                <van-col class="float_l" max-width="100" v-if="userType == 2 || userType == 8&&set == false">{{
                  item.startTime ? item.startTime : item.startDate
                }}装</van-col>
                <van-col class="float_l" v-if="userType==1">{{item.modifyTime?item.modifyTime:item.createDate|formatTime('mm-dd')}}装</van-col>
              </van-row>
            </van-col>
            <van-col span="18" class="recommendOrder-address">
              <van-row>
                <van-col class="float_l addressStyle" max-width="50" span="5" v-if="userType == 3 || userType == 8&&set == true" >{{
                  item.startAddress && item.startAddress.length>3
                    ? item.startAddress.slice(0,2)
                    : item.location && item.location.length>3?item.location.slice(0,2):''
                }}...</van-col>
                <van-col class="float_l addressStyle" max-width="100" span="5" v-if="userType == 2 || userType == 8&&set == false">{{
                  item.startAddress && item.startAddress.length>3
                    ? item.startAddress.slice(0,2)
                    : item.location && item.location.length>3?item.location.slice(0,2):""
                }}...</van-col>
                <van-col class="float_l addressStyle" span="5" max-width="100" v-if="userType==1">{{item.startAddress && item.startAddress.length>3?item.startAddress.slice(0,2):item.location && item.location.length>3?item.location.slice(0,2):''}}...</van-col>
                <van-col class="float_l" span="4">
                  <img style="width:.8rem;" src="../../assets/image/jiantoubai.png" alt />
                </van-col>
                <van-col class="float_l addressStyle" span="10" max-width="100" v-if="userType == 3 || userType == 8&&set == true">{{
                  item.endAddress && item.endAddress.length>3
                    ? item.endAddress.slice(0,2)
                    : item.placeOfArrival && item.placeOfArrival.length>3?item.placeOfArrival.slice(0,2):""
                }}...</van-col>
                <van-col class="float_l addressStyle" span="10" max-width="100" v-if="userType==2 || userType == 8&&set == false">{{
                  item.endAddress && item.endAddress.length>3
                    ? item.endAddress.slice(0,2)
                    : item.placeOfArrival && item.placeOfArrival.length>3?item.placeOfArrival.slice(0,2):''
                }}...</van-col>
                <van-col class="addressStyle" span="9" max-width="100" v-if="userType==1">{{item.startAddress && item.startAddress.length>3?item.startAddress.slice(0,2):item.placeOfArrival?item.placeOfArrival.slice(0,4):''}}...</van-col>
              </van-row>
              <van-row style="margin-top:.1rem;font-size:14px;">
                <van-col span="11" class="float_l" max-width="100" v-if="userType == 3 || userType == 8&&set == true" style="overflow: hidden;">
                  货物:
                  {{
                    item.goodsName
                      ? item.goodsName
                      : item.title
                  }}</van-col
                >
                <van-col span="13" class="float_l" v-if="userType == 3 || userType == 8&&set == true"
                  >重量:{{
                    item.actualTotalWeight
                      ? item.actualTotalWeight
                      : item.tonnage
                  }}吨</van-col
                >
                <van-col style="margin-left:.6rem;" v-if="userType == 2 || userType == 8&&set == false"
                  >载重:{{
                    item.shipInfoDTO
                      ? item.shipInfoDTO.maxRequiredWeight
                      : item.tonnage
                  }}吨</van-col
                >
                <van-col span="24" class="float_l" v-if="userType==1" style="font-size:12px;">
                  <van-col v-if="item.shipInfoDTO">载重：{{item.shipInfoDTO.maxRequiredWeight}}吨</van-col>
                  <van-col v-if="item.goodsName" span="24">
                    <van-col class="float_l" span="12">货物：{{item.goodsName}}</van-col>
                    <van-col span="12" class="float_l">重量：{{item.actualTotalWeight}}吨</van-col>
                  </van-col>
                  <van-col v-if="item.title" span="24">
                    <van-col span="12">货物：{{item.title}}</van-col>
                    <van-col span="12">重量：{{item.tonnage}}</van-col>
                  </van-col>
                </van-col>
              </van-row>
            </van-col>
            <!-- <img class="qiyeIcon" :src="item.whetherCheck?qiyeIcon:''" /> -->
            <img class="hetongIcon" :src="item.whetherCheck?hetongIcon:''"/>
          </van-row>
        </van-list>
      </van-pull-refresh>
      <van-row style="height:50vh;" v-show="recommendOrderList&&recommendOrderList.length==0"><van-loading style="margin-top:1rem;" type="spinner" size="80" color="#1989fa" /></van-row>
    </van-row>
    <!-- 当前地址 -->
    <van-popup
        v-model="showCheckAddress"
        position="bottom"
        :style="{ height: '40%' }"
        >
        <van-area 
            @cancel="showCheckAddress=false"
            @confirm="checkAddress"
            :area-list="areaList" />
    </van-popup>
  </div>
</template>
<script>
import {
  recommendedOrder,
  getshipSource,
  getSwipe,
  getMyIssue,
  getgoodsSource,
  shipRecommendedOrder
} from "@/api/index";
import Vue from "vue";
import { PullRefresh, List, Dialog } from "vant";
import {address} from '@/mixin/address';
Vue.use(PullRefresh).use(List);
export default {
  mixins:[address],
  name:'home',
  data() {
    return {
      qiyeIcon:require('../../assets/image/homeOrderStatus/qiyeIcon.png'),
      hetongIcon:require('../../assets/image/homeOrderStatus/hetongIcon.png'),
      myIssueIndex:1,
      showCheckAddress:false,
      showMyIssueInfo:false,
      searchContent: "",
      recommendOrderList: [],
      totalPage: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      offset: 100,
      showMyIssue: 1,
      myIssue: 2,
      myIssueList: [], //我的发布列表
      swipeList: [],
      userType: 1,
      navigator: [
        {
          src: require('../../assets/image/船源.png'),
          title: "船源"
        },
        {
          src: require('../../assets/image/货源.png'),
          title: "货源"
        },
        {
          src: require('../../assets/image/码头.png'),
          title: "码头"
        },
        {
          src: require('../../assets/image/档案.png'),
          title: "档案"
        },
        {
          src: require('../../assets/image/更多.png'),
          title: "更多"
        }
      ],
      shipperNavigator:[
        {
          src: require('../../assets/image/船源.png'),
          title: "船源"
        },
        {
          src: require('../../assets/image/码头.png'),
          title: "码头"
        },
        {
          src: require('../../assets/image/档案.png'),
          title: "档案"
        },
        {
          src: require('../../assets/image/专线.png'),
          title: "专线"
        },
        {
          src: require('../../assets/image/急速.png'),
          title: "急速"
        }
      ],
      shipownerNavigator:[
        {
          src: require('../../assets/image/货源.png'),
          title: "货源"
        },
        {
          src: require('../../assets/image/码头.png'),
          title: "码头"
        },
        {
          src: require('../../assets/image/档案.png'),
          title: "档案"
        },
        {
          src: require('../../assets/image/救援.png'),
          title: "救援"
        },
        {
          src: require('../../assets/image/专线.png'),
          title: "专线"
        }
      ],
      businessNavigator:[
        {
          src: require('../../assets/image/船源.png'),
          title: "船源"
        },
        {
          src: require('../../assets/image/货源.png'),
          title: "货源"
        },
        {
          src: require('../../assets/image/码头.png'),
          title: "码头"
        },
        {
          src: require('../../assets/image/档案.png'),
          title: "档案"
        },
        {
          src: require('../../assets/image/更多.png'),
          title: "更多"
        }
      ],
      businessNavigatorMore:[
        {
          src: require('../../assets/image/救援.png'),
          title: "救援"
        },
        {
          src: require('../../assets/image/专线.png'),
          title: "专线"
        }
      ],
      checkAddressStatus:false,
      show: true,
      flag:false,
      set: false,
      cityName:'',
      data: {
        pageNum: 1,
        pageSize: 8,
        lat: 31.23,
        lng:  121.47,
        params:{
          userId:'',
          index:''
        }
      },
      weather:'',
      temperature:'',
      userLoginInfo:''
    }
  },
  created() {
    let that = this;
    if(localStorage.getItem('position')){
      this.data.lat = JSON.parse(localStorage.getItem('position')).latitude;
      this.data.lng = JSON.parse(localStorage.getItem('position')).longitude;
    }
    document.addEventListener("deviceready",function(){
      if(device.platform == "Android"){
        var permissions = cordova.plugins.permissions;
        // 文件存储
        permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function(s) {
            if (!s.hasPermission) {
                permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function(s) {
                    if (s.hasPermission) {
                        //调用保存图片的方法
                        console.log('读取文件权限读取成功')
                    }else {
                      console.log('权限名称',s)
                        getPermission()
                    }
                }, function(error) {
                    console.log(error);
                });
            } else {
                //调用保存图片的方法
            }
        }, function(error) {
            console.log(error);
        });
        // 地址
        permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, locationSuccessCallback, locationErrorCallback);
        function locationSuccessCallback() {
            permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, locationSuccess, locationError);
        }
        function locationErrorCallback() {};
        function locationError() {};
        function locationSuccess(status) {
          if (status) {
            // 获取地址-Android
              navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
              // 获取地址
              function geolocationSuccess(position) {
                console.log(position)
                  let address = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                  };
                  console.log('address', address)
                  localStorage.setItem('position', JSON.stringify(address));
                  that.getCurrentLocation();
              }

              function geolocationError(error) {
                getPermission()
              }
          }
          if (!status.hasPermission) error();
        }
      } else {
        // window.cordova.plugins.IOSPermission.checkPhotoPermission(success => {
        //     console.log('iossuccess')
        // }, failed => {
        //   console.log('ioserror')
        // })

        // IOSPermission.checkCameraPermission(success => {
        //    console.log('iossuccess1')
        // }, failed => {
        //     console.log('ioserror1')
        // })
      }
     },false);
      function getPermission(){
        if(device.platform == "Android"){
          if (window.cordova && window.cordova.plugins.settings) {
          that.$dialog.alert({
              title: '权限申请',
              message: '由于获取不了定位、读取文件权限，无法正常使用嘟嘟船讯，建议进行授权。'
            }).then(() => {
                window.cordova.plugins.settings.open("application_details", function() {},function () {}
              );
            });
          } else {}
        } else {
          that.$dialog.alert({
              title: 'ios权限申请',
              message: '由于获取不了定位、读取文件权限，无法正常使用嘟嘟船讯，建议进行授权。'
            }).then(() => {
                window.cordova.plugins.settings.open("application_details", function() {},function () {}
              );
            });
        }
    };

    window.localStorage.removeItem('BMap_map_w1hy0b');

    if (localStorage.getItem("userLoginInfo")) {
      this.userType = JSON.parse(localStorage.getItem("userLoginInfo")).userType || "";
      this.userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
      this.data.params.userId = this.userLoginInfo.user_id;
      // 获取我的发布
      this.getMyIssue();
    };
    this.getRecommendedOrder(this.data);
    // 获取轮播图
    this.getSwipe();
  },
  updated() {
      if(!localStorage.getItem('position')){
        let that = this;
        document.addEventListener("deviceready",function(){
          if(device.platform == "Android"){
            var permissions = cordova.plugins.permissions;
          // 地址权限
          permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, locationSuccessCallback, locationErrorCallback);
          function locationSuccessCallback() {
              permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, locationSuccess, locationError);
          };
          function locationErrorCallback() {};
          function locationError() {};
          function locationSuccess(status) {
              if (status) {
                // 获取地址-Android
                  navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
                  // 获取地址
                  function geolocationSuccess(position) {
                      let address = {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude
                      };
                      localStorage.setItem('position', JSON.stringify(address));
                      that.getCurrentLocation();
                  }
                  function geolocationError(error) {
                    // navigator.app.exitApp();
                    if (window.cordova && window.cordova.plugins.settings) {
                      that.$dialog.alert({
                        title: '权限申请',
                        message: '由于获取不了定位、读取文件权限，无法正常使用嘟嘟船讯，建议进行授权。'
                      }).then(() => {
                        window.cordova.plugins.settings.open("application_details", function() {
                            },
                            function () {
                            }
                        );
                      });
                    } else {}
                  }
              }
              if (!status.hasPermission) error();
            }
          } else {

          }
        },false);
      } else {
        if(!this.checkAddressStatus){
          this.getCurrentLocation();
        }
      }
    },
  watch: {
    cityName(val){
      console.log('cityName',val)
      let cityName = val;
      let that = this;
      AMap.plugin('AMap.Weather', function() {
          var weather = new AMap.Weather();
          //查询实时天气信息
          weather.getLive(that.cityName, function(err, data) {
            console.log('城市天气',data)
            if(!err){that.weather=data.weather;that.temperature=data.temperature;}
          });
          //未来4天天气预报
          weather.getForecast(that.cityName, function(err, data) {
            console.log('未来天气',data)
              if (err) { return; }
          });
      });
    }
  },
  mounted() {
    this.getWeater();
  },
  updated(){
    let winHeight = document.documentElement.clientHeight; //视口大小
    this.$refs.homeHeight.style.height=(winHeight+160)+'px';
  },
  methods: {
    getCurrentLocation(){
      async function getAddress(){
        return await new Promise((resolve,reject)=>{
          console.log('地图')
            document.addEventListener("deviceready", function() {
              navigator.geolocation.getCurrentPosition(geolocationSuccess);
            }, false);
            function geolocationSuccess(position) {
              console.log('hoemPosition',position);
              resolve(position)
            }
        })
      }
      getAddress().then(result=>{
        console.log('当前地址',result)
          if (result) {
          let localPosition = result.coords;
          this.data.lat = localPosition.latitude;
          this.data.lng = localPosition.longitude;
          console.log(localPosition)
          let address = {
            latitude: localPosition.latitude,
            longitude: localPosition.longitude
          };
          console.log('address',address)
          localStorage.setItem('position',JSON.stringify(address));
          // 创建地理编码实例      
          var myGeo = new BMap.Geocoder();      
          // 根据坐标得到地址描述   
          let that = this; 
          setTimeout(() => {
            myGeo.getLocation(new BMap.Point(localPosition.longitude, localPosition.latitude), function(res){      
              if (res){   
              console.log('百度地图',res)
              that.cityName = res.addressComponents.city;
              }      
          });
          }, 10);
        }
      });
    },
    // 获取天气
    getWeater(val=this.cityName){
      let that = this;
      let localPosition = JSON.parse(localStorage.getItem('position'))||{latitude: 31.23,longitude: 121.47};
      // 创建地理编码实例      
      var myGeo = new BMap.Geocoder();      
      // 根据坐标得到地址描述
      myGeo.getLocation(new BMap.Point(localPosition.longitude, localPosition.latitude), function(res){      
        if (res){   
        console.log('百度地图',res)
        that.cityName = res.addressComponents.city;
        }      
      });
      console.log('11111',that.cityName)
      AMap.plugin('AMap.Weather', function() {
          var weather = new AMap.Weather();
          //查询实时天气信息, 查询的城市到行政级别的城市
          weather.getLive(that.cityName, function(err, data) {
            console.log('城市天气',data)
            if(!err){that.weather=data.weather;that.temperature=data.temperature;}
          });
          //未来4天天气预报
          weather.getForecast(that.cityName, function(err, data) {
            console.log('未来天气',data)
              if (err) { return};
          });
      });
    },
    touchmove(el){
      let winHeight = document.documentElement.clientHeight; //视口大小
        if(el.target.offsetParent.offsetParent.scrollTop>=155||el.target.offsetParent.offsetParent.offsetParent.scrollTop>=155||el.target.offsetParent.scrollTop>=155){
          this.$refs.searchBar.$el.style.background='#0470dc';
          if(winHeight>=812){
            this.$refs.recommendOrder.$el.style.height=this.myIssueList.length==0?73+'vh':69+'vh';
          } else{
            this.$refs.recommendOrder.$el.style.height=this.myIssueList.length==0?67+'vh':62+'vh';
          }
        } else{
          this.$refs.searchBar.$el.style.background='';
          this.$refs.recommendOrder.$el.style.height='';
        };
    },
    // 企业首页订单推荐切换
    setting(){
      this.set = !this.set;
      this.finished = false;
      this.data.pageNum = 1;
      this.recommendOrderList =[];
      this.data.params.index = '';
      this.getRecommendedOrder();
      this.getMyIssue();
    },
    // 获取推荐订单列表
    getRecommendedOrder(data) {
      if (this.userLoginInfo) {
        if (this.userLoginInfo.userType == 3 || this.userLoginInfo.userType == 8&&this.set == true) {
          getgoodsSource(this.data, localStorage.getItem("token")).then(res => {
                console.log("info", res);
                if (res.data.code == 200) {
                  if(res.data.data.hasNextPage){
                    if(res.data.data.isLastPage){
                      this.data.params.index = res.data.data.pageNum+1;
                    }
                    // if (res.data.data.list.length > 0) {
                      res.data.data.list.forEach((item, index) => {
                        if (item.loadingStartTime) {
                          res.data.data.list[
                            index
                          ].loadingStartTime = this.$tools.formatTime(
                            item.loadingStartTime,'mm-dd'
                          );
                        } else {
                          res.data.data.list[
                            index
                          ].startDate = this.$tools.formatTime(
                            item.startDate,'mm-dd'
                          );
                        }
                      });
                      this.recommendOrderList = this.recommendOrderList.concat(res.data.data.list);
                      if(res.data.data.isLastPage){
                        this.data.pageNum++;
                        getgoodsSource(this.data,localStorage.getItem("token")).then(res=>{
                          res.data.data.list.forEach((item, index) => {
                          if (item.loadingStartTime) {
                            res.data.data.list[
                              index
                            ].loadingStartTime = this.$tools.formatTime(
                              item.loadingStartTime,'mm-dd'
                            );
                          } else {
                            res.data.data.list[
                              index
                            ].startDate = this.$tools.formatTime(
                              item.startDate,'mm-dd'
                            );
                          }
                        });
                        this.recommendOrderList = this.recommendOrderList.concat(
                          res.data.data.list
                        );
                        });
                      }
                  } else {
                    this.finished = true;
                    this.loading = false;
                  }
                  console.log("货源", this.recommendOrderList);
                }
                this.loading = false;
              }).catch(res => {
                this.loading = false;
                this.finished = true;
                return;
              });
        } else if (this.userLoginInfo.userType == 2 || this.set == false)
         {
          getshipSource(this.data, localStorage.getItem("token")).then(
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
                    this.recommendOrderList = this.recommendOrderList.concat(res.data.data.list);
                    if(res.data.data.isLastPage){
                      this.data.pageNum++;
                      getshipSource(this.data,localStorage.getItem("token")).then(res=>{
                        res.data.data.list.forEach((element, index) => {
                          if (element.startTime) {
                            res.data.data.list[index].startTime = this.$tools.formatTime(element.startTime,'mm-dd');
                            
                          } else {
                            res.data.data.list[index].startDate = this.$tools.formatTime(element.startDate,'mm-dd');
                          }
                        });
                      this.recommendOrderList = this.recommendOrderList.concat(
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
        }
      } else {
        if (this.totalPage + 1 == this.data.pageNum && this.data.pageNum != 1) {
          this.finished = true;
          this.loading = false;
          return;
        } else {
          recommendedOrder(data).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.isLoading = false;
              if (res.data.data.list.length > 0) {
                this.recommendOrderList = this.recommendOrderList.concat(
                  res.data.data.list
                );
                if (res.data.data.total <= this.data.pageSize) {
                  this.totalPage = 1;
                } else {
                  this.totalPage = Math.ceil(
                    res.data.data.total / this.data.pageSize
                  );
                }
              }
            }
          });
          this.loading = false; //控制上拉加载的加载动画
        }
      };
      this.isLoading = false; //控制下拉刷新的加载动画
    },
    // 获取轮播图
    getSwipe() {
      getSwipe().then(res => {
        if (res.data.code == 200) {
          this.swipeList = res.data.data;
        }
      });
    },
    // 获取我的发布
    getMyIssue() {
      if (this.userLoginInfo) {
        let data = {
          pageNum: 1,
          pageSize: 30,
          params: {
            userId: this.userLoginInfo.user_id,
            index:''
          }
        };
        if(this.userLoginInfo.userType==3){
          getMyIssue(data, localStorage.getItem("token")).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.myIssueList = res.data.data.list;
            }
          });
        } else if(this.userLoginInfo.userType==2){
          shipRecommendedOrder(data,localStorage.getItem('token')).then(res=>{
            console.log('recommend',res)
            if (res.data.code == 200) {
              this.myIssueList = res.data.data.list;
            }
          })
        } else if(this.userLoginInfo.userType==8){
          if(this.set){
            shipRecommendedOrder(data,localStorage.getItem('token')).then(res=>{
              console.log('recommend',res)
              if (res.data.code == 200) {
                this.myIssueList = res.data.data.list;
              }
            })
          } else {
            getMyIssue(data, localStorage.getItem("token")).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.myIssueList = res.data.data.list;
              }
            });
          }
        }
        data='';
      }
    },
    //点击显示我的发布列表
    showIssueList() {
      if (this.myIssueList.length == 0) {
        this.$dialog.confirm({
          title: "嘟嘟船讯提醒您!",
          message: "您暂无发布信息，点击确定前往发布。"
        }).then(() => {
            if (
              this.userLoginInfo.userType == 3
            ) {
              this.$router.push({ path: "/issueShip", query: {} });
            } else if(this.userLoginInfo.userType == 2){
              this.$router.push({path: "/releaseGoods", query: {}})
            }
          })
          .catch(() => {
          });
      } else {
        this.showMyIssueInfo=!this.showMyIssueInfo;
        let lonAndLat = this.myIssueList[0].startLonLat.split(',');
        // if(this.userLoginInfo.userType == 3){
        //   this.data.lng = lonAndLat[0];
        //   this.data.lat = lonAndLat[1];
        // } else if(this.userLoginInfo.userType == 2) {
        //   this.data.lng = lonAndLat[0];
        //   this.data.lng = lonAndLat[1];
        // } else {
        //   this.data.lng = lonAndLat[0];
        //   this.data.lat = lonAndLat[1];
        // };
        this.data.lng = lonAndLat[0];
        this.data.lat = lonAndLat[1];
        if(this.showMyIssueInfo){
          this.data.params.index = '';
          this.data.pageNum = 1;
          this.getRecommendedOrder(this.data);
        }
      }
    },
    // 前往地图页面
    toMap() {
      console.log("map");
      this.$router.push({ path: "/map", query: {} });
    },
    //前往搜索页面
    toSearch() {
      this.$router.push("/searchOrder");
    },
    // 点击前往推荐订单详情
    toRecommend(item,flag) {
      if(this.userLoginInfo){
        if(!this.userLoginInfo.user_certificate_status){
          return this.$dialog.confirm({
            title: '嘟嘟船讯提醒您！',
            message: '您的个人身份未认证！未保证订单可靠性，请前往认证。'
          }).then(() => {
            this.$router.push({path:"/Authentication",query:{jumpStatus:0}})
          }).catch(() => {
          });
        }
      }
      let id, whether, userId;
      if(this.userType == 8 && this.set == false){
          console.log("爬虫船只条互赞详情");
              this.$router.push({
          path: "/shipDetail",
          query: { id: item.id, whether: item.whether, userId: item.id }
        });
      };
      if (!this.userType) {
        console.log(this.userType)
        this.$router.push({
          path: "/cargoRecommendDetails",
          query: {}
        });
      } else if (item.whether == "false") {
        id = item.id;
        (whether = "false"), (userId = item.id);

        if(this.userType == 8 && this.set == true){
            console.log("爬虫跳转货物详情");       
          this.$router.push({
            path: "/cargoRecommendDetails",
            query: { id: id, whether: whether, userId: userId }
          });
        }
        if (this.userType == 3 ) {  
          this.$router.push({
            path: "/cargoRecommendDetails",
            query: { id: id, whether: whether, userId: userId }
          });
        } else if (this.userType == 2) {
          this.$router.push({
            path: "/shipDetail",
            query: { id: id, whether: whether, userId: userId }
          });
        }
      } else if (item.goodsOrderId) {
        (id = item.goodsOrderId), (whether = "true"), (userId = item.userId);
        this.$router.push({
          path: "/cargoRecommendDetails",
          query: { id: id, whether: whether, userId: userId }
        });
      } else if (item.emptyShipOrderId) {
        (id = item.emptyShipOrderId),
          (whether = "true"),
          (userId = item.userId);
        this.$router.push({
          path: "/shipDetail",
          query: { id: id, whether: whether, userId: userId }
        });
      }
      (id = ""), (whether = ""), (userId = "");
    },
    //点击导航图标
    toIcon(item){
      if(item.title =='货源')
      this.$router.push({ path: "/goodsSource", query: {} });
      if(item.title =='船源')
      this.$router.push({ path: "/shipSource", query: {} });
      if(item.title =='档案')
      this.$router.push({ path: "/shipArchival", query: {} });
      if(item.title =='急速')
      this.$router.push({ path: "/rapidly", query: {} });
      if(item.title =='码头')
      this.$router.push({ path: "/wharfServices", query: {} });
      if(item.title =='专线')
      this.$router.push({ path: "/shipLine", query: {} });
      if(item.title =='救援')
      this.$router.push({ path: "/shipRescue", query: {} });
      if(item.title =='更多') {
        this.flag = !this.flag
      }
    },
    // 下拉加载
    onRefresh() {
      this.data.pageNum=1;
      this.totalPage=0;
      this.data.params.index = '';
      let self = this;
      setTimeout(() => {
        console.log(self.data)
        self.recommendOrderList=[];
        self.getRecommendedOrder(this.data); //加载数据
      }, 500);
    },
    // 上拉加载
    onLoad() {
      console.log('上拉')
      if (this.data.pageNum == 1) {
        // this.data.pageNum = 1;
      } else {
        this.data.pageNum++;
      };
      if(this.userType==1){
        if(this.data.pageNum>2){
         return this.$dialog.confirm({
            title: '嘟嘟船讯提醒您！',
            message: '您未登录,请登录后查看更多详情！'
          }).then(() => {
              this.$router.push('/login')
          }).catch(() => {
            this.data.pageNum=1;
            this.recommendOrderList=[];
            this.getRecommendedOrder(this.data); //加载数据
          });
        }
      }
      // this.loading = true;
      let self = this;
      setTimeout(() => {
        // self.finished = false;
        // self.isLoading = false;
        self.getRecommendedOrder(self.data);
        if (self.data.pageNum == 1) {
          this.data.pageNum++;
        }
      }, 500);
    },
    // 选择地址
    checkAddress(item){
      this.cityName = item[1].lonAndLat.name;
      this.data.lng = item[2].lonAndLat.lon;
      this.data.lat = item[2].lonAndLat.lat;
      this.showCheckAddress=false;
      this.checkAddressStatus = true;
      this.recommendOrderList = [];
      this.data.pageNum = 1;
      this.data.params.index = '';
      this.getRecommendedOrder(this.data);
    },
    // 查看我的发布详情
    lookMyIssueDetails(item){
      console.log('myISSue',item);
      if(this.userLoginInfo.userType == 3 || (this.userLoginInfo.userType == 8 && !this.set)){
        this.$router.push({path:'/shipOrderDetails',query:{shipId:item.emptyShipOrderId,orderStatus:item.orderStatus==1?0:1}})
      } else if(this.userLoginInfo.userType == 2 || (this.userLoginInfo.userType == 8 && this.set)) {
        this.$router.push({path:"/goodsRecDetail",query:{id:item.goodsOrderId,orderStatus:0}})
      }
    },
    // 滑动我的发布
    onChange(index){
      this.myIssueIndex = index + 1;
      this.data.pageNum = 1;
      this.data.params.index = '';
      this.recommendOrderList=[];
      let lonAndLat = this.myIssueList[index].startLonLat.split(',');
      // if(this.userLoginInfo.userType == 3){
      //   this.data.lng = lonAndLat[0];
      //   this.data.lat = lonAndLat[1];
      // } else if(this.userLoginInfo.userType == 2) {
      //   this.data.lng = this.myIssueList[index].startAddressHistoryDTO.longitude;
      //   this.data.lng = this.myIssueList[index].startAddressHistoryDTO.latitude;
      // } else {
      //   if(this.myIssueList[index].startAddressHistoryDTO){
      //     this.data.lng = this.myIssueList[index].startAddressHistoryDTO.longitude;
      //     this.data.lng = this.myIssueList[index].startAddressHistoryDTO.latitude;
      //   } else {
      //     this.data.lng = this.myIssueList[index].startAddressHistoryDtoList[0].longitude;
      //     this.data.lat = this.myIssueList[index].startAddressHistoryDtoList[0].latitude;
      //   }
      // }
      this.data.lng = lonAndLat[0];
      this.data.lat = lonAndLat[1];
      this.getRecommendedOrder(this.data)
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
  .searchBar {
      height: 1.28rem;
      padding-top: 0.55rem;
      width: 100%;
      color: #fff;
      opacity: 1;
      z-index: 999;
      top: 0;
      .van-col {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .address {
          display: flex;
          // justify-content: space-around;
          // align-items: center;
          // margin: 0 .1rem 0 .1rem;
          .leftTop {
            overflow:auto;
          }
          .van-icon:nth-child(3) {
            font-size: 0.4rem;
          }
        }
      }
      /deep/.searchBox .van-field {
        padding: 0.1rem 0.2rem;
        height: 0.5rem;
        border-radius: 0.4rem;
        color: #fff;
        background: rgba(255, 255, 255, 0.3) !important;
        .van-cell__value {
          height: 0.5rem !important;
          .van-field__control {
            color:#fff!important;
            height: .3rem;
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
  .home-header {
    background: url("../../assets/image/index_bg.png") no-repeat;
    background-size: 100% 50%;
    background-color: #fff;
    background-position: top center;
    .searchBar {
      height: 0.8rem;
      width: 100%;
      color: #fff;
      opacity: 1;
      z-index: 999;
      top: 0;
      .van-col {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .address {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-left: 20px;
          .van-icon:nth-child(3) {
            font-size: 0.3rem;
          }
        }
      }
      /deep/.searchBox .van-field {
        padding: 0.1rem 0.2rem;
        height: 0.6rem;
        border-radius: 0.4rem;
        color: #fff;
        background: rgba(255, 255, 255, 0.3) !important;
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
        justify-content: start;
        flex-direction: column;
        font-size: 0.5rem;
      }
    }
    .swipe {
      position: relative;
      margin-top: 0.2rem;
    }
    .swipeAndNav {
      height: 5rem;
      .swipe .van-swipe {
      height: 2.65rem;
      background: #eee;
      width: 92%;
      margin: 0 auto;
      border-radius: 0.3rem;
      .van-swipe-item {
        width: 100%;
        img {
          width: 100%;
            height: 100%;
        }
      }
    }
    .van-popup--center{
      // position: fixed;
      // transform: translate3d(15%,-26%,0);
      border-radius: 20px;
    }
    .main {
      margin: 0.3rem 0.2rem 0 0.3rem;
      // display: flex;
      // flex-wrap: wrap;
      .navigator-item {
        height: 1rem;
        padding: .06rem;
        display: flex;
        align-items: center;
        .navItem {
          width: 1.2rem;
          height: 1.2rem;
          display: flex;
          color: #fff;
          justify-content: center;
          align-items: center;
          border-radius: 50%; 
        }
      }
    }
    }
  }
  .issue,
  .recommendOrder {
    background: #fff;
    padding: .1rem .2rem;
    font-size: 15px;
    // margin-bottom:.1rem;
    .issue-title {
      display: flex;
      justify-content: space-between;
      // margin-bottom: .1rem;
      .myboder {
        text-align:center;
        display:flex;
        align-items:center;
      }
      .van-icon {
        font-size: 20px;
      }
      .van-col:nth-child(2) {
        display: flex;
        justify-content: flex-end;
      }
    }
    img {
      height: 0.4rem;
    }
  }
  .issue {
    margin-top:.1rem;
  }
  .recommendOrder-title {
    padding:.1rem .2rem;
    padding-bottom: .1rem;
    margin-top:.1rem;
    background: #fff;
  }
  .recommendOrder {
    padding: .1rem .3rem;
    overflow: scroll;
    // position: relative;
    .van-pull-refresh {
      // height: 75%;
      // overflow:auto;
    }
    .stick {
      width: .6rem;
      height:.6rem;
      position:absolute;
      top:0rem;
      left:0rem;
    }
  }
  // 晴天
  .sunshine_background {
    background: linear-gradient( #317ea4 0%, #a2d1ea 100%);
  }
  // 雨天
  .rain_background {
    background: linear-gradient( #85ABC0 0%, #B0C5CE 100%);
  }
  // 雾天
  .greasy_background {
    background: linear-gradient( #516B78 0%, #AEC3CF 100%);
  }
  // 阴天
  .cloudy_background {
    background: linear-gradient( #506B78 0%, #B2C6D0 100%);
  }
  // 雪天
  .snowy_background {
    background: linear-gradient( #516B78 0%, #AEC3CF 100%);
  }
  .recommendOrder-item {
    height: 1.4rem;
    color: #fff;
    // background: radial-gradient(farthest-side at 0 0, #317ea4 0%, #a2d1ea 100%);
    margin-bottom: 0.1rem;
    margin-top:.1rem;
    padding: 0.1rem 0.3rem;
    display: flex;
    justify-content: space-between;
    border-radius: 0.1rem;
    align-items: center;
    position:relative;
    text-shadow:1px 2px 3px rgba(0, 0, 0, .3);
    .qiyeIcon,.hetongIcon {
      position:absolute;
      right:-.1rem;
      top:.1rem;
      
    }
    .hetongIcon {
      right:.2rem;
    }
    .recommendOrder-weather {
      font-size: 14px;
    }
    .weather-content {
      .van-icon {
        font-size: 30px;
      }
      .weather-num {
        font-size: 10px;
      }
    }
    .recommendOrder-address {
      white-space: nowrap!important;
      .van-row:nth-child(1) {
        display: flex;
        justify-content: space-around;
        overflow: auto;
        :nth-child(1) {
        }
      }
      .van-row:nth-child(2) {
        
        display: flex;
        justify-content: space-between;
        :nth-child(1) {
          overflow:auto;
        }
      }
      .addressStyle {
        font-weight:700;
        height:.5rem;
        line-height:.5rem;
        font-size:15.5px;
        overflow:auto;
      }
    }
  }
}
</style>
