import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HTTP_BACKEND } from '../config';

interface signupProps {
  username: string;
  email: string;
  password: string;
}
export const useSignup = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const signup = async ({ username, email, password }: signupProps) => {
    setLoading(true);

    try {
      const res = await fetch(`${HTTP_BACKEND}/signup`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'signup failed');
      }

      router.push('/sigin');
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return {
    signup,
    isLoading
  };
};
