<script setup lang="ts">
import { ref } from 'vue'
/**
 * Restaurants
 * 
 * Name - string
 * Address - string
 * Status - string (e.g, "Wan to Try" | "Must  Try")
 * Dishes - array of Dish objects
 */
//Extract value of enum type
enum RestaurantStatus {
  Recommended = 'Recommended',
  WantToTry = 'Want to Try',
  MustTry = 'Must Try',
  DoNotRecommended = 'Do Not Recommended'
}
const statusList = Object.values(RestaurantStatus);
console.log('List status: ', statusList);
//

//Simple use type
// type RestaurantStatus = 'Want to Try' | 'Must Try' | 'Recommended' | 'Do Not Recommended'
// const statusList = ['Want to Try', 'Must Try', 'Recommended', 'Do Not Recommended']
//

interface IRestaurant {
  name?: string,
  status?: RestaurantStatus,
  dishes?: []
}

const restaurantList = ref<IRestaurant[]>([]);
const newRestaurant = ref<IRestaurant>({});



function addRestaurant() {
  let restaurant: IRestaurant = {
    name: newRestaurant.value.name,
    status: RestaurantStatus.WantToTry,
    dishes: []
  }
  restaurantList.value.push(restaurant);
}
</script>

<template>
  <main>
    <!-- Crate a form that allows users to add a restaurant to list. -->
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
          <option v-for="status in statusList" :value="status" :key="status">{{ status }}</option>
        </select>
      </div>
      <button type="submit">Add Restaurant</button>
    </form>
    <ul>
      <li v-for="(restaurant, index) in restaurantList" :key="index">
        {{ restaurant.name }}
      </li>
    </ul>
  </main>
</template>
