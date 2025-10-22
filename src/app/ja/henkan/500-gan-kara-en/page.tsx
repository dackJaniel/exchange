import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="CNY"
      toCurrencyCode="JPY"
      amount={500}
      locale="ja"
    />
  );
}
