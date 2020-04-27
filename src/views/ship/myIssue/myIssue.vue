<template>
  <div id="myIssue">
    <Header></Header>
    <van-tabs v-model="active" v-if="userType == 8">
      <van-tab title="批量船源"  name="1" v-if="userType == 8">
                            <!-- ------------------------------批量船----------------------------------- -->
      <div class="ships" v-for="(item,index) in this.shiplist" :key="index"  @click="Bulkboatjump(item)" style="margin-top:0.1rem" >
          <van-row
            class="myIssue_list"
          >
            <van-row class="myIssue_ship">
              <van-row class="textColor_blue" style="color:#0470dc">
                <van-col
                  span="8"
                  class="float_l"
                          style="font-weight:550"
                >
                {{item.whether== "false"?item.location:item.startAddress}} 
                </van-col>
                <van-col span="8" style="margin-top:-0.05rem;color:#0470dc" >
                  <img src="@/assets/image/箭头.png" />
                </van-col>
                <van-col
                  span="8"
                  class="float_r"
                          style="font-weight:550"
                >
                {{item.whether== "false"?item.placeOfArrival:item.endAddress}} 
                </van-col>
              </van-row>
                    <van-col span="14" style="margin-top:0.1rem">
                      装货日期:{{item.whether== "false"?item.startDate:item.startTime}} 
                      </van-col>
                  </van-row>

            <van-row style="margin-top:0.1rem">
                  <van-col span="14">
                      最后更新:{{item.whether== "false"?item.endDate:item.endTime}} 
                      </van-col>
              </van-row>


                </van-row>
        </div>
       <!-- ---------------------- 船-------------------------- -->
      <van-row
        v-show="myIssue_list.length"
        class="myIssue_list"
        v-for="(item, index) in myIssue_list"
        :key="index"
        @click="lookOrderDetails(item)"
        >
        <van-row class="myIssue_ship">
          <van-row class="textColor_blue">
            <van-col span="8" class="float_l"
                    style="font-weight:550"
              >{{ item.startAddress}}</van-col
            >
            <van-col span="8" style="margin-top:-0.05rem;">
              <img src="@/assets/image/箭头.png" />
            </van-col>
            <van-col span="8" class="float_r"
                    style="font-weight:550"
              >{{ item.endAddress}}</van-col
            >
          </van-row>
          <van-row class="textColor_gray">
            <van-col span="16" class="float_l"
              >装货日期:{{ item.startTime | formatTime }}</van-col
            >
            <van-col
              span="6"
              class="float_r"
              v-if="item.orderStatus == 10 || item.orderStatus == 2"
            >
              <van-tag round type="primary">待确认</van-tag>
            </van-col>
          </van-row>
          <van-row class="textColor_gray">
            <van-col span="16" class="float_l"
              >最后更新:{{ item.modifyTime | formatTime }}</van-col
            >
            <!-- <van-col span="6" class="float_r" @click.stop="share(item)">
              <van-col class="iconfont icon-fabu icon_size"></van-col>
              <van-col>分享</van-col>
            </van-col> -->
          </van-row>
        </van-row>
      </van-row>
    </van-tab>

    <!-- ------------------------------批量货----------------------------------- -->
  
    <van-tab title="批量货源"  name="2" v-if="userType == 8">
             <!-- ----------爬虫货----------- -->
    <div class="ships" v-for="(item,index) in this.cargolist" :key="index"  @click="Bulkjump(item)"   style="margin-top:0.1rem;" >
      <van-row
        class="myIssue_list"
      >
        <van-row class="myIssue_ship">
          <van-row class="textColor_blue" style="color:#0470dc">
            <van-col
              span="8"
              class="float_l"
              style="color:rgb(13, 151, 239);font-weight:550"
            >
            {{item.whether== "false"?item.location:item.startAddress}} 
            </van-col>
            <van-col span="8" style="margin-top:-0.05rem;">
              <img src="@/assets/image/箭头.png" />
            </van-col>
            <van-col
              span="8"
              class="float_r"
              style="font-weight:550"
            >
            {{item.whether== "false"?item.placeOfArrival:item.endAddress}} 
            </van-col>

          </van-row >

              <van-row class="textColor_gray" style="margin-top: 0.2rem">
                <van-col span="14" class="float_l"
                  >货物重量: {{item.whether== "false"?item.tonnage:item.actualTotalWeight}} 吨</van-col
                >

                <van-col span="10" style="text-align:right"
                  >最后更新:
                  {{item.whether== "false"?item.startDate:item.loadingStartTime}} 
                  </van-col
                >
              </van-row>
              <van-row class="textColor_gray">
                <van-col span="24" class="float_l"
                  >装货日期:
                  {{item.whether== "false"?item.endDate:item.loadingStartTime}} 
                  </van-col 
                >
              </van-row>
            </van-row>
          </van-row>
        </div>


        <!-- --------------------------正式货------------------------------------ -->
        <van-row
          class="myIssue_list"
          v-for="(item, index) in list"
          :key="index"
          @click="goodsDetail(item)"
          >
          <van-row>
          </van-row>
          <van-row
            style="font-size:.28rem;color:#0D97EF;font-weight:550;height:.6rem;line-height:.6rem;"
          >
            <van-col span="8">
              {{ item.startAddress}}
            </van-col>
            <van-col span="8" style="margin-top:-0.1rem;">
              <img src="@/assets/image/箭头.png" />
            </van-col>
            <van-col style="text-align:right" span="8">
              {{ item.endAddress}}
            </van-col>
            </van-row>
            <van-row
              style="font-size:.28rem;color:#666;height:.4rem;line-height:.4rem;margin-top:0.22rem;"
            >
            <van-col span="10">
              <span style="margin-right:.1rem;">货物重量</span>
              <span>{{item.actualTotalWeight}}吨</span>
            </van-col>

            <van-col
              style=" text-align:right;font-size:.28rem;color:#666; "
              span="10"
              offset="4"
              >最后更新:{{ item.modifyTime | myDate }}</van-col
            >
          </van-row>
          <van-row>
            <van-col
              style="text-align:left;font-size:.28rem;color:#666; margin-top:0.05rem; padding-bottom:0.15rem;"
              span="10"
              >装货日期:{{ item.loadingStartTime | myDate }}</van-col
            >
            <van-col
              span="12"
              class="float_r"
              v-if="item.orderStatus == 10 || item.orderStatus == 2"
            >
            <van-tag round type="primary">待确认</van-tag>
          </van-col>

        </van-row>
      </van-row>
      </van-tab>
    </van-tabs>

    <div class="ships" v-if="userType == 3">
      <van-row
        v-show="myIssue_list.length"
        class="myIssue_list"
        v-for="(item, index) in myIssue_list"
        :key="index"
        @click="lookOrderDetails(item)"
        >
        <van-row class="myIssue_ship">
          <van-row class="textColor_blue">
            <van-col span="8" class="float_l"
              >{{ item.startAddress}}</van-col>
            <van-col span="8" style="margin-top:-0.05rem;">
              <img src="@/assets/image/箭头.png" />
            </van-col>
            <van-col span="8" class="float_r"
              >{{ item.endAddress}}</van-col
            >
          </van-row>
          <van-row class="textColor_gray">
            <!-- <van-col span="2">
              <span class="iconfont icon-yingwenmingcheng icon_size"></span>
            </van-col> -->
            <van-col span="16" class="float_l"
              >装货日期:{{ item.startTime | formatTime }}</van-col
            >
             <!-- <van-col
              span="6"
              class="float_r"
              v-if="item.orderStatus == 10 || item.orderStatus == 2"
            >
              <van-tag round type="primary">待确认</van-tag>
            </van-col> -->
          </van-row>
          <van-row class="textColor_gray">
            <!-- <van-col span="2">
              <span class="iconfont icon-shizhong icon_size"></span>
            </van-col> -->
            <van-col span="16" class="float_l"
              >最后更新:{{ item.modifyTime | formatTime }}</van-col
            >
            <van-col
            span="6"
            class="float_r"
            v-if="item.orderStatus == 10 || item.orderStatus == 2"
          >
            <van-tag round type="primary">待确认</van-tag>
          </van-col>
            <!-- <van-col span="6" class="float_r" @click.stop="share(item)">
              <van-col class="iconfont icon-fabu icon_size"></van-col>
              <van-col>分享</van-col>
            </van-col> -->
          </van-row>
        </van-row>
      </van-row>
      <van-col v-show="myIssue_list.length>0?false:true" style="margin-top:1rem;" span="24">您暂无发布信息！请点击添加发布。</van-col>
    </div>

    <div class="goods" v-if="userType == 2 ">
      <van-row
        class="myIssue_list"
        v-for="(item, index) in list"
        :key="index"
        @click="goodsDetail(item)"
        >
        <van-row>
        </van-row>
        <van-row style="font-size:.28rem;color:#0D97EF;font-weight:550;height:.6rem;line-height:.6rem;">
          <van-col span="8">
            {{ item.startAddress}}
          </van-col>
          <van-col span="8" style="margin-top:-0.1rem;">
            <img src="@/assets/image/箭头.png" />
          </van-col>
          <van-col style="text-align:right" span="8">
            {{ item.endAddress}}
          </van-col>
        </van-row>
        <van-row
          style="font-size:.28rem;color:#666;height:.4rem;line-height:.4rem;margin-top:0.22rem;"
        >
          <van-col span="10">
            <span style="margin-right:.1rem;">货物重量</span>
            <span>{{item.actualTotalWeight}}吨</span>
          </van-col>

          <van-col
            style=" text-align:right;font-size:.28rem;color:#666; "
            span="10"
            offset="4"
            >最后更新:{{ item.modifyTime | myDate }}</van-col
          >
        </van-row>
        <van-row>
          <van-col
            style="text-align:left;font-size:.28rem;color:#666; margin-top:0.05rem; padding-bottom:0.15rem;"
            span="10"
            >装货日期:{{ item.loadingStartTime | myDate }}</van-col
          >
          <van-col
            span="12"
            class="float_r"
            v-if="item.orderStatus == 10 || item.orderStatus == 2"
          >
            <van-tag round type="primary">待确认</van-tag>
          </van-col>

        </van-row>
      </van-row>
      <van-col v-show="list.length>0?false:true" style="margin-top:1rem;" span="24">您暂无发布信息！请点击添加发布。</van-col>
    </div>
    <van-action-sheet
      @select="onSelect"
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="show = false"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// import { timeToLocaleString } from "../../../assets/js/index";
import { shipRecommendedOrder, getMyIssue, Releaseship,goodscancelShip } from "@/api/index";
export default {
  data() {
    return {

      listss: [],
      loading: false,
      finished: false,

      active: "",
      shiplist: [],
      cargolist: [],
      // ----------------------------
      myIssue_list: "",
      userType: JSON.parse(localStorage.getItem("userLoginInfo")).userType,
      data: {
        pageNum: 1,
        pageSize: 15,
        lat: 31.22,
        lng: 115.05
      },
      list: "",
      show: false,
      actions: [
        { name: "分享到微信朋友圈" },
        { name: "分享给微信好友" },
        // { name: "分享到QQ" }
      ],
      params: {
        params: { queryType: 1 }
      },
      listtwo:[],
      huoshwo:false
    };
  },
  created() {
    // if(this.userType == 8){
    //   return
    // }

    // if(this.userType == 2  || this.userType == 3){
    this.getMyselfMessage();
    this.getMyIssue(this.data, localStorage.getItem("token"));
    // }
  },
  methods: {

     onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.listss.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.listss.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },

                        //  船--------------------
    Bulkboatjump(item) {
      console.log(item);
      console.log(11111111);
      
      // return 

     if(item.whether != "false" ){
          this.$router.push({
        path: "/shipOrderDetails",
        query: {
          shipId:item.shipInfoId,
          // orderStatus:0
        }
      });
     }
  
  if(item.whether == "false"){
      window.localStorage.setItem("Releaselist",JSON.stringify(item))
      this.$router.push({
        path: "/Enterprisesourcedetails",
        query: {
          obj: item
        }
      });
      }
    },
    


// ----------------- 货主-----------------
    Bulkjump(item) {
      // window.localStorage.setItem("Releaselist",JSON.stringify(item))
      console.log(2222222222222)
      // return;
// -----
     if(item.whether == "false"){
      console.log(11111111111);
      window.localStorage.setItem("Releaselist",JSON.stringify(item))
       this.$router.push({
        path: "/Enterprisecargodetails",
        query: {
          obj: item
        }
      });
      }
      


// ---
      if(item.whether != "false"){
        console.log(2222222222222222);
      this.$router.push({
        path: "/goodsRecDetail",
        query: {
          id: item.goodsOrderId
        }
      });
      }

  
    },

    // ---------------------------------------------------------------------------
    getMyselfMessage() {
      this.data.params = {
        userId: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      };
      shipRecommendedOrder(this.data, localStorage.getItem("token")).then(
        res => {
          console.log(res.data.data.list,11111111111111);
          this.list = res.data.data.list;
        }
      );
    },

    goodsDetail(item) {
      this.$router.push({
        path: "/goodsRecDetail",
        query: {
          id: item.goodsOrderId,
          orderStatus: item.orderStatus == 2 || item.orderStatus == 10 ? 1 : 0
        }
      });
    },

    // 船主获取我的发布
    getMyIssue(data, token) {
      // console.log(11111);
      // console.log(this.active,2222);
            
      this.data.params = {
        userId: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      };

      if(this.userType == 8){
          getMyIssue(data, token).then(res => {
          // console.log(res,"陈维船数据");
          if (res.data.code == 200) {
            this.myIssue_list = res.data.data.list;
            console.log(this.myIssue_list,"陈维船数据");
          }
        })

        }
    
    if(this.userType == 8 && this.huoshwo == true){
         shipRecommendedOrder(data, token).then(res => {
          // console.log(res,"陈维货数据");
          if (res.data.code == 200) {
            this.list = res.data.data.list;
            console.log(this.list,"陈维货数据");
            this.listtwo = res.data.data.list
            
          }
        });

    }
      

// -------------------------------------------------------
      if (this.userType == 3 ) {

        getMyIssue(data, token).then(res => {
          console.log(res,"陈维船数据");
          if (res.data.code == 200) {
            this.myIssue_list = res.data.data.list;
            console.log(this.myIssue_list,"陈维船数据");
          }
        })
      } 

        else if (this.userType == 2 ) {

        shipRecommendedOrder(data, token).then(res => {
          console.log(this.huoshwo);
          
          if (res.data.code == 200) {
            this.list = res.data.data.list;
            console.log(this.list,"陈维货数据");
            this.listtwo = res.data.data.list
            
          }
        });
      }
      // console.log(this.myIssue_list);
      // console.log(this.list);
    },
    // 前往查看货源详情
    lookOrderDetails(item) {
      console.log(item);
      this.$router.push({
        path: "/shipOrderDetails",
        query: {
          shipId: item.emptyShipOrderId,
          orderStatus: item.orderStatus == 2 || item.orderStatus == 10 ? 1 : 0
        }
      });
    },
    // 分享
    share(item) {
      console.log(item);
      this.show = !this.show;
    },
    //
    onSelect(item, index) {
      console.log(item, index);
      switch (item.name) {
        case "分享到微信朋友圈":
          this.shareWeChat();
          break;
        case "分享给微信好友":
          this.shareWeChatFirend();
          break;
        case "分享到QQ":
          this.$toast("分享到QQ");
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
  },
  watch: {
    active(val) {
      this.params.params.queryType = Number(val);
       this.data.params = {
        userId: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      };
      
      
      if (val == 1) {
         this.cargolist = []
        //  this.list = []
        //   getMyIssue(data, token).then(res => {
        //   console.log("发布船只", res);
        //   if (res.data.code == 200) {
        //     this.myIssue_list = res.data.data.list;
        //     console.log(this.myIssue_list,444);
        //   }
        // })
        Releaseship(this.params, localStorage.getItem("token")).then(res => {
          console.log(res, "邓炎批量船");

          // return

          var pacongchuan = res.data.data.list
          console.log(this.shiplist);
           
         pacongchuan.forEach(element => {
             if(element.whether == "false"){
               this.shiplist.push(element)
             }
         });
           


          for (var i in this.shiplist) {
            var date = new Date(this.shiplist[i].startDate);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.shiplist[i].startDate = Y + M + D;
          }

          for (var i in this.shiplist) {
            var date = new Date(this.shiplist[i].endDate);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.shiplist[i].endDate = Y + M + D;
          }

               for (var i in this.shiplist) {
            var date = new Date(this.shiplist[i].startTime);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.shiplist[i].startTime = Y + M + D;
          }

               for (var i in this.shiplist) {
            var date = new Date(this.shiplist[i].modifyTime);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.shiplist[i].modifyTime = Y + M + D;
          }

        });
      }


      if (val == 2) {
        this.shiplist = []
        //  this.list = this.listtwo
        //   shipRecommendedOrder(data, token).then(res => {
        //   if (res.data.code == 200) {
        //     this.list = res.data.data.list;
        //     console.log(this.list,"陈维货数据");
        //     this.listtwo = res.data.data.list
            
        //   }
        // });

        Releaseship(this.params, localStorage.getItem("token")).then(res => {
          console.log(res, "邓炎批量货");

          var paconghuo = res.data.data.list
          console.log(paconghuo);

          

          // return false
          // this.cargolist = res.data.data.list;
          // console.log(this.cargolist);

           paconghuo.forEach(element => {
             if(element.whether == "false"){
               this.cargolist.push(element)
             }
         });

         console.log(this.cargolist,99999999999);
         
          for (var i in this.cargolist) {
            var date = new Date(this.cargolist[i].startDate);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.cargolist[i].startDate = Y + M + D;
          }

          for (var i in this.cargolist) {
            var date = new Date(this.cargolist[i].endDate);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.cargolist[i].endDate = Y + M + D;
          }

              for (var i in this.cargolist) {
            var date = new Date(this.cargolist[i].loadingStartTime);
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            this.cargolist[i].loadingStartTime = Y + M + D;
          }

        //        this.cargolist.forEach(element => {
        //      if(element.whether !== "false"){
        //        this.cargolist=[]
        //      }
        //  });

        });
      }
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
#myIssue {
  // overflow: hidden;
  background: #f1f1f1;
  min-height: 100%;
  .myIssue_list {
  padding: 0.2rem;
  margin-top: 0.1rem;
  text-align: left;
  background: #fff;
  .myIssue_ship {
    .van-row {
      // margin-top: 0.2rem
      padding: 0.05rem 0.0001rem;
    }
    .icon_size {
      font-size: 0.1rem;
    }
  }
  .van-col--12 {
    margin-left: 0.59rem;
  }
}

.van-tabs__line{
  background-color: #0470dc;
}
}

</style>
