export type ApiRequestStatus = 'new' | 'assigned' | 'in_progress' | 'waiting' | 'escalated' | 'resolved' | 'closed';
export type ApiRequestPriority = 'critical' | 'high' | 'normal' | 'low';
export type ApiUserRole = 'operator' | 'executor';
export type ApiRequestSort = 'newest' | 'oldest';
export type ApiAssignmentFilter = 'assigned' | 'unassigned';
export type ApiScenario = 'error' | 'rate-limit' | 'empty';

export interface ApiUser {
    id: number;
    name: string;
    shortName: string;
    role: ApiUserRole;
}

export interface ApiCustomer {
    id: number;
    name: string;
}

export interface ApiCategory {
    id: number;
    name: string;
}

export interface ApiComment {
    id: number;
    authorName: string;
    createdAt: string;
    text: string;
}

export interface ApiHistoryEvent {
    id: number;
    createdAt: string;
    text: string;
}

export interface ApiRequest {
    id: number;
    createdAt: string;
    status: ApiRequestStatus;
    priority: ApiRequestPriority;
    title?: string | null;
    customerId?: number | null;
    categoryId?: number | null;
    assigneeId?: number | null;
    deadline?: string | null;
}

export interface ApiRequestDetails extends ApiRequest {
    description?: string | null;
    comments: ApiComment[];
    history: ApiHistoryEvent[];
}

export interface ApiRequestStats {
    new: number;
    inProgress: number;
    waiting: number;
    resolved: number;
}

export interface ApiRequestListQuery {
    q?: string;
    status?: ApiRequestStatus;
    priority?: ApiRequestPriority;
    assignment?: ApiAssignmentFilter;
    sort?: ApiRequestSort;
    page?: number;
    perPage?: number;
    scenario?: ApiScenario;
}

export interface ApiRequestListResponse {
    items: ApiRequest[];
    total: number;
    page: number;
    perPage: number;
    stats: ApiRequestStats;
}

export interface ApiCreateRequestBody {
    title: string;
    customerId: number;
    priority: ApiRequestPriority;
    description?: string;
}

export interface ApiUpdateRequestBody {
    assigneeId?: number | null;
    priority?: ApiRequestPriority;
}

export interface ApiCreateCommentBody {
    text: string;
}

export const API_STATUSES: readonly ApiRequestStatus[] = ['new', 'assigned', 'in_progress', 'waiting', 'escalated', 'resolved', 'closed'];
export const API_PRIORITIES: readonly ApiRequestPriority[] = ['critical', 'high', 'normal', 'low'];
export const API_SORTS: readonly ApiRequestSort[] = ['newest', 'oldest'];
export const API_ASSIGNMENTS: readonly ApiAssignmentFilter[] = ['assigned', 'unassigned'];
export const API_SCENARIOS: readonly ApiScenario[] = ['error', 'rate-limit', 'empty'];
