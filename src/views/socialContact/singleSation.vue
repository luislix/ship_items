<template>
  <div id="singleSation">
    <myheader></myheader>
    <div class="Chat">
      <ul class="chatRecord" v-if="talk.length > 0" ref="lists">
        <li
          v-for="(item, index) in talk"
          :key="index"
          :class="userInfo == item.from_id ? 'rl2' : ''"
        >
          <div class="Img">
            <img
              style="width:100%;height:100%;border-radius:50%"
              :src="userInfo == item.from_id ? mine : yourImg"
              alt=""
            />
          </div>
          <div
            class="text"
            :class="userInfo == item.from_id ? 'text2' : 'text'"
          >
            {{ item.msg_body.text }}
          </div>
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
        <img src="../../assets/image/biaoqing @2x.png" alt="" />
        <img
          v-if="message == ''"
          src="../../assets/image/gengduo@2x.png"
          alt=""
        />
        <button
          v-if="message != ''"
          style="width:.8rem;height:.6rem;line-height:.6rem;background:#0470DC;font-size:.2rem;color:#fff"
          type="button"
          @click="JIMsendMsg"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { queryGroupMsg, querySingleMsg } from "@/api/index";
export default {
  name: "singleSation",
  data() {
    return {
      message: "",
      userInfo: "",
      talk: [],
      appkey: "3b25e463cba41aa87f5973f4",
      scrollTop: 0,
      asyncList: [],
      mine: require("../../assets/image/flower.jpg"),
      yourImg: require("../../assets/image/cat.jpg"),
      // 默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userLoginInfo")).loginName;
    // console.log(this.userInfo);
    // console.log(this.$route.params);

    this.$route.meta.title = this.$route.params.item.nickName;
    // this.asyncList = this.$route.params.asyncList;
    // console.log(this.$route.params.asyncList);

    this.$route.params.asyncList.forEach(element => {
      var obj = {};
      obj = element.content;
      this.talk.push(obj);
    });

    console.log(this.talk, 789);
    // this.queryMessage();
    this.onMsgReceive();
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll, true);
    document.activeElement.scrollIntoView();
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        this.showHeight = window.screenHeight;
      })();
    };
  },
  updated() {
    let res = this.$refs.lists;
    res.scrollTop = res.scrollHeight;
  },
  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错
    // window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    message(oldVal, NewVal) {
      if (NewVal == "") {
        this.$nextTick(() => {
          let res = this.$refs.lists;
          if (res.scrollHeight > 0) res.scrollTop = res.scrollHeight;
        });
      }
    },
    showHeight: 'inputType',
  },
  methods: {
    //查询用户单聊的历史记录
    queryMessage() {
      var that = this;
      console.log(this.userInfo, that.$route.params.item.userName, 678);
      if (that.$route.params.item.type == 3) {
        querySingleMsg(that.$route.params.item.userName, that.userInfo).then(
          res => {
            console.log(res);
            res.data.data.forEach(element => {
              var obj = {};
              obj.create_time = element.createTime;
              obj.from_id = element.fromId;
              obj.from_name = element.fromName;
              obj.from_platform = element.fromPlatform;
              obj.msg_body = element.msgBody;
              obj.msg_type = element.msgType;
              obj.target_id = element.targetId;
              obj.target_nickname = element.targetName;
              that.talk.push(obj);
            });
            console.log(that.talk, this.$route.params.asyncList);
          }
        );
      } else if (that.$route.params.item.type == 4) {
        queryGroupMsg(this.$route.params.item.userName).then(res => {
          res.data.data.messages.forEach(element => {
            var obj = {};
            obj.create_time = element.createTime;
            obj.from_id = element.fromId;
            obj.from_name = element.fromName;
            obj.from_platform = element.fromPlatform;
            obj.msg_body = element.msgBody;
            obj.msg_type = element.msgType;
            obj.target_id = element.targetId;
            obj.target_nickname = element.targetName;
            that.talk.push(obj);
          });
        });
      }
    },

    //消息实时监听
    onMsgReceive() {
      var that = this;
      JIM.onMsgReceive(function(data) {
        data = JSON.stringify(data);
        console.log(JSON.parse(data));
        var array = JSON.parse(data).messages;
        array.forEach(element => {
          console.log(element.content);
          that.talk.push(element.content);
        });
        console.log(that.talk, 333);
      });
    },

    //发起聊天
    JIMsendMsg(item) {
      var that = this;
      if (this.$route.params.item.type == 3) {
        //发送单聊信息文本
        JIM.sendSingleMsg({
          target_username: that.$route.params.item.userName,
          target_nickname: that.$route.params.item.nickName,
          content: this.message,
          appkey: that.app_key
        })
          .onSuccess(function(data, msg) {
            //data.code 返回码
            //data.message 描述
            //data.msg_id 发送成功后的消息 id
            //data.ctime_ms 消息生成时间,毫秒
            //data.appkey 用户所属 appkey
            //data.target_username 用户名
            //msg.content 发送成功消息体,见下面消息体详情
            // that.msg_id = data.msg_id;
            that.message = "";
            that.talk.push(msg.content);
            // console.log(msg.content, that.talk);
            // obj.userName
          })
          .onFail(function(data) {
            //data.code 返回码
            //data.message 描述
            console.log(data.code);
          });
      } else if (this.$route.params.item.type == 4) {
        // 发送群聊消息文本
        JIM.sendGroupMsg({
          target_gid: "41854077",
          // target_gname: this,
          content: this.message,
          // extras: "<json object>",
          at_list: [] //at all
        })
          .onSuccess(function(data, msg) {
            //data.code 返回码
            //data.message 描述
            //data.msg_id 发送成功后的消息id
            //data.ctime_ms 消息生成时间,毫秒
            //data.target_gid 群 id
            //data.unread_count 消息需要已读回执的时候,默认未读数
            //msg.content 发送成功消息体
            // console.log(data,msg);
            console.log(msg);
            that.message = "";
            that.talk.push(msg.content);
          })
          .onFail(function(data) {
            //同发送单聊文本
          });
      }
    },

    //检测高度
    inputType() {
      if (!this.timer) {
        this.timer = true;
        let that = this;
        setTimeout(() => {
          if (that.docmHeight > that.showHeight) {
            that.inputfile = false;
            if (document.activeElement.className === "weui-textarea") {
              document.getElementById("applyNote").scrollIntoView(); // 输入框的id为applyNote，class为weui-textarea
            }
          } else if (that.docmHeight <= that.showHeight) {
            that.inputfile = true;
          }
          that.timer = false;
        }, 20);
      }
    }
  }
};
</script>

<style lang="less">
#singleSation {
  background: #f1f1f1;
  // min-height: 100vh;
}
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
      align-items: center;
      margin-bottom: 0.2rem;
      .Img {
        width: 0.74rem;
        height: 0.74rem;
        line-height: 0.74rem;
        // background: #f00;
        border-radius: 50%;
      }
      .text {
        max-width: 5.6rem;
        padding: 0.2rem;
        min-height: 0.74rem;
        height: auto;
        line-height: 0.34rem;
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
// li {
//   padding: 0.2rem;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   list-style: none;
//   min-height: 0.35rem;
//   width: 100%;
//   margin: 4px 0;
// }
// li p {
//   background: #fff;
//   max-width: 5rem;
// }

// .touxiang {
//   width: 0.6rem;
//   height: 0.6rem;
//   background: hotpink;
//   line-height: 0.6rem;
//   border-radius: 50%;
// }

// .r2l {
//   direction: rtl;
//   p {
//     background: #dceeff;
//   }
// }
// .titles {
//   padding: 0 0.3rem;
//   margin-bottom: 0.2rem;
// }
// .list {
//   display: flex;
//   height: 1.3rem;
//   padding: 0 0.2rem;
//   background: #fff;
//   align-items: center;
//   border-bottom: 1px #f1f1f1 solid;
//   .text {
//     width: 1rem;
//   }
// }
// .list img {
//   // flex:1;
//   width: 0.8rem;
//   height: 0.8rem;
//   border-radius: 50%;
// }
</style>
