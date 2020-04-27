<template>
  <div class="uploading">
                                                      <!-- <批量货源> -->
    <myheader></myheader>
     <div class="upload">
       <van-uploader :after-read="afterRead" accept="text/*"> 
           <img src="./01.png" alt="">
      </van-uploader>
        <!-- <img src="../../assets/image/矢量智能对象1.png" @click="upload"/> -->
        <p style="margin-top:0.1rem">上传货源文档</p>
        <p style="margin-top:0.2rem" >下载模板：<a href="https://www.aiship.top:8443/Excel/cargo.xlsx">货源.excel</a></p>
     </div>
     <footer style="text-align:center">
        <p><img src="../../assets/image/tishi.png" >上传不符合要求的文档，会导致解析失败</p>
    </footer>
  </div>
</template>

<script>
import { log } from 'util';
import { Enterpriseshipource } from "@/api/index.js";
export default {
  name: "uploading",
  data() {
    return {
        uploadType:"",
        token:"",
        query:{
          file :'',
        },
        cargolist:[]
    }
  },
  created(){
      this.getData();
  },
  methods:{
      getData(){
          this.uploadType = this.$route.query.uploadType;
      },
      upload(){
        console.log(11111111);           
      },

          // 下载模板


      afterRead(file) {
       this.token = window.localStorage.getItem("token")
      console.log(file,222);
      let formData = new FormData();
      formData.append('file', file.file);
      this.query.file = file
      Enterpriseshipource(formData,1,this.token).then(res =>{
           console.log(res,888888);
           
              if(res.data.message.length>2){
                this.$toast("请选择下载的excel文件或.xls格式的Excel文件");
                return
              }

              if(res.data.message.length==2){
                this.$toast("Excel文件上传成功");
              }



            if(res.data.code==200){
                // console.log(111111111);

                this.cargolist = res.data.data.result
                // console.log(this.cargolist,8888888888);
                
                    for (var i in this.cargolist) {
                  var date = new Date(this.cargolist[i].endDate);
                  var Y = date.getFullYear() + '-';
                  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                  var D = date.getDate() + ' ';
                  var h = date.getHours() + ':';
                  var m = date.getMinutes() + ':';
                  var  s = date.getSeconds();
                  this.cargolist[i].endDate = Y+M+D
          }


               var sum = res.data.data.success
               console.log(sum);
               

               var locj = res.data.data.fail
               
               this.$toast(`Excel文件读取成功${sum}条数据,失败${locj}数据`);

               console.log(this.cargolist,222222222222);
               

               window.localStorage.setItem("Storedata",JSON.stringify(this.cargolist))

                this.$router.push({path:'/uploadGoods'});

                

                
            }
            
      })
    }
  }
}
</script>

<style scoped>
.uploading {
  background: #f5fdff;
  height: 100%;
}
.upload{
    margin-top: 50%;
}
footer{
  
    position: absolute;
    left: 15%;
    bottom: 2%;
}
</style>
