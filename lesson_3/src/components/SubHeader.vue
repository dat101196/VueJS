<template>
  <div style="background-color: #f0f0f0; padding: 32px 0">
    <p>Age: {{ userAge }}</p>
    <input type="number" v-model="currentAge" />
    <button @click="onChangeAge">Change Age to all component</button>
    <button @click="onResetAge">Reset age inside</button>
  </div>
</template>

<script>
export default {
  props: {
    userAge: Number,
  },
  data() {
    return {
      //props cannot writable => tạo biến trong data() hứng property xong binding vô input để thay đổi giá trị
      currentAge: this.userAge,
    };
  },
  methods: {
    onChangeAge() {
      console.log("onChangeAge - userAge", this.currentAge);
      this.$emit("onChangeAge", this.currentAge);
    },
    onResetAge() {
      this.currentAge = 18;
    },
  },
  watch: {
    //Theo dõi prop userAge thay đổi từ ngoài và update lại currentAge binding vô input
    userAge(newVal, oldVal) {
      console.log("current Age: ", oldVal);
      console.log("new Age:", newVal);
      this.currentAge = newVal;
    },
  },
};
</script>