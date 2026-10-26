import { API_SCENARIOS } from '#shared/types/api';

export function useApiScenario() {
    const route = useRoute();
    const router = useRouter();

    const scenario = computed(() => {
        const value = route.query.scenario;
        return isOneOf(value, API_SCENARIOS) ? value : undefined;
    });

    function clearScenario() {
        const { scenario: _removed, ...query } = route.query;
        return router.replace({ query });
    }

    return { scenario, clearScenario };
}
