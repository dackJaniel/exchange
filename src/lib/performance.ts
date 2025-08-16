/**
 * Performance monitoring utilities for the Exchange app
 */

interface PerformanceMetrics {
    startTime: number;
    endTime?: number;
    duration?: number;
    operation: string;
    success: boolean;
    error?: string;
}

class PerformanceMonitor {
    private metrics: Map<string, PerformanceMetrics> = new Map();
    private isDevelopment = process.env.NODE_ENV === 'development';

    /**
     * Start timing an operation
     */
    startTiming(operationId: string, operation: string): void {
        if (!this.isDevelopment) return;

        this.metrics.set(operationId, {
            startTime: performance.now(),
            operation,
            success: false,
        });
    }

    /**
     * End timing an operation
     */
    endTiming(operationId: string, success: boolean = true, error?: string): void {
        if (!this.isDevelopment) return;

        const metric = this.metrics.get(operationId);
        if (!metric) return;

        const endTime = performance.now();
        const duration = endTime - metric.startTime;

        metric.endTime = endTime;
        metric.duration = duration;
        metric.success = success;
        metric.error = error;

        // Log performance if operation took longer than 100ms
        if (duration > 100) {
            console.warn(`Performance: ${metric.operation} took ${duration.toFixed(2)}ms`, {
                success,
                error: error || 'None',
            });
        } else {
            console.debug(`Performance: ${metric.operation} completed in ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * Measure an async operation
     */
    async measureAsync<T>(
        operationId: string,
        operation: string,
        asyncOperation: () => Promise<T>
    ): Promise<T> {
        this.startTiming(operationId, operation);
        try {
            const result = await asyncOperation();
            this.endTiming(operationId, true);
            return result;
        } catch (error) {
            this.endTiming(operationId, false, error instanceof Error ? error.message : String(error));
            throw error;
        }
    }

    /**
     * Get metrics summary for debugging
     */
    getSummary(): PerformanceMetrics[] {
        return Array.from(this.metrics.values());
    }

    /**
     * Clear all metrics
     */
    clear(): void {
        this.metrics.clear();
    }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions
export const startTiming = (operationId: string, operation: string) =>
    performanceMonitor.startTiming(operationId, operation);

export const endTiming = (operationId: string, success?: boolean, error?: string) =>
    performanceMonitor.endTiming(operationId, success, error);

export const measureAsync = <T>(operationId: string, operation: string, asyncOperation: () => Promise<T>) =>
    performanceMonitor.measureAsync(operationId, operation, asyncOperation);
