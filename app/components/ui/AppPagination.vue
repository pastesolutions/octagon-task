<script setup lang="ts">
const props = defineProps<{ total: number; perPage: number }>();
const page = defineModel<number>({ default: 1 });

const pages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)));
const from = computed(() => (props.total ? (page.value - 1) * props.perPage + 1 : 0));
const to = computed(() => Math.min(page.value * props.perPage, props.total));
</script>

<template>
    <nav class="pagination" aria-label="Страницы списка">
        <span class="pagination__info" aria-live="polite">Показано {{ from }}–{{ to }} из {{ total }}</span>
        <div class="pagination__buttons">
            <AppButton variant="secondary" :disabled="page <= 1" @click="page--">Назад</AppButton>
            <AppButton
                v-for="n in pages"
                :key="n"
                :variant="n === page ? 'secondary' : 'ghost'"
                :aria-current="n === page ? 'page' : undefined"
                :aria-label="`Страница ${n}`"
                @click="page = n"
            >
                {{ n }}
            </AppButton>
            <AppButton variant="secondary" :disabled="page >= pages" @click="page++">Далее</AppButton>
        </div>
    </nav>
</template>

<style scoped>
.pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}

.pagination__info {
    flex: 1;
    font: 500 var(--text-xs);
    color: var(--color-text-muted);
}

.pagination__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
</style>
