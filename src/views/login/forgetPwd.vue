<template>
  <div class="forgetPwd">
    <myheader></myheader>
    <ul>
      <li>
        <van-cell-group>
          <img class="myicon" src="../../assets/image/手机号.png" />
          <van-field v-model="phone" placeholder="手机号" />
        </van-cell-group>
      </li>
      <li>
        <van-cell-group>
          <img class="myicon" src="../../assets/image/验证码.png" />
          <van-field v-model="sms" center clearable placeholder="请输入验证码">
            <van-button
              @click="getCode"
              slot="button"
              size="small"
              type="info"
              style="background: radial-gradient(farthest-side at 0 0, #0B6EFF 0%, #68AAFF 100%);"
            >
              {{ flag1 == 0 ? `获取验证码` : `${num}秒后重新获取` }}
            </van-button>
            <!-- <van-button
              v-if="flag1 == 0"
              @click="getCode"
              slot="button"
              size="small"
              type="info"
              style="background: radial-gradient(farthest-side at 0 0, #0B6EFF 0%, #68AAFF 100%);">
                获取验证码
              </van-button> -->
          </van-field>
        </van-cell-group>
      </li>

      <li>
        <van-cell-group>
          <img class="myicon" src="../../assets/image/密码.png" />
          <van-field type="password" v-model="Pwd" placeholder="请输入密码" />
        </van-cell-group>
      </li>
      <li>
        <van-cell-group>
          <img class="myicon" src="../../assets/image/密码.png" />
          <van-field
            type="password"
            v-model="newPwd"
            placeholder="请确认密码"
          />
        </van-cell-group>
      </li>
    </ul>
    <van-button
      type="info"
      @click="forget"
      style="background: radial-gradient(farthest-side at 0 0, #0B6EFF 0%, #68AAFF 100%);width: 250px;border-radius: 10px;"
      >确认修改</van-button
    >
  </div>
</template>

<script>
import { forgetPwd, Code } from "@/api/index";
import { Toast } from "vant";
export default {
  name: "forgetPwd",
  data() {
    return {
      phone: "",
      sms: "",
      Pwd: "",
      newPwd: "",
      userSource: 0,
      flag1: 0,
      num: 60
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    forget() {
      var that = this;
      forgetPwd(this.phone, this.newPwd, this.sms).then(res => {
        if (res.data.code == 200) {
          Toast.success("修改成功");
          setTimeout(() => {
            that.$router.push({
              path: "/login",
              query: { userType: this.$route.query.userType }
            });
          }, 1000);
        }
      });
    },

    getCode() {
      var that = this;
      if (this.phone == "") {
        Toast.fail("请输入手机号");
      } else {
        if (this.flag1 == 0) {
          Code({ phoneNumber: this.phone }).then(res => {
            Toast.success("已发送");
            that.flag1 = 1;
            console.log(that.flag1);
            var timer = setInterval(() => {
              that.num--;
              console.log(that.num);
              if (that.num <= 1) {
                that.flag1 = 0;
                clearInterval(timer);
              }
            }, 1000);
          });
        }
      }
    }
  }
};
</script>

<style lang="less">
.forgetPwd {
  .van-cell-group {
    display: flex;
    .myicon {
      height: 17.5px;
      margin: 14px 0 0 14px;
    }
  }
  .van-button--normal {
    margin-top: 0.3rem;
  }
}
</style>
