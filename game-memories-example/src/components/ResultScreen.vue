<template>
  <div class="result">
    <div class="result__content">
      <p class="result__congrat">Congratulations!!!</p>
      <p class="result__time">Time play: {{ timePlayed / 1000 }} s</p>
      <button @click="onPlayAgain">Play again</button>
    </div>
    <copy-right-screen />
  </div>
</template>

<script>
import CopyRightScreen from "./CopyRightScreen.vue";
export default {
  components: {
    CopyRightScreen,
  },
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

<style scoped lang="css">
.result {
  height: 100%;
  display: flex;
  color: var(--light-color);
  text-align: center;
  flex-direction: column;
}

.result__content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.result__congrat {
  font-size: 3.5rem;
}

.result__time {
  font-size: 2rem;
  margin: 32px 0;
}

.result button {
  font-size: 1.5rem;
  color: var(--light-color);
  border: 1px solid var(--light-color);
  border-radius: 15px;
  background: var(--dark-color);
  width: 150px;
  margin: 0 8px;
  padding: 16px 0;
  cursor: pointer;
}
</style>
