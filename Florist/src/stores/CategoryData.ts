import type { Category } from '@/models/Category'
import { defineStore } from 'pinia'
import { get } from '@/helper/HttpHelper'
import { ref } from 'vue'
export const useCategorytore = defineStore('category', () => {
  const categories = ref<Category[]>()
  async function getAllCategory(): Promise<Category[] | undefined> {
    try {
      console.log('[getAllCategory] begin')
      const response = await get<Category[]>('https://localhost:7274/api/Category/GetAll')
      if (response.parsedBody) {
        categories.value = response.parsedBody
      }
      return response.parsedBody
    } catch (err) {
      console.log('[getAllCategory] err: ', err)
      return undefined
    }
  }

  const selectedCategoryISN = ref(-1)
  function onSetSelectedCategory(categoryISN: number) {
    selectedCategoryISN.value = categoryISN
  }

  return { getAllCategory, categories, selectedCategoryISN, onSetSelectedCategory }
})
