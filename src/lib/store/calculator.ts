import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalculatorState, Operation, Calculation } from '@/types/calculator';

interface CalculatorStore extends CalculatorState {
    inputNumber: (digit: string) => void;
    inputOperation: (op: Operation) => void;
    calculate: () => void;
    clear: () => void;
    clearEntry: () => void;
    toggleSign: () => void;
    percentage: () => void;
    addToHistory: (calculation: Calculation) => void;
    clearHistory: () => void;
}

const initialState: CalculatorState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: [],
};

export const useCalculatorStore = create<CalculatorStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            inputNumber: (digit: string) => {
                const state = get();
                if (state.waitingForNewValue) {
                    set({ display: digit, waitingForNewValue: false });
                } else {
                    set({
                        display: state.display === '0' ? digit : state.display + digit,
                    });
                }
            },

            inputOperation: (op: Operation) => {
                const state = get();
                const inputValue = parseFloat(state.display);

                if (state.previousValue === null) {
                    set({
                        previousValue: inputValue,
                        operation: op,
                        waitingForNewValue: true,
                    });
                } else if (state.operation) {
                    const currentValue = state.previousValue || 0;
                    let result = 0;

                    switch (state.operation) {
                        case '+':
                            result = currentValue + inputValue;
                            break;
                        case '-':
                            result = currentValue - inputValue;
                            break;
                        case '×':
                            result = currentValue * inputValue;
                            break;
                        case '÷':
                            result = inputValue !== 0 ? currentValue / inputValue : 0;
                            break;
                    }

                    set({
                        display: String(result),
                        previousValue: result,
                        operation: op,
                        waitingForNewValue: true,
                    });
                }
            },

            calculate: () => {
                const state = get();
                if (state.operation && state.previousValue !== null) {
                    const inputValue = parseFloat(state.display);
                    const currentValue = state.previousValue;
                    let result = 0;

                    switch (state.operation) {
                        case '+':
                            result = currentValue + inputValue;
                            break;
                        case '-':
                            result = currentValue - inputValue;
                            break;
                        case '×':
                            result = currentValue * inputValue;
                            break;
                        case '÷':
                            result = inputValue !== 0 ? currentValue / inputValue : 0;
                            break;
                    }

                    const calculation: Calculation = {
                        id: Date.now().toString(),
                        expression: `${currentValue} ${state.operation} ${inputValue}`,
                        result,
                        timestamp: new Date(),
                    };

                    set({
                        display: String(result),
                        previousValue: null,
                        operation: null,
                        waitingForNewValue: true,
                    });

                    get().addToHistory(calculation);
                }
            },

            clear: () => {
                set(initialState);
            },

            clearEntry: () => {
                set({ display: '0' });
            },

            toggleSign: () => {
                const state = get();
                const value = parseFloat(state.display);
                set({ display: String(-value) });
            },

            percentage: () => {
                const state = get();
                const value = parseFloat(state.display);
                set({ display: String(value / 100) });
            },

            addToHistory: (calculation: Calculation) => {
                set((state) => ({
                    history: [calculation, ...state.history.slice(0, 19)], // Keep only last 20
                }));
            },

            clearHistory: () => {
                set({ history: [] });
            },
        }),
        {
            name: 'calculator-storage',
            partialize: (state) => ({
                history: state.history,
            }),
        }
    )
);
