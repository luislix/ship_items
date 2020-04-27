<template>
  <div id="file">
    <myheader></myheader>
    <div class="form">
      <p>船舶概况</p>
      <van-row v-for="(item,index) in shipInfo" :key="index">
        <van-col span="24">
          <van-cell-group>
            <van-field
              v-model="item.val"
              rows="1"
              autosize
              :label="item.name"
              type="textarea"
              input-align="right"
              :placeholder="item.placeholder"
            />
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <p>船型尺寸</p>
    <van-row v-for="items in shipSize" :key="items.id">
      <van-col span="24">
        <van-cell-group>
          <van-field
            rows="1"
            autosize
            v-model="items.val"
            :label="items.name"
            type="textarea"
            input-align="right"
            :placeholder="'请输入'+items.placeholder"
          />
        </van-cell-group>
      </van-col>
    </van-row>
    <p>备注</p>
    <van-cell-group>
      <van-field v-model="message" rows="5" autosize type="textarea" />
    </van-cell-group>
    <van-row class="btn">
      <van-button type="info" @click="submit">提交信息</van-button>
    </van-row>
  </div>
</template>

<script>
import { addPyShipInfo } from "@/api/index.js";
export default {
  name: "file",
  data() {
    return {
      shipInfo: [
        {
          name: "船舶名称",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "请输入名称"
        },
        {
          name: "封仓类型",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "请输入封仓类型"
        },
        {
          name: "船舶类型",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入船舶类型"
        },
        {
          name: "吨位",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入吨位"
        },
        // {
        //     name:'最大船速节',
        //     val:'',
        //     type:'number',
        //     disabled:false,
        //     placeholder:'请输入船速'
        // },
        {
          name: "航线线路",
          val: "",
          type: "textarea",
          disabled: false,
          placeholder: "请输入航线"
        },
        {
          name: "建造时间",
          val: "",
          disabled: true,
          type: "textarea",
          placeholder: "请输入时间"
        },
        {
          name: "船舶净重（吨）",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入净重"
        },
        {
          name: "是否有监控视频",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入是否有监控视频"
        },
        {
          name: "船籍",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入船籍"
        },
        {
          name: "联系人电话",
          val: "",
          type: "number",
          disabled: false,
          placeholder: "请输入号码"
        },
        // {
        //     name:'联系人',
        //     val:'',
        //     type:'textarea',
        //     disabled:true,
        //     placeholder:'请输入联系人'
        // },
        {
          name: "MMSI",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入MMSI"
        }
      ],
      shipSize: [
        {
          id: 1,
          name: "船舶长度（米）",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入长度"
        },
        {
          id: 2,
          name: "船舶高度（米）",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入高度"
        },
        {
          id: 3,
          name: "船舶型宽（米）",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入宽度"
        },
        {
          id: 4,
          name: "驾驶舱位置 ",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入驾驶舱位置 "
        },
        {
          id: 5,
          name: "船舶吃水（米）",
          val: "",
          type: "textarea",
          disabled: true,
          placeholder: "请输入吃水"
        }
      ],
      list: "",
      message: ""
    };
  },
  created() {},
  methods: {
    submit() {
      console.log(this.shipSize[0]);
      let data = {
        shipNumber: this.shipInfo[0].val, //船舶名称
        sealingWarehouse: this.shipInfo[1].val, //封仓类型
        shipType: this.shipInfo[2].val, // 船舶类型
        shipT: this.shipInfo[3].val, //吨位
        // province:this.shipInfo[4].val,//最大船速节
        shipLine: this.shipInfo[4].val, // 航线线路
        createTime: this.shipInfo[5].val, ///建造时间
        shipWeight: this.shipInfo[6].val, //船舶净重（吨）
        isSurveillanceVideo: this.shipInfo[7].val, // 是否有监控视频
        province: this.shipInfo[8].val, // 船籍
        linkmanPhone: this.shipInfo[9].val, // 联系人电话
        // linkman:this.shipInfo[11].val,// 联系人
        mmsi: this.shipInfo[10].val, //MMSI
        shipLong: this.shipSize[0].val, // 船舶长度（米）
        shipHigh: this.shipSize[1].val, // 船舶高度（米）
        shipWide: this.shipSize[2].val, // 船舶型宽（米）
        cockpitLocation: this.shipSize[3].val, // 驾驶舱位置
        drinkingWater: this.shipSize[4].val, // 船舶吃水（米）
        remark: this.message //备注
      };
      // console.log(data);return;
      addPyShipInfo(data, localStorage.getItem("token")).then(res => {
        console.log(res);
        console.log("添加成功");
      });
    }
  }
};
</script>

<style lang="less">
#file {
  height: 100vh;
  background: #ffffff;
  .form {
    overflow: auto;
  }
  p {
    padding-left: 0.4rem;
    height: 0.5rem;
    background: #eeeeee;
    text-align: left;
  }
  .mark {
    height: 3rem;
  }
  .btn {
    background: #eeeeee;
    .van-button {
      margin: 0.1rem;
      background-color: #29A2F8;
    }
  }
  .van-field__label {
    width: 108px;
    text-align: left;
  }
}

</style>
