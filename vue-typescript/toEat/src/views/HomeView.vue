<script setup lang="ts">
import { ref } from 'vue'
import DishesPage from './DishesPage.vue'
//import type and status list external
import type { IRestaurant } from '@/models/restaurant'
import { RecommendStatusList } from '@/constants'
//Pinia
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import type { IDish } from '@/models/dish'

//Chỉ có thể destructuring hàm vì counter được bọc bởi reactive nếu destructuring thì sẽ bị mất khả năng reactive như props trong setup
const counter = useCounterStore();

//Nếu muốn destructuring thì ta phải change biến của counter(store) thành ref theo cách dưới đây
//Cách dùng Pinia destructuring
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;
//
/**
 * Restaurant
 * 
 * Name - string
 * Address - string
 * Status - string (e.g, "Wan to Try" | "Must  Try")
 * Dishes - array of Dish objects
 */
//Extract value of enum type
// enum RecommendStatus {
//   Recommended = 'Recommended',
//   WantToTry = 'Want to Try',
//   MustTry = 'Must Try',
//   DoNotRecommended = 'Do Not Recommended'
// }

// const RecommendStatusList = Object.values(RecommendStatus);
// console.log('List status: ', RecommendStatusList);
//

//Simple use type
// type RecommendStatus = 'Want to Try' | 'Must Try' | 'Recommended' | 'Do Not Recommended'
// const RecommendStatusList = ['Want to Try', 'Must Try', 'Recommended', 'Do Not Recommended']
//

//Extract type from constant array
//**as const: để cho nó là readonly ko thể thay đổi
// const RecommendStatusList = ['Want to Try', 'Must Try', 'Recommended', 'Do Not Recommended'] as const;
// type RecommendStatus = typeof RecommendStatusList[number];
//



const restaurantList = ref<IRestaurant[]>([]);
const newRestaurant = ref<IRestaurant>({
  id: restaurantList.value.length + 1,
  //Enum
  // status: RecommendStatus.WantToTry
  //Type
  status: 'Want to Try'
});

function addRestaurant() {
  const restaurant: IRestaurant = {
    ...newRestaurant.value
  }
  console.log('[addRestaurant] restaurant: ', restaurant)
  restaurantList.value.push(restaurant)
}

const addDish = (dish: IDish) => {
  newRestaurant.value.dishes?.push(dish)
    console.log('[addDish] newRestaurant: ', newRestaurant.value)
    console.log('[addDish] newRestaurant: ', newRestaurant.value.dishes)
}

// const dishesList = ref<IDish[]>(props.restaurant.dishes ?? []);
</script>

<template>
  <div class="main-view">
    <div class="restaurant-form">
      <h2>Restaurant</h2>
      <h3>Info</h3>
      <!-- Create a form that allows users to add a restaurant to list. -->
      <pre>
      {{ newRestaurant }}
    </pre>
      <h3>Edit form</h3>
      <form @submit.prevent="addRestaurant">
        <div>
          <label for="restaurant-name">Restaurant Name</label>
          <input type="text" id="restaurant-name" v-model="newRestaurant.name">
        </div>
        <div>
          <label for="restaurant-status">Restaurant Status</label>
          <select name="restaurant-status" id="restaurant-status" v-model="newRestaurant.status">
            <option v-for="status in RecommendStatusList" :value="status" :key="status">{{ status }}</option>
          </select>
        </div>
        <DishesPage :restaurant="newRestaurant" @addDishToRestaurant="addDish" />
        <button type="submit">Add Restaurant</button>
      </form>

    </div>

    <ul>
      <li v-for="(restaurant, index) in restaurantList" :key="index">
        {{ restaurant.name }} - {{ restaurant.status }}
        <pre>
          {{ restaurant.dishes?.length }}
        </pre>
      </li>
    </ul>
    <!-- Cách dùng Pinia ko destructuring -->
    <!-- <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">Increment</button> -->

    <!-- Cách dùng Pinia destructuring -->
    <!-- <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button> -->

  </div>
</template>
<style scoped>
.main-view {
  display: flex;
}

.restaurant-form {
  border: 1px solid gray;
  display: inline-block;
  padding: 10px;
  margin: 10px;
}

.restaurant-form input,
.restaurant-form select {
  width: 100%;
}
</style>