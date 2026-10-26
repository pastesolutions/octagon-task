<script setup lang="ts">
import type { NewTicket } from '~/composables/useTickets';

useHead({ title: 'Заявки' });

const { tickets, pending, error, reload, addTicket } = useTickets();
const { search, status, priority, assignment, sort, filtered, reset } = useTicketFilters(tickets);

const perPage = 12;
const page = ref(1);

const paginated = computed(() =>
    filtered.value.slice((page.value - 1) * perPage, page.value * perPage),
);

watch([search, status, priority, assignment, sort], () => {
    page.value = 1;
});

const isCreateOpen = ref(false);

function createTicket(input: NewTicket) {
    addTicket(input);
    reset();
    page.value = 1;
}
</script>

<template>
    <div class="page">
        <h1 class="page__title">Рабочий день под контролем</h1>
        <p class="page__subtitle">Заявки, которые требуют вашего внимания</p>

        <TicketStats :tickets="tickets" :pending="pending" />

        <h2 class="section-title">Заявки</h2>
        <div>
            <AppButton class="mobile-full" @click="isCreateOpen = true">Создать заявку</AppButton>
        </div>

        <TicketFilters
            v-model:search="search"
            v-model:status="status"
            v-model:priority="priority"
            v-model:assignment="assignment"
            v-model:sort="sort"
        />

        <ListState v-if="pending" state="loading" />
        <ListState v-else-if="error" state="error" :message="error" @retry="reload" />
        <ListState v-else-if="!tickets.length" state="empty">
            <template #action>
                <AppButton @click="isCreateOpen = true">Создать заявку</AppButton>
            </template>
        </ListState>
        <ListState v-else-if="!filtered.length" state="empty" title="Ничего не найдено" message="Измените условия поиска или сбросьте фильтры.">
            <template #action>
                <AppButton variant="secondary" @click="reset">Сбросить фильтры</AppButton>
            </template>
        </ListState>
        <template v-else>
            <TicketList :tickets="paginated" />
            <AppPagination v-model="page" :total="filtered.length" :per-page="perPage" />
        </template>

        <CreateTicketModal v-model="isCreateOpen" @submit="createTicket" />
    </div>
</template>
