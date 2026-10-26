<script setup lang="ts">
import { assignmentOptions, priorityOptions, sortOptions, statusOptions } from '~/utils/ticketMeta';

const search = defineModel<string>('search', { default: '' });
const status = defineModel<string>('status', { default: '' });
const priority = defineModel<string>('priority', { default: '' });
const assignment = defineModel<string>('assignment', { default: '' });
const sort = defineModel<string>('sort', { default: 'newest' });
</script>

<template>
    <form class="filters" role="search" aria-label="Фильтры заявок" @submit.prevent>
        <AppInput v-model="search" type="search" label="Поиск" placeholder="Номер или название заявки" />
        <AppSelect v-model="status" label="Статус" :options="[{ value: '', label: 'Все статусы' }, ...statusOptions]" />
        <AppSelect v-model="priority" label="Приоритет" :options="[{ value: '', label: 'Все приоритеты' }, ...priorityOptions]" />
        <AppSelect v-model="assignment" label="Назначение" :options="assignmentOptions" />
        <AppSelect v-model="sort" label="Сортировка" :options="sortOptions" />
    </form>
</template>

<style scoped>
.filters {
    display: grid;
    grid-template-columns: 264px 180px 180px 212px minmax(0, 1fr);
    gap: 12px;
}

@media (max-width: 1279px) {
    .filters {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .filters {
        grid-template-columns: 1fr;
    }
}
</style>
