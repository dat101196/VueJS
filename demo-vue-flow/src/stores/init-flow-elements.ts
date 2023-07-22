import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FlowExportObject } from '@vue-flow/core'
import { initialElements } from '@/initial-elements'
export const useFlowElementsStore = defineStore('flowElements', () => {
    const elements = ref<any[]>([])

    function saveElements(flowExport: FlowExportObject) {
        elements.value = [...flowExport.nodes as any[], ...flowExport.edges as any[]]
    }

    async function getElements() {
        return initialElements
        try {
            const response = await fetch('http://localhost:20333/Shipping/TestGetData')
            if (!response.ok) throw new Error('Get elements failed')
            const data = await response.json()
            console.log('[getElements] data: ', data)
            return data
        } catch (err) {
            console.log('[getElements] err: ', err)
            return initialElements
        }

    }
    return { saveElements, getElements }
})
