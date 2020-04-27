<template>
  <div class="index">
    <!-- <transition name="fade" mode="out-in" appear> -->
    <keep-alive include="home">
      <router-view v-if="$route.meta.keep" :flag="flag" @orderNum="getOrderNum" :key="key" class="router"></router-view>
    </keep-alive>
    <!-- </transition> -->
    <router-view v-if="!$route.meta.keep" :flag="flag" @orderNum="getOrderNum"></router-view>
    <van-tabbar route>
      <div class="animation" :style="{left:offset+'%'}" ref="animation">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <van-tabbar-item @click="show = false" to="/index/home">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/socialContact">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">社交</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.socialactive : icon.insocialactive"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = !show">
        <span slot-scope="props" :class="props.active ? `home` : `textActive`">发布</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.launch : icon.launch"
          :class="props.active ? `home` : `launch`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/order" :info="flag">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">订单</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.searchActive : icon.insearch"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/myData">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.myActive : icon.inmy"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <!-- <van-tabbar-item @click="show = false" to="/index/home">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/socialContact">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">社交</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.socialactive : icon.insocialactive"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = !show">
        <span slot-scope="props" :class="props.active ? `home` : `textActive`">发布</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.launch : icon.launch"
          :class="props.active ? `home` : `launch`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/order" :info="flag">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">订单</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.searchActive : icon.insearch"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item>
      <van-tabbar-item @click="show = false" to="/index/myData">
        <span slot-scope="props" :class="props.active ? `textActive` : `home`">我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.myActive : icon.inmy"
          :class="props.active ? `imgActive` : `home`"
        />
      </van-tabbar-item> -->
    </van-tabbar>

    <!-- 发布 -->
    <!-- <transition name="slide-fade"> -->
    <div v-if="show" @click="show = false" class="releaseList">
      <div class="Release">
        <h3>选择发布类别</h3>
        <ul class="finds">
          <!-- <li v-if="userData.userType == 3" @click="addShip">
            <img src="../../assets/image/01@2x.png" alt />
            <p>添加船只</p>
          </li> -->
          <li v-if="userData.userType == 3" @click="issueShip">
            <img src="../../assets/image/qiyechuan.png" alt="" />
            <p>发布船源</p>
          </li>
          <li @click="releaseGoods" v-if="userData.userType == 2">
            <img src="../../assets/image/qiyehuo.png" alt />
            <p>发布货源</p>
          </li>
          <li  @click="Enterpriseshipsource" v-if="userData.userType == 8">
            <img src="../../assets/image/qiyechuan.png" alt="" />
            <p>发布船源</p>
          </li>
          <li @click="Enterprisesourcing" v-if="userData.userType == 8">
            <img src="../../assets/image/qiyehuo.png" alt="" />
            <p>发布货源</p>
          </li>
          <li @click="Enterpriseport">
            <img src="../../assets/image/04@2x.png" alt />
            <p>发布码头</p>
          </li>
          <li v-if="userData.userType == 8" @click="uploadShips">
            <img src="../../assets/image/批量船源.png" alt />
            <p>批量船源</p>
          </li>
          <li v-if="userData.userType == 8" @click="uploadShip">
            <img src="../../assets/image/批量货源.png" alt />
            <p>批量货源</p>
          </li>
        </ul>
        <ul>
          <!-- <li>
            <router-link to="/issueShip">
              <van-button style="line-height:.7rem;" plain type="default" round>查看草稿</van-button>
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { login,getRecordCallLog,getEmptyShipList } from "@/api/index.js";
export default {
  data() {
    return {
      offset:0,
      active: 0,
      flag:'',
      icon: {
        active: require("../../assets/image/homeActive.png"),
        inactive: require("../../assets/image/home.png"),
        socialactive: require("../../assets/image/socialContactActive.png"),
        insocialactive: require("../../assets/image/socialContact.png"),
        searchActive: require("../../assets/image/searchActive.png"),
        insearch: require("../../assets/image/search.png"),
        myActive: require("../../assets/image/myActive.png"),
        inmy: require("../../assets/image/my.png"),
        launch: require("../../assets/image/launch.png")
      },
      show: false,
      userData: "",
      pageData:{
        pageNum:1,
        pageSize:20
      }
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("userLoginInfo"))) {
      this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    };
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
    if (userInfo && !localStorage.getItem("token")) {
      login(userInfo).then(res => {
          if (res.data.code == 200) {
            localStorage.setItem("token", res.data.data.access_token);
            res.data.data.loginTime = +new Date();
            localStorage.setItem(
              "userLoginInfo",
              JSON.stringify(res.data.data)
            );
            document.addEventListener("deviceready",function(){
              if(device.platform == "Android"){
                async function getCallLog(){
                  return await new Promise((resolve,reject)=>{
                      var filters = [{
                          "name": "date",
                          "value": (+new Date()-604800000),
                          "operator": ">="
                      }]
                      window.plugins.callLog.getCallLog(filters,function(data) {
                        console.log('getCallLog', data);
                        reject(data)
                      }, function(data) {
                        console.log(data)
                        resolve(data)
                      });
                  })
                }
                getCallLog().then(res=>{
                  console.log('通话记录',res)
                  if(res.length==0){
                    return
                  } else {
                    if(localStorage.getItem('token')){
                      getRecordCallLog(res,localStorage.getItem('token')).then(res=>{
                        console.log(res)
                      })
                    }
                  }
                })
              }
            },false)
            this.$router.push({ path: "/index/home", query: {} });
          } else {
            this.$toast(res.data.message || "请重新登录");
          }
        })
        .catch(() => {
          this.userInfo.loginName = "";
          this.userInfo.password = "";
        });
    };
    // console.log('active',this.active);
  },
  mounted() {
    // this.animation(this.active);
    console.log('this.offset',this.offset)
    console.log('store',this.$store.state.offset);
    this.offset = this.$store.state.offset;
  },
  updated() {
    // console.log('updated',this.active);
    // this.animation(this.active);
    console.log('this.offset',this.offset)
  },
  methods: {
    releaseGoods() {
      this.$router.push("/releaseGoods");
    },
    addShip(){
      this.$router.push({ path: "/addShip", query: {} });
    },
    issueShip() {
      getEmptyShipList(this.pageData,localStorage.getItem('token')).then(res=>{
        console.log(res)
        if(res.data.code==200){
          if(res.data.data){
            if(res.data.data.list.length>0){
              this.$router.push({ path: "/issueShip", query: {} });
            } else {
              this.$router.push({ path: "/addShip", query: {} });
              this.$toast({message:'请先发布船只信息！', duration: 4000})
            }
          } else {
            this.$router.push({ path: "/addShip", query: {} });
            this.$toast({message:'请先发布船只信息！', duration: 4000})
          }
        }
      })
    },
    getOrderNum(orderNum){
      this.flag = orderNum;
    },
    uploadShip() {
      this.$router.push({
        path: "/uploadingcargo",
        query: { uploadType: "货源" }
      });
    },
    uploadShips() {
      this.$router.push({ path: "/uploading", query: { uploadType: "船源" } });
    },

    Enterpriseshipsource() {
      this.$router.push({ path: "/issueShip" });
    },

    Enterprisesourcing() {
      this.$router.push({ path: "/releaseGoods" });
    },

    Enterpriseport() {
      this.$router.push({ path: "/service" });
    },
    issueShipFile(){
      this.$router.push({path:'/shipArchival',query:{}})
    },
    // 动画
    animation(value) {
      let num = this.$refs.animation.style.left.split('%');
      let flag = value*20;
      let temp = 5;
      if((flag-num[0])==flag || (num[0]-flag)==num[0]){
        temp = 1;
      } else if(((flag-num[0]) || (num[0]-flag))==60){
        temp = 5;
      } else if(((flag-num[0]) || (num[0]-flag))==40){
        temp = 10;
      } else if(((flag-num[0]) || (num[0]-flag))==20){
        temp = 20;
      }
      if(value==3){
        if(num[0]<60){
          let setIntervals = setInterval(() => {
            num[0]++;
            if(num[0]>60){
              clearInterval(setIntervals);
            } else {
              this.offset = num[0];
            }
          }, temp);
        } else if(num[0]>60) {
          let setIntervals = setInterval(()=>{
            num[0]--;
            if(num[0]<60){
              clearInterval(setIntervals);
            } else {
              this.offset = num[0];
            }
          },temp)
        }
      } else if(value===4){
        if(num[0]<80){
          let setIntervals = setInterval(() => {
            num[0]++;
            if(num[0]>80){
              clearInterval(setIntervals);
            } else {
              this.offset = num[0];
            }
          }, temp);
        }
      } else if(value===2){
        if(num[0]<40){
          let setIntervals = setInterval(() => {
            num[0]++;
            if(num[0]>40){
              clearInterval(setIntervals);
            } else {
              this.offset = num[0];
            }
          }, temp);
        } else if(num[0]>40) {
          let setIntervals = setInterval(()=>{
            num[0]--;
            if(num[0]<40){
              clearInterval(setIntervals);
            } else {
              this.offset = num[0];
            }
          },temp)
        }
      } else if(value===1){
          if(num[0]<20){
            let setIntervals = setInterval(() => {
              num[0]++;
              if(num[0]>20){
                clearInterval(setIntervals);
              } else {
                this.offset = num[0];
              }
            }, temp);
          } else if(num[0]>20) {
              let setIntervals = setInterval(()=>{
                num[0]--;
                if(num[0]<20){
                  clearInterval(setIntervals);
                } else {
                  this.offset = num[0];
                }
              },temp)
          }
      } else if(value===0){
        let setIntervals = setInterval(() => {
          if(num[0]>0){
            num[0]--;
            this.offset = num[0];
          } else {
            clearInterval(setIntervals)
          }
        }, temp);
      }
      this.$store.commit('setOffset',value*20)
    }
  },
  watch: {
    "$route.fullPath"(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal == "/index/socialContact") {
        return (this.active = 1);
      } else if (newVal == "/index/home") {
        return (this.active = 0);
      } else if (newVal == "/index/order") {
        this.active = 3;
        return;
      } else if (newVal == "/index/myData") {
        return (this.active = 4);
      }
    },
    "active"(value){
      this.animation(value);
    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  }
};
</script>

<style lang="less">
.index {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  .van-tabbar-item {
    z-index: 9999;
  }
  .imgActive {
    // position:absolute;
    z-index: 8888;
    height:.6rem;
    margin-bottom:.6rem;
    text-align: center;
    border-radius:50%;
    box-shadow:0px 0px 5px 1px #eee;
    // animation:myfirst 1s alternate;
  }
  .textActive {
    position: absolute;
    margin-left: -3%;
    bottom: 7px;
  }
  .launch {
    position: absolute;
    bottom: -10px;
    margin-left: -0.48rem;
    z-index: 9;
    height: 50px;
    border-radius: 1px solid #0470dc;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }
  .animation {
    width: 1.5rem;
    height: 1rem;
    position: fixed;
    display: flex;
    overflow:hidden;
    background: url("../../assets/image/homeOrderStatus/animation.png") no-repeat;
    background-size:100% 100%;
    // z-index:999;
    // span {
    //   position: absolute;
    //   width: 1.4rem;
    //   height:1.4rem;
    //   border-radius: 50% 50%;
    //   background:#fff;
    //   background: #f5f5f5;
    // }
    // @keyframes myfirst {
    //   0%   {background:''; left:0%; top:0px;}
    //   100% {background:''; left:0%; top:0px;}
    // }
    // span:nth-of-type(1){
    //   left: -.9rem;
    //   background: #fff;
    //   z-index:111;
    // }
    // span:nth-of-type(2){
    //   // height:100%;
    //   width:1.8rem;
    //   // background: #A7E2FE;
    //   opacity: 1;
    //   top:-.9rem;
    //   left: 50%;
    //   margin-left: -.9rem;
    // }
    // span:nth-of-type(3){
    //   background: #fff;
    //   right: -.9rem;
    //   z-index:111;
    // }
  }
}
[class*=van-hairline]::after {
  border:none;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.releaseList {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.Release {
  width: 100%;
  height: 3.6rem;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem 0.3rem 0 0;
  background: #fff;
  z-index: 999;
  .finds {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    li img {
      width: 1rem;
      // height: 1rem;
    }
    li p {
      color: #333333;
      font-size: 0.24rem;
    }
  }
}
.Release h3 {
  margin: 0.4rem auto;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #333333;
}
.Release .van-button {
  width: 2.6rem;
  height: 0.7rem;
  margin-top: 0.3rem;
}
</style>
