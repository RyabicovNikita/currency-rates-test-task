import { render } from '@testing-library/react';
import Big from 'big.js';
import { describe, expect, it } from 'vitest';

import { CurrencyRow } from './CurrencyRow';

import styles from './CurrencyRow.module.scss';

describe('CurrencyRow', () => {
  it('Отображает строку без подсветки при пустом highlightClassName', () => {
    const { container } = render(
      <CurrencyRow name="USD" value={new Big(10)} highlightClassName="" />,
    );

    const tr = container.querySelector('tr');
    expect(tr).toBeInTheDocument();
    expect(tr).not.toHaveClass(styles.up);
    expect(tr).not.toHaveClass(styles.down);
  });

  it('Отображает строку с подсветкой "up"', () => {
    const { container } = render(
      <CurrencyRow name="USD" value={new Big(10)} highlightClassName="up" />,
    );

    const tr = container.querySelector('tr');
    expect(tr).toHaveClass(styles.up);
  });

  it('Отображает строку с подсветкой "down"', () => {
    const { container } = render(
      <CurrencyRow name="USD" value={new Big(10)} highlightClassName="down" />,
    );

    const tr = container.querySelector('tr');
    expect(tr).toHaveClass(styles.down);
  });
});
