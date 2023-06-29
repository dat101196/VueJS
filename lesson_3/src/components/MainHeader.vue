<template>
  <h1>This is header component.</h1>
  <p class="modal-header">headerNameProp:"{{ headerNameProp }}"</p>
  <p class="modal-header">headerNameData:"{{ headerNameData }}"</p>
  <button @click="onResetNameFunction">
    Reset Name function from callback parent
  </button>
  <p class="modal-header">Age:"{{ userAge }}"</p>
  <button @click="onResetAge">Reset age to all component</button>
  <hr />
</template>

<script>
export default {
  props: {
    headerNameProp: String,
    mes: String,
    //Khai báo property dạng function để parent truyền 1 function callback vào và dùng nó trong component
    onResetNameFunction: Function,
    userAge: Number,
  },
  data() {
    return {
      headerNameData: "Original header name data",
    };
  },
  methods: {
    onResetAge() {
      this.$emit("onMainResetAge");
    },
  },
};
</script>

<style>
</style>