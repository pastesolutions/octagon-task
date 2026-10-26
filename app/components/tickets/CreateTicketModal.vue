<script setup lang="ts">
import type { NewTicket } from '~/composables/useTickets';
import type { TicketPriority } from '~/utils/mockData';
import { priorityOptions } from '~/utils/ticketMeta';

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ submit: [ticket: NewTicket] }>();

const title = ref('');
const client = ref('');
const priority = ref<string>('normal');
const description = ref('');
const submitted = ref(false);

const titleError = computed(() => (submitted.value && !title.value.trim() ? 'Укажите тему заявки.' : undefined));
const clientError = computed(() => (submitted.value && !client.value.trim() ? 'Укажите клиента.' : undefined));

function reset() {
    title.value = '';
    client.value = '';
    priority.value = 'normal';
    description.value = '';
    submitted.value = false;
}

watch(open, (isOpen) => {
    if (!isOpen) reset();
});

function submit() {
    submitted.value = true;
    if (titleError.value || clientError.value) return;

    emit('submit', {
        title: title.value.trim(),
        client: client.value.trim(),
        priority: priority.value as TicketPriority,
        description: description.value.trim(),
    });
    open.value = false;
}
</script>

<template>
    <AppModal v-model="open" title="Новая заявка">
        <form class="form" novalidate @submit.prevent="submit">
            <AppInput v-model="title" label="Тема" placeholder="Кратко опишите проблему" :error="titleError" />
            <AppInput v-model="client" label="Клиент" placeholder="Название компании" :error="clientError" />
            <AppSelect v-model="priority" label="Приоритет" :options="priorityOptions" />
            <AppTextarea v-model="description" label="Описание" placeholder="Что случилось и когда" />
            <div class="form__actions">
                <AppButton variant="secondary" @click="open = false">Отмена</AppButton>
                <AppButton type="submit">Создать заявку</AppButton>
            </div>
        </form>
    </AppModal>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
}
</style>
