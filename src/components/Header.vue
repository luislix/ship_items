<template>
  <div class="header">
    <div class="top">
      <van-col @click="goBack" v-if="$route.meta.title != '我的订单' && $route.meta.title != '社交'">
        <img src="@/assets/image/fanhui.png" alt="" />
      </van-col>
      <h3 :title="$route.meta.title">{{ $route.meta.title }}</h3>
      <img
        @click="addData"
        style="width:.7rem;height:.7rem"
        v-if="$route.meta.title == '选择货源' || $route.meta.title == '选择船只'"
        src="../assets/image/tianjia@2x.png"
        alt=""
      />

      <p
        @click="addData"
        v-if="$route.meta.title == '我的发布' && userType == 2"
        style="color:#fff;position:absolute;right:.2rem;"
        class="float_r"
      >
      添加发布
      </p>

       <p
        @click="addData"
        v-if="$route.meta.title == '我的发布' && userType == 3"
        style="color:#fff;position:absolute;right:.2rem;"
        class="float_r"
      >
      添加发布
      </p>

        <p
        @click="addDatass"
        v-if="$route.meta.title == '我的订单' && userType == 8 && sum == false "
        style="color:#fff;position:absolute;right:.2rem;"
        class="float_r"
      >
        船源
      </p>

         <p
        @click="addDatass"
        v-if="$route.meta.title == '我的订单' && userType == 8 && sum == true "
        style="color:#fff;position:absolute;right:.2rem;"
        class="float_r"
      >
        货源
      </p>

      <van-icon
        @click="addData"
        name="plus"
        color="white"
        size="18"
        v-if="
          ($route.meta.title == '船舶档案' && userType == 3)
        "
      />
      <!-- <van-icon
        @click="addData"
        name="plus"
        color="white"
        size="18"
        v-if="$route.meta.title == '地址管理'"
      /> -->
      <van-icon
        @click="addData"
        name="plus"
        color="white"
        size="18"
        v-if="$route.meta.title == '码头服务'"
      />
      <van-icon
        name="delete"
        color="white"
        size="21"
        v-if="$route.meta.title == '新建地址'"
      />
    </div>
  </div>
</template>

<script>
import { ress } from "@/assets/js/index.js";
export default {
  name: "Header",
  data() {
    return {
      sum :false,
      userType:'',
      show: false
    };
  },
  created() {
    if(this.$route.meta.title == "忘记密码"){
      this.userType = this.$route.query.userType;
    }else {
      this.userType = JSON.parse(localStorage.getItem("userLoginInfo")).userType?JSON.parse(localStorage.getItem("userLoginInfo")).userType:'';
    }
    
    console.log(this.$route.meta.title !='社交');
  },
  methods: {
    addDatass(){
      this.sum = !this.sum
    },
    goBack() {
      // if(this.$route.meta.title=="船源信息"){
      //   this.show=true;
      // } else {
      //   this.$router.go(-1);
      // }
      if(this.$route.meta.title == '选择货源'){
        this.$router.push('/index/home');
      }else{
        this.$router.go(-1);
      }
    },
    addData() {
      if(JSON.parse(localStorage.getItem('userLoginInfo')).user_certificate_status==0){
        this.$dialog.confirm({
          title: '嘟嘟船讯提醒您！',
          message: '您的账号未认证！点击确认前往认证。'
        }).then(() => {
          this.$router.push({path:'/Authentication',query:{jumpStatus:0}})
        }).catch(() => {
          
        });
      } else {
        if (this.$route.meta.title == "选择货源") {
        this.$router.push({ path: "/releaseGoods" });
      } else if (this.$route.meta.title == "选择船只") {
        this.$router.push({ path: "/addShip" });
      } else if (this.$route.meta.title == "船舶档案") {
        this.$router.push({ path: "/addShip" });
      } else if (this.$route.meta.title == "地址管理") {
        this.$router.push({ path: "/addAddress" });
      } else if (this.$route.meta.title == "码头服务") {
        this.$router.push({ path: "/service" });
      } else if (this.$route.meta.title == "我的发布") {
        if (this.userType == 3 || this.userType == 8) {
          this.$router.push({ path: "/issueShip", query: {} });
        } else if (this.userType == 2) {
          this.$router.push({ path: "/releaseGoods", query: {} });
        }
      }
      }
    },
    exit() {
      this.show = false;
      if(this.$route.meta.title == '选择货源'){}
      this.$router.go(-1);
    },
    onSelect(item) {
      if (item.name == "保存") {
        this.$router.go(-1);
      } else if (item.name == "不保存") {
        this.$router.go(-1);
      }
      this.show = false;
      console.log(item);
    }
  }
};
</script>

<style lang="less">
.header {
  
  padding-bottom: 1.1rem;
  height: 1.28rem;
  .top {
    
    
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.28rem;
    padding: 0 0.3rem;
    padding-top: 0.45rem;
    // background: #29A2F8;
    // padding-top: 0.4rem;
    
    background: #0470dc;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 999;
    .van-col {
      position: absolute;
      
    }
  }
  .top img {
    padding: .2rem;
    width: 0.6rem;
  }
  .top h3 {
    flex: 3;
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 500;
  }
  .van-popup {
     margin-left: 0.4rem;
    position: absolute;
    top: 83%;
    border-radius: 0.1rem;
  }
  .van-nav-bar{
    height: 1.1rem !important;
  }
}
</style>
