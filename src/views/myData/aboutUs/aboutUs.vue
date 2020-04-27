<template>
  <div class="aboutUs">
    <myheader></myheader>
    <div class="title">
      <img style="width: 78.5px;" src="../../../assets/image/logo.png" alt="" />
      <h3>嘟嘟船讯</h3>
    </div>
    <ul>
      <li>
        <div>
          <img src="@/assets/image/kaifazhe.png" alt="" />
          <p>开发者</p>
        </div>
        <p class="text">奥沃希浦（湖北）科技有限公司</p>
      </li>
      <li>
        <div>
          <img style="height: 18px;" src="@/assets/image/dianhuahei.png" alt="" />
          <p>电话</p>
        </div>
        <p class="text">027-59496648</p>
      </li>
      <li>
        <div>
          <img src="@/assets/image/youxiang.png" alt="" />
          <p>邮箱</p>
        </div>
        <p class="text">oship@oship.com</p>
      </li>
      <li>
        <div>
          <img src="@/assets/image/dizhi.png" alt="" />
          <p>地址</p>
        </div>
        <p class="text">湖北省武汉市东湖新技术开发区凌家山南路1号</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "aboutUs",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.aboutUs {
  padding: 0.25rem 0.3rem;
  height: 100%;
  background: #fff;
  .title {
    margin-bottom: 20px;
    .title img {
      width: 1.57rem;
      height: 1.57rem;
    }
  }
  ul li {
    height: 0.9rem;
    line-height: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #EAEBEB solid;
    div {
      display: flex;
      img {
        width: 0.3rem;
        height: 0.32rem;
        margin-top: 0.3rem;
        margin-right: 0.2rem;
      }
    }
    .text{
        color: #555555;
        font-size: .24rem;
    }
  }
}
</style>
