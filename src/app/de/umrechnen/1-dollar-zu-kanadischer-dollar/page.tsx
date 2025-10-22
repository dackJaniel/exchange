"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="USD"
      toCurrencyCode="CAD"
      amount={1}
      locale="de"
    />
  );
}
