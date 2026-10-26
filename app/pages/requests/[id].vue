<script setup lang="ts">
import type { TicketPriority } from '~/utils/mockData';
import { assigneeNames, priorityOptions } from '~/utils/ticketMeta';

definePageMeta({ key: (route) => route.fullPath });

const route = useRoute();
const { ticket, addComment, assign, setPriority } = useTicket(() => Number(route.params.id));

if (!ticket.value) {
    throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' });
}

useHead({ title: () => `#${ticket.value?.id} ${ticket.value?.title ?? ''}` });

const assignee = ref(ticket.value.assignee ?? '');
const priority = ref<string>(ticket.value.priority);
const assigned = ref(false);

const assigneeOptions = [
    { value: '', label: 'Не назначен' },
    ...assigneeNames.map((name) => ({ value: name, label: name })),
];

const canAssign = computed(() => Boolean(assignee.value) && assignee.value !== ticket.value?.assignee);

watch(priority, (value) => setPriority(value as TicketPriority));
watch(assignee, () => (assigned.value = false));

function onAssign() {
    assign(assignee.value);
    assigned.value = true;
}
</script>

<template>
    <div v-if="ticket" class="page">
        <div>
            <AppButton variant="ghost" to="/requests">← К списку заявок</AppButton>
        </div>

        <h1 class="page__title">{{ ticket.title }}</h1>
        <p class="page__subtitle">#{{ ticket.id }} · Создана {{ formatDate(ticket.createdAt) }}</p>

        <div class="ticket__badges">
            <StatusBadge :status="ticket.status" />
            <PriorityBadge :priority="ticket.priority" />
        </div>

        <div class="ticket__grid">
            <div class="ticket__main">
                <section class="card">
                    <h2 class="card__title">Описание проблемы</h2>
                    <p class="ticket__description">{{ ticket.description || 'Описание не заполнено.' }}</p>
                </section>

                <TicketComments :comments="ticket.comments" @add="addComment" />
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

                <AppSelect v-model="assignee" label="Исполнитель" :options="assigneeOptions" />
                <AppSelect v-model="priority" label="Приоритет" :options="priorityOptions" />

                <dl class="params">
                    <dt>Срок решения</dt>
                    <dd class="params__deadline">{{ formatDate(ticket.deadline) }}</dd>
                </dl>

                <AppButton :disabled="!canAssign" @click="onAssign">Назначить исполнителя</AppButton>
                <p v-if="assigned" class="params__done" role="status">Исполнитель назначен</p>
            </aside>
        </div>
    </div>
</template>

<style scoped>
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

@media (max-width: 767px) {
    .ticket__grid {
        grid-template-columns: 1fr;
    }
}
</style>
