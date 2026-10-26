<script setup lang="ts">
defineProps<{ state: 'loading' | 'empty' | 'error'; title?: string; message?: string }>();
defineEmits<{ retry: [] }>();
</script>

<template>
    <div v-if="state === 'loading'" class="state" role="status" aria-busy="true">
        <p class="state__text">Загружаем заявки…</p>
        <div v-for="n in 6" :key="n" class="state__skeleton" aria-hidden="true" />
    </div>

    <div v-else-if="state === 'empty'" class="state" role="status">
        <AppIcon name="inbox-empty" />
        <h3 class="state__title">{{ title ?? 'Заявок пока нет' }}</h3>
        <p class="state__text">{{ message ?? 'Обращения появятся здесь после создания.' }}</p>
        <slot name="action" />
    </div>

    <div v-else class="state" role="alert">
        <AppIcon name="alert" />
        <h3 class="state__title">{{ title ?? 'Не удалось загрузить заявки' }}</h3>
        <p class="state__text">{{ message ?? 'Сервис временно недоступен. Попробуйте ещё раз.' }}</p>
        <AppButton @click="$emit('retry')">Повторить загрузку</AppButton>
    </div>
</template>

<style scoped>
.state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text-muted);
    text-align: center;
}

.state__title {
    font: 600 var(--text-lg);
    color: var(--color-text);
}

.state__text {
    font: 400 var(--text-sm);
}

.state__skeleton {
    align-self: stretch;
    height: 52px;
    border-radius: var(--radius-sm);
    background: var(--color-surface-hover);
    animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
    50% { opacity: 0.5; }
}

@media (prefers-reduced-motion: reduce) {
    .state__skeleton { animation: none; }
}
</style>
