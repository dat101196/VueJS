<script setup>
import { ref, reactive, computed } from 'vue'

const header = ref('Shopping List App')

const editing = ref(false)
const items = reactive([
  {
    id: 1,
    label: "10 party hats",
    purchased: true,
    highPriority: false
  },
  {
    id: 1,
    label: "2 board games",
    purchased: true,
    highPriority: false
  },
  {
    id: 1,
    label: "20 cups",
    purchased: false,
    highPriority: true
  },
])

const reversedItems = computed(()=>{
  //spread items([...items]) để clone/copy ra thành 1 array mới dùng để reverse => tránh thay đổi data gốc 
  return [...items].reverse()
})
const newItem = ref("")
const newItemHighPriority = ref(false)
const saveItem = () => {
  items.push({ id: items.length + 1, label: newItem.value, highPriority: newItemHighPriority.value })
  newItem.value = "";
  newItemHighPriority.value = false;
}

const doEdit = (e) => {
  editing.value = e
  newItem.value = "";
  newItemHighPriority.value = false;
}

const togglePurchased = (item) => {
  item.purchased = !item.purchased
}
</script>

<template>
  <div class="header">
    <h1>{{ header }}</h1>
    <button v-if="editing" class="btn" @click="doEdit(false)">Cancel</button>
    <button v-else class="btn btn-primary" @click="doEdit(true)">Add Item</button>
  </div>
  <!-- Ta dùng event submit trên form thay vì phải sử dụng ở event click của button và enter của input text trong form => code gọn hơn -->
  <form v-if="editing" class="add-item-form" @submit.prevent="saveItem">
    <input v-model.trim="newItem" type="text" placeholder="Add an item">
    <!-- <input v-model.trim="newItem" @keyup.enter="items.push({ id: items.length + 1, label: newItem })" type="text"
      placeholder="Add an item"> -->
    <label>
      <input type="checkbox" v-model="newItemHighPriority">High Priority
    </label>
    <button class="btn btn-primary" :disabled="newItem.length === 0">
      Save Item
    </button>
    <!-- <button class="btn btn-primary" @click="items.push({ id: items.length + 1, label: newItem })">
      Save Item
    </button> -->
  </form>
  <ul>
    <li v-for="({ id, label, purchased, highPriority }, index) in reversedItems" :key="id" @click="togglePurchased(items[index])"
      :class="{ strikeout: purchased, priority: highPriority }">
      {{ label }}
    </li>
    <!-- binding multi class with condition -->
    <!-- <li v-for="({ id, label, purchased, highPriority }, index) in items" :key="id"
      :class="[purchased ? 'strikeout text-gray' : 'underlined', highPriority ? 'priority' : '']">
      {{ label }}
    </li> -->
  </ul>
  <p v-if="!items.length">Nothing to see here</p>
</template>