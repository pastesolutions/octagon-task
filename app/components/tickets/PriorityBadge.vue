<script setup lang="ts">
import type { TicketPriority } from '~/types/ticket';
import { priorityLabels } from '~/utils/ticketMeta';

defineProps<{ priority: TicketPriority }>();
</script>

<template>
    <span class="priority" :style="{ color: `var(--priority-${priority})` }">
        <AppIcon :name="`priority-${priority}`" :size="16" />
        {{ priorityLabels[priority] }}
    </span>
</template>

<style scoped>
.priority { display: inline-flex; align-items: center; gap: 6px; font: 500 var(--text-xs); white-space: nowrap; }
</style>
