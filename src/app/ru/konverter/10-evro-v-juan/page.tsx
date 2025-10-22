"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="EUR"
      toCurrencyCode="CNY"
      amount={10}
      locale="ru"
    />
  );
}
