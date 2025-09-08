// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth');
  }, [router]);

  return (
    <div>
      <h1>Redirecting to Auth...</h1>
    </div>
  );
}