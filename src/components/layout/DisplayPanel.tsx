import { useCurrencyStore } from "@/lib/store/currency";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation, useI18n } from "@/lib/i18n/provider";

interface DisplayPanelProps {
  display: string;
  previousValue: number | null;
  operation: string | null;
  conversionRate?: number | null;
}

export function DisplayPanel({
  display,
  previousValue,
  operation,
  conversionRate,
}: DisplayPanelProps) {
  const {
    baseCurrency,
    targetCurrency,
    swapCurrencies,
    getCurrentRate,
    isUpdating,
  } = useCurrencyStore();

  const { locale } = useI18n();
  const t = useTranslation();

  const displayValue = parseFloat(display) || 0;
  const rate = getCurrentRate();
  const convertedValue = rate ? displayValue * rate : null;

  const formatNumber = (num: number): string => {
    if (isNaN(num)) return "0";

    const localeCode = locale === "de" ? "de-DE" : "en-US";

    if (Math.abs(num) >= 1000000) {
      return new Intl.NumberFormat(localeCode, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(num);
    }
    return new Intl.NumberFormat(localeCode, {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.abs(num) < 1 ? 6 : 2,
    }).format(num);
  };

  return (
    <div className="w-full bg-black rounded-lg shadow-lg p-3 mb-2 border border-zinc-800">
      {/* Header with Switch Button and Operation */}
      <div className="flex items-start justify-between mb-2">
        {/* Switch Button - moved to top left */}
        <Button
          variant="ghost"
          size="icon"
          onClick={swapCurrencies}
          className="text-orange-500 hover:text-orange-400 hover:bg-zinc-800 mr-4"
        >
          <ArrowUpDown className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          {/* Operation Display */}
          {previousValue !== null && operation && (
            <div className="display-secondary text-sm mb-2 text-right">
              {formatNumber(previousValue)} {operation}
            </div>
          )}
        </div>
      </div>

      {/* Primary Currency Display - left aligned */}
      <div className="text-left mb-3">
        <div className="display-primary text-2xl sm:text-3xl mb-1">
          {formatNumber(displayValue)}
        </div>
        <div className="text-zinc-500 text-xs uppercase tracking-wide">
          {baseCurrency.flag} {baseCurrency.code}
        </div>
      </div>

      {/* Secondary Currency Display - left aligned, same size */}
      <div className="text-left">
        <div className="display-primary text-2xl sm:text-3xl mb-1">
          {isUpdating ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{t.ui.loading}</span>
            </div>
          ) : (
            formatNumber(convertedValue || 0)
          )}
        </div>
        <div className="text-zinc-500 text-xs uppercase tracking-wide">
          {targetCurrency.flag} {targetCurrency.code}
        </div>
      </div>
    </div>
  );
}
