import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import { selectRatesCodes } from '@process/selectors/currencySelectors';
import { selectCurrencyPage, selectCurrencyPageSize } from '@process/selectors/paginationSelectors';
import { paginationModel } from '@features/currencyPagination';
import { PAGE_SIZES_OPTIONS } from '@shared/config';
import { PAGINATION_PAGE, PAGINATION_PAGE_SIZE } from '@shared/constants';
import { Select } from '@shared/ui';

import styles from './Pagination.module.css';

export const Pagination = () => {
  const dispatch = useAppDispatch();

  const page = useAppSelector(selectCurrencyPage);
  const pageSize = useAppSelector(selectCurrencyPageSize);
  const totalItems = useAppSelector(selectRatesCodes).length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    localStorage.setItem(PAGINATION_PAGE, page.toString());
    localStorage.setItem(PAGINATION_PAGE_SIZE, pageSize.toString());
  }, [page, pageSize]);

  const handleNext = () => {
    if (page < totalPages) dispatch(paginationModel.setPage(page + 1));
  };

  const handlePrev = () => {
    if (page > 1) dispatch(paginationModel.setPage(page - 1));
  };

  const handlePageSizeChange = (newSize: string) => {
    dispatch(paginationModel.setPageSize(Number(newSize)));
    dispatch(paginationModel.setPage(1));
  };

  const handlePageClick = (pageNum: number) => {
    dispatch(paginationModel.setPage(pageNum));
  };

  const renderPageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const visible = new Set<number>();
      visible.add(1);
      visible.add(totalPages);
      visible.add(page);
      if (page > 2) visible.add(page - 1);
      if (page < totalPages - 1) visible.add(page + 1);

      const sortedPages = Array.from(visible).sort((a, b) => a - b);
      let last = 0;

      for (const p of sortedPages) {
        if (last && p - last > 1) pages.push('...');
        pages.push(p);
        last = p;
      }
    }

    return pages;
  }, [page, totalPages]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.pages}>
          <button className={styles.pageButton} onClick={handlePrev} disabled={page === 1}>
            &laquo; Prev
          </button>

          {renderPageNumbers.map((item, index) =>
            item === '...' ? (
              <span key={index} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={item}
                className={`${styles.pageButton} ${item === page ? styles.pageButtonActive : ''}`}
                onClick={() => handlePageClick(item as number)}
              >
                {item}
              </button>
            ),
          )}

          <button className={styles.pageButton} onClick={handleNext} disabled={page === totalPages}>
            Next &raquo;
          </button>
        </div>
      </div>

      <div className={styles.selectWrapper}>
        <Select
          label="Элементов на странице"
          value={pageSize}
          onChange={handlePageSizeChange}
          options={PAGE_SIZES_OPTIONS.map((size) => ({
            value: size,
            label: String(size),
          }))}
        />
      </div>
    </div>
  );
};
