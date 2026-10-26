<template>
    <div class="app">
        <a href="#main" class="skip-link">Перейти к содержимому</a>
        <AppTopbar />
        <main id="main" tabindex="-1" class="container app__content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.app {
    min-height: 100vh;
}

.app__content {
    padding-top: 24px;
    padding-bottom: 24px;
}
</style>