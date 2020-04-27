<template>
  <div class="addAddress">
    <myheader></myheader>
    <div class="list">
      <van-field
        value=""
        rows="1"
        autosize
        label="联系人"
        type="textarea"
        placeholder="请填写联系人姓名"
        input-align="right"
      />
      <van-field
        value=""
        rows="1"
        autosize
        label="联系电话"
        type="textarea"
        placeholder="请填写手机号"
        input-align="right"
      />
      <van-cell title="地址" value="请选择地址" is-link/>
        <van-field
          value=""
          rows="1"
          autosize
          label="门牌号"
          type="textarea"
          placeholder="例如1号楼303室"
          input-align="right"
        />            
      </div>
      <van-cell-group>
        <van-switch-cell v-model="checked" title="设为默认地址" />
      </van-cell-group>
      <van-button type="info">保存地址</van-button>
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
  .addAddress{
    background: #eeeeee;
    height: 100%;
    .list{
      margin-bottom: 0.2rem;
      background: #ffffff;
      text-align: left;
      .van-button{
        margin: 0.5rem;
        width: 5rem;
      }
    .van-button--info{
      background-color:#29A2F8; 
    }
  }
 }
</style>