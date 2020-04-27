<template>
  <div class="addShip">
    <myheader></myheader>
    <div class="form">
      <van-row v-for="(item, index) in shipInfo" :key="index" style="background: #fff;padding: 0 15px;">
        <van-col span="24">
          <van-cell-group>
            <van-field
              @click="addShipInfo(item)"
              v-model="item.val"
              rows="1"
              autosize
              :label="item.name"
              :disabled="item.disabled"
              label-width='100'
              type="textarea"
              input-align="right"
              :right-icon="item.name=='封舱设备'?'arrow':''"
              :placeholder="item.name=='封舱设备'?'请选择':'请输入' + item.placeholder"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <!-- <van-row class="waterGauge">
                <van-col span="8">水尺(多选)</van-col>
                <van-col span="16">
                    <van-checkbox-group v-model="result" ref="checkboxGroup" @change="checkGauge">
                        <van-checkbox name="0" shape="square">马钢水尺</van-checkbox>
                        <van-checkbox name="1" shape="square">武钢水尺</van-checkbox>
                        <van-checkbox name="2" shape="square">重钢水尺</van-checkbox>
                        <van-checkbox name="3" shape="square">船检所水尺</van-checkbox>
                    </van-checkbox-group>
                </van-col>
      </van-row>-->
      <van-row class="shipPapers" style="background: #fff;margin-top: 10px;">
        <van-row>
          <van-row>
            <van-col span="16" style="text-align: left;">船舶运营证包括封面前两页</van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <van-uploader
                v-model="img_one"
                multiple
                name="1"
                :max-count="1"
                :before-read="beforeRead"
                :after-read="uploadImg"
                capture
              />
            </van-col>
            <van-col span="12">
              <van-uploader
                v-model="img_two"
                multiple
                name="2"
                :max-count="1"
                :before-read="beforeRead"
                :after-read="uploadImg"
              />
            </van-col>
          </van-row>
        </van-row>
        <van-row>
          <van-row>
            <van-col span="16" style="text-align: left;">船舶所有人身份证正反面照</van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <van-uploader
                v-model="img_three"
                multiple
                name="3"
                :max-count="1"
                :before-read="beforeRead"
                :after-read="uploadImg"
                upload-text="身份证正面"
              />
            </van-col>
            <van-col span="12">
              <van-uploader
                v-model="img_four"
                multiple
                name="4"
                :max-count="1"
                :before-read="beforeRead"
                :after-read="uploadImg"
                upload-text="身份证反面"
              />
            </van-col>
          </van-row>
        </van-row>
      </van-row>
      <!-- 加载进度条 -->
      <!-- <van-circle
            v-show="loading"
            v-model="currentRate"
            :rate="rate"
            :speed="100"
            size="1.5rem"
            :text="text"
      />-->
    </div>
    <van-row class="btn">
      <van-button type="info" @click="addShip">
        {{
        $route.query.jumpStatus == 1 ? "修改船只" : "添加船只"
        }}
      </van-button>
    </van-row>
    <!-- 有无视频监控 -->
    <van-action-sheet
      v-model="isMonitoring"
      :actions="actions"
      cancel-text="取消"
      @cancel="isMonitoring = false"
      @select="select"
    ></van-action-sheet>
    <!-- 地址选择 -->
    <van-popup v-model="selectAddress" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList" @confirm="onChange" @cancel="selectAddress = !selectAddress" />
    </van-popup>
  </div>
</template>

<script>
import { addShipInfo, uploadImg, updateShipInfo } from "@/api/index";
import { address } from "@/mixin/address";
import Vue from "vue";
import { Area } from "vant";
Vue.use(Area);
export default {
  name: "addShip",
  mixins: [address],
  data() {
    return {
      shipInfo: [
        {
          name: "船舶名称",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "船舶名称"
        },
        // {
        //     name:'最小装载量',
        //     val:'',
        //     disabled:false,
        //     type:'textarea',
        //     placeholder:'最小装载量'
        // },
        {
          name: "最大装载量(吨)",
          val: "",
          type: "nuber",
          disabled: false,
          placeholder: "最大装载量"
        },
        {
          name: "联系电话",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "联系电话"
        },
        {
          name: "MMSI",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "MMSI"
        },
        // {
        //   name: "船籍港",
        //   val: "",
        //   type: "textarea",
        //   disabled: false,
        //   placeholder: "船籍港"
        // },
        // {
        //   name: "监控视频",
        //   val: "",
        //   disabled: true,
        //   type: "textarea",
        //   placeholder: "监控视频"
        // },
        {
          name: "舱口尺寸(长)",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "舱口尺寸(长)"
        },
        {
          name: "舱口尺寸(宽)",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "舱口尺寸(宽)"
        },
        // {
        //   name: "型高(米)",
        //   val: "",
        //   type: "number",
        //   disabled: false,
        //   placeholder: "型高(米)"
        // },
        {
          name: "满载吃水(米)",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "满载吃水(米)"
        },
        // {
        //   name: "驾驶舱位置",
        //   val: "",
        //   type: "textarea",
        //   disabled: true,
        //   placeholder: "驾驶舱位置"
        // },
        {
          name: "封舱设备",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "封舱设备"
        }
      ],
      result: [], //水尺
      img_one: [], //
      img_two: [],
      img_three: [],
      img_four: [],
      shipServiceOneURL: "", //船舶营运证第一页
      shipServiceTwoURL: "", //船舶营运证第二页
      shipIdentityFrontURL: "", //船舶所有人身份证正面
      shipIdentityReverseURL: "", //船舶所有人身份证反面
      isMonitoring: false, //视频监控弹框
      monitoringList: [], //弹框选项
      actions: [], //下拉列表选项
      selectAddress: false, //选择地址
      flag: 0,
      editShipInfo: {}
    };
  },
  created() {
    if (this.$route.query.jumpStatus == 1) {
      this.$route.meta.title = "修改船只信息";
      this.editShipInfo = this.$route.query.shipInfo;
      let size= this.editShipInfo.hatchSize.split('*');
      console.log(this.editShipInfo)
      this.shipInfo[0].val = this.editShipInfo.shipName;
      this.shipInfo[1].val = this.editShipInfo.maxRequiredWeight;
      this.shipInfo[2].val = this.editShipInfo.shipPhone;
      this.shipInfo[3].val = this.editShipInfo.shipMmsi;
      // this.shipInfo[4].val = this.editShipInfo.shipAddressHistoryDTO
      //   ? this.editShipInfo.shipAddressHistoryDTO.provinceName
      //   : "";

      this.shipInfo[4].val = size[0]||'';
      this.shipInfo[5].val = size[1]||'';
      this.shipInfo[6].val = this.editShipInfo.loadDraught;
      this.shipInfo[7].val =
        this.editShipInfo.battenEquipment == 0
          ? "无封舱"
          : this.editShipInfo.battenEquipment == 1
          ? "简易封舱"
          : this.editShipInfo.battenEquipment == 1
          ? "棚架封舱"
          : "雨布封舱";
      this.shipServiceOneURL = this.editShipInfo.shipServiceOneURL || ""; //船舶营运证第一页
      this.shipServiceTwoURL = this.editShipInfo.shipServiceTwoURL || ""; //船舶营运证第二页
      this.shipIdentityFrontURL = this.editShipInfo.shipIdentityFrontURL || ""; //船舶所有人身份证正面
      this.shipIdentityReverseURL = this.editShipInfo.shipIdentityReverseURL || '';
      this.editShipInfo.shipIdentityReverseURL || ""; //船舶所有人身份证反面
      this.img_one = [{ url: this.editShipInfo.shipServiceOneURL||'' }];
      this.img_two = [{ url: this.editShipInfo.shipServiceTwoURL||'' }];
      this.img_three = [{ url: this.editShipInfo.shipIdentityFrontURL||'' }];
      this.img_four = [{ url: this.editShipInfo.shipIdentityReverseURL||'' }];
    } else {
      this.$route.meta.title = "添加船只";
    }
  },
  methods: {
    // 添加船舶
    addShip() {
      console.log("添加船只");
      console.log(this.shipInfo);
      console.log(localStorage.getItem("userLoginInfo"));
      let data = {
        userId: JSON.parse(localStorage.getItem("userLoginInfo")).user_id,
        shipCertificateStatus: 1, //船舶认证状态
        shipName: this.shipInfo[0].val.trim() || "", //船舶名称
        shipEnglishName: "", //船舶英文名称
        minRequiredWeight: 0, //最小货量要求（吨）
        maxRequiredWeight: this.shipInfo[1].val || "", //最大货量要求（吨)
        shipPhone: this.shipInfo[2].val || "", //船舶联系电话（必填）
        shipMmsi: this.shipInfo[3].val.trim() || "", //船舶MMSI
        hatchSize:this.shipInfo[4].val + "*" + (this.shipInfo[5].val), //舱口尺寸
        loadDraught: this.shipInfo[6].val || "", //满载吃水
        shipWarrantFrontURL: "", //船舶所有权证正面url
        shipWarrantReverseURL: "", //船舶所有权证反面url
        shipWarrantCoverURL: "", //船舶所有权证封面url
        shipQualifiedURL: "", //船舶年审合格证
        shipServiceOneURL: this.shipServiceOneURL, //船舶营运证第一页
        shipServiceTwoURL: this.shipServiceTwoURL, //船舶营运证第二页
        shipIdentityFrontURL: this.shipIdentityFrontURL, //船舶所有人身份证正面
        shipIdentityReverseURL: this.shipIdentityReverseURL, //船舶所有人身份证反面
        shipPropertyRightURL: "", //船舶产权协议
        PropertyRightIdentityFrontURL: "", //产权协议签订人身份证正面
        PropertyRightIdentityReverseURL: "", //产权协议签订人身份证反面
        battenEquipment:
          this.shipInfo[7].val == "无封舱"
            ? 0
            : this.shipInfo[7].val == "简易封舱"
            ? 1
            : this.shipInfo[7].val == "棚架封舱"
            ? 3
            : 4, //封舱设备、
        staffGaugeList: this.result //水尺
      };
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      // return
      let shipInfo = this.shipInfo;
      for (var i = 0; i < shipInfo.length; i++) {
        if (shipInfo[i].val == "") {
          return this.$toast("请输入" + this.shipInfo[i].name);
        }
        if (!/^[1][3-8][0-9]{9}$/.test(this.shipInfo[2].val.trim())) {
          return this.$toast("请输入有效手机号");
        }
      }
      if (this.$route.query.jumpStatus == 1) {
        data.shipInfoId = this.editShipInfo.shipInfoId;
        updateShipInfo(data, localStorage.getItem("token")).then(res => {
          if (res.data.code == 200) {
            this.$toast("修改成功");
          } else {
            this.$toast(res.data.message);
          }
          data = null;
          this.$router.go(-1);
        });
      } else {
        addShipInfo(data, localStorage.getItem("token")).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast("添加成功");
            let that = this;
            setTimeout(() => {
              this.$router.go(-1)
              // that.$router.push({ path: "/shipManagement" });
            }, 1000);
          } else {
            this.$toast(res.data.message);
          }
          data = "";
        });
      }
    },
    // 选择标尺
    // checkGauge(val){
    //     console.log('val',val)
    //     console.log(this.result)
    // },
    // 图片上传格式校验
    beforeRead(file) {
      console.log(file);
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return true;
      }
      this.$toast("请上传 jpg/png 格式图片");
      return false;
    },
    //添加船只信息
    addShipInfo(item) {
      console.log(item);
      if (item.name == "监控视频") {
        this.flag = 6;
        this.monitoringList = ["无", "有"];
        this.actions = [{ name: "无" }, { name: "有" }];
        this.isMonitoring = !this.isMonitoring;
      } else if (item.name == "驾驶舱位置") {
        this.flag = 11;
        this.monitoringList = ["前置", "后置"];
        this.actions = [{ name: "前置" }, { name: "后置" }];
        this.isMonitoring = !this.isMonitoring;
      } else if (item.name == "封舱设备") {
        this.flag = 12;
        this.monitoringList = ["无封舱", "简易封舱", "棚架封舱", "雨布封舱"];
        this.actions = [
          { name: "无封舱" },
          { name: "简易封舱" },
          { name: "棚架封舱" },
          { name: "雨布封舱" }
        ];
        this.isMonitoring = !this.isMonitoring;
      } else if (item.name == "船籍港") {
        this.selectAddress = !this.selectAddress;
      }
    },
    // 上传图片
    uploadImg(file, detail) {
      console.log(detail)
      console.log("file123456", file.file);
      let formData = new FormData();
      formData.append("imgfile", file.file);
      console.log(formData);
      // shipMmsi/MMSI shipCertificateStatus/船舶认证状态、shipName/船舶名称、shipEnglishName/船舶英文名称、
      // minRequiredWeight/最小货量要求（吨）、maxRequiredWeight最大货量要求（吨)、 shipPhone/船舶联系电话（必填）、
      // (选填)shipAddressHistoryDTO/船籍港地址信息、isSurveillanceVideo/是否有监控视频、depthMoulded/型深、hatchSize/舱口尺寸、
      // loadDraught/满载吃水 cockpitLocsation/驾驶舱位置、battenEquipment/封舱设备、staffGaugeList/水尺
      // shipWarrantFrontURL/船舶所有权证正面url shipWarrantReverseURL/船舶所有权证反面url shipWarrantCoverURL/船舶所有权证封面url
      // shipQualifiedURL/船舶年审合格证 shipServiceOneURL/船舶营运证第一页 shipServiceTwoURL/船舶营运证第二页
      // shipIdentityFrontURL/船舶所有人身份证正面 shipIdentityReverseURL/船舶所有人身份证反面 shipPropertyRightURL/船舶产权协议
      //  PropertyRightIdentityFrontURL/产权协议签订人身份证正面 PropertyRightIdentityReverseURL/产权协议签订人身份证反面
      uploadImg(formData, file.file.name, localStorage.getItem("token")).then(
        res => {
          console.log(res);
          if (res.data.code == 200) {
            console.log(this.img_one);
            if (detail.name === "1") {
              this.shipServiceOneURL = res.data.data;
            }
            if (detail.name === "2") {
              this.shipServiceTwoURL = res.data.data;
            }
            if (detail.name === "3") {
              this.shipIdentityFrontURL = res.data.data;
            }
            if (detail.name === "4") {
              this.shipIdentityReverseURL = res.data.data;
            }
          }
        }
      );
    },
    // 确认选择
    confirm(picker, value, index) {
      // if (this.flag == 11) {
      //   this.shipInfo[10].val = picker;
      // }
      // if (this.flag == 6) {
      //   this.shipInfo[5].val = picker;
      // }
      if (this.flag == 12) {
        this.shipInfo[7].val = picker;
      }
      this.isMonitoring = !this.isMonitoring;
      console.log(picker, value, index);
    },
    // 选中选项
    select(item, index) {
      console.log(item, index);
      // if (this.flag == 11) {
      //   this.shipInfo[10].val = item.name;
      // }
      // if (this.flag == 6) {
      //   this.shipInfo[5].val = item.name;
      // }
      if (this.flag == 12) {
        this.shipInfo[7].val = item.name;
      }
      this.isMonitoring = !this.isMonitoring;
    },
    // 改变地址选择
    onChange(picker, value, index) {
      console.log(picker, value, index);
      this.editShipInfo.shipAddressHistoryDTO = {
        cityName: picker[1].name,
        latitude: picker[2].lonAndLat.lat,
        longitude: picker[2].lonAndLat.lon,
        provinceName: picker[0].name
      };
      this.shipInfo[4].val = picker[0].name + picker[1].name + picker[2].name;
      this.selectAddress = false;
      console.log(this.editShipInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.addShip {
  height: 100vh;
  position: relative;
  overflow: scroll;
  background: #ededf0;
  .form {
    padding-bottom: 1rem;
    .shipPapers {
      .van-row {
        &:nth-child(1) {
          padding: 0.1rem;
        }
      }
    }
    .van-checkbox {
      margin-top: 0.1rem;
    }
  }
  .van-circle {
    position: absolute;
    bottom: -12%;
    left: 50%;
    margin-left: -0.75rem;
  }
}
.van-checkbox {
  margin-top: 0.1rem;
}
.van-cell {
  padding: 7px 2px;
  text-align: left;
  border-bottom: 1px #ededf0 solid;
}
[class*="van-hairline"]::after {
  border: none;
}
</style>
