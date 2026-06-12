import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  padding = 'md',
}: CardProps) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        glass 
          ? 'glass' 
          : 'bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border shadow-soft',
        hover && 'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-glow/20 hover:border-primary-500/30 dark:hover:border-primary-500/30',
        paddingSizes[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
