<script setup lang="ts">
useHead({ title: 'Профиль' });

const name = ref('Анна Кузнецова');
const email = ref('anna@mail.demo');
const density = useListDensity();
const saved = ref(false);
const submitted = ref(false);

const nameError = computed(() => (submitted.value && !name.value.trim() ? 'Укажите имя.' : undefined));
const emailError = computed(() =>
    submitted.value && !isEmail(email.value) ? 'Введите корректный адрес электронной почты.' : undefined,
);

const densityOptions = [
    { value: 'comfortable', label: 'Комфортная' },
    { value: 'compact', label: 'Компактная' },
];

watch([name, email], () => {
    saved.value = false;
});

function save() {
    submitted.value = true;
    saved.value = !nameError.value && !emailError.value;
}
</script>

<template>
    <div class="page">
        <h1 class="page__title">Профиль</h1>
        <p class="page__subtitle">Ваши данные и настройки интерфейса</p>

        <form class="card" novalidate aria-label="Данные профиля" @submit.prevent="save">
            <AppAvatar :name="name || '?'" />
            <div class="profile__fields">
                <AppInput v-model="name" label="Имя" :error="nameError" />
                <AppInput v-model="email" type="email" label="Электронная почта" :error="emailError" />
            </div>
            <p class="profile__role">Роль: оператор</p>
            <div class="profile__actions">
                <AppButton class="mobile-full" type="submit" >Сохранить изменения</AppButton>
                <p v-if="saved" class="profile__saved" role="status">Изменения сохранены</p>
            </div>
        </form>

        <section class="card">
            <h2 class="card__title">Настройки интерфейса</h2>
            <div class="profile__fields">
                <AppSelect v-model="density" label="Плотность списка" :options="densityOptions" />
            </div>
        </section>

        <div>
            <AppButton class="mobile-full" variant="secondary" to="/login">Выйти из аккаунта</AppButton>
        </div>
    </div>
</template>

<style scoped>
.profile__fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 480px;
}

.profile__role {
    font-weight: 400;
    color: var(--color-text-muted);
}

.profile__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
}

.profile__saved {
    color: var(--status-resolved);
}
</style>
