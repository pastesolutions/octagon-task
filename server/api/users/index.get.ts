import type { ApiUser } from '#shared/types/api';

export default defineEventHandler((): ApiUser[] => db.users);
