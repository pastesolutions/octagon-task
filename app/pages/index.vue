<script setup lang="ts">
definePageMeta({ layout: 'public' });
useHead({ title: 'Поддержка без потерь' });

const steps = ['Создайте заявку', 'Назначьте исполнителя', 'Подтвердите решение'];

const features = [
    { title: 'Все обращения рядом', text: 'Статусы, приоритеты и история общения.' },
    { title: 'Понятная ответственность', text: 'У каждой заявки есть исполнитель.' },
    { title: 'Контроль сроков', text: 'Сроки реакции и решения всегда видны.' },
];
</script>

<template>
    <div>
        <section class="hero">
            <div class="container hero__inner">
                <div class="hero__main">
                    <div class="hero__text">
                        <p class="hero__eyebrow">ЗАЯВКИ · КОМАНДА · РЕЗУЛЬТАТ</p>
                        <h1 class="hero__title">Поддержка, в которой<br>ничего не теряется</h1>
                        <p class="hero__lead">
                            От первого обращения до решения — управляйте заявками, назначайте исполнителей
                            и держите сроки под контролем.
                        </p>
                        <div>
                            <AppButton class="mobile-full" to="/login">Начать работу</AppButton>
                        </div>
                    </div>
                    <img class="hero__image" src="/images/hero.png" alt="" width="460" height="460">
                </div>

                <ol id="how" class="tiles" aria-label="Как это работает">
                    <li v-for="(step, index) in steps" :key="step" class="card tiles__title">
                        {{ String(index + 1).padStart(2, '0') }}&nbsp;&nbsp;{{ step }}
                    </li>
                </ol>
            </div>
        </section>

        <section id="features" class="features" aria-labelledby="features-title">
            <div class="container features__inner">
                <h2 id="features-title" class="page__title">Одна система для всей команды</h2>
                <ul class="tiles">
                    <li v-for="feature in features" :key="feature.title" class="card">
                        <h3 class="tiles__title">{{ feature.title }}</h3>
                        <p class="features__text">{{ feature.text }}</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<style scoped>
.hero {
    padding: 64px 0;
    background: var(--color-bg);
}

.features {
    padding: 64px 0;
}

.hero__inner,
.features__inner {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.hero__main {
    display: flex;
    align-items: center;
    gap: 24px;
}

.hero__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;
}

.hero__eyebrow {
    font: 600 var(--text-xs);
    color: var(--color-text-soft);
}

.hero__title {
    font: 700 52px / 1.2 var(--font-base);
    color: #ffffff;
}

.hero__lead {
    font-weight: 400;
    color: var(--color-text-soft);
}

.hero__image {
    flex-shrink: 0;
    width: 460px;
    max-width: 100%;
    height: auto;
    margin-left: auto;
}

.tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.tiles__title {
    font: 600 var(--text-md);
}

.features__text {
    font-weight: 400;
    color: var(--color-text-muted);
}

@media (max-width: 1279px) {
    .hero__main {
        flex-direction: column;
        align-items: flex-start;
    }

    .hero__text {
        max-width: none;
    }

    .hero__title {
        font-size: 40px;
    }

    .hero__image {
        margin-left: 0;
    }

    .tiles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .hero__title {
        font-size: 32px;
    }

    .hero__image {
        width: 100%;
    }

    .tiles {
        grid-template-columns: 1fr;
    }
}
</style>
