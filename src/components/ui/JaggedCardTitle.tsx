import React from 'react';
import { cn } from '@/lib/utils';

interface JaggedCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function JaggedCardTitle({ children, className, ...props }: JaggedCardTitleProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center px-2 py-1 mx-30 bg-white text-black font-bold",
        className
      )}
      style={{
        border: '4px solid transparent',
        // Using a wave SVG as border image
        borderImageSource: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 5 10 10 20 T 20 20' fill='none' stroke='black' stroke-width='4'/%3E%3Cpath d='M0 0 Q 5 10 10 0 T 20 0' fill='none' stroke='black' stroke-width='4'/%3E%3Cpath d='M0 0 Q 10 5 0 10 T 0 20' fill='none' stroke='black' stroke-width='4'/%3E%3Cpath d='M20 0 Q 10 5 20 10 T 20 20' fill='none' stroke='black' stroke-width='4'/%3E%3C/svg%3E")`,
        borderImageSlice: '30%',
        borderImageRepeat: 'round',
        // Fallback for visual weight if border-image fails or to add filled background
        backgroundColor: 'white',
        boxShadow: '4px 4px 0 0 #000'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
