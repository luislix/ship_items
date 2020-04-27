<template>
  <div class="bootpage">
    <van-swipe :autoplay="3000" :loop="false" :show-indicators="false">
      <van-swipe-item>
        <img src="../../assets/image/first.png" alt="" />
        <button class="skip" @click="start">跳过</button>
      </van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/image/second.png" alt=""
      />
      <button class="skip" @click="start">跳过</button>
      </van-swipe-item>
      <van-swipe-item>
          <img src="../../assets/image/third.png" alt=""/>
          <button class="start_btn" @click="start" type="button">立即开启</button>
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "bootpage",
  data() {
    return {};
  },
  created(){
    
  },
  methods: {
    start(){
      this.$store.state.flag = 1;
      localStorage.setItem("flag",this.$store.state.flag);
      this.$router.push('/index/home');
    }
  }
};
</script>

<style lang="less" scoped>
.bootpage {
  // height: 100%;
  img {
    width: 100%;
    height: 100vh;
  }
  .van-swipe__indicators {
    bottom: 1.8rem;
  }
  .van-swipe-item{
    position: relative;
  }
  .start_btn{
    position: absolute;
    bottom:1.2rem;
    left: 50%;
    width: 3.6rem;
    height: .84rem;
    margin-left: -1.8rem;
    outline: none;
    border: none;
    border-radius: .4rem;
    background: linear-gradient(to top, #377782,#377782, #f1f1f1);
    font-size: .4rem;
    color: #fff;
  }
  .skip{
    position: absolute;
    top: .6rem;
    right: .6rem;
    width: .87rem;
    height: .46rem;
    border:none;
    border-radius: .25rem;
    background: #1662C7;
    opacity: 0.7;
    color: #fff;
  }
}
</style>


