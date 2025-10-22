"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="AUD"
      toCurrencyCode="USD"
      amount={10}
      locale="it"
    />
  );
}
