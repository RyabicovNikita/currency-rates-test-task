import { fireEvent, render, screen, within } from '@testing-library/react';
import type Big from 'big.js';
import { expect, test, vi } from 'vitest';

import { CurrencyTable } from './CurrencyTable';

let isLoading = false;

vi.mock('@process/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: any) => {
    switch (selector.name) {
      case 'selectCurrencyRates':
        return {
          USD: '1.0',
          EUR: '0.8677',
          GBP: '0.7432',
          PLN: '3.7039',
          CZK: '21.5382',
          SEK: '9.6644',
          NOK: '10.1048',
          DKK: '6.4736',
          CHF: '0.8179',
          ZAR: '17.9993',
          AUD: '1.5458',
          JPY: '146.105',
        };
      case 'selectRatesCodes':
        return ['USD', 'EUR', 'GBP', 'PLN', 'CZK', 'SEK', 'NOK', 'DKK', 'CHF', 'ZAR', 'AUD', 'JPY'];
      case 'selectIsLoading':
        return isLoading;
      case 'selectError':
        return null;
      case 'selectCurrencyPage':
        return 1;
      case 'selectCurrencyPageSize':
        return 10;
      default:
        return undefined;
    }
  },
}));

vi.mock('@entities/currency', () => ({
  CurrencyRow: ({ name, value }: { name: string; value: Big }) => (
    <tr data-testid="row">
      <td data-testid={name}>{name}</td>
      <td>{value.toString()}</td>
    </tr>
  ),
  currencyModel: { loadRates: vi.fn() },
}));

vi.mock('@shared/ui', () => ({
  Loader: () => <div>Loading rates...</div>,
}));

test('Отображение списка валют с курсами с пагинацией по умолчанию', () => {
  render(<CurrencyTable />);
  expect(screen.getByRole('table')).toBeInTheDocument();
  const rows = screen.getAllByTestId('row');
  expect(rows).toHaveLength(10);
});

test('Отображается Loader при загрузке', () => {
  isLoading = true;
  render(<CurrencyTable />);
  expect(screen.getByText('Loading rates...')).toBeInTheDocument();
});

test('Сортировка валют по курсу меняет порядок', () => {
  isLoading = false;
  render(<CurrencyTable />);

  // DESC
  fireEvent.click(screen.getByText('Rate'));

  const rowsDesc = screen.getAllByTestId('row');
  const firstRow = rowsDesc[0];
  const lastRow = rowsDesc[rowsDesc.length - 1];

  //С учетом slice в 10 элементов
  const firstRowCurrencyCell = within(firstRow).getByTestId('CZK');
  const lastRowCurrencyCell = within(lastRow).getByTestId('GBP');
  expect(firstRowCurrencyCell).toBeInTheDocument();
  expect(lastRowCurrencyCell).toBeInTheDocument();

  // ASC
  fireEvent.click(screen.getByText('Rate'));

  const rowsAsc = screen.getAllByTestId('row');
  const firstRowAsc = rowsAsc[0];
  const lastRowAsc = rowsAsc[rowsAsc.length - 1];

  //С учетом slice в 10 элементов
  const firstRowAscCurrencyCell = within(firstRowAsc).getByTestId('GBP');
  const lastRowAscCurrencyCell = within(lastRowAsc).getByTestId('CZK');
  expect(firstRowAscCurrencyCell).toBeInTheDocument();
  expect(lastRowAscCurrencyCell).toBeInTheDocument();
});
