import Big from 'big.js';

import { COMMISSION_PERCENT, FIAT_CURRENCIES } from '@features/constants';

export function convertCurrency(amount: string, fromRate: string, toRate: string) {
  const amountBig = Big(amount);
  const rateFrom = Big(fromRate);
  const rateTo = Big(toRate);

  const converted = amountBig.times(rateFrom).div(rateTo);
  const commission = converted.times(COMMISSION_PERCENT).div(100);
  const total = converted.plus(commission);

  const isFiat = FIAT_CURRENCIES.includes(toRate);

  return {
    converted: isFiat ? converted.round(2, 0).toFixed(2) : converted.toString(),
    commission: isFiat ? commission.round(2, 0).toFixed(2) : commission.toString(),
    total: isFiat ? total.round(2, 0).toFixed(2) : total.toString(),
  };
}
