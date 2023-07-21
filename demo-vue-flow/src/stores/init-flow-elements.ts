import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FlowExportObject } from '@vue-flow/core'
export const useFlowElementsStore = defineStore('flowElements', () => {
    const elements = ref<any[]>([])

    function saveElements(flowExport: FlowExportObject) {
        elements.value = [...flowExport.nodes as any[], ...flowExport.edges as any[]]
    }

    async function getElements() {
        const response = await fetch('http://localhost:20333/Shipping/TestGetData')
        const data = await response.json()
        console.log('[getElements] data: ', data)
        return data
    }
    return { saveElements, getElements }
})
