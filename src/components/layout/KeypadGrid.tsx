import { CalculatorButton } from '@/components/calculator/CalculatorButton';
import { useCalculatorStore } from '@/lib/store/calculator';
import { Operation } from '@/types/calculator';

// Button configuration for cleaner, data-driven approach
const buttonConfig = [
  // Row 1
  [
    { value: 'AC', action: 'clear', variant: 'function' as const },
    { value: '+/-', action: 'toggleSign', variant: 'function' as const },
    { value: '%', action: 'percentage', variant: 'function' as const },
    { value: '÷', action: 'operation', variant: 'operator' as const },
  ],
  // Row 2
  [
    { value: '7', action: 'number', variant: 'number' as const },
    { value: '8', action: 'number', variant: 'number' as const },
    { value: '9', action: 'number', variant: 'number' as const },
    { value: '×', action: 'operation', variant: 'operator' as const },
  ],
  // Row 3
  [
    { value: '4', action: 'number', variant: 'number' as const },
    { value: '5', action: 'number', variant: 'number' as const },
    { value: '6', action: 'number', variant: 'number' as const },
    { value: '-', action: 'operation', variant: 'operator' as const },
  ],
  // Row 4
  [
    { value: '1', action: 'number', variant: 'number' as const },
    { value: '2', action: 'number', variant: 'number' as const },
    { value: '3', action: 'number', variant: 'number' as const },
    { value: '+', action: 'operation', variant: 'operator' as const },
  ],
  // Row 5
  [
    { value: '0', action: 'number', variant: 'zero' as const },
    { value: '.', action: 'number', variant: 'number' as const },
    { value: '=', action: 'operation', variant: 'operator' as const },
  ],
];

export function KeypadGrid() {
  const {
    inputNumber,
    inputOperation,
    calculate,
    clear,
    toggleSign,
    percentage,
  } = useCalculatorStore();

  const handleNumber = (digit: string) => {
    if (digit === '.') {
      // Handle decimal point
      const currentDisplay = useCalculatorStore.getState().display;
      if (!currentDisplay.includes('.')) {
        inputNumber('.');
      }
    } else {
      inputNumber(digit);
    }
  };

  const handleOperation = (op: Operation) => {
    if (op === '=') {
      calculate();
    } else {
      inputOperation(op);
    }
  };

  const getButtonHandler = (button: (typeof buttonConfig)[0][0]) => {
    switch (button.action) {
      case 'clear':
        return clear;
      case 'toggleSign':
        return toggleSign;
      case 'percentage':
        return percentage;
      case 'number':
        return () => handleNumber(button.value);
      case 'operation':
        return () => handleOperation(button.value as Operation);
      default:
        return () => {};
    }
  };

  return (
    <div className='grid grid-cols-4 gap-2 w-full bg-black'>
      {buttonConfig.map((row, rowIndex) =>
        row.map((button, buttonIndex) => (
          <CalculatorButton
            key={`${rowIndex}-${buttonIndex}`}
            value={button.value}
            onClick={getButtonHandler(button)}
            variant={button.variant}
          />
        ))
      )}
    </div>
  );
}
