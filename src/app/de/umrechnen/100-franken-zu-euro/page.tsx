"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="CHF"
      toCurrencyCode="EUR"
      amount={100}
      locale="de"
    />
  );
}
