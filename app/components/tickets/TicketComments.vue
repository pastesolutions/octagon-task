<script setup lang="ts">
import type { TicketComment } from '~/utils/mockData';

defineProps<{ comments: TicketComment[] }>();
const emit = defineEmits<{ add: [text: string] }>();

const draft = ref('');

function submit() {
    if (!draft.value.trim()) return;
    emit('add', draft.value.trim());
    draft.value = '';
}
</script>

<template>
    <section class="card">
        <h2 class="card__title">Комментарии · {{ comments.length }}</h2>
        <p v-if="!comments.length" class="comments__empty">Комментариев пока нет.</p>
        <ul v-else class="comments">
            <li v-for="comment in comments" :key="comment.id" class="comment">
                <p class="comment__meta">{{ comment.author }} · {{ comment.time }}</p>
                <p class="comment__text">{{ comment.text }}</p>
            </li>
        </ul>
        <form class="comments__form" @submit.prevent="submit">
            <AppTextarea v-model="draft" label="Ваш комментарий" placeholder="Напишите сообщение…" />
            <AppButton type="submit" :disabled="!draft.trim()">Отправить комментарий</AppButton>
        </form>
    </section>
</template>

<style scoped>
.comments { display: flex; flex-direction: column; gap: 16px; margin: 0; padding: 0; list-style: none; }
.comment { display: flex; flex-direction: column; gap: 8px; }
.comment__meta { font: 600 var(--text-xs); color: var(--color-text-muted); }
.comment__text { font: 400 var(--text-sm); color: var(--color-text); }
.comments__empty { font-weight: 400; color: var(--color-text-muted); }
.comments__form { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.comments__form > :first-child { align-self: stretch; }
</style>
