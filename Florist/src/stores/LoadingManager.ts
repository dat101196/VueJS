import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return { isLoading, setLoading }
})
