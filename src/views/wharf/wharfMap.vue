<template>
  <div>
    <myheader></myheader>
    <label class="map_label">
      关键词：
      <input v-model="keyword" />
    </label>
    <baidu-map>
      <bm-view class="map"></bm-view>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
    </baidu-map>
  </div>
</template>
<script>
import Vue from "vue";
import { BmlMarkerClusterer } from "vue-baidu-map";

Vue.component("bml-marker-cluster", BmlMarkerClusterer);
export default {
  data() {
    return {
      keyword: this.$route.query.address
    };
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 545px;
}
.map_label {
  display: none;
}
</style>