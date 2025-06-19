import { useMemo, useState } from 'react';
import Big from 'big.js';

import type { StringRecord } from '@shared/api/types';
import { Select } from '@shared/ui';
import { InputField } from '@shared/ui/Input';

import type { CurrencyConverter } from '../types';

import styles from './Converter.module.css';

const COMMISSION_RATE = 0.03;

interface ConverterProps {
  rates: StringRecord;
  currencies: CurrencyConverter[];
}

export const Converter = ({ rates, currencies }: ConverterProps) => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0].code);
  const [toCurrency, setToCurrency] = useState(currencies[1]?.code || currencies[0].code);
  const [amount, setAmount] = useState('1');
  const isSameCurrency = fromCurrency === toCurrency;

  const conversionResult = useMemo(() => {
    if (isSameCurrency || +amount <= 0) return null;

    try {
      const amountBig = Big(amount || 0);
      const fromRate = Big(rates[fromCurrency]);
      const toRate = Big(rates[toCurrency]);

      const baseValue = amountBig.times(fromRate);
      const converted = baseValue.div(toRate);
      const commission = converted.times(COMMISSION_RATE);
      const total = converted.plus(commission);

      const toCurrencyMeta = currencies.find((c) => c.code === toCurrency);
      const isFiat = toCurrencyMeta?.isFiat ?? false;

      const formattedTotal = isFiat ? total.round(2, 0) : total.round(18, 0);
      const formattedConverted = isFiat ? converted.round(2, 0) : converted.round(18, 0);
      const formattedCommission = isFiat ? commission.round(2, 0) : commission.round(18, 0);

      return {
        total: formattedTotal.toString(),
        converted: formattedConverted.toString(),
        commission: formattedCommission.toString(),
      };
    } catch {
      return null;
    }
  }, [amount, fromCurrency, toCurrency, rates, isSameCurrency, currencies]);

  const selectOptions = useMemo(
    () => currencies.map(({ code, label }) => ({ value: code, label })),
    [currencies],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <Select
          label="From"
          value={fromCurrency}
          options={selectOptions}
          onChange={setFromCurrency}
        />
        <Select label="To" value={toCurrency} options={selectOptions} onChange={setToCurrency} />
        <InputField
          label="Amount"
          type="text"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
      </div>

      <div className={styles.result}>
        {isSameCurrency && <p className="error">Выберите разные валюты</p>}
        {+amount <= 0 && <p className="error">Введите корректное число для конвертации</p>}
        {conversionResult && (
          <p>
            {amount} {fromCurrency} {'=>'} {conversionResult.total} {toCurrency} (
            {conversionResult.converted} {toCurrency} + {COMMISSION_RATE * 100}%)
          </p>
        )}
      </div>
    </div>
  );
};
