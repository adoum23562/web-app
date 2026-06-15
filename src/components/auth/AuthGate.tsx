'use client';

import { useCart } from '@/contexts/CartContext';
import AuthModal from './AuthModal';

/**
 * Sits in the layout and shows the auth modal whenever CartContext
 * signals that a login is required (e.g. user tried to add to cart).
 */
export default function AuthGate() {
  const { authRequired, authMessage, clearAuthRequired, confirmAddAfterAuth } = useCart();

  return (
    <AuthModal
      isOpen={authRequired}
      onClose={clearAuthRequired}
      onSuccess={confirmAddAfterAuth}
      message={authMessage}
    />
  );
}
