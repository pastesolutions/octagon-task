<script setup lang="ts">
import type { IconName } from './AppIcon.vue';

const props = withDefaults(
    defineProps<{
        state: 'loading' | 'empty' | 'error';
        title?: string;
        message?: string;
        icon?: IconName;
        retrying?: boolean;
        retryAfter?: number;
    }>(),
    { icon: 'inbox-empty' },
);
defineEmits<{ retry: [] }>();

const secondsLeft = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function stopCountdown() {
    clearInterval(timer);
    timer = undefined;
}

watch(() => props.retryAfter, (seconds) => {
    stopCountdown();
    secondsLeft.value = seconds ?? 0;
    if (!seconds || import.meta.server) return;
    timer = setInterval(() => {
        secondsLeft.value -= 1;
        if (secondsLeft.value <= 0) stopCountdown();
    }, 1000);
}, { immediate: true });

onBeforeUnmount(stopCountdown);

const retryLabel = computed(() => {
    if (props.retrying) return 'Загружаем…';
    if (secondsLeft.value > 0) return `Повторить через ${secondsLeft.value} с`;
    return 'Повторить загрузку';
});
</script>

<template>
    <div v-if="state === 'loading'" class="state" role="status" aria-busy="true">
        <p class="state__text">Загружаем заявки…</p>
        <div v-for="n in 6" :key="n" class="state__skeleton" aria-hidden="true" />
    </div>

    <div v-else-if="state === 'empty'" class="state" role="status">
        <AppIcon :name="icon" />
        <h3 class="state__title">{{ title ?? 'Заявок пока нет' }}</h3>
        <p class="state__text">{{ message ?? 'Обращения появятся здесь после создания.' }}</p>
        <slot name="action" />
    </div>

    <div v-else class="state" role="alert">
        <AppIcon name="alert" />
        <h3 class="state__title">{{ title ?? 'Не удалось загрузить заявки' }}</h3>
        <p class="state__text">{{ message ?? 'Сервис временно недоступен. Попробуйте ещё раз.' }}</p>
        <AppButton :disabled="retrying || secondsLeft > 0" @click="$emit('retry')">{{ retryLabel }}</AppButton>
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
