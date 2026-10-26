import type { LocationQuery, LocationQueryValue } from 'vue-router';
import {
    API_ASSIGNMENTS,
    API_PRIORITIES,
    API_SORTS,
    API_STATUSES,
    type ApiAssignmentFilter,
    type ApiRequestPriority,
    type ApiRequestSort,
    type ApiRequestStatus,
} from '#shared/types/api';

export interface RequestFilters {
    q: string;
    status?: ApiRequestStatus;
    priority?: ApiRequestPriority;
    assignment?: ApiAssignmentFilter;
    sort: ApiRequestSort;
    page: number;
}

const SEARCH_DELAY_MS = 400;

function readString(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
    if (Array.isArray(value)) return value[0] ?? '';
    return value ?? '';
}

function readFilters(query: LocationQuery): RequestFilters {
    const status = readString(query.status);
    const priority = readString(query.priority);
    const assignment = readString(query.assignment);
    const sort = readString(query.sort);
    const page = Number(readString(query.page));

    return {
        q: readString(query.q).trim(),
        status: isOneOf(status, API_STATUSES) ? status : undefined,
        priority: isOneOf(priority, API_PRIORITIES) ? priority : undefined,
        assignment: isOneOf(assignment, API_ASSIGNMENTS) ? assignment : undefined,
        sort: isOneOf(sort, API_SORTS) ? sort : 'newest',
        page: Number.isInteger(page) && page > 0 ? page : 1,
    };
}

function toQuery(filters: RequestFilters, scenario: string | undefined): LocationQuery {
    const query: LocationQuery = {};
    if (filters.q) query.q = filters.q;
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.assignment) query.assignment = filters.assignment;
    if (filters.sort !== 'newest') query.sort = filters.sort;
    if (filters.page > 1) query.page = String(filters.page);
    if (scenario) query.scenario = scenario;
    return query;
}

export function useRequestFilters() {
    const route = useRoute();
    const router = useRouter();
    const { scenario, clearScenario } = useApiScenario();

    const filters = computed(() => readFilters(route.query));

    function apply(patch: Partial<RequestFilters>, resetPage = true) {
        const next = { ...filters.value, ...(resetPage ? { page: 1 } : {}), ...patch };
        return router.replace({ query: toQuery(next, scenario.value) });
    }

    function selectModel<T extends string>(key: 'status' | 'priority' | 'assignment', allowed: readonly T[]) {
        return computed({
            get: () => filters.value[key] ?? '',
            set: (value: string) => apply({ [key]: isOneOf(value, allowed) ? value : undefined }),
        });
    }

    const status = selectModel('status', API_STATUSES);
    const priority = selectModel('priority', API_PRIORITIES);
    const assignment = selectModel('assignment', API_ASSIGNMENTS);
    const sort = computed({
        get: () => filters.value.sort,
        set: (value: string) => apply({ sort: isOneOf(value, API_SORTS) ? value : 'newest' }),
    });
    const page = computed({
        get: () => filters.value.page,
        set: (value: number) => apply({ page: value }, false),
    });

    const search = ref(filters.value.q);
    const debouncedSearch = useDebounce(search, SEARCH_DELAY_MS);

    let appliedFromInput: string | null = null;

    watch(debouncedSearch, (value) => {
        const q = value.trim();
        if (q === filters.value.q) return;
        appliedFromInput = q;
        apply({ q });
    });

    watch(() => filters.value.q, (q) => {
        if (q === appliedFromInput) {
            appliedFromInput = null;
            return;
        }
        if (q !== search.value.trim()) search.value = q;
    });

    const hasActiveFilters = computed(() => {
        const { q, status, priority, assignment } = filters.value;
        return Boolean(q || status || priority || assignment);
    });

    function reset() {
        search.value = '';
        return router.replace({ query: toQuery(readFilters({}), scenario.value) });
    }

    function resetSearch() {
        search.value = '';
        return apply({ q: '' });
    }

    return {
        filters,
        scenario,
        search,
        status,
        priority,
        assignment,
        sort,
        page,
        hasActiveFilters,
        reset,
        resetSearch,
        clearScenario,
    };
}
