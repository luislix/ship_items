<template>
  <div class="uploading">
                                                      <!-- <批量船源> -->
    <myheader></myheader>
     <div class="upload">
       <van-uploader :after-read="afterRead" accept="text/*"> 
         <img src="./01.png" alt="">
       </van-uploader>
        <!-- <img src="../../assets/image/矢量智能对象1.png" @click="upload"/> -->
        <p style="margin-top:0.05rem">上传{{uploadType}}文档</p>
        <p style="margin-top:0.2rem" @click="Downloadtemplate">下载模板：<a href="https://www.aiship.top:8443/Excel/ship.xlsx">{{uploadType}}.excel</a></p>
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
      Downloadtemplate(){
             console.log("下载模板");
      },

      afterRead(file) {
       this.token = window.localStorage.getItem("token")
      // 把file文件存到formData当做参数后台才能拿的到
      let formData = new FormData();
      formData.append('file', file.file);
      Enterpriseshipource(formData,2,this.token).then(res =>{
        console.log(res,11111);
              if(res.data.message.length>2 ){
                this.$toast("请选择下载的excel文件或.xls格式的Excel文件");
                return
              }

              if(res.data.message.length==2){
                this.$toast("Excel文件上传成功");
              }
          
                      if(res.data.code==200){
                // console.log(111111111);

              this.cargolist = res.data.data.result
              
               var sum = res.data.data.success

               var locj = res.data.data.fail
                 console.log(sum);
                if(sum == 0){
                  this.$toast(`Excel文件未读取成功 请重新上传`);
                    return false
                }
               this.$toast(`Excel文件读取成功${sum}条数据,失败${locj}条数据`);
               console.log(this.cargolist,1111111111111111111);
               
               window.localStorage.setItem("Storedata",JSON.stringify(this.cargolist))

               
               

                this.$router.push({path:'/uploadShip'});

                
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
