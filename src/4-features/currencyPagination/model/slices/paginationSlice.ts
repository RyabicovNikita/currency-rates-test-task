import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { PageSize } from '@features/currencyPagination/constants';
import { PAGINATION_PAGE, PAGINATION_PAGE_SIZE } from '@shared/constants';

interface PaginationState {
  page: number;
  pageSize: PageSize;
}

const savedPage = Number(localStorage.getItem(PAGINATION_PAGE)) || 1;
const savedPageSize = Number(localStorage.getItem(PAGINATION_PAGE_SIZE)) || 10;

const initialState: PaginationState = {
  page: savedPage,
  pageSize: savedPageSize,
};

const paginationSlice = createSlice({
  name: 'currencyPagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<PageSize>) {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
});

export const { setPage, setPageSize } = paginationSlice.actions;
export const currencyPaginationReducer = paginationSlice.reducer;
