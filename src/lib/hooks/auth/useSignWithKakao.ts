import { Routes } from '@/lib/route';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSignWithKakao = (redirectUri: Partial<Routes>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [kakaoCode, setKakaoCode] = useState('');

  useEffect(() => {
    if (code) {
      router.push(redirectUri);
    }
    return () => {
      if (code) {
        setKakaoCode(code);
      }
    };
  }, [code]);

  return { kakaoCode };
};
