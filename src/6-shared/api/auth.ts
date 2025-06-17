export interface UserLoginParams {
  username: string;
  password: string;
}

export const authUser = async ({
  username,
  password,
}: UserLoginParams): Promise<{ username: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'demo' && password === 'demo') {
        resolve({ username });
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 1500);
  });
};
