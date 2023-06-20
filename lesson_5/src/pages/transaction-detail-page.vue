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
export default {
  data() {
    return {
      transaction: null,
    };
  },
  created() {
    fetch(`http://localhost:3000/transactions/${this.$route.params.id}`)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log("this: ", this);
        //Muốn dùng this.property trong data() thì phải dùng arrow function vì arrow function ko có context => this sẽ là vue object còn anonymous function this sẽ ko tồn tại
        this.transaction = data;
        console.log(this.transaction);
      });
    //Ko dùng được
    // .then(function (data) {
    //   console.log("this: ", this);
    //   //this undefined => Truy xuất vô this sẽ bị lỗi
    //   this.transaction = data;
    // });
  },
};
</script>
