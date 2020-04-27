<template>
  <div class="my">
    <img src="src" alt />

    <!-- 武汉金纬度：113.41  29.58 -->
    <!-- 北京经纬度：115.25  39.26 -->
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :double-click-zoom="true"
      :scroll-wheel-zoom="true"
      :styleJson="true"
      :mapStyle="mapStyle"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
      @click="mymap"
    >
      <bm-control>
        <bm-marker
          :position="{lng:centertwo.lng , lat: centertwo.lat }"
          :icon="{url: src5,size: {width: 20, height: 30}}"
        ></bm-marker>
      </bm-control>
      <!-- 输入框盒子-->
      <bm-control class="bm-control">
        <div class="ziaolqm">
          <van-col span="3" class="qaoalmqn">
            <van-dropdown-menu active-color="#ee0a24">
              <van-dropdown-item v-model="value1" :options="option1" @change="Switchingtitle" />
            </van-dropdown-menu>
          </van-col>

          <van-col span="19">
            <van-search
              @blur="blur"
              v-model="value"
              input-align="center"
              :placeholder="tite"
              @search="onSearch"
              @input="inputs"
              :options="option1"
              @focus="focus"
            />
            <!-- </van-col> -->
          </van-col>
          <van-col span="2" class="qaoalmqn" @click="home">
            <img src="./mapimg/qiehuan.png" alt />
          </van-col>
        </div>
      </bm-control>

      <!-- 手动点击 控件 -->
      <bm-control class="div" anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 16, height: 320}">
        <div>
          <div>
            <button @click="add">
              <img src="./mapimg/map2.png" alt />
            </button>
          </div>
          <div>
            <button @click="reduce">
              <img src="./mapimg/map3.png" alt />
            </button>
          </div>
        </div>
      </bm-control>

      <!-- 四个按钮功能列表 -->

      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 10, height: 90}">
        <div class="Functionlist">
          <div @click="Port">
            <span>
              <img src="./mapimg/map4.png" alt />
              <!-- <span class="span2">船港</span> -->
            </span>

            <p>船港视图</p>
          </div>

          <div @click="goods">
            <span>
              <img src="./mapimg/map6.png" alt />
            </span>
            <p>附近货源</p>
          </div>
          <div @click="order">
            <span>
              <img src="./mapimg/map7.png" alt />
              <!-- <span class="span2">船港</span> -->
            </span>
            <p>我的订单</p>
          </div>
          <div @click="Regionalvessels">
            <span>
              <img src="./mapimg/map5.png" alt />
            </span>
            <p>附近船只</p>
          </div>
        </div>
      </bm-control>

      <!-- 多点定位 自定义图标渲染 -->
      <BmlMarkerClusterer :averageCenter="true" :maxZoom="maxZoom1">
        <bm-marker
          v-for="item in sum "
          :key="item.id"
          :position="{lng:item.lng , lat: item.lat }"
          @click="infoWindowOpen"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: src,size: {width: 20, height: 30}}"
        >
          <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
            <p style="color:#666666;font-size:0.18rem">地点：{{list.address}}</p>
            <p style="color:#666666;font-size:0.18rem;margin-top:3px">
              发货时间:{{list.startTime}}
              <van-button type="warning" size="mini" @click="details">详情</van-button>
            </p>
            <p style="color:#666666;font-size:0.18rem">类型：{{list.name}}</p>
          </bm-info-window>
        </bm-marker>
      </BmlMarkerClusterer>

      <BmlMarkerClusterer :averageCenter="true" :maxZoom="maxZoom1">
        <!-- 附近货渲染 -->
        <bm-marker
          v-for="item in huo "
          :key="item.id"
          :position="{lng:item.lng , lat: item.lat }"
          @click="infoWindowOpenhuo"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: src2,size: {width: 30, height: 30}}"
        >
          <bm-info-window :show="showhuo" @close="infoWindowClose" @open="infoWindowOpenhuo">
            <p style="color:#666666;font-size: 0.18rem;">地点：{{huolist.address}}</p>
            <p style="color:#666666;font-size:0.18rem;margin-top:3px">
              货物类型:{{huolist.name}}
              <van-button type="warning" size="mini" @click="details">详情</van-button>
            </p>
            <!-- <h6>{{list.name}}</h6> -->
            <p style="color:#666666;font-size:0.18rem">更新时间：{{huolist.startTime}}</p>
          </bm-info-window>
        </bm-marker>
      </BmlMarkerClusterer>

      <BmlMarkerClusterer :averageCenter="true" :maxZoom="maxZoom2">
        <!-- 爬虫外部船只-->
        <bm-marker
          v-for="item in waibuchuan "
          :key="item.id"
          :position="{lng:item.lng , lat: item.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: src3,size: {width: 30, height: 30}}"
          :offset="{width: -60, height: 20}"
          @click="infoWindowOpen"
        >
          <!-- 提示框 -->
          <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
            <p style="font-size:0.19rem">空船行驶航程：</p>
            <p style="font-size:0.19rem">
              空船开始时间：2019.11.15
              <van-button type="warning" size="mini" @click="details">详情</van-button>
            </p>
            <p style="font-size:0.19rem">船最高载重：</p>
          </bm-info-window>
        </bm-marker>
      </BmlMarkerClusterer>

      <BmlMarkerClusterer :averageCenter="true" :maxZoom="maxZoom2">
        <!-- 订单船只-->
        <bm-marker
          v-for="item in Ordervessel "
          :key="item.id"
          :position="{lng:item.lng , lat: item.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: src,size: {width: 50, height: 65}}"
          :offset="{width: -60, height: 20}"
          :dragging="true"
          @click="infoWindowOpen"
        >
          <bm-info-window
            :show="show"
            @close="infoWindowClose"
            @open="infoWindowOpen"
            :labelStyle="{color: 'red', fontSize : '1px',width:'60px'}"
          >
            <h6>船名：{{Ordervessels.subt}}</h6>

            <p>船号:{{Ordervessels.n}}</p>
            <p>更新时间：{{Ordervessels.satti}}</p>
            <!-- <van-button type="warning" size="mini" @click="details">详情</van-button> -->
          </bm-info-window>
        </bm-marker>
      </BmlMarkerClusterer>

      <!-- // 定位当前位置 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
        :offset="{width: 14, height: 150}"
      ></bm-geolocation>

      <!-- 卡片弹出框 -->
      <!-- <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" class="ONE">
        <div class="tanchu" v-if="xioxmh=='2'">
          <span style="color:#FEFFFF;font-size:15px">王先生(8km)</span>
          <van-row>
            <van-col span="6">
              <div style="margin-left:0px">
                <div>
                  <img src="./mapimg/tianqi.png" alt />
                </div>
                <div>
                  <p style="color:#FEFFFF;font-size:8px">18℃</p>
                  <p style="color:#FEFFFF;font-size:8px">转晴</p>
                </div>
              </div>
              <h6 style="color:#FEFFFF;font-size:8px;margin-top:3px">11月8日装</h6>
            </van-col>
            <van-col span="6" style="text-align:center">
              <h3 style="margin-top:3px">武汉</h3>
              <h4 style="margin-top:10px">总量：500吨</h4>
            </van-col>
            <van-col span="6" style="text-align:center;margin-top:10px">
              <img src="./mapimg/jiantou.png" alt />
            </van-col>
            <van-col span="6" style="text-align:center">
              <h3 style="margin-top:3px">上海</h3>
              <h4 style="margin-top:10px">货物：石头</h4>
            </van-col>
          </van-row>
        </div>
      </bm-control>-->

      <!-- 区域搜索港口 -->
      <!-- <BmlMarkerClusterer :averageCenter="true" :maxZoom=maxZoom2> -->

      <!-- -------------------------------------start港口港口-------------------------------------------------->

      <bm-local-search
        :keyword="QWERTY"
        :nearby="nearby"
        :auto-viewport="false"
        :panel="false"
        :icon="{url: src3,size: {width: 50, height: 65}}"
        :selectFirstResult="true"
        :autoViewport="false"
      ></bm-local-search>
      <bm-circle
        :center="nearby.center"
        :radius="nearby.radius"
        :icon="{url: src3,size: {width: 50, height: 65}}"
      ></bm-circle>
      <!-- </BmlMarkerClusterer> -->

      <!-- --------------------------------END---------------------------------------- -->

      <!-- 搜索单个船只 -->
      <bm-marker
        v-for="item in Searchforships"
        :key="item.id"
        :position="{lng:item.lng , lat: item.lat }"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: src3,size: {width: 50, height: 65}}"
        @click="infoWindowOpen"
      >
        <bm-info-window
          :show="show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
          :offset="{width: -15, height: -15}"
          style="width:150px;"
        >
          <p style="color:#666666;font-size:10px">类型：{{Searchboxlist.subt}}</p>
          <p style="color:#666666;font-size:10px;margin-top:4px">MMSI: {{Searchboxlist.m}}</p>
          <p style="color:#666666;font-size:10px;margin-top:3px">更新时间：{{Searchboxlist.satti}}</p>
          <!-- <van-button type="warning" size="mini" @click="details">详情</van-button> -->
        </bm-info-window>
      </bm-marker>

      <!-- 历史记录 -->
      <bm-control class="ioalaj" :offset="{width: 0, height: 50}">
        <div class="xiala" style="background-color: #FFFFFF" v-if="Historicalrecordshow==1">
          <ul>
            <li
              v-for="item in Storagelist"
              :key="item.id"
              @click="Historicalrecord(item)"
              style="height:0.8rem; line-height: 0.8rem; border-bottom: 0.5px dashed #000; color:#0470DC;padding-left"
            >{{item}}</li>
          </ul>
          <div
            style="height:0.8rem; line-height: 0.8rem; color:#010100;text-align: center;"
            @click="Emptyhistory"
            v-if="Emptyhistorybox==-1"
          >清空历史记录</div>
        </div>
      </bm-control>

      <!-- 搜索下拉框 -->
      <bm-control class="ioalaj" :offset="{width: 0, height: 50}">
        <div class="xiala" style="background-color: #FFFFFF" v-if="xialabox==1">
          <ul>
            <li
              v-for="item in SearchboxL"
              :key="item.id"
              @click="xialaj(item)"
              style="height:0.8rem; line-height: 0.8rem; border-bottom: 0.5px dashed #000; color:#0470DC"
            >{{item.key}}</li>
          </ul>
        </div>
      </bm-control>

      <!-- 订单选择框 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 70, height: 170}">
        <!-- <van-sidebar v-model="activeKey"  @change='changex' >
         <van-sidebar-item  :title="item.shipEnglishName"  style="width:140px;height:0.2rem;line-height:0.1rem;color:red;font-size:10px" v-for="item in Orderlist "  :key="item.id"/> 
        </van-sidebar>-->
        <div
          style="height:3rem;width:3.3rem;background-color:#ffffff;overflow: auto;"
          :class="hide==false?'none':'block' "
        >
          <ul
            style="width:100%;height:1rem; padding:5px 15px; line-height:0.4rem;"
            v-for="(item,index) in Orderlist "
            :key="item.index"
            @click="changeyy(index)"
            :class="flag==index?'qqqqqqq':''"
          >
            <li style="font-size:0.23rem;">{{item.shipEnglishName}}</li>
            <li
              style="font-size:0.2rem;border-bottom: 1px dashed #000;;"
            >{{item.goodsOrderDTO.startAddressHistoryDTO.cityName}}——{{item.goodsOrderDTO.endAddressHistoryDTO.cityName}}</li>
          </ul>
        </div>
      </bm-control>

      <!-- 三角形 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 50, height: 180}">
        <div class="triangle" :class="hide==false?'none':'block' "></div>
      </bm-control>

      <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" style="width: 100%;">
        <div class="Orderbox" v-if="flag >= 0">
          <van-row>
            <van-col span="12">
              <h3 style="margin-top:0.2rem ; font-sizi:1rem">{{Ordertexe.shipEnglishName}}</h3>
              <p>MMSI：{{Ordertexe.shipOrderDTO.shipInfoDTO.shipMmsi}}</p>
              <p>货船：在航</p>
              <p>目的地：{{Ordertexe.goodsOrderDTO.startAddressHistoryDTO.provinceName}}</p>
              <p>更新时间：{{Ordertexe.goodsOrderDTO.createTime}}</p>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="8" style="margin-top:27px">
              <p>联系人：{{Ordertexe.shipOrderDTO.userName}}</p>
              <p>电话：{{Ordertexe.goodsOrderDTO.endAddressHistoryDTO.mobilePhone}}</p>
              <p>货物：{{Ordertexe.goodsOrderDTO.goodsName}}</p>
              <p>重量：{{Ordertexe.goodsOrderDTO.actualTotalWeight}}吨</p>
            </van-col>

            <van-col span="2" style="margin-top:10px;text-align: center" @click="trajectory">
              <span>
                <img src="./mapimg/dingdan.png" alt />
              </span>
              <p style="margin-top:0px">轨迹</p>
            </van-col>
          </van-row>
        </div>
      </bm-control>
      <!-- 订单选择框赛选船只坐标展示 -->
      <bm-marker
        :position="{lng:Ordertexecoordinate[0].lng , lat: Ordertexecoordinate[0].lat }"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: src,size: {width: 50, height: 65}}"
        v-if="Ordertexecoordinate.length ==1 "
      ></bm-marker>

      <!-- 轨迹 -->
      <!-- <bml-curve-line :points="trajectorydinate" :editing="true" strokeColor='#000000' :strokeWeight=strokeWeight  strokeStyle="dashed" :clicking=clicking  strokeOpacity=0.8  :massClear=clicking></bml-curve-line> -->
      <bm-polyline
        :path="trajectorydinate"
        stroke-color="#000000"
        :stroke-opacity="0.8"
        :stroke-weight="1.5"
        :editing="false"
        strokeStyle="dashed"
      ></bm-polyline>

      <!-- 订单选择框赛选船只坐标展示 -->
      <bm-marker
        v-for="itme in trajectorydinate "
        :key="itme.id"
        :position="{lng:itme.lng , lat: itme.lat }"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: src4,size: {width: 15, height: 15}}"
      >
        <bm-label
          :content="itme.ti"
          :labelStyle="{color: '#171717',  fontSize :'10px',border:'1px solid skyblue',backgroundcolor:'red'}"
          :offset="{width: -35, height: 15}"
        />
      </bm-marker>

      <!-- 下拉框 船只详细显示框 -->

      <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" style="width: 100%;">
        <div
          class="Orderbox2"
          style="width:100%;height:2.6rem;background-color:#FFFFFF"
          v-if="flagone >0"
        >
          <van-row>
            <van-col span="9" style="text-align: center;line-height:.5rem;">
              <div style="margin-top:0.3rem;">
                <img src="./mapimg/sousuo.png" alt />
              </div>
            </van-col>
            <van-col span="12">
              <div style="margin-top:0.2rem;">
                <p style="font-size: 0.3rem;">{{Searchboxlist.n}}</p>
                <p>MMSI : {{Searchboxlist.m}}</p>
                <p>类型 ：{{Searchboxlist.t}}</p>
                <p>速度 ： {{Searchboxlist.sp}}节</p>
                <!-- <p>船首向：{{Searchboxlist.e}}</p> -->
                <p>最后时间 ：{{Searchboxlist.ti}}</p>
              </div>
            </van-col>
            <van-col span="3" style="text-align: center;">
              <div style="margin-top:0.2rem;" @click="Searchtrajectory">
                <img src="./mapimg/sousuozuobiiao.png" alt />
              </div>
              <p style="margin-top:1px">轨迹</p>
            </van-col>
          </van-row>
        </div>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
// -----------------数据接口----------------------------------
import { rinitialposition } from "@/api/index.js";
import { Regionalvessels } from "@/api/index.js";
// 我的订单
import { Myorder } from "@/api/index.js";
// 搜索框 船只
import { Searchforships } from "@/api/index.js";
//搜索框 下拉框
import { downlist } from "@/api/index.js";
//点击订单列表 船
import { Orderpulldown } from "@/api/index.js";

//点击订单列表 货
import { Orderpulldowngoods } from "@/api/index.js";
// 船只轨迹
import { Shiptrajectory } from "@/api/index.js";

// ----------------------end----------------------------

// ---------------------百度第三方组件---------------------
// 点聚合
import { BmlMarkerClusterer } from "vue-baidu-map";
// 轨迹
// import {BmlCurveLine} from 'vue-baidu-map'

import { log } from "util";
// ---------------------------end--------------------------
export default {
  components: {
    BmlMarkerClusterer
  },

  //  components: {
  //   BmlCurveLine
  // },

  data() {
    return {
      Storage: [],
      Storagelist: [],
      params: {
        userId: ""
      },
      Orderboxhide: false,
      hide: false,
      clicking: false,
      strokeWeight: 2,
      mmsi: "",
      Orderlist: [],
      Ordertexe: [],
      activeKey: "",
      Ordertexecoordinate: [],

      trajectorydinate: [], //轨迹坐标
      trajectorylist: [],
      //  搜索下拉框
      SearchboxL: [],
      SearchboxLx: "",
      loading: false,
      finished: false,

      Searchboxlist: "", // 搜索单个船只总数据

      // 搜索选择框
      value1: 0,
      option1: [
        { text: "船舶", value: 0 },
        // { text: "MMSI", value: 1 },
        { text: "港口", value: 2 }
      ],
      tite: "请输入中英文船名/MMSI",

      center: { lng: 118.767413, lat: 32.041544 }, // 初始中心点设置

      centertwo: { lng: 116.404, lat: 39.915 }, // 初始中心点设置
      zoom: 5, //     初始缩放等级
      maxZoom1: 10, // 点集合
      maxZoom2: 14, // 点集合

      sample: true,
      active: false,

      token: "",
      QWERTY: "",

      //  ------------------- 数据管理  start------------------------------
      value: "", //  搜素框文本

      quyu: "",
      src: require("./mapimg/dudu.png"), // 自家船

      src2: require("./mapimg/huo.png"), // 货

      src3: require("./mapimg/waibuchuan.png"), // 爬虫船

      src4: require("./mapimg/yuandian.png"),
      src5: require("./mapimg/dangqian.png"),

      // 坐标集
      sum: [], //初始船坐标

      huo: [], // 初始货坐标

      huolist: "", //  货总数据

      list: [],

      waibuchuan: [], // 爬虫外部接口船主坐标集

      //  订单船只坐标汇总
      Ordervessels: [],
      Ordervessel: [],
      qiaol: [],

      // 搜素单个船只坐标保存
      Searchforships: [],
      flag: -1,

      flagone: -1,
      xialabox: 1,

      Historicalrecordshow: -1,

      Emptyhistorybox: -1,

      //  ------------------- 数据管理  ent------------------------------

      // 删除图层街道 国道  自定义图层
      mapStyle: {
        styleJson: [
          {
            featureType: "road",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          }
        ]
      },

      // 搜索附近接口数据
      search: {
        params: {
          pageSize: "10",
          pageNum: "1",
          //    lonLat:"118.767413,32.041544",
          lonLat: "",
          distance: "100",
          type: 1
        }
      },

      //  初始船
      searchs: {
        params: {
          pageSize: "10",
          pageNum: "1",
          lonLat: "118.767413,32.041544",
          //    lonLat:"",
          distance: "100",
          type: 1
        }
      },

      //  初始货

      searchhuo: {
        params: {
          pageSize: "10",
          pageNum: "1",
          lonLat: "118.767413,32.041544",
          //    lonLat:"",
          distance: "100",
          type: 2
        }
      },

      //  初始港口
      searchgang: {
        params: {
          pageSize: "10",
          pageNum: "1",
          lonLat: "118.767413,32.041544",
          distance: "100",
          type: 3
        }
      },

      nearby: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 0
      },

      show: false, //   点击展示框

      showhuo: false,

      xioxmh: "",
      msg: ""
    };
  },

  created() {
    this.goodss();
    //    this.searchhuo()
    this.token = localStorage.getItem("token");
    this.xioxmh = "2";
    // console.log(this.token);
  },

  methods: {
    //  加
    add() {
      if (this.zoom < 19) {
        this.zoom++;
      }
    },

    //  减
    reduce() {
      //    this.zoom --
      if (this.zoom > 4) {
        this.zoom--;
      }
    },

    //  港口
    Port() {
      console.log(1111111);

      this.QWERTY = "码头";
      console.log(this.QWERTY);

      this.nearby.center.lng = "118.767413";

      this.nearby.center.lat = "32.041544";

      this.zoom = 13;

      this.radius = 10000;

      console.log(this.center);
    },

    onSearch(val) {
      console.log(val);
    },

    input(val) {
      console.log(val);
    },

    // 监听中心点和缩放函数
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
      //   console.log(this.zoom);
      this.search.params.lonLat = lng + "," + lat;

      // console.log(this.zoom);

      if (this.zoom < 15) {
        this.sample = true;
        //  this.src = require('./mapimg/xx.png')
        // this.src = require("./mapimg/huo.png");
        // this.src2 = require("./mapimg/dudu.png");
      }

      if (this.zoom > 15) {
        this.sample = false;
        // this.src = require("./mapimg/dudu.png");
        // this.src2 = require("./mapimg/huo.png");
      }

      //   中心点接口
    },

    // 区域船只
    // 上下中心点+0.1      // 左右中心点+0.006    得到地图手机视图四个角坐标
    async Regionalvessels() {
      // console.log(Math.random()+0.1);
      this.token = localStorage.getItem("token");
      this.waibuchuan = [];
      this.sample = false;
      //  左边
      // console.log(this.center);
      var left = this.center.lng + 0.008;
      var right = this.center.lng - 0.008;
      var top = this.center.lat + 0.1;
      var border = this.center.lat - 0.1;

      var a = right;
      var b = top;

      // ----------1------------
      var c = right;
      var d = border;
      //-----------2-----------
      var e = left;
      var f = border;
      // --------3---------
      var g = left;
      var h = top;
      // -------------4------------
      var i = right;
      var j = top;
      // -----------5----------
      var str = `${a}%20${b},${c}%20${d},${e}%20${f},${g}%20${h},${i}%20${j}`;
      // console.log(str);
      Regionalvessels(str, this.token).then(res => {
        console.log(res);
        var akoal = JSON.parse(res.data.data);
        var zpzpzpz = akoal.ships.ship;
        // console.log(akoal);
        console.log(zpzpzpz);
        if (zpzpzpz == undefined) {
          this.$toast("该区域无船只信息");
          return false;
        }

        zpzpzpz.forEach(element => {
          var qski = {};
          qski.lng = element.lo;
          qski.lat = element.la;
          this.waibuchuan.push(qski);
        });
        console.log(this.waibuchuan);
      });
    },

    goods() {
      rinitialposition(this.searchhuo, this.token).then(response => {
        this.huo = [];
        this.huolist = response.data.data.list[0];
        var qqq = response.data.data.list;
        // var obx = {};
        qqq.forEach(element => {
          var obx = {};
          obx.lng = element.lon;
          obx.lat = element.lat;
          this.huo.push(obx);
        });

        this.center.lng = this.huo[0].lng;
        this.center.lat = this.huo[0].lat;

        this.zoom = 14;

        var sum = this.huo.length;

        this.showhuo = true;

        this.$toast(`您附近有${sum}条货`);
      });
    },

    order() {

      this.flagone=-1
      var sum = JSON.parse(localStorage.getItem("userLoginInfo")).userType;

      var id = JSON.parse(localStorage.getItem("userLoginInfo")).user_id;

      this.params.userId = id;

      this.token = localStorage.getItem("token");

      if (sum == 2) {
        Orderpulldowngoods(this.params, this.token).then(res => {
          if (res.data.data.list.length <= 0) {
            this.$toast("无当前船只交易订单");

            return false;
          }
          res.data.data.list.forEach(element => {
            if (
              element.goodsOrderDTO.endAddressHistoryDTO.cityName == "市辖区"
            ) {
              element.goodsOrderDTO.endAddressHistoryDTO.cityName =
                element.goodsOrderDTO.endAddressHistoryDTO.provinceName;
            }
            if (
              element.goodsOrderDTO.startAddressHistoryDTO.cityName == "市辖区"
            ) {
              element.goodsOrderDTO.startAddressHistoryDTO.cityName =
                element.goodsOrderDTO.startAddressHistoryDTO.provinceName;
            }
          });

          this.Orderlist = res.data.data.list;
          for (var i in res.data.data.list) {
            var date = new Date(res.data.data.list[i].goodsOrderDTO.createTime);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.Orderlist[i].goodsOrderDTO.createTime = Y + M + D + h + m + s;
          }
          this.hide = !this.hide;
          // }
        });
      }

      if (sum == 3) {
        Orderpulldown({}, this.token).then(res => {
          if (res.data.data.list.length <= 0) {
            this.$toast("无当前船只交易订单");

            return false;
          }
          res.data.data.list.forEach(element => {
            if (
              element.goodsOrderDTO.endAddressHistoryDTO.cityName == "市辖区"
            ) {
              element.goodsOrderDTO.endAddressHistoryDTO.cityName =
                element.goodsOrderDTO.endAddressHistoryDTO.provinceName;
            }
            if (
              element.goodsOrderDTO.startAddressHistoryDTO.cityName == "市辖区"
            ) {
              element.goodsOrderDTO.startAddressHistoryDTO.cityName =
                element.goodsOrderDTO.startAddressHistoryDTO.provinceName;
            }
          });

          this.Orderlist = res.data.data.list;
          for (var i in res.data.data.list) {
            var date = new Date(res.data.data.list[i].goodsOrderDTO.createTime);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.Orderlist[i].goodsOrderDTO.createTime = Y + M + D + h + m + s;
          }
          this.hide = !this.hide;
          // }
        });
      }
    },

    //   初始进页面自定义坐标函数 船和货搜索
    async goodss() {
      this.token = localStorage.getItem("token");

      // 3 是货  2是船
      var sum = JSON.parse(localStorage.getItem("userLoginInfo")).userType;

      // Myorder(this.token).then(res => {

      //   res.data.data.forEach(element => {
      //     var obj = JSON.parse(element).ships.ship;
      //     this.qiaol.push(obj);
      //   });

      //   console.log(this.qiaol);

      //  无订单展示附近船只
      // if (res.data.data.length < 1) {
      //  附近船
      if (sum == 2) {
        rinitialposition(this.searchs, this.token).then(response => {
          console.log(response);
          var sss = response.data.data.list;
          this.list = sss[0];
          // var obj = {};
          sss.forEach(element => {
            var obj = {};
            obj.lng = element.lon;
            obj.lat = element.lat;
            this.sum.push(obj);
          });

          this.quyu = sss[0].address;
          this.content = this.sum.length;
        });
      }

      // 附近货坐标
      if (sum == 3) {
        rinitialposition(this.searchhuo, this.token).then(response => {
          this.huolist = response.data.data.list[0];
          var qqq = response.data.data.list;
          // var obx = {};
          qqq.forEach(element => {
            var obx = {};
            obx.lng = element.lon;
            obx.lat = element.lat;
            this.huo.push(obx);
          });
        });
      }
      // }

      //  有订单展示订单位置
      // if (res.data.data.length >= 1) {
      //   this.qiaol.forEach(element => {
      //     var Order = {};
      //     Order.lng = element.lo;
      //     Order.lat = element.la;
      //     this.Ordervessel.push(Order);
      //   });
      // }
      // });
    },

    //    坐标点提示框
    infoWindowClose() {
      this.show = false;
    },

    infoWindowOpen() {
      this.show = true;
    },

    infoWindowOpenhuo() {
      this.showhuo = true;
    },

    //    点击详情跳转
    details() {},

    // 跳转首页去

    home() {
      this.$router.push({ path: "/" });
    },

    xialaj(item) {
      this.value = item.key + "";
      this.Storage.push(item.key);
      console.log(this.Storage);
      localStorage.setItem("lastname", this.Storage);
      this.token = localStorage.getItem("token");
      if (this.value1 == 0) {
        this.Searchforships = [];

        Searchforships(this.value, this.token).then(res => {
          var solam = JSON.parse(res.data.data);

          this.Searchboxlist = solam.ships.ship;

          console.log(this.Searchboxlist);

          var obj = {};
          this.Historicalrecordshow = -1;
          if (solam.ships.ship === undefined) {
            this.$toast("无当前船只信息");
            //  console.log(11111111111111111);
            this.value = "";
            return false;
          }

          obj.lng = solam.ships.ship.lo;
          obj.lat = solam.ships.ship.la;
          this.Searchforships.push(obj);
          // console.log(this.Searchforships.length);

          this.center.lng = this.Searchforships[0].lng;
          this.center.lat = this.Searchforships[0].lat;

          console.log(this.Searchforships.length);

          this.zoom = 15;

          this.show = true;

          this.value = "";

          this.flagone = 1;
        });
        this.SearchboxL = [];
      }
    },

    // 历史记录点击li获取值
    Historicalrecord(item) {
      this.value = item;
      console.log(this.value);
      if (this.value1 == 0) {
        this.Searchforships = [];

        Searchforships(this.value, this.token).then(res => {
          var solam = JSON.parse(res.data.data);

          this.Searchboxlist = solam.ships.ship;

          console.log(this.Searchboxlist);

          var obj = {};
          this.Historicalrecordshow = -1;
          if (solam.ships.ship === undefined) {
            this.$toast("无当前船只信息");
            //  console.log(11111111111111111);
            this.value = "";
            return false;
          }

          obj.lng = solam.ships.ship.lo;
          obj.lat = solam.ships.ship.la;
          this.Searchforships.push(obj);
          // console.log(this.Searchforships.length);

          this.center.lng = this.Searchforships[0].lng;
          this.center.lat = this.Searchforships[0].lat;

          console.log(this.Searchforships.length);

          this.zoom = 15;

          this.show = true;

          this.value = "";
          this.flagone = 1;
        });
        this.SearchboxL = [];
      }
    },

    // 输入搜索单个船只
    //  盛远198
    blur() {
      console.log(this.value);
    },

    Switchingtitle(val) {
      if (val == 0) {
        this.tite = "请输入中英文船名/MMSI";
      }

      if (val == 2) {
        this.tite = "请输入中文港口名";
      }
    },

    inputs() {
      // 输入框 取前七个
      console.log(this.value);
      this.token = localStorage.getItem("token");
      downlist(this.value, this.token).then(res => {
        console.log(res);
        this.SearchboxL = [];
        var jsonq = JSON.parse(res.data.data);
        var sssssss = jsonq.ships.ship;
        for (var i = 0; i <= 6; i++) {
          this.SearchboxL.push(sssssss[i]);
        }
        console.log(this.SearchboxL);
      });
    },

    Emptyhistory() {
      this.Emptyhistorybox = 1;
      this.Storagelist = "";
      this.Historicalrecordshow = -1;
      localStorage.removeItem("lastname");
    },

    focus() {
      if (this.Storagelist.length > 0) {
        this.Emptyhistorybox = -1;
      }

      this.Historicalrecordshow = 1;

      this.xialabox = 1;
      //  console.log(87456);

      var sum = window.localStorage.getItem("lastname");

      console.log(sum);
      var arr = sum.split(",");
      console.log(arr,8888888888888);

      console.log(arr.length);


      // var str =arr.substring(0,1)

      // console.log(str);
      
      

      // for (var i = 0; i <= 6; i++) {   
                
      //      var sum = [arr[i]]

      //        this.Storagelist.push(sum)
                
          
      //   }

        

      this.Storagelist = arr;
 

      console.log(this.Storagelist, 11111);
    },


    changeyy(index) {
      console.log(index);
      this.flag = index;
      this.Ordertexecoordinate = [];
      this.Ordertexe = [];
      this.Ordertexe = this.Orderlist[index];
      console.log(this.Ordertexe);
      this.OrderOrderlist = [];
      var num1 = this.Ordertexe.shipOrderDTO.currentAddressHistoryDTO.longitude;
      var num2 = this.Ordertexe.shipOrderDTO.currentAddressHistoryDTO.latitude;
      var obj = {};
      obj.lng = num1;
      obj.lat = num2;
      this.Ordertexecoordinate.push(obj);

      console.log(this.Ordertexecoordinate);

      this.center.lng = this.Ordertexecoordinate[0].lng;
      this.center.lat = this.Ordertexecoordinate[0].lat;

      this.zoom = 13;
      console.log(this.center);

      this.mmsi = this.Ordertexe.shipOrderDTO.shipInfoDTO.shipMmsi;
    },

    // 轨迹
    trajectory() {
      this.trajectorydinate = [];
      Shiptrajectory(this.mmsi, this.token).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          var sum = JSON.parse(res.data.data);
          // console.log(sum);

          this.trajectorylist == sum.ships.ship;

          sum.ships.ship.forEach(element => {
            var obj = {};
            obj.ti = element.ti.substring(0, 10);
            obj.lng = element.lo;
            obj.lat = element.la;
            this.trajectorydinate.push(obj);
          });

          console.log(this.trajectorydinate);

          this.center.lng = this.trajectorydinate[0].lng;
          this.center.lat = this.trajectorydinate[0].lat;
          this.zoom = 10;
        }
      });
    },

    //  搜索轨迹
    Searchtrajectory() {
      this.trajectorydinate = [];
      Shiptrajectory(this.Searchboxlist.m, this.token).then(res => {
        var sum = JSON.parse(res.data.data);
        // console.log(sum.ships,88888);

        if (sum.ships == "") {
          this.$toast("无当前船无轨迹");
          return false;
        }

        this.trajectorylist == sum.ships.ship;

        sum.ships.ship.forEach(element => {
          var obj = {};
          obj.ti = element.ti.substring(0, 10);
          obj.lng = element.lo;
          obj.lat = element.la;
          this.trajectorydinate.push(obj);
        });

        this.center.lng = this.trajectorydinate[0].lng;
        this.center.lat = this.trajectorydinate[0].lat;
        this.zoom = 10;
      });
    },

    mymap() {
      this.flagone = -1;
      this.flag = -1;
      this.xialabox = -1;
      this.value = "";
      this.SearchboxL = [];
    }
  },

  mounted() {},

  watch: {
    zoom(val) {
      // console.log(val);
      if (val > 17) {
        this.$toast("已经最大了");
      }

      if (val < 5) {
        this.$toast("已经最小了");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}

.my {
  width: 100%;
  height: 100%;
}

.bm-control {
  width: 100%;
  z-index: 9999999;
}

.zoalq {
  width: 50px;
  height: 50px;

  border: 1px solid red;
}

.div {
  background-color: #ffffff;
  cursor: pointer;
  width: 32.5px;
  height: 70px;
}

.div button {
  width: 0.7rem;
  height: 0.8rem;

  background-color: #ffffff;

  border: 0px;
}

.Functionlist {
  width: 0.8rem;
  background-color: #ffffff;
  // height: 180px;
}

.Functionlist div {
  width: 100%;
  height: 0.9rem;
  text-align: center;
  border-bottom: 0.2px solid #cbcbcb;
  padding-top: 0.16rem;
  p {
    font-size: 0.16rem;
    // font-weight:bold
  }
}

.Functionlist div span {
  width: 100%;
  height: 100%;
  // margin-top: 0.3rem;
}

.ziaolqm {
  width: 100%;
  height: 54px;
  margin-top: 0px;
  z-index: 9999999;
}

.qaoalmqn {
  height: 54px;
  line-height: 64px;
  background-color: #ffffff;
}

//  去除默认百度文字
// .anchorBL {
//   display: none;
//   font-size: 1px;
//   height: 0px;
// }

.anchorBL {
  display: none;
  height: 0px;
}

h6 {
  color: #666666;
  font-size: 5px;
}

.ONE {
  width: 100%;
}

.van-row {
  margin-top: 20px;
  color: #feffff;
}

.van-row div {
  display: inline-block;
}

.tanchu {
  width: 100%;
  height: 130px;

  // background-color: #73B3EC;
  background-image: linear-gradient(#e66465, #9198e5);
  padding: 10px 20px;
  // box-sizing: border-box
  border-radius: 15px;
  // margin: ;
}

.van-dropdown-menu {
  height: 54px;
  font-size: 9px;
}

.ioalaj {
  width: 100%;
}

.van-card {
  height: 30px;
  line-height: 30px;
  background-color: red;
  padding-top: 0px;
}
.van-list {
  background-color: #e66465;
}

.Orderbox {
  width: 100%;
  height: 2.5rem;
  padding-left: 0.4rem;
  background-image: linear-gradient(#e66465, #9198e5);
  p {
    font-size: 0.23rem;
    margin-top: 0.1rem;
  }
}

.Orderbox2 p {
  font-size: 0.23rem;
  margin-top: 0.1rem;
  color: #000;
}

.none {
  display: none;
}

.block {
  display: block;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 0.2rem solid transparent;
  border-bottom: 0.2rem solid transparent;
  border-left: 0.4rem solid #ffffff;
}

.qqqqqqq {
  color: #e66465;
}
</style>