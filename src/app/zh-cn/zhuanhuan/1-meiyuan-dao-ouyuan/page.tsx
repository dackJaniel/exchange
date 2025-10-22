"use client";

import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="USD"
      toCurrencyCode="EUR"
      amount={1}
      locale="zh-cn"
    />
  );
}
