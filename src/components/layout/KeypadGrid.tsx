import { CalculatorButton } from '@/components/calculator/CalculatorButton';
import { useCalculatorStore } from '@/lib/store/calculator';
import { Operation } from '@/types/calculator';

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

  return (
    <div className='grid grid-cols-4 gap-3 p-4 max-w-sm mx-auto bg-black'>
      {/* Row 1 */}
      <CalculatorButton value='AC' onClick={clear} variant='function' />
      <CalculatorButton value='+/-' onClick={toggleSign} variant='function' />
      <CalculatorButton value='%' onClick={percentage} variant='function' />
      <CalculatorButton
        value='÷'
        onClick={() => handleOperation('÷')}
        variant='operator'
      />

      {/* Row 2 */}
      <CalculatorButton
        value='7'
        onClick={() => handleNumber('7')}
        variant='number'
      />
      <CalculatorButton
        value='8'
        onClick={() => handleNumber('8')}
        variant='number'
      />
      <CalculatorButton
        value='9'
        onClick={() => handleNumber('9')}
        variant='number'
      />
      <CalculatorButton
        value='×'
        onClick={() => handleOperation('×')}
        variant='operator'
      />

      {/* Row 3 */}
      <CalculatorButton
        value='4'
        onClick={() => handleNumber('4')}
        variant='number'
      />
      <CalculatorButton
        value='5'
        onClick={() => handleNumber('5')}
        variant='number'
      />
      <CalculatorButton
        value='6'
        onClick={() => handleNumber('6')}
        variant='number'
      />
      <CalculatorButton
        value='-'
        onClick={() => handleOperation('-')}
        variant='operator'
      />

      {/* Row 4 */}
      <CalculatorButton
        value='1'
        onClick={() => handleNumber('1')}
        variant='number'
      />
      <CalculatorButton
        value='2'
        onClick={() => handleNumber('2')}
        variant='number'
      />
      <CalculatorButton
        value='3'
        onClick={() => handleNumber('3')}
        variant='number'
      />
      <CalculatorButton
        value='+'
        onClick={() => handleOperation('+')}
        variant='operator'
      />

      {/* Row 5 */}
      <CalculatorButton
        value='0'
        onClick={() => handleNumber('0')}
        variant='zero'
      />
      <CalculatorButton
        value='.'
        onClick={() => handleNumber('.')}
        variant='number'
      />
      <CalculatorButton
        value='='
        onClick={() => handleOperation('=')}
        variant='operator'
      />
    </div>
  );
}
