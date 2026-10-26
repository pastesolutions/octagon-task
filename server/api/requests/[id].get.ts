import type { ApiRequestDetails } from '#shared/types/api';

export default defineEventHandler(async (event): Promise<ApiRequestDetails> => {
    await simulateNetwork(event);
    return findRequestOr404(event);
});
