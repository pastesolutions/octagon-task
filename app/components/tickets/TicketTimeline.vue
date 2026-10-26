<script setup lang="ts">
import type { TicketHistoryItem } from '~/utils/mockData';

defineProps<{ items: TicketHistoryItem[] }>();
</script>

<template>
    <section class="card">
        <h2 class="card__title">История заявки</h2>
        <ol class="timeline">
            <li v-for="item in items" :key="item.id" class="timeline__item">
                <time class="timeline__time">{{ item.time }}</time>
                <span>{{ item.author }}</span>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.timeline { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.timeline__item { display: flex; gap: 12px; font: 500 var(--text-xs); color: var(--color-text-muted); }
</style>
