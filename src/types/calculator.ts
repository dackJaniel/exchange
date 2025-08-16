export type Operation = '+' | '-' | '×' | '÷' | '=';

export interface CalculatorState {
    display: string;
    previousValue: number | null;
    operation: Operation | null;
    waitingForNewValue: boolean;
    history: Calculation[];
}

export interface Calculation {
    id: string;
    expression: string;
    result: number;
    timestamp: Date;
    currencies?: {
        from: Currency;
        to: Currency;
        rate: number;
    };
}

export interface Currency {
    code: string;
    symbol: string;
    name: string;
    flag: string;
}

export interface CurrencyState {
    baseCurrency: Currency;
    targetCurrency: Currency;
    rates: Record<string, number>;
    lastUpdated: Date | string | null;
    isLoading: boolean;
    error: string | null;
}

export interface ExchangeRateResponse {
    base_code: string;
    conversion_rates: Record<string, number>;
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
}
