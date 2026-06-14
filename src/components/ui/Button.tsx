import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#050505]';

  const variants = {
    primary: 'bg-white text-black hover:bg-[#d4af37] hover:text-white',
    secondary: 'border border-white/20 hover:bg-white/5',
    ghost: 'hover:bg-white/5',
  };

  const sizes = {
    md: 'h-12 px-8 text-sm',
    lg: 'h-14 px-10 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
