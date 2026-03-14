'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart';
import { AuthProvider } from '@/lib/auth';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
