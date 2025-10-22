"use client";

import { useEffect, useState } from "react";
import { generateCurrencyUrl } from "@/lib/utils";

interface SEOMetrics {
  pageviews: number;
  bounceRate: number;
  averageSessionDuration: number;
  organicTraffic: number;
  keywordRankings: KeywordRanking[];
  coreWebVitals: CoreWebVitals;
}

interface KeywordRanking {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  url: string;
}

interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export function SEOMonitoringDashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from your analytics API
    const fetchSEOMetrics = async () => {
      try {
        // Mock data for demonstration
        const mockMetrics: SEOMetrics = {
          pageviews: 12543,
          bounceRate: 0.34,
          averageSessionDuration: 142,
          organicTraffic: 8932,
          keywordRankings: [
            {
              keyword: "währungsrechner",
              position: 3,
              previousPosition: 5,
              searchVolume: 22200,
              url: "/",
            },
            {
              keyword: "currency calculator",
              position: 8,
              previousPosition: 12,
              searchVolume: 49500,
              url: "/",
            },
            {
              keyword: "euro dollar rechner",
              position: 2,
              previousPosition: 3,
              searchVolume: 8100,
              url: generateCurrencyUrl("de", "EUR", "USD"),
            },
            {
              keyword: "eur usd converter",
              position: 5,
              previousPosition: 7,
              searchVolume: 6800,
              url: generateCurrencyUrl("en", "EUR", "USD"),
            },
          ],
          coreWebVitals: {
            lcp: 1.2,
            fid: 45,
            cls: 0.08,
            fcp: 0.9,
            ttfb: 0.3,
          },
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMetrics(mockMetrics);
      } catch (error) {
        console.error("Error fetching SEO metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSEOMetrics();
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-zinc-700 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-700 rounded w-full"></div>
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6 text-center">
        <p className="text-gray-400">Failed to load SEO metrics</p>
      </div>
    );
  }

  const getPositionTrend = (current: number, previous: number) => {
    if (current < previous) return "up";
    if (current > previous) return "down";
    return "same";
  };

  const getWebVitalStatus = (metric: string, value: number) => {
    const thresholds = {
      lcp: { good: 2.5, needs: 4.0 },
      fid: { good: 100, needs: 300 },
      cls: { good: 0.1, needs: 0.25 },
      fcp: { good: 1.8, needs: 3.0 },
      ttfb: { good: 0.8, needs: 1.8 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return "unknown";

    if (value <= threshold.good) return "good";
    if (value <= threshold.needs) return "needs-improvement";
    return "poor";
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Total Pageviews
          </h3>
          <p className="text-2xl font-bold text-white">
            {metrics.pageviews.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Organic Traffic
          </h3>
          <p className="text-2xl font-bold text-green-400">
            {metrics.organicTraffic.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Bounce Rate
          </h3>
          <p className="text-2xl font-bold text-orange-400">
            {(metrics.bounceRate * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Avg. Session Duration
          </h3>
          <p className="text-2xl font-bold text-blue-400">
            {Math.floor(metrics.averageSessionDuration / 60)}:
            {(metrics.averageSessionDuration % 60).toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Keyword Rankings */}
      <div className="bg-zinc-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Keyword Rankings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-2 text-gray-400">Keyword</th>
                <th className="text-right py-2 text-gray-400">Position</th>
                <th className="text-right py-2 text-gray-400">Change</th>
                <th className="text-right py-2 text-gray-400">Volume</th>
                <th className="text-left py-2 text-gray-400">URL</th>
              </tr>
            </thead>
            <tbody>
              {metrics.keywordRankings.map((ranking, index) => {
                const trend = getPositionTrend(
                  ranking.position,
                  ranking.previousPosition,
                );
                const change = ranking.previousPosition - ranking.position;

                return (
                  <tr key={index} className="border-b border-zinc-800">
                    <td className="py-3 text-white font-medium">
                      {ranking.keyword}
                    </td>
                    <td className="text-right py-3">
                      <span
                        className={`font-bold ${
                          ranking.position <= 3
                            ? "text-green-400"
                            : ranking.position <= 10
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        #{ranking.position}
                      </span>
                    </td>
                    <td className="text-right py-3">
                      {trend === "up" && (
                        <span className="text-green-400 flex items-center justify-end">
                          ↗ +{change}
                        </span>
                      )}
                      {trend === "down" && (
                        <span className="text-red-400 flex items-center justify-end">
                          ↘ {change}
                        </span>
                      )}
                      {trend === "same" && (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="text-right py-3 text-gray-400">
                      {ranking.searchVolume.toLocaleString()}
                    </td>
                    <td className="py-3 text-gray-400 truncate max-w-32">
                      {ranking.url}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="bg-zinc-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Core Web Vitals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">LCP</div>
            <div
              className={`text-2xl font-bold ${
                getWebVitalStatus("lcp", metrics.coreWebVitals.lcp) === "good"
                  ? "text-green-400"
                  : getWebVitalStatus("lcp", metrics.coreWebVitals.lcp) ===
                      "needs-improvement"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {metrics.coreWebVitals.lcp.toFixed(1)}s
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">FID</div>
            <div
              className={`text-2xl font-bold ${
                getWebVitalStatus("fid", metrics.coreWebVitals.fid) === "good"
                  ? "text-green-400"
                  : getWebVitalStatus("fid", metrics.coreWebVitals.fid) ===
                      "needs-improvement"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {metrics.coreWebVitals.fid}ms
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">CLS</div>
            <div
              className={`text-2xl font-bold ${
                getWebVitalStatus("cls", metrics.coreWebVitals.cls) === "good"
                  ? "text-green-400"
                  : getWebVitalStatus("cls", metrics.coreWebVitals.cls) ===
                      "needs-improvement"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {metrics.coreWebVitals.cls.toFixed(3)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">FCP</div>
            <div
              className={`text-2xl font-bold ${
                getWebVitalStatus("fcp", metrics.coreWebVitals.fcp) === "good"
                  ? "text-green-400"
                  : getWebVitalStatus("fcp", metrics.coreWebVitals.fcp) ===
                      "needs-improvement"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {metrics.coreWebVitals.fcp.toFixed(1)}s
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">TTFB</div>
            <div
              className={`text-2xl font-bold ${
                getWebVitalStatus("ttfb", metrics.coreWebVitals.ttfb) === "good"
                  ? "text-green-400"
                  : getWebVitalStatus("ttfb", metrics.coreWebVitals.ttfb) ===
                      "needs-improvement"
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {metrics.coreWebVitals.ttfb.toFixed(1)}s
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <span className="text-green-400">●</span> Good &nbsp;
          <span className="text-yellow-400">●</span> Needs Improvement &nbsp;
          <span className="text-red-400">●</span> Poor
        </div>
      </div>
    </div>
  );
}
