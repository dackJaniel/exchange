/**
 * Enhanced caching utilities for the Exchange app
 */

export interface CacheEntry<T> {
    data: T;
    timestamp: number;
    expiresAt: number;
    key: string;
}

export interface CacheConfig {
    ttl: number; // Time to live in milliseconds
    maxSize?: number; // Maximum number of entries
    namespace?: string; // Cache namespace for storage
}

export class EnhancedCache<T> {
    private cache = new Map<string, CacheEntry<T>>();
    private config: Required<CacheConfig>;

    constructor(config: CacheConfig) {
        this.config = {
            ttl: config.ttl,
            maxSize: config.maxSize ?? 100,
            namespace: config.namespace ?? 'default',
        };

        // Load cache from localStorage if available
        this.loadFromStorage();
    }

    /**
     * Set a value in the cache
     */
    set(key: string, data: T): void {
        const now = Date.now();
        const entry: CacheEntry<T> = {
            data,
            timestamp: now,
            expiresAt: now + this.config.ttl,
            key,
        };

        // Check cache size and evict oldest entries if necessary
        if (this.cache.size >= this.config.maxSize) {
            this.evictOldest();
        }

        this.cache.set(key, entry);
        this.saveToStorage();
    }

    /**
     * Get a value from the cache
     */
    get(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        // Check if entry has expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            this.saveToStorage();
            return null;
        }

        return entry.data;
    }

    /**
     * Check if a key exists and is valid (not expired)
     */
    has(key: string): boolean {
        return this.get(key) !== null;
    }

    /**
     * Check if a key is valid (not expired)
     */
    isValid(key: string): boolean {
        const entry = this.cache.get(key);
        return entry ? Date.now() <= entry.expiresAt : false;
    }

    /**
     * Delete a specific key
     */
    delete(key: string): boolean {
        const result = this.cache.delete(key);
        if (result) {
            this.saveToStorage();
        }
        return result;
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear();
        this.saveToStorage();
    }

    /**
     * Get all valid entries
     */
    getAll(): Array<CacheEntry<T>> {
        const now = Date.now();
        const validEntries: Array<CacheEntry<T>> = [];

        for (const [key, entry] of this.cache.entries()) {
            if (now <= entry.expiresAt) {
                validEntries.push(entry);
            } else {
                // Remove expired entry
                this.cache.delete(key);
            }
        }

        // Save if we removed any expired entries
        this.saveToStorage();

        return validEntries;
    }

    /**
     * Get cache statistics
     */
    getStats(): {
        size: number;
        maxSize: number;
        hitRate?: number;
        oldestEntry?: Date;
        newestEntry?: Date;
    } {
        const entries = this.getAll();
        const timestamps = entries.map(e => e.timestamp);

        return {
            size: this.cache.size,
            maxSize: this.config.maxSize,
            oldestEntry: timestamps.length ? new Date(Math.min(...timestamps)) : undefined,
            newestEntry: timestamps.length ? new Date(Math.max(...timestamps)) : undefined,
        };
    }

    private evictOldest(): void {
        let oldestKey: string | null = null;
        let oldestTimestamp = Infinity;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.timestamp < oldestTimestamp) {
                oldestTimestamp = entry.timestamp;
                oldestKey = key;
            }
        }

        if (oldestKey) {
            this.cache.delete(oldestKey);
        }
    }

    private loadFromStorage(): void {
        if (typeof localStorage === 'undefined') return;

        try {
            const stored = localStorage.getItem(`cache_${this.config.namespace}`);
            if (stored) {
                const data = JSON.parse(stored);
                const now = Date.now();

                // Only restore non-expired entries
                for (const [key, entry] of Object.entries(data)) {
                    const cacheEntry = entry as CacheEntry<T>;
                    if (now <= cacheEntry.expiresAt) {
                        this.cache.set(key, cacheEntry);
                    }
                }
            }
        } catch {
            // Silently fail - cache will just start empty
        }
    }

    private saveToStorage(): void {
        if (typeof localStorage === 'undefined') return;

        try {
            const data = Object.fromEntries(this.cache.entries());
            localStorage.setItem(`cache_${this.config.namespace}`, JSON.stringify(data));
        } catch {
            // Silently fail - cache will continue to work in memory
        }
    }
}

// Pre-configured cache instances for common use cases
export const exchangeRatesCache = new EnhancedCache<Record<string, number>>({
    ttl: 15 * 60 * 1000, // 15 minutes
    maxSize: 50,
    namespace: 'exchange-rates',
});

export const apiResponseCache = new EnhancedCache<Record<string, unknown>>({
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 20,
    namespace: 'api-responses',
});
