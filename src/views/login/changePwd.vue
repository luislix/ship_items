<template>
  <div class="changePwd">
    <myheader></myheader>
    <van-cell-group v-if="this.$route.query.flag != 1">
      <van-cell title="账号" :value="this.userLoginInfo.loginName" />
    </van-cell-group>
    <van-cell-group style="text-align:left;">
      <van-field
        v-if="this.$route.query.flag != 1"
        label="原密码"
        v-model="userInfo.password"
        :type="inputType"
        placeholder="填写原密码"
        :right-icon="iconName"
        @blur="regPassword"
        @click-right-icon="showPassword"
      ></van-field>
    </van-cell-group>
    <van-cell-group style="text-align:left;">
      <van-field
        label="新密码"
        v-model="userInfo.newPassword"
        :type="type"
        :right-icon="iconNames"
        placeholder="填写新密码"
        @blur="regPassword"
        @click-right-icon="shownewPassword"
        :error-message="erroMsg"
      />
    </van-cell-group>
    <van-cell-group style="text-align:left;">
      <van-field
        label="确认密码"
        placeholder="再次填写确认"
        v-model="userInfo.pwd"
        :type="input"
        :right-icon="icon"
        @blur="regPassword"
        @click-right-icon="password"
      />
    </van-cell-group>
    <van-button type="info" @click="update">确认修改</van-button>
  </div>
</template>
<script>
import { updatePassword } from "@/api/index.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userIcon: "",
      userInfo: {
        password: "",
        newPassword: "",
        pwd: ""
      },
      iconName: "closed-eye",
      iconNames: "closed-eye",
      icon: "closed-eye",
      inputType: "password",
      type: "password",
      input: "password",
      erroMsg: "",
      loginName: ""
    };
  },
  created() {
    this.userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
    // console.log(this.userLoginInfo.loginName);
  },
  methods: {
    //修改密码
    update() {
      if (this.userInfo.newPassword != this.userInfo.pwd) {
        this.erroMsg = "两次输入密码不一致";
        this.userInfo.newPassword = "";
        this.userInfo.pwd = "";
      } else {
        var that = this;
        updatePassword(
          this.userLoginInfo.loginName,
          this.userInfo.password,
          this.userInfo.newPassword
        ).then(res => {
          if (res.data.code == 200) {
            Toast.success("修改成功");
            setTimeout(() => {
              that.$router.push({
                path: "/login",
                query: { userType: this.userLoginInfo.userType }
              });
            }, 1000);
          } else if(res.data.code == 500){
            Toast.fail(res.data.message);
          }
        });
      }
    },
    showPassword() {
      this.iconName = this.iconName == "closed-eye" ? "eye-o" : "closed-eye";
      this.inputType = this.inputType == "password" ? "number" : "password";
    },
    regPassword() {
      if (!this.$tools.regPassword(this.userInfo.password)) {
        return false;
      }
    },
    shownewPassword() {
      this.iconNames = this.iconNames == "closed-eye" ? "eye-o" : "closed-eye";
      this.type = this.type == "password" ? "number" : "password";
    },
    password() {
      this.icon = this.icon == "closed-eye" ? "eye-o" : "closed-eye";
      this.input = this.input == "password" ? "number" : "password";
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.changePwd {
  .tab {
    height: 0.88rem;
    padding: 0.25rem 0;
  }
  .van-cell__title {
    text-align: left;
    flex: 0.1;
  }
  .van-cell__value {
    text-align: left;
  }
  .van-button--normal {
    padding: 0 1.5rem;
    margin: 0.4rem;
    background-color: #00a0e9;
  }
}
</style>
