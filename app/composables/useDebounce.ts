export function useDebounce<T>(source: Ref<T>, delay = 400): Readonly<Ref<T>> {
    const debounced = shallowRef<T>(source.value);
    let timer: ReturnType<typeof setTimeout> | undefined;

    watch(source, (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            debounced.value = value;
        }, delay);
    });

    onScopeDispose(() => clearTimeout(timer));

    return debounced;
}
