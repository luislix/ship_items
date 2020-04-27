<template>
  <div class="my pageCommonStyle">
    <van-row class="my_header clearFloat">
      <van-row class="my_main">
        <van-row class="my_userPhone">
          <van-row>
            <van-row>
              <van-uploader
                :preview-full-image="flag"
                style="border-radius: 1rem;"
                multiple
                :max-count="1"
                preview-size="1.3rem"
                :disabled="userLoginInfo ? false : true"
                :after-read="uploadUserImg"
              >
                <van-image round width="1.3rem" height="1.3rem" :src="imgSrc" />
              </van-uploader>
            </van-row>
            <van-row v-if="userLoginInfo">
              <van-row class="float_c">
                <van-col>{{ userLoginInfo.loginName }}-</van-col>
                <van-col v-if="userLoginInfo.userType ==2 || userLoginInfo.userType == 3 || userLoginInfo.userType == 8">
                  {{
                  userLoginInfo.userType == 2 ? "货主" : (userLoginInfo.userType == 3?"船主":"企业") 
                  }}
                </van-col>
                <van-col
                  class="iconfont icon-vip"
                  style="font-size:25px;color:#FFB43D;display:flex;align-items:center;"
                ></van-col>
              </van-row>
              <van-row class="float_c ress">
                <img
                  v-if="userLoginInfo.user_certificate_status == 0"
                  src="../../assets/image/geren.png"
                  alt
                />
                <img
                  v-if="userLoginInfo.user_certificate_status == 1"
                  src="../../assets/image/shiminrenzheng.png"
                  alt
                />
                <img v-if="userLoginInfo.userType == 3" src="../../assets/image/chuans.png" alt />
                <img
                  v-if="userLoginInfo.company_certificate_status == 0"
                  src="../../assets/image/qiye.png"
                  alt
                />
                <img
                  v-if="userLoginInfo.company_certificate_status == 1"
                  src="../../assets/image/res.png"
                  alt
                />
              </van-row>
            </van-row>
            <van-row v-else @click="beforeUpload">
              <van-col span="24" style="margin:.1rem 0;" class="float_c">游客-登录/注册</van-col>
            </van-row>
          </van-row>
        </van-row>
        <van-row class="my_nav">
          <van-col span="8" @click="toMyIssue">
            <span class="iconfont icon-fabu2" style="font-size: 25px"></span>
            <p style="margin-top:.1rem;">我的发布</p>
          </van-col>
          <van-col span="8" @click="toMyContract">
            <span class="iconfont icon-hetong" style="font-size: 25px"></span>
            <p style="margin-top:.1rem;" >合同/保险</p>
          </van-col>
          <van-col span="8" @click="toCoupon">
            <span class="iconfont icon-youhuiquan" style="font-size: 21.5px"></span>
            <p style="margin-top:.1rem;">优惠券</p>
          </van-col>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="my_userInfo" v-if="userType != 1">
      <van-row class="border_bottom" @click="Authentication">
        <van-col span="3">
          <span class="iconfont icon-shenfenrenzheng1" style="font-size: 15px;"></span>
        </van-col>
        <van-col span="15" class="float_l" type="flex">身份认证</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row
        class="border_bottom"
        v-if="userLoginInfo.userType == 3 || userLoginInfo.userType == 8 "
        @click="toAddSihp"
      >
        <van-col span="3">
          <span class="iconfont icon-chuanzhiguanli"></span>
        </van-col>
        <van-col span="15" class="float_l" type="flex">船只管理</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom" @click="myEvaluation">
        <van-col span="3">
          <span class="iconfont icon-pingjia2" style="font-size: 18px;"></span>
        </van-col>
        <van-col span="15" type="flex" class="float_l">我的评价</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <!-- <van-row class="border_bottom">
                <van-col span="3"><img src="@/assets/image/shoucang.png"/></van-col>
                <van-col span="4" type="flex">我的收藏</van-col>
                <van-col span="17" type="flex" justify="end" class="float_r"><van-icon name="arrow" size="14"/></van-col>
      </van-row>-->
    </van-row>
    <van-row class="my_userData my_userInfo">
      <van-row class="border_bottom" @click="friendsShare" v-if="userType != 1">
        <van-col span="3">
          <span class="iconfont icon-fenxiang1"></span>
        </van-col>
        <van-col span="15" type="flex" class="float_l">邀请好友</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom" @click="feedback" v-if="userType != 1">
        <van-col span="3">
          <span class="iconfont icon-yonghufankui1" style="font-size: 15px;"></span>
        </van-col>
        <van-col span="15" class="float_l" type="flex" >用户反馈</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom" @click="aboutUs">
        <van-col span="3">
          <span class="iconfont icon-guanyuwomen"></span>
        </van-col>
        <van-col span="15" class="float_l" type="flex">关于我们</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom" @click="changePwd" v-if="userType != 1">
        <van-col span="3">
          <span class="iconfont icon-xiugaimima"  style="font-sizi:13px"></span>
        </van-col>
        <van-col span="15" class="float_l">修改密码</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom" @click="invitateCode" v-if="userType != 1">
        <van-col span="3">
          <!-- <img class="my_img" style="height: 0.35rem;" src="../../assets/image/y邀请码.png" /> -->
          <span class="iconfont icon-yaoqing1"></span>
        </van-col>
        <van-col span="15" class="float_l">输入邀请码</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
      <van-row class="border_bottom float_c" @click="logOut" v-if="userType != 1">
        <van-col span="3">
          <span class="iconfont icon-tuichudenglu"></span>
        </van-col>
        <van-col span="15" class="float_l">退出登录</van-col>
        <van-col span="6" type="flex" justify="end" class="float_r">
          <van-icon name="arrow" size="14" />
        </van-col>
      </van-row>
    </van-row>
    <van-action-sheet @select="onSelect" v-model="show" :actions="actions" cancel-text="取消" />
    <!-- 输入邀请码 -->
    <van-popup v-model="showvite" class="myinvite">
      <template>
        <div>
          <van-cell-group class="mygroup">
            <van-field v-model="invitationCode " placeholder="请输入邀请码" />
          </van-cell-group>
          <van-button
            :disabled="isAble"
            class="mygroup"
            type="info"
            size="small"
            @click="toconfirm"
          >确定</van-button>
        </div>
      </template>
    </van-popup>
    <!-- <van-button type="info" round style="width:80%">最新安装包</van-button> -->
  </div>
</template>
<script>
import Vue from "vue";
import {
  userPhoto,
  getUserInfo,
  upinvateCode,
  getinvateCode
} from "@/api/index";
import { ActionSheet } from "vant";
Vue.use(ActionSheet);
export default {
  data() {
    return {
      flag: false,
      show: false,
      showvite: false,
      isAble: false,
      actions: [],
      falg: "", //弹框标识：1分享、2身份认证
      userLoginInfo: "",
      imgSrc: "",
      invitationCode: "",
      whoInviteMe: "",
      userType: 1
    };
  },
  created() {
    if (localStorage.getItem("userLoginInfo")) {
      this.userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
      this.imgSrc =
        this.userLoginInfo.userPortrait ||
        require("@/assets/image/goods_logo.png");
      this.getUserInfo();
      this.userType = this.userLoginInfo.userType;
    } else {
      this.imgSrc = require("@/assets/image/goods_logo.png");
    }
    console.log(this.userLoginInfo);
  },
  methods: {
    // 退出登录
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('userLoginInfo');
      // if(!localStorage.getItem('userInfo')){
      //   localStorage.removeItem('userInfo');
      // }
      this.$router.push({ path: "/login", query: {} });
    },
    toMyIssue() {
      this.$router.push({ path: "/myIssue", query: {} });
    },
    toAddSihp() {
      this.$router.push({ path: "/shipManagement", query: { jumpStatus: 0 } });
    },
    //邀请码
    invitateCode() {
      getinvateCode(localStorage.getItem("token")).then(res => {
        this.whoInviteMe = res.data.data.whoInviteMe;
        if (this.whoInviteMe != null) {
          this.$toast("已经被邀请过了");
        } else{
          this.showvite = true;
          // if(this.whoInviteMe == ''){
          //   this.showvite = false;
          // }
        }
        // console.log(res.data.data);
      });
    },
    toconfirm() {
      upinvateCode(this.invitationCode, localStorage.getItem("token")).then(
        res => {
          if (res.data.code == 200) {
            this.$toast("邀请成功");
            this.isAble = true;
          }else if (res.data.code == 500) {
            this.$toast("邀请码错误");
            this.isAble = false;
          }
        }
      );
      this.showvite = false;
    },
    // 分享
    friendsShare() {
      // this.actions = [
      //   { name: "分享到微信朋友圈" },
      //   { name: "分享给微信好友" },
      //   { name: "分享到QQ" },
      //   { name: "扫二维码安装" }
      // ];
      // this.falg = 1;
      // this.show = !this.show;
      this.$router.push({path:"/invitate",query:{}})
    },
    // 分享微信朋友圈
    shareWeChat(){
          document.addEventListener('deviceready',function(){
            Wechat.isInstalled(function (installed) {
                if(installed){
                    Wechat.share({
                    message:{
                        title: "嘟嘟船讯",
                        description: "嘟嘟船讯让运输变的更简单",
                        thumb: "www/img/icon/120x120.png",
                        media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: "https://www.aiship.top:8443/CompanyHTML/code.html",
                            }
                        },
                        scene: Wechat.Scene.TIMELINE  
                        }, function () {
                        }, function (reason) {
                        });
                }
            }, function (reason) {
                alert("未检测到微信");
            });
        },false)
    },
    // 分享微信好友
    shareWeChatFirend(){
        document.addEventListener('deviceready',function(){
            Wechat.isInstalled(function (installed) {
                if(installed){
                    Wechat.share({
                    message:{
                        title: "嘟嘟船讯",
                        description: "嘟嘟船讯让运输变的更简单",
                        thumb:"www/img/icon/120x120.png",
                        media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: "https://www.aiship.top:8443/CompanyHTML/code.html",
                        }
                    },
                    scene: Wechat.Scene.SESSION
                  },
                  function() {},
                  function(reason) {
                  }
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
    // 切换用户
    // switchUser() {
    //   this.actions = [{ name: "切换船主" }, { name: "切换货主" }];
    //   this.show = !this.show;
    // },
    // cancel() {
    //   this.show = false;
    // },
    onSelect(item, index) {
      // 可以通过 close-on-click-action 属性开启自动关闭
      if (this.falg == 1) {
        switch (item.name) {
          case "分享到微信朋友圈":
            this.shareWeChat();
            break;
          case "分享给微信好友":
            this.shareWeChatFirend();
            console.log("分享给微信好友");
            break;
          case "分享到QQ":
            this.$toast("分享到QQ");
            break;
          default:
            this.$toast("扫二维码安装");
        }
      } else if (this.falg == 2) {
        if (item.name == "个人认证") {
          this.$router.push({
            path: "/Authentication",
            query: { jumpStatus: "0" }
          });
        } else if (item.name == "企业认证") {
          this.$router.push({
            path: "/Authentication",
            query: { jumpStatus: "1" }
          });
        }
      }
      if (item.name == "退出登录") {
        this.$router.push({ path: "/login" });
        return localStorage.clear();
      } else if (item.name == "退出程序") {
        document.addEventListener(
          "deviceready",
          function() {
            return navigator.app.exitApp(); // app退出
          },
          false
        );
      } else if (item.name == "切换船主" || item.name == "切换货主") {
        return this.$router.push({ path: "/login" });
      }
      this.show = false;
    },
    // 身份认证
    Authentication() {
      this.actions = [{ name: "个人认证" }, { name: "企业认证" }];
      this.falg = 2;
      this.show = !this.show;
    },
    // 上传头像
    uploadUserImg(file) {
      console.log(file);
      // file.file.name=imgfile;
      if (localStorage.getItem("userLoginInfo")) {
        let formData = new FormData();
        formData.append("imgfile", file.file);
        userPhoto(formData, file.file.name, localStorage.getItem("token")).then(
          res => {
            if (res.data.code == 200) {
              this.imgSrc = res.data.data;
              let userLoginInfo = JSON.parse(
                localStorage.getItem("userLoginInfo")
              );
              console.log(userLoginInfo);
              userLoginInfo.userPortrait = res.data.data;
              localStorage.setItem(
                "userLoginInfo",
                JSON.stringify(userLoginInfo)
              );
            }
          }
        );
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    // 获取用户信息
    getUserInfo() {
      getUserInfo(
        this.userLoginInfo.user_id,
        localStorage.getItem("token")
      ).then(res => {
        console.log("userInfo", res);
      });
    },
    // 合同保险
    contractSigning() {
      this.$router.push({ path: "/contract", query: { jumpStatus: 0 } });
    },
    // 优惠券
    toCoupon() {
      this.$router.push({ path: "/coupon", query: {} });
    },
    // 我的合同
    toMyContract() {
      this.$router.push({ path: "/myContract", query: {} });
    },
    // 我的评价
    myEvaluation() {
      this.$router.push({ path: "/myEvaluation", query: {} });
    },
    // 个人信息
    // personalEetails() {
    //   this.$router.push({ path: "/personalEetails", query: {} });
    // },
    beforeUpload() {
      console.log("未登录");
      if (!localStorage.getItem("userLoginInfo")) {
        this.$router.push({ path: "/login" });
      }
    },
    //关于我们
    aboutUs() {
      this.$router.push({ path: "/aboutUs", query: {} });
    },
    //修改密码
    changePwd() {
      this.$router.push({ path: "/changePwd", query: { flag: 2 } });
    },
    //用户反馈
    feedback() {
      this.$router.push({ path: "/myfeedback" });
    }
  }
};
</script>

<style lang="less" scopoed>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  color: #333333;
}
.my {
  height: 100vh;
  overflow:auto;
  background-color: #f5f5f5;
  padding-bottom: 1rem;
  .my_header {
    height: 5.1rem;
    .my_main {
      // background: #00A0E8;
      background: url(../../assets/image/bj.png);
      height: 4.1rem;
      // border-radius: 0 0 .5rem .5rem;
      color: #f5f5f5;
      padding-top: 0.7rem;
      .van-uploader__upload {
        border-radius: 1rem;
        .van-image {
          border-radius: 1rem !important;
        }
      }
      .my_shipManage {
        margin-top: 0.6rem;
        font-size: 0.2rem;
      }
      .my_nav {
        width: 95vw;
        height: 1.6rem;
        background: #fff;
        margin: 0 auto;
        margin-top: 0.2rem;
        border-radius: 0.1rem;
        color: #333333;
        font-size: 0.2rem;
        display: flex;
        align-items: center;
        .my_nav_img {
          font-size: 0.55rem;
        }
      }
    }
  }
  .my_userInfo {
    background: #fff;
    // width: 95vw;
    margin: 0 auto;
    padding: 0 0.1rem;
    .van-row {
      padding: 0.2rem 0;
    }
    .iconSize {
      font-size: 0.4rem;
      color: #bbb;
    }
    .border_bottom {
      border-bottom: 0.5px solid #f3f3f3;
    }
  }
  .my_userData {
    margin-top: 0.1rem;
    // margin-bottom: 1rem;
    background: #fff;
    .van-col--3 {
      .my_img {
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
  .logOut {
    width: 100%;
    position: absolute;
    bottom: 1rem;
    .van-button {
      width: 100%;
      color: #00a0e8;
    }
  }
  .ress img {
    width: 0.43rem;
    margin: 0.1rem;
  }
}
.myinvite {
  width: 300px;
  border-radius: 15px;
  .mygroup {
    margin: 0.3rem;
  }
}
// .iconfont{
//   font-size: 18px;
// }
</style>
