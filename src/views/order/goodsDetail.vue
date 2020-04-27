<template>
  <div class="goodsDetail">
        <myheader></myheader>
        <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
</template>

<script>

export default {
  name: 'goodsDetail',
  data() {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
