<template>
  <div class="releaseGoods">
    <myheader></myheader>
    <ul>
      <keep-alive>
        <li>
          <p>选择始发地址</p>

          <div  >
            <input
              v-model="startAddress"
              type="text"
              placeholder="请选择始发地址"
            />
            <img src="../../../assets/image/jiantou2.png" alt="" />
          </div>
        </li>
      </keep-alive>
      <li>
        <p>选择目的地址</p>
        <div >
          <input
            v-model="endAddress"
            type="text"
            placeholder="请选择目的地址"
          />
          <img src="../../../assets/image/jiantou2.png" alt="" />
        </div>
      </li>
      <li>
        <p>装载时间</p>
        <div >
          <input v-model="loadTime" type="text" placeholder="请选择装载时间"  @click="zhuangzaishijian"/>
          <img src="../../../assets/image/jiantou2.png" alt="" />
        </div>
      </li>
      <li>
        <p>联系人</p>
        <input v-model="Contacts" type="text" placeholder="请输入联系人" />
      </li>
      <li>
        <p>联系电话</p>
        <input v-model="telphone" type="text" placeholder="请输入联系电话" />
      </li>
      <li>
        <p>货物内容</p>
        <input v-model="goodsName" type="text" placeholder="请输入货物内容" />
      </li>
      <li>
        <p>货物总重量(吨)</p>
        <input v-model="actWeight" type="text" placeholder="请输入货物总重量" />
      </li>
    </ul>

    <div class="Remarks">
      <h3>备注（选填）</h3>
      <textarea
        v-model="remark"
        name="remark"
        id="remark"
        placeholder="对船主我还有些话想说"
      ></textarea>
    </div>
    <div class="contract">
      <!-- <van-radio-group v-model="radio" icon-size=".3rem">
        <van-radio  name="1"></van-radio>
      </van-radio-group> -->
      <van-checkbox v-model="checked"></van-checkbox>
      <p>合同服务</p>
      <img
        style="width:.24rem;height:.24rem"
        src="../../../assets/image/wenhao.png"
        alt=""
      />
    </div>
    <h3 style="font-size: 0.22rem;text-align:left;padding:4px 10px;color:#757575">
      <span style="color:red; font-size: 0.2rem">*</span>
      因本平台注重订单时效性，您发布的订单如果在一个月内未成单，系统将删除该订单！
    </h3>

    <div class="tab">
      <button  type="button" @click="qaolaoqj" >
         保存
      </button>
    </div>
            
             <!-- 开始地区 -->
    <van-popup position="bottom" v-model="show">
      <van-area
        :area-list="areaList"
        @confirm="confirmStart"
        @cancel="cancelStart"
        value="110101"
      />
    </van-popup>

               <!-- 结束日期 -->
      <van-popup position="bottom" v-model="showend">
      <van-area
        :area-list="areaList"
        @confirm="confirmStartend"
        @cancel="cancelStartend"
        value="110101"
      />
    </van-popup>

<!-- ---------------------装载时间-------------- -->
        <van-popup
            v-model="zhuangzaione"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-datetime-picker
                @cancel="zhuangzaione=false"
                @confirm="confirmPicker"
                v-model="currentDate"
                type="datetime"
            
                />
        </van-popup>
    <!-- <van-popup position="bottom" v-model="showTime">
      <van-datetime-picker
        @cancel="exit"
        @confirm="ready"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
      />
    </van-popup>
    <van-popup position="bottom" v-model="showStartAddress">
      <div class="Address">
        <ul class="address_list" v-if="list.length > 0">
          <li id="addressList" v-for="item in list" :key="item.id" @click="chooseAddressOne(item)">
            <p style="text-align:left">
              <span style="margin-right:.2rem">{{ item.userName }}</span
              ><span>{{ item.mobilePhone }}</span>
            </p>
            <p style="text-align:left">
              {{ item.provinceName }} {{ item.cityName }}
            </p>
            <img style="width:.4rem;height:.4rem" src="../../assets/image/edit.png" alt="">
          </li>
        </ul>

        <button class="add" @click="add_map" type="button">新增收货地址</button>
      </div>
    </van-popup>
    <van-popup position="bottom" v-model="showEndAddress">
      <div class="Address">
        <ul class="address_list" v-if="list.length > 0">
          <li id="addressList" v-for="item in list" :key="item.id" @click="chooseAddressTwo(item)">
            <p style="text-align:left">
              <span style="margin-right:.2rem">{{ item.userName }}</span
              ><span>{{ item.mobilePhone }}</span>
            </p>
            <p style="text-align:left">
              {{ item.provinceName }} {{ item.cityName }}
            </p>
            <img style="width:.4rem;height:.4rem" src="../../assets/image/edit.png" alt="">
          </li>
        </ul>
        <button class="add" @click="add_map" type="button">新增收货地址</button>
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
import {
  releaseOrder,
  getCargoDetails,
  updateGoods,
  queryAddress
} from "@/api/index";
import { address } from "@/mixin/address";
import { timeToLocaleString } from '@/assets/js/index'
export default {
  name: "releaseGoods",
  mixins: [address],
  data() {
    return {
      checked: true,
      showStart: false,
      showend: false,
      showTime: false,
      show: false,
       zhuangzaione: false,
       zhuangzaitwo: false,

       startTime:'',
       endTime:'',

      //  ------------------------
      currentDate: new Date(),
      minDate: new Date(),
      //绑定数据
      loadTime: "",
      startAddress: "",
      endAddress: "",
      Contacts: "",
      telphone: "",
      goodsName: "",
      actWeight: "",
      price: "",
      All_price: "",
      remark: "",
      radio: "0",
      flag: false,
      token: "",
      goodsOrderId: "",
      Item: "",
      goods: null,
      showStartAddress: false,
      showEndAddress:false,
      list: [],
      startAddressId:'',
      endAddressId:'',

      value1:'',

      indexlist:'',
  
      listsss:[]
    };
  },
  created() {
      var ssss = window.localStorage.getItem('Storedata')
      
       this.listsss = JSON.parse(ssss)
     
    this.indexlist  = this.$router.history.current.query.uploadType

    console.log(this.listsss);
    

    // console.log(listsss);
                //     for (var i in listsss) {
                //   var date = new Date(listsss.startDate);
                //   var Y = date.getFullYear() + '-';
                //   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                //   var D = date.getDate() + ' ';
                //   var h = date.getHours() + ':';
                //   var m = date.getMinutes() + ':';
                //   var  s = date.getSeconds();
                //   listsss.startDate = Y+M+D
                //     }
                this.startAddress   =  this.listsss[this.indexlist].location 
                 this. endAddress   =  this.listsss[this.indexlist].placeOfArrival 
                 this.Contacts =  this.listsss[this.indexlist].contactsName
                 this.telphone =  this.listsss[this.indexlist].contactsPhone
                 this.goodsName =this. listsss[this.indexlist].title
                 this.actWeight = this.listsss[this.indexlist].tonnage
                 this.loadTime = this.listsss[this.indexlist].endDate
    // console.log(this.listsss,2222);
    // this.queryAddressList();
    // this.token = localStorage.getItem("token");
    // this.goodsOrderId = this.$route.query.id ? this.$route.query.id : "";
    // this.ids = this.$route.query.ids?this.$route.query.ids:'';
    // console.log(this.goodsOrderId);
    // if (this.goodsOrderId != "") {
    //   this.getMyselfGoods();
    // }

    // console.log(listsss,222222);
    
  },
//   mounted() {},
  methods: {

     chooseStart(){
         this.show = true;
    //   console.log(111111111);
  },

  cancelStart(){
         this.show = false;
  },

  confirmStart(value){
    console.log(value);
    this.value1 = value;
      this.startAddress =
        value[0].lonAndLat.name +
        "-" +
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name;
      this.show = false;
  },





            //  结束 时间
     chooseEnd(){
      this.showend = true
     },

    confirmStartend(value){  
             console.log(value);  
         this.endAddress =
        value[0].lonAndLat.name +
        "-" +
        value[1].lonAndLat.name +
        "-" +
        value[2].lonAndLat.name; 
             this.showend = false;   
    },

    cancelStartend(){
         this.showend = false;
    },

    // ---------------------------------------

        zhuangzaishijian(){
          this.zhuangzaione = true
    },

      confirmPicker(value) {
            console.log(value)
            this.startTime = +new Date(value);
            var m = value.getMonth() + 1;
            var d = value.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 0 && d <= 9) {
                d = "0" + d;
            }
            var timer = value.getFullYear() + "-" + m + "-" + d;
            this.endTime=+new Date(value.getFullYear() + "-" + ++m + "-" + d);
            this.loadTime=timer;
            this.zhuangzaione = false;
        },


    qaolaoqj(){ 

        // console.log(this.checked);

        if(this.checked == false){
            Notify({ type: "warning", message: "请勾选保险合同,再保存" })
             return false
        }
        

     if (this.startAddress == "") {
        Notify({ type: "warning", message: "始发地不能为空" });
        return false
      } else if (this.endAddress == "") {
        Notify({ type: "warning", message: "目的地不能为空" });
        return false
      } else if (this.loadTime == "") {
        Notify({ type: "warning", message: "装载时间不能为空" });
        return false
      } else if (this.Contacts == "") {
        Notify({ type: "warning", message: "联系人不能为空" });
        return false
      } else if (!/^1[3456789]\d{9}$/.test(this.telphone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
        return false
      } else if (this.goodsName == "") {
        Notify({ type: "warning", message: "货物不能为空" });
        return false
      } else if (this.actWeight == "") {
        Notify({ type: "warning", message: "货物总重量不能为空" });
        return false
      }
      

         console.log(this.listsss,22222222);
         
        this.listsss[this.indexlist].location = this.startAddress   
        

        this.listsss[this.indexlist].placeOfArrival = this.endAddress

        this.listsss[this.indexlist].title = this.goodsName

         this.listsss[this.indexlist].shipRequirements = this.actWeight

        this.listsss[this.indexlist].contactsPhone = this.telphone

        window.localStorage.setItem('Storedata',JSON.stringify(this.listsss))
        
        this.$router.push(
            {path:'/uploadGoods',query:{upload : this.Contacts}}
        )
    }

    

    
//     ready() {
//       this.loadTime = this.timeFormat(this.currentDate);
//       this.showTime = false;
//     },
//     exit() {
//       this.showTime = false;
//     },


//     chooseEnd() {
//       this.showEndAddress = true;
//     },
//     chooseTime() {
//       this.showTime = !this.showTime;
//     },
    // timeFormat(time) {
      // 时间格式化 2019-09-08
    //   let year = time.getFullYear();
    //   let month = time.getMonth() + 1;
    //   let day = time.getDate();
    //   return year + "-" + month + "-" + day;
    // },
    // checked() {
    //   this.flag = !this.flag;
    //   if (this.flag) {
    //     this.radio = "1";
    //   } else {
    //     this.radio = "0";
    //   }
    // },
    //要修改订单详情
    // getMyselfGoods() {
    //   getCargoDetails(this.goodsOrderId, this.token).then(res => {
    //     console.log(res.data.data,888);
    //     this.Item = res.data.data;
    //     this.startAddress =
    //       this.Item.startAddressHistoryDTO.provinceName +
    //       "-" +
    //       this.Item.startAddressHistoryDTO.cityName;
    //     this.endAddress =
    //       this.Item.endAddressHistoryDTO.provinceName +
    //       "-" +
    //       this.Item.endAddressHistoryDTO.cityName;
    //     this.loadTime = timeToLocaleString(
    //       this.Item.loadingStartTime
    //     );
    //     this.Contacts = this.Item.endAddressHistoryDTO.userName;
    //     this.goodsName = this.Item.goodsName;
    //     this.actWeight = this.Item.actualTotalWeight;
    //     this.telphone = this.Item.endAddressHistoryDTO.mobilePhone;
    //     this.price = this.Item.singlePrice;
    //     this.All_price = this.Item.totalPrice;
    //     this.remark = this.Item.remark;
    //     this.startAddressId = this.Item.startAddressHistoryId;
    //     this.endAddressId = this.Item.endAddressHistoryId;
    //   });
    //   console.log(this.startAddressId,this.endAddressId,333);
    // },

    //更新货源
    // updateGoodsOrder() {
    //   var that = this;
    //   console.log(this.startAddressId,this.endAddressId,444);
    //   var data = {
    //     startAddressId: this.startAddressId,
    //     endAddressId: this.endAddressId,
    //     loadingStartTime: Date.parse(this.loadTime),
    //     loadingEndTime: "",
    //     goodsName: this.goodsName,
    //     actualTotalWeight: this.actWeight,
    //     singlePrice: this.price,
    //     totalPrice: this.actWeight * this.price,
    //     remark: this.remark,
    //     goodsOrderId: this.goodsOrderId
    //   };
    //   updateGoods(data, this.token).then(res => {
    //     if (res.status == 200) {
    //       Toast.success("修改成功");
    //       setTimeout(() => {
    //         that.$router.push({path:"/chooseGoods",query:{id:this.ids}});
    //       }, 1500);
    //     }
    //   });
    // },
    //发布货源
    // release() {
    //   if (this.startAddress == "") {
    //     Notify({ type: "warning", message: "始发地不能为空" });
    //   } else if (this.endAddress == "") {
    //     Notify({ type: "warning", message: "目的地不能为空" });
    //   } else if (this.loadTime == "") {
    //     Notify({ type: "warning", message: "装载时间不能为空" });
    //   } else if (this.Contacts == "") {
    //     Notify({ type: "warning", message: "联系人不能为空" });
    //   } else if (!/^1[3456789]\d{9}$/.test(this.telphone)) {
    //     Notify({ type: "warning", message: "请输入正确手机号" });
    //   } else if (this.goodsName == "") {
    //     Notify({ type: "warning", message: "货物不能为空" });
    //   } else if (this.actWeight == "") {
    //     Notify({ type: "warning", message: "货物总重量不能为空" });
      // } else if (this.price == "") {
      //   Notify({ type: "warning", message: "货物单价不能为空" });
      // } else if (this.All_price == "") {
      //   Notify({ type: "warning", message: "货物总价不能为空" });
    //   } else {
        
        // let data = {
        //   startAddressId: this.startAddressId,
        //   endAddressId: this.endAddressId,
        //   loadingStartTime: Date.parse(this.loadTime),
        //   loadingEndTime: "",
        //   goodsName: this.goodsName,
        //   actualTotalWeight: this.actWeight,
        //   singlePrice: this.price,
        //   totalPrice: this.actWeight * this.price,
        //   remark: this.remark,
        // };
        //发布货订单
    //     releaseOrder(data, this.token).then(res => {
    //       console.log(res.data);
    //       if(res.data.code == 200){
    //         this.$router.push("/index/home")
    //       }
    //     });
    //   }
    // },

    //查询货物地址列表
    // queryAddressList() {
    //   var pageDTO = {
    //     pageNum: 1,
    //     pageSize: 30,
    //     user_id: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
    //   };
    //   queryAddress(pageDTO, localStorage.getItem("token")).then(res => {
    //     this.list = res.data.data.list;
    //   });
    // },
    // chooseAddressOne(e) {
    //   console.log(e);
    //   this.startAddress = e.provinceName + "-" + e.cityName;
    //   this.showStartAddress = false;
    //   this.startAddressId = e.addressId;
    // },
    // chooseAddressTwo(e) {
    //   this.endAddress = e.provinceName + "-" + e.cityName;
    //   this.endAddressId = e.addressId;
    //   this.showEndAddress = false;
    // },
    //新增地址
    // add_map() {
    //   this.$router.push("/recAddress");
    // },
    // 合同服务提示
    // serviceTip(){
    //   this.$toast({
    //     message:'保障双方在此次交易过程中合法权益,勾选后会在订单流程中,提供合同签订服务。',
    //     duration:5000
    //   })
    },
    watch:{
        remark(val){
            console.log(val);
            
        }
    }
  }
// };
</script>

<style lang="less" scoped>
.releaseGoods {
  background: #f1f1f1;
  ul li {
    height: 0.86rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-bottom: 1px #f1f1f1 solid;
    img {
      width: 0.14rem;
      height: 0.24rem;
    }
    p {
      width: 2.8rem;
      text-align: left;
      font-size: 0.3rem;
      color: #333333;
      height: 0.86rem;
      line-height: 0.86rem;
    }
    input {
      border: none;
      outline: none;
    }
  }
}
.releaseGoods ul {
  margin-bottom: 0.2rem;
}
.Remarks {
  background: #fff;
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  h3 {
    text-align: left;
    font-size: 0.28rem;
    color: #333333;
  }
  #remark {
    resize: none;
    padding: 0.2rem;
    width: 6.5rem;
    min-height: 2rem;
    background: #f1f1f1;
    border: none;
    // height: auto;
    margin-top: 0.2rem
  }
}
.contract {
  height: 0.88rem;
  background: #fff;
}
.tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
  box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.1);
}
button {
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 4rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  margin: 0 auto;
  background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
}
.contract {
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  p {
    margin: 0 0.2rem;
    font-size: 0.24rem;
    color: #666666;
  }
}
.address_list{
  background: #f1f1f1;
  margin-bottom: .5rem;
}
#addressList{
  height: 1.2rem !important;
  background: #fff;
  border-bottom: 1px #f1f1f1 solid;
  p{
    height: .5rem;
    line-height: .5rem;
  }
}
</style>
