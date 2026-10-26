import type { H3Event } from 'h3';
import { API_SCENARIOS, type ApiScenario } from '#shared/types/api';

const RESPONSE_DELAY_MS = 400;
const RETRY_AFTER_SECONDS = 5;

export function getScenario(event: H3Event): ApiScenario | undefined {
    const { scenario } = getQuery(event);
    return isOneOf(scenario, API_SCENARIOS) ? scenario : undefined;
}

export async function simulateNetwork(event: H3Event): Promise<ApiScenario | undefined> {
    await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

    const scenario = getScenario(event);

    if (scenario === 'rate-limit') {
        setResponseHeader(event, 'Retry-After', RETRY_AFTER_SECONDS);
        throw createError({
            statusCode: 429,
            statusMessage: 'Too Many Requests',
            data: { retryAfter: RETRY_AFTER_SECONDS },
        });
    }

    if (scenario === 'error') {
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }

    return scenario;
}
