<template>
  <div class="searchOrder">
    <header>
      <img
        style="width:.2rem;height:.36rem"
        src="../../assets/image/fanhui.png"
        alt=""
        @click="goBack"
      />
      <div class="input">
        <img @click="searchOrder" src="../../assets/image/_sou suo.png" alt="" />
        <input
          @keypress="search"
          v-model="pageDTO.params.keyWord"
          type="text"
          placeholder="搜索始发地/目的地：例(广州)"
        />
      </div>
      <img src="../../assets/image/ditu-selection.png" alt="" />
    </header>
    <div style="padding-top:1.3rem;" class="search_detail">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset="10"
          :immediate-check="false"
        >
          <ul class="list">
            <li
              v-for="(item, index) in list"
              :key="index"
              @click="toDetails(item)"
            >
              <div class="address">
                <p>{{ item.location.slice(0,5) }}...</p>
                <img src="../../assets/image/jiantou32.png" alt="" />
                <p>{{ item.arrive.slice(0,5) }}...</p>
              </div>
              <div v-if="userType == 3" class="detail">
                <p>货物重量：{{ item.name }}/{{ item.tonnage }}吨</p>
                <p>装货日期：{{ item.startDate }}</p>
              </div>
              <div v-if="userType == 2" class="detail">
                <p>运载重量：{{ item.tonnage }}吨</p>
                <p>空船日期：{{ item.startDate }}</p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { searchInput } from "@/api/index";
import { PullRefresh } from "vant";
import { List } from "vant";
export default {
  name: "searchOrder",
  data() {
    return {
      userType: JSON.parse(localStorage.getItem("userLoginInfo")).userType
        ? JSON.parse(localStorage.getItem("userLoginInfo")).userType
        : "",
      user_Id: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
        ? JSON.parse(localStorage.getItem("userLoginInfo")).user_id
        : "",
      list: [],
      list1: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      offset: 100, //滚动条与底部距离小于 offset 时触发load事件,
      pageDTO: {
        pageNum: 1,
        pageSize: 10,
        pages: 0,
        params: { userType: this.userType, keyWord: '' },
        sidx: "create_time",
        sord: "desc",
        total: 0
      }
    };
  },
  created() {
    // this.searchOrder();
  },
  mounted() {
    // let winHeight = document.documentElement.clientHeight; //视口大小
    // document.getElementById("list-content").style.height =
    //   winHeight - 46 + "px"; //调整上拉加载框高度
  },
  watch: {
    keyword: function(oldVal, NewVal) {
      this.searchOrder();
    }
  },
  methods: {
    //分页搜索查询
    searchOrder() {
      this.pageDTO.pageNum = 1;
      this.pageDTO.params.userType = this.userType;
      searchInput(this.pageDTO).then(res => {
        this.list = res.data.data.list;
        this.pageDTO.total = res.data.data.total;
        console.log(this.list);
      });
    },

    search(){
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        this.searchOrder();
      } 
    },

    //返回首页
    goBack() {
      this.$router.push("/index/home");
    },

    toDetails(item) {
      if (item.type == "2" || item.type == "1") {
        var whether = "true";
      } else if (item.type == "4" || item.type == "3") {
        var whether = "false";
      }
      if (this.userType == 3) {
        this.$router.push({
          path: "/cargoRecommendDetails",
          query: { id: item.id, whether: whether, userId: this.user_Id }
        });
      } else if (this.userType == 2) {
        this.$router.push({
          path: "/shipDetail",
          query: { id: item.id, whether: whether, userId: this.user_Id }
        });
      }
    },
    onLoad() {
      //上拉加载
      if (this.pageDTO.pageNum >= Math.ceil(this.pageDTO.total / 10)) {
        this.finished = true;
        return;
      }
      setTimeout(() => {
        this.pageDTO.pageNum++;
        this.pageDTO.params.userType = this.userType;
        this.pageDTO.params.keyWord = this.keyword;
        searchInput(this.pageDTO).then(res => {
          this.list1 = res.data.data.list;
          this.list = this.list.concat(this.list1);
        });
        this.loading = false;
        if (this.list.length >= this.pageDTO.total) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.onLoad();
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.searchOrder {
  background: #f1f1f1;
  min-height: 14rem;
  position: relative;
  header {
    background: #0470dc;
    width: 100%;
    padding-top:.5rem;
    height: 1.28rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    img {
      width: 0.44rem;
      height: 0.44rem;
    }
    .input {
      position: relative;
      color: #fff;
      img {
        width: 0.28rem;
        height: 0.28rem;
        position: absolute;
        top: 0.1rem;
        left: 0.2rem;
      }
      input {
        display: block;
        width: 4.8rem;
        padding-left: 0.6rem;
        height: 0.5rem;
        outline: none;
        border: none;
        border-radius: 0.3rem;
        background: #0056ac;
      }
    }
  }
  .search_detail {
    .list {
      li {
        background: #fff;
        margin-bottom: 0.2rem;
      }
      li div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 0.75rem;
        line-height: 0.75rem;
      }
      .address {
        p {
          display:inline-block;
          width:3rem;
          font-size: 0.32rem;
          color: #333333;
          font-weight: bold;
        }
        img {
          width: 0.8rem;
          height: 0.17rem;
        }
      }
      .detail {
        p {
          font-size: 0.24rem;
          color: #444444;
        }
      }
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #fff;
  }
}
</style>
