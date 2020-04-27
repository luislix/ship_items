<template>
  <div class="archivalInformation">
    <!-- <myheader></myheader> -->
    <div class="archives">
      <van-row type="flex" class="title">
        <van-col span="4">
          <van-icon name="arrow-left" size="18" @click="back" />
        </van-col>
        <van-col span="16">档案信息</van-col>
      </van-row>
      <van-image round width="1.28rem" height="1.28rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <p>{{list.linkman}}</p>
      <van-row type="flex" justify="center">
        <van-col span="4" offset="4">{{list.linkmanPhone}}</van-col>
        <van-col span="5">
          <img src="../../assets/image/dianhua .png" @click="callPhone(list)" />
        </van-col>
      </van-row>
    </div>
    <div class="detail">
      <div>
        <p>船舶概况</p>
        <van-cell-group>
          <van-cell title="船舶名称" :value="list.shipNumber" />
          <van-cell title="封仓类型" :value="list.sealingWarehouse" />
          <van-cell title="船舶类型" :value="list.shipType" />
          <van-cell title="最大载重（吨）" :value="list.shipT" />
          <van-cell title="最大船速节" value="内容" />
          <van-cell title="航线线路" :value="list.shipLine" />
          <van-cell id="more-title" @click="more">
            <template slot="title">
              <a>查看更多</a>
              <van-icon name="arrow-down" />
            </template>
          </van-cell>
          <div id="more">
            <van-cell title="MMSI" :value="list.mmsi" />
            <van-cell title="船籍" :value="list.province" />
          </div>
        </van-cell-group>
      </div>
      <div>
        <p>船型尺寸</p>
        <van-cell-group>
          <van-cell title="船舶长度（米）" :value="list.shipLong" />
          <van-cell title="船舶高度（米）" :value="list.shipHigh" />
          <van-cell title="船舶型宽（米）" :value="list.shipWide" />
          <van-cell title="两柱间长（米）" value />
          <van-cell title="船舶吃水（米）" :value="list.drinkingWater" />
        </van-cell-group>
      </div>
      <div>
        <p>备注</p>
        <!-- <van-cell-group>
                    <van-field
                        v-model="message"
                        rows="3"
                        autosize
                        type="textarea"
                    />
        </van-cell-group>-->
        <div class="mark"></div>
      </div>
      <div>
        <p>评价</p>
        <van-cell-group>
          <van-cell title="给他评分：☆ ☆ ☆ ☆ ☆" />
          <div>
            <van-row v-for="(items,index) of rateList" :key="index">
              <van-col span="3">
                <van-image
                  round
                  width="0.6rem"
                  height="0.6rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </van-col>
              <van-col span="10">
                <span class="custom-title">{{items.userInfo.userName}}</span>
                <br />
                <span>评分</span>
                <van-rate :value="items.satisfactionLevel" />
              </van-col>
              <van-col span="5" offset="6">
                <span>{{items.createTime}}</span>
              </van-col>
            </van-row>
          </div>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryPyShipInfo,
  queryUserEvaluate
} from "@/api/index.js";
export default {
  data() {
    return {
      list: "",
      shipInfoDTO: "",
      message: "",
      rateList: [],
      // userInfo: "",
      value: 0,
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    this.getData();
  },
  methods: {
    more() {
      $("#more-title").hide();
      $("#more").show();
    },
    back() {
      this.$router.go(-1);
    },
    callPhone(list) {
      this.$dialog
        .confirm({
          title: "嘟嘟船讯提醒您!",
          message: `联系:` + list.linkmanPhone
        })
        .then(() => {
          window.location.href = "tel://" + list.linkmanPhone;
        })
        .catch(() => {});
    },
    getData(data) {
      queryPyShipInfo(this.$route.query.id, localStorage.getItem("token")).then(
        res => {
          console.log("helloword" + res);
          this.list = res.data.data;
          let pageDTO = {
            pageNum: 1,
            pageSize: 5,
            pages: 0,
            params: {
              userId: this.list.userId,
              orderType: 3
            }
          };
          queryUserEvaluate(pageDTO, localStorage.getItem("token")).then(
            res => {
               if (res.data.code == 200) {
                  if (res.data.data.list.length > 0) {
                    res.data.data.list.forEach((items, index) => {
                       res.data.data.list[index].createTime = this.$tools.formatTime(
                          items.createTime
                        );
                        this.rateList = this.rateList.concat(
                      res.data.data.list);
                      console.log(this.rateList);
                      })
                    }
                  }
            }
          );
          console.log(this.list.userId);
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.archivalInformation {
  width:100vw;
  overflow-x:hidden;
  .archives {
    height: 3.8rem;
    background: url("../../assets/image/bei jing.png");
    background-size: 100% 100%;
    padding-top:.3rem;
    color: #eeeeee;
    .title {
      height: 0.88rem;
      padding-top: 0.25rem;
      font-size: 0.32rem;
      font-weight: 500;
    }
    p {
      margin: 0.1rem 0.2rem;
    }
  }
  .detail {
    background: #ffffff;
    #more {
      display: none;
    }
    #more-title {
      position: relative;
      left: 40%;
    }
    .van-cell {
      color: #969799;
    }
    .van-cell__value {
      color: #444444;
    }
    .van-cell__title {
      text-align: left;
    }
    p {
      background: #eeeeee;
      height: 0.68rem;
      text-align: left;
      color: #333333;
      font-size: 0.3rem;
      font-weight: 500;
      padding: 0.2rem 0.31rem 0.45rem;
    }
    .mark {
      height: 1.5rem;
    }
  }
}
</style>