<template>
  <div class="Address">
    <!-- <myheader></myheader> -->
    <ul class="address_list" v-if="list.length > 0">
      <li v-for="item in list" :key="item.id" @click="chooseAddress(item)">
        <p style="text-align:left">
          <span style="margin-right:.2rem">{{ item.userName }}</span
          ><span>{{ item.mobilePhone }}</span>
        </p>
        <p style="text-align:left">
          {{ item.provinceName }} {{ item.cityName }}
        </p>
      </li>
    </ul>

    <button class="add" @click="add_map" type="button">新增收货地址</button>
  </div>
</template>

<script>
import { queryAddress } from "@/api/index";
export default {
  name: "Address",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.queryAddressList();
  },
  methods: {
    add_map() {
      this.$router.push("/recAddress");
    },
    queryAddressList() {
      var pageDTO = {
        pageNum: 1,
        pageSize: 30,
        user_id: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      };
      queryAddress(pageDTO, localStorage.getItem("token")).then(res => {
        this.list = res.data.data.list;
      });
    },
    chooseAddress(item){
      this.$router.push({name:'releaseGoods',params:{goods:item}})
    }
  }
};
</script>

<style lang="less" scoped>
.Address {
  background: #f1f1f1;
  margin: 0.2rem 0;
  height: 100%;
}
.address_list {
  li {
    margin-bottom: 0.2rem;
    padding: 0.3rem;
    background: #fff;
    li p {
      display: flex;
      align-items: center;
    }
  }
}
.add {
  width: 5rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.28rem;
  border: none;
  outline: none;
  background: #00a1e9;
  color: #fff;
  border-radius: 0.1rem;
}
</style>
