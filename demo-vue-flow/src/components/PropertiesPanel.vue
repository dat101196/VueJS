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

const opts = reactive({
    bg: '#ffffff',
    textColor: '#000000',
    label: '',
    hidden: false,
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
})


watch(opts, (value) => {
    console.log('watch opts: ', value)
    emits('update', opts)
})

</script>

<template>
    <div class="properties-container" :class="{ show: node }">
        <div class="properties-container__row">
            <label for="tbName">
                Name
            </label>
            <input name="tbName" type="text" v-model="opts.label">
        </div>
        <div class="properties-container__row">
            <label for="tbBackground">
                Background
            </label>
            <input name="tbBackground" type="color" v-model="opts.bg">
        </div>
        <div class="properties-container__row">
            <label for="tbTextColor">
                Text color
            </label>
            <input name="tbTextColor" type="color" v-model="opts.textColor">
        </div>
        <div class="properties-container__row">
            <label>hidden:</label>
            <input v-model="opts.hidden" type="checkbox" />
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
    background-color: white;
    box-shadow: var(--box-shadow-default);
    z-index: 9999;
    transform: translateX(-300px);
    opacity: 0;
    transition: transform linear 0.2s, opacity linear 0.2s;
}

.properties-container.show {
    opacity: 1;
    transform: translateX(0);
}
</style>