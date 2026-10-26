<template>
    <div class="public">
        <a href="#main" class="skip-link">Перейти к содержимому</a>
        <PublicHeader />
        <main id="main" tabindex="-1" class="public__content">
            <slot />
        </main>
        <PublicFooter />
    </div>
</template>

<style scoped>
.public {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.public__content {
    flex: 1;
}
</style>