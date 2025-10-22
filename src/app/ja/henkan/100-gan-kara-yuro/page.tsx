import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="CNY"
      toCurrencyCode="EUR"
      amount={100}
      locale="ja"
    />
  );
}
