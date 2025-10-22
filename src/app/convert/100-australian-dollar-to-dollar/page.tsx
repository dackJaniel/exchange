"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="AUD"
      toCurrencyCode="USD"
      amount={100}
      locale="en"
    />
  );
}
