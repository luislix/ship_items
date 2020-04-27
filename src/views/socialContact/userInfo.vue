<template>
  <div class="userInfo">

  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
    return {
    };
  },
  created(){
    console.log(this.$route.params);
  },
  methods: {},
};
</script>

<style scoped>

</style>
