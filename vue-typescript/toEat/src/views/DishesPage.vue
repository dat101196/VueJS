<script setup lang="ts">
import { ref } from 'vue'
/**
 * Dish
 * 
 * Name - string
 * Address - string
 * Status - string (e.g, "Wan to Try" | "Must  Try")
 * Dishes - array of Dish objects
 */
//Extract value of enum type
enum RecommendStatus {
  Recommended = 'Recommended',
  WantToTry = 'Want to Try',
  MustTry = 'Must Try',
  DoNotRecommended = 'Do Not Recommended'
}

const RecommendStatusList = Object.values(RecommendStatus);
console.log('List status: ', RecommendStatusList);
//

//Simple use type
// type RecommendStatus = 'Want to Try' | 'Must Try' | 'Recommended' | 'Do Not Recommended'
// const RecommendStatusList = ['Want to Try', 'Must Try', 'Recommended', 'Do Not Recommended']
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
interface IDish {
  name?: string,
  diet?: DietType,
  status?: RecommendStatus
}


const dishesList = ref<IDish[]>([]);
const newDish = ref<IDish>({
    status: RecommendStatus.WantToTry
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
        <label for="dish-status">Dish Status</label>
        <select name="dish-status" id="dish-status" v-model="newDish.status">
          <option v-for="status in RecommendStatusList" :value="status" :key="status">{{ status }}</option>
        </select>
      </div>
      <button type="submit">Add Dish</button>
    </form>
    <ul>
      <li v-for="(dish, index) in dishesList" :key="index">
        {{ dish.name }} - {{ dish.status }}
      </li>
    </ul>
  </main>
</template>
