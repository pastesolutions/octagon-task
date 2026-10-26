import type { ApiRequestListResponse } from '#shared/types/api';

export default defineEventHandler(async (event): Promise<ApiRequestListResponse> => {
    const scenario = await simulateNetwork(event);
    const query = parseListQuery(event);

    const source = scenario === 'empty' ? [] : db.requests;
    const matched = sortRequests(filterRequests(source, query), query.sort);
    const start = (query.page - 1) * query.perPage;

    return {
        items: matched.slice(start, start + query.perPage).map(toListItem),
        total: matched.length,
        page: query.page,
        perPage: query.perPage,
        stats: countStats(source),
    };
});
