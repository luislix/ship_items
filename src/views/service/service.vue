<template>
  <div class="service">
    <myheader></myheader>
    <div class="list" style="padding:0 .2rem;">
      <van-cell-group>
        <van-cell title="服务地址" v-model="value" is-link to="address" />
        <van-cell title="商家名称" v-model="values" is-link @click="showName()" />
        <van-cell title="服务区域" v-model="currentAddress" is-link @click="showPopup()" />
        <van-cell-group v-for="(item,index) in serviceInfo" :key="index">
          <van-field
            v-model="item.val"
            :label="item.name"
            rows="1"
            autosize
            type="textarea"
            :placeholder="'请输入'+item.placeholder"
            input-align="right"
          />
        </van-cell-group>
      </van-cell-group>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList" @cancel="show=false" @confirm="pickerCurrentAddress" />
    </van-popup>
    <van-dialog v-model="showDialog" title="选择商家" show-cancel-button>
      <div class="list" style="margin: 0.3rem 0.2rem;padding-left:0rem;padding-bottom:.2rem;" :style="{'border-bottom':index==list.length-1?'none':'.5px solid #eee'}" :class="flag==index+1?'bgc':''" v-for="(item,index) in list" :key="index" @click="choose(item,index)">
        <van-row>
          <van-col span="18">
            <van-col span="24" style="line-height: 0.65rem;color: #000;font-weight: 600;">{{item.companyName?item.companyName:''}}</van-col>
            <van-col span="24" style="font-size: 0.3rem;">联系人： {{item.linkName}}</van-col>
            <van-col span="24" style="font-size: 0.3rem;">联系方式：{{item.linkPhone}}</van-col>
          </van-col>
          <van-col span="3">
            <img src="../../assets/image/ppp.png" style="width: 0.7rem;padding:0.2rem 0.1rem;"/>
          </van-col>
          <van-col span="3" style="border-left: 1px solid #ebedf0; padding:0.2rem;">
            <van-icon name="delete" size="25" />
          </van-col>
        </van-row>
      </div>
    </van-dialog>
    <div class="list" style="padding-top:.2rem;padding:.2rem;">
      <p style="margin:0;">服务内容</p>
      <van-field
        v-model="lineOfBusiness"
        rows="3"
        autosize
        type="textarea"
        maxlength="500"
        placeholder="请详细描述服务内容，如经营范围等，至少10个字"
        show-word-limit
      />
      <p style="padding:0;margin-top:.2rem;margin-left:0;">请上传一张带有公司名称图片</p>
      <van-uploader :after-read="afterRead" style="margin:0.1rem 0.2rem;">
        <img style="width:2rem;height:2rem;display:inline-block;background:#eee;" :src="serviceImg" alt="">
      </van-uploader>
    </div>
    <van-row class="btn">
      <van-button type="info" @click="submit">提交信息</van-button>
    </van-row>
  </div>
</template>
<script>
import { addPyShipPort, queryPyShipPortByPage, headImg } from "@/api/index.js";
import { address } from "@/mixin/address";
import { Info } from "vant";
export default {
  mixins: [address],
  data() {
    return {
      lineOfBusiness: "",
      show: false,
      flag:0,
      showDialog: false,
      value: "请选择服务地址",
      values: "请选择商家",
      showCurrentAddress: false, //当前地址弹框
      currentAddress: "请选择服务区域", //当前地
      list: [],
      currentAddressHistoryDTO: {
        provinceName: "",
        cityName: "",
        longitude: "",
        latitude: "",
        addressDetails: ""
      },
      radio: 1,
      serviceInfo: [
        {
          name: "港口类别",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "港口类别"
        },
        {
          name: "联系人",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "联系人"
        },
        {
          name: "联系方式",
          val: "",
          disabled: false,
          type: "textarea",
          placeholder: "联系方式"
        }
      ],
      serviceImg:''
    };
  },
  created() {
    let shipInfo = this.$route.query.item;
    if (this.$route.query.address) {
      this.value = this.$route.query.address;
    }
    if (this.$route.query.name) {
      this.values = this.$route.query.name;
    }
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        pageNum: 1,
        pageSize: 5
      };
      queryPyShipPortByPage(data, localStorage.getItem("token")).then(res => {
        for (let i = 0; i < data.pageSize; i++) {
          var obj = {};
          obj = res.data.data.list[i];
          this.list.push(obj);
        }
      });
    },
    submit() {
      let data = {
        provinceCity: this.currentAddress, //港口服务区域
        address: this.value, //港口所在地
        companyName: this.values, //商家名称
        portType: this.serviceInfo[0].val, //港口类型
        linkName: this.serviceInfo[1].val, //港口负责人 ,
        linkPhone: this.serviceInfo[2].val, //负责人电话
        lineOfBusiness: this.lineOfBusiness, //业务范围
        companyImage:this.serviceImg
      };
      if(this.value=="请选择服务地址"||this.values=="请选择商家"|| this.currentAddress=="请选择服务区域"){return this.$toast('请将信息填写完整！')};
      for(var i = 0;i < this.serviceInfo.length;i++){
        if(this.serviceInfo[i].val==''){
          return this.$toast('请将信息填写完整！')
        }
      }
      addPyShipPort(data, localStorage.getItem("token")).then(res => {
        this.$toast('已添加')
        if(res.data.code==200){
          setTimeout(() => {
            this.$router.push({path:"/wharfServices",query:{}});
          }, 1000);
        }
      });
    },
    showPopup() {
      this.show = true;
    },
    showName() {
      this.showDialog = true;
    },
    choose(item,index) {
      this.flag = index+1;
      this.values = item.companyName;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formData = new FormData();
      formData.append("imgfile", file.file);
      headImg(formData).then(res => {
        console.log(res)
        this.serviceImg = res.data.data;
      });
    },
    // 选择当前地
    pickerCurrentAddress(value) {
      //   console.log("当前地址", value);
      this.currentAddress = "";
      value.forEach((item, index) => {
        this.currentAddress += item.name;
      });
      (this.currentAddressHistoryDTO = {
        provinceName: value[0].name,
        cityName: value[1].name,
        longitude: value[2].lonAndLat.lon,
        latitude: value[2].lonAndLat.lat,
        addressDetails: ""
      }),
        console.log(this.currentAddressHistoryDTO);
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.service {
  background: #eeeeee;
  height: 100%;
  .list {
    margin: 0 0 0.2rem 0;
    background: #ffffff;
    text-align: left;
    p {
      margin: 0 0.3rem;
    }
    .van-cell {
      padding: .2rem 0; 
    }
    .van-cell:not(:last-child)::after {
      left: 0;
    }
  }
  .bgc {
  }
}
</style>