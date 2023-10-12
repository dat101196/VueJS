import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/models/CartItem'
import type { Flower } from '@/models/Flower'

export const useCartStore = defineStore(
  'cartManager',
  () => {
    const listCartItems = ref<CartItem[]>()
    const updateCart = ref(false)
    const totalQty = computed(() =>
      listCartItems.value
        ? listCartItems.value.reduce((sumQty, cartItem) => sumQty + cartItem.quantity, 0)
        : 0
    )

    const listSelectedItems = computed(() => listCartItems.value?.filter((item) => item.isSelected))

    const totalSelectedItem = computed(() =>
      listSelectedItems.value ? listSelectedItems.value.length : 0
    )

    const totalSelectedQty = computed(() =>
      listSelectedItems.value
        ? listSelectedItems.value.reduce((sumQty, cartItem) => sumQty + cartItem.quantity, 0)
        : 0
    )

    const totalSelectedPrice = computed(() =>
      listSelectedItems.value
        ? listSelectedItems.value.reduce(
            (sumPrice, cartItem) => sumPrice + cartItem.quantity * cartItem.flower.price,
            0
          )
        : 0
    )

    const selectedAll = ref(false)

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
          quantity: qty,
          isSelected: false
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

    function clearSelectedItem() {
      if (listSelectedItems.value) {
        const listSelected = listSelectedItems.value
        listSelected.forEach((item) => {
          removeFlowerFromCart(item.flower.id)
        })
      }
    }

    return {
      listCartItems,
      listSelectedItems,
      updateCart,
      totalQty,
      totalSelectedItem,
      totalSelectedQty,
      totalSelectedPrice,
      selectedAll,
      addFlowerToCart,
      removeFlowerFromCart,
      clearSelectedItem
    }
  },
  {
    persist: true
  }
)
