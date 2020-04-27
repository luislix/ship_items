<template>
    <div class="add">
        <myheader></myheader>
        <div class="list">
            <van-field
                    value=""
                    rows="1"
                    autosize
                    label="企业名称"
                    type="textarea"
                    placeholder="请填写企业名称"
                    input-align="right"
                />
            <van-field
                    value=""
                    rows="1"
                    autosize
                    label="联系人"
                    type="textarea"
                    placeholder="请填写姓名"
                    input-align="right"
                />
            <van-field
                    value=""
                    rows="1"
                    autosize
                    label="联系方式"
                    type="textarea"
                    placeholder="请填写电话号码"
                    input-align="right"
                />            
        </div>
        <van-button type="info">保存并使用</van-button>
    </div>
</template>
<script>
export default {
    data() {
    return {
      checked: true
    }
  }
}
</script>
<style lang="less" scoped>
.add{
    background: #eeeeee;
    height: 100%;
    
 }
 .list{
    margin-bottom: 0.2rem;
     background: #ffffff;
     text-align: left;
 }
 .van-button{
     margin: 0.5rem;
    width: 5rem;
 }
//  .van-button--info{
//     background-color:#29A2F8; 
//  }
</style>