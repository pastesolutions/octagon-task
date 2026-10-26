import type { Ticket } from '~/utils/mockData';

export function useTicketFilters(tickets: Ref<Ticket[]>) {
    const search = ref('');
    const status = ref('');
    const priority = ref('');
    const assignment = ref('');
    const sort = ref('newest');

    const filtered = computed(() => {
        const query = search.value.trim().toLowerCase().replace(/^#/, '');

        const result = tickets.value.filter((ticket) =>
            (!status.value || ticket.status === status.value) &&
            (!priority.value || ticket.priority === priority.value) &&
            (!assignment.value || (assignment.value === 'assigned') === Boolean(ticket.assignee)) &&
            (!query || ticket.title.toLowerCase().includes(query) || String(ticket.id).includes(query)),
        );

        const direction = sort.value === 'oldest' ? 1 : -1;
        return result.sort((a, b) => direction * a.createdAt.localeCompare(b.createdAt));
    });

    function reset() {
        search.value = '';
        status.value = '';
        priority.value = '';
        assignment.value = '';
        sort.value = 'newest';
    }

    return { search, status, priority, assignment, sort, filtered, reset };
}
