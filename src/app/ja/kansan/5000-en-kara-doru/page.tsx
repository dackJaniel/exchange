"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="JPY"
      toCurrencyCode="USD"
      amount={5000}
      locale="ja"
    />
  );
}
