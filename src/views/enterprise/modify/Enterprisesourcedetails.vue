<template>
  <div id="boxss">
    <myheader></myheader>

    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="我的发布信息" name="1">
        <div>
          <van-row class="border_bottom">
            <van-col span="">您于
              <!-- {{list.createDate}} -->
              {{list.whether == 'false'?list.createDate:list.modifyTime}}
              更新了此船期</van-col>
            <van-col span="9" class="textColor_darkGray float_r"></van-col>
          </van-row>

          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">姓名</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.contactsName}} -->
              {{list.whether == 'false'?list.contactsName:list.currentAddressHistoryDTO.userName}}
              </van-col>
          </van-row>
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">船只名称</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.shipsName}} -->
              {{list.whether == 'false'?list.shipsName:list.shipInfoDTO.shipName}}
              </van-col>
          </van-row>
          <!-- <van-row class="border_bottom">
                 <van-col span="12" class="textColor_gray float_l">MMSI</van-col>
                 <van-col span="12" class="textColor_darkGray float_r">123456</van-col>
          </van-row>-->
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">联系电话</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.contactsPhone}} -->
              {{list.whether == 'false'?list.contactsPhone:list.shipInfoDTO.shipPhone}}
              </van-col>
          </van-row>
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">装载量</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.tonnage}} -->
              {{list.whether == 'false'?list.tonnage:list.shipInfoDTO.maxRequiredWeight}}
              </van-col>
          </van-row>
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">船只始发地</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.location}} -->
              {{list.whether== "false"?list.location:list.startAddressHistoryDtoList[0].cityName}} 
              </van-col>
          </van-row>
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">船只目的地</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              {{list.whether== "false"?list.placeOfArrival:list.endAddressHistoryDtoList[0].cityName}} 
              </van-col>
          </van-row>
          <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">开始时间</van-col>
            <van-col span="12" class="textColor_darkGray float_r">
              <!-- {{list.startDate}} -->
              {{list.whether== "false"?list.startDate:list.startTime}} 
              </van-col>
          </van-row>
          <!-- <van-row class="border_bottom">
            <van-col span="12" class="textColor_gray float_l">结束时间</van-col>
            <van-col span="12" class="textColor_darkGray float_r">{{list.endDate}}</van-col>
          </van-row> -->
          <van-row class="border_bottom" style="border-bottom: 0px">
            <van-col span="5" class="textColor_gray float_l">备注</van-col>
            <van-col span="19" class="textColor_darkGray float_r">
              <!-- {{list.title}} -->
              {{list.whether== "false"?list.title:list.remark}} 
              </van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>

    <van-row class="btnStyle" style="background-color: rgba(255, 255, 255, 1);box-shadow:0px 0px 8px #c3bdbd">
      <van-col span="12">
        <van-button
          @click="Delete"
          size="normal"
          style="width:75%;height:0.8rem;line-height:0.8rem;background-image: linear-gradient(#9f9f9f, #c5c5c5);border-radius: 4px;color: #ffffff"
        >删除</van-button>
      </van-col>
      <van-col span="12">
        <van-button
          @click="editShipOrderInfo"
          type="info"
          size="normal"
          style="width:75%;height:0.8rem;line-height:0.8rem;background-image: linear-gradient(#0b6eff, #68aaff);border-radius: 4px"
        >编辑</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Deletebulkship } from "@/api/index";
import { Deleteshipnormally } from "@/api/index";
export default {
  data() {
    return {
      activeName: "1",
      listss: "",
      list:"",
      pythonInfoShipIdList: "",
      emptyShipOrderId: ""
    };
  },

  created() {

     var ssss = window.localStorage.getItem('Releaselist')
    
       this.list = JSON.parse(ssss)

       console.log(this.list,111111111);
       

    // this.list = this.$router.history.current.query.obj;
    // this.list = JSON.stringify(this.listss)

    // this.list = JSON.parse(this.listss)
    console.log(this.list);
    console.log(typeof(this.list));
    
    //     for (var i in this.list) {
    var date = new Date(this.list.createDate);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    this.list.createDate = Y + M + D;
    //           }
  },

  methods: {
    Delete() {
      if (this.list.whether == "false") {
        console.log("false");
        this.pythonInfoShipIdList = this.list.id;
        Deletebulkship(
          this.pythonInfoShipIdList,
          localStorage.getItem("token")
        ).then(res => {
          if (res.data.code == 200) {
            this.$toast("删除成功");
            this.$router.push({ path: "/myIssue" });
          }
        });
      }

      if (this.list.whether !== "false") {
        console.log("false");
        console.log(this.list.emptyShipOrderId);
        this.pythonInfoShipIdList = this.list.emptyShipOrderId;
        console.log(this.emptyShipOrderId);
        Deleteshipnormally(
          this.pythonInfoShipIdList,
          localStorage.getItem("token")
        ).then(res => {
          if (res.data.code == 200) {
            this.$toast("删除成功");
            this.$router.push({ path: "/myIssue" });
          }
        });
      }
    },

    //   ------------------------船只----------------------

    editShipOrderInfo() {
      this.$router.push({ path: "/Editship", query: { obj: this.list } });
    }
  }
};
</script>

<style lang="less">
#boxss {
  background-color: #f5f5f5;
  
  height: 100%;
  // color: #000;
  
  
  
  .van-cell__title {
    text-align: left;
    // color: #ffffff;
    
  }

  .van-collapse {
    margin-top: 0rem;
    
  }

  .border_bottom {
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
  }

  .btnStyle {
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    position: absolute;
    bottom: 0rem;
    
  }
}
</style>>




