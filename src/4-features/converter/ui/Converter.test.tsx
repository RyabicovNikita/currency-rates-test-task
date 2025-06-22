import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Converter } from './Converter';

const rates = {
  USD: '1',
  BTC: '0.000015123213123123123412423423423423423423523',
  RUB: '90',
};

const currencies = [
  { code: 'USD', label: 'USD', isFiat: true },
  { code: 'RUB', label: 'RUB', isFiat: true },
  { code: 'BTC', label: 'BTC', isFiat: false },
];

const user = userEvent.setup();

describe('Converter', () => {
  it('Показывает ошибку при одинаковых валютах', async () => {
    render(<Converter rates={rates} currencies={currencies} />);
    await user.selectOptions(screen.getByLabelText(/To/i), 'USD');

    expect(screen.getByText(/Выберите разные валюты/i)).toBeInTheDocument();
  });

  it('Показывает ошибку при некорректной сумме (<= 0)', async () => {
    render(<Converter rates={rates} currencies={currencies} />);
    const input = screen.getByLabelText(/Amount/i);
    await user.clear(input);
    await user.type(input, '0');

    expect(screen.getByText(/Введите корректное число для конвертации/i)).toBeInTheDocument();
  });

  it('Округляет до 18 знаков', async () => {
    render(<Converter rates={rates} currencies={currencies} />);

    const amountInput = screen.getByLabelText(/Amount/i);
    await user.clear(amountInput);
    await user.type(amountInput, '1');

    await user.selectOptions(screen.getByLabelText(/To/i), 'BTC');

    const result = document.getElementById('result') as HTMLInputElement;
    expect(result).toBeInTheDocument();

    expect(result.value).toMatch(/^\d+\.\d{18}$/);
  });
});
