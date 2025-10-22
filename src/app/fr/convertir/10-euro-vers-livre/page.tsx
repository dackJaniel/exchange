"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="EUR"
      toCurrencyCode="GBP"
      amount={10}
      locale="fr"
    />
  );
}
