<script setup lang="ts">
withDefaults(defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost';
    type?: 'button' | 'submit';
    disabled?: boolean;
    to?: string;
}>(), {
    variant: 'primary',
    type: 'button',
});
</script>

<template>
    <NuxtLink v-if="to" :to="to" class="btn" :class="`btn--${variant}`">
        <slot />
    </NuxtLink>
    <button v-else :type="type" class="btn" :class="`btn--${variant}`" :disabled="disabled">
        <slot />
    </button>
</template>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    font: 500 var(--text-sm);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s, filter 0.15s;
}

.btn:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.btn:disabled {
    cursor: not-allowed;
}

.btn--primary {
    background: var(--gradient-primary);
    color: #ffffff;
}
.btn--primary:hover:not(:disabled) {
    filter: brightness(1.15);
}
.btn--primary:disabled {
    background: var(--color-surface-hover);
    color: var(--color-text-subtle);
}

.btn--secondary {
    background: var(--color-surface);
    border-color: var(--color-border-strong);
    color: var(--color-text);
}
.btn--secondary:hover:not(:disabled) {
    background: var(--color-surface-hover);
}
.btn--secondary:disabled {
    background: var(--color-surface-hover);
    border-color: var(--color-border);
    color: var(--color-text-subtle);
}

.btn--ghost {
    background: transparent;
    color: var(--color-link);
}
.btn--ghost:hover:not(:disabled) {
    background: var(--color-surface-active);
}
.btn--ghost:disabled {
    color: var(--color-text-subtle);
}
</style>