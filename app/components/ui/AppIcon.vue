<script setup lang="ts">
const icons = import.meta.glob('~/assets/icons/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export type IconName =
    | 'dashboard' | 'requests' | 'user' | 'users' | 'bell' | 'menu' | 'tag'
    | 'clock' | 'chart' | 'inbox-empty' | 'alert' | 'search' | 'x'
    | 'priority-critical' | 'priority-high' | 'priority-normal' | 'priority-low';

const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 20 });

const svg = computed(() => {
    const entry = Object.entries(icons).find(([path]) => path.endsWith(`/${props.name}.svg`));
    return entry?.[1] ?? '';
});
</script>

<template>
    <span class="icon" :style="{ width: `${size}px`, height: `${size}px` }" aria-hidden="true" v-html="svg" />
</template>

<style scoped>
.icon { display: inline-flex; flex-shrink: 0; }
.icon :deep(svg) { width: 100%; height: 100%; }
</style>
