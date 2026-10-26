<script setup lang="ts">
defineProps<{ label: string; placeholder?: string; disabled?: boolean; rows?: number }>();
const model = defineModel<string>({ default: '' });
const id = useId();
</script>

<template>
    <div class="field">
        <label class="field__label" :for="id">{{ label }}</label>
        <textarea :id="id" v-model="model" class="field__control" :rows="rows ?? 4" :placeholder="placeholder" :disabled="disabled" />
    </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 8px; }
.field__label { font: 600 var(--text-xs); color: var(--color-text); }
.field__control {
    padding: 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font: 400 var(--text-sm);
    resize: vertical;
}
.field__control:hover:not(:disabled) { border-color: var(--color-border-hover); }
.field__control::placeholder { color: var(--color-text-muted); }
.field__control:focus-visible { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 1px var(--color-accent); }
.field__control:disabled { border-color: var(--color-border-disabled); opacity: 0.6; cursor: not-allowed; }
</style>
