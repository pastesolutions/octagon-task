export type ListDensity = 'comfortable' | 'compact';

export function useListDensity() {
    return useState<ListDensity>('list-density', () => 'comfortable');
}
