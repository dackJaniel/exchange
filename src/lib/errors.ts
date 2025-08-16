/**
 * Enhanced error handling utilities for the Exchange app
 */

export type ErrorType =
    | 'network'
    | 'api'
    | 'rate-limit'
    | 'validation'
    | 'unknown';

export interface AppError {
    type: ErrorType;
    message: string;
    code?: string | number;
    details?: unknown;
    timestamp: Date;
}

export class ExchangeError extends Error {
    public readonly type: ErrorType;
    public readonly code?: string | number;
    public readonly details?: unknown;
    public readonly timestamp: Date;

    constructor(type: ErrorType, message: string, code?: string | number, details?: unknown) {
        super(message);
        this.name = 'ExchangeError';
        this.type = type;
        this.code = code;
        this.details = details;
        this.timestamp = new Date();
    }

    toAppError(): AppError {
        return {
            type: this.type,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
        };
    }
}

/**
 * Create a network error with appropriate classification
 */
export function createNetworkError(error: unknown): ExchangeError {
    const errorObj = error as Error;
    if (errorObj.name === 'TypeError' && errorObj.message.includes('fetch')) {
        return new ExchangeError('network', 'Network connection failed', 'FETCH_FAILED', error);
    }

    if (errorObj.message === 'Timeout') {
        return new ExchangeError('network', 'Request timeout', 'TIMEOUT', error);
    }

    return new ExchangeError('network', 'Network error occurred', 'UNKNOWN_NETWORK', error);
}

/**
 * Create an API error based on response status
 */
export function createApiError(response: Response, details?: unknown): ExchangeError {
    const { status, statusText } = response;

    if (status === 429) {
        return new ExchangeError('rate-limit', 'Too many requests - please try again later', status, details);
    }

    if (status >= 500) {
        return new ExchangeError('api', 'Service temporarily unavailable', status, details);
    }

    if (status === 404) {
        return new ExchangeError('api', 'Exchange rate data not found', status, details);
    }

    return new ExchangeError('api', `API error: ${statusText}`, status, details);
}

/**
 * Get user-friendly error message for display
 */
export function getErrorMessage(error: AppError | ExchangeError, fallback = 'An unexpected error occurred'): string {
    const errorObj = error instanceof ExchangeError ? error.toAppError() : error;

    switch (errorObj.type) {
        case 'network':
            return 'Unable to connect to exchange rate service. Please check your internet connection.';
        case 'rate-limit':
            return 'Service limit reached. Please wait a moment before trying again.';
        case 'api':
            return 'Exchange rate service is temporarily unavailable. Please try again later.';
        case 'validation':
            return errorObj.message; // These should be user-friendly already
        default:
            return fallback;
    }
}

/**
 * Determine if error should be retried
 */
export function isRetriableError(error: AppError | ExchangeError): boolean {
    const errorObj = error instanceof ExchangeError ? error.toAppError() : error;

    switch (errorObj.type) {
        case 'network':
            return true;
        case 'api':
            return errorObj.code !== 404; // Don't retry 404s
        case 'rate-limit':
            return false; // Don't retry rate limits immediately
        default:
            return false;
    }
}
