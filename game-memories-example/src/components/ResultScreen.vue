<template>
  <div>
    <h1>Result</h1>
    <p>Time play: {{ timePlayed / 1000 }} s</p>
  </div>
</template>

<script>
export default {
  props: {
    timePlayed: Number,
  },
};
</script>
