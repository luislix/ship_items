<template>
  <div>
    <van-nav-bar title="选择用户" left-text="返回" left-arrow 
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <div class="login">
    <!-- 登录前选择身份 -->
    <van-row v-for="(item,index) in userType" :key="index">
      <van-col span="10">
        <img class="img_logo" :src="item.img" alt="">
      </van-col>
      <van-col span="10">
        <p class="names">{{item.text}}</p>
      </van-col>
      <van-col span="4">
        <!-- <van-radio-group v-model="radio"> -->
          <van-radio ref="checked" v-model="radio" :name="item.check"></van-radio>
        <!-- </van-radio-group> -->
      </van-col>
    </van-row>
    <van-button round type="info" style="width:80%" @click="toLogin">立即进入</van-button>
  </div>
  </div>
</template>

<script>
export default {
  name: "userType",
  data() {
    return {
      userType:[
        {
          img:require('@/assets/image/shipowner.png'),
          text:'我是船东',
          check:3
        },
        {
          img:require('@/assets/image/shipper.png'),
          text:'我是货主',
          check:2
        }
      ],
      radio: 3,
    };
  },

  mounted() {
  },
  methods: {
    toLogin(){
      this.$router.push({path:'/login',name:'login',query:{userType:this.radio}})
    },
    onClickLeft() {
      console.log(1111)
      this.$router.push({path:'/index'})
    },
    onClickRight() {
      console.log(1111)
    },
  }
};
</script>

<style lang="less" scoped>
  .login {
    padding-top: 80px;
    .van-row {
      height: 100px;
      .van-col {
        height: 100%;
        line-height: 100px;
        .van-radio {
          height:100px;
          line-height: 100px;
        }
      }
    }
    .img_logo {
      width: 100px;
    }
    .van-button {
      margin-top: 80px;
    }
  }
</style>
