<template>
  <h1>Transaction Page</h1>
  <div class="transaction-item" v-for="tran in transactions" :key="tran.id">
    <router-link
      :to="{ name: 'transaction-detail-route', params: { isn: tran.id } }"
      >{{ tran.name }}: {{ tran.value }}đ
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        {
          id: 1,
          name: "Ăn sáng",
          value: 87000,
        },
        {
          id: 2,
          name: "Cafe",
          value: 105000,
        },
        {
          id: 3,
          name: "Đỗ xăng",
          value: 70000,
        },
        {
          id: 4,
          name: "Ăn trưa",
          value: 27000,
        },
      ],
    };
  },
};
</script>
