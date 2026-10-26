<template>
    <div class="auth">
        <header class="auth__header">
            <NuxtLink to="/" class="auth__logo">WorkFlow</NuxtLink>
        </header>
        <main id="main" class="auth__content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.auth {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.auth__header {
    padding: 24px;
}

.auth__logo {
    font: 600 var(--text-lg);
    color: #ffffff;
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.auth__logo:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.auth__content {
    display: flex;
    flex: 1;
    justify-content: center;
    padding: 64px var(--gutter);
}
</style>
