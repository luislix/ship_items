<template>
  <div class="friends">
    <myheader></myheader>
    <div>
      <input
        class="search_friend"
        type="text"
        placeholder="搜索好友"
        v-model="number"
      />
      <img
        @click="addFriend"
        class="Img"
        src="../../assets/image/icon-test.png"
        alt=""
      />
    </div>
    <!-- <button @click="addFriend">添加好友</button>
    <button @click="acceptFriend">回执同意好友</button> -->
    <ul>
      <li v-for="(item, index) in friend_version" :key="index">
        <div class="left">
          <div class="h_Img"></div>
          <p>{{ item.nickname }}</p>
        </div>
        <div>
          <button @click="acceptFriend(item)" class="accept">同意</button>
          <button @click="delFriend(item)" class="accept">拒绝</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Notify } from "vant";
import { requestFriend, queryRequestList } from "@/api/index";
export default {
  name: "friends",
  data() {
    return {
      app_key: "3b25e463cba41aa87f5973f4",
      flag: 0,
      friend_version: [],
      list: [],
      number: "",
      loginName: ""
    };
  },
  created() {
    console.log(this.$route.query.num);
    this.loginName = JSON.parse(
      localStorage.getItem("userLoginInfo")
    ).loginName;
    this.queryFriendRequestList();
  },
  updated() {},
  methods: {
    queryFriendRequestList() {
      queryRequestList(this.loginName).then(res => {
        this.friend_version = res.data.data;
        console.log(this.friend_version);
      });
    },
    addFriend() {
      var that = this;
      JIM.addFriend({
        target_name: this.number,
        why: "请求添加好友",
        appkey: this.app_key
      })
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          Toast.success("已发送请求");
          //添加进本地数据库
          requestFriend(that.loginName, that.number, 1).then(res => {
            if (res.data.code == 200) {
            }
          });
          // console.log("添加成功");
        })
        .onFail(function(data) {
          // 同上
          if(data.code == 881302)
          Toast.fail("对方已经是您的好友");
        });
    },
    // 对方同意添加好友
    acceptFriend(item) {
      console.log(item);
      var that = this;
      JIM.acceptFriend({
        target_name: item.username,
        appkey: this.app_key
      })
        .onSuccess(function(data) {
          //data.code 返回码
          requestFriend(that.loginName, item.username, 2).then(res => {
            if (res.data.code == 200) {
              Toast.success("同意添加好友");
              setTimeout(() => {
                that.sendMsg(item.username,item.nickname);
              }, 1000);
              that.queryFriendRequestList();
            }
          });
          //data.message 描述
          // console.log("同意回执");
        })
        .onFail(function(data) {
          // 同上
        });
    },

    sendMsg(name1,name2) {
      JIM.sendSingleMsg({
        target_username: name1,
        target_nickname: name2,
        content: "我通过了你的朋友验证请求，现在我们可以开始聊天了",
        appkey: this.app_key,
      })
        .onSuccess(function(data, msg) {
          console.log(111);
          //data.code 返回码
          //data.message 描述
          //data.msg_id 发送成功后的消息 id
          //data.ctime_ms 消息生成时间,毫秒
          //data.appkey 用户所属 appkey
          //data.target_username 用户名
          //msg.content 发送成功消息体,见下面消息体详情
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
        });
    },

    delFriend(item) {
      var that = this;
      JIM.declineFriend({
        target_name: item.username,
        why: "对方已拒绝",
        appkey: this.app_key
      })
        .onSuccess(function(data) {
          requestFriend(that.loginName, item.username, 3).then(res => {
            if (res.data.code == 200) {
              Toast.success("已拒绝");
              that.queryFriendRequestList();
            }
          });
          //data.code 返回码
          //data.message 描述
          console.log(data);
        })
        .onFail(function(data) {
          // 同上
        });
    },

    // requestFriend() {
    //   var that = this;
    //   JIM.addFriend({
    //     target_name: "15010937041",
    //     why: "请求添加好友",
    //     appkey: this.app_key
    //   })
    //     .onSuccess(function(data) {
    //       //data.code 返回码
    //       //data.message 描述
    //       console.log(data.code);
    //       // that.responseFriend();
    //     })
    //     .onFail(function(data) {
    //       // 同上
    //       console.log(data.code);
    //     });
    // },

    //获取用户个人信息
    getUserInfo() {
      var that = this;
      JIM.getUserInfo({
        username: this.number,
        appkey: this.app_key
      })
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          //data.user_info.username
          //data.user_info.appkey
          //data.user_info.nickname
          //data.user_info.avatar 头像
          //data.user_info.birthday 生日，默认空
          //data.user_info.gender 性别 0 - 未知， 1 - 男 ，2 - 女
          //data.user_info.signature 用户签名
          //data.user_info.region 用户所属地区
          //data.user_info.address 用户地址
          //data.user_info.mtime 用户信息最后修改时间
          //data.extras 自定义json字段
          that.UserInfo = data.user_info;
          that.$router.push({
            name: "userInfo",
            params: { data: that.UserInfo }
          });
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
          console.log(data, "上传失败");
        });
    },
    // 好友应答
    responseFriend() {
      var that = this;
      //邀请方收到该事件
      JIM.onEventNotification(function(data) {
        console.log(data);
        // this.friend_version = data;
        // console.log(data, 888);
        // this.friend_version.push(obj);
        //data.event_id 事件 id
        //data.event_type 事件类型
        //data.ctime_ms 事件生成时间
        //data.from_username 被邀请方 username
        //data.from_appkey 被邀请方 appkey
        //data.extra 1-来自邀请方的事件，2－来自被邀请方，即好友邀请的应答事件
        //data.return_code 0－添加好友成功，其他为添加好友被拒绝的返回码
        //data.media_id 被邀请方头像
        //data.description 原因
      });

      JIM.onSyncEvent(function(data) {
        // data 为事件数组 [event1,event2,...]
        console.log(data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.friends {
  background: #f1f1f1;
  height: 100%;
  div {
    // padding: .2rem 0;
    position: relative;
    .search_friend {
      padding-left: 1rem;
      display: block;
      width: 100%;
      height: 0.8rem;
      // text-align: center;
      line-height: 0.8rem;
      outline: none;
      border: none;
      // border-radius: 0.15rem;
    }
    .Img {
      width: 0.4rem;
      position: absolute;
      top: 0.2rem;
      left: .4rem;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd;
      /* placeholder字体大小  */
      font-size: 12px;
      /* placeholder位置  */
      text-align: left;
    }
  }
  ul {
    padding: 0 0.3rem;
    background: #fff;
    margin-top: .3rem;
    li {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      align-items: center;
      border-bottom: 1px #f1f1f1 solid;
      // margin-bottom: .2rem;
      .left {
        display: flex;
        align-items: center;
        .h_Img {
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 50%;
          background: #f00;
          margin-right: 0.15rem;
        }
      }
      .accept {
        width: 1rem;
        height: 0.46rem;
        background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
        border: none;
        outline: none;
        border-radius: 0.05rem;
        color: #fff;
        margin: 0 0.15rem;
      }
    }
  }
  .userInfo {
    padding: 0.2rem;
    .userInfo_img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background: #f00;
    }
    ul {
      li {
        height: 0.3rem;
        line-height: 0.3rem;
      }
    }
  }
}
</style>
