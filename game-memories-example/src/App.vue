<template>
  <main-screen
    v-if="statusMatch === 'default'"
    @onStart="onPrepareGame($event)"
  />
  <interact-screen
    v-if="statusMatch === 'match'"
    :cardsContext="settings.cardsContext"
    @onFinishGame="onGetResult"
  />
  <result-screen v-if="statusMatch === 'result'" :timePlayed="timePlayed" />
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";

import { shuffled } from "./utils/array.js";
import ResultScreen from "./components/ResultScreen.vue";
export default {
  name: "App",
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
  },
  data() {
    return {
      settings: {
        totalBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "default",
      timePlayed: 0,
    };
  },
  methods: {
    onPrepareGame(config) {
      console.log(config);
      this.settings.totalBlocks = config.totalBlocks;
      const firstCards = Array.from(
        { length: this.settings.totalBlocks / 2 },
        (_, i) => i + 1
      );
      const secondCards = [...firstCards];
      const cards = [...firstCards, ...secondCards];
      // console.log(cards);
      this.settings.cardsContext = shuffled(
        shuffled(shuffled(shuffled(cards)))
      );
      // console.log(this.settings.cardsContext);
      this.settings.startedAt = new Date().getTime();
      //data ready
      this.statusMatch = "match";
    },
    onGetResult() {
      console.log("onGetResult");
      //Calculate time
      this.timePlayed = new Date().getTime() - this.settings.startedAt;
      //Go to result  component
      this.statusMatch = "result";
    },
  },
};
</script>
