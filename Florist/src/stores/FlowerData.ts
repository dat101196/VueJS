import type { Flower } from '@/models/Flower'
import { defineStore } from 'pinia'
import { get } from '@/helper/HttpHelper'
export const useFlowerStore = defineStore('flower', () => {
  async function getAllFlowers(): Promise<Flower[] | undefined> {
    try {
      console.log('[getAllFlowers] begin')
      const response = await get<Flower[]>('https://localhost:7274/api/Flower/GetAll')
      return response.parsedBody
    } catch (err) {
      console.log('[getAllFlowers] err: ', err)
      return undefined
    }
  }

  return { getAllFlowers }
})
