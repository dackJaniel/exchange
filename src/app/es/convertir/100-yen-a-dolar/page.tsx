"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="JPY"
      toCurrencyCode="USD"
      amount={100}
      locale="es"
    />
  );
}
