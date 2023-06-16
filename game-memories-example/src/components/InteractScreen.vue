<template>
  <div class="card-container">
    <card-flip
      v-for="(card, index) in cardsContext"
      :key="index"
      :ref="`card-${index}`"
      :imgBackURL="`images/${card}.png`"
      :card="{ index: index, value: card }"
      @onFlip="checkRule($event)"
    />
  </div>
</template>

<script>
import CardFlip from "./CardComponent.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    CardFlip,
  },
  data() {
    return {
      rules: [],
      correctCount: 0,
    };
  },
  methods: {
    checkRule(card) {
      if (this.rules.length == 2) return false;
      this.rules.push(card);
      if (this.rules.length == 2 && this.rules[0].value == card.value) {
        console.log("Correct");
        //Add class disabled for card
        this.$refs[`card-${this.rules[0].index}`][0].onSetDisabled();
        this.$refs[`card-${this.rules[1].index}`][0].onSetDisabled();
        //Reset rules
        this.rules = [];
        //Increase rightCount
        this.correctCount++;
        console.log("Correct count:", this.correctCount);
        //Check finish condition
        if (this.correctCount == this.cardsContext.length / 2) {
          //Finish
          console.log("Finish game");
          setTimeout(() => {
            console.log("onFinishGame");
            this.$emit("onFinishGame");
          }, 1000);
        }
      } else if (this.rules.length == 2 && this.rules[0].value != card.value) {
        console.log("False");
        //Flip back after 800ms
        setTimeout(() => {
          //Close both card
          this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard();
          this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard();
          //Reset rules
          this.rules = [];
        }, 800);
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.card-container {
  margin: auto;
  text-align: center;
  margin-top: 32px;
  max-width: 800px;
}
</style>
