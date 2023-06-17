<template>
  <div class="screen">
    <div class="main">
      <p class="game-name">POKE MEMORIES</p>
      <p class="mode-request">Select mode to start game</p>
      <div class="mode">
        <button class="very-easy" @click="onStart(4)">
          <p>2x2</p>
          <p>Very easy</p>
        </button>
        <button class="easy" @click="onStart(16)">
          <p>4x4</p>
          <p>Easy</p>
        </button>
        <button class="normal" @click="onStart(36)">
          <p>6x6</p>
          <p>Normal</p>
        </button>
        <button class="hard" @click="onStart(64)">
          <p>8x8</p>
          <p>Hard</p>
        </button>
        <button class="insane" @click="onStart(100)">
          <p>10x10</p>
          <p>Insane</p>
        </button>
      </div>
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
  methods: {
    onStart(totalBlocks) {
      this.$emit("onStart", { totalBlocks: totalBlocks });
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  height: 100%;
  color: var(--light-color);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.main {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.game-name {
  font-size: 3.5rem;
}

.mode-request {
  font-size: 2rem;
  margin-top: 16px;
}

.mode {
  margin-top: 48px;
}

.main button {
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

button.very-easy {
  --main-color: rgb(171, 255, 46);
  color: var(--main-color);
  border-color: var(--main-color);
}

button.easy {
  --main-color: rgb(255, 255, 160);
  color: var(--main-color);
  border-color: var(--main-color);
}

button.normal {
  --main-color: rgb(249, 255, 72);
  color: var(--main-color);
  border-color: var(--main-color);
}

button.hard {
  --main-color: rgb(255, 165, 31);
  color: var(--main-color);
  border-color: var(--main-color);
}

button.insane {
  --main-color: rgb(255, 50, 50);
  color: var(--main-color);
  border-color: var(--main-color);
}
</style>
