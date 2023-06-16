<template>
  <div
    class="card"
    :class="{
      disabled: isDisabled,
      'card--2': cardQtyOfRow == 2,
      'card--4': cardQtyOfRow == 4,
      'card--6': cardQtyOfRow == 6,
      'card--8': cardQtyOfRow == 8,
      'card--10': cardQtyOfRow == 10,
    }"
    @click="onToggleFlipCard"
  >
    <div class="card__inner" :class="{ 'is-flipped': isFlipped }">
      <div class="card__face card__face--front">
        <div class="card__content"></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${require('@/assets/' + imgBackURL)})`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgBackURL: {
      type: String,
      required: true,
    },
    card: {
      type: [Array, String, Number, Object],
    },
    cardQtyOfRow: Number,
  },
  data() {
    return {
      isFlipped: false,
      isDisabled: false,
    };
  },
  methods: {
    onToggleFlipCard() {
      if (this.isDisabled) return false;
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped) {
        this.$emit("onFlip", this.card);
      }
    },
    onFlipBackCard() {
      this.isFlipped = false;
    },
    onSetDisabled() {
      this.isDisabled = true;
    },
  },
};
</script>

<style lang="css" scoped="true">
.card {
  display: inline-block;
  width: 50px;
  height: 100px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.card.card--2 {
  width: calc((100% - 1rem * 2) / 2);
  height: calc((100% - 1rem * 2) / 2);
}

.card.card--4 {
  width: calc((100% - 1rem * 4) / 4);
  height: calc((100% - 1rem * 4) / 4);
}

.card.card--6 {
  width: calc((100% - 1rem * 6) / 6);
  height: calc((100% - 1rem * 6) / 6);
}

.card.card--8 {
  width: calc((100% - 1rem * 8) / 8);
  height: calc((100% - 1rem * 8) / 8);
}

.card.card--10 {
  width: calc((100% - 1rem * 10) / 10);
  height: calc((100% - 1rem * 10) / 10);
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card.disabled .card__inner {
  cursor: default;
}

.card__inner.is-flipped {
  transform: rotateY(180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 40%;
}

.card__face--back {
  background-color: var(--light-color);
  transform: rotateY(180deg);
}

.card__face--back .card__content {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
