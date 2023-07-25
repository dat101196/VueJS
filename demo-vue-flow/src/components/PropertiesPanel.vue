<script setup lang="ts">
import { reactive, watch, watchEffect, type CSSProperties } from 'vue'
import { type GraphNode } from '@vue-flow/core'
import { colorNameToHex } from '@/helper/nodes-helper'
const props = defineProps<{
    node: GraphNode | undefined,
}>()
const emits = defineEmits<{
    update: [updateOption: any]
}>()

console.log('[PropertiesPanel] props node: ', props.node)
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
})


watch(opts, (value) => {
    console.log('watch opts: ', value)
    emits('update', opts)
})

//
const aq = reactive({
    question: '',
    answers: [
        {
            type: 'select',
            options: [
                'Opt 1',
                'Opt 2',
                'Opt 3',
                'Opt 4',
            ]
        }
    ]
})

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
                    <input class="property-text__input" name="tbQ1" type="text">
                </div>
                <p style="text-align: left;">Answers</p>
                <div class="properties-group__row">
                    <label>Type:</label>
                    <select>
                        <option v-for="(type, index) in listAnswerTypes" :key="index">{{ type }}</option>
                    </select>
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
    width: 300px;
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
</style>