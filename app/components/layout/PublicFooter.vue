<template>
    <footer class="footer">
        <span>WorkFlow © 2026</span>
        <NuxtLink to="/#features" class="footer__link">Помощь · FAQ</NuxtLink>
    </footer>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 24px;
    background: var(--color-bg-footer);
    font: 500 var(--text-xs);
    color: var(--color-text-muted);
}

.footer__link {
    color: var(--color-link);
    text-decoration: none;
    border-radius: var(--radius-sm);
}

.footer__link:hover {
    text-decoration: underline;
}

.footer__link:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

@media (max-width: 1279px) {
    .footer {
        flex-direction: column;
    }
}
</style>
