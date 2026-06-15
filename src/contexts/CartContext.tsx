'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartItem } from '@/types';
import { calculateCartTotal } from '@/lib/utils';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // Auth gate
  authRequired: boolean;
  authMessage: string;
  clearAuthRequired: () => void;
  pendingProduct: { product: Product; quantity: number } | null;
  confirmAddAfterAuth: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rwanda-market-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [pendingProduct, setPendingProduct] = useState<{ product: Product; quantity: number } | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setItems(JSON.parse(savedCart));
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist cart
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isInitialized]);

  const doAddToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setIsOpen(true);
  }, []);

  // Check auth before adding — reads from localStorage to avoid circular dep with AuthContext
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    // Check if a Supabase session exists in localStorage
    const hasSession = Object.keys(localStorage).some(key =>
      key.startsWith('sb-') && key.endsWith('-auth-token')
    );

    if (!hasSession) {
      setPendingProduct({ product, quantity });
      setAuthMessage('Connectez-vous pour ajouter des produits à votre panier et passer commande.');
      setAuthRequired(true);
      return;
    }

    doAddToCart(product, quantity);
  }, [doAddToCart]);

  // Called after successful auth to process the pending product
  const confirmAddAfterAuth = useCallback(() => {
    if (pendingProduct) {
      doAddToCart(pendingProduct.product, pendingProduct.quantity);
      setPendingProduct(null);
    }
    setAuthRequired(false);
  }, [pendingProduct, doAddToCart]);

  const clearAuthRequired = useCallback(() => {
    setAuthRequired(false);
    setPendingProduct(null);
  }, []);

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(quantity, i.product.stock) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{
      items,
      itemCount: items.reduce((t, i) => t + i.quantity, 0),
      total: calculateCartTotal(items),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      authRequired,
      authMessage,
      clearAuthRequired,
      pendingProduct,
      confirmAddAfterAuth,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
