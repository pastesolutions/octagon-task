<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();
const isNotFound = computed(() => props.error.statusCode === 404);

useHead({ title: () => (isNotFound.value ? 'Страница не найдена' : 'Ошибка') });
</script>

<template>
    <main class="error">
        <div class="error__content">
            <p class="error__code">{{ error.statusCode }}</p>
            <h1 class="page__title">{{ isNotFound ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
            <p class="page__subtitle">
                {{ isNotFound ? 'Проверьте адрес или вернитесь к заявкам.' : 'Попробуйте обновить страницу или вернитесь к заявкам.' }}
            </p>
            <AppButton @click="clearError({ redirect: '/requests' })">Вернуться к заявкам</AppButton>
        </div>
    </main>
</template>

<style scoped>
.error {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: var(--gutter);
}

.error__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: min(720px, 100%);
    padding: 64px;
    text-align: center;
}

.error__code {
    font: 700 var(--text-2xl);
    color: var(--color-link);
}

@media (max-width: 767px) {
    .error__content {
        padding: 32px 0;
    }
}
</style>
