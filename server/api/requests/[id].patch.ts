import { API_PRIORITIES, type ApiRequestDetails, type ApiUpdateRequestBody } from '#shared/types/api';

function isUpdateBody(body: unknown): body is ApiUpdateRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    const value = body as Record<string, unknown>;
    return (
        (value.assigneeId === undefined || value.assigneeId === null || typeof value.assigneeId === 'number') &&
        (value.priority === undefined || isOneOf(value.priority, API_PRIORITIES))
    );
}

export default defineEventHandler(async (event): Promise<ApiRequestDetails> => {
    const request = findRequestOr404(event);
    const body = await readBody<unknown>(event);

    if (!isUpdateBody(body)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
    }

    const now = toLocalIso(new Date());

    if (body.assigneeId !== undefined && body.assigneeId !== request.assigneeId) {
        const assignee = db.users.find((user) => user.id === body.assigneeId && user.role === 'executor');
        if (body.assigneeId !== null && !assignee) {
            throw createError({ statusCode: 400, statusMessage: 'Unknown assignee' });
        }
        request.assigneeId = body.assigneeId;
        if (assignee && request.status === 'new') request.status = 'assigned';
        request.history.push({
            id: nextId(request.history),
            createdAt: now,
            text: assignee ? `Оператор назначил: ${assignee.shortName}` : 'Оператор снял исполнителя',
        });
    }

    if (body.priority && body.priority !== request.priority) {
        request.priority = body.priority;
        request.history.push({ id: nextId(request.history), createdAt: now, text: 'Оператор изменил приоритет' });
    }

    return request;
});
