<script setup lang="ts">
import type { TicketStatsView } from '~/types/ticket';

const props = defineProps<{ stats?: TicketStatsView }>();

const cards = computed(() => [
    { title: 'Новые заявки', value: props.stats?.new, hint: 'Ожидают назначения' },
    { title: 'В работе', value: props.stats?.inProgress, hint: 'Назначены исполнителям' },
    { title: 'Ожидают ответа', value: props.stats?.waiting, hint: 'Нужна информация' },
    { title: 'Решены', value: props.stats?.resolved, hint: 'За эту неделю' },
]);
</script>

<template>
    <div class="stats">
        <StatCard
            v-for="card in cards"
            :key="card.title"
            :title="card.title"
            :value="card.value ?? '—'"
            :hint="card.hint"
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
