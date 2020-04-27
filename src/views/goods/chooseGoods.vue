<template>
  <div class="chooseGoods">
    <myheader></myheader>
    <ul class="goodslist">
      <li v-for="(item, index) in list" :key="item.goodsOrderId">
        <van-radio-group v-model="radio">
          <van-radio :name="index + 1" @click="choose(item)">
            <div class="details">
              <div class="startAddress">
                <h1 style="margin-bottom: 0.1rem;">
                  {{ item.startAddressHistoryDTO.provinceName }}-{{
                    item.startAddressHistoryDTO.cityName
                  }}
                </h1>
                <p>
                  托运物品：<span>{{ item.goodsName }}</span>
                </p>
                <p>
                  装货时间：<span>{{ time }}</span>
                </p>
              </div>
              <div class="jiantou">
                <img src="../../assets/image/jiantou.png" alt="" />
              </div>
              <div class="arrive">
                <h1 style="margin-bottom: 0.1rem;">
                  {{ item.endAddressHistoryDTO.provinceName }}-{{
                    item.endAddressHistoryDTO.cityName
                  }}
                </h1>
                <p>
                  运货重量：<span>{{ item.actualTotalWeight }}吨</span>
                </p>
                <img
                  @click="editGoods(item)"
                  style="width:.3rem;height:.3rem"
                  src="@/assets/image/edit.png"
                  alt=""
                />
              </div>
            </div>
          </van-radio>
        </van-radio-group>
      </li>
    </ul>
    <div class="tab">
      <button type="button" @click="goodsRequestShip">确认货源</button>
    </div>
  </div>
</template>

<script>
import {
  shipRecommendedOrder,
  requestOrder,
  getCargoDetails
} from "@/api/index.js";
import { timeToLocaleString } from "@/assets/js/index.js";
import { Toast } from "vant";
export default {
  name: "chooseGoods",
  data() {
    return {
      radio: 1,
      userData: "",
      user_id: "",
      token: "",
      list: [],
      time: "",
      emptyShipId: "",
      goodsOrderId: ""
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userLoginInfo"));
    this.token = localStorage.getItem("token");
    this.emptyShipId = this.$route.query.id;
    this.user_id = this.userData.user_id;
    this.getGoodsOrder();
  },
  methods: {
    //获取货源
    getGoodsOrder() {
      var data = {
        pageNum: 1,
        pageSize: 5,
        userId: this.user_id
      };
      console.log(data);
      shipRecommendedOrder({ params: data }, this.token).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.list = res.data.data.list;
            console.log(this.list);
            this.goodsOrderId = this.list[0].goodsOrderId;
            this.list.forEach(element => {
              this.time = timeToLocaleString(element.loadingStartTime);
            });
          }
        }
      });
    },
    choose(item) {
      console.log(item);
      this.goodsOrderId = item.goodsOrderId;
    },
    editGoods(item) {
      this.$router.push({path:'/releaseGoods',query:{id:item.goodsOrderId,ids:this.$route.query.id}})
    },

    //货物申请船只
    goodsRequestShip() {
      var that = this;
      requestOrder(this.goodsOrderId, this.emptyShipId, 2, this.token).then(
        res => {
          if (res.data.code == 200) {
            Toast({
              message: "已申请   等待对方同意",
              icon: "passed"
            });
            setTimeout(function() {
              that.$router.push("/index/home");
            }, 1500);
          }
        }
      );
    }
  }
};
</script>

<style scoped>
#app{
  background: #f5f5f5;
}
.chooseGoods {
  background: #f5f5f5;
  min-height: 12.5rem;
}
.goodslist {
  padding: 0.2rem 0.3rem;
  padding-bottom: 1.2rem;
}
.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details h1 {
  font-family: PingFang-SC-Bold;
  font-weight: 600;
  color: #333;
  font-size: 0.3rem;
}
.details span {
  color: #333;
  font-size: 0.24rem;
  font-weight: 450;
}
.details p {
  font-size: 0.22rem;
  color: #666666;
}
.jiantou img {
  width: 1.3rem;
  height: 0.1rem;
}
.jiantou {
  margin-bottom: 0.9rem;
}
li {
  background: #fff;
  padding: 0.4rem 0.3rem;
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
}
.startAddress {
  text-align: left;
}
.arrive {
  text-align: right;
}
.tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
  box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.1);
}
button {
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 4rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  margin: 0 auto;
  background: linear-gradient(to right, #0b6eff, #4191ff, #68aaff);
}
</style>
