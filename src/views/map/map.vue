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

    <!-- <bm-control> 
            <div style="width:2rem;height:3rem;background-color:red;">
            </div>
      </bm-control>   -->


      <bm-marker
        :position="{lng: qianmiantiaozhuan.lng, lat: qianmiantiaozhuan.log}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <!-- <bm-label content="我爱北京天安门" /> -->
      </bm-marker>
      <!-- 
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 50, height: 180}" style="background-color:rgba(4, 112, 220, 1)" v-if="goodsboxbox == 2">
            <div style="background-color:rgba(4, 112, 220, 1)">123456</div>
      </bm-control>-->

      <bm-control>
        <bm-marker
          :position="{lng:centertwo.lng , lat: centertwo.lat }"
          :icon="{url: src5,size: {width: 20, height: 30}}"
        ></bm-marker>
      </bm-control>
      <!-- 输入框盒子-->
      <bm-control class="bm-control">
        <div class="ziaolqm" style="margin-top:0.5rem;">
          <van-col span="3" class="qaoalmqn">
            <!-- <van-dropdown-menu active-color="#blue">
              <van-dropdown-item v-model="value1" :options="option1" @change="Switchingtitle" />
            </van-dropdown-menu>-->
            船舶
          </van-col>

          <van-col span="18">
            <van-search
              @blur="blur"
              v-model="value"
              input-align="center"
              :placeholder="tite"
              @search="onSearch"
              @input="inputs"
              :options="option1"
              @focus="focus"
              style="padding:10px 0px;height:0.9rem"
            />
            <!-- </van-col> -->
          </van-col>
          <van-col span="3" class="qaoalmqnggg">
            <span v-if="focusing == false" @click="home">
              <img src="./mapimg/qiehuan.png" />
            </span>
            <span v-if="focusing == true" @click="cancel">取消</span>
          </van-col>
        </div>
      </bm-control>

      <!-- 手动点击 控件 -->
      <bm-control class="div" anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 16, height: 350}">
        <div style="box-shadow: 1px 1px 1px 1px #888888;border-radius: 3px">
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

      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 10, height: 120}">
        <div
          class="Functionlist"
          style="border-radius: 3px;box-shadow:0px 0px 18px #c3bdbd;"
          v-if="Viewbar == true"
        >
          <div @click="Port">
            <span>
              <img :src="Portimg == false?Port1:Port2" alt />
            </span>
            <p :class="Portimg == false?'gray':'bluesss'">附近港口</p>
          </div>

          <div @click="goods">
            <span>
              <img :src="goodsimg == false?goods1:goods2" alt />
            </span>
            <p :class="goodsimg == false?'gray':'bluesss'" v-if="userType == 3">附近货源</p>
            <p :class="goodsimg == false?'gray':'bluesss'" v-if="userType == 2">附近船源</p>
            <p :class="goodsimg == false?'gray':'bluesss'" v-if="userType == 8">附近货源</p>
          </div>

          <div @click="order">
            <span>
              <img :src="orderimg == false?srcorder1:srcorder2" alt />
            </span>
            <p :class="orderimg == false?'gray':'bluesss'">我的订单</p>
          </div>

          <div
            @click="Regionalvessels"
            style="border-bottom: 0px"
            v-if="Regionalvesselshide == true"
          >
            <span>
              <img :src="Regionalvesselsimg == false?Regionalvessels1:Regionalvessels2" alt />
            </span>
            <p :class="Regionalvesselsimg == false?'gray':'bluesss'">附近船只</p>
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

      <bml-marker-clusterer :averageCenter="true"  :styles="dianjuhe" :maxZoom="maxZoom1 ">
        <!-- 附近货渲染 -->
        <bm-marker
          v-for="(item,index) in huo "
          :key="index"
          :position="{lng:item.lng , lat: item.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          @click="infoWindow(item)"
          :icon="{url: src2,size: {width: 30, height: 30}}"
        >
          <!-- <bm-info-window :show="showhuo" @close="infoWindowClosehuo" @open="infoWindowOpenhuo">
            <p style="color:#666666;font-size: 0.18rem;">地点：{{huolist.address}}</p>
            <p style="color:#666666;font-size:0.18rem;margin-top:3px">
              货物类型:{{huolist.name}}
              <van-button type="warning" size="mini" @click="details">更多</van-button>
            </p>
            <p style="color:#666666;font-size:0.18rem">更新时间：{{huolist.startTime}}</p>
          </bm-info-window>-->
        </bm-marker>
      </bml-marker-clusterer>

      <bml-marker-clusterer :averageCenter="true"  :styles="dianjuhe" :maxZoom="maxZoom1">
        <!-- 附近船渲染 -->
        <bm-marker
          v-for="item in Initialship "
          :key="item.id"
          :position="{lng:item.lng , lat: item.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          @click="infoWindow(item)"
          :icon="{url: src,size: {width: 30, height: 30}}"
        >
          <!-- <bm-info-window :show="showhuo" @close="infoWindowClosehuo" @open="infoWindowOpenhuo">
            <p style="color:#666666;font-size: 0.18rem;">地点：{{huolist.address}}</p>
            <p style="color:#666666;font-size:0.18rem;margin-top:3px">
              货物类型:{{huolist.name}}
              <van-button type="warning" size="mini" @click="details">更多</van-button>
            </p>
            <p style="color:#666666;font-size:0.18rem">更新时间：{{huolist.startTime}}</p>
          </bm-info-window>-->
        </bm-marker>
      </bml-marker-clusterer>

      <BmlMarkerClusterer :averageCenter="true" :maxZoom="maxZoom2" :styles="dianjuhe">
        <!-- 爬虫外部船只-->
        <bm-marker
          v-for="item in Externalvessels "
          :key="item.id"
          :position="{lng:item.lo+0.0121480452 , lat: item.la+0.0033722 }"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: src3,size: {width: 30, height: 30}}"
          @click="infoWindowOpenpc(item)"
        >
          <!-- 提示框 -->
          <!-- <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" >
            <p style="font-size:0.19rem">船名:{{item.d}}</p>
            <p style="font-size:0.19rem;margin-top:0.09rem">类型：{{item.t}} <van-button type="warning" size="mini" >详情</van-button></p>
            <p style="font-size:0.19rem;margin-top:0.07rem">
              空船开始时间：{{item.ti}}
              
            </p> 
            <p style="font-size:0.19rem">船最高载重：</p>
            <p style="font-size:0.19rem">空船行驶航程：</p>
            <span>船最高载重：</span>
          </bm-info-window>-->
        </bm-marker>
      </BmlMarkerClusterer>
      <!-- ---------------------------------------------- -->
      <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" style="width: 100%;">
        <div
          class="Orderbox2"
          style="width:100%;height:2.6rem;background-color:#FFFFFF"
          v-if="Reptilesingleshipshow == true"
        >
          <van-row>
            <van-col span="8" style="text-align: center;line-height:.5rem;">
              <div style="margin-top:0.3rem;">
                <img src="./mapimg/sousuo.png" alt />
              </div>
            </van-col>
            <van-col span="14">
              <div style="margin-top:0.2rem;">
                <p style="font-size: 0.3rem;">船名：{{Reptilesingleship.n}}</p>
                <p>MMSI : {{Reptilesingleship.m}}</p>
                <p>类型 ：{{Reptilesingleship.t}}</p>
                <p>速度 ： {{Reptilesingleship.sp}}节</p>
                <!-- <p>船首向：{{Searchboxlist.e}}</p> -->
                <p>最后时间 ：{{Reptilesingleship.ti}}</p>
              </div>
            </van-col>
            <van-col span="2" style="text-align: center;">
              <div style="margin-top:0.4rem;">
                 <span @click="quyuguiji">
                <img src="./mapimg/sousuozuobiiao.png" alt />
                </span>
                <!-- <span  style="color:red">关闭</span> -->
                <!-- <van-button type="primary" size="mini" style="width:0.1rem">关闭</van-button> -->
                 <!-- <button
                  style="width:0.6rem;height:0.5rem;background-color: #e66465;border:0px; font-size: 10px"
                  @click="ReptilesingleshipClose"                 
                >轨迹</button> -->

                <!-- <span>
                <img src="./mapimg/dingdan.png" alt />
              </span> -->

                <button
                  style="width:0.6rem;height:0.35rem;background-color: #e66465;border:0px; font-size: 10px;margin-top:0.4rem;"
                  @click="ReptilesingleshipClose"                 
                >关闭</button>
              </div>
            </van-col>
          </van-row>
        </div>
      </bm-control>

      <!-- ---------------------------------------- -->

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

      <!-- <bm-control class="div" anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 16, height: 350}">
        <div  style="box-shadow: 1px 1px 1px 1px #888888;border-radius: 3px">
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
      </bm-control>-->

      <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :offset="{width: 15, height: 150}">
        <div
          style="width:0.6rem;height:0.6rem; background-color: #ffffff;padding:5px"
          @click="Currentpositioning"
        >
          <img src="./mapimg/suoding.png" alt style="width:100%;height:100%" />
        </div>
      </bm-control>

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
      <bm-control class="ioalaj" :offset="{width: 0, height: 70}">
        <div class="xiala" style="background-color: #FFFFFF" v-if="Historicalrecordshow==1">
          <ul>
            <li
              v-for="item in Storagelist"
              :key="item.id"
              @click="Historicalrecord(item)"
              style="height:0.8rem; line-height: 0.8rem; border-bottom: 0.5px solid rgba(238, 238, 238, 1); ; color:#0470DC;"
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
      <bm-control class="ioalaj" :offset="{width: 0, height: 63}">
        <div class="xiala" style="background-color: #FFFFFF" v-if="xialabox==1">
          <ul>
            <li
              v-for="item in SearchboxL"
              :key="item.id"
              @click="xialaj(item)"
              style="height:0.8rem; line-height: 0.8rem; border-bottom: 0.5px solid rgba(238, 238, 238, 1); color:#0470DC"
            >{{item.key}}</li>
          </ul>
        </div>
      </bm-control>

      <!-- 订单选择框 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 65, height: 200}">
        <div
          style="height:3rem;width:2.6rem;background-color:#ffffff;overflow: auto;border-radius: 8px;-webkit-overflow-scrolling: touch;position : relative; "
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
              style="font-size:0.2rem;border-bottom: 1px  solid rgba(191, 191, 191, 1);"
            >{{item.goodsOrderDTO.startAddressHistoryDTO.cityName}}——{{item.goodsOrderDTO.endAddressHistoryDTO.cityName}}</li>
          </ul>
        </div>
      </bm-control>

      <!-- 三角形 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 50, height: 220}">
        <div class="triangle" :class="hide==false?'none':'block' "></div>
      </bm-control>

      <bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" style="width: 100%;">
        <div class="Orderbox" v-if="flag >= 0"  >
          <van-row>
            <van-col span="12" style="margin-top:0rem">
              <h3 style="margin-top:0.2rem ; font-sizi:1rem">{{Ordertexe.shipEnglishName}}</h3>
              <p>
                MMSI：
                <!-- {{Ordertexe.shipOrderDTO.shipInfoDTO.shipMmsi}} -->
                {{this.userType==3?Ordertexe.shipOrderDTO.shipInfoDTO.shipMmsi:Ordertexe.shipOrderDTOList[0].shipInfoDTO.shipMmsi}}
                <!-- {{Ordertexe.shipOrderDTOList[0].shipInfoDTO.shipMmsi}} -->
              </p>
              <p>类型：在航</p>
              <p>
                <!-- 目的地：{{Ordertexe.goodsOrderDTO.startAddressHistoryDTO.provinceName}} -->
                目的地：
                {{this.userType==3?Ordertexe.goodsOrderDTO.startAddressHistoryDTO.provinceName:Ordertexe.shipOrderDTOList[0].endAddressHistoryDtoList[0].cityName}}
              </p>
              <p>
                <!-- 更新时间：{{Ordertexe.goodsOrderDTO.createTime}} -->
                更新时间：
                {{this.userType==3?Ordertexe.goodsOrderDTO.createTime:Ordertexe.shipOrderDTOList[0].createTime}}
              </p>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="8" style="margin-top:27px">
              <p>
                <!-- 联系人：{{Ordertexe.shipOrderDTO.userName}} -->
                联系人：
                {{this.userType==3?Ordertexe.shipOrderDTO.userName:Ordertexe.shipOrderDTOList[0].userName}}
              </p>
              <p @click="diagdanhezi">
                电话：
                <!-- {{Ordertexe.goodsOrderDTO.endAddressHistoryDTO.mobilePhone}} -->
                {{this.userType==3?Ordertexe.goodsOrderDTO.endAddressHistoryDTO.mobilePhone:Ordertexe.shipOrderDTOList[0].endAddressHistoryDtoList[0].mobilePhone}}
              </p>
              <p>
                <!-- 货物：{{Ordertexe.goodsOrderDTO.goodsName}} -->
                货物
                {{this.userType==3?Ordertexe.goodsOrderDTO.goodsName:Ordertexe.goodsOrderDTO.goodsName}}
              </p>
              <p>
                重量：
                <!-- {{Ordertexe.goodsOrderDTO.actualTotalWeight}} -->
                {{this.userType==3?Ordertexe.goodsOrderDTO.actualTotalWeight:Ordertexe.goodsOrderDTO.actualTotalWeight}}吨
              </p>
            </van-col>

            <van-col span="2" style="margin-top:0.4rem;text-align: center" @click="trajectory">
              <span>
                <img src="./mapimg/dingdan.png" alt />
              </span>
              <button
                style="width:0.6rem;height:0.3rem;background-color: #e66465;border:0px; font-size: 10px;margin-top:0.8rem"
                @click="ReptilesingleshipClosedingdan"
              >关闭</button>
              <!-- <p style="margin-top:0px">轨迹</p> -->
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
              <button
                style="width:0.6rem;height:0.3rem;background-color: #e66465;border:0px; font-size: 10px;margin-top:0.4rem"
                @click="ReptilesingleshipClosesousuo"
              >关闭</button>
              <!-- <p style="margin-top:1px">轨迹</p> -->
            </van-col>
          </van-row>
        </div>
      </bm-control>

      <!-- 货物详情 -->
      <bm-control>
        <div v-if="goodsboxbox == 2" class="Nearbysourcelistdisplay">
          <div
            style="background-color:rgba(4, 112, 220, 1);text-align: center;height:1rem;line-height:1rem;color:#ffffff"
            v-if="userType == 3 || userType == 8 "
          >
            <span style="padding-right: 0.2rem;width:1rem">附近货源列表({{huolists.length}})</span>
            <span style="text-align: center; margin-top: 0rem;width:0.5rem;height:0.5rem" @click="goodsinformation">
              <!-- <img src="./mapimg/guanbi.png" alt=""> -->
              <span style="font-size: 0.2rem; background-color:#0470dc;" @click="goodsinformation">关闭</span>
            </span>
          </div>

          <div
            style="background-color:rgba(4, 112, 220, 1);text-align: center;height:1rem;line-height:1rem;color:#ffffff"
            v-if="userType == 2"
          >
            <span style="padding-right: 0.3rem;width:1rem">附近船源列表({{huolists.length}})</span>
            <span style="font-size: 0.2rem; background-color:#0470dc;" @click="goodsinformation">关闭</span>
          </div>

          <ul
            style="width:100%;height:1.5rem; background-color:#ffffff;padding:5px 18px;border-bottom: 0.2px solid rgba(191, 191, 191, 1)"
            v-for="(item,index) in huolists"
            :key="index"
            @click="Clickongoods(index)"
            :class="Detailedcargo==index?'qqqqqqq':''"
          >
            <li style="font-size: 0.23rem;">地点：{{item.address.substring(0,10)}}</li>

            <li
              style="font-size: 0.23rem;margin-top:0.15rem;margin-bottom:0.15rem"
            >{{userType ==3?"更新时间":"更新时间" }} ：{{item.startTime.substring(0,10)}}</li>

            <li
              style="font-size: 0.23rem;"
            >{{userType ==3?"货物":"船只" }} ：{{item.name.substring(0,10)}}</li>
          </ul>
        </div>
        <!-- </van-list> -->
      </bm-control>

      <!-- <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 90, height: 420}">
              
              <div style="background-color:rgba(4, 112, 220, 1); border-radius: 12px;text-align: center; height:5rem;width:4rem ; height:1rem;line-height:2rem;color:#ffffff">
                    <img src="./mapimg/guanbi.png" alt="">
              </div>

      </bm-control> -->

      <!-- <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 50, height: 180}" style="background-color:rgba(4, 112, 220, 1)" v-if="goodsbox > 0">
            <div style="background-color:rgba(4, 112, 220, 1)">123456</div>
      </bm-control>-->

      <!-- <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 90, height: 410}">
           <div style="background-color:#949494;text-align: center;width:4rem;">
             <img src="./mapimg/huowuguanbi.png" alt="">
           </div>
      </bm-control>-->
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

    
      // ------图片判断----------

      Portimg: false,
      Port1: require("./mapimg/map4.png"), // 港口
      Port2: require("./mapimg/gangkoulanshe.png"),

      goodsimg: false,
      goods1: require("./mapimg/map6.png"), // 附近货源
      goods2: require("./mapimg/fujinhuoyuanlanshe.png"),

      orderimg: false,
      srcorder1: require("./mapimg/map7.png"), // 订单
      srcorder2: require("./mapimg/wodedingdanlanshe.png"),

      Regionalvesselsimg: false,
      Regionalvessels1: require("./mapimg/map5.png"), //  附近
      Regionalvessels2: require("./mapimg/quyulanshe.png"),

      // dianjuhex: require("./mapimg/dianjuhe.png"),


        dianjuhe:[{
        // textColor:"red",
             url: require("./mapimg/dianjuhe.png"),
            // url:'http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m0.png',
            // url:'dianjuhex',
            size: new BMap.Size(53, 53),
            opt_anchor: [50, 50],
            textColor: '#1e1e1e',
            opt_textSize: 10
      }],

      userType: "",
      Storage: [],
      Storagelist: [],
      params: {
        params: {
          userId: ""
        }
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
        { text: "船舶", value: 0 }
        // { text: "MMSI", value: 1 },
        // { text: "港口", value: 2 }
      ],
      tite: "请输入中英文船名/MMSI",
      //        武汉金纬度：113.41  29.58
      //  北京经纬度：115.25  39.26

      center: { lng: 114.29, lat: 30.53621 }, // 初始中心点设置

      centertwo: { lng: 114.29, lat: 30.53621 }, // 初始中心点设置
      zoom: 18, //     初始缩放等级
      maxZoom1: 10, // 点集合
      maxZoom2: 10, // 点集合


      quyuMMSI:'',

      sample: true,
      active: false,

      token: "",
      QWERTY: "",

      Reptilesingleship: "",
      Reptilesingleshipshow: false,

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
      Initialship: [],

      huolist: "", //  货总数据
      huolists: [],
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

      Detailedcargo: -1,

      goodsbox: -1,

      goodsboxbox: -1,
      Regionalvesselshide: true,

      focusing: false,

      Viewbar: true,

      Secondaryneighborhoodlist: [],

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



      //  附近船源
      searchs: {
        pageSize: 83,
          pageNum: 1,
        params: {
          lonLat: "118.767413,32.041544",
          //    lonLat:"",
          distance: "40",
          type: 1
        }
      },

      //  附近货源
      searchhuo: {
        pageSize: 80,
          pageNum: 1,
        params: {
          lonLat: "118.767413,32.041544",
          //    lonLat:"",
          distance: "40",
          type: 2
        }
      },


      //  初始港口
      searchgang: {
        params: {
          pageSize: "10",
          pageNum: "1",
          lonLat: "118.767413,32.041544",
          distance: "3000",
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
      msg: "",
      // sizis:{
      //   Size:130
      // },
      style: [
        // {sizi:500},
        // {textColor:red},
      ],
      Externalvessels: [],

      qianmiantiaozhuan: {
        lng: "",
        log: ""
      },

      goodsboxsss: true
    };
  },

  created() {
    
    var sum =  JSON.parse(window.localStorage.getItem("position"));
     this.center.lng = sum.longitude+0.0121480452;
     this.center.lat = sum.latitude+0.0033722;

     this.centertwo.lng = sum.longitude+0.0121480452;
     this.centertwo.lat = sum.latitude+0.0033722;


    this.userType = JSON.parse(localStorage.getItem("userLoginInfo")).userType;
    // console.log(this.userType,1234456);
    // var sum  =

    this.qianmiantiaozhuan.lng = this.$router.history.current.query.longitude;

    this.qianmiantiaozhuan.log = this.$router.history.current.query.latitude;

    // console.log(this.qianmiantiaozhuan.lng>0);

    if (this.qianmiantiaozhuan.lng > 0) {
      // console.log(11111111);

      this.center.lng = this.qianmiantiaozhuan.lng;

      this.center.lat = this.qianmiantiaozhuan.log;

      this.zoom = 16;
    }

    if (this.userType == 2) {
      this.Regionalvesselshide = false;
    }

    // this.goodss();
    this.token = localStorage.getItem("token");
    this.xioxmh = "2";
  },

  methods: {
    // handler({ BMap, map }) {},

    // handler ({BMap, map}) {
    //  加
    add() {
      if (this.zoom < 19) {
        this.zoom++;
      }
    },

    //  减
    reduce() {
      if (this.zoom > 4) {
        this.zoom--;
      }
    },

    //  港口
    Port() {
      this.Portimg = true;
      this.goodsimg = false;
      this.orderimg = false;
      this.Regionalvesselsimg = false;

      this.QWERTY = "码头";
      console.log(this.QWERTY);

      // this.nearby.center.lng = "118.767413";
      this.nearby.center.lng = this.center.lng;

      // this.nearby.center.lat = "32.041544";
      this.nearby.center.lat = this.center.lat;

      this.zoom = 12;

      this.radius = 1000000;
      this.huo = [];
      this.Initialship = [] 
      // console.log(this.center);
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
      this.search.params.lonLat = lng + "," + lat;
      if (this.zoom < 15) {
        this.sample = true;
      }

      if (this.zoom > 15) {
        this.sample = false;
      }

      //   中心点接口
    },

    // 区域船只
    // 上下中心点+0.1      // 左右中心点+0.006    得到地图手机视图四个角坐标
    Regionalvessels() {
      // this.$refs.Regionalvesselsp.style.color = '#0470dc'
      this.Regionalvesselsimg = true;

      this.Portimg = false;
      this.goodsimg = false;
      this.orderimg = false;

      this.goodsbox = -1;
      this.hide = false;
      this.flag = -1;
      // console.log(Math.random()+0.1);
      this.token = localStorage.getItem("token");
      this.waibuchuan = [];
      this.sample = false;
      //  左边
      // console.log(this.center);
      var left = this.center.lng + 0.006;
      var right = this.center.lng - 0.006;
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
      Regionalvessels(str, this.token).then(res => {
        // console.log(res,2222);
        var akoal = JSON.parse(res.data.data);
        var zpzpzpz = akoal.ships.ship;
        this.Externalvessels = zpzpzpz;

        console.log(this.Externalvessels, 111111111111111);

        //  this.Externalvessels.forEach(element => {
        //       this.Externalvessels.lo = element.lo + 0.0121480452
        //       this.Externalvessels.la = element.lo + 0.0033722
        //  })

        //  zpzpzpz.forEach(element => {
        //     var qski = {};
        //     qski.lng = element.lo+ 0.0121480452;
        //     qski.lat = element.la+ 0.0033722;
        //     this.waibuchuan.push(qski);
        //   });
        //   console.log(this.waibuchuan,222222222222222);

        // for(var i =0 ; i  = this.Externalvessels.length ; i++){
        //  this.Externalvessels[i].lo = this.Externalvessels[i].lo + 0.0121480452
        //  this.Externalvessels[i].la = this.Externalvessels[i].la + 0.0033722
        // console.log(this.Externalvessels[i]);

        // }
        // +0.0121480452

        // +0.0033722

        // console.log(this.Externalvessels,2222222222);

        //  console.log(this.Externalvessels,22222222222);

        // console.log(this.Externalvessels,22222);
        if (zpzpzpz == undefined) {
          this.$toast("该区域无船只信息，请移动中心坐标点");
          return false;
        }

        this.QWERTY = 0

        this.trajectorydinate = []

        this.huo = []
        this.Initialship= []

        this.center.lng = this.Externalvessels[0].lo;
        this.center.lat = this.Externalvessels[0].la;
        this.zoom = 13;
      });
    },

    // 附近货源
    goods() {
      
      this.huo = [];
      this.goodsbox = 1;

      this.goodsimg = true;
      this.Portimg = false;
      this.orderimg = false;
      this.Regionalvesselsimg = false;
      this.goodsbox = -1;
      this.hide = false;
      this.flag = -1;

      this.Externalvessels = []
      if (this.userType == 3 || this.userType == 8) {
        this.searchhuo.params.lonLat = this.center.lng + "," + this.center.lat;
        console.log(this.searchhuo);

        rinitialposition(this.searchhuo, this.token).then(response => {
          console.log(response, "附近货源");

          if (response.data.data.list.length < 1) {
            this.$toast(`附近无货物信息，请移动中心坐标点`);
            return;
          }

          this.QWERTY = 0

          this.Initialship = [];

           this.trajectorydinate = []

          this.huo = [];
          this.huolist = response.data.data.list[0];
          var qqq = response.data.data.list;

          this.huolists = response.data.data.list;
          this.Secondaryneighborhoodlist = response.data.data.list;
          qqq.forEach(element => {
            var obx = {};
            obx.lng = element.lon;
            obx.lat = element.lat;
            this.huo.push(obx);
          });

          console.log(this.huo);

          this.center.lng = this.huo[0].lng;
          this.center.lat = this.huo[0].lat;

          this.zoom = 11;

          var sum = this.huo.length;

          this.showhuo = true;

          this.$toast(`您附近有${sum}条货源,已定位到货物位置`);
          // this.$toast("");
        });
      }

      if (this.userType == 2) {
        this.huolists = [];
        console.log("船");

        this.searchs.params.lonLat = this.center.lng + "," + this.center.lat;
        // console.log(this.searchhuo);

        rinitialposition(this.searchs, this.token).then(response => {
          console.log("找船接口");
          console.log(response, "船信息");

          if (response.data.data.list.length < 1) {
            this.$toast(`附近无船只信息，请移动中心坐标点`);
            return;
          }

          this.QWERTY = 0


          this.Initialship = []
         
          this.trajectorydinate = []
          this.huo = [];
          this.huolist = response.data.data.list[0];
          var qqq = response.data.data.list;

          this.huolists = response.data.data.list;
          this.Secondaryneighborhoodlist = response.data.data.list;
          qqq.forEach(element => {
            var obx = {};
            obx.lng = element.lon;
            obx.lat = element.lat;
            this.Initialship.push(obx);
          });

          console.log(this.huo);

          this.center.lng = this.Initialship[0].lng;
          this.center.lat = this.Initialship[0].lat;

          this.zoom = 11;

          var sum = this.huolists.length;

          this.showhuo = true;

          this.$toast(`您附近有${sum}条船源，已定位到船只位置`);

          console.log(this.huolists, 888888);

          // this.$toast("已定位到船只位置");
        });
      }

      // if (this.userType == 2) {
      //   this.searchhuo.params.lonLat = this.center.lng + "," + this.center.lat;
      //   console.log("货搜船");
      //   rinitialposition(this.searchs, this.token).then(response => {
      //     if (response.data.data.list.length < 1) {
      //       this.$toast(`附近无船只信息，请移动中心坐标点`);
      //       return;
      //     }
      //     // console.log(response, "附近船源");
      //     this.huo = [];
      //     this.huolist = response.data.data.list[0];
      //     var qqq = response.data.data.list;

      //     this.huolists = response.data.data.list;
      //     qqq.forEach(element => {
      //       var obx = {};
      //       obx.lng = element.lon;
      //       obx.lat = element.lat;
      //       this.Initialship.push(obx);
      //     });

      //     this.center.lng = this.Initialship[0].lng;
      //     this.center.lat = this.Initialship[0].lat;

      //     this.zoom = 14;

      //     var sum = this.Initialship.length;

      //     this.showhuo = true;

      //     this.$toast(`您附近有${sum}条船`);
      //   });
      // }
    },

    order() {

      this.radius = 0
      this.QWERTY = 0
      console.log("我的订单");
      this.orderimg = true;
      this.Portimg = false;
      this.goodsimg = false;
      this.Regionalvesselsimg = false;

      this.goodsbox = -1;
      this.flagone = -1;
      var sum = JSON.parse(localStorage.getItem("userLoginInfo")).userType;

      var id = JSON.parse(localStorage.getItem("userLoginInfo")).user_id;

      this.params.params.userId = id;

      this.token = localStorage.getItem("token");
      //  console.log(this.params);

      if (sum == 2) {
        console.log(1111111111);
        Orderpulldowngoods(this.params, this.token).then(res => {
          if (res.data.data.list.length <= 0) {
            this.$toast("无当前船只交易订单");

            return false;
          }
         
         this.Initialship = [] 
         
         this.huo = [];


           this.trajectorydinate = []

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
          // shipOrderDTOList[0].createTime
          this.Orderlist = res.data.data.list;
          for (var i in res.data.data.list) {
            var date = new Date(
              res.data.data.list[i].shipOrderDTOList[0].createTime
            );
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.Orderlist[i].shipOrderDTOList[0].createTime =
              Y + M + D + h + m + s;
          }
          this.hide = !this.hide;
          // }
        });
      }

      if (sum == 3) {
        Orderpulldown(this.params, this.token).then(res => {
          console.log(res, 11111111);

          if (res.data.data.list.length <= 0) {
            this.$toast("无当前货只交易订单");

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
    goodss() {
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
      // if (sum == 2) {
      //   rinitialposition(this.searchs, this.token).then(response => {
      //     console.log(response);
      //     var sss = response.data.data.list;
      //     this.list = sss[0];
      //     // var obj = {};
      //     sss.forEach(element => {
      //       var obj = {};
      //       obj.lng = element.lon;
      //       obj.lat = element.lat;
      //       this.sum.push(obj);
      //     });

      //     this.quyu = sss[0].address;
      //     this.content = this.sum.length;
      //   });
      // }

      // 附近货坐标
      // if (sum == 3) {
      //   rinitialposition(this.searchhuo, this.token).then(response => {
      //     this.huolist = response.data.data.list[0];
      //     var qqq = response.data.data.list;
      //     // var obx = {};
      //     qqq.forEach(element => {
      //       var obx = {};
      //       obx.lng = element.lon;
      //       obx.lat = element.lat;
      //       this.huo.push(obx);
      //     });
      //   });
      // }
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

    draw ({el, BMap, map}) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },

    //    坐标点提示框
    infoWindowClose() {
      this.show = false;
    },

    infoWindowClosehuo(e) {
      this.showhuo = false;
    },

    infoWindowOpen(e) {
      this.show = true;
    },

    infoWindow(item) {
      console.log(this.huolists);

      // return

      console.log(item, 22222222);

      this.goodsboxbox = 2;

      // console.log(this.huolists,11111111);

      // console.log(item,222222222);

      var sumhuo = [];

      this.huolists.forEach(element => {
        if (item.lng == element.lon) {
          console.log(888888888888888);
          sumhuo.push(element);
        }
      });
      // console.log(sumhuo);
      // this.huolists = []
      this.huolists = sumhuo;

      console.log(this.huolists);

      // rinitialposition(this.searchhuo,this.token).then(res =>{
      //     this.huolists = res.data.data.list;
      // })

      // console.log(this.huolists.length);
    },
    // Secondaryneighborhoodlist
    goodsinformation() {
      this.goodsboxbox = -1;
      this.huolists = this.Secondaryneighborhoodlist;
      //   rinitialposition(this.searchhuo,this.token).then(res =>{
      //     this.huolists = res.data.data.list;
      //     console.log("重置huolists");

      // })
      this.$toast("数据列表已关闭");
    },

    Reptilesingle() {
      this.goodsbox = -1;
    },

    //    点击详情跳转
    details() {
      this.goodsbox = 1;
      this.showhuo = false;
      console.log(this.huolists);
    },

    // 跳转首页去

    home() {
      this.$router.push({ path: "/index/home" });
    },

    infoWindowOpenpc(item,e) {
      console.log(item,"区域搜船");
      console.log(e);
      this.Reptilesingleshipshow = true;
      this.Reptilesingleship = item;
      //  this.$toast("已关闭");
      console.log(item.m,"区域搜船MMSI");
      this.quyuMMSI = item.m
    },

    ReptilesingleshipClose() {
      
      this.Reptilesingleshipshow = false;
       this.trajectorydinate = []
      this.$toast("详情已关闭");
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
         
         this.Reptilesingleshipshow  = false

          var obj = {};
          this.Historicalrecordshow = -1;
          if (solam.ships.ship === undefined) {
            this.$toast("无当前船只信息");
            //  console.log(11111111111111111);
            this.value = "";
            this.focusing = false;
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
          this.focusing = false;

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
            this.value = "";
            this.focusing = false;
            return false;
          }

          obj.lng = solam.ships.ship.lo;
          obj.lat = solam.ships.ship.la;
          this.Searchforships.push(obj);
          // console.log(this.Searchforships.length);
          this.focusing = false;

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
      console.log("离开");
      this.Viewbar = true;
      // console.log(this.value);
    },

    // iiiiii(){
    //   console.log("下拉");
    //   this.xialabox=-1
    //   this.Historicalrecordshow=-1
    // },

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
      this.focusing = false;
      localStorage.removeItem("lastname");
    },

    focus() {
      console.log("聚集");
      this.Viewbar = false;
      this.focusing = true;
      this.flag = -1;
      this.hide = false;
      if (this.Storagelist.length > 0) {
        this.Emptyhistorybox = -1;
      }

      this.Historicalrecordshow = 1;

      this.xialabox = 1;
      //  console.log(87456);

      var sum = window.localStorage.getItem("lastname");

      console.log(sum);
      var arr = sum.split(",");
      console.log(arr, 8888888888888);

      // console.log(arr.length);

      this.Storagelist = arr;

      console.log(this.Storagelist, 11111);
    },

    changeyy(index) {
      // console.log(index);

      if (this.userType == 3) {
        // ---------订单船-----------
        this.hide = false;
        this.flag = index;
        console.log(this.flag);
        this.Ordertexecoordinate = [];
        this.Ordertexe = [];
        this.Ordertexe = this.Orderlist[index];
        console.log(this.Ordertexe, 11111111111111);
        this.OrderOrderlist = [];
        var num1 = this.Ordertexe.shipOrderDTO.currentAddressHistoryDTO
          .longitude;
        var num2 = this.Ordertexe.shipOrderDTO.currentAddressHistoryDTO
          .latitude;
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
      }

      //  ---------订单货-----------
      if (this.userType == 2) {
        this.hide = false;
        this.flag = index;
        console.log(this.flag);
        this.Ordertexecoordinate = [];
        this.Ordertexe = [];
        this.Ordertexe = this.Orderlist[index];
        console.log(this.Ordertexe, 888888888888);

        this.OrderOrderlist = [];
        var num1 = this.Ordertexe.shipOrderDTOList[0].currentAddressHistoryDTO
          .longitude;
        var num2 = this.Ordertexe.shipOrderDTOList[0].currentAddressHistoryDTO
          .latitude;
        var obj = {};
        obj.lng = num1;
        obj.lat = num2;
        this.Ordertexecoordinate.push(obj);

        console.log(this.Ordertexecoordinate);

        this.center.lng = this.Ordertexecoordinate[0].lng;
        this.center.lat = this.Ordertexecoordinate[0].lat;

        this.zoom = 13;
        console.log(this.center);

        this.mmsi = this.Ordertexe.shipOrderDTOList[0].shipInfoDTO.shipMmsi;
      }
    },

       //  订单弹出框打电话
    diagdanhezi(){
      console.log("订单盒子");
      // console.log(this.Ordertexe.goodsOrderDTO.endAddressHistoryDTO.mobilePhone:Ordertexe.shipOrderDTOList[0].endAddressHistoryDtoList[0].mobilePhone);
      var phone = this.userType==3?this.Ordertexe.goodsOrderDTO.endAddressHistoryDTO.mobilePhone:this.Ordertexe.shipOrderDTOList[0].endAddressHistoryDtoList[0].mobilePhone
      
       this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `是否联系:${phone}`
        }).then(()=>{
          window.location.href = `tel:${phone}`;
        })
      
    },

    Clickongoods(index) {
      this.Detailedcargo = index;

      var sum = this.huolists[index];

      // return;
      if (this.userType == 3 || this.userType == 8) {
        this.$router.push({
          path: "/cargoRecommendDetails",
          // 数组传到跳转路由页面
          query: {
            id: sum.id,
            whether: "false",
            userId: sum.id
          }
        });
        this.$toast("已跳转货物详情");
      }

      if (this.userType == 2) {
        this.$router.push({
          path: "/shipDetail",
          // 数组传到跳转路由页面
          query: {
            id: sum.id,
            whether: "false",
            userId: sum.id
          }
        });
        this.$toast("已跳转船只详情");
      }

      this.goodsbox = -1;

      console.log(sum);

      // this.goodsbox=-1
    },

    quyuguiji(){
      this.trajectorydinate = []
         console.log("区域轨迹");
              Shiptrajectory(this.quyuMMSI, this.token).then(res => {
        console.log(res);

        if (res.data.code == 200) {
          console.log("区域轨迹接口");
          var sum = JSON.parse(res.data.data);

          if (sum.ships.ship == undefined) {
            // console.log('undefined');
            this.$toast("无当前船无轨迹");
            return;
          }

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

    // 轨迹
    trajectory() {
      this.hide = false;
      this.trajectorydinate = [];
      Shiptrajectory(this.mmsi, this.token).then(res => {
        console.log(res);

        if (res.data.code == 200) {
          var sum = JSON.parse(res.data.data);

          if (sum.ships.ship == undefined) {
            // console.log('undefined');
            this.$toast("无当前船无轨迹");
            return;
          }

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
      this.hide = false;
      console.log(11111111);
      this.goodsbox = -1;
      this.Historicalrecordshow = -1;
      this.Emptyhistory = 1;
      // this.flagone = -1;
      // this.flag = -1;
      this.xialabox = -1;
      this.value = "";
      this.SearchboxL = [];
      // this.goodsboxbox = -1;

      // this.Reptilesingleshipshow = false   // 区域船只信息

      // if(this.goodsboxbox == -1) {
      //   this.huolists = this.Secondaryneighborhoodlist;
      // }

    },

    Currentpositioning() {
      this.center.lng = this.centertwo.lng;
      this.center.lat = this.centertwo.lat;
      this.zoom = 18;
      this.$toast("已定位到当前位置");
    },

    cancel() {
      this.Historicalrecordshow = -1;
      this.xialabox = -1;
      this.value = "";
      this.focusing = false;
    },

    ReptilesingleshipClosedingdan() {
      this.flag = -1;
      this.$toast("订单详情已关闭");
    },

    ReptilesingleshipClosesousuo() {
      this.flagone = -1;

      this.$toast("搜索船只已关闭");
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
  // }
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  // background-color:rgba(255,0,0,0.3);
  // text-align: left;
  // background-color: #f5f2f0
}

.my {
  width: 100%;
  height: 100%;
  // background-color: red;
  // opacity:0.5;
  // position: absolute;
  // bottom: 0px;
}

.bm-control {
  // width: 95%;
  // height: 40px;
  width: 100%;
  z-index: 9999999;
  // padding: 0px 0.2rem;
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
    // color:#000000
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
  // padding: ;
}

.qaoalmqn {
  height: 0.9rem;
  line-height: 0.9rem;
  background-color: #ffffff;
  text-align: center;
}

.qaoalmqnggg {
  height: 0.9rem;
  line-height: 1.1rem;
  background-color: #ffffff;
  text-align: center;
}

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

  // padding-left: 0.5rem
  // width: ;
  // border:
  // box-sizing: border-box
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
  background-image: linear-gradient(#0470dc, #73b3ec);
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
  color: rgba(4, 112, 220, 1);
}

.bluesss {
  color: #0470dc;
}

.gray {
  color: #000000;
}

.Nearbysourcelistdisplay {
  // overflow: hidden;
  height: 5.48rem;
  width: 4rem;
  background-color: #ffffff;
  // overflow: auto;
  overflow-y: scroll;
  border-radius: 12px;
  position: relative;
  margin-top: 3rem;
  margin-left: 1.6rem;
  -webkit-overflow-scrolling: touch;
  // text-align: center;
  // white-space: nowrap
  // position: absolute;
  // right: 2rem;
  
 
  
}

</style>