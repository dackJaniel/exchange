import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="EUR"
      toCurrencyCode="KRW"
      amount={500}
      locale="ja"
    />
  );
}
