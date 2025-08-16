import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { triggerHapticFeedback } from '@/lib/haptic';

type ButtonVariant = 'number' | 'operator' | 'function' | 'zero';

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  const baseClasses = 'calculator-button text-lg font-medium';

  switch (variant) {
    case 'number':
      return `${baseClasses} number-button`;
    case 'operator':
      return `${baseClasses} operator-button text-base`;
    case 'function':
      return `${baseClasses} function-button text-sm`;
    case 'zero':
      return `${baseClasses} number-button col-span-2 w-auto px-4`;
    default:
      return `${baseClasses} number-button`;
  }
};

export function CalculatorButton({
  value,
  onClick,
  variant = 'number',
  className,
}: CalculatorButtonProps) {
  const handleClick = () => {
    // Trigger haptic feedback based on button type
    if (variant === 'operator') {
      triggerHapticFeedback('medium');
    } else if (variant === 'function') {
      triggerHapticFeedback('light');
    } else {
      triggerHapticFeedback('light');
    }

    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(getVariantClasses(variant), className)}
      variant='ghost'>
      {value}
    </Button>
  );
}
