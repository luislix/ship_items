<template>
  <div id="app" v-cloak>
       <!-- <van-button class="Ordersbutton" @click="dianji" size="mini"  >{{flag == 'false'?"切换船主":"切换货主"}}</van-button> -->
    <!-- <transition name="transition" mode="out-in" appear> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!-- </transition> -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
// import { Signatures } from "@/assets/js/index";
export default {
  name: "App",
  data() {
    return {
      flag: localStorage.getItem("flag") ? localStorage.getItem("flag") : 0,
      backClick: 0
    };
  },
  created() {
    if(this.flag == 1){
      this.$router.push("/index/home")
    }
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      let loginTime = JSON.parse(localStorage.getItem("userLoginInfo")).loginTime;
      let currentTime = +new Date();
      if ((currentTime - loginTime) / 1000 / 60 / 60 / 24 > 7) {
        localStorage.removeItem("token");
      }
    }
    let that = this;
    // let first = null;
    // document.addEventListener("backbutton",function(){
    //   console.log(that.$route)
    //   if(that.$route.path=='/index/home'||that.$route.path=='/index/myData'||that.$route.path=='/index/order'||that.$route.path=='/index/socialContact'){
    //     // that.$toast('再按一次退出'); 
    //    if (!first) {
    //         first = new Date().getTime();
    //         that.$toast('再按一次退出'); 
    //        setTimeout(function() {
    //         first = null;
    //          }, 1000);
    //        } else {
    //          if (new Date().getTime() - first < 1000) {
    //           return navigator.app.exitApp(); // app退出
    //          }
    //        }
    //   } 
    // },false);
    //物理返回
    document.addEventListener(
      "backbutton",
      function() {
        that.backClick++;
        if (that.backClick == 2) {
          that.backClick = 0;
          if (
            that.$route.path == "/index/home" ||
            that.$route.path == "/index/socialContact" ||
            that.$route.path == "/index/order" ||
            that.$route.path == "/index/myData"
          ) {
            navigator.app.exitApp();
          }
        } else {
             if (
            that.$route.path == "/index/home" ||
            that.$route.path == "/index/socialContact" ||
            that.$route.path == "/index/order" ||
            that.$route.path == "/index/myData"
          ){
            that.$toast("再按一次退出");
            // that.$router.push(that.$route.path);
          }else{
            that.backClick = 0;
            that.$router.go(-1);
          }
            
        }
      },
      false
    );
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.fun, false); //false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.fun, false); //false阻止默认事件
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$homeScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //   //需要执行next函数 否则不起作用
  //   next();
  // },
  methods: {

  }
};
</script>

<style lang="less">
[v-cloak] {
  display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #666;
  font-size: 14px;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  .transition-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .transition-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .transition-enter-active,
  .transition-leave-active {
    transition: all 0.2s ease;
  }
  .anchorBL {
    display: none;
    font-size: 1px;
  }
}
html,
body {
  height: 100vh;
}
</style>
