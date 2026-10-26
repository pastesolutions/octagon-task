<script setup lang="ts">
import { API_PRIORITIES, type ApiCreateRequestBody } from '#shared/types/api';
import { priorityOptions } from '~/utils/ticketMeta';

const open = defineModel<boolean>({ default: false });
const props = defineProps<{ submitting?: boolean; error?: string }>();
const emit = defineEmits<{ submit: [body: ApiCreateRequestBody] }>();

const { customers } = useDictionaries();

const title = ref('');
const customerId = ref('');
const priority = ref('normal');
const description = ref('');
const submitted = ref(false);

const customerOptions = computed(() => [
    { value: '', label: 'Выберите клиента' },
    ...customers.value.map((customer) => ({ value: String(customer.id), label: customer.name })),
]);

const titleError = computed(() => (submitted.value && !title.value.trim() ? 'Укажите тему заявки.' : undefined));
const customerError = computed(() => (submitted.value && !customerId.value ? 'Выберите клиента.' : undefined));

function reset() {
    title.value = '';
    customerId.value = '';
    priority.value = 'normal';
    description.value = '';
    submitted.value = false;
}

watch(open, (isOpen) => {
    if (!isOpen) reset();
});

function submit() {
    submitted.value = true;
    if (titleError.value || customerError.value || props.submitting) return;

    emit('submit', {
        title: title.value.trim(),
        customerId: Number(customerId.value),
        priority: isOneOf(priority.value, API_PRIORITIES) ? priority.value : 'normal',
        description: description.value.trim() || undefined,
    });
}
</script>

<template>
    <AppModal v-model="open" title="Новая заявка">
        <form class="form" novalidate @submit.prevent="submit">
            <AppInput v-model="title" label="Тема" placeholder="Кратко опишите проблему" :error="titleError" />
            <AppSelect v-model="customerId" label="Клиент" :options="customerOptions" :error="customerError" />
            <AppSelect v-model="priority" label="Приоритет" :options="priorityOptions" />
            <AppTextarea v-model="description" label="Описание" placeholder="Что случилось и когда" />
            <p v-if="error" class="form__error" role="alert">{{ error }}</p>
            <div class="form__actions">
                <AppButton variant="secondary" @click="open = false">Отмена</AppButton>
                <AppButton type="submit" :disabled="submitting">{{ submitting ? 'Создаём…' : 'Создать заявку' }}</AppButton>
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

.form__error {
    color: var(--color-error);
}

.form__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
}
</style>
