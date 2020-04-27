<template>
  <div class="shipManagement">
    <myheader></myheader>
    <ul class="ShipList">
      <van-swipe-cell :name="index" :stop-propagation="flag" :left-width="cellWidth" :right-width="cellWidth" v-for="(item,index) in list" :key="index+1">
        <li>
          <img class="chuan" src="@/assets/image/chuan.png" alt="" />
          <van-radio-group v-model="radio" :icon-size="$route.query.jumpStatus==0?0:20">
            <van-radio :name="index" @click="checkedShip(item)">
              <div class="t_name">
                <h3 style="margin-right:.2rem;">
                  {{ item.shipName }}
                  <span style="margin-right:.3rem;font-size:.28rem;color:#444444"
                    >{{ item.shipPhone }}</span
                  >
                </h3>
                <img class="edit" src="../../../assets/image/edit.png" alt="" />
              </div>
              <p style="font-size:.26rem;color:#666666;text-align:left;margin-top:.2rem">
                最后更新时间:
                <span style="color:#333333;font-weight:500">{{ item.modifyTime |formatTime() }}</span>
              </p>
              <p style="font-size:.26rem;color:#666666;text-align:left">
                装载量 (吨):
                <span style="color:#333333;font-weight:500">{{ item.maxRequiredWeight }}</span>
              </p>
              <van-row v-if="item.stateCode==2" style="margin-bottom:.1rem;">
                <van-col style="position:absolute;left:.4rem;color:#FF6666;"><span class="iconfont icon-wenhao"></span>该船名有变动请进行编辑更新</van-col>
              </van-row>
            </van-radio>
          </van-radio-group>
        </li>
        <template slot="right">
          <van-button type="danger"  @click="onClose(item)" text="删除" />
          <van-button type="primary" @click="editShipInfo(item)" text="编辑"/>
        </template>
      </van-swipe-cell>
      <van-col v-show="list.length>0?false:true" style="margin-top:1rem;" span="24">您暂无船只信息！请点击添加船只。</van-col>
    </ul>
    <div class="tab" v-if="jumpStatus">
      <button type="button" @click="showOrderDetail">确认船只</button>
    </div>
    <div class="tab" v-else>
      <button type="button" @click="toAddShip">添加船只</button>
    </div>
  </div>
</template>

<script>
import { queryEmptyShip,getShipList,shipApplyGoods,delShipInfo } from "@/api/index.js";
import Vue from 'vue';
import { Dialog } from 'vant';
Vue.use(Dialog)
export default {
  data() {
    return {
      radio: "1",
      token: localStorage.getItem("token"),
      list:[],
      cellWidth:0,
      flag:true,
      shipId:'',
      jumpStatus:0,//跳转状态0编辑船只，1选择船只，
      shipInfoId:'',
      pageData:{
        pageNum:1,
        pageSize:10,
        sidx:'create_time',//默认为create_time，
        sord:'desc'//默认为desc
      }
    };
  },
  created() {
    this.jumpStatus=Number(this.$route.query.jumpStatus)||0;
    console.log(this.jumpStatus);
    if(this.$route.query.jumpStatus==0){this.$route.meta.title='船只管理'} else {this.$route.meta.title='选择船只'};
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
          this.list = res.data.data.list;
        })
      }
    },
    checkedShip(item){
      console.log(item)
      this.shipInfoId=item.shipInfoId
     },
    //  选择船舶
    showOrderDetail(){
      if(this.list.length<1){
        return this.$toast('请添加船舶')
      }
      if(!this.shipInfoId){
        return this.$toast('请选择船只')
      }
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        });
      shipApplyGoods(this.$route.query.id,this.shipInfoId,this.token).then(res=>{
        console.log(res)
        if(res.data.code==200){
          this.$router.push({path:"/index",query:{}})
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    // 右滑
    onClose(item) {
      console.log(item)
      Dialog.confirm({
            title: '嘟嘟船讯提醒您！',
            message: '确定删除吗？'
        }).then(() => {
            console.log('确认删除');
            delShipInfo(item.shipInfoId,localStorage.getItem('token')).then(res=>{
              console.log(res)
              if(res.data.code==200){
                this.getEmptyShip()
                this.$toast('删除成功');
              } else {
                this.$toast(res.data.message)
              }
            })
        }).catch(() => {
        })
    },
    //删除船只 
    delShipInfo() {
      delShipInfo(this.shipId,localStorage.getItem('token')).then(res=>{
        console.log(res)
      })
    },
    // 修改船舶信息
    editShipInfo(item){
      console.log(item)
      this.$router.push({path:'/addShip',query:{shipInfo:item,jumpStatus:1}})
    },
    toAddShip(){
      this.$router.push({path:'/addShip'})
    }
  }
};
</script>

<style lang="less" scoped>
.shipManagement {
  background: #f5f5f5;
  height: 100%;
  .shipItem {
    background: #fff;
  }
}
.ShipList {
  padding: 0.2rem 0.3rem;
  padding-bottom: 1rem;
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
  bottom: 0rem;
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
}
.van-swipe-cell__right {
  width:2rem;
  text-align: left;
  .van-button {
    width: 1.8rem;
    height: 100%;
    font-size: 20px;
  }
}
</style>
