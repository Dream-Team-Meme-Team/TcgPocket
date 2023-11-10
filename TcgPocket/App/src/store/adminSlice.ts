import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AdminState = {
  searchTerm: string;
  selectedIdInPaginatedTable: number;
  selectedGameId: number;
  selectedTab: string | null;
  currentPage: number;
  pageCount: number;
  pageSize: number;
};

const initialState: AdminState = {
  searchTerm: '',
  selectedIdInPaginatedTable: 0,
  selectedGameId: 0,
  selectedTab: null,
  currentPage: 1,
  pageCount: 1,
  pageSize: 15,
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
    setSelectedIdInPaginatedTable(
      state,
      { payload }: PayloadAction<AdminState['selectedIdInPaginatedTable']>
    ) {
      state.selectedIdInPaginatedTable = payload;
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
    setCurrentPage(
      state,
      { payload }: PayloadAction<AdminState['currentPage']>
    ) {
      state.currentPage = payload;
    },
    setPageCount(state, { payload }: PayloadAction<AdminState['pageCount']>) {
      state.pageCount = payload;
    },
    setPageSize(state, { payload }: PayloadAction<AdminState['pageSize']>) {
      state.pageSize = payload;
    },
  },
});

export const {
  setAdminSearchTerm,
  setSelectedIdInPaginatedTable,
  setSelectedGameId,
  setSelectedAdminTab,
  setCurrentPage,
  setPageCount,
  setPageSize,
} = adminSlice.actions;
