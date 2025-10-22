"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="CAD"
      toCurrencyCode="USD"
      amount={50}
      locale="en"
    />
  );
}
