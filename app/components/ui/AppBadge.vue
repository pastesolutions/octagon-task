<script setup lang="ts">
defineProps<{ color: string; background: string }>();
</script>

<template>
    <span class="badge" :style="{ color, background }">
        <span class="badge__dot" />
        <slot />
    </span>
</template>

<style scoped>
.badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font: 600 var(--text-xs);
    white-space: nowrap;
}

.badge__dot {
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}
</style>
