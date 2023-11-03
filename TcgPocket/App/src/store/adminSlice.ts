import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AdminState = {
  searchTerm: string;
  selectedId: number;
  selectedGameId: number;
  selectedTab: string | null;
};

const initialState: AdminState = {
  searchTerm: '',
  selectedId: 0,
  selectedGameId: 0,
  selectedTab: null,
};

export const adminSlice = createSlice({
  initialState,
  name: 'admin',
  reducers: {
    setAdminSearchTerm(
      state,
      { payload }: PayloadAction<AdminState['searchTerm']>
    ) {
      state.searchTerm = payload;
    },
    setSelectedId(state, { payload }: PayloadAction<AdminState['selectedId']>) {
      state.selectedId = payload;
    },
    setSelectedGameId(
      state,
      { payload }: PayloadAction<AdminState['selectedGameId']>
    ) {
      state.selectedGameId = payload;
    },
    setSelectedAdminTab(
      state,
      { payload }: PayloadAction<AdminState['selectedTab']>
    ) {
      state.selectedTab = payload;
    },
  },
});

export const {
  setAdminSearchTerm,
  setSelectedId,
  setSelectedGameId,
  setSelectedAdminTab,
} = adminSlice.actions;
