import rates from '../../../mock.json';

import type { StringRecord } from './types';

// export async function fetchRates(): Promise<StringRecord> {
//   const res = await fetch('https://api.coingate.com/v2/rates/merchant');
//   if (!res.ok) {
//     throw new Error(`Ошибка при загрузке курсов валют: ${res.statusText}`);
//   }
//   const data = await res.json();
//   return data.USD as StringRecord;
// }

export async function fetchRates(): Promise<StringRecord> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return rates.USD;
}
