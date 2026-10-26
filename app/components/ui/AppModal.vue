<script setup lang="ts">
defineProps<{ title: string }>();
const open = defineModel<boolean>({ default: false });

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const dialog = ref<HTMLElement | null>(null);
const titleId = useId();
let lastFocused: HTMLElement | null = null;

function getFocusable() {
    return dialog.value ? [...dialog.value.querySelectorAll<HTMLElement>(FOCUSABLE)] : [];
}

watch(open, async (isOpen) => {
    if (isOpen) {
        lastFocused = document.activeElement as HTMLElement | null;
        document.body.style.overflow = 'hidden';
        await nextTick();
        const items = getFocusable();
        (items.find((el) => el.matches('input, select, textarea')) ?? items[0])?.focus();
    } else {
        document.body.style.overflow = '';
        lastFocused?.focus();
    }
});

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});

function close() {
    open.value = false;
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        close();
        return;
    }
    if (event.key !== 'Tab') return;

    const items = getFocusable();
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
    }
}
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="modal" @mousedown.self="close" @keydown="onKeydown">
            <div ref="dialog" class="modal__dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
                <header class="modal__header">
                    <h2 :id="titleId" class="modal__title">{{ title }}</h2>
                    <button type="button" class="modal__close" aria-label="Закрыть" @click="close">
                        <AppIcon name="x" />
                    </button>
                </header>
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    padding: 16px;
    background: rgba(10, 9, 30, 0.7);
}

.modal__dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: min(560px, 100%);
    max-height: calc(100vh - 32px);
    overflow-y: auto;
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
}

.modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.modal__title {
    font: 600 var(--text-lg);
}

.modal__close {
    display: inline-flex;
    padding: 6px;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-text-muted);
    cursor: pointer;
}

.modal__close:hover {
    color: var(--color-text);
    background: var(--color-surface-hover);
}

.modal__close:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}
</style>
