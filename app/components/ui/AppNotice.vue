<template>
    <div class="notice" role="status">
        <p class="notice__text"><slot /></p>
        <div v-if="$slots.action">
            <slot name="action" />
        </div>
    </div>
</template>

<style scoped>
.notice {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
}

.notice__text {
    font: 600 var(--text-md);
}
</style>
