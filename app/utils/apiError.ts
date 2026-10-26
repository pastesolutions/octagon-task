export interface ApiErrorInfo {
    statusCode: number | undefined;
    message: string;
    retryAfter?: number;
}

type ErrorLike = {
    statusCode?: unknown;
    status?: unknown;
    data?: { retryAfter?: unknown; data?: { retryAfter?: unknown } };
};

function asErrorLike(error: unknown): ErrorLike {
    return typeof error === 'object' && error !== null ? (error as ErrorLike) : {};
}

function readStatusCode(error: ErrorLike): number | undefined {
    if (typeof error.statusCode === 'number') return error.statusCode;
    if (typeof error.status === 'number') return error.status;
    return undefined;
}

function readRetryAfter(error: ErrorLike): number | undefined {
    const value = error.data?.data?.retryAfter ?? error.data?.retryAfter;
    return typeof value === 'number' && value > 0 ? value : undefined;
}

export function toApiErrorInfo(error: unknown): ApiErrorInfo {
    const value = asErrorLike(error);
    const statusCode = readStatusCode(value);

    if (statusCode === 429) {
        return {
            statusCode,
            retryAfter: readRetryAfter(value),
            message: 'Слишком много запросов. Подождите несколько секунд и повторите загрузку.',
        };
    }
    if (statusCode !== undefined && statusCode >= 500) {
        return { statusCode, message: 'Сервер временно недоступен. Повторите загрузку через минуту.' };
    }
    if (statusCode === 404) {
        return { statusCode, message: 'Данные не найдены.' };
    }
    if (statusCode === 400) {
        return { statusCode, message: 'Проверьте заполнение полей и попробуйте ещё раз.' };
    }
    return { statusCode, message: 'Проверьте соединение и повторите загрузку.' };
}
