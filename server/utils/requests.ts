import type { H3Event } from 'h3';
import {
    API_ASSIGNMENTS,
    API_PRIORITIES,
    API_SORTS,
    API_STATUSES,
    type ApiRequest,
    type ApiRequestDetails,
    type ApiRequestListQuery,
    type ApiRequestStats,
} from '#shared/types/api';

const DEFAULT_PER_PAGE = 12;
const MAX_PER_PAGE = 50;

function toPositiveInt(value: unknown, fallback: number): number {
    const number = Number(value);
    return Number.isInteger(number) && number > 0 ? number : fallback;
}

export function parseListQuery(event: H3Event): Required<Pick<ApiRequestListQuery, 'page' | 'perPage' | 'sort'>> & ApiRequestListQuery {
    const query = getQuery(event);

    return {
        q: typeof query.q === 'string' ? query.q.trim() : undefined,
        status: isOneOf(query.status, API_STATUSES) ? query.status : undefined,
        priority: isOneOf(query.priority, API_PRIORITIES) ? query.priority : undefined,
        assignment: isOneOf(query.assignment, API_ASSIGNMENTS) ? query.assignment : undefined,
        sort: isOneOf(query.sort, API_SORTS) ? query.sort : 'newest',
        page: toPositiveInt(query.page, 1),
        perPage: Math.min(toPositiveInt(query.perPage, DEFAULT_PER_PAGE), MAX_PER_PAGE),
    };
}

export function filterRequests(items: ApiRequestDetails[], query: ApiRequestListQuery): ApiRequestDetails[] {
    const search = query.q?.toLowerCase().replace(/^#/, '');

    return items.filter((item) =>
        (!query.status || item.status === query.status) &&
        (!query.priority || item.priority === query.priority) &&
        (!query.assignment || (query.assignment === 'assigned') === (item.assigneeId != null)) &&
        (!search || String(item.id).includes(search) || (item.title ?? '').toLowerCase().includes(search)),
    );
}

export function sortRequests(items: ApiRequestDetails[], sort: ApiRequestListQuery['sort']): ApiRequestDetails[] {
    const direction = sort === 'oldest' ? 1 : -1;
    return [...items].sort((a, b) => direction * a.createdAt.localeCompare(b.createdAt));
}

export function countStats(items: ApiRequest[]): ApiRequestStats {
    const count = (status: ApiRequest['status']) => items.filter((item) => item.status === status).length;
    return {
        new: count('new'),
        inProgress: count('in_progress'),
        waiting: count('waiting'),
        resolved: count('resolved'),
    };
}

export function toListItem({ description, comments, history, ...item }: ApiRequestDetails): ApiRequest {
    return item;
}

export function findRequestOr404(event: H3Event): ApiRequestDetails {
    const id = Number(getRouterParam(event, 'id'));
    const request = db.requests.find((item) => item.id === id);

    if (!request) {
        throw createError({ statusCode: 404, statusMessage: 'Request Not Found' });
    }

    return request;
}

export function nextId(items: { id: number }[]): number {
    return Math.max(0, ...items.map((item) => item.id)) + 1;
}
