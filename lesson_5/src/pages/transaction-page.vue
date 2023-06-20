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
  <p v-else>Loading transactions...</p>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    fetch("http://localhost:3000/transactions")
      .then((response) => {
        return response.json();
      })
      .then((data) => (this.transactions = data));
  },
};
</script>
