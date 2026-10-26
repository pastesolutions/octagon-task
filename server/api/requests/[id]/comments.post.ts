import type { ApiComment, ApiCreateCommentBody } from '#shared/types/api';

function isCommentBody(body: unknown): body is ApiCreateCommentBody {
    if (typeof body !== 'object' || body === null) return false;
    const { text } = body as Record<string, unknown>;
    return typeof text === 'string' && text.trim().length > 0;
}

export default defineEventHandler(async (event): Promise<ApiComment> => {
    const request = findRequestOr404(event);
    const body = await readBody<unknown>(event);

    if (!isCommentBody(body)) {
        throw createError({ statusCode: 400, statusMessage: 'Comment text is required' });
    }

    const comment: ApiComment = {
        id: nextId(request.comments),
        authorName: 'Оператор',
        createdAt: toLocalIso(new Date()),
        text: body.text.trim(),
    };

    request.comments.push(comment);
    setResponseStatus(event, 201);
    return comment;
});
