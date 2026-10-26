<script setup lang="ts">
import type { ApiCreateRequestBody, ApiRequestListQuery } from '#shared/types/api';

useHead({ title: 'Заявки' });

const PER_PAGE = 12;

const {
    filters,
    scenario,
    search,
    status,
    priority,
    assignment,
    sort,
    page,
    hasActiveFilters,
    reset,
    resetSearch,
    clearScenario,
} = useRequestFilters();

const apiQuery = computed<ApiRequestListQuery>(() => ({
    q: filters.value.q || undefined,
    status: filters.value.status,
    priority: filters.value.priority,
    assignment: filters.value.assignment,
    sort: filters.value.sort,
    page: filters.value.page,
    perPage: PER_PAGE,
    scenario: scenario.value,
}));

const { tickets, total, stats, isLoading, errorInfo, hasIncomplete, refresh } = useRequestList(apiQuery);

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / PER_PAGE)));
const isPageOutOfRange = computed(() => !isLoading.value && total.value > 0 && filters.value.page > pageCount.value);

watch(isPageOutOfRange, (outOfRange) => {
    if (outOfRange && import.meta.client) page.value = pageCount.value;
}, { immediate: true });

function retry() {
    if (scenario.value) clearScenario();
    else refresh();
}

const isCreateOpen = ref(false);
const isCreating = ref(false);
const createError = ref<string>();

async function onCreate(body: ApiCreateRequestBody) {
    isCreating.value = true;
    createError.value = undefined;
    try {
        await createRequest(body);
        isCreateOpen.value = false;
        if (hasActiveFilters.value || filters.value.page > 1 || filters.value.sort !== 'newest') await reset();
        else await refresh();
    } catch (error) {
        createError.value = toApiErrorInfo(error).message;
    } finally {
        isCreating.value = false;
    }
}
</script>

<template>
    <div class="page">
        <h1 class="page__title">Рабочий день под контролем</h1>
        <p class="page__subtitle">Заявки, которые требуют вашего внимания</p>

        <AppNotice v-if="filters.q && total > 0 && !isLoading && !errorInfo">
            По запросу «{{ filters.q }}» найдено: {{ total }}
            <template #action>
                <AppButton variant="secondary" @click="resetSearch">Сбросить поиск</AppButton>
            </template>
        </AppNotice>

        <AppNotice v-if="hasIncomplete && !isLoading">
            Часть данных заявки недоступна. Остальные обращения отображаются.
        </AppNotice>

        <TicketStats :stats="stats" />

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

        <ListState v-if="isLoading || isPageOutOfRange" state="loading" />
        <ListState
            v-else-if="errorInfo"
            state="error"
            :message="errorInfo.message"
            :retry-after="errorInfo.retryAfter"
            @retry="retry"
        />
        <ListState
            v-else-if="!tickets.length && hasActiveFilters"
            state="empty"
            icon="search"
            title="Ничего не найдено"
            message="Попробуйте изменить запрос или сбросить фильтры."
        >
            <template #action>
                <AppButton variant="secondary" @click="reset">Сбросить фильтры</AppButton>
            </template>
        </ListState>
        <ListState v-else-if="!tickets.length" state="empty">
            <template #action>
                <AppButton @click="isCreateOpen = true">Создать заявку</AppButton>
            </template>
        </ListState>
        <template v-else>
            <TicketList :tickets="tickets" />
            <AppPagination v-model="page" :total="total" :per-page="PER_PAGE" />
        </template>

        <CreateTicketModal
            v-model="isCreateOpen"
            :submitting="isCreating"
            :error="createError"
            @submit="onCreate"
        />
    </div>
</template>
