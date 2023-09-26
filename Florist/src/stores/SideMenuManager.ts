import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', () => {
  const isOpenSideMenu = ref(false)
  function onOpenSideMenu(isOpen: boolean) {
    isOpenSideMenu.value = isOpen
  }

  return { isOpenSideMenu, onOpenSideMenu }
})
