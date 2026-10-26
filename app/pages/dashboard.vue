<script setup lang="ts">
import type { ApiRequestListQuery } from '#shared/types/api';

useHead({ title: 'Обзор' });

const { scenario, clearScenario } = useApiScenario();

const apiQuery = computed<ApiRequestListQuery>(() => ({
    sort: 'newest',
    perPage: 3,
    scenario: scenario.value,
}));

const { tickets, stats, isLoading, errorInfo, refresh } = useRequestList(apiQuery);

function retry() {
    if (scenario.value) clearScenario();
    else refresh();
}
</script>

<template>
    <div class="page">
        <h1 class="page__title">Обзор</h1>
        <p class="page__subtitle">Обзор работы поддержки</p>

        <TicketStats :stats="stats" />

        <h2 class="section-title">Последние заявки</h2>
        <div>
            <AppButton class="mobile-full" to="/requests">Все заявки</AppButton>
        </div>

        <ListState v-if="isLoading" state="loading" />
        <ListState
            v-else-if="errorInfo"
            state="error"
            :message="errorInfo.message"
            :retry-after="errorInfo.retryAfter"
            @retry="retry"
        />
        <ListState v-else-if="!tickets.length" state="empty" />
        <TicketList v-else :tickets="tickets" />
    </div>
</template>
