<script setup lang="ts">
import { reactive, watch, watchEffect, type CSSProperties } from 'vue'
import { useVueFlow, type GraphNode } from '@vue-flow/core'
import { colorNameToHex } from '@/helper/nodes-helper'
import { AnswerTypeList } from '@/models/Answer'
import { QuestionAnswer } from '@/models/QuestionAnswer'
import { AnswerType } from '@/models/Enums'
import { Answer } from '@/models/Answer'
import { AnswerOption } from '@/models/AnswerOption'
const props = defineProps<{
    node: GraphNode | undefined,
}>()
const emits = defineEmits<{
    update: [updateOption: any]
}>()

console.log('[PropertiesPanel] props node: ', props.node)
const { findNode, getNodes } = useVueFlow();
const listNodeTypes = ['Default', 'Input', 'Output']
const listAnswerTypes = ['Select option', 'Text']
const opts = reactive({
    bg: '#ffffff',
    textColor: '#000000',
    label: '',
    hidden: false,
    type: 'Default'
})

watchEffect(() => {
    let styleParse: CSSProperties | undefined = undefined
    if (props.node?.style) {
        styleParse = props.node?.style as CSSProperties
        console.log('Node style: ', styleParse)
    }
    opts.bg = colorNameToHex(styleParse?.backgroundColor)
    opts.textColor = styleParse?.color ? colorNameToHex(styleParse?.color) : '#000000'
    opts.label = props.node?.label as string
    opts.hidden = props.node?.hidden ?? false
    opts.type = listNodeTypes.find(t => t.toLowerCase() == props.node?.type) ?? 'Default'
    console.log('[PropertiesPanel] findNode: ', findNode(props.node?.id))
})


watch(opts, (value) => {
    console.log('watch opts: ', value)
    emits('update', opts)
})
//

//
const ansOpts: AnswerOption[] = [
    { id: 1, value: 'Opt 1', pushTo: '2' },
    { id: 2, value: 'Opt 2', pushTo: '4' },
    { id: 3, value: 'Opt 3', pushTo: '1' },
    { id: 4, value: 'Opt 4', pushTo: '5' },
]

const aq = reactive<QuestionAnswer>({
    question: 'What is your name?',
    answer: new Answer(AnswerType.SelectOne, ansOpts)
})

function addOption(aq: QuestionAnswer) {
    aq.answer.addOption(new AnswerOption(aq.answer.listAnswer.length + 1, '', ''))
}

function onOptionSelected(event: Event, answer: AnswerOption){
    if(event && event.target){
        const nodeChange = (event.target as HTMLInputElement).value
        console.log('[onOptionSelected] nodeChange: ', nodeChange)
        answer.pushTo = nodeChange
    }
}
</script>

<template>
    <div class="properties-container" :class="{ show: node }">
        <p>{{ node?.label }}</p>
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
            <div class="aq-container">
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
                            <span>{{ ans.pushTo }}</span>
                            <input class="option-col" type="text" v-model="aq.answer.listAnswer[index].value">
                            <select class="move-to-col" @change="onOptionSelected($event, ans)">
                                <option v-for="(node, index) in getNodes" :key="index" :selected="node.id == ans.pushTo" :value="node.id">{{  node.label }}</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
            <button>Add questions</button>
        </div>
    </div>
</template>

<style scoped>
.properties-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 350px;
    padding: 10px;
    background-color: white;
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

.aq-container {
    border-bottom: 1px solid gray;
}

.option-row {
    display: flex;
}

.remove-option-col {
    width: 50px;
}

.option-col {
    flex: 1;
}

.move-to-col {
    width: 100px;
}
</style>