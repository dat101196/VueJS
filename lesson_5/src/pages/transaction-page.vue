<template>
  <h1>Transaction Page</h1>
  <div v-if="transactions.length">
    <div class="transaction-item" v-for="tran in transactions" :key="tran.id">
      <router-link
        :to="{ name: 'transaction-detail-route', params: { id: tran.id } }"
        >{{ tran.name }}: {{ tran.price }}đ
      </router-link>
    </div>
  </div>
  <p v-else-if="error" style="color: red">{{ error.message }}</p>
  <p v-else>Loading transactions...</p>
</template>

<script>
// //Vue 3
// import { ref } from "vue";

// //Demo fetch data
// //Vue 2: fetch api trong hàm created()
// //Vue 3: fetch api trong hàm setup() (do setup() thay thế lifecycle beforeCreated và created)
// export default {
//   //Vue 2
//   // data() {
//   //   return {
//   //     transactions: [],
//   //   };
//   // },
//   // created() {
//   //   fetch("http://localhost:3000/transactions")
//   //     .then((response) => {
//   //       return response.json();
//   //     })
//   //     .then((data) => (this.transactions = data));
//   // },

//   //Vue 3
//   setup() {
//     //hàm setup ko chạy được async => tạo hàm để chạy async
//     const transactions = ref([]);
//     const error = ref(null);
//     const getTrans = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/transactions");
//         if (!response.ok) throw new Error("Something went wrong!!!");
//         transactions.value = await response.json();
//       } catch (err) {
//         error.value = err;
//         console.log(error.value);
//       }
//     };
//     getTrans();
//     return {
//       transactions,
//       error,
//     };
//   },
// };

//Vue 3
// import useTransactions from "../uses/fetchTransactions";
//Vuex
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  //Vue 3
  setup() {
    // //Demo reuse fetch data
    // const { transactions, error, getTrans } = useTransactions();
    // getTrans();
    //Vuex
    const store = useStore();
    store.dispatch("getAllTransactions");
    const transactions = computed(() => {
      return store.state.transactions;
    });
    const error = computed(() => {
      return store.state.error;
    });
    return { transactions, error };
  },
};
</script>
