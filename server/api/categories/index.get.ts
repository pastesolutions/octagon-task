import type { ApiCategory } from '#shared/types/api';

export default defineEventHandler((): ApiCategory[] => db.categories);
