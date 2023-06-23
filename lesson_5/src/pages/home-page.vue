<template>
  <div>
    <h1>Overview Page</h1>
    <!-- demo ref, reactive -->
    <!-- <p>{{ firstName }}</p>
    <p>{{ secondName }}</p>
    <button @click="onChangeSomething">Click me</button>
    <p>{{ car }}</p> -->

    <!-- demo computed -->
    <input type="text" v-model="searchText" />
    <button @click="onChangeList">Change list customers</button>
    <ul>
      <li v-for="(cus, index) in customersFilled" :key="index">{{ cus }}</li>
    </ul>
  </div>
</template>
<script>
//Vue 3 khi cần sử dụng cái nào thì phải import trước
import { watch, watchEffect, computed, ref, reactive } from "vue";
export default {
  setup() {
    //ref nên sử dụng cho kiểu dữ liệu nguyên bản như string, number, boolean.
    //value của ref kiểu dữ liệu là proxy = reactive
    //ref có set,get của chính nó => có thể gán nguyên object vô để thay đổi chính nó.
    const firstName = ref("first");
    const secondName = ref({ name: "second", id: 1 });

    //reactive nên sử dụng cho object, array.
    let car = reactive({
      name: "Mercedes",
      price: 100000,
    });

    function onChangeSomething() {
      //ref giúp binding biến, khi thay đổi giá trị phải tên biến.value.
      firstName.value = "Atom";
      secondName.value.id = 2;
      //reactive là proxy object, ko cần phải .value để lấy giá trị mà có thể sử dụng trực tiếp.
      console.log(car);
      car.name = "BMW";

      //ref giúp binding biến, khi thay đổi giá trị phải tên biến.value.
      secondName.value = { id: -1, name: "Changed", qty: 3 };
      //reactive chỉ có set,get cho property => không thể gán object để thay đổi chính nó mà chỉ thay đổi giá trị property bên trong.
      car = { name: "Audi", price: 1000 };
    }

    //Demo computed
    //Computed sẽ chạy lại hàm callback bên trong khi biến ref/reactive trong hàm callback có thay đổi
    const searchText = ref("");
    let customers = reactive(["Alba", "Davie", "Dean", "Cindy", "Lia"]);
    //Khi customers hoặc searchText thay đổi giá trị thì hàm callback trong computed sẽ chạy lại
    const customersFilled = computed(() =>
      customers.filter((cus) =>
        //searchText thay đổi
        cus.toLowerCase().includes(searchText.value.toLowerCase())
      )
    );

    function onChangeList() {
      //customers thay đổi
      console.log("onChangeList");
      customers[0] = "Tom";
    }

    //Demo watch
    //Dùng để theo dõi ref/reactive khi nó có thay đổi
    watch(searchText, (newValue, prevValue) => {
      console.log("[watch - searchText] newValue: ", newValue);
      console.log("[watch - searchText] prevValue: ", prevValue);
    });

    //Demo watchEffect
    //watchEffect hoạt động giống computed chỉ khác ở điểm computed có return ra 1 ref
    watchEffect(() => {
      if (searchText.value) {
        console.log("[watchEffect] searchText: ", searchText.value);
      }
    });

    return {
      firstName,
      secondName,
      car,
      onChangeSomething,
      //demo computed
      searchText,
      customers,
      customersFilled,
      onChangeList,
    };
  },
};
</script>
