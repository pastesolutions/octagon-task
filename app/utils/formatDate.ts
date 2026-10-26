const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });
const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });

const DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function formatDate(iso: string, now: Date = new Date()): string {
    const date = new Date(iso);
    const time = timeFormatter.format(date);
    const diff = Math.round((startOfDay(date) - startOfDay(now)) / DAY);

    if (diff === 0) return `Сегодня, ${time}`;
    if (diff === 1) return `Завтра, ${time}`;
    if (diff === -1) return `Вчера, ${time}`;
    return `${dateFormatter.format(date)}, ${time}`;
}

export function formatTime(date: Date = new Date()): string {
    return timeFormatter.format(date);
}

export function toLocalIso(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}
