import { TypedUseSelectorHook, shallowEqual, useSelector } from 'react-redux';
import { DeckBuilderState } from '../store/deckBuilderSlice';
import { InventoryState } from '../store/inventorySlice';
import { AppState } from '../store/configureStore';

export type RootState = {
    inventorySlice: InventoryState;
    deckBuilderSlice: DeckBuilderState;
};

export type RootSliceName = keyof AppState;
export type RootSliceType = AppState[RootSliceName];

export const useShallowEqualSelector: TypedUseSelectorHook<AppState> = (
    selector
) => useSelector(selector, shallowEqual);
