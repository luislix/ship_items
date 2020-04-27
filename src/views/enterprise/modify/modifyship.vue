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
        <div  >
          <input v-model="loadTime" type="text" placeholder="请选择装载时间"  @click="zhuangzaishijian" />
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
        <p>船名名称</p>
        <input v-model="goodsName" type="text" placeholder="请输入货物名称" />
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
      <van-checkbox v-model="checked"></van-checkbox>
      <p>合同服务</p>
      <img
        style="width:.24rem;height:.24rem"
        src="../../../assets/image/wenhao.png"
        alt=""
      />
    </div>
    <h3 style="font-size: 0.22rem;text-align:left;padding:7px 10px;color:#757575">
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

               <!-- 结束地区 -->
      <van-popup position="bottom" v-model="showend">
      <van-area
        :area-list="areaList"
        @confirm="confirmStartend"
        @cancel="cancelStartend"
        value="110101"
      />
    </van-popup>

          <!-- --------------开始时间-------------------- -->
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
      checked:true,
      showStart: false,
      showend: false,
      showTime: false,
      show: false,
      zhuangzaione: false,
       zhuangzaitwo: false,

       startTime:'',
       endTime:'',


      // ------------------------------------
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
      this.indexlist  = this.$router.history.current.query.uploadType
      
       this.listsss = JSON.parse(ssss)
     
    

    console.log(this.listsss);
    

    // console.log(listsss);
                //     for (var i in listsss) {
                  // var date = new Date(this.listsss[this.indexlist].startDate);
                  // var Y = date.getFullYear() + '-';
                  // var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                  // var D = date.getDate() + ' ';
                  // var h = date.getHours() + ':';
                  // var m = date.getMinutes() + ':';
                  // var  s = date.getSeconds();
                  // this.loadTime = Y+M+D
                //     }
                this.startAddress   =  this.listsss[this.indexlist].location 
                 this. endAddress   =  this.listsss[this.indexlist].placeOfArrival 
                 this.Contacts =  this.listsss[this.indexlist].contactsName
                 this.telphone =  this.listsss[this.indexlist].contactsPhone
                 this.goodsName =this. listsss[this.indexlist].shipsName
                 this.actWeight = this.listsss[this.indexlist].tonnage
                 this.loadTime = this.listsss[this.indexlist].startDate   

                  var date = new Date(this.loadTime);
                  var Y = date.getFullYear() + '-';
                  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                  var D = date.getDate() + ' ';
                  var h = date.getHours() + ':';
                  var m = date.getMinutes() + ':';
                  var  s = date.getSeconds();
                  this.loadTime = Y+M+D
  },

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





            //  结束 地区
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


    // --------------------开始时间----------------------

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

        // window.localStorage.setItem("Storedata")
        this.listsss[this.indexlist].location = this.startAddress

        this.listsss[this.indexlist].placeOfArrival = this.endAddress

        this.listsss[this.indexlist].shipsName = this.goodsName

         this.listsss[this.indexlist].tonnage = this.actWeight

        this.listsss[this.indexlist].contactsPhone = this.telphone

        window.localStorage.setItem('Storedata',JSON.stringify(this.listsss))
        
        this.$router.push(
            {path:'/uploadShip',query:{upload : this.Contacts}}
        )
    }
    },

    watch:{
        remark(val){
            console.log(val);
            
        }
    }
  }
// };
</script>

<style lang="less">
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
      text-align: right;
    }
  }
  .releaseGoods ul {
  margin-bottom: 0.2rem;
}
.Remarks {
  background: #fff;
  margin-bottom: 0.2rem;
  padding: 0.3rem;
  h3 {
    text-align: left;
    font-size: 0.28rem;
    color: #333333;
  }
  #remark {
    resize: none;
    padding: 0.2rem;
    width: 7rem;
    min-height: 2rem;
    background: #f1f1f1;
    border: none;
    // height: auto;
    margin-top: 0.25rem
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


}

</style>
