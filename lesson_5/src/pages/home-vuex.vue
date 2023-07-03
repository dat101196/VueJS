<template>
  <div>
    <h1>VueX Page</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  created() {
    //console.log(this.$store.state.count);
    this.count = this.$store.state.count;
  },
};
</script>
