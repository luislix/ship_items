<template>
  <div class="invitate">
    <myheader></myheader>
    <div>
      <div>
        <img style="width: 100%;" src="../../../assets/image/yqbj.png" />
      </div>
      <div class="certen">
        <van-row>
          <van-col span="16" offset="4">
            <van-button type="default" @click="shareWesChat()">分享微信朋友圈</van-button>
          </van-col>
          <van-col span="16" offset="4">
            <van-button type="default" @click="shareWeChatFirend()">分享给微信朋友</van-button>
          </van-col>
          <!-- <van-col span="16" offset="4">
            <van-button type="default">分享邀请码</van-button>
          </van-col>-->
        </van-row>
      </div>
      <div class="banner" ref="imageDom">
        <van-row>
          <van-col span="2" offset="6">
            <img src="../../../assets/image/zhuangshi.png" />
          </van-col>
          <van-col span="8" offset="0">
            <h3>我的邀请码</h3>
          </van-col>
          <van-col span="2" offset="0">
            <img src="../../../assets/image/zhuangshi.png" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="16" offset="4">
            <p style="color: #F1801B;font-size: 30px;">{{myCode}}</p>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="16" offset="4">
            <van-button
              type="default"
              size="small"
              v-clipboard:copy="myCode"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="2" offset="6">
            <img src="../../../assets/image/zhuangshi.png" />
          </van-col>
          <van-col span="8" offset="0">
            <h3>扫描二维码下载APP</h3>
          </van-col>
          <van-col span="2" offset="0">
            <img src="../../../assets/image/zhuangshi.png" />
          </van-col>
        </van-row>
        <van-row class="erweima">
          <van-col span="24">
            <img src="../../../assets/image/1577325764352.png" />
          </van-col>
        </van-row>
        <van-row style="padding-bottom: 0.3rem;">
          <van-col span="16" offset="4">
            <h3>已推广注册人数:{{msg}}人</h3>
          </van-col>
        </van-row>
      </div>
      <!-- <div class="tgimg">
        <van-row>
          <van-col span="24">
            <img src="../../../assets/image/1577325764352.png"/>
          </van-col>
        </van-row>
      </div>-->
    </div>
    <van-popup v-model="show">
      <img width="100%" :src="this.imgUrl" />
    </van-popup>
  </div>
</template>

<script>
import { getinvateCode } from "@/api/index";
import { ImagePreview } from "vant";
// import html2canvas from "html2canvas";
// import canvas2image from "canvas2image";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
Vue.use(VueClipboard);
export default {
  data() {
    return {
      show: false,
      myCode: "",
      msg: "",
      imgUrl: ""
    };
  },
  created() {
    this.getvita();
  },
  mounted(){
    this.getvita();
  },
  methods: {
    onChange() {},
    getvita() {
      getinvateCode(localStorage.getItem("token")).then(res => {
        this.myCode = res.data.data.invitationCode;
        this.msg = res.data.data.count;
        console.log(res.data.data);
      });
    },
    //test
    // haha() {
    //   var permissions = cordova.plugins.permissions;
    //       html2canvas(this.$refs.imageDom).then(canvas => {
    //                 this.imgUrl = canvas.toDataURL("image/png");
    //                 this.topicture();
    //                 this.show = !this.show;
    //               });
    //   permissions.checkPermission(
    //     permissions.WRITE_EXTERNAL_STORAGE,
    //     function(s) {
    //       if (!s.hasPermission) {
    //         permissions.requestPermission(
    //           permissions.WRITE_EXTERNAL_STORAGE,
    //           function(s) {
    //             if (s.hasPermission) {
    //               console.log("我来了");
    //               html2canvas(this.$refs.imageDom).then(canvas => {
    //                 this.imgUrl = canvas.toDataURL("image/png");
    //                 this.topicture();
    //                 this.show = !this.show;
    //               });
    //               this.$toast("成功调用保存图片函数");
    //             } else {
    //               console.log("申请失败");
    //             }
    //           },
    //           function(error) {
    //             console.log(error);
    //           }
    //         );
    //       } else {
    //         this.clickGeneratePicture();
    //       }
    //     },
    //     function(error) {
    //       console.log(error);
    //     }
    //   );
    // },
    // //转化图片
    // clickGeneratePicture() {
    //   // 转成图片，生成图片地址
    //   this.$toast("成功1");
    //   console.log("11111111111111111111111111111111");
    //   html2canvas(this.$refs.imageDom).then(canvas => {
    //     this.imgUrl = canvas.toDataURL("image/png");
    //     //
    //     this.topicture();
    //     this.show = !this.show;
    //     // var eleLink = document.createElement("a");
    //     // eleLink.href = this.imgUrl; // 转换后的图片地址
    //     // eleLink.download = "pictureName";
    //     // // 触发点击
    //     // document.body.appendChild(eleLink);
    //     // eleLink.click();
    //     // // 然后移除
    //     // document.body.removeChild(eleLink);
    //     // this.topicture();
    //   });
    // },
    // //保存相册
    // topicture() {
    //   // var canvas, content;
    //   var img = new Image();
    //   img.src = this.imgUrl;
    //   this.$toast(this.imgUrl);
    //   // canvas = document.getElementById("myCanvas");
    //   img.onload = function() {
    //     alert("成功2");
    //     window.canvas2ImagePlugin.saveImageDataToLibrary(
    //       function(msg) {
    //         alert("保存成功");
    //       },
    //       function(err) {
    //         console.log("保存失败");
    //       },
    //       this.$refs.imageDom
    //     );
    //   };
    // },
    // 分享微信朋友圈
    shareWesChat() {
      // console.log("12313" + this.myCode)
      let that = this
      document.addEventListener(
        "deviceready",
        function() {
          Wechat.isInstalled(
            function(installed) {
              if (installed) {
                Wechat.share(
                  {
                    message: {
                      title: "嘟嘟船讯让运输变的更简单——我的邀请码是" + that.myCode,
                      description: "",
                      thumb: "www/img/icon/120x120.png",
                      media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl:
                          "https://www.aiship.top:8443/CompanyHTML/code.html"
                      }
                    },
                    scene: Wechat.Scene.TIMELINE
                  },
                  function() {},
                  function(reason) {}
                );
              }
            },
            function(reason) {
              alert("未检测到微信");
            }
          );
        },
        false
      );
    },
    // 分享微信好友
    shareWeChatFirend() {
      let that = this
      document.addEventListener(
        "deviceready",
        function() {
          Wechat.isInstalled(
            function(installed) {
              if (installed) {
                Wechat.share(
                  {
                    message: {
                      title: "嘟嘟船讯",
                      description: "嘟嘟船讯让运输变的更简单——我的邀请码是" + that.myCode,
                      thumb: "www/img/icon/120x120.png",
                      media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl:
                          "https://www.aiship.top:8443/CompanyHTML/code.html"
                      }
                    },
                    scene: Wechat.Scene.SESSION
                  },
                  function() {},
                  function(reason) {}
                );
              }
            },
            function(reason) {
              alert("未检测到微信");
            }
          );
        },
        false
      );
    },
    //复制
    onCopy: function(e) {
      // console.log("13212");
      this.$toast("复制成功");
    },
    onError: function(e) {
      console.log(e);
      this.$toast("复制失败");
    }
  }
};
</script>

<style lang="less" scoped>
.invitate {
  background: #06ccd5;
  padding-bottom: 0.3rem;
  .certen {
    .van-col--16 {
      margin-bottom: 0.3rem;
      .van-button {
        width: 100%;
        border-radius: 25px;
        background: #fee069;
        border: 1px solid #fee069;
        box-shadow: 0 5px 5px #f18114;
        color: #b84c0a;
      }
    }
  }
  .banner {
    width: 85%;
    margin: auto;
    padding-top: 0.3rem;
    background: #fff;
    border-radius: 15px;
    .van-row {
      padding-top: 0.3rem;
      .van-col--16 {
        .van-button {
          border-radius: 15px;
          background: #fee069;
          border: 1px solid #ffdead;
        }
      }
    }
    .erweima {
      .van-col--24 {
        img {
          width: 60%;
        }
      }
    }
  }
  // .tgimg{
  //   margin-top: 0.3rem;
  //   .van-col--24{
  //     img{
  //       width: 50%;
  //     }
  //   }
  // }
}
</style>