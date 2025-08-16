/**
 * Debug utility for controlled logging
 * Only logs in development environment
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface DebugLogger {
    debug: (message: string, ...args: unknown[]) => void;
    info: (message: string, ...args: unknown[]) => void;
    warn: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
}

const isDevelopment = process.env.NODE_ENV === 'development';

const createLogger = (prefix?: string): DebugLogger => {
    const log = (level: LogLevel, message: string, ...args: unknown[]) => {
        if (!isDevelopment) return;

        const prefixedMessage = prefix ? `[${prefix}] ${message}` : message;
        console[level](prefixedMessage, ...args);
    };

    return {
        debug: (message: string, ...args: unknown[]) => log('debug', message, ...args),
        info: (message: string, ...args: unknown[]) => log('info', message, ...args),
        warn: (message: string, ...args: unknown[]) => log('warn', message, ...args),
        error: (message: string, ...args: unknown[]) => log('error', message, ...args),
    };
};

// Export specific loggers for different modules
export const currencyLogger = createLogger('Currency');
export const onlineLogger = createLogger('Online');
export const pwaLogger = createLogger('PWA');
export const pullRefreshLogger = createLogger('PullRefresh');

// Export default logger
export const debugLogger = createLogger();
