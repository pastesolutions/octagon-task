<script setup lang="ts">
import type { TicketComment } from '~/types/ticket';

const props = defineProps<{
    comments: TicketComment[];
    send: (text: string) => Promise<boolean>;
    error?: string;
}>();

const draft = ref('');
const sending = ref(false);

async function submit() {
    const text = draft.value.trim();
    if (!text || sending.value) return;
    sending.value = true;
    const sent = await props.send(text);
    sending.value = false;
    if (sent) draft.value = '';
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
            <p v-if="error" class="comments__error" role="alert">{{ error }}</p>
            <AppButton type="submit" :disabled="!draft.trim() || sending">{{ sending ? 'Отправляем…' : 'Отправить комментарий' }}</AppButton>
        </form>
    </section>
</template>

<style scoped>
.comments { display: flex; flex-direction: column; gap: 16px; margin: 0; padding: 0; list-style: none; }
.comment { display: flex; flex-direction: column; gap: 8px; }
.comment__meta { font: 600 var(--text-xs); color: var(--color-text-muted); }
.comment__text { font: 400 var(--text-sm); color: var(--color-text); }
.comments__empty { font-weight: 400; color: var(--color-text-muted); }
.comments__error { color: var(--color-error); }
.comments__form { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.comments__form > :first-child { align-self: stretch; }
</style>
