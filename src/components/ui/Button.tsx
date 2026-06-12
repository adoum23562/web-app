import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center transform active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5 border border-primary-400/20',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-soft hover:shadow-glow-secondary hover:-translate-y-0.5 border border-secondary-400/20',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-600 dark:text-primary-400 dark:hover:bg-primary-950/30',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border',
    glass: 'glass text-gray-800 dark:text-white hover:-translate-y-0.5 hover:bg-white/90 dark:hover:bg-dark-card/90',
    neon: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:bg-primary-500/20 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm min-h-[44px]',
    md: 'px-6 py-2.5 text-base tracking-wide min-h-[44px]',
    lg: 'px-8 py-3.5 text-lg tracking-wide min-h-[48px]',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
