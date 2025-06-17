import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@process/hooks';
import { login } from '@features/auth/model';
import { Button } from '@shared/ui';
import { InputField } from '@shared/ui/Input';

import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const handleLogin = async () => {
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/rates');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <InputField
          id="login"
          placeholder="Login"
          label="Login"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <InputField
          id="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign in'}
        </Button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};
