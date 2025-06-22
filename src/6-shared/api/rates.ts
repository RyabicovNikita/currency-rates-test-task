import type { StringRecord } from './types';

export async function fetchRates(): Promise<StringRecord> {
  const res = await fetch(`/coingate-api/v2/rates/merchant`);
  if (!res.ok) {
    throw new Error(`Ошибка при загрузке курсов валют: ${res.statusText}`);
  }
  const data = await res.json();
  return data.USD as StringRecord;
}

// export async function fetchRates(): Promise<StringRecord> {
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   const test = Object.entries(rates.USD).reduce(
//     (acc, [key, value]) => ({ ...acc, [key]: `${Number(value) * Math.random() * 100}` }),
//     {},
//   );
//   return test;
// }
