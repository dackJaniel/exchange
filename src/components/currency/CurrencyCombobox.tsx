"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/lib/store/currency";
import { Currency } from "@/types/calculator";
import { useTranslation } from "@/lib/i18n/provider";

interface CurrencyComboboxProps {
  type: "base" | "target";
}

export function CurrencyCombobox({ type }: CurrencyComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const t = useTranslation();

  const {
    currencies,
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
  } = useCurrencyStore();

  const currentCurrency = type === "base" ? baseCurrency : targetCurrency;
  const setCurrency = type === "base" ? setBaseCurrency : setTargetCurrency;

  // Helper function to create search terms for a currency
  const getSearchTerms = React.useCallback((currency: Currency) => {
    const terms = [
      currency.code.toLowerCase(),
      currency.name.toLowerCase(),
      currency.symbol.toLowerCase(),
      ...currency.name.toLowerCase().split(" "), // Split name into words
    ];

    // Add common alternative names
    const alternatives: Record<string, string[]> = {
      USD: ["dollar", "american", "us"],
      EUR: ["euro", "european"],
      GBP: ["pound", "sterling", "british"],
      JPY: ["yen", "japanese"],
      CNY: ["yuan", "renminbi", "chinese"],
      CHF: ["franc", "swiss"],
      CAD: ["canadian"],
      AUD: ["australian"],
      CZK: ["koruna", "czech", "crown"],
      PLN: ["zloty", "polish"],
      MXN: ["peso", "mexican", "mexico"],
    };

    if (alternatives[currency.code]) {
      terms.push(...alternatives[currency.code]);
    }

    return terms;
  }, []);

  // Filter currencies based on search with enhanced matching
  const filteredCurrencies = React.useMemo(() => {
    if (!searchValue) return currencies;

    const search = searchValue.toLowerCase().trim();

    return currencies
      .filter((currency) => {
        const searchTerms = getSearchTerms(currency);

        // Check if search matches any of the terms
        return searchTerms.some(
          (term) => term.includes(search) || term.startsWith(search),
        );
      })
      .sort((a, b) => {
        const searchLower = search.toLowerCase();

        // Prioritize exact code matches first
        const aCodeExact = a.code.toLowerCase() === searchLower;
        const bCodeExact = b.code.toLowerCase() === searchLower;

        if (aCodeExact && !bCodeExact) return -1;
        if (!aCodeExact && bCodeExact) return 1;

        // Then prioritize code starts with search
        const aCodeStarts = a.code.toLowerCase().startsWith(searchLower);
        const bCodeStarts = b.code.toLowerCase().startsWith(searchLower);

        if (aCodeStarts && !bCodeStarts) return -1;
        if (!aCodeStarts && bCodeStarts) return 1;

        // Then prioritize name starts with search
        const aNameStarts = a.name.toLowerCase().startsWith(searchLower);
        const bNameStarts = b.name.toLowerCase().startsWith(searchLower);

        if (aNameStarts && !bNameStarts) return -1;
        if (!aNameStarts && bNameStarts) return 1;

        // Finally, prioritize word matches in name
        const aNameWords = a.name.toLowerCase().split(" ");
        const bNameWords = b.name.toLowerCase().split(" ");
        const aWordStarts = aNameWords.some((word) =>
          word.startsWith(searchLower),
        );
        const bWordStarts = bNameWords.some((word) =>
          word.startsWith(searchLower),
        );

        if (aWordStarts && !bWordStarts) return -1;
        if (!aWordStarts && bWordStarts) return 1;

        // Default alphabetical order by code
        return a.code.localeCompare(b.code);
      });
  }, [currencies, searchValue, getSearchTerms]);

  const handleSelect = (code: string) => {
    const currency = currencies.find((c) => c.code === code);
    if (currency) {
      setCurrency(currency);
      setOpen(false);
      setSearchValue("");
    }
  };

  // Handle Enter key for first result
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && filteredCurrencies.length > 0) {
      event.preventDefault();
      handleSelect(filteredCurrencies[0].code);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-600 hover:border-zinc-500 transition-colors h-auto px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentCurrency.flag}</span>
            <span className="font-medium">{currentCurrency.code}</span>
            <span className="text-zinc-400 text-sm">
              ({currentCurrency.symbol})
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-zinc-800 border-zinc-700 shadow-xl">
        <Command className="bg-zinc-800 border-none">
          <CommandInput
            placeholder={t.ui.searchCurrency}
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={handleKeyDown}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-none [&_svg]:text-white"
          />
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty className="py-6 text-center text-sm text-zinc-400">
              {searchValue ? t.ui.noCurrencyMatching : t.ui.noCurrencyFound}
            </CommandEmpty>
            <CommandGroup className="p-1">
              {filteredCurrencies.map((currency, index) => (
                <CommandItem
                  key={currency.code}
                  value={`${currency.code} ${currency.name} ${currency.symbol}`} // Include all searchable terms
                  keywords={[currency.code, currency.name, currency.symbol]} // Additional search terms
                  onSelect={() => handleSelect(currency.code)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md transition-colors duration-150",
                    "hover:bg-zinc-600 focus:bg-zinc-600 data-[selected=true]:bg-zinc-600 text-white",
                    index === 0 && searchValue && "bg-zinc-700", // Highlight first result
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 transition-opacity",
                      currentCurrency.code === currency.code
                        ? "opacity-100 text-orange-500"
                        : "opacity-0",
                    )}
                  />
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium truncate">
                      {currency.code}
                    </span>
                    <span className="text-xs text-zinc-400 truncate">
                      {currency.name}
                    </span>
                  </div>
                  <span className="text-zinc-400 text-sm flex-shrink-0">
                    {currency.symbol}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
