<script setup lang="ts">
const links = [
    { to: '/dashboard', label: 'Обзор' },
    { to: '/requests', label: 'Заявки' },
];

const menuOpen = ref(false);
const route = useRoute();
watch(() => route.path, () => (menuOpen.value = false));
</script>

<template>
    <header class="topbar" @keydown.esc="menuOpen = false">
        <NuxtLink to="/dashboard" class="topbar__logo">WorkFlow</NuxtLink>

        <nav id="app-nav" class="topbar__nav" :class="{ 'is-open': menuOpen }" aria-label="Разделы">
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">{{ link.label }}</NuxtLink>
        </nav>

        <button type="button" class="icon-button" aria-label="Уведомления">
            <AppIcon name="bell" />
        </button>
        <NuxtLink to="/profile" class="topbar__profile" aria-label="Профиль">
            <AppAvatar name="Анна Кузнецова" />
            <span class="topbar__role">Оператор</span>
        </NuxtLink>

        <button
            class="icon-button topbar__burger"
            type="button"
            :aria-expanded="menuOpen"
            aria-controls="app-nav"
            aria-label="Меню"
            @click="menuOpen = !menuOpen"
        >
            <AppIcon :name="menuOpen ? 'x' : 'menu'" />
        </button>
    </header>
</template>

<style scoped>
.topbar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px var(--gutter);
}

.topbar__logo {
    flex: 1;
    font: 500 var(--text-sm);
    color: var(--color-text);
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.topbar__nav {
    display: flex;
    gap: 16px;
}

.topbar__profile {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-muted);
    font: 500 var(--text-xs);
    text-decoration: none;
    border-radius: var(--radius-full);
}

.topbar__logo:focus-visible,
.topbar__profile:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.topbar__burger {
    display: none;
}

@media (max-width: 1279px) {
    .topbar__role {
        display: none;
    }
}

@media (max-width: 767px) {
    .topbar__burger {
        display: inline-flex;
    }

    .topbar__nav {
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

    .topbar__nav.is-open {
        display: flex;
    }
}
</style>
