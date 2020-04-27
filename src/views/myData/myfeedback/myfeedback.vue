<template>
  <div class="myfeedback">
    <myheader></myheader>
    <van-cell-group style="height: 3rem;margin-top: 0.1rem;">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="50"
        placeholder="请输入您遇到的问题和建议..."
        show-word-limit
      />
    </van-cell-group>

    <button class="btns" type="button" @click="submit">提交</button>
  </div>
</template>

<script>
import { feedBack } from "@/api/index";
export default {
  name: "myfeedback",
  data() {
    return {
      message: "",
      phone:JSON.parse(localStorage.getItem('userLoginInfo')).loginName
    };
  },
  methods: {
    submit() {
      console.log(localStorage.getItem("token"));
      var userFeedbackDTO = {
        contactWay:this.phone,
        feedbackRemark: this.message,
        satisfactionLevel: 0,
        stateCode: 0,
        userFeedbackId: 0,
      };
      feedBack(localStorage.getItem("token"), userFeedbackDTO).then(res => {
        console.log(res);
        if(res.data.code==200){
          this.$toast('提交成功');
        } else {
          this.$toast('已提交');
        };
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      });
    }
  }
};
</script>

<style lang="less">
.myfeedback {
  height:100%;
  .van-field__label {
    width: 20px;
  }
  .btns {
    width: 5rem;
    height: 0.8rem;
    margin: 0.8rem auto;
    line-height: 0.8rem;
    background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
    color: #fff;
    font-size: 0.32rem;
    outline: none;
    border: none;
    border-radius: 0.1rem;
  }
  .van-cell{
    padding: 17px 16px;
    height: 3rem;
  }
  .van-field__body{
    height: 2rem;
  }
}
</style>
