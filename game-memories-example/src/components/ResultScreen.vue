<template>
  <div>
    <h1>Congratulations!!!</h1>
    <p>Time play: {{ timePlayed / 1000 }} s</p>
    <button @click="onPlayAgain">Play again</button>
  </div>
</template>

<script>
export default {
  props: {
    timePlayed: Number,
  },
  methods: {
    onPlayAgain() {
      this.$emit("onPlayAgain");
    },
  },
};
</script>
