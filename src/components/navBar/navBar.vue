<template>
    <div class="header">
        <van-nav-bar :title="title" left-text="返回" left-arrow 
        @click-left="onClickLeft"
        right-text="切换货主">
        <!-- <van-icon name="search" slot="right" /> -->
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['title'],
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
}
</script>

<style lang="less" scoped>
    .header {
        .van-nav-bar {
            background:#00A0E9;
            color:#fff!important;
        }
    }
</style>
