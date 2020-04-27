<template>
    <div class="contract pageCommonStyle">
        <myheader></myheader>
        <van-row class="content" :style="$route.query.jumpStatus==0?'padding-bottom:1.2rem;':''">
            <img src="@/assets/image/service/contract.png" alt="">
        </van-row>
    </div>
</template>

<script>
export default {
    name:'contract',
    data() {}
}
</script>

<style lang="less" scoped>
    .contract {
        .content {
            position: relative;
        }
        img {
            width: 100vw;
        }
    }
</style>