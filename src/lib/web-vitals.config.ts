// Web Vitals Configuration
export const webVitalsConfig = {
  // Google Analytics 4 measurement ID
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,

  // Core Web Vitals thresholds
  thresholds: {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  },

  // Performance monitoring
  enablePerformanceMonitoring: process.env.NODE_ENV === 'production',

  // SEO monitoring endpoints
  endpoints: {
    seo: '/api/seo-metrics',
    performance: '/api/performance-metrics',
    rankings: '/api/keyword-rankings',
  }
};

export default webVitalsConfig;