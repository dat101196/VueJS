import type { Flower } from '@/models/Flower'
import { defineStore } from 'pinia'
import { get } from '@/helper/HttpHelper'
import { isNullorEmpty } from '@/helper/UIHelper'
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

  async function getFlowerDetail(id: string): Promise<Flower | undefined> {
    try {
      console.log('[getFlowerDetail] begin')
      if(isNullorEmpty(id)) return undefined
      const response = await get<Flower>(`https://localhost:7274/api/Flower/Get/${id}`)
      return response.parsedBody
    } catch (err) {
      console.log('[getFlowerDetail] err: ', err)
      return undefined
    }
  }

  return { getAllFlowers, getFlowerDetail }
})
