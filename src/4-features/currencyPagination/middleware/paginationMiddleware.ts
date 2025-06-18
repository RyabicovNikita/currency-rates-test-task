import type { Middleware } from '@reduxjs/toolkit';

import { paginationModel } from '@features/currencyPagination';
import { PAGINATION_PAGE, PAGINATION_PAGE_SIZE } from '@shared/constants';

export const paginationMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (paginationModel.setPage.match(action)) {
    localStorage.setItem(PAGINATION_PAGE, String(action.payload));
  }

  if (paginationModel.setPageSize.match(action)) {
    localStorage.setItem(PAGINATION_PAGE_SIZE, String(action.payload));
  }

  return result;
};
