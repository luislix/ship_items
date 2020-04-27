<template>
  <div class="details">
    <myheader></myheader>
    <img src="@/assets/image/mttx.png" width="100%" height="190rem" />
    <div class="list">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <van-row>
            <van-col>
              <img src="../../assets/image/goods_logo.png" width="60" />
            </van-col>
            <van-col span="18" offset="1" style="text-align:left;">
              <van-col span="19"><span>{{detailList.companyName}}</span></van-col>
              <van-col span="5">
                <img style="width:20px;margin-left:0.8rem;" src="@/assets/image/dian hua.png" @click="$tools.callPhone(detailList.linkPhone)"/>
              </van-col>
            </van-col>
            <van-col style="margin-top:.2rem;margin-left:.3rem;">
              <span class="align_center">
                认证：
                <img style="margin-right:.2rem;" width="20" src="../../assets/image/service/userIcon.png" />
                <img width="20" src="../../assets/image/service/qiyeIcon.png" />
              </span>
            </van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">{{detailList.lineOfBusiness}}</span>
          <van-row>
            <van-col span="2">
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </div>
    <div id="content">
      <van-cell-group>
        <van-cell title="服务类别：" :value="detailList.portType" />
        <van-cell title="服务区域：" :value="detailList.provinceCity" />
        <van-cell title="联系人：" :value="detailList.linkName" />
        <van-cell title="服务地址：" :value="detailList.address" />
        <van-cell title="服务内容：" :value="detailList.lineOfBusiness" class="van-multi-ellipsis--l2" />
      </van-cell-group>
    </div>
    <van-action-sheet
      @select="onSelect"
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { ActionSheet } from "vant";
import { queryPyShipPort } from "@/api/index.js";
Vue.use(ActionSheet);

export default {
  data() {
    return {
      show: false,
      values: 1,
      value: "",
      detailList: "",
      actions: [],
      src: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    friendsShare() {
      this.actions = [{ name: "分享到微信朋友圈" }, { name: "分享给微信好友" }];
      this.falg = 1;
      this.show = !this.show;
    },
    cancel() {
      this.show = false;
    },
    onSelect(item, index) {
      // 可以通过 close-on-click-action 属性开启自动关闭
      switch (item.name) {
        case "分享到微信朋友圈":
          this.shareWeChat();
          break;
        case "分享给微信好友":
          this.shareWeChatFirend();
          console.log("分享给微信好友");
          break;
      }
    },
     // 分享微信朋友圈
    shareWeChat(){
          document.addEventListener('deviceready',function(){
            Wechat.isInstalled(function (installed) {
                if(installed){
                    Wechat.share({
                    message:{
                        title: "嘟嘟船讯",
                        description: "嘟嘟船讯让运输变的更简单",
                        thumb: "www/img/icon/120x120.png",
                        media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: "https://www.aiship.top:8443/CompanyHTML/code.html",
                            }
                        },
                        scene: Wechat.Scene.TIMELINE  
                        }, function () {
                        }, function (reason) {
                        });
                }
            }, function (reason) {
                alert("未检测到微信");
            });
        },false)
    },
    // 分享微信好友
    shareWeChatFirend(){
        document.addEventListener('deviceready',function(){
            Wechat.isInstalled(function (installed) {
                if(installed){
                    Wechat.share({
                    message:{
                        title: "嘟嘟船讯",
                        description: "嘟嘟船讯让运输变的更简单",
                        thumb:"www/img/icon/120x120.png",
                        media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: "https://www.aiship.top:8443/CompanyHTML/code.html",
                        }
                    },
                    scene: Wechat.Scene.SESSION
                  },
                  function() {},
                  function(reason) {
                  }
                );
              }
            },
            function(reason) {
              alert("未检测到微信");
            }
          );
        },
        false
      );
    },
    getData() {
      queryPyShipPort(this.$route.query.id, localStorage.getItem("token")).then(
        res => {
          console.log(res);
          this.detailList = res.data.data;
        }
      );
    },
    //打电话
    callPhone() {
      console.log("callPhone");
      this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `联系:` + this.detailList.linkPhone
        })
        .then(() => {
          window.location.href = "110";
        })
        .catch(() => {});
    },
  }
};
</script>
<style lang="less" scoped>
.details {
  background: #eeeeee;
  // height: 100%;
  .list {
    padding: 0.2rem 0;
    margin-bottom: 0.2rem;
    background: #ffffff;
    .icon {
      position: absolute;
      top: 65%;
      right: 2%;
    }
    .van-cell__title {
      text-align: left;
    }
  }
  #content {
    .van-cell__title {
      flex: 0.3;
      text-align: left;
    }
    .van-cell__value {
      text-align: left;
    }
    .van-cell:not(:last-child)::after{
      right: 16px;
    }
  }
}
</style>