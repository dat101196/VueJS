import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/models/CartItem'
import type { Flower } from '@/models/Flower'

export const useCartStore = defineStore('cartManager', () => {
  const listCartItems = ref<CartItem[]>()
  const updateCart = ref(false)
  function addFlowerToCart(flowerAdd: Flower, qty: number) {
    updateCart.value = false
    if (!listCartItems.value) {
      listCartItems.value = []
    }

    const flowerExist = listCartItems.value.find((item) => item.flower.id == flowerAdd.id)
    if (flowerExist) {
      //Đã trong giỏ hàng => tăng số lượng
      flowerExist.quantity += qty
    } else {
      //Không có trong giỏ hàng => thêm vào giỏ hàng
      const newCartItem: CartItem = {
        flower: flowerAdd,
        quantity: qty
      }
      listCartItems.value.push(newCartItem)
    }
    updateCart.value = true
    console.log('[addFlowerToCart] listCartItems: ', listCartItems.value)
  }

  function removeFlowerFromCart(flowerIdRemove: string) {
    console.log('[removeFlowerFromCart] flowerIdRemove: ', flowerIdRemove)
    const listItemsFiltered = listCartItems.value?.filter(
      (item) => item.flower.id != flowerIdRemove
    )
    console.log('[removeFlowerFromCart] listItemsFiltered: ', listItemsFiltered)
    listCartItems.value = listItemsFiltered
    console.log('[removeFlowerFromCart] listCartItems: ', listCartItems)
  }
  return { listCartItems, updateCart, addFlowerToCart, removeFlowerFromCart }
})
