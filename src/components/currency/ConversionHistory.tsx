"use client";

import React, { useState, useMemo } from "react";
import {
  useConversionHistoryStore,
  getConversionDisplayData,
} from "@/lib/store/conversion-history";
import { useI18n } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  History,
  Download,
  Trash2,
  Calendar,
  TrendingUp,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

interface ConversionHistoryProps {
  className?: string;
}

export default function ConversionHistory({
  className,
}: ConversionHistoryProps) {
  const { t } = useI18n();
  const {
    conversions,
    isEnabled,
    getRecentConversions,
    getConversionsByDateRange,
    getStats,
    clearHistory,
    deleteConversion,
    exportHistory,
    setEnabled,
  } = useConversionHistoryStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"recent" | "stats" | "settings">(
    "recent",
  );
  const [filterPeriod, setFilterPeriod] = useState<
    "all" | "24h" | "7d" | "30d"
  >("all");

  // Filter conversions based on selected period
  const filteredConversions = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (filterPeriod) {
      case "24h":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return conversions;
    }

    return getConversionsByDateRange(startDate, now);
  }, [conversions, filterPeriod, getConversionsByDateRange]);

  const stats = useMemo(() => getStats(), [conversions, getStats]);

  const handleExport = () => {
    try {
      const data = exportHistory();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversion-history-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(t.ui.conversionHistory.exported);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(t.ui.conversionHistory.exportFailed);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    toast.success(t.ui.conversionHistory.historyCleared);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:text-orange-500 hover:bg-zinc-800 transition-colors ${className}`}
          >
            <History className="h-4 w-4 mr-2" />
            {t.ui.conversionHistory.title}
            {conversions.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-auto h-5 w-5 p-0 text-xs"
              >
                {conversions.length > 99 ? "99+" : conversions.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              {t.ui.conversionHistory.title}
            </DialogTitle>
          </DialogHeader>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "recent"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {t.ui.conversionHistory.recent}
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "stats"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {t.ui.conversionHistory.statistics}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {t.ui.conversionHistory.settings}
            </button>
          </div>

          <div className="mt-4">
            {/* Recent Conversions Tab */}
            {activeTab === "recent" && (
              <div className="space-y-4">
                {/* Filter Controls */}
                <div className="flex justify-between items-center">
                  <Select
                    value={filterPeriod}
                    onValueChange={(value: any) => setFilterPeriod(value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t.ui.conversionHistory.allTime}
                      </SelectItem>
                      <SelectItem value="24h">
                        {t.ui.conversionHistory.last24h}
                      </SelectItem>
                      <SelectItem value="7d">
                        {t.ui.conversionHistory.last7d}
                      </SelectItem>
                      <SelectItem value="30d">
                        {t.ui.conversionHistory.last30d}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExport}
                      disabled={conversions.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t.ui.conversionHistory.export}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearHistory}
                      disabled={conversions.length === 0}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t.ui.conversionHistory.clear}
                    </Button>
                  </div>
                </div>

                {/* Conversions List */}
                <ScrollArea className="h-96">
                  {filteredConversions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t.ui.conversionHistory.noConversions}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredConversions.map((conversion) => {
                        const displayData =
                          getConversionDisplayData(conversion);
                        return (
                          <div
                            key={conversion.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {conversion.fromCurrency.flag}
                                </span>
                                <div>
                                  <div className="font-medium">
                                    {formatAmount(
                                      conversion.fromAmount,
                                      conversion.fromCurrency.code,
                                    )}{" "}
                                    →{" "}
                                    {formatAmount(
                                      conversion.toAmount,
                                      conversion.toCurrency.code,
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {formatDate(conversion.timestamp)} • Rate:{" "}
                                    {conversion.exchangeRate.toFixed(4)}
                                  </div>
                                </div>
                                <span className="text-2xl">
                                  {conversion.toCurrency.flag}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!conversion.isOnline && (
                                <Badge variant="outline" className="text-xs">
                                  {t.ui.conversionHistory.offline}
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteConversion(conversion.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        {t.ui.conversionHistory.totalConversions}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {stats.totalConversions.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">
                        {t.ui.conversionHistory.averageAmount}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {stats.averageAmount.toFixed(0)}
                    </div>
                  </div>
                </div>

                {stats.mostUsedCurrencyPairs.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">
                      {t.ui.conversionHistory.popularPairs}
                    </h3>
                    <div className="space-y-2">
                      {stats.mostUsedCurrencyPairs
                        .slice(0, 5)
                        .map((pair, index) => (
                          <div
                            key={pair.pair}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="font-mono text-sm">
                              {pair.pair}
                            </span>
                            <Badge variant="secondary">{pair.count}</Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {isEnabled ? (
                      <Eye className="h-5 w-5 text-green-600" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <div className="font-medium">
                        {t.ui.conversionHistory.enableLogging}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t.ui.conversionHistory.loggingDescription}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setEnabled(!isEnabled);
                      toast.success(
                        isEnabled
                          ? t.ui.conversionHistory.loggingDisabled
                          : t.ui.conversionHistory.loggingEnabled,
                      );
                    }}
                  >
                    {isEnabled
                      ? t.ui.conversionHistory.disable
                      : t.ui.conversionHistory.enable}
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      {t.ui.conversionHistory.privacyNotice}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    {t.ui.conversionHistory.privacyDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
