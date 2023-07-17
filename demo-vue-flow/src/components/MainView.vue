<script setup lang="ts">
import { VueFlow, useVueFlow, getRectOfNodes } from '@vue-flow/core'
import { ref } from 'vue'
import { initialElements } from '@/initial-elements'

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { onNodeDrag, onNodeDragStop, getIntersectingNodes, isNodeIntersecting, getNodes } = useVueFlow()

const elements = ref(initialElements)
onNodeDragStop(({ event, node, nodes }) => {
    console.log('=========================')
    console.log('onNodeDragStop')
    console.log('event: ', event)
    console.log('node: ', node)
    console.log('nodes: ', nodes)
    const curRect = getRectOfNodes([node]);
    console.log('current rect: ', curRect)
    const curWidthX = curRect.x + curRect.width
    const curHeightY = curRect.y + curRect.height
    console.log('curWidthX: ', curWidthX, '- curHeightY: ', curHeightY)
    //console.log('node: ', nodes[0])
    //console.log('all rect: ', getRectOfNodes(getNodes.value))
    getNodes.value.forEach((n) => {
        if (n === node) {
            console.log('this node')
        } 
        else if (n.parentNode && n.parentNode == node.id) {
            console.log('node children')
        }
        else {
            console.log('--------------------')
            console.log(n.label)
            const rect = getRectOfNodes([n])
            console.log('rect: ', rect)
            const widthX = rect.x + rect.width
            const heightY = rect.y + rect.height
            console.log('widthX: ', widthX, '- heightY: ', heightY)
            let isIntersecting = isNodeIntersecting(node, rect)
            if (isIntersecting) {
                if (node.parentNode !== n.id) {
                    const mergeRect = getRectOfNodes([node, n])
                    console.log('mergeRect: ', mergeRect)
                    console.log('isIntersecting: ', isIntersecting)
                    n.class = 'intersecting'
                    
                    if (node.parentNode != n.id) {
                        n.position.x = mergeRect.x;
                        n.position.y = mergeRect.y;
                        n.style = { width: `${mergeRect.width}px`, height: `${mergeRect.height}px` }
                        node.position.x -= n.position.x;
                        node.position.y -= n.position.y;
                        node.parentNode = n.id
                        console.log('node aft add parent: ', node)
                    }
                }
            } else {
                if (node.parentNode === n.id) {
                    node.parentNode = '';
                    node.position.x += n.position.x;
                    node.position.y += n.position.y;
                }
                n.class = ''
                n.style = {}
            }
        }
    })
})

// onNodeDrag(({ event, intersections, node, nodes }) => {
//     //console.log('onNodeDrag')
// })
</script>

<template>
    <VueFlow v-model="elements" fit-view-on-init :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4" />
</template>