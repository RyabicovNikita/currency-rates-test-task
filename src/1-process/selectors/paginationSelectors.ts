import type { RootState } from '@process/store';

export const selectCurrencyPage = (state: RootState) => state.pagination.page;
export const selectCurrencyPageSize = (state: RootState) => state.pagination.pageSize;
