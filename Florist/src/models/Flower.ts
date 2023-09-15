import { type Category } from './Category'

export interface Flower {
  id: string
  flowerName: string
  price: number
  size: number
  category: Category
  description: string
  thumbnail: string
  listImages: string
}
