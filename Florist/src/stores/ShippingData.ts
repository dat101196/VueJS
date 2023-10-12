import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAddressStore } from './AddressData'
import { validatePhone } from '@/helper/UIHelper'
export const useShippingStore = defineStore('shipping', () => {
  const addrStore = useAddressStore()
  const { selectedCity, selectedDistrict, selectedWard } = storeToRefs(addrStore)

  const fullName = ref('')
  const phoneNumber = ref('')
  const addressLine = ref('')
  const isNameError = computed(() => !fullName.value)
  const isPhoneError = computed(() => !phoneNumber.value || !validatePhone(phoneNumber.value))
  const isAddressError = computed(() => !addressLine.value)
  const canCreateOrder = computed(() => {
    if (
      !isNameError.value &&
      !isPhoneError.value &&
      !isAddressError.value &&
      selectedCity.value &&
      selectedDistrict.value &&
      selectedWard.value
    ) {
      return true
    }

    return false
  })
  return { fullName, phoneNumber, addressLine, isNameError, isPhoneError, isAddressError, canCreateOrder }
})
