<script setup lang="ts">
import { API_PRIORITIES } from '#shared/types/api';
import { priorityOptions } from '~/utils/ticketMeta';

definePageMeta({ key: (route) => route.fullPath });

const route = useRoute();
const { scenario, clearScenario } = useApiScenario();
const id = computed(() => Number(route.params.id));

const { request, ticket, isLoading, errorInfo, refresh, addComment, update } = useRequestDetails(id, scenario);
const { executors } = useDictionaries();

if (import.meta.server) {
    await request;
    if (errorInfo.value?.statusCode === 404) {
        throw createError({ statusCode: 404, message: 'Заявка не найдена' });
    }
}

watch(errorInfo, (info) => {
    if (info?.statusCode === 404) showError({ statusCode: 404, message: 'Заявка не найдена' });
});

useHead({ title: () => (ticket.value ? `#${ticket.value.id} ${ticket.value.title}` : 'Заявка') });

const assigneeId = ref('');
const priority = ref('');
const paramsMessage = ref<string>();
const paramsError = ref<string>();
const commentError = ref<string>();
const isSaving = ref(false);

watch(ticket, (value) => {
    if (!value) return;
    assigneeId.value = value.assigneeId ? String(value.assigneeId) : '';
    priority.value = value.priority;
}, { immediate: true });

const assigneeOptions = computed(() => [
    { value: '', label: 'Не назначен' },
    ...executors.value.map((user) => ({ value: String(user.id), label: user.shortName })),
]);

const canAssign = computed(() =>
    Boolean(assigneeId.value) && Number(assigneeId.value) !== ticket.value?.assigneeId && !isSaving.value,
);

async function saveParams(body: Parameters<typeof update>[0], success?: string) {
    isSaving.value = true;
    paramsError.value = undefined;
    paramsMessage.value = undefined;
    try {
        await update(body);
        paramsMessage.value = success;
    } catch (error) {
        paramsError.value = toApiErrorInfo(error).message;
        if (ticket.value) priority.value = ticket.value.priority;
    } finally {
        isSaving.value = false;
    }
}

function onAssign() {
    return saveParams({ assigneeId: Number(assigneeId.value) }, 'Исполнитель назначен');
}

function onPriorityChange(value: string) {
    if (!isOneOf(value, API_PRIORITIES) || value === ticket.value?.priority) return;
    return saveParams({ priority: value });
}

async function sendComment(text: string): Promise<boolean> {
    commentError.value = undefined;
    try {
        await addComment(text);
        return true;
    } catch (error) {
        commentError.value = toApiErrorInfo(error).message;
        return false;
    }
}

function retry() {
    if (scenario.value) clearScenario();
    else refresh();
}
</script>

<template>
    <div class="page">
        <div>
            <AppButton variant="ghost" to="/requests">← К списку заявок</AppButton>
        </div>

        <ListState
            v-if="errorInfo && errorInfo.statusCode !== 404"
            state="error"
            title="Не удалось загрузить заявку"
            :message="errorInfo.message"
            :retry-after="errorInfo.retryAfter"
            :retrying="isLoading"
            @retry="retry"
        />

        <TicketDetailsSkeleton v-else-if="isLoading || !ticket" />

        <template v-else>
            <h1 class="page__title ticket__title">{{ ticket.title }}</h1>
            <p class="page__subtitle">#{{ ticket.id }} · Создана {{ formatDate(ticket.createdAt) }}</p>

            <div class="ticket__badges">
                <StatusBadge :status="ticket.status" />
                <PriorityBadge :priority="ticket.priority" />
            </div>

            <div class="ticket__grid">
                <div class="ticket__main">
                    <section class="card">
                        <h2 class="card__title">Описание проблемы</h2>
                        <p class="ticket__description">{{ ticket.description }}</p>
                    </section>

                    <TicketComments :comments="ticket.comments" :send="sendComment" :error="commentError" />
                    <TicketTimeline v-if="ticket.history.length" :items="ticket.history" />
                </div>

                <aside class="card" aria-labelledby="params-title">
                    <h2 id="params-title" class="card__title">Параметры</h2>

                    <dl class="params">
                        <dt>Клиент</dt>
                        <dd>{{ ticket.client }}</dd>
                        <dt>Категория</dt>
                        <dd>{{ ticket.category }}</dd>
                    </dl>

                    <AppSelect v-model="assigneeId" label="Исполнитель" :options="assigneeOptions" />
                    <AppSelect
                        v-model="priority"
                        label="Приоритет"
                        :options="priorityOptions"
                        :disabled="isSaving"
                        @update:model-value="onPriorityChange"
                    />

                    <dl class="params">
                        <dt>Срок решения</dt>
                        <dd class="params__deadline">{{ formatDate(ticket.deadline) }}</dd>
                    </dl>

                    <AppButton :disabled="!canAssign" @click="onAssign">Назначить исполнителя</AppButton>
                    <p v-if="paramsMessage" class="params__done" role="status">{{ paramsMessage }}</p>
                    <p v-if="paramsError" class="params__error" role="alert">{{ paramsError }}</p>
                </aside>
            </div>
        </template>
    </div>
</template>

<style scoped>
.ticket__title,
.ticket__description,
.params dd {
    overflow-wrap: anywhere;
}

.ticket__badges {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ticket__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    align-items: start;
    gap: 24px;
}

.ticket__main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.ticket__description {
    font-weight: 400;
}

.params {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0;
}

.params dt {
    font: 600 var(--text-xs);
    color: var(--color-text-muted);
}

.params dd {
    margin: 0;
}

.params__deadline {
    color: var(--color-link);
}

.params__done {
    color: var(--status-resolved);
}

.params__error {
    color: var(--color-error);
}

@media (max-width: 767px) {
    .ticket__grid {
        grid-template-columns: 1fr;
    }
}
</style>
