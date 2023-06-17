<template>
  <div class="card-container">
    <div
      class="card-container__inner"
      :class="{
        'card-qty-4': cardsContext.length == 4,
        'card-qty-16': cardsContext.length == 16,
        'card-qty-36': cardsContext.length == 36,
        'card-qty-64': cardsContext.length == 64,
        'card-qty-100': cardsContext.length == 100,
      }"
    >
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        :ref="`card-${index}`"
        :imgBackURL="`images/${card}.png`"
        :card="{ index: index, value: card }"
        :cardQtyOfRow="Math.sqrt(cardsContext.length)"
        @onFlip="checkRule($event)"
      />
    </div>
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
      this.rules.push(card);
      if (this.rules.length > 2) return false;
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
          this.rules.forEach((rule) => {
            this.$refs[`card-${rule.index}`][0].onFlipBackCard();
          });
          //Reset rules
          this.rules = [];
        }, 650);
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.card-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dark-color);
  overflow: scroll;
  padding: 32px;
}

.card-container__inner {
  margin: auto;
  position: relative;
}

.card-container__inner.card-qty-4 {
  width: calc(150px * 2 + 1rem * 2 + 64px);
  height: calc(250px * 2 + 1rem * 2 + 64px);
  top: 50%;
  transform: translateY(-50%);
}

.card-container__inner.card-qty-16 {
  width: calc(150px * 4 + 1rem * 4 + 64px);
  height: calc(250px * 4 + 1rem * 4 + 64px);
}

.card-container__inner.card-qty-36 {
  width: calc(150px * 6 + 1rem * 6 + 64px);
  height: calc(250px * 6 + 1rem * 6 + 64px);
}

.card-container__inner.card-qty-64 {
  width: calc(150px * 8 + 1rem * 8 + 64px);
  height: calc(250px * 8 + 1rem * 8 + 64px);
}

.card-container__inner.card-qty-100 {
  width: calc(150px * 10 + 1rem * 10 + 64px);
  height: calc(250px * 10 + 1rem * 10 + 64px);
}
</style>
