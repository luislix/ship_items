<template>
  <div class="socialContact">
    <myheader></myheader>
    <van-tabs style="margin-bottom:.4rem;" @click="onClick">
      <van-tab style="background:#f1f1f1" title="聊天">
        <!-- <ul style="background:#fff" class="titles">
          <li>需要显示的标题</li>
          <li>需要显示的标题</li>
        </ul> -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="list"
            v-for="(item, index) in list"
            :key="index"
            @click="toConversations(item)"
          >
            <div class="count" ref="count"></div>
            <img src="../../assets/image/cat.jpg" alt="" />
            <div style="text-align:left;margin-left:.2rem" class="text">
              <p style="width:2.5rem;">{{ item.nickName }}</p>
              <p
                style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:1.5rem;"
              >
                {{ item.text }}
              </p>
            </div>
            <p style="flex:4;height:.7rem;text-align:right">
              {{ item.time | dateFtt }}
            </p>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="好友">
        <!-- <ul style="background:#fff" class="titles">
          <li>需要显示的标题</li>
          <li>需要显示的标题</li>
        </ul> -->
        <ul class="cover_list">
          <li @click="addFriends">
            <img src="@/assets/image/xinde.png" alt="" />
            <p>新的好友</p>
          </li>
          <li>
            <img src="@/assets/image/qunliao.png" alt="" />
            <p>群聊</p>
          </li>
        </ul>
        <van-index-bar
          class="indexBar"
          :sticky="false"
          highlight-color="#fb6463"
          v-for="(item, index) in firstName"
          :key="index"
        >
          <van-index-anchor style="display:none" :index="Object.keys(item)[0]" />
          <van-index-anchor :index="firstName[index].length >0 ? index : ''" />
          <div class="f_list">
            <div class="pic"></div>
            <van-cell
              v-for="(item2, index2) in item"
              :key="index2"
              :title="item2"
              @click="chooseCity(indexList, item2)"
            />
          </div>
        </van-index-bar>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
import Vue from "vue";
import { queryMsg, upLoadImg } from "@/api/index";
import { IndexBar, IndexAnchor } from "vant";
// import { Signatures } from "@/assets/js/index";
import md5 from "js-md5";

Vue.use(IndexBar).use(IndexAnchor);
export default {
  name: "socialContact",
  data() {
    return {
      fileList: [],
      userInfo: "",
      app_key: "3b25e463cba41aa87f5973f4",
      timestamp: new Date().valueOf(),
      random_str: "",
      secret: "ef5be4360ec4af46202f02fc",
      signature: "",
      nickName: "",
      talk: [],
      list: [],
      message: "",
      loading: false,
      finished: false,
      conversations: [],
      indexList: [],
      asyncList: [],
      avatar: "",
      Imglist: [],
      friend_list: [],
      FirstPin: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      firstName: {},
      friend_version: {},
      request_list: [],
      num: 0,
      jmPush: [],
      rest: []
    };
  },
  created() {
    console.log(this.$route.meta);
    var that = this;
    this.userInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.JIMLogin();
    this.request_list = JSON.parse(localStorage.getItem("request_list"))
      ? JSON.parse(localStorage.getItem("request_list"))
      : [];
  },
  watch: {
    avatar: function(oldVal, Newval) {
      console.log(oldVal, Newval);
    }
  },
  mounted() {},
  filters: {
    dateFtt(date,fmt) {
      //author: meizz
      var date = new Date(date);
      console.log(date);
      fmt = "yyyy-MM-dd hh:mm:ss";
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    toStringTime(mss) {
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      return `${hours}:${minutes}`;
    }
  },
  methods: {
    //生成随机数
    randoms() {
      var str = "",
        range = 20, //min
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
      // 随机产生
      if (true) {
        range = Math.round(Math.random() * (36 - 20)) + 20;
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    //生成签名;
    Signatures() {
      return new Promise((resolve, reject) => {
        var random_str = this.randoms();
        var app_key = "3b25e463cba41aa87f5973f4";
        var timestamp = new Date().valueOf();
        var secret = "ef5be4360ec4af46202f02fc";
        var signature = md5(
          `appkey=${app_key}&timestamp=${timestamp}&random_str=${random_str}&key=${secret}`
        );
        console.log(signature);
        if (signature) {
          JIM.init({
            appkey: app_key,
            random_str: random_str,
            signature: signature,
            timestamp: timestamp,
            flag: 1
          })
            .onSuccess(function(data) {
              console.log("初始化成功!");
              JIM.loginOut();
              resolve();
            })
            .onFail(function(data) {
              console.log("初始化失败");
            });
        }
      });
    },
    //用户即时通讯注册登录
    async JIMLogin() {
      var that = this;
      await this.Signatures();
      this.Signatures().then(res => {
        return new Promise((resolve, reject) => {
          JIM.login({
            username: this.userInfo.loginName,
            password: 123456
          })
            .onSuccess(function(data) {
              //data.code 返回码
              //data.message 描述
              // that.queryMessage();
              JIM.onMsgReceive(function(data) {
                data = JSON.stringify(data);
                that.rest = data;
                that.jmPush = JSON.parse(data).messages;
                console.log(that.jmPush);
                that.jmPush.forEach(item => {
                  that.list.forEach(element => {
                    if (
                      item.content.target_type == "group" &&
                      item.content.target_id == element.userName
                    ) {
                      element.text = item.content.msg_body.text; 
                      element.time = item.time;
                      console.log(element);
                    } else if (
                      item.content.target_type == "single" &&
                      item.content.from_id == element.userName
                    ) {
                      element.text = item.content.msg_body.text;
                      element.time = item.ctime_ms;
                    }
                  });
                });
              });
              that.getConverstation();
              that.getFriendList();
              that.responseFriend();
              console.log("登录成功");
            })
            .onFail(function(data) {
              //同上
              console.log("登录失败");
            });
        });
      });
    },

    // 好友应答
    responseFriend() {
      var that = this;
      //邀请方收到该事件
      JIM.onEventNotification(function(data) {
        // console.log(data);
        that.num++;
        var obj = {};
        obj.event_type = data.event_type;
        obj.from_username = data.from_username;
        obj.ctime = data.ctime;
        obj.from_nickname = data.from_nickname;
        obj.description = data.description;
        obj.flag = 2;
        that.request_list.push(obj);
        console.log(that.request_list, 777);
        localStorage.setItem("request_list", JSON.stringify(that.request_list));
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
    },

    onClick(name, title) {
      this.$toast(title);
    },

    //获取用户个人信息
    res() {
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
          console.log(data, "上传成功");
          that.friend_version = data.user_info;
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
          console.log(data, "上传失败");
        });
    },
    //获取会话列表
    async getConverstation() {
      await this.getAsyncCoversation();
      var that = this;
      JIM.getConversation()
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          //data.conversations[] 会话列表，属性如下示例
          //data.conversations[0].extras 附加字段
          //data.conversations[0].unread_msg_count 消息未读数
          //data.conversations[0].name  会话名称
          //data.conversations[0].appkey  appkey(单聊)
          //data.conversations[0].username  用户名(单聊)
          //data.conversations[0].nickname  用户昵称(单聊)
          //data.conversations[0].avatar  头像 media_id
          //data.conversations[0].mtime 会话最后的消息时间戳
          //data.conversations[0].gid 群 id(群聊)
          //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
          // console.log(data.conversations, 333);
          console.log(that.asyncList, 555);
          if (data.conversations.length > 0) {
            data.conversations.forEach((element, index) => {
              var obj = {};
              obj.userName = element.type == 3 ? element.username : element.gid;
              obj.avatar = that.avatar;
              obj.count = element.unread_msg_count;
              obj.nickName =
                element.type == 3 ? element.nickName : element.name;
              obj.time = element.mtime;
              obj.type = element.type;
              that.asyncList.forEach(item => {
                if (
                  item.msg_type == 3 &&
                  item.from_username == element.username
                ) {
                  obj.text =
                    item.msgs[item.msgs.length - 1].content.msg_body.text;
                  console.log(obj.text);
                } else if (item.msg_type == 4 && item.from_gid == element.gid) {
                  obj.text =
                    item.msgs[item.msgs.length - 1].content.msg_body.text;
                }
              });
              // obj.text =
              //   that.asyncList[index].msgs[
              //     that.asyncList[index].msgs.length - 1
              //   ].content.msg_body.text;
              if (obj.type == 4) {
                that.list.unshift(obj);
              } else {
                that.list.push(obj);
              }
            });
          }
          console.log(that.list, 888);
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
        });
    },

    //下载头像到本地
    loadImage(path) {
      var that = this;
      return new Promise((resolve, reject) => {
        resolve(
          $.ajax({
            url: "http://192.168.0.129:8081/web_war/IM/downloadFile",
            type: "post",
            data: {
              path: path
            },
            success: function(res) {
              return res;
            }
          })
        );
      });
    },

    //进入单聊对话
    toConversations(item) {
      var NewArr = [];
      // console.log(this.jmPush, this.asyncList);
      this.asyncList.forEach(item => {
        this.jmPush.forEach(el => {
          if (el.from_gid == item.from_gid && el.msg_type == item.msg_type) {
            var obj = {};
            obj.ctime_ms = el.ctime_ms;
            obj.msg_type = el.msg_type;
            obj.need_receipt = el.need_receipt;
            obj.custom_notification = el.custom_notification;
            obj.msg_id = el.msg_id;
            obj.content = el.content;
            obj.msg_level = el.msg_level;
            item.msgs.push(obj);
          } else if (
            el.from_username == item.from_username &&
            el.msg_type == item.msg_type
          ) {
            var obj = {};
            obj.ctime_ms = el.ctime_ms;
            obj.msg_type = el.msg_type;
            obj.need_receipt = el.need_receipt;
            obj.custom_notification = el.custom_notification;
            obj.msg_id = el.msg_id;
            obj.content = el.content;
            obj.msg_level = el.msg_level;
            // console.log(obj,this.jmPush);
            item.msgs.push(obj);
          }
        });
      });
      this.asyncList.forEach(element => {
        if (
          (item.type == element.msg_type &&
            item.userName == element.from_username) ||
          (item.type == element.msg_type && item.userName == element.from_gid)
        ) {
          NewArr = element.msgs;
        }
      });
      this.$router.push({
        name: "singleSation",
        params: { item: item, asyncList: NewArr }
      });
    },

    //更新头像
    sendImage(file) {
      var formData = new FormData();
      formData.append("imgfile", file.file);
      JIM.updateSelfAvatar({
        avatar: formData
      })
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          console.log(data, "成功");
        })
        .onFail(function(data) {
          //同上
          console.log(data, "失败");
        });
    },

    //获取离线监听消息
    getAsyncCoversation() {
      var that = this;
      return new Promise((resolve, reject) => {
        resolve(
          JIM.onSyncConversation(function(data) {
            that.asyncList = data;
            if (that.jmPush.length > 0) {
              that.asyncList.concat(that.jmPush);
            }
            // data[]
            // data[].msg_type 会话类型
            // data[].from_appey 单聊有效
            // data[].from_username 单聊有效
            // data[].from_gid 群聊有效
            // data[].unread_msg_count 消息未读数
            // 消息已读回执状态，针对自己发的消息
            // data[].receipt_msgs[]
            // data[].receipt_msgs[].msg_id
            // data[].receipt_msgs[].unread_count
            // data[].receipt_msgs[].mtime
            // 消息列表
            // data[].msgs[]
            // data[].msgs[].msg_id
            // data[].msgs[].content
            // data[].msgs[].msg_type
            // data[].msgs[].ctime_ms
            // data[].msgs[].need_receipt
            // data[].msgs[].custom_notification.enabled
            // data[].msgs[].custom_notification.title
            // data[].msgs[].custom_notification.alert
            // data[].msgs[].custom_notification.at_prefix
          })
        );
      });
    },

    //获取好友列表
    getFriendList() {
      var that = this;
      JIM.getFriendList()
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          //data.friend_list[] 好友列表，示例如下
          //data.friend_list[0].username
          //data.friend_list[0].appkey
          //data.friend_list[0].nickname
          //data.friend_list[0].avatar 头像
          //data.friend_list[0].memo_nam 好友备注
          //data.friend_list[0].memo_others 其他备注
          //data.friend_list[0].birthday 生日，默认空
          //data.friend_list[0].gender 性别 0 未知， 1 男 ，2 女
          //data.friend_list[0].signature 用户签名
          //data.friend_list[0].region 用户所属地区
          //data.friend_list[0].address 用户地址
          //data.friend_list[0].mtime 用户信息最后修改时间
          console.log(data.friend_list,9998);
          data.friend_list.forEach(element => {
            var obj = {};
            obj.avatar = element.avatar;
            obj.userName = element.username;
            obj.nickName = element.nickname;
            obj.type = 3;
            that.indexList.push(obj);
          });
          let arr = [];
          for (let p in that.indexList) {
            arr.push(that.indexList[p].nickName);
          }
          console.log(arr);
          let pinyin = require("js-pinyin");
          pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
          that.FirstPin.forEach(item => {
            that.firstName[item] = [];
            arr.forEach(el => {
              let first = pinyin.getFullChars(el).substring(0, 1);
              if (first == item) {
                that.firstName[item].push(el);
                // console.log(that.firstName[index],999);
              }
            });
          });
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
          console.log("获取失败！");
        });
    },

    syncEvent() {
      JIM.onSyncEvent(function(data) {
        console.log(data);
      });
    },

    addFriends() {
      this.$router.push({
        path: "/friends",
        query: { num: this.num }
      });
    },
    //获取群列表
    getGroup() {
      JIM.getGroupInfo({
        gid: "41854077"
      })
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          //data.group_info.gid 群id
          //data.group_info.name 群名
          //data.group_info.desc 群描述
          //data.group_info.appkey 群所属appkey
          //data.group_info.ctime 群创建时间
          //data.group_info.mtime 最近一次群信息修改时间
          //data.group_list[0].avatar 群头像
          //data.group_list[0].group_type 公开群:2,私有群:0或者1
          console.log(data.group_info);
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
        });
    },
    chooseCity(indexList, item2) {
      console.log(item2, indexList);
      this.asyncList.forEach(item => {
        this.jmPush.forEach(el => {
          if (el.from_gid == item.from_gid && el.msg_type == item.msg_type) {
            var obj = {};
            obj.ctime_ms = el.ctime_ms;
            obj.msg_type = el.msg_type;
            obj.need_receipt = el.need_receipt;
            obj.custom_notification = el.custom_notification;
            obj.msg_id = el.msg_id;
            obj.content = el.msg_level;
            obj.msg_level = el.content;
            item.msgs.push(obj);
          } else if (
            el.from_username == item.from_username &&
            el.msg_type == item.msg_type
          ) {
            var obj = {};
            obj.ctime_ms = el.ctime_ms;
            obj.msg_type = el.msg_type;
            obj.need_receipt = el.need_receipt;
            obj.custom_notification = el.custom_notification;
            obj.msg_id = el.msg_id;
            obj.content = el.msg_level;
            obj.msg_level = el.content;
            item.msgs.push(obj);
          }
        });
      });
      console.log(this.asyncList);
      var NewArr = [];
      console.log(this.indexList);
      this.asyncList.forEach(item => {
        this.indexList.forEach(element => {
          if (
            element.userName == item.from_username &&
            element.nickName == item2
          ) {
            NewArr = item.msgs;
            this.$router.push({
              name: "singleSation",
              params: { item: element, asyncList: NewArr }
            });
          } else {
            this.$router.push({
              name: "singleSation",
              params: { item: element }
            });
          }
        });
      });
    },
    selectIndex() {
      console.log(111);
    },

    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.conversations.length) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less">
#app{
    background: #f1f1f1;
}
.socialContact {
  min-height: 12.5rem;
  padding-bottom: 1rem;
  height: auto;
  background: #f1f1f1;
  .van-tabs__line {
    background-color: #0470dc;
  }
  li {
    padding: 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    min-height: 0.35rem;
    width: 100%;
    margin: 4px 0;
    li p {
      background: #fff;
      max-width: 5rem;
    }
  }
  .van-tabs--line .van-tabs__wrap {
    margin-bottom: 0.15rem;
  }
  .cover_list {
    padding: 0 0.2rem;
    background: #fff;
    li {
      height: 0.9rem;
      display: flex;
      align-items: center;
      border-bottom: 1px #f1f1f1 solid;
      img {
        width: 0.35rem;
        margin-right: 0.2rem;
      }
    }
  }
  .titles {
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
  }
  .list {
    display: flex;
    height: 1.3rem;
    padding: 0 0.2rem;
    background: #fff;
    align-items: center;
    border-bottom: 1px #f1f1f1 solid;
    position: relative;
    .text {
      width: 1rem;
    }
    .count {
      width: 0.15rem;
      height: 0.15rem;
      border-radius: 50%;
      background: #f00;
      position: absolute;
      top: 0.24rem;
      left: 0.8rem;
      display: none;
    }
  }
  .list img {
    // flex:1;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
  .van-tab__pane {
    text-align: left;
    .van-index-anchor {
      background: #f1f1f1;
    }
  }
}

// .f_list {
//   display: flex;
// }
// .pic {
//   width: 0.75rem;
//   height: 0.75rem;
//   border-radius: 50%;
//   background: #f00;
// }

.touxiang {
  width: 0.6rem;
  height: 0.6rem;
  background: hotpink;
  line-height: 0.6rem;
  border-radius: 50%;
}
.r2l {
  direction: rtl;
  p {
    background: #dceeff;
  }
}
</style>
