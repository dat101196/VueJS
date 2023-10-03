import type { City, District, Ward } from '@/models/Address'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import sourceData from '@/data/address.json'
export const useAddressStore = defineStore('address', () => {
  const cities = computed(() => {
    let data = sourceData as City[]
    data = data.sort((a, b) => a.name.localeCompare(b.name))
    return data
  })

  const selectedCity = ref<City>()
  function setSelectedCity(cityCode: number) {
    console.log('[setSelectedCity]')
    const city = cities.value.find((ct) => ct.code === cityCode)
    selectedCity.value = city
    console.log('[setSelectedCity] selectedCity: ', selectedCity.value)
    //Reset district and ward
    selectedDistrict.value = undefined
    selectedWard.value = undefined
  }

  const districts = computed(() => {
    if (selectedCity.value) {
      return selectedCity.value.districts
    } else {
      return undefined
    }
  })

  const selectedDistrict = ref<District>()
  function setSelectedDistrict(districtCode: number) {
    if (!districts.value) return
    const district = districts.value.find((ds) => ds.code === districtCode)
    selectedDistrict.value = district
  }

  const wards = computed(() => (selectedDistrict.value ? selectedDistrict.value.wards : undefined))
  const selectedWard = ref<Ward>()
  function setSelectedWard(wardCode: number) {
    if (!wards.value) return
    const ward = wards.value.find((wd) => wd.code === wardCode)
    selectedWard.value = ward
  }
  // Get from API
  // const addressAPI = 'https://provinces.open-api.vn/api'
  // async function getAllCity(): Promise<City[] | undefined> {
  //   try {
  //     console.log('[getAllCity] begin')
  //     const response = await get<City[]>(`${addressAPI}/p/`)
  //     if (response.parsedBody) {
  //       cities.value = response.parsedBody
  //     }
  //     return response.parsedBody
  //   } catch (err) {
  //     console.log('[getAllCity] err: ', err)
  //     return undefined
  //   }
  // }
  // const districts = ref<District[]>()
  // async function getAllDistrict(cityCode: number): Promise<District[] | undefined> {
  //   try {
  //     console.log('[getAllDistrict] begin')
  //     const response = await get<City>(`${addressAPI}/p/${cityCode}?depth=2`)
  //     if (response.parsedBody) {
  //       districts.value = response.parsedBody.districts
  //     }

  //     return response.parsedBody ? response.parsedBody.districts : undefined
  //   } catch (err) {
  //     console.log('[getAllDistrict] err: ', err)
  //     return undefined
  //   }
  // }

  // const wards = ref<Ward[]>()
  // async function getAllWard(districtCode: number): Promise<Ward[] | undefined> {
  //   try {
  //     console.log('[getAllWard] begin')
  //     const response = await get<District>(`${addressAPI}/d/${districtCode}?depth=2`)
  //     if (response.parsedBody) {
  //       wards.value = response.parsedBody.wards
  //     }

  //     return response.parsedBody ? response.parsedBody.wards : undefined
  //   } catch (err) {
  //     console.log('[getAllWard] err: ', err)
  //     return undefined
  //   }
  // }

  return {
    cities,
    districts,
    wards,
    selectedCity,
    selectedDistrict,
    selectedWard,
    setSelectedCity,
    setSelectedDistrict,
    setSelectedWard
  }
})
