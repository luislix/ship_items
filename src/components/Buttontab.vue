<template>
  <div class="buttontab">
      
  </div>
</template>

<script>
export default {
  name: 'Buttontab',
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
.tab{
    position: fixed;
    bottom: 0;
    left:0;
    width:100%;
    height:1.1rem;
    line-height: 1.1rem;
    background: #fff;
    box-shadow: 1px -2px 2px rgba(0,0,0,0.1);
}
button{
    border: none;
    outline: none;
    border-radius: .1rem;
    width:4rem;
    height: .7rem;
    line-height: .7rem;
    color:#fff;
    margin: 0 auto;
    background: linear-gradient(to right,#0B6EFF, #4191FF, #68AAFF);
}
</style>
