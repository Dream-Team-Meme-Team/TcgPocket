import { InventoryState } from '../store/inventorySlice';

export function toggleFilters(state: InventoryState, payload: number) {
    const applied = state.cardTypeFilters.some(
        (filterId) => filterId === payload
    );

    if (applied) {
        state.cardTypeFilters = state.cardTypeFilters.filter(
            (filter) => filter !== payload
        );
    } else state.cardTypeFilters.push(payload);
}
