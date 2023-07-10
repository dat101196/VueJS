<script setup lang="ts">
import { ref } from 'vue'
//import type and status list external
import type { IDish } from '../types'
import { RecommendStatusList, DietTypeList } from '../constants'
/**
 * Dish
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
// enum DietType {
//   Vegetarian = 'Vegetarian',
//   Vegan = 'Vegan',
//   GlutenFee = 'Gluten-Fee',
//   LactoseFree = 'Lactose-Free',
//   Other = 'Other',
// }

// const dietList = Object.values(DietType);
// console.log('List status: ', dietList);



const dishesList = ref<IDish[]>([]);
const newDish = ref<IDish>({
  status: 'Want to Try'
});

function addDish() {
  let dish: IDish = {
    name: newDish.value.name,
    diet: newDish.value.diet,
    status: newDish.value.status,
  }
  dishesList.value.push(dish);
}
</script>

<template>
  <main>
    <!-- Create a form that allows users to add a dish to list. -->
    <pre>
      {{ newDish }}
    </pre>
    <form @submit.prevent="addDish">
      <div>
        <label for="dish-name">Dish Name</label>
        <input type="text" id="dish-name" v-model="newDish.name">
      </div>
      <div>
        <label for="dish-diet">Dish Diet</label>
        <select name="dish-diet" id="dish-diet" v-model="newDish.diet">
          <option v-for="diet in DietTypeList" :value="diet" :key="diet">{{ diet }}</option>
        </select>
      </div>
      <div>
        <label for="dish-status">Dish Status</label>
        <select name="dish-status" id="dish-status" v-model="newDish.status">
          <option v-for="status in RecommendStatusList" :value="status" :key="status">{{ status }}</option>
        </select>
      </div>
      <button type="submit">Add Dish</button>
    </form>
    <ul>
      <li v-for="(dish, index) in dishesList" :key="index">
        {{ dish.name }} - {{ dish.diet }} - {{ dish.status }}
      </li>
    </ul>
  </main>
</template>
