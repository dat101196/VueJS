<script setup lang="ts">
import { VueFlow, useVueFlow, getRectOfNodes, type GraphNode, type Styles } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { ref } from 'vue'
import { initialElements } from '@/initial-elements'
/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { onNodeDrag, onNodeDragStop, getIntersectingNodes, isNodeIntersecting, getNodes, findNode } = useVueFlow()

const elements = ref(initialElements)
onNodeDragStop(({ node, intersections }) => {
    console.log('======================================')
    console.log('onNodeDragStop')
    console.log('node: ', node)
    if (!intersections) {
        console.log('intersections = null => do nothing')
        return
    }
    const interIds = intersections.map(n => n.id);
    console.log('intersections: ', intersections)
    console.log('intersectionsId: ', interIds)
    console.log('intersections length: ', intersections?.length)
    let listIntersections = checkChildren(node, intersections)
    console.log('listIntersections: ', listIntersections)

    let idSelect = interIds[0];
    if (!node.parentNode && listIntersections && listIntersections?.length > 1) {
        const intersectionInfo = listIntersections.map(n => `ID: ${n.id} - ${n.label}`)
        const msg = `Please enter node ID you want add this node to (${intersectionInfo.join(', ')})`
        idSelect = prompt(msg) ?? interIds[0]
        console.log('idSelect: ', idSelect)
    }

    if (node.parentNode && interIds?.includes(node.parentNode)) {
        return
    } else if (node.parentNode && !interIds?.includes(node.parentNode)) {
        const oldParent = findNode(node.parentNode)
        console.log('Remove old parent')
        if (oldParent) {
            if (oldParent.data.childrens) {
                //remove children
                oldParent.data.childrens = oldParent.data.childrens.filter((id: string) => id !== node.id)
                node.position.x += oldParent.position.x
                node.position.y += oldParent.position.y
                oldParent.style = {}
            } else {
                oldParent.style = {}
            }

        }
        node.parentNode = ''
        node.class = ''

    }
    let selectedParent = listIntersections.find(n => n.id == idSelect)
    if (!selectedParent) return
    // if (checkParent(selectedParent, node.id)) {
    //     console.log('node children')
    //     return
    // }
    console.log('Set new parent')
    node.parentNode = selectedParent.id
    updateParentNodeSize(node, [node])
    if (!selectedParent.data.childrens) {
        selectedParent.data.childrens = []
    }

    if (!selectedParent.data.childrens.includes(node.id)) {
        selectedParent.data.childrens.push(node.id)
    }

    if (selectedParent.parentNode) {
        selectedParent.position.x = 0
        selectedParent.position.y = 0
        node.position.x -= selectedParent.computedPosition.x
        node.position.y -= selectedParent.computedPosition.y
    } else {
        node.position.x -= selectedParent.position.x
        node.position.y -= selectedParent.position.y
    }

    node.class = 'intersecting'
    console.log('node aft add parent: ', node)
})

// function checkParent(nodeCheck: GraphNode, parentCheckID: string): boolean {
//     if (!nodeCheck.parentNode) {
//         return false;
//     }
//     console.log("[CheckParent] nodeCheck: ", nodeCheck.id)
//     console.log("[CheckParent] nodeCheck.parentNode: ", nodeCheck.parentNode)
//     console.log("[CheckParent] parentCheckID: ", parentCheckID)
//     if (nodeCheck.parentNode !== parentCheckID) {
//         const parent = findNode(nodeCheck.parentNode)
//         console.log("[CheckParent] parent node: ", parent)
//         if (parent) {
//             return checkParent(parent, parentCheckID);
//         }
//         return false;
//     }

//     return true;
// }

function checkChildren(nodeCheck: GraphNode, intersections: GraphNode[]): GraphNode[] {
    let result: GraphNode[] = intersections
    if (nodeCheck.data && nodeCheck.data.childrens) {
        nodeCheck.data.childrens.forEach((nodeId: string) => {
            if (intersections.find(n => n.id == nodeId)) {
                result = result.filter(n => n.id !== nodeId)
            }
            //
            const node = findNode(nodeId)
            if (node) {
                result = checkChildren(node, result)
            }
        })
    }
    return result
}

function updateParentNodeSize(node: GraphNode, nodesCheck: GraphNode[]) {
    if (!node.parentNode) return
    const parent = findNode(node.parentNode)
    if (!parent) return
    console.log('[updateParentNodeSize] node: ', node.label)
    console.log('[updateParentNodeSize] node rect: ', getRectOfNodes([node]))
    console.log('[updateParentNodeSize] parent node rect: ', getRectOfNodes([parent]))
    nodesCheck.push(parent)
    const mergeRect = getRectOfNodes(nodesCheck)
    console.log('[updateParentNodeSize] mergeRect: ', mergeRect)
    parent.position.x = mergeRect.x;
    parent.position.y = mergeRect.y;
    parent.style = { ...parent.style, width: `${mergeRect.width}px`, height: `${mergeRect.height}px` }
    updateParentNodeSize(parent, nodesCheck)
}
</script>

<template>
    <VueFlow v-model="elements" fit-view-on-init :default-viewport="{ zoom: 2 }" :min-zoom="0.5" :max-zoom="4">
        <Background pattern-color="#fff" :gap="8" />

        <MiniMap />

        <Controls />
    </VueFlow>
</template>