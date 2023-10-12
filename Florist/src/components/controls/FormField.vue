<template>
    <div class="field-container">
        <p class="field-title">{{ title }}</p>
        <input :type="type" :value="value"
            @input="$emit('update:value', $event.target ? ($event.target as HTMLInputElement).value : '')"
            :placeholder="placeholder" :class="{ 'field-error': isError }" />
    </div>
</template>
<script setup lang="ts">
export interface TextFieldProps {
    type: string
    title?: string,
    value?: string,
    placeholder?: string,
    isError?: boolean
}

withDefaults(defineProps<TextFieldProps>(), {
    type: 'text'
})
</script>
<style scoped>
.field-container {
    margin: 5px 0;
}

.field-title {
    font-size: 1.6rem;
}

.field-error {
    border: 1px solid red;
}

input {
    width: 100%;
}
</style>