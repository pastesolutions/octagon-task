import type { ApiCategory, ApiCustomer, ApiUser } from '#shared/types/api';

export function useDictionaries() {
    const { data } = useAsyncData(
        'dictionaries',
        async () => {
            const [users, customers, categories] = await Promise.all([
                $fetch<ApiUser[]>('/api/users'),
                $fetch<ApiCustomer[]>('/api/customers'),
                $fetch<ApiCategory[]>('/api/categories'),
            ]);
            return { users, customers, categories };
        },
        {
            default: () => ({ users: [], customers: [], categories: [] }),
            getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
        },
    );

    const dictionaries = computed(() =>
        toDictionaries(data.value.users, data.value.customers, data.value.categories),
    );
    const executors = computed(() => data.value.users.filter((user) => user.role === 'executor'));
    const customers = computed(() => data.value.customers);

    return { dictionaries, executors, customers };
}
