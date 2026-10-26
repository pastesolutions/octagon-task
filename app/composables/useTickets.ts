import { mockTickets, type Ticket } from '~/utils/mockData';

export type TicketsScenario = 'success' | 'empty' | 'error';
export type NewTicket = Pick<Ticket, 'title' | 'client' | 'priority' | 'description'>;

const CURRENT_USER = 'Оператор';

const store = reactive(mockTickets) as Ticket[];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function nextId(items: { id: number }[]): number {
    return Math.max(0, ...items.map((item) => item.id)) + 1;
}

export function useTickets() {
    const route = useRoute();
    const tickets = ref<Ticket[]>([]);
    const pending = ref(true);
    const error = ref<string | null>(null);

    async function load() {
        pending.value = true;
        error.value = null;
        await delay(600);

        const scenario = (route.query.scenario as TicketsScenario | undefined) ?? 'success';
        if (scenario === 'error') {
            error.value = 'Сервис временно недоступен. Попробуйте ещё раз.';
            tickets.value = [];
        } else {
            tickets.value = scenario === 'empty' ? [] : [...store];
        }
        pending.value = false;
    }

    function addTicket(input: NewTicket): Ticket {
        const now = new Date();
        store.unshift({
            ...input,
            id: nextId(store),
            createdAt: toLocalIso(now),
            status: 'new',
            category: 'Без категории',
            assignee: null,
            deadline: toLocalIso(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
            comments: [],
            history: [{ id: 1, time: formatTime(now), author: `${CURRENT_USER} создал заявку` }],
        });
        const ticket = store[0]!;
        tickets.value = [ticket, ...tickets.value];
        return ticket;
    }

    onMounted(load);

    return { tickets, pending, error, reload: load, addTicket };
}

export function useTicket(id: MaybeRefOrGetter<number>) {
    const ticket = computed(() => store.find((item) => item.id === toValue(id)) ?? null);

    function addHistory(text: string) {
        if (!ticket.value) return;
        ticket.value.history.push({ id: nextId(ticket.value.history), time: formatTime(), author: text });
    }

    function addComment(text: string) {
        if (!ticket.value) return;
        ticket.value.comments.push({ id: nextId(ticket.value.comments), author: CURRENT_USER, time: formatTime(), text });
    }

    function assign(assignee: string) {
        if (!ticket.value || ticket.value.assignee === assignee) return;
        ticket.value.assignee = assignee;
        if (ticket.value.status === 'new') ticket.value.status = 'assigned';
        addHistory(`${CURRENT_USER} назначил: ${assignee}`);
    }

    function setPriority(priority: Ticket['priority']) {
        if (!ticket.value || ticket.value.priority === priority) return;
        ticket.value.priority = priority;
        addHistory(`${CURRENT_USER} изменил приоритет`);
    }

    return { ticket, addComment, assign, setPriority };
}
