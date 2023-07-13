<script setup lang="ts">
import { ref, computed } from 'vue'
import DishesPage from './DishesPage.vue'
//import type and status list external
import type { IRestaurant } from '@/models/restaurant'
import { RecommendStatusList } from '@/constants'
import type { IDish } from '@/models/dish'
//Pinia
// import { storeToRefs } from 'pinia'
// import { useCounterStore } from '@/stores/counter'
//Chỉ có thể destructuring hàm vì counter được bọc bởi reactive nếu destructuring thì sẽ bị mất khả năng reactive như props trong setup
// const counter = useCounterStore();

//Nếu muốn destructuring thì ta phải change biến của counter(store) thành ref theo cách dưới đây
//Cách dùng Pinia destructuring
// const { count, doubleCount } = storeToRefs(counter);
// const { increment } = counter;
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
let newRestaurant = ref<IRestaurant>({
  id: restaurantList.value.length + 1,
  //Enum
  // status: RecommendStatus.WantToTry
  //Type
  status: 'Want to Try',
  dishes: []
});

function addRestaurant() {
  const restaurant: IRestaurant = {
    ...newRestaurant.value
  }
  console.log('[addRestaurant] restaurant: ', restaurant)
  restaurantList.value.push(restaurant)
  newRestaurant = ref<IRestaurant>({
    id: restaurantList.value.length + 1,
    //Enum
    // status: RecommendStatus.WantToTry
    //Type
    status: 'Want to Try',
    dishes: []
  });
}

const addDish = (dish: IDish) => {
  console.log('[addDish] dish: ', dish)
  console.log('[addDish] restaurant dishes bf: ', newRestaurant.value.dishes)
  if (!newRestaurant.value.dishes) {
    newRestaurant.value.dishes = [];
  }
  newRestaurant.value.dishes?.push(dish)
  console.log('[addDish] newRestaurant: ', newRestaurant.value)
  console.log('[addDish] restaurant dishes aft: ', newRestaurant.value.dishes)
}

const isDisableAdd = computed(() => {
  if (!newRestaurant.value.name ||
    newRestaurant.value.name.length === 0 ||
    newRestaurant.value.dishes.length === 0) {
    return true;
  }
  return false;
})
// const dishesList = ref<IDish[]>(props.restaurant.dishes ?? []);
</script>

<template>
  <div class="notes">
    <div>
      <span class="notes__color notes__color--must-try"></span>
      Must Try
    </div>
    <div>
      <span class="notes__color notes__color--want-to-try"></span>
      Want To Try
    </div>
    <div>
      <span class="notes__color notes__color--recommended"></span>
      Recommended
    </div>
  </div>
  <div class="main-view">
    <div class="restaurant-form">
      <h2>Restaurant</h2>
      <h3>New restaurant info</h3>
      <!-- Create a form that allows users to add a restaurant to list. -->
      <div class="restaurant-info">
        <p>ID: {{ newRestaurant.id }}</p>
        <p>Name: {{ newRestaurant.name }}</p>
        <p>Status: {{ newRestaurant.status }}</p>
      </div>
      <h3>Add new restaurant form</h3>
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
        <button class="btn"
          :class="{ 'btn-primary': newRestaurant.name && newRestaurant.dishes.length > 0, 'btn-disabled': isDisableAdd }"
          :disabled="isDisableAdd" type="submit">Add Restaurant</button>
      </form>

    </div>

    <ul style="margin: 10px 0;flex: 1;">
      <li class="restaurant" v-for="(restaurant, index) in restaurantList" :key="index">
        <p class="restaurant__name">{{ restaurant.name }}</p>
        <p class="restaurant__status"
          :class="{ 'want-to-try': restaurant.status === 'Want to Try', 'must-try': restaurant.status === 'Must Try', 'recommended': restaurant.status === 'Recommended' }">
          {{ restaurant.status }}</p>
        <p>Dishes</p>
        <ul>
          <li v-for="(dish, index) in restaurant.dishes" :key="index">
            <span class="dish-name"
              :class="{ 'want-to-try': dish.status === 'Want to Try', 'must-try': dish.status === 'Must Try', 'recommended': dish.status === 'Recommended' }">{{
                dish.name }}</span>
            - {{ dish.diet }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- Pinia -->
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
  justify-content: space-between;
}

.restaurant-info {
  margin: 0 0 10px 16px;
  position: relative;
  padding-bottom: 8px;
}

.restaurant-info::after {
  content: "";
  border-bottom: 1px solid gray;
  position: absolute;
  top: 100%;
  left: -16px;
  right: 0;
}

.restaurant-form {
  border: 1px solid var(--vt-c-white-soft);
  display: inline-block;
  padding: 10px;
  margin: 10px;
  flex: 1;
}

.restaurant-form input,
.restaurant-form select {
  width: 100%;
  margin-bottom: 8px;
}

.restaurant {
  list-style-type: none;
  border: 1px solid var(--vt-c-white-soft);
  padding: 10px;
}

.restaurant__name {
  font-size: 1.5rem;
  font-weight: 700;
}

.restaurant__status {
  font-size: 1.2rem;
  font-weight: 400;
}

.notes__color {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.notes {
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.notes__color--must-try {
  background-color: var(--rc-must-try-color);
}

.notes__color--want-to-try {
  background-color: var(--rc-want-to-try-color)
}

.notes__color--recommended {
  background-color: var(--rc-recommended-color)
}

.must-try {
  color: var(--rc-must-try-color);
}

.want-to-try {
  color: var(--rc-want-to-try-color)
}

.recommended {
  color: var(--rc-recommended-color)
}

.dish-name {
  text-transform: capitalize;
}
</style>