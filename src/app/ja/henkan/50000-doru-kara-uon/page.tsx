import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="USD"
      toCurrencyCode="KRW"
      amount={50000}
      locale="ja"
    />
  );
}
