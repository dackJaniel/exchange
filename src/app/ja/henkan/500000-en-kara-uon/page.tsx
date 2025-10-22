import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="JPY"
      toCurrencyCode="KRW"
      amount={500000}
      locale="ja"
    />
  );
}
