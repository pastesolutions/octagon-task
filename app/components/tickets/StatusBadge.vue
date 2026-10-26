<script setup lang="ts">
import type { TicketStatus } from '~/types/ticket';
import { statusLabels } from '~/utils/ticketMeta';

const props = defineProps<{ status: TicketStatus }>();
const tone = computed(() => props.status.replace('_', '-'));
</script>

<template>
    <AppBadge :color="`var(--status-${tone})`" :background="`var(--status-${tone}-bg)`">
        {{ statusLabels[status] }}
    </AppBadge>
</template>
