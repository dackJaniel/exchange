"use client";

import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useCurrencyStore } from "@/lib/store/currency";
import { useTranslation } from "@/lib/i18n/provider";

interface CurrencySelectorProps {
  type: "base" | "target";
}

export function CurrencySelector({ type }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslation();

  const {
    currencies,
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
  } = useCurrencyStore();

  const selectedCurrency = type === "base" ? baseCurrency : targetCurrency;

  // Group currencies by region for better UX
  const groupedCurrencies = useMemo(() => {
    const major = currencies.filter((c) =>
      ["EUR", "USD", "GBP", "CHF", "JPY"].includes(c.code),
    );
    const european = currencies.filter((c) =>
      ["CZK", "PLN", "SEK", "NOK", "DKK", "HUF", "RON", "BGN", "HRK"].includes(
        c.code,
      ),
    );
    const others = currencies.filter(
      (c) => !major.includes(c) && !european.includes(c),
    );

    return [
      { label: t.ui.majorCurrencies || "Major Currencies", currencies: major },
      {
        label: t.ui.europeanCurrencies || "European Currencies",
        currencies: european,
      },
      { label: t.ui.otherCurrencies || "Other Currencies", currencies: others },
    ];
  }, [currencies, t.ui]);

  const handleSelect = (currency: typeof selectedCurrency) => {
    if (type === "base") {
      setBaseCurrency(currency);
    } else {
      setTargetCurrency(currency);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-left h-auto min-h-[60px] py-3 px-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedCurrency.flag}</span>
            <div>
              <div className="font-medium text-white">
                {selectedCurrency.code}
              </div>
              <div className="text-xs text-zinc-400 truncate">
                {selectedCurrency.name}
              </div>
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-zinc-900 border-zinc-700">
        <Command className="bg-zinc-900">
          <CommandInput
            placeholder={t.ui.searchCurrencies || "Search currencies..."}
            className="border-0 bg-transparent focus:ring-0 text-white placeholder:text-zinc-500 border-b border-zinc-700 rounded-none"
          />
          <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
            {t.ui.noCurrencyFound || "No currency found."}
          </CommandEmpty>
          <div className="max-h-80 overflow-y-auto">
            {groupedCurrencies.map((group) => (
              <CommandGroup
                key={group.label}
                heading={group.label}
                className="text-zinc-400"
              >
                {group.currencies.map((currency) => (
                  <CommandItem
                    key={currency.code}
                    value={`${currency.code} ${currency.name}`}
                    onSelect={() => handleSelect(currency)}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-800 text-white"
                  >
                    <span className="text-lg">{currency.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-xs text-zinc-400">
                          {currency.symbol}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        {currency.name}
                      </div>
                    </div>
                    <Check
                      className={`ml-2 h-4 w-4 ${
                        selectedCurrency.code === currency.code
                          ? "opacity-100 text-orange-500"
                          : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
