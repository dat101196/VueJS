<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld ref="hello" message="Welcome to Your Vue.js App" /> -->
  <!--  -->
  <my-header ref="header" mes="Message pass to header from App" />
  <h1>Hello from {{ myName }}</h1>
  <button @click="onChangeName">Change name</button>
  <!-- Teleport modal component to body -->
  <teleport to="body">
    <base-modal
      v-if="isShowModal"
      title="Confirmation"
      :body="bodyModal"
      @cancel="onToggleModal"
    >
      <template v-slot:header>
        <h3>Slot header</h3>
      </template>

      <template v-slot:footer>
        <button @click="onToggleModal">Close</button>
      </template>

      <label>Name</label>
      <input type="text" />
    </base-modal>
  </teleport>
  <button @click="onToggleModal">Toggle modal</button>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/MainHeader.vue";
import ModalDialog from "./components/ModalDialog.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    MyHeader: Header,
    BaseModal: ModalDialog,
  },
  data() {
    return {
      myName: "Dang Anh Tam",
      bodyModal: "Modal content bind from data of App.vue",
      isShowModal: false,
    };
  },
  methods: {
    onChangeName() {
      this.myName = "Dang Atom";
      console.log(this.$refs.hello);
      console.log(this.$refs.header);
      console.log("headerName: ", this.$refs.header.headerName);
      this.$refs.header.headerName = "Tam Header";
      console.log("headerName change to: ", this.$refs.header.headerName);
      this.$refs.hello.onConsoleTest();
    },
    onToggleModal() {
      console.log("onToggleModal");
      this.isShowModal = !this.isShowModal;
    },
  },
};
</script>

<style>
</style>
