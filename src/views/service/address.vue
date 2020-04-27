<template>
  <div class="address">
    <myheader></myheader>
    <div class="list" v-for="(item,index) in list" :key="index" @click="content(item)">
      <van-row>
        <van-col span="18">
          <van-row  style="padding-bottom: 9px;">
            <van-col span="5" style="font-size: 15px;font-weight: 600;line-height: 14px;">{{item.linkName}}</van-col>
            <van-col span="13">{{item.linkPhone}}</van-col>
          </van-row>
          <van-row>
            <van-col span="18" offset="5" style="font-size: 15px;font-weight: 600;">
              {{item.address}}
            </van-col>
          </van-row>
        </van-col>
        <van-col span="2" offset="2" style="border-left: 1px solid #ebedf0; padding:0.2rem;">
          <!-- <van-icon name="edit" size="25" /> -->
          <img style="width: 25px;" src="../../assets/image/编辑.png"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { queryPyShipPortByPage } from "@/api/index.js";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        pageNum: 1,
        pageSize: 10
      };
      queryPyShipPortByPage(data, localStorage.getItem("token")).then(res => {
        console.log(res);
        for (let i = 0; i < data.pageSize; i++) {
          var obj = {};
          obj = res.data.data.list[i];
          this.list.push(obj);
        }
        console.log(this.list);
      });
    },
    content(item) {
      this.$router.push({ path: "/service", query: { address: item.address } });
    }
  }
};
</script>
<style lang="less" scoped>
.address {
  background: #eeeeee;
  height: 100%;
  .list {
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    background: #ffffff;
    text-align: left;
    font-size: 0.28rem;
  }
}
</style>