<script setup lang="ts">
import { ref } from 'vue'
import { type RecommendStatus } from '../types'
import { RecommendStatusList } from '../constants'
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
enum DietType {
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
  GlutenFee = 'Gluten-Fee',
  LactoseFree = 'Lactose-Free',
  Other = 'Other',
}

const dietList = Object.values(DietType);
console.log('List status: ', dietList);
interface Dish {
  name: string,
  diet?: DietType,
  status?: RecommendStatus
}

interface IRestaurant {
  name?: string,
  status?: RecommendStatus,
  dishes?: []
}

const restaurantList = ref<IRestaurant[]>([]);
const newRestaurant = ref<IRestaurant>({
  //Enum
  // status: RecommendStatus.WantToTry
  //Type
  status: 'Want to Try'
});



function addRestaurant() {
  let restaurant: IRestaurant = {
    name: newRestaurant.value.name,
    status: newRestaurant.value.status,
    dishes: []
  }
  restaurantList.value.push(restaurant);
}
</script>

<template>
  <main>
    <!-- Create a form that allows users to add a restaurant to list. -->
    <pre>
      {{ newRestaurant }}
    </pre>
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
      <button type="submit">Add Restaurant</button>
    </form>
    <ul>
      <li v-for="(restaurant, index) in restaurantList" :key="index">
        {{ restaurant.name }} - {{ restaurant.status }}
      </li>
    </ul>
  </main>
</template>
