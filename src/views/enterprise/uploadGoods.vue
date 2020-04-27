<template>
  <div class="uploadGoods">
    <myheader></myheader>
    <ul class="goodslist">
      <li v-for="(item, index) in cargolist" :key="index">
        <van-checkbox-group v-model="result">
          <van-checkbox :name="index">
            <div class="details">
              <div class="startAddress">
                <h1>
                  <!-- {{ item.startAddressHistoryDTO.provinceName }}-{{
                    item.startAddressHistoryDTO.cityName
                  }} -->

                  {{item.location}}
                </h1>
                <p>
                  托运物品：<span>{{
                    item.title
                  }}</span>
                </p>
                <p>
                  装货时间：<span>{{ item.endDate }}</span>
                  <!-- 装货时间：<span>2019-12-21</span> -->
                </p>
              </div>
              <div class="jiantou">
                <img src="../../assets/image/jiantou.png" alt="" />
              </div>
              <div class="arrive">
                <h1>
                  <!-- {{ item.endAddressHistoryDTO.provinceName }}-{{
                    item.endAddressHistoryDTO.cityName
                  }} -->
                  {{item.placeOfArrival}}
                </h1>
                <p>
                  运货重量：<span>{{ item.shipRequirements }}吨</span>
                </p>
                <img
                  style="width:.26rem;height:.26rem"
                  src="@/assets/image/edit.png"
                  alt=""
                  @click="modifylist(index)"
                />
              </div>
            </div>
           </van-checkbox>
         </van-checkbox-group>
      </li>
    </ul>
    <!-- <myfooter></myfooter> -->
    <div class="tab">
      <button type="button" @click="goodsRequestShip">发布货源</button>
    </div>
  </div>
</template>

<script>
import { shipRecommendedOrder, requestOrder,StorageCargos } from "@/api/index.js";
import { timeToLocaleString } from "@/assets/js/index.js";
import { Toast } from 'vant';
export default {
  name: "uploadGoods",
  data() {
    return {
      result: [],
      sums:[],
      radio: '',
      userData: "",
      user_id: "",
      token: "",
      list: [],
      time: "",
      emptyShipId: "",
      goodsOrderId: "",
     
      cargolist:[]
    };
  },
  created() {

    // this.cargolist=this.$router.history.current.query.uploadType
  
    var ssss = window.localStorage.getItem('Storedata')
    this.cargolist = JSON.parse(ssss)

    
    for(var i=0;i<this.cargolist.length;i++ ){
      // console.log(i);
      this.result.push(i)
    }

    console.log(this.cargolist);
    

    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    this.emptyShipId = this.$route.query.id;
    this.user_id = this.userData.user_id;
    this.getGoodsOrder();
  },
  methods: {
    //获取货源
    getGoodsOrder() {
      var data = {
        pageNum: 1,
        pageSize: 5,
        params: {
          userId: this.user_id
        }
      };
      shipRecommendedOrder({ params: data }, this.token).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data.list;
          console.log(this.list);
          this.goodsOrderId = this.list[0].goodsOrderId;
          this.list.forEach(element => {
            this.time = timeToLocaleString(element.loadingStartTime);
          });
        }
      });
    },
    res(item) {
      console.log(item);
      this.goodsOrderId = item.goodsOrderId;
    },

              // 跳转页面
    modifylist(index){
           console.log(index);

             this.$router.push(
        {path:'/modifyhuo',query:{uploadType :index}}
      )
           
    },

    //货物申请船只
    goodsRequestShip() {
        
     this.result.forEach((item)=>{
       var sum = []
        sum = this.cargolist[item]
         this.sums.push(sum)
      })
      StorageCargos(this.sums,this.token).then(res=>{
             if(res.data.code==200){
                 var sum = this.sums.length
               this.$toast(`已成功发布${sum}条货源`);
               this.$router.push(
                 {path:'/myIssue'}
               )
             }
      })

    }
  }
};
</script>

<style scoped>
.uploadGoods {
  background: #f5fdff;
  height: 100%;
}
.goodslist {
  padding: 0.2rem 0.1rem;
}
.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details h1 {
  font-family: PingFang-SC-Bold;
  font-weight: 600;
  color: #333;
  font-size: 0.25rem;
}
.details span {
  color: #333;
  font-size: 0.24rem;
  font-weight: 450;
}
.details p {
  font-size: 0.22rem;
  color: #666666;
}
.jiantou img {
  width: 1.3rem;
  height: 0.1rem;
}
.jiantou {
  margin-bottom: 0.9rem;
}
li {
  background: #fff;
  padding: 0.4rem 0.3rem;
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
}
.startAddress {
  text-align: left;
}
.arrive {
  text-align: right;
}
.tab {
  position: fixed;
  bottom: 0;
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
  /* background: linear-gradient(to right,#9F9F9F, #C5C5C5,#C5C5C5); */
  background-color: #0470dc;
}
</style>
