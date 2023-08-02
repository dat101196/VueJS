<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { AnswerTypeList } from '@/models/Answer'
import { QuestionAnswer } from '@/models/QuestionAnswer'
import { AnswerType } from '@/models/Enums'
import { AnswerOption } from '@/models/AnswerOption'
import { createOptionEdge } from '@/helper/edge-helper'
import { useFlowElementsStore } from '@/stores/vue-flow-elements'

const props = defineProps<{question: QuestionAnswer}>()
const { getSelectedNode } = useFlowElementsStore()
const { getNodes, addEdges, removeEdges } = useVueFlow();

let aq = ref<QuestionAnswer>()
watchEffect(()=>{
    if(props.question){
        aq = ref(props.question)
    }
})
//
const selectedNode = getSelectedNode()
function addOption(aq: QuestionAnswer) {
    aq.answer.addOption(new AnswerOption(aq.answer.listAnswer.length + 1, ''))
}

//
const filterNodes = computed(() => {
    let fNodes = getNodes.value.filter(n => n.id != selectedNode.value?.id)
    let customNodes = fNodes.map(n => ({ id: n.id, label: n.label }))
    customNodes = [{ id: '', label: '' }, ...customNodes]
    return customNodes
})

function onOptionSelected(event: Event, answer: AnswerOption, question: QuestionAnswer) {
    if (event && event.target) {
        const nodeChange = (event.target as HTMLInputElement).value
        console.log('[onOptionSelected] nodeChange: ', nodeChange)
        answer.pushTo = nodeChange

        if (answer.edgeId) {
            removeEdges(answer.edgeId)
        }

        if (selectedNode.value?.id) {
            const egde = createOptionEdge(selectedNode.value, nodeChange, question, answer)
            addEdges([
                egde
            ])
            answer.edgeId = egde.id
        }
    }
}
</script>
<template>
    <div v-if="aq" class="aq-container">
        <div class="properties-group__row property-text">
            <label for="tbQ1">
                Question
            </label>
            <input class="property-text__input" name="tbQ1" type="text" v-model="aq.question">
        </div>
        <p style="text-align: left;">Answers</p>
        <div class="properties-group__row">
            <label>Type:</label>
            <select v-model="aq.answer.type">
                <option v-for="(type, index) in AnswerTypeList" :key="index">{{ type }}</option>
            </select>
        </div>

        <div v-if="aq.answer.type !== AnswerType.Text" class="properties-group__row">
            <label>List answer</label>
            <button @click="addOption(aq)">Add option</button>
            <div class="option-row">
                <span class="remove-option-col"></span>
                <span class="option-col">Option</span>
                <span class="move-to-col">Move to</span>
            </div>
            <ul>
                <li class="option-row" v-for="(ans, index) in aq.answer.listAnswer" :key="index">
                    <!-- <button>Del</button> -->
                    <!-- <span>{{ ans.pushTo }}</span> -->
                    <input class="option-col" type="text" v-model="aq.answer.listAnswer[index].value">
                    <select class="move-to-col" @change="onOptionSelected($event, ans, aq)">
                        <option v-for="(node, index) in filterNodes" :key="index" :selected="node.id == ans.pushTo"
                            :value="node.id">{{ node.label }}</option>
                    </select>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.aq-container {
    border-bottom: 1px solid gray;
}

.option-row {
    margin: 5px 0;
    display: flex;
}

.remove-option-col {
    width: 50px;
}

.option-col {
    flex: 1;
    margin-right: 5px;
}

.move-to-col {
    width: 100px;
}
</style>