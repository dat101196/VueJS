<script setup lang="ts">
import { ref, computed } from 'vue'
//import type and status list external
import type { IDish } from '@/models/dish'
import { RecommendStatusList, DietTypeList } from '@/constants'
import type { IRestaurant } from '@/models/restaurant';
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
const props = defineProps<{
  restaurant: IRestaurant
}>()

const emit = defineEmits<{
  addDishToRestaurant: [dish: IDish]
}>()

const newDish = ref<IDish>({
  status: 'Want to Try'
});

const isDisableAdd = computed(() => {
  if (!newDish.value.name || !newDish.value.diet) {
    return true
  }
  return false
})

function addDish() {
  emit('addDishToRestaurant', { ...newDish.value });
}
</script>

<template>
  <main>
    <div class="dish-form">
      <h3>New dish info</h3>
      <!-- Create a form that allows users to add a dish to list. -->
      <div class="dish-info">
        <p>Name: {{ newDish.name }}</p>
        <p>Status: {{ newDish.status }}</p>
      </div>
      <h3>Add new dish form</h3>
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
        <button class="btn" :class="{ 'btn-primary': !isDisableAdd, 'btn-disabled': isDisableAdd }" type="submit">Add
          Dish</button>
      </form>
      <h3>Dishes of Restaurant ID: {{ props.restaurant.id }}</h3>
      <ul>
        <li v-for="(dish, index) in props.restaurant.dishes" :key="index">
          {{ dish.name }} - {{ dish.diet }} - {{ dish.status }}
        </li>
      </ul>
      <p v-if="props.restaurant.dishes?.length === 0">Nothing to show here</p>
    </div>
  </main>
</template>
<style>
.dish-info {
  margin: 0 0 10px 16px;
  position: relative;
  padding-bottom: 8px;
}

.dish-info::after {
  content: "";
  border-bottom: 1px solid var(--vt-c-white-soft);
  position: absolute;
  top: 100%;
  left: -16px;
  right: 0;
}

.dish-form {
  border: 1px solid var(--vt-c-white-soft);
  padding: 10px;
  margin: 10px 0;
}

.dish-form input,
.dish-form select {
  width: 100%;
  margin-bottom: 8px;
}
</style>