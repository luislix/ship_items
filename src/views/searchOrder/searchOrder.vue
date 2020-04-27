<template>
  <div class="searchOrder">
    <myheader></myheader>
    <div class="Chat">
      <ul class="chatRecord" v-if="talk.length > 0" ref="lists">
        <li
          v-for="(item, index) in talk"
          :key="index"
          :class="item.type == 1 ? 'rl2' : ''">
          <div class="Img">
            <img
              style="width:100%;height:100%;border-radius:50%;"
              :src="item.type == 1 ? userImg : Img"
              alt=""
            />
          </div>
          <div
            class="text"
            :class="item.type == 1 ? 'text2' : 'text'"
            v-html="item.content"
          ></div>
        </li>
      </ul>
    </div>
    <div class="single_input">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="1"
          autosize
          label=""
          type="textarea"
          placeholder="请输入"
        />
      </van-cell-group>
      <div class="function">
        <img
          v-if="message == ''"
          src="../../assets/image/gengduo@2x.png"
          alt=""
        />
        <button
          v-if="message != ''"
          style="width:.8rem;height:.6rem;line-height:.6rem;background:#f00;font-size:.2rem"
          type="button"
          @click="sendMsg"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { searchOrder } from '@/api/index';
export default {
  name: "searchOrder",
  data() {
    return {
      message: "",
      userInfo: "",
      talk: [
          {
            type:0,
            content: '请问您是找船还是找货物？请回复序号<br/>'+'1.船<br/>'+'2.货'
          }
      ],
      appkey: "3b25e463cba41aa87f5973f4",
      scrollTop: 0,
      asyncList: [],
      userData:'',
      userImg:'',
      Img:"https://www.oship.com.cn/xcximg/logo.png"
    };
  },
  created(){
      this.userData = JSON.parse(localStorage.getItem("userLoginInfo")) || '';
      this.userImg = this.userData.userPortrait;
      console.log(this.userImg);
  },
  methods: {
    sendMsg(){
      var obj = {};
      obj.type = 1;
      obj.content = this.message;
      this.talk.push(obj);
      if(this.message == 1 || this.message == 2){
        var object = {}
        object.type = 0;
        object.content = '请说出您的初始地、目的地、运货时间，例如我明天需要一艘从武汉到上海的船（货主）；我后天想要运输从武汉到上海的货物（船主）'
        this.talk.push(object);
      }else {
        var phone =  this.userData.loginName? this.userData.loginName:0;
        if(this.userData !=''){
          if(this.userData.userType == 3){
            var type = 1;
          }else if(this.userData.userType == 2){
            var type = 2;
          }
          searchOrder(type,this.message,phone).then(res=>{
            var object = {};
            object.type = 0;
            console.log(res.data);
            if(res.data == 'error'){
              res.data = "抱歉，我没理解您的意思，请重新输入"
            } else if (res.data ==''){
              res.data = '暂无推荐,请打开APP查看更多内容'
            }
            object.content = res.data;
            this.talk.push(object);
          })
        }
      }
      this.message = '';
    }
  }
};
</script>

<style lang="less">
.searchOrder {
  background: #f1f1f1;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  .single_input {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.2rem 0.3rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: #f1f1f1;
    z-index: 999;
    box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.2);
    .van-cell-group {
      background-color: #fff;
      width: 5.4rem;
      border-radius: 0.3rem !important;
      .van-cell {
        padding: 0.08rem 0.16rem;
        border-radius: 0.25rem !important;
        .van-field__label {
          width: 0px;
        }
      }
    }
    .function {
      display: flex;
      img {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
      }
      button {
        display: block;
        border: none;
        outline: none;
        border-radius: 5px;
      }
    }
  }
  #singleSation .single_input .van-cell-group .van-cell {
    border-radius: 0.3rem !important;
  }
  .socialContact {
    height: auto;
    background: #f1f1f1;
  }
  .Chat {
    padding: 0.3rem 0;
    margin: 0.2rem;
    .chatRecord {
      height: 10.5rem;
      overflow-y: scroll;
      li {
        display: flex;
        // align-items: center;
        margin-bottom: 0.2rem;
        .Img {
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          background: #f00;
          border-radius: 50%;
        }
        .text {
          max-width: 5.6rem;
          padding: 0.2rem;
          min-height: 0.74rem;
          height: auto;
          line-height: 0.55rem;
          margin-left: 0.2rem;
          background: #fff;
          border-radius: 0.1rem;
          position: relative;
          text-align: left;
          word-break: break-all;
        }
        .text2 {
          padding: 0.2rem;
          max-width: 5.6rem;
          min-height: 0.74rem;
          height: auto;
          line-height: 0.34rem;
          margin-right: 0.2rem;
          background: #fff;
          border-radius: 0.1rem;
          position: relative;
          text-align: left;
          word-break: break-all;
        }
        .text::after {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          top: 50%;
          left: -0.24rem;
          border: 0.14rem transparent solid;
          border-right: 0.14rem #fff solid;
        }
        .text2:after {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          top: 50%;
          margin-top: -0.2rem;
          right: -0.24rem;
          border: 0.14rem transparent solid;
          border-left: 0.14rem #fff solid;
        }
      }
    }
  }
  .rl2 {
    direction: rtl;
  }
}
.van-pull-refresh {
  padding-top: .5rem!important;
}
</style>
