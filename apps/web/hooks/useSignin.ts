import { useState } from 'react';
import { HTTP_BACKEND } from '../config';
import { useRouter } from 'next/navigation';

export interface signinProps {
  email: string;
  password: string;
}

export const useSignin = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const signIn = async ({ email, password }: signinProps) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${HTTP_BACKEND}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data: {
        message: string;
        token: string;
      } = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'signin failed');
      }

      const token = data.token;
      localStorage.setItem('token', token);

      router.push('/dashboard');
    } catch (e: any) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { error, isLoading, signIn };
};
