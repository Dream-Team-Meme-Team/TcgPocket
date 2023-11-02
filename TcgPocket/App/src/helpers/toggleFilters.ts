/**
 * Takes in the state of the filter, which should be an array of numbers,
 * and the filter that will be toggled. If the payload (filter) is already
 * found in the current active filters (state), then it is removed; otherwise,
 * the filter is added to the current filters state.
 */
export function toggleFilters(filterState: number[], payload: number) {
    const applied = filterState.find((filterId) => filterId === payload);

    if (applied) {
        return filterState.filter((filter) => filter !== applied);
    } else {
        return filterState.concat(payload);
    }
}
