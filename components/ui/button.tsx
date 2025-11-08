import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    disabled = false,
    isLoading = false,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-black text-white border border-black',
      outline: 'border-2 border-black bg-white text-black',
      ghost: '',
      link: 'text-black',
    };

    const sizes = {
      default: 'h-10 py-2 px-6 text-sm',
      sm: 'h-8 px-4 text-xs',
      lg: 'h-12 px-8 text-base',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          'rounded-none', // Remove border radius for sharp edges
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
