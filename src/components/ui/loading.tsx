import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingProps {
  variant?: 'dots' | 'spinner' | 'gradient' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const Loading = ({ 
  variant = 'dots', 
  size = 'md', 
  className, 
  text = 'Loading...'
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const spinnerSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center space-y-4', className)}>
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={cn(
                'bg-primary rounded-full',
                dotSizes[size]
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            className={cn('text-muted-foreground', sizeClasses[size])}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center space-y-4', className)}>
        <motion.div
          className={cn(
            'border-4 border-primary/20 border-t-primary rounded-full',
            spinnerSizes[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && (
          <p className={cn('text-muted-foreground', sizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('flex flex-col items-center space-y-4', className)}>
        <div className={cn('relative overflow-hidden rounded-full bg-muted', spinnerSizes[size])}>
          <motion.div
            className="absolute inset-0 loading-gradient rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {text && (
          <p className={cn('text-muted-foreground', sizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center space-y-4', className)}>
        <motion.div
          className={cn(
            'bg-primary rounded-full',
            spinnerSizes[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <motion.p
            className={cn('text-muted-foreground', sizeClasses[size])}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  return null;
};