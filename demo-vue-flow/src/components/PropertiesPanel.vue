<script setup lang="ts">
import { ref, reactive, watch, watchEffect, type CSSProperties } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { colorNameToHex } from '@/helper/nodes-helper'
import { QuestionAnswer } from '@/models/QuestionAnswer'
import { AnswerType } from '@/models/Enums'
import { Answer } from '@/models/Answer'
import QuestionGroup from './QuestionGroup.vue'
import { useFlowElementsStore } from '@/stores/vue-flow-elements'

const { getSelectedNode } = useFlowElementsStore()
const selectedNode = getSelectedNode()
console.log('[PropertiesPanel] props node: ', selectedNode.value)
const { findNode } = useVueFlow();
const listNodeTypes = ['Default', 'Input', 'Output']
const opts = reactive({
    bg: '#ffffff',
    textColor: '#000000',
    label: '',
    hidden: false,
    type: 'Default'
})

watchEffect(() => {
    let styleParse: CSSProperties | undefined = undefined
    if (selectedNode.value?.style) {
        styleParse = selectedNode.value?.style as CSSProperties
        console.log('Node style: ', styleParse)
    }
    opts.bg = colorNameToHex(styleParse?.backgroundColor)
    opts.textColor = styleParse?.color ? colorNameToHex(styleParse?.color) : '#000000'
    opts.label = selectedNode.value?.label as string
    opts.hidden = selectedNode.value?.hidden ?? false
    opts.type = listNodeTypes.find(t => t.toLowerCase() == selectedNode.value?.type) ?? 'Default'
    console.log('[PropertiesPanel] findNode: ', findNode(selectedNode.value?.id))
})


watch(opts, (value) => {
    console.log('[watch opts] opts: ', opts)
    console.log('[watch opts] value: ', value)
    if (selectedNode && selectedNode.value && opts) {
        selectedNode.value.label = opts.label
        selectedNode.value.style = { ...selectedNode.value.style, backgroundColor: opts.bg, color: opts.textColor }
        selectedNode.value.hidden = opts.hidden
        selectedNode.value.type = opts.type.toLowerCase()
    }
})

const questions = ref<QuestionAnswer[]>([])
watchEffect(() => {
    console.log('[watchEffect questions]')
    if (selectedNode.value) {
        questions.value = []
        if (selectedNode.value.data && selectedNode.value.data.questions) {
            console.log('[watchEffect questions] node data: ', selectedNode.value.data)
            console.log('[watchEffect questions] node questions: ', selectedNode.value.data.questions)
            questions.value = selectedNode.value.data.questions
            console.log('[watchEffect questions] questions: ', questions)
        }
    }
});

watch(() => questions.value, (value) => {
    console.log('[watch questions] questions: ', questions)
    console.log('[watch questions] value: ', value)
    if (selectedNode.value) {
        selectedNode.value.data.questions = value
    }
})

function addQuestion() {
    if (selectedNode.value) {
        let aq = new QuestionAnswer(questions.value.length + 1, '', new Answer(AnswerType.SelectOne, []))
        questions.value.push(aq)
        if(selectedNode && selectedNode.value){
            selectedNode.value.data.questions = questions.value
        }
    }
}

</script>

<template>
    <div class="properties-container" :class="{ show: selectedNode }">
        <p>{{ selectedNode?.label }}</p>
        <div class="properties-group ui-properties">
            <p class="properties-group__title">UI Properties</p>
            <div class="properties-group__row property-text">
                <label for="tbName">
                    Name
                </label>
                <input class="property-text__input" name="tbName" type="text" v-model="opts.label">
            </div>
            <div class="properties-group__row">
                <label for="tbBackground">
                    Background
                </label>
                <input name="tbBackground" type="color" v-model="opts.bg">
            </div>
            <div class="properties-group__row">
                <label for="tbTextColor">
                    Text color
                </label>
                <input name="tbTextColor" type="color" v-model="opts.textColor">
            </div>
            <div class="properties-group__row">
                <label>hidden:</label>
                <input v-model="opts.hidden" type="checkbox" />
            </div>
            <div class="properties-group__row">
                <label>Type:</label>
                <select v-model="opts.type">
                    <option v-for="(type, index) in listNodeTypes" :key="index">{{ type }}</option>
                </select>
            </div>
        </div>

        <div class="properties-group aq-list">
            <p class="properties-group__title">Questions & Answers</p>
            <QuestionGroup v-for="(aq) in questions" :key="aq.id" :question="aq"/>
            <button @click="addQuestion()">Add questions</button>
        </div>
    </div>
</template>

<style>
.properties-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 350px;
    padding: 10px;
    background-color: white;
    overflow-y: scroll;
    box-shadow: var(--box-shadow-default);
    z-index: 9999;
    transform: translateX(-300px);
    opacity: 0;
    transition: transform linear 0.2s, opacity linear 0.2s;
}

.properties-container label,
.properties-container p {
    text-transform: capitalize;
}

.properties-container li input {
    width: 100%;
}

.properties-container.show {
    opacity: 1;
    transform: translateX(0);
}

.properties-group {
    border: 1px solid gray;
    padding: 10px;
    margin: 10px 0;
}

.properties-group .properties-group__title {
    text-transform: uppercase;
}

.properties-group__row {
    text-align: left;
    margin: 10px 0;
}

.property-text {
    display: flex;
}

.property-text__input {
    margin: 0 0 0 10px;
    flex: 1;
}
</style>