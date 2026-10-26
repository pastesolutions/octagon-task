import { API_PRIORITIES, type ApiCreateRequestBody, type ApiRequestDetails } from '#shared/types/api';

function isCreateBody(body: unknown): body is ApiCreateRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const value = body as Record<string, unknown>;
    return (
        typeof value.title === 'string' && value.title.trim().length > 0 &&
        typeof value.customerId === 'number' &&
        isOneOf(value.priority, API_PRIORITIES) &&
        (value.description === undefined || typeof value.description === 'string')
    );
}

export default defineEventHandler(async (event): Promise<ApiRequestDetails> => {
    const body = await readBody<unknown>(event);

    if (!isCreateBody(body) || !db.customers.some((customer) => customer.id === body.customerId)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
    }

    const now = new Date();
    const request: ApiRequestDetails = {
        id: nextId(db.requests),
        createdAt: toLocalIso(now),
        title: body.title.trim(),
        status: 'new',
        priority: body.priority,
        customerId: body.customerId,
        categoryId: null,
        assigneeId: null,
        deadline: toLocalIso(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
        description: body.description?.trim() || null,
        comments: [],
        history: [{ id: 1, createdAt: toLocalIso(now), text: 'Оператор создал заявку' }],
    };

    db.requests.unshift(request);
    setResponseStatus(event, 201);
    return request;
});
