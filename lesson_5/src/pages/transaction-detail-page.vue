<template>
  <h1>Transaction detail page</h1>
  <!-- Cần check transaction != null thì mới render html do transaction lấy data từ server nên có thể chậm hơn vue render html -->
  <div v-if="transaction">
    <p>ID: {{ $route.params.id }}</p>
    <p>Name: {{ transaction.name }}</p>
    <p>Price: {{ transaction.price }} đ</p>
  </div>
  <p v-else>Loading transaction {{ $route.params.id }}...</p>
</template>

<script>
// //Vue 2
// export default {
//   data() {
//     return {
//       // transaction: null,
//     };
//   },
//   computed: {
//     //Demo vuex
//     transaction() {
//       return this.$store.state.transaction;
//     },
//     numberFiltered() {
//       return this.$store.getters.numbersFiltered;
//     },
//   },
//   created() {
//     // // Normal get data
//     // fetch(`http://localhost:3000/transactions/${this.$route.params.id}`)
//     //   .then(function (response) {
//     //     return response.json();
//     //   })
//     //   .then((data) => {
//     //     // console.log("this: ", this);
//     //     //Muốn dùng this.property trong data() thì phải dùng arrow function vì arrow function ko có context => this sẽ là vue object còn anonymous function this sẽ ko tồn tại
//     //     this.transaction = data;
//     //     // console.log(this.transaction);
//     //   });
//     // // Ko dùng được
//     // // .then(function (data) {
//     // //   console.log("this: ", this);
//     // //   //this undefined => Truy xuất vô this sẽ bị lỗi
//     // //   this.transaction = data;
//     // // });

//     //use vuex to get data
//     this.$store.dispatch("getTransaction", { id: this.$route.params.id });
//   },
// };

//Vue 3
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    store.dispatch("getTransaction", { id: route.params.id });

    return {
      transaction: computed(() => store.state.transaction),
    };
  },
};
</script>
