import type { ApiRequestPriority, ApiRequestStatus } from '#shared/types/api';

export type TicketStatus = ApiRequestStatus;
export type TicketPriority = ApiRequestPriority;

export interface TicketComment {
    id: number;
    author: string;
    time: string;
    text: string;
}

export interface TicketHistoryItem {
    id: number;
    time: string;
    text: string;
}

export interface Ticket {
    id: number;
    title: string;
    status: TicketStatus;
    priority: TicketPriority;
    client: string;
    assignee: string;
    assigneeId: number | null;
    category: string;
    createdAt: string;
    deadline: string | null;
    isIncomplete: boolean;
}

export interface TicketDetails extends Ticket {
    description: string;
    comments: TicketComment[];
    history: TicketHistoryItem[];
}

export interface TicketStatsView {
    new: number;
    inProgress: number;
    waiting: number;
    resolved: number;
}

export interface Dictionaries {
    users: Map<number, string>;
    customers: Map<number, string>;
    categories: Map<number, string>;
}
