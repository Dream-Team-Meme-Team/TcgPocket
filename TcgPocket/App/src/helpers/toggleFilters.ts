/**
 * Takes in the state of the filter, which should be an array of numbers,
 * and the filter that will be toggled. If the payload (filter) is already
 * found in the current active filters (state), then it is removed; otherwise,
 * the filter is added to the current filters state.
 */
export function toggleFilters(state: number[], payload: number) {
    const applied = state.some((filterId) => filterId === payload);

    if (applied) {
        state = state.filter((filter) => filter !== payload);
    } else state.push(payload);
}
