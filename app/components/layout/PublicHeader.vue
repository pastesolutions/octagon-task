<script setup lang="ts">
const links = [
    { to: '/', label: 'Главная' },
    { to: '/#how', label: 'Статьи' },
    { to: '/#features', label: 'Помощь' },
    { to: '/#features', label: 'FAQ' },
];

const menuOpen = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => (menuOpen.value = false));
</script>

<template>
    <header class="header" @keydown.esc="menuOpen = false">
        <NuxtLink to="/" class="header__logo">WorkFlow</NuxtLink>
        <nav id="public-nav" class="header__nav" :class="{ 'is-open': menuOpen }" aria-label="Основное меню">
            <NuxtLink v-for="link in links" :key="link.label" :to="link.to" class="nav-link header__link">{{ link.label }}</NuxtLink>
        </nav>
        <AppButton variant="secondary" to="/login">Войти</AppButton>
        <button
            class="icon-button header__burger"
            type="button"
            :aria-expanded="menuOpen"
            aria-controls="public-nav"
            aria-label="Меню"
            @click="menuOpen = !menuOpen"
        >
            <AppIcon :name="menuOpen ? 'x' : 'menu'" />
        </button>
    </header>
</template>

<style scoped>
.header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px var(--gutter);
}

.header__logo {
    flex: 1;
    font: 600 var(--text-lg);
    color: #ffffff;
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.header__logo:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.header__nav {
    display: flex;
    gap: 24px;
}

.header__link {
    font-weight: 400;
}

.header__link.router-link-active:not(:hover) {
    color: var(--color-text);
}

.header__burger {
    display: none;
}

@media (max-width: 767px) {
    .header__burger {
        display: inline-flex;
    }

    .header__nav {
        display: none;
        position: absolute;
        inset: 100% 0 auto;
        z-index: 10;
        flex-direction: column;
        align-items: flex-start;
        padding: 16px var(--gutter);
        border-bottom: 1px solid var(--color-border);
        background: var(--color-bg);
    }

    .header__nav.is-open {
        display: flex;
    }
}
</style>
