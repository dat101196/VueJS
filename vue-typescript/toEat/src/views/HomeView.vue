<script setup lang="ts">
import { ref } from 'vue'
const restaurantList = ref<string[]>([]);
const newRestaurantName = ref('');
function addRestaurant() {
  restaurantList.value.push(newRestaurantName.value);
}
</script>

<template>
  <main>
    <!-- Crate a form that allows users to add a restaurant to list. -->
    <form @submit.prevent="addRestaurant">
      <label for="restaurant-name">Restaurant Name</label>
      <input type="text" id="restaurant-name" v-model="newRestaurantName">
      <button type="submit">Add Restaurant</button>
    </form>
    <ul>
      <li v-for="restaurant in restaurantList" :key="restaurant">
        {{ restaurant }}
      </li>
    </ul>
  </main>
</template>
