<script setup lang="ts">
defineProps<{ title: string; value: number | string; hint?: string }>();
</script>

<template>
    <article class="stat">
        <h3 class="stat__title">{{ title }}</h3>
        <p class="stat__value">{{ value }}</p>
        <p v-if="hint" class="stat__hint">{{ hint }}</p>
    </article>
</template>

<style scoped>
.stat {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
}
.stat__title, .stat__hint { margin: 0; font: 500 var(--text-xs); color: var(--color-text-muted); }
.stat__value { margin: 0; font: 700 var(--text-2xl); color: var(--color-text); }

@media (max-width: 767px) {
    .stat__value { font-size: 24px; line-height: 31px; }
}
</style>
