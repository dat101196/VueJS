import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenu = defineStore('menuId', () => {
    const selectedMenu = ref('invoices');
    function onSetSelectedMenu(menu) {
        selectedMenu.value = menu;
    }

    return { selectedMenu, onSetSelectedMenu }
})