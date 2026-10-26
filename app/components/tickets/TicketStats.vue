<script setup lang="ts">
import type { Ticket, TicketStatus } from '~/utils/mockData';

const props = defineProps<{ tickets: Ticket[]; pending?: boolean }>();

function countBy(status: TicketStatus) {
    return props.tickets.filter((ticket) => ticket.status === status).length;
}

const stats = computed(() => [
    { title: 'Новые заявки', value: countBy('new'), hint: 'Ожидают назначения' },
    { title: 'В работе', value: countBy('in_progress'), hint: 'Назначены исполнителям' },
    { title: 'Ожидают ответа', value: countBy('waiting'), hint: 'Нужна информация' },
    { title: 'Решены', value: countBy('resolved'), hint: 'За эту неделю' },
]);
</script>

<template>
    <div class="stats">
        <StatCard
            v-for="stat in stats"
            :key="stat.title"
            :title="stat.title"
            :value="pending ? '—' : stat.value"
            :hint="stat.hint"
        />
    </div>
</template>

<style scoped>
.stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
}

@media (max-width: 767px) {
    .stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
