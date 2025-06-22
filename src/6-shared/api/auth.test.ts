import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { authUser } from './auth';

describe('authUser', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Возвращает username при правильных логине и пароле', async () => {
    const promise = authUser({ username: 'demo', password: 'demo' });

    vi.runAllTimers();

    await expect(promise).resolves.toEqual({ username: 'demo' });
  });

  it('Возвращает ошибку при неправильных данных', async () => {
    const promise = authUser({ username: 'test', password: '1234' });

    vi.runAllTimers();

    await expect(promise).rejects.toThrow('Неверный логин или пароль');
  });
});
