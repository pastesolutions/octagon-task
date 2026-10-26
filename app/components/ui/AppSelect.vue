<script setup lang="ts">
defineProps<{
    label: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
}>();

const model = defineModel<string>({default: ''});
const id = useId();
</script>

<template>
    <div class="field">
        <label class="field__label" :for="id">{{ label }}</label>
        <select
            :id="id"
            v-model="model"
            class="field__control"
            :disabled="disabled"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field__label {
    font: 600 var(--text-xs);
    color: var(--color-text);
}

.field__control {
    height: 50px;
    padding: 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font: 400 var(--text-sm);
    color-scheme: dark;
    cursor: pointer;
}

.field__control:hover:not(:disabled) {
    border-color: var(--color-border-hover);
}

.field__control:focus-visible {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 1px var(--color-accent);
}

.field__control:disabled {
    border-color: var(--color-border-disabled);
    cursor: not-allowed;
    opacity: 0.6;
}
</style>