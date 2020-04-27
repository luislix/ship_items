<template>
  <div class="shipManagement">
    <myheader></myheader>
    <ul class="ShipList">
      <van-swipe-cell :name="1" :stop-propagation="flag" :left-width="cellWidth" :right-width="cellWidth" v-for="(item,index) in cargolist"  :key="index">
        <!-- <template slot="left">
          <van-button square type="primary" text="选择" />
        </template> -->
        <li>
          <img class="chuan" src="@/assets/image/chuan.png" alt="" />
          <van-checkbox-group v-model="result">
            <van-checkbox :name="index">
               <!-- @click="checkedShip(item)" -->
              <div class="t_name">
                <h3 style="margin-right:.2rem;">
                   {{item.shipsName}}
                  <span style="margin-right:.3rem;font-size:0.25rem;color:#444444"
                    > </span
                  >
                </h3>
                <img class="edit" src="../../assets/image/edit.png" @click="modifylist(index)" alt="" />
              </div>
              <p style="font-size:.26rem;color:#666666;text-align:left">
                联系电话:
                <span style="color:#333333;font-weight:500">{{item.contactsPhone}}</span>
              </p>
              
              <p style="font-size:.26rem;color:#666666;text-align:left">
                最大装载量 (吨):
                <span style="color:#333333;font-weight:500">{{item.tonnage}}</span>
              </p>
              <!-- <van-row v-if="item.stateCode==2" style="margin-bottom:.1rem;"> -->
                <!-- <van-col style="position:absolute;left:.4rem;color:#FF6666;"><span class="iconfont icon-wenhao"></span>该船名有变动请进行编辑更新</van-col> -->
              <!-- </van-row> -->
            </van-checkbox>
         </van-checkbox-group>
        </li>
      </van-swipe-cell>
    </ul>
    <div class="tab">
      <button type="button" @click="showOrderDetail">确认发布</button>
    </div>
  </div>
</template>

<script>
import { queryEmptyShip,getShipList,shipApplyGoods,delShipInfo } from "@/api/index.js";
import { StorageShip } from "@/api/index.js";
import Vue from 'vue'
import { Dialog } from 'vant';
import { watch } from 'fs';
Vue.use(Dialog)
export default {
  data() {
    return {
      result: [],
      radio: "1",
      token: '',
      list:[],
      cellWidth:200,
      flag:true,
      shipId:'',
      jumpStatus:0,//跳转状态0编辑船只，1选择船只，
      shipInfoId:'',
      pageData:{
        pageNum:1,
        pageSize:10,
        sidx:'create_time',//默认为create_time，
        sord:'desc'//默认为desc
      },

      cargolist:[],
      sums:[]
    };
  },
  created() {

     this.token= window.localStorage.getItem("token")
    
    this.cargolist=this.$router.history.current.query.uploadType

    var ssss = window.localStorage.getItem('Storedata')
      
      this.cargolist = JSON.parse(ssss)
    console.log(this.cargolist);

    for(var i=0;i<this.cargolist.length;i++ ){
      // console.log(i);
      this.result.push(i)
    }

    console.log(this.result);
    
    

    this.jumpStatus=this.$route.query.jumpStatus||0
    console.log(this.jumpStatus)
    this.getEmptyShip();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getEmptyShip() {
      if(this.jumpStatus==1){
        queryEmptyShip(this.token,this.pageData).then(res => {
          this.list = res.data.data.list;
          console.log(this.list);
        });
      } else if(this.jumpStatus==0) {
        getShipList(this.pageData,this.token).then(res=>{
          console.log(res)
          // this.list = res.data.data.list;
        })
      }
    },
    checkedShip(item){
      console.log(item)
      this.shipInfoId=item.shipInfoId
     },
   

      //  确认船只
    showOrderDetail(){
      // this.token=localStorage.getItem('token')
      console.log(this.token);
    
      this.result.forEach((item)=>{
  
       var sum = []
        sum = this.cargolist[item]
         this.sums.push(sum)
         console.log(this.sums);
         
      })
      StorageShip(this.sums,this.token).then(res=>{
             if(res.data.code==200){
               var sum = this.sums.length
               this.$toast(`已成功发布${sum}条船只`);
               this.$router.push(
                 {path:'/myIssue'}
               )
             }
      })
      
    },

    modifylist(index){
      console.log(index);
      
      // console.log("修改");
      this.$router.push(
        {path:'/modifyship',query:{uploadType :index}}
      )
    }
    
  },

  watch:{
      result(val){
        console.log(val);
        
      }
  }

 

};
</script>

<style lang="less" scoped>
.shipManagement {
  background: #f5fdff;
  height: 100%;
  .shipItem {
    background: #fff;
  }
}
.ShipList {
  padding: 0.2rem 0.3rem;
  
}
.ShipList li {
  padding: 0.4rem 0.3rem;
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: .2rem;
  // position: relative;
}
.chuan {
  width: 2.2rem;
  height: 1.28rem;
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
}
.t_name {
  display: flex;
  align-items: center;
}
.edit {
  width: 0.26rem;
  height: 0.26rem;
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
.van-swipe-cell__right {
  width:3rem;
}
</style>
