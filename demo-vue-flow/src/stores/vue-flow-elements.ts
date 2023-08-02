import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GraphNode,  FlowExportObject } from '@vue-flow/core'
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
    //
    const selectedNode = ref<GraphNode>()
    function setSelectedNode(node?: GraphNode) {
        console.log('[setSelectedNode] node: ', node)
        selectedNode.value = node
    }

    function getSelectedNode() {
        console.log('[getSelectedNode] selectedNode: ', selectedNode)
        return selectedNode
    }
    return { saveElements, getElements, setSelectedNode, getSelectedNode, selectedNode }
})
