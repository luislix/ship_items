<template>
    <div id="issueShip">
        <Header ></Header>
        <div class="content">
            <div class="form">
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                @click="selectShipInfo"
                                v-model="shipInfo.shipName"
                                readonly="readonly"
                                rows="1"
                                autosize
                                label="船舶名称"
                                type="textarea"
                                input-align="right"
                                placeholder="请输入船舶名称"
                            />
                            </van-cell-group>
                        </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                v-model="shipInfo.userName"
                                rows="1"
                                autosize
                                label="联系人"
                                type="text"
                                input-align="right"
                                placeholder="请输入联系人"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                v-model="shipInfo.mobilePhone"
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
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                v-model="shipInfo.cleanShipTime"
                                rows="1"
                                autosize
                                label="空船时间"
                                input-align="right"
                                type="textarea"
                                placeholder="请输入空船时间"
                                readonly="readonly"
                                @click.stop="showTime=!showTime"
                            />
                            </van-cell-group>
                        </van-col>
                </van-row>
                <!-- <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                @click.stop="showCurrentAddress=!showCurrentAddress"
                                v-model="shipInfo.currentAddress"
                                rows="1"
                                autosize
                                label="船舶当前地"
                                input-align="right"
                                type="textarea"
                                readonly="readonly"
                                placeholder="请选择当前地址"
                            />
                            </van-cell-group>
                        </van-col>
                </van-row> -->
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                @click.stop="showAddressStart=!showAddressStart"
                                v-model="shipInfo.origin"
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
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                                @click.stop="showAddressEnd=!showAddressEnd"
                                v-model="shipInfo.destination"
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
                    <van-col span="7" style="margin: 0.1rem 0 0.1rem 0;">
                        备注(选填)
                    </van-col>
                </van-row>
                <van-row>
                    <van-cell-group>
                    <van-field
                        v-model="shipInfo.remark"
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
            <div class="contract">
                <van-row>
                    <van-col span="8">
                        <van-checkbox v-model="checked">
                          <van-col>合同服务</van-col>
                          <van-col style="font-size:16px;margin-left:.2rem;" @click.stop="serviceTip"><van-icon name="question-o"/></van-col>
                        </van-checkbox>
                    </van-col>
                </van-row>
            </div>
            <div class="warning">
                <van-row>
                    <van-col><span class="warningIcon">*&nbsp;&nbsp;</span>因本平台注重订单时效性，您发布的订单如果在一个月内未成单，系统将删除该订单！</van-col>
                </van-row>
            </div>
            <van-row class="btn">
                <van-button v-if="$route.query.jumpStatus=='edit'" type="info" @click="releaseShips">修改船源</van-button>
                <van-button v-else type="info" @click="releaseShips">发布船源</van-button>
            </van-row>
        </div>
        <!-- 选择船舶 -->
        <van-popup
            v-model="selectShip"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-picker show-toolbar :columns="emptyShipList"  @cancel="selectShip=false" @confirm="checkShip"/>
        </van-popup>
        <!-- 时间 -->
        <van-popup
            v-model="showTime"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-datetime-picker
                @cancel="showTime=false"
                @confirm="confirmPicker"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                />
        </van-popup>
        <!-- 当前地址 -->
        <van-popup
            v-model="showCurrentAddress"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-area 
                @cancel="showCurrentAddress=false"
                @confirm="pickerCurrentAddress"
                :area-list="areaList" />
        </van-popup>
        <!-- 开始地址 -->
        <van-popup
            v-model="showAddressStart"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-area 
                @cancel="showAddressStart=false"
                @confirm="pickerStartAddress"
                :area-list="areaList" />
        </van-popup>
        <!--结束地址 -->
        <van-popup
            v-model="showAddressEnd"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-area 
                @cancel="showAddressEnd=false"
                @confirm="pickerEndAddress"
                :area-list="areaList" />
        </van-popup>
    </div>
</template>

<script>
import {
  addEmptyShipOrder,
  getEmptyShipList,
  getShipsDetails,
  editEmptyShipOrder
} from "@/api/index";
import Header from "@/components/Header.vue";
import { address } from "@/mixin/address";
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  name: "issueShip",
  mixins: [address],
  data() {
    return {
      shipInfo: {
        shipName: "",
        emptyShipOrderId: null,
        linkMan: "",
        mobilePhone: "",
        cleanShipTime: "",
        currentAddress: "", //当前地
        origin: "",
        destination: "",
        remark: "" // 备注（选填）
      },
      shipData: {
        shipInfoId: "", //船舶信息ID,
        startTime: +new Date(), //开始时间、
        endTime: +new Date(), //结束时间、（必填）、
        emptyShipOrderId: null,
        // 当前地址
        // currentAddressHistoryDTO: {
        //   provinceName: "",
        //   cityName: "",
        //   longitude: "",
        //   latitude: "",
        //   addressDetails: ""
        // },
        //始发地信息（多选）
        startAddress:'',
        
        // startAddressHistoryDtoList: [
        //   {
        //     provinceName: "",
        //     cityName: "",
        //     longitude: "",
        //     latitude: "",
        //     addressDetails: ""
        //   }
        // ],
        //目的地
        endAddress:'',

        // endAddressHistoryDtoList: [
        //   {
        //     provinceName: "",
        //     cityName: "",
        //     longitude: "",
        //     latitude: "",
        //     addressDetails: ""
        //   }
        // ],
        userName:'',
        mobilePhone:'',
        startLonLat:'',
        endLonLat:'',
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
      showTime: false, //时间弹框
      showCurrentAddress: false, //当前地址弹框
      showAddressStart: false, //开始地址弹框
      showAddressEnd: false, //结束地址弹框
      checked: true,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      emptyShipListId: [] //船只列表
    };
  },
  created() {
    if (this.$route.query.jumpStatus == "edit") {
      this.$route.meta.title = "修改船源信息";
      let shipInfo = this.$route.query.item;
      console.log(shipInfo)
      this.shipInfo = {
        shipName:shipInfo.shipInfoDTO&&shipInfo.shipInfoDTO.shipEnglishName?shipInfo.shipInfoDTO.shipEnglishName:shipInfo.shipInfoDTO?shipInfo.shipInfoDTO.shipName:"",
        emptyShipOrderId: null,
        userName: shipInfo.userName,
        mobilePhone: shipInfo.mobilePhone,
        cleanShipTime: this.$tools.formatTime(shipInfo.startTime)||'',
        // currentAddress:
        // shipInfo.currentAddressHistoryDTO.portName +
        // shipInfo.currentAddressHistoryDTO.cityName, //当前地
        // origin:
        //   shipInfo.startAddressHistoryDtoList[0].provinceName +
        //   shipInfo.startAddressHistoryDtoList[0].cityName,
        // destination:
        //   shipInfo.endAddressHistoryDtoList[0].provinceName ==
        //   shipInfo.endAddressHistoryDtoList[0].cityName
        //     ? shipInfo.startAddressHistoryDtoList[0].provinceName
        //     : shipInfo.endAddressHistoryDtoList[0].provinceName +
        //       shipInfo.endAddressHistoryDtoList[0].cityName,
        origin:
          shipInfo.startAddress,
        destination:
          shipInfo.endAddress,
        remark: shipInfo.remark || "" // 备注（选填）
      };
      this.shipData=shipInfo;
      this.getShipsDetails();
    } else {
      this.$route.meta.title = "船源信息";
    }
    this.getEmptyShipList(this.pageData, localStorage.getItem("token"));
  },
  methods: {
    // 获取空船信息
    getShipsDetails(){
      getShipsDetails(this.$route.query.item.emptyShipOrderId,localStorage.getItem('token')).then(res=>{
        console.log(res)
      })
    },
    // pageNum默认为1、pageSize默认为10，sidx默认为create_time，sord默认为desc，如果不填，则使用默认值
    getEmptyShipList(pageData, token) {
      getEmptyShipList(pageData, token).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.emptyShipList = res.data.data.list.map(item => {
            return item.shipEnglishName;
          });
          this.emptyShipListId = res.data.data.list.map(item => {
            return item.shipInfoId;
          });
        }
        console.log(this.emptyShipList);
        console.log(this.emptyShipListId);
      });
    },
    // 选择时间
    confirmPicker(value) {
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
      this.shipInfo.cleanShipTime = timer;
      this.showTime = false;
    },
    // 选择当前地
    pickerCurrentAddress(value) {
      console.log("当前地址", value);
      this.shipInfo.currentAddress = "";
      value.forEach((item, index) => {
        this.shipInfo.currentAddress += item.name;
      });
      (this.shipData.currentAddressHistoryDTO = {
        provinceName: value[0].name,
        cityName: value[1].name,
        longitude: value[2].lonAndLat.lon,
        latitude: value[2].lonAndLat.lat,
        addressDetails: ""
      }),
      this.showCurrentAddress = false;
    },
    // 选择开始地址
    pickerStartAddress(value) {
      this.shipData.startAddress=value[1].name + value[2].name;
      this.shipData.startLonLat = `${value[2].lonAndLat.lon},${value[2].lonAndLat.lat}`;
      console.log(this.shipData.startAddress);
      console.log(this.shipData.startLonLat);
      console.log("开始地址", value);
      this.shipInfo.origin = "";
      value.forEach((item, index) => {
        this.shipInfo.origin += item.name;
      });
      // (this.shipData.startAddressHistoryDtoList[0] = {
      //   provinceName: value[0].name,
      //   cityName: value[1].name,
      //   longitude: value[2].lonAndLat.lon,
      //   latitude: value[2].lonAndLat.lat,
      //   addressDetails: ""
      // }),
      this.showAddressStart = false;
    },
    // 选择结束地址
    pickerEndAddress(value) {
      this.shipData.endAddress=value[1].name + value[2].name;
      this.shipData.endLonLat = `${value[2].lonAndLat.lon},${value[2].lonAndLat.lat}`;
      console.log(this.shipData.endAddress);
      console.log(this.shipData.endLonLat);


      this.shipInfo.destination = "";
      value.forEach((item, index) => {
        this.shipInfo.destination += item.name;
      });
      // this.shipData.endAddressHistoryDtoList[0] = {
      //   provinceName: value[0].name,
      //   cityName: value[1].name,
      //   longitude: value[2].lonAndLat.lon,
      //   latitude: value[2].lonAndLat.lat,
      //   addressDetails: ""
      // };
      console.log(this.shipData);
      this.showAddressEnd = false;
    },
    // 发布船只
    releaseShips() {
      //  this.shipData.currentAddressHistoryDTO = this.shipData.startAddressHistoryDtoList[0];
      if (this.$route.query.jumpStatus == "edit") {
        let orderInfo = this.$route.query.item;
        orderInfo.userId = JSON.parse(
          localStorage.getItem("userLoginInfo")
        ).user_id;
        orderInfo.remark=this.shipInfo.remark;
        this.shipData.remark = this.shipInfo.remark;
        this.shipData.mobilePhone=this.shipInfo.mobilePhone;
        this.shipData.userName = this.shipInfo.userName;
        this.shipData.modifyTime = +new Date();
        editEmptyShipOrder(this.shipData, localStorage.getItem("token")).then(
          res => {
            console.log(res);
            this.$toast.loading({
                message:'加载中...',
                forbidClick:true
            })
            if(res.data.code==200){
                this.$toast('修改成功');
                this.$router.push({path:'/myIssue'})
            } else {
                this.$toast(res.data.message)
            };
            orderInfo='';
          }
        );
      } else {
        if (this.shipInfo.shipName == "") {
          return this.$toast("请输入船舶名称");
        }
        if (this.shipInfo.userName == "") {
          return this.$toast("请输入联系人");
        }
        if (!/^[1][3-8][0-9]{9}$/.test(this.shipInfo.mobilePhone.trim())) {
          return this.$toast("请填写有效的手机号码");
        }
        if (
          this.shipInfo.cleanShipTime == "" ||
          this.shipInfo.origin == "" ||
          this.shipInfo.destination == ""
        ) {
          return this.$toast("请将信息填写完整");
        }
        if(this.checked){
          this.shipData.whetherCheck = 1;
        };
        this.shipData.userName = this.shipInfo.userName;
        this.shipData.mobilePhone = this.shipInfo.mobilePhone;
        this.shipData.remark = this.shipInfo.remark;
        console.log(this.shipData)
        addEmptyShipOrder(this.shipData, localStorage.getItem("token")).then(
          res => {
            console.log(res);
            this.$toast.loading({
              message: "加载中...",
              forbidClick: true
            });
            if (res.data.code == 200) {
              let that = this;
              setTimeout(() => {
                that.$toast("添加成功");
                that.$router.go(-1);
              }, 1500);
            } else {
              this.$toast(res.data.message || "请稍后添加");
            };
          }
        );
      }
    },
    // 选择船舶弹框
    selectShipInfo() {
      if (this.emptyShipList.length == 0) {
        return Dialog.confirm({
          title: "嘟嘟船讯提醒您！",
          message: "您暂无空船，点击前往添加船只！"
        })
          .then(() => {
            this.$router.push("/addShip");
          })
          .catch(() => {});
      }
      this.selectShip = !this.selectShip;
      // this.$router.push({path:'/shipManagement',query:{jumpStatus:1}});
    },
    // 选择船舶
    checkShip(picker, value, index) {
      this.shipInfo.shipName = picker;
      this.shipData.shipInfoId = this.emptyShipListId[value];
      this.selectShip = !this.selectShip;
    },
    // 合同服务提示
    serviceTip(){
      this.$toast({
        message:'保障双方在此次交易过程中合法权益,勾选后会在订单流程中,提供合同签订服务。',
        duration:5000
      })
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
#issueShip {
  height: 100vh;
  background: #f5f5f5;
  .content {
    overflow: auto;
    height: 85vh;
    .form{
      .van-field__label{
        text-align: left;
      }
      [class*=van-hairline]::after{
        right: -40%;
        left: -40%;
      }
    }
    .remark {
      margin-top: 0.2rem;
      background: #fff;
      text-align: left;
      padding-left: 0.2rem;
      .remarkTitle {
        padding: 0.1rem;
      }
      
    }
    .contract {
      background: #fff;
      margin-top: 0.2rem;
      .van-row {
        // text-align: center;
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
    .van-checkbox__icon--checked .van-icon{
      background: radial-gradient(farthest-side at 0 0, #0B6EFF 0%, #68AAFF 100%);
    }
  }
}

</style>