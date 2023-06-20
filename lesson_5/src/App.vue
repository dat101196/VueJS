<template>
  <!-- <h1>hello</h1> -->
  <nav-bar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  // created() {
  //   console.log("Created. h1: ", document.querySelector("h1"));
  // },
  // mounted() {
  //   console.log("Mounted. h1: ", document.querySelector("h1"));
  // },
};
</script>
a
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
