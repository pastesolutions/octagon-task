<script setup lang="ts">
import type { Ticket } from '~/utils/mockData';

defineProps<{ tickets: Ticket[] }>();

const density = useListDensity();
</script>

<template>
    <div class="list" :class="{ 'list--compact': density === 'compact' }">
        <div class="list__head ticket-grid" aria-hidden="true">
            <span>Номер</span>
            <span>Заявка</span>
            <span class="ticket-grid__wide">Клиент</span>
            <span class="ticket-grid__wide">Исполнитель</span>
            <span>Статус</span>
            <span>Приоритет</span>
        </div>
        <ul class="list__body">
            <TicketRow v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
        </ul>
    </div>
</template>

<style scoped>
.list {
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
}

.list__head {
    padding: 16px;
    background: var(--color-surface-hover);
    font: 600 var(--text-xs);
    color: var(--color-text-muted);
}

.list__body {
    margin: 0;
    padding: 0;
    list-style: none;
}

.list--compact :deep(.row) {
    min-height: 40px;
    padding-top: 4px;
    padding-bottom: 4px;
}

@media (max-width: 767px) {
    .list__head {
        display: none;
    }
}
</style>
