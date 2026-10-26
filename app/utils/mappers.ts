import type { ApiCategory, ApiCustomer, ApiRequest, ApiRequestDetails, ApiUser } from '#shared/types/api';
import type { Dictionaries, Ticket, TicketDetails } from '~/types/ticket';

export const FALLBACK = {
    title: 'Без названия',
    client: 'Клиент не указан',
    assignee: 'Не назначен',
    category: 'Без категории',
    description: 'Описание не заполнено.',
} as const;

export function toDictionaries(users: ApiUser[] = [], customers: ApiCustomer[] = [], categories: ApiCategory[] = []): Dictionaries {
    return {
        users: new Map(users.map((user) => [user.id, user.shortName])),
        customers: new Map(customers.map((customer) => [customer.id, customer.name])),
        categories: new Map(categories.map((category) => [category.id, category.name])),
    };
}

function lookup(map: Map<number, string>, id: number | null | undefined): string | undefined {
    return id == null ? undefined : map.get(id);
}

export function toTicket(item: ApiRequest, dictionaries: Dictionaries): Ticket {
    const title = item.title?.trim();
    const client = lookup(dictionaries.customers, item.customerId);

    return {
        id: item.id,
        title: title || FALLBACK.title,
        status: item.status,
        priority: item.priority,
        client: client ?? FALLBACK.client,
        assignee: lookup(dictionaries.users, item.assigneeId) ?? FALLBACK.assignee,
        assigneeId: item.assigneeId ?? null,
        category: lookup(dictionaries.categories, item.categoryId) ?? FALLBACK.category,
        createdAt: item.createdAt,
        deadline: item.deadline ?? null,
        isIncomplete: !title || !client,
    };
}

export function toTicketDetails(item: ApiRequestDetails, dictionaries: Dictionaries): TicketDetails {
    return {
        ...toTicket(item, dictionaries),
        description: item.description?.trim() || FALLBACK.description,
        comments: (item.comments ?? []).map((comment) => ({
            id: comment.id,
            author: comment.authorName,
            time: formatTime(new Date(comment.createdAt)),
            text: comment.text,
        })),
        history: (item.history ?? []).map((event) => ({
            id: event.id,
            time: formatTime(new Date(event.createdAt)),
            text: event.text,
        })),
    };
}
