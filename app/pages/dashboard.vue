<script setup lang="ts">
useHead({ title: 'Обзор' });

const { tickets, pending, error, reload } = useTickets();

const latest = computed(() =>
    [...tickets.value]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 3),
);
</script>

<template>
    <div class="page">
        <h1 class="page__title">Обзор</h1>
        <p class="page__subtitle">Обзор работы поддержки</p>

        <TicketStats :tickets="tickets" :pending="pending" />

        <h2 class="section-title">Последние заявки</h2>
        <div>
            <AppButton class="mobile-full" to="/requests">Все заявки</AppButton>
        </div>

        <ListState v-if="pending" state="loading" />
        <ListState v-else-if="error" state="error" :message="error" @retry="reload" />
        <ListState v-else-if="!latest.length" state="empty" />
        <TicketList v-else :tickets="latest" />
    </div>
</template>
