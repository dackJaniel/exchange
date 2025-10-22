"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="AUD"
      toCurrencyCode="USD"
      amount={50}
      locale="ar"
    />
  );
}
