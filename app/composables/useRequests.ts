import type {
    ApiComment,
    ApiCreateRequestBody,
    ApiRequestDetails,
    ApiRequestListQuery,
    ApiRequestListResponse,
    ApiRequestStats,
    ApiUpdateRequestBody,
} from '#shared/types/api';

export function useRequestList(query: MaybeRefOrGetter<ApiRequestListQuery>) {
    const { dictionaries } = useDictionaries();

    const { data, status, error, refresh } = useFetch<ApiRequestListResponse>('/api/requests', {
        query: computed(() => toValue(query)),
        lazy: true,
        dedupe: 'cancel',
    });

    const tickets = computed(() => (data.value?.items ?? []).map((item) => toTicket(item, dictionaries.value)));
    const total = computed(() => data.value?.total ?? 0);
    let lastStats: ApiRequestStats | undefined;
    const stats = computed(() => {
        if (data.value) lastStats = data.value.stats;
        return lastStats;
    });
    const isLoading = computed(() => status.value === 'pending' || status.value === 'idle');
    const errorInfo = computed(() => (error.value ? toApiErrorInfo(error.value) : null));
    const hasIncomplete = computed(() => tickets.value.some((ticket) => ticket.isIncomplete));

    return { tickets, total, stats, isLoading, errorInfo, hasIncomplete, refresh };
}

export function useRequestDetails(id: MaybeRefOrGetter<number>, scenario?: MaybeRefOrGetter<string | undefined>) {
    const { dictionaries } = useDictionaries();

    const request = useFetch<ApiRequestDetails>(() => `/api/requests/${toValue(id)}`, {
        query: computed(() => ({ scenario: toValue(scenario) })),
        lazy: true,
    });
    const { data, status, error, refresh } = request;

    const ticket = computed(() => (data.value ? toTicketDetails(data.value, dictionaries.value) : null));
    const isLoading = computed(() => status.value === 'pending' || status.value === 'idle');
    const errorInfo = computed(() => (error.value ? toApiErrorInfo(error.value) : null));

    async function addComment(text: string) {
        const comment = await $fetch<ApiComment>(`/api/requests/${toValue(id)}/comments`, {
            method: 'POST',
            body: { text },
        });
        if (data.value) data.value = { ...data.value, comments: [...data.value.comments, comment] };
    }

    async function update(body: ApiUpdateRequestBody) {
        data.value = await $fetch<ApiRequestDetails>(`/api/requests/${toValue(id)}`, {
            method: 'PATCH',
            body,
        });
    }

    return { request, ticket, isLoading, errorInfo, refresh, addComment, update };
}

export function createRequest(body: ApiCreateRequestBody) {
    return $fetch<ApiRequestDetails>('/api/requests', { method: 'POST', body });
}
