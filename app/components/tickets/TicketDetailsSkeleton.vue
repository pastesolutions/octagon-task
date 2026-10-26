<script setup lang="ts">
const mainBlocks = [2, 6, 2];
</script>

<template>
    <div class="skeleton" role="status" aria-busy="true">
        <p class="skeleton__text">Загружаем заявку…</p>
        <div class="skeleton__grid" aria-hidden="true">
            <div class="skeleton__main">
                <div v-for="(rows, index) in mainBlocks" :key="index" class="card">
                    <span class="skeleton__bar skeleton__bar--short" />
                    <span v-for="n in rows" :key="n" class="skeleton__bar" />
                </div>
            </div>
            <div class="card">
                <span class="skeleton__bar skeleton__bar--short" />
                <span v-for="n in 8" :key="n" class="skeleton__bar" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.skeleton {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.skeleton__text {
    font-weight: 400;
    color: var(--color-text-muted);
}

.skeleton__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    align-items: start;
    gap: 24px;
}

.skeleton__main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.skeleton__bar {
    display: block;
    height: 32px;
    border-radius: var(--radius-sm);
    background: var(--color-surface-hover);
    animation: pulse 1.2s ease-in-out infinite;
}

.skeleton__bar--short {
    width: min(200px, 100%);
}

@keyframes pulse {
    50% { opacity: 0.5; }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton__bar { animation: none; }
}

@media (max-width: 767px) {
    .skeleton__grid {
        grid-template-columns: 1fr;
    }
}
</style>
