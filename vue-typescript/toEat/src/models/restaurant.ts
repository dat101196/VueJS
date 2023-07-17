import type { RecommendStatus, IDish } from './dish'
export interface IRestaurant {
    id: number,
    name?: string,
    status?: RecommendStatus,
    dishes: IDish[]
}