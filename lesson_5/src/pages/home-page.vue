<template>
  <div>
    <h1>Overview Page</h1>
    <p>{{ firstName }}</p>
    <button @click="onChangeSomething">Click me</button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const firstName = ref("aaa");

    function onChangeSomething() {
      firstName.value = "Atom";
    }

    return {
      firstName,
      onChangeSomething,
    };
  },
};
</script>
