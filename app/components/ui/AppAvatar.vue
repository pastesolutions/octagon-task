<script setup lang="ts">
const props = defineProps<{ name: string }>();

const initials = computed(() =>
    props.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
);
</script>

<template>
    <span class="avatar" :title="name">{{ initials }}</span>
</template>

<style scoped>
.avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    background: var(--color-surface-active);
    color: var(--color-link);
    font: 600 var(--text-xs);
}
</style>
