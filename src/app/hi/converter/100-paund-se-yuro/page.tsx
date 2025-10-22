"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="GBP"
      toCurrencyCode="EUR"
      amount={100}
      locale="hi"
    />
  );
}
