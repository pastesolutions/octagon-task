<script setup lang="ts">
defineProps<{
    label: string;
    type?: 'text' | 'email' | 'password' | 'search';
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}>();

const model = defineModel<string>({default: ''});
const id = useId();
</script>

<template>
    <div class="field">
        <label class="field__label" :for="id">{{ label }}</label>
        <input
            :id="id"
            v-model="model"
            class="field__control"
            :class="{ 'field__control--error': error }"
            :type="type ?? 'text'"
            :placeholder="placeholder"
            :disabled="disabled"
            :aria-invalid="!!error"
            :aria-describedby="error ? `${id}-error` : undefined"
        >
        <p v-if="error" :id="`${id}-error`" class="field__error">{{ error }}</p>
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
}

.field__control::placeholder {
    color: var(--color-text-muted);
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

.field__control--error,
.field__control--error:hover:not(:disabled) {
    border-color: var(--color-error);
    box-shadow: 0 0 0 1px var(--color-error);
}

.field__error {
    font: 500 var(--text-xs);
    color: var(--color-error);
}
</style>
