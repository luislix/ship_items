<template>
  <div class="issueShip">
    <Header></Header>
    <div class="content" v-if="list.whether == 'false'">
      <div class="form">
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="shipInfo.contactsName"
                rows="1"
                autosize
                label="姓名"
                type="textarea"
                input-align="right"
                placeholder="请输入姓名"
              />
            </van-cell-group>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="shipInfo.tonnage"
                rows="1"
                autosize
                label="装载量(吨)"
                type="number"
                input-align="right"
                placeholder="请输入装载量"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="shipInfo.contactsPhone"
                rows="1"
                autosize
                label="联系电话"
                input-align="right"
                type="number"
                placeholder="请输入联系电话"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" @click="showtimeclick">
            <van-cell-group>
              <van-field
                v-model="shipInfo.startDate"
                rows="1"
                autosize
                label="开始时间"
                input-align="right"
                type="textarea"
                placeholder="请输入空船时间"
                readonly="readonly"
              />
            </van-cell-group>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="24" @click="showtimeendclick">
            <van-cell-group>
              <van-field
                v-model="shipInfo.endDate"
                rows="1"
                autosize
                label="结束时间"
                input-align="right"
                type="textarea"
                readonly="readonly"
                placeholder="请确认结束时间"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" @click="chooseStart">
            <van-cell-group>
              <van-field
                v-model="shipInfo.location"
                rows="1"
                autosize
                label="船舶始发地"
                input-align="right"
                type="textarea"
                readonly="readonly"
                placeholder="请选择始发地"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" @click="Destination">
            <van-cell-group>
              <van-field
                v-model="shipInfo.placeOfArrival"
                rows="1"
                autosize
                label="船舶目的地"
                input-align="right"
                type="textarea"
                readonly="readonly"
                placeholder="请选择目的地"
              />
            </van-cell-group>
          </van-col>
        </van-row>
      </div>
      <div class="remark">
        <van-row class="remarkTitle">
          <van-col span="7">备注(选填)</van-col>
        </van-row>
        <van-row>
          <van-cell-group>
            <van-field
              v-model="shipInfo.title"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="对货主我还有话要说"
              show-word-limit
            />
          </van-cell-group>
        </van-row>
      </div>

      <van-row class="btn">
        <van-button type="info" @click="Modifyreptile">发布货源</van-button>
      </van-row>
    </div>

    <!-- ---------------------------------- -->

    <div class="content" v-if="list.whether != 'false'">
        <van-row>
          <van-col span="24" @click="chooseStart">
            <van-cell-group>
              <van-field
                v-model="goodslist.cityName"
                rows="1"
                autosize
                label="船舶始发地"
                input-align="right"
                type="textarea"
                readonly="readonly"
                placeholder="请选择始发地"
              />
            </van-cell-group>
            </van-col>
         </van-row>

         <van-row>
          <van-col span="24" @click="Destination">
            <van-cell-group>
              <van-field
                v-model="goodslist.portName"
                rows="1"
                autosize
                label="船舶目的地"
                input-align="right"
                type="textarea"
                readonly="readonly"
                placeholder="请选择目的地"
              />
            </van-cell-group>
          </van-col>
        </van-row>


         <van-row>
          <van-col span="24" @click="showtimeclick">
            <van-cell-group>
              <van-field
                v-model="goodslist.loadingStartTime"
                rows="1"
                autosize
                label="装载时间"
                input-align="right"
                type="textarea"
                placeholder="请输入空船时间"
                readonly="readonly"
              />
            </van-cell-group>
          </van-col>
        </van-row>

               <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="goodslist.goodsName"
                rows="1"
                autosize
                label="货物名称"
                type="textarea"
                input-align="right"
                placeholder="请输入货物名称"
              />
            </van-cell-group>
          </van-col>
        </van-row>

               <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="goodslist.actualTotalWeight"
                rows="1"
                autosize
                label="货物总总量(吨)"
                type="textarea"
                input-align="right"
                placeholder="请输入货物总总量"
              />
            </van-cell-group>
          </van-col>
        </van-row>

               <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="goodslist.singlePrice"
                rows="1"
                autosize
                label="货物单价(选填)"
                type="textarea"
                input-align="right"
                placeholder="请输入货物单价"
              />
            </van-cell-group>
          </van-col>
        </van-row>

               <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="goodslist.totalPrice"
                rows="1"
                autosize
                label="货物总运价（选填）"
                type="textarea"
                input-align="right"
                placeholder="请输入货物总价"
              />
            </van-cell-group>
          </van-col>
        </van-row>

    <div class="remark">
        <van-row class="remarkTitle">
          <van-col span="7">备注(选填)</van-col>
        </van-row>
        <van-row>
          <van-cell-group>
            <van-field
              v-model="goodslist.remark"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="对货主我还有话要说"
              show-word-limit
            />
          </van-cell-group>
        </van-row>
      </div>

      <van-row class="btn">
        <van-button type="info" @click="Modifyreptile">发布货源</van-button>
      </van-row>



    </div>
    <!-- 选择始发地 -->

    <van-popup position="bottom" v-model="show">
      <van-area :area-list="areaList" @confirm="confirmStart" @cancel="cancelStart" value="110101" />
    </van-popup>

    <!-- 选择目的地 -->

    <van-popup position="bottom" v-model="showend">
      <van-area
        :area-list="areaList"
        @confirm="confirmStartend"
        @cancel="cancelStartend"
        value="110101"
      />
    </van-popup>

    <!-- 时间 -->
    <van-popup v-model="showTime" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        @cancel="showTime=false"
        @confirm="confirmPicker"
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <!-- --------------------结束时间--------------- -->
    <van-popup v-model="showTimeend" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        @cancel="showTime=false"
        @confirm="confirmPickerendend"
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { addEmptyShipOrder, getEmptyShipList } from "@/api/index";
import { ModifyreptileCargo } from "@/api/index";
import { Updatenormal } from "@/api/index";
import Header from "@/components/Header.vue";
import { address } from "@/mixin/address";
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import { Notify } from "vant";
export default {
  name: "issueShip",
  mixins: [address],
  data() {
    return {
      shipInfo: {
        // Parameters:{
        id: "",
        shipsName: "",
        contactsName: "",
        emptyShipOrderId: null,
        tonnage: "",
        contactsPhone: "",
        startDate: "",
        endDate: "", //当前地
        location: "",
        placeOfArrival: "",
        title: "" // 备注（选填）
        // }
      },

      goodslist:{
            goodsOrderId:'',
            startAddressId:'',  // 始发
            endAddressId:'',//最终
            loadingStartTime:'', // 装载时间
            goodsName:'', // 货物名称
            actualTotalWeight:'', //货物总总量
            singlePrice:'',  // 货物单价
            totalPrice:'', //货物总价
            remark:'',  //备注
            
      },
      show: false,
      showend: false,
      showTime: false, //时间弹框
      showTimeend: false,
      shipData: {
        shipInfoId: "", //船舶信息ID,
        startTime: +new Date(), //开始时间、
        endTime: +new Date(), //结束时间、（必填）、
        emptyShipOrderId: null,
        // 当前地址
        currentAddressHistoryDTO: {
          provinceName: "",
          cityName: "",
          longitude: "",
          latitude: "",
          addressDetails: ""
        },
        //始发地信息（多选）、
        startAddressHistoryDtoList: [
          {
            provinceName: "",
            cityName: "",
            longitude: "",
            latitude: "",
            addressDetails: ""
          }
        ],
        //目的地
        endAddressHistoryDtoList: [
          {
            provinceName: "",
            cityName: "",
            longitude: "",
            latitude: "",
            addressDetails: ""
          }
        ],
        remark: "" // 备注（可选）
      },
      pageData: {
        pageNum: 1,
        pageSize: 10,
        sidx: "create_time", //默认为create_time，
        sord: "desc" //默认为desc
      },
      emptyShipList: [],
      selectShip: false, //选择船只

      showCurrentAddress: false, //当前地址弹框
      showAddressStart: false, //开始地址弹框
      showAddressEnd: false, //结束地址弹框
      checked: true,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      emptyShipListId: [], //船只列表,
      list: []
    };
  },
  created() {

  
    this.list = this.$router.history.current.query.obj;
    
   if(this.list.whether == "false"){
    this.shipInfo.id = this.list.id;

    this.shipInfo.shipsName = this.list.shipsName;

    this.shipInfo.tonnage = this.list.tonnage;

    this.shipInfo.contactsPhone = this.list.contactsPhone;

    this.shipInfo.startDate = this.list.startDate;

    this.shipInfo.endDate = this.list.endDate;

    this.shipInfo.location = this.list.location;

    this.shipInfo.placeOfArrival = this.list.placeOfArrival;

    this.shipInfo.title = this.list.title;

    this.shipInfo.contactsName = this.list.contactsName;
    }

   if(this.list.whether != "false"){
       this.goodslist.goodsOrderId =  this.list.goodsOrderId
          // this.goodslist.cityName = this.list.startAddressHistoryDTO.cityName   // 始发地 id
          this.goodslist.startAddressId = this.list.startAddressId   // 始发地 id
          // this.goodslist.portName = this.list.endAddressHistoryDTO.portName // 目的地
          this.goodslist.endAddressId = this.list.endAddressId // 目的地
          this.goodslist.loadingStartTime = this.list.loadingStartTime // 装货日期
          this.goodslist.actualTotalWeight = this.list.actualTotalWeight // 货物名称
          this.goodslist.actualTotalWeight = this.list.actualTotalWeight // 货物总量

          this.goodslist.singlePrice = this.list.singlePrice // 货物单价
          this.goodslist.totalPrice = this.list.totalPrice // 货物总价
          this.goodslist.remark = this.list.remark // 备注
          
  }


  },
  methods: {
    Modifyreptile() {
    if(this.list.whether == "false"){
      if (this.shipInfo.contactsName == "") {
        Notify({ type: "warning", message: " 姓名不能为空" });
        return false;
      } else if (this.shipInfo.shipsName == "") {
        Notify({ type: "warning", message: "船舶名称不能为空" });
        return false;
      } else if (this.shipInfo.tonnage == "") {
        Notify({ type: "warning", message: "装载量不能为空" });
        return false;
      } else if (this.shipInfo.contactsPhone == "") {
        Notify({ type: "warning", message: "联系人不能为空" });
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.shipInfo.contactsPhone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
        return false;
      } else if (this.shipInfo.startDate == "") {
        Notify({ type: "warning", message: "开始时间不能为空" });
        return false;
      } else if (this.shipInfo.endDate == "") {
        Notify({ type: "warning", message: "结束时间不能为空" });
        return false;
      } else if (this.shipInfo.location == "") {
        Notify({ type: "warning", message: "始发地不能为空" });
        return false;
      } else if (this.shipInfo.placeOfArrival == "") {
        Notify({ type: "warning", message: "目的地不能为空" });
        return false;
      }
      }

      // 爬虫
      if (this.list.whether == "false") {
        ModifyreptileCargo(this.shipInfo, localStorage.getItem("token")).then(
          res => {
            // console.log(res);
            if (res.data.code == 200) {
              Notify({ type: "warning", message: "货物信息修改成功" });
              this.$router.push({ path: "/myIssue" });
            }
          }
        );
      }

      //   正常
      if (this.list.whether !== "false") {
        Updatenormal(this.goodslist, localStorage.getItem("token")).then(res => {
          console.log(res+'正常货');
          if (res.data.code == 200) {
            Notify({ type: "warning", message: "货物信息修改成功" });
            this.$router.push({ path: "/myIssue" });
          }
        });
      }
    },

    //   -----------------修改始发地---------------------
    chooseStart() {
      this.show = true;
    },

    cancelStart() {
      this.show = false;
    },

    confirmStart(value) {
      console.log(value);
      // this.value1 = value;
      this.shipInfo.location =
        value[0].lonAndLat.name +
        "-" +
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.show = false;
    },
    // --------------------------修改目的地----------------------------
    Destination() {
      this.showend = true;
    },

    cancelStartend() {
      this.showend = false;
    },

    confirmStartend(value) {
      console.log(value);
      // this.value1 = value;
      this.shipInfo.placeOfArrival =
        value[0].lonAndLat.name +
        "-" +
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.showend = false;
    },

    //   ---------------------开始时间----------------------------

    showtimeclick() {
      this.showTime = true;
    },

    confirmPicker(value) {
      // var value = value;
      console.log(value);
      this.shipData.startTime = +new Date(value);
      var m = value.getMonth() + 1;
      var d = value.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = value.getFullYear() + "-" + m + "-" + d;
      this.shipData.endTime = +new Date(
        value.getFullYear() + "-" + ++m + "-" + d
      );
      this.shipInfo.startDate = timer;
      this.showTime = false;
    },

    // --------------------------结束时间----------------------------

    showtimeendclick() {
      this.showTimeend = true;
    },

    confirmPickerendend(value) {
      // var value = value;
      console.log(value);
      this.shipData.startTime = +new Date(value);
      var m = value.getMonth() + 1;
      var d = value.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = value.getFullYear() + "-" + m + "-" + d;
      this.shipData.endTime = +new Date(
        value.getFullYear() + "-" + ++m + "-" + d
      );
      this.shipInfo.endDate = timer;
      this.showTimeend = false;
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.issueShip {
  height: 100vh;
  background: #f5f5f5;
  .content {
    overflow: auto;
    height: 85vh;
    .remark {
      margin-top: 0.2rem;
      background: #fff;
      .remarkTitle {
        padding: 0.25rem;
      }
    }
    .contract {
      background: #fff;
      margin-top: 0.2rem;
      .van-row {
        text-align: center;
        // height: .5rem;
        // line-height: .5rem;
        display: flex;
        justify-content: flex-start;
        padding: 0.2rem 0.3rem;
      }
    }
    .warning {
      padding: 0.5rem 0.2rem;
      text-align: left;
      .warningIcon {
        color: red;
      }
      .van-col {
        display: flex;
        justify-content: flex-start;
      }
    }
  }
}
</style>