import type { ApiCustomer } from '#shared/types/api';

export default defineEventHandler((): ApiCustomer[] => db.customers);
