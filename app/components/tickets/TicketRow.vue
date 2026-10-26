<script setup lang="ts">
import type { Ticket } from '~/types/ticket';

defineProps<{ ticket: Ticket }>();
</script>

<template>
    <li class="row ticket-grid">
        <span class="row__id">#{{ ticket.id }}</span>
        <NuxtLink class="row__title" :to="`/requests/${ticket.id}`">{{ ticket.title }}</NuxtLink>
        <span class="row__group">
            <span class="ticket-grid__wide row__cell">{{ ticket.client }}</span>
            <span class="ticket-grid__wide row__cell">{{ ticket.assignee }}</span>
        </span>
        <span class="row__group">
            <span><StatusBadge :status="ticket.status" /></span>
            <span><PriorityBadge :priority="ticket.priority" /></span>
        </span>
    </li>
</template>

<style scoped>
.row {
    min-height: 54px;
    padding: 8px 16px;
    border-top: 1px solid var(--color-border);
    font: 500 var(--text-xs);
    color: var(--color-text);
}

.row:hover {
    background: var(--color-surface-hover);
}

.row__id {
    color: var(--color-text-muted);
}

.row__title {
    font: 500 var(--text-sm);
    color: inherit;
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.row__title,
.row__cell {
    overflow-wrap: anywhere;
}

.row__title:hover {
    color: var(--color-link);
}

.row__title:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.row__group {
    display: contents;
}

@media (max-width: 767px) {
    .row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        padding: 12px 16px;
    }

    .row__group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }
}
</style>
