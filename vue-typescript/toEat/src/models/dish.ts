import { RecommendStatusList, DietTypeList } from '@/constants'
export type RecommendStatus = typeof RecommendStatusList[number];
export type DietType = typeof DietTypeList[number];

export interface IDish {
    name?: string,
    diet?: DietType,
    status?: RecommendStatus
}