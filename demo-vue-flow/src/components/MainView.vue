<script setup lang="ts">
import { VueFlow, useVueFlow, getRectOfNodes, type GraphNode, type Styles } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { ref, onMounted, type Ref } from 'vue'
import { useFlowElementsStore } from '@/stores/init-flow-elements'
import PropertiesPanel from '@/components/PropertiesPanel.vue'
/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { onNodeDragStart, onNodeDrag, onNodeDragStop, onNodeClick, onPaneClick, getNodes, findNode, setTransform, project, viewport } = useVueFlow()
const { saveElements, getElements } = useFlowElementsStore()
//Get elements from store
let ele: any = []
let elements = ref([])

const initData = async () => {
    ele = await getElements()
    console.log('ele: ', ele)
    elements.value = ele
    console.log('elements: ', elements)
}
initData()

onNodeDragStart(() => {
    console.log('onNodeDragStart')
})

let isDrag = false
onNodeDrag(() => {
    console.log('onNodeDrag')
    isDrag = true
})
//
let rX = 0
let rY = 0
/**Hàm được gọi khi dừng (thả) kéo node
 * @param node Node đang thực hiện event
 * @param intersections Danh sách các node giao với node đang thực hiện event
 */
onNodeDragStop(({ event, node, intersections }) => {
    console.log('======================================')
    console.log('[onNodeDragStop] Begin')
    if (!isDrag) {
        console.log('No drag => do nothing')
        return
    }
    isDrag = false
    console.log('event: ', event)
    console.log('node: ', node)
    if (!intersections) {
        console.log('intersections = null => do nothing')
        return
    }
    //Lấy danh sách intersections ID
    const interIds = intersections.map(n => n.id);
    console.log('intersections: ', intersections)
    console.log('intersectionsId: ', interIds)
    console.log('intersections length: ', intersections?.length)

    //Lọc children của node với danh sách giao nhau 
    let listIntersections = checkChildren(node, intersections)
    console.log('listIntersections: ', listIntersections)

    //Lựa chọn node để làm parent trường hợp thả node đè lên nhiều node khách nhau
    let idSelect = interIds[0];
    if (!node.parentNode && listIntersections && listIntersections?.length > 1) {
        // const intersectionInfo = listIntersections.map(n => `ID: ${n.id} - ${n.label}`)

        //C1: Hiện popup hỏi chọn node làm parent
        // const msg = `Please enter node ID you want add this node to (${intersectionInfo.join(', ')})`
        // idSelect = prompt(msg) ?? interIds[0]
        // console.log('idSelect: ', idSelect)

        //C2: Chọn node có tọa độ z lớn hơn (nổi bên trên) làm parent. 
        //Node nổi cao nhất là node cuối của danh sách intersections
        idSelect = interIds[interIds.length - 1]
    }


    if (node.parentNode && interIds?.includes(node.parentNode)) {
        //Nếu node giao nhau với chính parent node thì ko làm gì hết (kéo node trên chính parent node để thay đổi vị trí)
        console.log('Drag node inside parent node')
        return
    } else if (node.parentNode && !interIds?.includes(node.parentNode)) {
        //Nếu parent node không có trong danh sách giao nhau => node kéo ra khỏi parent node => Xóa parent node
        const oldParent = findNode(node.parentNode)
        console.log('Remove old parent')
        if (oldParent) {
            if (oldParent.data.childrens) {
                //Lọc node ra khỏi danh sách children của parent node
                oldParent.data.childrens = oldParent.data.childrens.filter((id: string) => id !== node.id)
                //Update lại tọa độ (position) sau khi thoát ra khỏi parent node
                node.position.x += oldParent.position.x
                node.position.y += oldParent.position.y
            }

            //Nếu parent node còn node children khác thì ko cần trả về kích thước ban đầu
            if (!oldParent.data.childrens || oldParent.data.childrens.length == 0) {
                oldParent.style = {}
            }

        }

        node.parentNode = ''
        //Remove class intersecting
        let classString = node.class as string
        let split = classString.split(' ')
        node.class = split.filter(name => name !== 'intersecting').join(' ')

    }
    let selectedParent = listIntersections.find(n => n.id == idSelect)
    if (!selectedParent) return
    // if (checkParent(selectedParent, node.id)) {
    //     console.log('node children')
    //     return
    // }
    console.log('Set new parent')
    node.parentNode = selectedParent.id
    //Update tọa độ, kích thước cho tất cả các lớp parent node 
    updateParentNodeSize(node, [node])
    if (!selectedParent.data.childrens) {
        selectedParent.data.childrens = []
    }

    if (!selectedParent.data.childrens.includes(node.id)) {
        //Add node vô danh sách children của parent node
        selectedParent.data.childrens.push(node.id)
    }

    if (selectedParent.parentNode) {
        //Nếu parent node có parent thì update lại tọa độ của node theo computedPosition
        node.position.x -= selectedParent.computedPosition.x
        node.position.y -= selectedParent.computedPosition.y
        console.log('rX: ', rX, '- rY: ', rY)
        node.position.x += rX
        node.position.y += rY
    } else {
        //Nếu parent node ko có parent thì update lại tọa độ của node theo position
        node.position.x -= selectedParent.position.x
        node.position.y -= selectedParent.position.y
    }



    let clss = 'intersecting'
    if (node.class) {
        clss = node.class + ' ' + clss
    }
    node.class = clss.trim()
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
/**
 * Hàm đệ qui dùng để lấy tất cả children node (bao gồm children trong children node cho tới node không còn children nữa) bên trong node cần check với danh sách các node giao nhau (intersections) => nếu children có trong danh sách giao nhau thì loại ra khỏi danh sách giao nhau. 
 * Kết quả trả về là danh sách giao nhau đã được loại bỏ các children node
 * @param nodeCheck Node dùng để lấy list children node
 * @param intersections Danh sách các node giao nhau để check với children node
 */
function checkChildren(nodeCheck: GraphNode, intersections: GraphNode[]): GraphNode[] {
    let result: GraphNode[] = intersections
    //Kiểm tra nếu node cần check không có node con thì return intersections luôn
    if (nodeCheck.data && nodeCheck.data.childrens) {
        nodeCheck.data.childrens.forEach((nodeId: string) => {
            if (intersections.find(n => n.id == nodeId)) {
                //Lọc bỏ đi node children tồn tại trong list intersections (danh sách giao nhau)
                result = result.filter(n => n.id !== nodeId)
            }
            //
            const node = findNode(nodeId)
            if (node) {
                //Gọi đệ qui để check list children node trong node con và truyền danh sách giao nhau đã được lọc (result) để tiếp tục lọc và nhận lại kết quả đã lọc
                result = checkChildren(node, result)
            }
        })
    }
    return result
}

/**
 * Hàm đệ qui dùng để update tọa độ, kích thước cho các lớp parent node từ trong ra tới parent node ngoài cùng (node ko còn parent nữa)
 * @param node Node dùng để lấy parent node cập nhật
 * @param nodesCheck Danh sách các node chung 1 nhóm để lấy rect cập nhật cho parent node
 */
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
    rX = 0
    rY = 0
    //Nếu x hoặc y của rect parent node thì mới thực hiện thay đổi tọa độ(ko dùng position của parent node vì phải dùng tọa độ tuyệt đối (tọa độ thật trên viewport))
    if (getRectOfNodes([parent]).x != mergeRect.x || getRectOfNodes([parent]).y != mergeRect.y) {
        //Cập nhật tọa độ cho node parent để cover node child
        const raX = parent.position.x - mergeRect.x
        const raY = parent.position.y - mergeRect.y
        rX = raX
        rY = raY
        parent.position.x = mergeRect.x
        parent.position.y = mergeRect.y
        //Tính lại tọa độ tương đối so với parent của parent node sau khi thay đổi tọa độ để cover node child
        if (parent.parentNode) {
            const grandParent = findNode(parent.parentNode)
            if (grandParent) {
                if (grandParent.parentNode) {
                    parent.position.x -= grandParent.computedPosition.x
                    parent.position.y -= grandParent.computedPosition.y
                } else {
                    //Nếu parent node ko có parent thì update lại tọa độ của node theo position
                    parent.position.x -= grandParent.position.x
                    parent.position.y -= grandParent.position.y
                }
            }
        }
        console.log('[updateParentNodeSize] raX: ', raX, '- raY: ', raY)
        //Update tọa độ cho các node child khi node parent thay đổi tọa độ để node child vẫn giữ nguyên vị trí
        if (parent.data.childrens && parent.data.childrens.length > 0) {
            parent.data.childrens.forEach((nodeId: string) => {
                const childNode = findNode(nodeId)
                if (childNode) {
                    console.log('[updateParentNodeSize] childNode bf x: ', childNode.position.x, '- y: ', childNode.position.y)
                    childNode.position.x += raX
                    childNode.position.y += raY
                    console.log('[updateParentNodeSize] childNode aft x: ', childNode.position.x, '- y: ', childNode.position.y)
                }
            })
        }
    }

    //Cập nhật kích thước cho node parent để cover node child
    parent.style = { ...parent.style, width: `${mergeRect.width}px`, height: `${mergeRect.height}px` }
    //Cập nhật node parent của node parent này
    updateParentNodeSize(parent, nodesCheck)

}
let nodeClick: Ref<GraphNode<any, any, string> | undefined> = ref()
onNodeClick(({ node, event }) => {
    console.log('[onNodeClick] node: ', node)
    console.log('[onNodeClick] viewport: ', viewport)
    nodeClick.value = node
    // setTransform({ x: node.computedPosition.x - 200, y: , zoom: 1.5 })
})

onPaneClick((event) => {
    console.log('[onPaneClick] event: ', event)
    nodeClick.value = undefined
})

const onUpdateNode = (opts: any) => {
    console.log('[onUpdateNode] opts: ', opts)
    if (nodeClick && nodeClick.value && opts) {
        nodeClick.value.label = opts.label
        nodeClick.value.style = { ...nodeClick.value.style, backgroundColor: opts.bg, color: opts.textColor }
        nodeClick.value.hidden = opts.hidden
    }
}
</script>

<template>
    <VueFlow v-model="elements" fit-view-on-init :default-viewport="{ zoom: 2 }" :min-zoom="0.5" :max-zoom="4">

        <Background pattern-color="#fff" :gap="8" />

        <MiniMap />

        <Controls />
        <PropertiesPanel v-if="nodeClick" :node="nodeClick" @update="onUpdateNode" />
    </VueFlow>
</template>