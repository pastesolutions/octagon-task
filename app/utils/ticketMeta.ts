import type { TicketPriority, TicketStatus } from '~/types/ticket';

export const statusLabels: Record<TicketStatus, string> = {
    new: 'Новая',
    assigned: 'Назначена',
    in_progress: 'В работе',
    waiting: 'Ожидание',
    escalated: 'Эскалирована',
    resolved: 'Решена',
    closed: 'Закрыта',
};

export const priorityLabels: Record<TicketPriority, string> = {
    critical: 'Критический',
    high: 'Высокий',
    normal: 'Обычный',
    low: 'Низкий',
};

export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));
export const priorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({ value, label }));

export const assignmentOptions = [
    { value: '', label: 'Все заявки' },
    { value: 'unassigned', label: 'Без исполнителя' },
    { value: 'assigned', label: 'С исполнителем' },
];

export const sortOptions = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'oldest', label: 'Сначала старые' },
];
