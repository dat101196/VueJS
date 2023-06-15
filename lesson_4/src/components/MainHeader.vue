<template>
  <h1>This is {{ headerName }} component.</h1>
  <p class="modal-header">Message:"{{ mes }}"</p>
  <hr/>
</template>

<script>
export default {
  props: {
    mes: String,
  },
  data() {
    return {
      headerName: "Atom Header",
    };
  },
};
</script>

<style>
</style>