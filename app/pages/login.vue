<script setup lang="ts">
definePageMeta({ layout: 'auth' });
useHead({ title: 'Вход' });

const email = ref('');
const password = ref('');
const submitted = ref(false);

const emailError = computed(() => {
    if (!submitted.value) return undefined;
    return isEmail(email.value) ? undefined : 'Введите корректный адрес электронной почты.';
});

const passwordError = computed(() => (submitted.value && !password.value ? 'Введите пароль.' : undefined));

async function submit() {
    submitted.value = true;
    if (emailError.value || passwordError.value) return;
    await navigateTo('/dashboard');
}
</script>

<template>
    <form class="card login" novalidate @submit.prevent="submit">
        <h1 class="page__title">С возвращением</h1>
        <p class="page__subtitle">Войдите для работы с заявками</p>

        <AppInput v-model="email" type="email" label="Электронная почта" placeholder="0000@mail.demo" :error="emailError" />
        <AppInput v-model="password" type="password" label="Пароль" placeholder="••••••••" :error="passwordError" />

        <div>
            <AppButton class="mobile-full" type="submit">Войти</AppButton>
        </div>

        <NuxtLink to="/" class="login__link">Нет аккаунта? Зарегистрироваться</NuxtLink>
    </form>
</template>

<style scoped>
.login {
    align-self: flex-start;
    width: min(440px, 100%);
}

.login__link {
    align-self: flex-start;
    font: 500 var(--text-xs);
    color: var(--color-link);
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.login__link:hover {
    text-decoration: underline;
}

.login__link:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}
</style>
